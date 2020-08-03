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
 * @internal
 */
export async function commandHandler(client: Client, message: Message)
{
	const context = message as commandContext;
	let hasPrefix = false;
	let usedPrefix = "";

	client.prefixes.forEach((prefix: string) =>
	{
		if(message.content.startsWith(prefix))
		{
			hasPrefix = true;
			usedPrefix = prefix;
		}
	});

	context.args = split(context.content.replace(usedPrefix, ""));
	context.c = client;
	context.send = (
		content: StringResolvable,
		options?: MessageEmbed | MessageAttachment | (MessageEmbed | MessageAttachment)[] | undefined,
	) =>
	{
		return context.channel.send(content, options);
	};

	const command = commands.find((command: registeredCommand) =>
		command.aliases!.includes(String(context.args[0])) && command.prefixRequired != (hasPrefix ? "notallowed" : "require"));

	if(!command) return;

	context.args = context.args.slice(1, context.args.length);

	command.execute(context, ...convertCommandArgs(context, command, context.args));	// dont ask why, it works
}
