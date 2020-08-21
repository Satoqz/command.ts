import { Message, MessageReaction, User } from "discord.js";
import { ReactionHandler } from "./Panel";

export class PanelMessage
{
	constructor(message: Message, key: string, removeReactions?: boolean)
	{
		this.message = message;
		this.key = key;
		this.removeReactions = removeReactions ?? false;

		const filter = (reaction: MessageReaction, user: User) =>
			user.id != this.message.client!.user!.id;

		const collector = this.message.createReactionCollector(filter);

		collector.on("collect", (reaction: MessageReaction, user: User) =>
		{
			const handler = this.reactionHandlers.find((handler: ReactionHandler) =>
				handler.emoji == reaction.emoji.name
			);
			if (!handler)
			{
				reaction.remove().catch();
				return;
			}
			handler.execute(reaction, user);
			if (this.removeReactions)
				reaction.remove().catch();
		});
	}
	public message: Message
	public key: string
	public reactionHandlers: ReactionHandler[] = []
	public removeReactions: boolean
}