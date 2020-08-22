import {
	TextChannel,
	GuildChannel,
	Message,
	Client,
	MessageEmbed,
	MessageReaction,
	User
} from "discord.js";

export interface PanelOptions
{
	channel: TextChannel | GuildChannel | string,
	message?: Message | string,
	removeReactions?: boolean,
	client: Client,
	embed: MessageEmbed | Object
}

export interface ReactionHandler
{
	emoji: string,
	execute: (reaction: MessageReaction, user: User) => any
}

export type ReactionCallback = (reaction: MessageReaction, user: User) => any