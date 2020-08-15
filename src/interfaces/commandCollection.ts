import { registeredCommand } from "./registeredCommand";

export interface CommandCollection
{
	list: registeredCommand[],
	groups: string[]
}