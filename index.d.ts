import * as DJS from "discord.js";

export class RegisteredCommand {
	constructor(name: string)
	public execute: Function;
	public name: string;
	public group: string;
}

export class Client extends DJS.Client {
	constructor(options: clientOptions)
	public group(constructorFunction: Function): void;
	public commandGroups: string[];
	public token: string;
	public prefixes: string[];
	public commands: RegisteredCommand[];
	public command(options?: commandOptions): Function;
}

export function reload(path: string): void;

export interface commandOptions {
	guildOnly?: boolean,
	prefixless?: boolean,
	onlyPrefixless?: boolean,
	aliases?: string[]
}

export interface registeredCommandOptions {
	execute: Function,
	aliases: string[],
	group: string,
	name: string,
	prefixless: boolean,
	onlyPrefixless: boolean
}

export interface clientOptions {
	prefixes?: string[],
	token: string
}