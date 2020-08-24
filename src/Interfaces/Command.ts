import { CommandOptions } from "./CommandOptions";
import { User, GuildMember, TextChannel, Role } from "discord.js";

export interface Command extends CommandOptions
{
	execute: Function,
	group: string,
	name: string,
	aliases: string[],
	prefix: "optional" | "require" | "notallowed",
	paramTypes: ParamType[],
	paramNames: string[]
}

export type CommandParam =
	| string
	| number
	| boolean
	| User
	| GuildMember
	| TextChannel
	| Role
	| undefined;

export type ParamType =
	| "string"
	| "number"
	| "boolean"
	| "user"
	| "guildmember"
	| "textchannel"
	| "role"
	| "infinite";
