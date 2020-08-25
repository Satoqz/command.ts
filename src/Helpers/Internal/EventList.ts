import { ClientEvents } from "discord.js";

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