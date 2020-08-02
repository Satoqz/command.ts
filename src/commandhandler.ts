import { Message, MessageEmbed, MessageAttachment } from "discord.js";
import { Client } from "./client";
import { registeredCommand, commandArg } from "./interfaces/registeredCommand";
import { commandContext, StringResolvable } from "./interfaces/commandContext";
import { commands } from "./storage/commands";
import { convertCommandArgs } from "./helpers/convertArgs";
import { split } from "./helpers/split";

/**
 * This is executed every time a command is called
 * @param client The client to be used
 * @param message The mesage recived
 */
export async function commandHandler(client: Client, message: Message)
{
	const context = message as commandContext;
	let hasPrefix = false;
	let usedPrefix = "";

	// If there is no guild, it is probably a DM channel
	const guildId = message.guild?.id ?? "dms";
	context.dbContext = client.dbContext;
	const guildPref = client.dbContext.getDocumentById<string>("PrefixConfig", guildId)
		?? client.dbContext.getDocumentById<string>("PrefixConfig", "defaultPrefix")!;
	
	console.log(client.dbContext.getDocumentById<string>("PrefixConfig", guildId)!);
	if (message.content.startsWith(guildPref))
	{
		hasPrefix = true;
		usedPrefix = client.dbContext.getDocumentById<string>("PrefixConfig", guildId)!;
	}
	
	context.args = split(context.content.replace(usedPrefix, ""));
	context.send = (
		content: StringResolvable,
		options?: MessageEmbed | MessageAttachment | (MessageEmbed | MessageAttachment)[] | undefined) =>
	{
		return context.channel.send(content, options);
	};
	
	const command = commands.find((command: registeredCommand) =>
		command.aliases!.includes(String(context.args[0])) && command.prefixRequired != (hasPrefix ? "notallowed" : "require"));
	
	if(!command) return;
	
	command.execute(...convertCommandArgs(context, command, context.args));	// dont ask why, it works
}
