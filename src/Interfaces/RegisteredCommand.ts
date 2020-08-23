import { CommandOptions } from "./CommandOptions";
import { User, GuildMember, TextChannel, Role } from "discord.js";

export interface RegisteredCommand extends CommandOptions
{
	execute: Function,
	group: string,
	name: string,
	prefixRequired: "optional" | "require" | "notallowed",
	argsTypes: ArgType[],
	argsNames: string[]
}

export type CommandArg =
	| string
	| number
	| boolean
	| User
	| GuildMember
	| TextChannel
	| Role
	| undefined;

export type ArgType =
	| "string"
	| "number"
	| "boolean"
	| "user"
	| "guildmember"
	| "textchannel"
	| "role"
	| "infinite";
