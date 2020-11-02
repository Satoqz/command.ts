import { ClientEvents } from "discord.js";

/**
 * Simple utility array used to register discord.js client events using a loop
 */
export const eventList: Array<keyof ClientEvents> = [
	"message",
	"ready",
	"error",
	"guildCreate",
	"guildDelete",
	"guildMemberAdd",
	"guildMemberRemove",
	"guildMemberUpdate",
	"guildUpdate",
	"invalidated",
	"messageDelete",
	"messageUpdate",
	"messageReactionAdd",
	"messageReactionRemove",
	"messageReactionRemoveAll",
	"messageReactionRemoveEmoji",
	"rateLimit",
	"shardDisconnect",
	"shardError",
	"shardReady",
	"shardReconnecting",
	"shardResume",
	"typingStart",
	"userUpdate",
	"warn"
];