import { Command } from "./Interfaces/Command";
import { CommandOptions } from "./Interfaces/CommandOptions";
import { isConstructor } from "./Helpers/Internal/IsConstructor";

export class Commands
{
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

	static store: Command[] = [];
	static groups: string[] = [];
}

export const Group = Commands.Group;
export const Meta = Commands.Meta;

