import { CommandOptions } from "./CommandOptions";
import { User, GuildMember, TextChannel, Role } from "discord.js";

export interface Command extends CommandOptions
{
	/**
	 * The actual method that runs the command.
	 */
	run: Function,
	/**
	 * The name of the group that the command belongs to.
	 */
	group: string,
	/**
	 * The main name of the command,
	 * either its method name or the name of the first alias depending on {@link CommandOptions.defaultName}.
	 */
	name: string,
	/**
	 * {@link CommandOptions.aliases}
	 */
	aliases: string[],
	/**
	 * {@link CommandOptions.prefix}
	 */
	prefix: "optional" | "require" | "notallowed",
	/**
	 * {@link CommandOptions.defaultName}
	 */
	defaultName: boolean
	/**
	 * The types that the arguments of a command invocation should be parsed to.
	 */
	paramTypes: ParamType[],
	/**
	 * The self-defined names of a command's parameters.
	 */
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
