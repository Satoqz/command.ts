import * as DJS from "discord.js";

export class RegisteredCommand
{
	constructor(name: string)
	public execute: Function;
	public name: string;
	public group: string;
}

export class Client extends DJS.Client
{
	constructor(options: clientOptions)
	public group(constructorFunction: Function): void;
	public commandGroups: string[];
	public token: string;
	public prefixes: string[];
	public commands: RegisteredCommand[];
	public command(options?: commandOptions): Function;
	public permission(permission: DJS.PermissionString | DJS.PermissionString[]): Function;
	public owner(): Function;
	public autoImport(dir: string): void;
}

export class Context
{
	constructor(message: DJS.Message, args?: string[]);

	public me: DJS.ClientUser;

	public args?: string[];
	public originalMessage: DJS.Message;
	
	public text?: string;
	public author?: DJS.User;
	public publishedByBot: boolean;
	public createdAt: Date;

	/**
	 * Reply to the message
	 * @param options Message content, e.g. string
	 * @param tag Tag the author of the message, default false
	 * @returns Message sent
	 */
	public reply(
		options?:
		| DJS.MessageOptions
		| DJS.MessageAdditions
		| DJS.APIMessage
		| (DJS.MessageOptions & { split?: false })
		| DJS.MessageAdditions
		| DJS.APIMessage
		| DJS.StringResolvable,
		tag?: boolean): Promise<DJS.Message>;
	
	/**
	 * Get users or bots avatar
	 * @param me true for bot/client; false or undefined for author of message
	 * @returns Returns URL as string
	 */
	public av(me?: boolean): string;

	/**
	 * React to a message
	 * @param emoji The emoji you want to react with, e.g. "☕"
	 * @returns Returns reaction
	 */
	public react(emoji: DJS.EmojiIdentifierResolvable): Promise<DJS.Message | DJS.Message[]>
}

export function reload(path: string): Promise<{message: string}>;

export function permission(permission: DJS.PermissionString | DJS.PermissionString[]): Function;

export function noDM(): Function;

export interface commandOptions
{
	prefixless?: boolean,
	onlyPrefixless?: boolean,
	aliases?: string[],
	description?: string | undefined,
	usage?: string | undefined
}

export interface registeredCommandOptions
{
	execute: Function,
	group: string,
	name: string,
	prefixless: boolean,
	onlyPrefixless: boolean,
	aliases: string[],
	description: string | undefined,
	usage: string | undefined
}	

export interface clientOptions
{
	prefixes?: string[],
	ownerId?: string,
	noDM?: boolean,
	autoImport?: string,
	token: string
}
