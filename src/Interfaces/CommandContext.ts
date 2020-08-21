import {
	Message,
	ClientUser,
	MessageEmbed,
	MessageAttachment
} from "discord.js";
import { MessageOptions } from "child_process";
import { CommandArg } from "./RegisteredCommand";
import { BaseProv } from "../Database/BaseProv";
import { Client } from "../Client";

/**
 * @internal
 */
export type StringResolvable = string | string[] | any;

/**
 * @alias Context
 */
export interface CommandContext extends Message
{
	args: CommandArg[],
	me: ClientUser,
	usedAlias: string,
	usedPrefix: string,
	dbContext: BaseProv,
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
