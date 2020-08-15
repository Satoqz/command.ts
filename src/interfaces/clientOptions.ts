import { BaseProv } from "../database/BaseProv";

export interface ClientOptions
{
	defaultPrefix?: string,
	ownerId?: string,
	database?: BaseProv
}
