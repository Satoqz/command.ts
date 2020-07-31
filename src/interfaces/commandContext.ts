import { Message, ClientUser, MessageEmbed, MessageAttachment } from "discord.js";
import { MessageOptions } from "child_process";
import { commandArg } from "./registeredCommand";

export type StringResolvable = string | string[] | any;

export interface commandContext extends Message
{
	args: commandArg[],
	me: ClientUser,
	send(
		content: StringResolvable,
		options?:
			| MessageEmbed
			| MessageAttachment
			| MessageOptions
			| (MessageEmbed | MessageAttachment)[],
	): Promise<Message>;
}
