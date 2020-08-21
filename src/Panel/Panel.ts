import { TextChannel, GuildChannel, MessageEmbed, Message } from "discord.js";

import { Client } from "../Client";
import { PanelMessage } from "./PanelMessage";
import { isArray } from "util";

export class Panel
{
	constructor(channel: TextChannel | GuildChannel | string, client: Client)
	{
		this.client = client;

		if (typeof channel == "string")
		{
			const tmp = client.channels.cache.get(channel) as TextChannel;
			if (!tmp)
			{
				throw new Error("Invalid channel id: Could not instantiate panel");
			}
			this.channel = tmp;
		}
		else
			this.channel = channel as TextChannel;
	}
	public channel: TextChannel;

	public addReactions(handlers: ReactionHandler[] | ReactionHandler, key?: string)
	{
		const embed = this.findEmbed(key);

		if (isArray(handlers))
		{
			handlers.forEach((handler: ReactionHandler) =>
			{
				embed?.message.react(handler.emoji);
				embed?.reactionHandlers.push(handler);
			});
		}
		else
		{
			embed?.message.react(handlers.emoji);
			embed?.reactionHandlers.push(handlers);
		}
	}

	public async addEmbed(embedOrId: MessageEmbed | string, key?: string)
	{
		let message: Message;
		if (typeof embedOrId == "string")
		{
			message = await this.channel.messages.fetch(embedOrId) as Message;

			if (!message)
				throw new Error("Required message not found in specified channel");
		}
		else
			message = await this.channel.send({ embed: embedOrId });

		this.embeds.push(
			new PanelMessage(message, key ?? String(this.embeds.length - 1))
		);
	}

	private findEmbed(key: string | undefined): PanelMessage | undefined
	{
		let embed: PanelMessage | undefined = undefined;
		if (key)
			embed = this.embeds.find((embed: PanelMessage) => embed.key == key);

		else if (!key || !embed)
			embed = this.embeds[0];

		return embed;
	}

	public embeds: PanelMessage[] = []

	public destroy()
	{
		this.embeds.forEach((embed: PanelMessage) =>
		{
			if (embed.message.deletable)
				embed.message.delete();
		});
		this.destroyed = true;
	}

	public destroyed: boolean = false;

	public client: Client
}

export interface ReactionHandler
{
	emoji: string,
	execute: Function
}