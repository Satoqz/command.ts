import { Message,
	MessageEmbed,
	MessageAttachment,
	ClientUser
} from "discord.js";

import { Client } from "./Client";
import { Command } from "./Interfaces/Command";
import { CommandContext, StringResolvable } from "./Interfaces/CommandContext";
import { Commands } from "./Decorators/Commands";
import { convertArgs } from "./Helpers/ConvertArgs";
import { split } from "./Helpers/Split";

/**
 * The main command handler logic, validates input, finds command, creates context object.
 * @internal
 */
export async function commandHandler(message: Message, prefixes: string | string[])
{
	const client = message.client as Client;

	if (
		message.author.bot
		&& (
			(
				message.author.id == client.user!.id && !client.listenToSelf
			)
			|| !client.listenToBots && !client.listenToSelf
		)
	)
		return;

	let hasPrefix = false;
	let usedPrefix = "";

	if (Array.isArray(prefixes))
	{
		for (const prefix of prefixes)
		{
			if (message.content.startsWith(prefix))
			{
				usedPrefix = prefix;
				hasPrefix = true;
				break;
			}
		}
	}
	else
	{
		if (message.content.startsWith(prefixes))
		{
			hasPrefix = true;
			usedPrefix = prefixes;
		}
	}

	const context = message as CommandContext;

	// create args with command keyword kept
	context.args = split(context.content.replace(usedPrefix, ""));

	const command = Commands.store.find((command: Command) =>
		command.aliases!.includes(
			String(context.args[0])) &&
			command.prefix != (hasPrefix ? "notallowed" : "require")
	);

	if (!command) return;

	// we are now sure that the command will be rund: finish composing the context object

	context.usedAlias = String(context.args[0]);
	// remove command keyword / alias
	context.args = context.args.slice(1, context.args.length);
	context.usedPrefix = usedPrefix;
	context.c = client;
	context.me = client.user as ClientUser;
	context.command = command;
	// @ts-ignore
	// this is impossible to get the typings right for here
	context.send = (a, b) => context.channel.send(a, b);

	command.run(context, ...convertArgs(context));
}