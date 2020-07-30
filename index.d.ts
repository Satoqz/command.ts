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
	public permission(permission: DJS.PermissionString | DJS.PermissionString[]): Function;
	public owner(): Function;
}

export function reload(path: string): void;

export function permission(permission: DJS.PermissionString | DJS.PermissionString[]): Function;

export function noDM(): Function;
export interface commandOptions {
	prefixless?: boolean,
	onlyPrefixless?: boolean,
	aliases?: string[],
	description?: string | undefined,
	usage?: string | undefined
}

export interface registeredCommandOptions {
	execute: Function,
	group: string,
	name: string,
	prefixless: boolean,
	onlyPrefixless: boolean,
	aliases: string[],
	description: string | undefined,
	usage: string | undefined
}	

export interface clientOptions {
	prefixes?: string[],
	ownerId?: string,
	noDM?: boolean,
	token: string
}