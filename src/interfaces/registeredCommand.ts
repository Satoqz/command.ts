
export interface RegisteredCommand
{
	execute: Function,
	group: string,
	name: string,
	aliases: string[],
	prefixless: boolean,
	onlyPrefixless: boolean,
	description?: string,
	usage?: string
}