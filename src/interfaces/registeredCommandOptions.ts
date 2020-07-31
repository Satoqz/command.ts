
export interface registeredCommandOptions
{
	execute: Function,
	group: string,
	name: string,
	prefixless: boolean,
	onlyPrefixless: boolean,
	aliases: string[],
	description?: string,
	usage?: string
}
