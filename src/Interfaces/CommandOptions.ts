
export interface CommandOptions
{
	prefix?: "optional" | "require" | "notallowed",
	aliases?: string[],
	description?: string,
	usage?: string,
	disabled?: boolean
}
