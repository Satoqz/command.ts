import { registeredCommand } from "../interfaces/registeredCommand";

/**
 * This is a central collection of all registered commands.<br>
 * This could be used to make a dynamic help command
 */
export const commands: registeredCommand[] = [];

/**
 * This is a central collection of all registered command Groups.<br>
 * This can help you split e.g. a help command into groups
 */
export const commandGroups: string[] = [];
