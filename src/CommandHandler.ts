import { Message,
	MessageEmbed,
	MessageAttachment,
	ClientUser
} from "discord.js";
import { Client } from "./Client";
import { RegisteredCommand } from "./Interfaces/RegisteredCommand";
import { CommandContext, StringResolvable } from "./Interfaces/CommandContext";
import { commands } from "./Storage/Commands";
import { convertArgs } from "./Helpers/Internal/ConvertArgs";
import { split } from "./Helpers/Internal/Split";

/**
 * This is executed every time a command is called
 * @param client The client to be used
 * @param message The mesage recived
 * @internal
 */
export async function commandHandler(client: Client, message: Message)
{
	if (message.author.bot) return;

	let hasPrefix = false;
	let usedPrefix = "";

	// If there is no guild, it is probably a DM channel
	const guildId = message.guild?.id ?? "dms";
	const guildPref =
		client.dbContext.getDocumentById<string>("PrefixConfig", guildId) ??
		client.dbContext.getDocumentById<string>("PrefixConfig", "defaultPrefix")!;

	if (message.content.startsWith(guildPref))
	{
		hasPrefix = true;
		usedPrefix = guildPref;
	}

	if (!message.content.startsWith(usedPrefix))
		return;

	const context = message as CommandContext;

	// create args with command keyword kept
	context.args = split(context.content.replace(usedPrefix, ""));

	const command = commands.list.find((command: RegisteredCommand) =>
		command.aliases!.includes(
			String(context.args[0])) &&
			command.prefixRequired != (hasPrefix ? "notallowed" : "require"));

	if (!command) return;

	// we are now sure that the command will be executed: finish composing the context object

	context.usedAlias = String(context.args[0]);
	// remove command keyword / alias
	context.args = context.args.slice(1, context.args.length);
	context.usedPrefix = usedPrefix;
	context.dbContext = client.dbContext;
	context.c = client;
	context.me = client.user as ClientUser;
	context.command = command;
	context.send = (
		content: StringResolvable,
		options?:
			| MessageEmbed
			| MessageAttachment
			| (MessageEmbed | MessageAttachment)[]
	) => context.channel.send(content, options);

	command.execute(context, ...convertArgs(context, command));
}
