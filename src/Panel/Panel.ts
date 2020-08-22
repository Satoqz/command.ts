import {
	TextChannel,
	GuildChannel,
	MessageEmbed,
	Message,
	Channel,
	User,
	MessageReaction
} from "discord.js";
import { isArray } from "util";

import { Client } from "../Client";

export class Panel extends MessageEmbed
{
	constructor(options: PanelOptions, embedOptions: MessageEmbed | Object)
	{
		super(embedOptions);

		this.removeReactions = options.removeReactions ?? false;

		this.client = options.client;

		this.fetchChannel(options.channel);

		this.fetchMessage(options.message);

		this.handleReactions();
	}
	public channel?: TextChannel
	public message?: Message
	public client: Client

	public render()
	{
		this.message?.edit({ embed: this });
	}

	private handleReactions()
	{
		const filter = (reaction: MessageReaction, user: User) =>
			user.id != this.message?.client!.user!.id;

		const collector = this.message?.createReactionCollector(filter);

		collector?.on("collect", (reaction: MessageReaction, user: User) =>
		{
			const handler = this.reactionHandlers.find((handler: ReactionHandler) =>
				handler.emoji == reaction.emoji.name
			);
			if (!handler)
			{
				reaction.users.remove(user).catch();
				return;
			}
			handler.execute(reaction, user);
			if (this.removeReactions)
				reaction.users.remove(user).catch();
		});
	}

	public removeReactions: boolean

	public addReactions(handlers: ReactionHandler | ReactionHandler[])
	{
		if (isArray(handlers))
		{
			handlers.forEach((handler: ReactionHandler) =>
			{
				this.message?.react(handler.emoji);
				this.reactionHandlers.push(handler);
			});
		}
		else
		{
			this.message?.react(handlers.emoji);
			this.reactionHandlers.push(handlers);
		}
	}

	public reactionHandlers: ReactionHandler[] = []

	private async fetchMessage(identifier: Message | string | undefined)
	{
		if (!identifier)
		{
			this.message = await this.channel?.send({ embed: this });
			return;
		}

		else if (typeof identifier == "string")
			this.message = await this.channel?.messages.fetch(identifier);
		else
			this.message = identifier;

		if (this.message?.author.id != this.client.user?.id)
			throw new Error(
				"A fetched panel message must have been sent by the client, not another user"
			);

		this.message?.edit({ embed: this });
	}
	private async fetchChannel(
		identifier: TextChannel | GuildChannel | Channel | string
	)
	{
		if (typeof identifier == "string")
		{
			this.channel = this.client.channels.cache.get(identifier) as TextChannel;
			if (!this.channel)
				throw new Error("Invalid channel id: Could not instantiate panel");
		}
		else
			this.channel = identifier as TextChannel;
	}
}

export interface PanelOptions
{
	channel: TextChannel | GuildChannel | string,
	message?: Message | string,
	removeReactions?: boolean,
	client: Client
}

export interface ReactionHandler
{
	emoji: string,
	execute: (reaction: MessageReaction, user: User) => any
}