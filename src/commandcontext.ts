import * as DJS from "discord.js";

export default class CommandContext
{
	constructor(message: DJS.Message, args?: string[]) 
	{
		this.me = message.client.user!;
		
		this.args = args;
		this.msg = message;

		this.text = message.content;
		this.author = message.author;
		this.publishedByBot = message.author.bot;
		this.createdAt = message.createdAt;
	}

	public me!: DJS.ClientUser;

	public readonly args?: string[];
	public readonly msg!: DJS.Message;
	
	public readonly text?: string;
	public readonly author?: DJS.User;
	public readonly publishedByBot: boolean = false;
	public readonly createdAt!: Date;

	/**
	 * Reply to the message
	 * @param options Message content, e.g. string
	 * @param tag Tag the author of the message, default false
	 * @returns Message sent
	 */
	public reply(
		options:
		| DJS.MessageOptions
		| DJS.MessageAdditions
		| DJS.APIMessage
		| (DJS.MessageOptions & { split?: false })
		| DJS.MessageAdditions
		| DJS.APIMessage
		| DJS.StringResolvable,
		tag?: boolean): Promise<DJS.Message>
	{
		if (tag) {
			if(tag == true) {
				return this.msg.reply(options);
			}
		}
		return this.msg.channel.send(options);
	}

	/**
	 * Get users or bots avatar URL
	 * @param me True for bot/client; false or undefined for author of message
	 * @returns Returns URL as string
	 */
	public av(me?: boolean): string
	{
		if (me == true) 
			return this.me.displayAvatarURL();
		else return this.author?.displayAvatarURL()!;
	}
	
	/**
	 * React to a message
	 * @param emoji The emoji you want to react with, e.g. "☕"
	 * @returns Returns reaction
	 */
	public react(emoji: DJS.EmojiIdentifierResolvable)
		: Promise<DJS.MessageReaction>
	{
		return this.msg.react(emoji);
	}
}
