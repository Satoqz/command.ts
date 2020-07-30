import { Message, ClientUser, MessageEmbed, MessageAttachment } from "discord.js";
import { MessageOptions } from "child_process";

export type StringResolvable = string | string[] | any;

export interface commandContext extends Message {
	args: string[],
	me: ClientUser,
	send(
		content: StringResolvable,
		options?: MessageEmbed | MessageAttachment | (MessageEmbed | MessageAttachment)[] | MessageOptions | undefined,
	): Promise<Message>;
}