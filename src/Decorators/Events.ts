import { isConstructor } from "../Helpers/Internal/IsConstructor";
import { ClientEvents } from "discord.js";

export class Events
{
	static Message(parent: Function)
	{
		Events.addEvent("message", parent);
	}
	static Ready(parent: Function)
	{
		Events.addEvent("ready", parent);
	}
	static GuildCreate(parent: Function)
	{
		Events.addEvent("guildCreate", parent);
	}
	static GuildDelete(parent: Function)
	{
		Events.addEvent("guildDelete", parent);
	}
	static GuildMemberAdd(parent: Function)
	{
		Events.addEvent("guildMemberAdd", parent);
	}
	static GuildMemberRemove(parent: Function)
	{
		Events.addEvent("guildMemberRemove", parent);
	}
	static GuildMemberUpdate(parent: Function)
	{
		Events.addEvent("guildMemberUpdate", parent);
	}
	static GuildUpdate(parent: Function)
	{
		Events.addEvent("guildUpdate", parent);
	}
	static Invalidated(parent: Function)
	{
		Events.addEvent("invalidated", parent);
	}
	static MessageDelete(parent: Function)
	{
		Events.addEvent("messageDelete", parent);
	}
	static MessageUpdate(parent: Function)
	{
		Events.addEvent("messageUpdate", parent);
	}
	static MessageReactionAdd(parent: Function)
	{
		Events.addEvent("messageReactionAdd", parent);
	}
	static MessageReactionRemove(parent: Function)
	{
		Events.addEvent("messageReactionRemove", parent);
	}
	static MessageReactionRemoveAll(parent: Function)
	{
		Events.addEvent("messageReactionRemoveAll", parent);
	}
	static MessageReactionRemoveEmoji(parent: Function)
	{
		Events.addEvent("messageReactionRemoveEmoji", parent);
	}
	static RateLimit(parent: Function)
	{
		Events.addEvent("rateLimit", parent);
	}
	static ShardDisconnect(parent: Function)
	{
		Events.addEvent("shardDisconnect", parent);
	}
	static ShardError(parent: Function)
	{
		Events.addEvent("shardError", parent);
	}
	static ShardReady(parent: Function)
	{
		Events.addEvent("shardReady", parent);
	}
	static ShardReconnecting(parent: Function)
	{
		Events.addEvent("shardReconnecting", parent);
	}
	static ShardResume(parent: Function)
	{
		Events.addEvent("shardResume", parent);
	}
	static TypingStart(parent: Function)
	{
		Events.addEvent("typingStart", parent);
	}
	static UserUpdate(parent: Function)
	{
		Events.addEvent("userUpdate", parent);
	}
	static Warn(parent: Function)
	{
		Events.addEvent("warn", parent);
	}
	private static addEvent(name: keyof ClientEvents, parent: Function)
	{
		Object.getOwnPropertyNames(parent.prototype).forEach((key: string) =>
		{
			const descriptor = Object.getOwnPropertyDescriptor(parent.prototype, key);

			if (isConstructor(descriptor?.value))
				return;

			Events.store.push({ name: name, execute: descriptor?.value });
		});
	}
	static store: { name: string, execute: Function }[] = []
}