import { commandOptions } from "./commandOptions";
import { commandContext } from "./commandContext";

export interface registeredCommand extends commandOptions
{
	execute: Function,
	group: string,
	name: string,
	prefixRequired: "optional" | "require" | "notallowed",
	argsTypes: argType[]
}

export type commandArg = string | number | boolean | commandContext | undefined;

export type argType = "string" | "number" | "boolean" | "context";