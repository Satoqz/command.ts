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

	public av(me?: boolean): string | undefined {
		if(me) {
			if(me == true) {
				return this.me.displayAvatarURL();
			}
		}
		return this.author?.displayAvatarURL();
	}
	
	public react(emoji: DJS.EmojiIdentifierResolvable)
		: Promise<DJS.MessageReaction>
	{
		return this.msg.react(emoji);
	}
}
