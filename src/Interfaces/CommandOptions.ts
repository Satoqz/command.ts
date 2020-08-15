
export interface CommandOptions
{
	prefixRequired?: "optional" | "require" | "notallowed",
	aliases?: string[],
	description?: string,
	usage?: string,
}
