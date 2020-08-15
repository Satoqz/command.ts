import { BaseProv } from "../Database/BaseProv";

export interface ClientOptions
{
	defaultPrefix?: string,
	ownerId?: string,
	database?: BaseProv
}
