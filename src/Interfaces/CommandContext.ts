import {
	Message,
	ClientUser,
	MessageOptions,
	MessageEmbed,
	MessageAttachment
} from "discord.js";

import { CommandParam } from "./Command";
import { Client } from "../Client";
import { Command } from "./Command";

/**
 * @internal
 */
export type StringResolvable = string | string[] | any;

/**
 * An extended version of the
 * discord.js [Message]("https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/Message")
 * class adding some utility/shortcuts and additional information on command invocation
 * @alias Context
 */
export interface CommandContext extends Message
{
	args: CommandParam[],
	/**
	 * Shortcut to `<CommandContext>.client.user`.
	 */
	me: ClientUser,
	/**
	 * The alias that invoked the command.
	 */
	usedAlias: string,
	/**
	 * The prefix that invoked the command.
	 */
	usedPrefix: string,
	/**
	 * The invoked command.
	 */
	command: Command,
	/**
	 * Shortcut to `<CommandContext>.client.user`.
	 */
	c: Client
	/**
	 * Shortcut to `<CommandContext>.channel.send`.
	 */
	send(
		content: StringResolvable,
		options?:
			| MessageEmbed
			| MessageAttachment
			| MessageOptions
			| (MessageEmbed | MessageAttachment)[],
	): Promise<Message>;
}
