import { BaseProv } from "../Database/BaseProv";

export interface ClientOptions
{
	prefixes?: string[],
	ownerId?: string,
	database?: BaseProv,
	loadDirs?: string | string[]
}
