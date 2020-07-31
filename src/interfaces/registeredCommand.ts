import { commandOptions } from "./commandOptions";
import { User, GuildMember, TextChannel } from "discord.js";

export interface registeredCommand extends commandOptions
{
	execute: Function,
	group: string,
	name: string,
	prefixRequired: "optional" | "require" | "notallowed",
	argsTypes: argType[]
}

export type commandArg = string | number | boolean | User | GuildMember | TextChannel | undefined;
export type argType = "string" | "number" | "boolean" | "user" | "guildmember" | "textchannel";
