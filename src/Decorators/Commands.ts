import { Command } from "../Interfaces/Command";
import { CommandOptions } from "../Interfaces/CommandOptions";
import { isConstructor } from "../Helpers/Internal/IsConstructor";

/**
 * @description Class containing static methods to register command groups and command meta info.
 * You can also access all registered commands using the `store` property or list all command group names using `groups`
 */
export class Commands
{
	/**
	 * @description Use this **class decorator** to register a class and its member methods
	 * as a command group with its method as commands
	 * @param name The name of your command group (optional)
	 */
	static Group(name: string = "Groupless")
	{
		return function(parent: Object | Function)
		{
			// is not a class
			if (typeof parent != "function")
				return;

			Object.getOwnPropertyNames(parent.prototype).forEach((key: string) =>
			{
				const descriptor = Object.getOwnPropertyDescriptor(parent.prototype, key);

				if (isConstructor(descriptor?.value))
					return;

				const duplicateCommand: Command | undefined =
					Commands.store.find((command: Command) => command.name == key);

				if (duplicateCommand)
					Commands.store.splice(Commands.store.indexOf(duplicateCommand), 1);

				const alreadyPushedGroup =
					Commands.groups.find((group: string) => group == name);

				if (!alreadyPushedGroup) Commands.groups.push(name);
				Commands.store.push({
					group: name,
					name: key,
					description: "No description",
					usage: "No information",
					aliases: [key],
					execute: descriptor?.value,
					prefix: "require",
					paramTypes: [],
					paramNames: []
				});
			});
		};
	}
	/**
	 * @description Use this **method decorator** to define additional information
	 * for your command methods (e.g. aliases, description)
	 * @param options Additional data to add to your command method
	 */
	static Meta(options?: CommandOptions)
	{
		return function(
			parent: Object,
			name: string,
		)
		{
			if (typeof parent != "object")
				throw new Error("Use the Command decorator on methods only");
			const interval = setInterval(() =>
			{
				const command: Command | undefined =
				Commands.store.find((command: Command) =>
					command.name == name);

				if (command)
				{
					clearInterval(interval);
					const index = Commands.store.indexOf(command);
					if (options?.aliases)
						command.aliases = command.aliases.concat(options.aliases);
					if (options?.usage)
						command.usage = options.usage;
					if (options?.description)
						command.description = options.description;
					if (options?.prefix)
						command.prefix = options?.prefix;
					Commands.store[index] = command;
				}
			}, 0);
		};
	}

	/**
	 * @description Main storage of all registered commands.
	 * This is the property to use in otder to generate dynamic help commands
	*/
	static store: Command[] = [];
	/**
	 * @description Main storage of all registered group names.
	 * This is useful if you want to provide a list of command groups/categories
	*/
	static groups: string[] = [];
}

/**
 * @description Shorthand alias for `Commands.Group`
 * @alias Commands.Group
 */
export const Group = Commands.Group;
/**
 * @description Shorthand alias for `Commands.Meta`
 * @alias Commands.Meta
 */
export const Meta = Commands.Meta;

