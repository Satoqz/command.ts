import { RegisteredCommand } from "./RegisteredCommand";

export interface CommandCollection
{
	list: RegisteredCommand[],
	groups: string[]
}