import {
	Message,
	ClientUser,
	MessageEmbed,
	MessageAttachment
} from "discord.js";
import { MessageOptions } from "child_process";
import { CommandParam } from "./Command";
import { Client } from "../Client";
import { Command } from "./Command";

/**
 * @internal
 */
export type StringResolvable = string | string[] | any;

/**
 * @alias Context
 */
export interface CommandContext extends Message
{
	args: CommandParam[],
	me: ClientUser,
	usedAlias: string,
	usedPrefix: string,
	command: Command,
	c: Client
	send(
		content: StringResolvable,
		options?:
			| MessageEmbed
			| MessageAttachment
			| MessageOptions
			| (MessageEmbed | MessageAttachment)[],
	): Promise<Message>;
}
