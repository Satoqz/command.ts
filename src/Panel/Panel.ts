import {
	TextChannel,
	GuildChannel,
	MessageEmbed,
	Message,
	Channel,
	User,
	MessageReaction,
	Client
} from "discord.js";

import {
	PanelOptions,
	ReactionCallback,
	ReactionHandler
} from "../Interfaces/PanelInterfaces";

export class Panel extends MessageEmbed
{
	constructor(options: PanelOptions)
	{
		super(options.embed);

		this.removeReactions = options.removeReactions ?? false;

		this.client = options.client;

		this.fetchChannel(options.channel)
			.then(() => this.fetchMessage(options.message))
			.then(() => this.handleReactions());
	}

	public channel?: TextChannel
	public message?: Message
	public client: Client
	public removeReactions: boolean
	public reactionHandlers: ReactionHandler[] = []

	public addReaction(emoji: string, callback: ReactionCallback)
	{
		function run(panel: Panel)
		{
			panel.message?.react(emoji);
			panel.reactionHandlers.push(
				{
					emoji: emoji,
					execute: callback
				}
			);
		}

		if (this.ready)
			run(this);
		else
			this.on("ready", () => run(this));
	}

	public render()
	{
		this.message?.edit({ embed: this });
	}

	private ready = false

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

		this.ready = true;
		this.emit("ready");
	}

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

	// very  simple event emitter implementation to internally communicate

	private listeners: {name: string, callback: Function}[] = [];

	private emit(eventName: string)
	{
		this.listeners
			.filter(({ name }) => name == eventName)
			.forEach(listener => listener.callback());
	}
	private on(name: string, callback: Function)
	{
		this.listeners.push({ name, callback });
	}
}
