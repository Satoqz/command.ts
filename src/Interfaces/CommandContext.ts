import {
	Message,
	ClientUser,
	MessageOptions,
	APIMessage,
	MessageAdditions
} from "discord.js";

import { CommandParam, Command } from "./Command";
import { Client } from "../Client";

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
	client: Client
	/**
	 * Shortcut to `<CommandContext>.channel.send`.
	 */
	send(
		options: MessageOptions
		): Promise<Message[]>;
	send(
		options: MessageOptions | APIMessage
		): Promise<Message | Message[]>;
	send(
		content: StringResolvable,
		options?: (MessageOptions & { split?: false }) | MessageAdditions
		): Promise<Message>;
	send(
		content: StringResolvable,
		options?: MessageOptions
		): Promise<Message[]>;
	send(
		content: StringResolvable,
		options?: MessageOptions
		): Promise<Message | Message[]>;
}
