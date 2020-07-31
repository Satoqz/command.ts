import { commandOptions } from "./commandOptions";

export interface registeredCommand extends commandOptions
{
	execute: Function,
	group: string,
	name: string,
	prefixRequired: "optional" | "require" | "notallowed",
}