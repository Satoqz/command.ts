import { Message, MessageEmbed, MessageAttachment } from "discord.js";
import { Client } from "./Client";
import { RegisteredCommand } from "./Interfaces/RegisteredCommand";
import { CommandContext, StringResolvable } from "./Interfaces/CommandContext";
import { commands } from "./Storage/Commands";
import { convertArgs } from "./helpers/Internal/ConvertArgs";
import { split } from "./helpers/Internal/Split";

/**
 * This is executed every time a command is called
 * @param client The client to be used
 * @param message The mesage recived
 * @internal
 */
export async function commandHandler(client: Client, message: Message)
{
	let hasPrefix = false;
	let usedPrefix = "";

	// If there is no guild, it is probably a DM channel
	const guildId = message.guild?.id ?? "dms";
	const guildPref = client.dbContext.getDocumentById<string>("PrefixConfig", guildId)
		?? client.dbContext.getDocumentById<string>("PrefixConfig", "defaultPrefix")!;

	if (message.content.startsWith(guildPref))
	{
		hasPrefix = true;
		usedPrefix = guildPref;
	}

	if (!message.content.startsWith(usedPrefix))
		return;

	const context = message as CommandContext;
	context.dbContext = client.dbContext;
	context.c = client;
	context.send = (
		content: StringResolvable,
		options?: MessageEmbed | MessageAttachment | (MessageEmbed | MessageAttachment)[] | undefined
	) => context.channel.send(content, options);

	// create args with command keyword kept
	context.args = split(context.content.replace(usedPrefix, ""));

	const command = commands.list.find((command: RegisteredCommand) =>
		command.aliases!.includes(String(context.args[0])) && command.prefixRequired != (hasPrefix ? "notallowed" : "require"));

	if (!command) return;

	// remove command keyword
	context.args = context.args.slice(1, context.args.length);

	command.execute(context, ...convertArgs(context, command));
}
