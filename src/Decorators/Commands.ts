import { Command } from "../Interfaces/Command";
import { CommandOptions } from "../Interfaces/CommandOptions";
import { isConstructor } from "../Helpers/Internal/IsConstructor";

/**
 * The methods in this class are decorator factories used to define command groups and further properties for command methods.
 * It also allows you to read all registered commands and command groups using the {@link Commands.store} or {@linkCommands.groups} properties.
 */
export class Commands
{
	/**
	 * Use this decorator factory on a class to register a command group.
	 * All member methods of the class will be registered as commands, naming them after the method name.<br>
	 * Group takes an optional argument to give your group a name.
	 * Command groups are extensible over multiple files by giving them the same name
	 *
	 * ```
	 * // example
	 *
	 *‏‏‎ @Commands.Group("Simple commands")
	 * class SimpleCommands {
	 * 		ping(ctx: Context) {
	 * 			ctx.send("pong!");
	 *		}
	 * }
	 * ```
	 * @alias {@link Group}
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
					run: descriptor?.value,
					prefix: "require",
					paramTypes: [],
					paramNames: [],
					defaultName: true
				});
			});
		};
	}
	/**
	 * Use this decorator factory on a method within a command group class to define additional properties for the command.
	 * All available options can be found here: {@link CommandOptions}
	 *
	 * ```
	 * // example
	 *
	 * // let's define additional properties for our ping command
	 *
	 *‏‏‎ @Commands.Group("Simple commands")
	 * class SimpleCommands {
	 *
	 * 	‏‏‎	  ‏‏‎ ‎‎@Commands.Meta({ description: "Play ping pong", aliases: ["pingpong"] })
	 * 		ping(ctx: Context) {
	 * 			ctx.send("pong!");
	 *		}
	 * }
	 * ```
	 * Commands.Meta can be shortcutted by importing the alias `Meta`.
	 *
	 * @alias {@link Meta}
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
					if (options?.defaultName)
					{
						command.aliases.shift();
						command.name = command.aliases[0];
					}
					Commands.store[index] = command;
				}
			}, 0);
		};
	}

	/**
	 * Central storage of all registered commands.
	 * This is the property to use in order to generate dynamic help commands.
	*/
	static store: Command[] = [];
	/**
	 * Central storage of all registered group names.
	 * This is useful if you want to provide a list of command groups/categories.
	*/
	static groups: string[] = [];
}

/**
 * @alias {@link Commands.Group}
 */
export const Group = Commands.Group;
/**
 * @alias {@link Commands.Meta}
 */
export const Meta = Commands.Meta;

