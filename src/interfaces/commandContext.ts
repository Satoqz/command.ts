import { Message, ClientUser, MessageEmbed, MessageAttachment } from "discord.js";
import { MessageOptions } from "child_process";
import { commandArg } from "./registeredCommand";
import { baseProv } from "../database/baseProv";
import { Client } from "../client";

/**
 * @internal
 */
export type StringResolvable = string | string[] | any;

/**
 * @alias Context
 */
export interface commandContext extends Message
{
	args: commandArg[],
	me: ClientUser,
	dbContext: baseProv,
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
