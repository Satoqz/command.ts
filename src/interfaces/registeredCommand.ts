import { commandOptions } from "./commandOptions";

export interface registeredCommand extends commandOptions
{
	execute: Function,
	group: string,
	name: string,
	prefixRequired: "optional" | "require" | "notallowed",
	argsTypes: argType[]
}

export type commandArg = string | number | boolean | undefined;
export type argType = "string" | "number" | "boolean";
