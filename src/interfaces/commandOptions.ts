export interface commandOptions
{
	prefixRequired?: "optional" | "require" | "notallowed",
	aliases?: string[],
	description?: string,
	usage?: string,
}
