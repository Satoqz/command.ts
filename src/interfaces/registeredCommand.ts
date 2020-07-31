
export interface registeredCommand
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