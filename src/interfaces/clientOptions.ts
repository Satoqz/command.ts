import { baseProv } from "../database/baseProv";

export interface clientOptions
{
	defaultPrefix?: string,
	ownerId?: string,
	database?: baseProv
}
