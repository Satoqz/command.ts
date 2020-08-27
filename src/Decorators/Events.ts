import { isConstructor } from "../Helpers/Internal/IsConstructor";
import { ClientEvents } from "discord.js";

/**
 * @description Class containing static methods (class decorators).
 * All methods of a class decorated with one of these methods will run
 * if the discord.js client event with the same name is emitted.
 */
export class Events
{
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static Message(parent: Function)
	{
		Events.addEvent("message", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static Ready(parent: Function)
	{
		Events.addEvent("ready", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static GuildCreate(parent: Function)
	{
		Events.addEvent("guildCreate", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static GuildDelete(parent: Function)
	{
		Events.addEvent("guildDelete", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static GuildMemberAdd(parent: Function)
	{
		Events.addEvent("guildMemberAdd", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static GuildMemberRemove(parent: Function)
	{
		Events.addEvent("guildMemberRemove", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static GuildMemberUpdate(parent: Function)
	{
		Events.addEvent("guildMemberUpdate", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static GuildUpdate(parent: Function)
	{
		Events.addEvent("guildUpdate", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static Invalidated(parent: Function)
	{
		Events.addEvent("invalidated", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static MessageDelete(parent: Function)
	{
		Events.addEvent("messageDelete", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static MessageUpdate(parent: Function)
	{
		Events.addEvent("messageUpdate", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static MessageReactionAdd(parent: Function)
	{
		Events.addEvent("messageReactionAdd", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static MessageReactionRemove(parent: Function)
	{
		Events.addEvent("messageReactionRemove", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static MessageReactionRemoveAll(parent: Function)
	{
		Events.addEvent("messageReactionRemoveAll", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static MessageReactionRemoveEmoji(parent: Function)
	{
		Events.addEvent("messageReactionRemoveEmoji", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static RateLimit(parent: Function)
	{
		Events.addEvent("rateLimit", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static ShardDisconnect(parent: Function)
	{
		Events.addEvent("shardDisconnect", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static ShardError(parent: Function)
	{
		Events.addEvent("shardError", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static ShardReady(parent: Function)
	{
		Events.addEvent("shardReady", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static ShardReconnecting(parent: Function)
	{
		Events.addEvent("shardReconnecting", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static ShardResume(parent: Function)
	{
		Events.addEvent("shardResume", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static TypingStart(parent: Function)
	{
		Events.addEvent("typingStart", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
	static UserUpdate(parent: Function)
	{
		Events.addEvent("userUpdate", parent);
	}
	/**
	 * @description Registers all class member methods to be run on the
	 * <Client>#on("message")` event in discord.js and receive the according arguments
	 * This is a `class decorator`.
	 */
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
	/**
	 * @description Storage of all registered discord.js `<Client>` events with their event name and method
	 */
	static store: { name: string, execute: Function }[] = []
}