import { Message, MessageEmbed, MessageAttachment } from "discord.js";
import { Client } from "./client";
import { registeredCommand, commandArg } from "./interfaces/registeredCommand";
import { commandContext, StringResolvable } from "./interfaces/commandContext";
import { commands } from "./storage/commands";
import { convertCommandArgs } from "./helpers/convertArgs";
import { split } from "./helpers/split";
import { prefixes, defaultPrefix } from "./storage/prefixes";

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
	
	if (!prefixes[message.guild!.id])
		prefixes[message.guild!.id] = defaultPrefix;
	
	if(message.content.startsWith(prefixes[message.guild!.id]))
	{
		hasPrefix = true;
		usedPrefix = prefixes[message.guild!.id];
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
