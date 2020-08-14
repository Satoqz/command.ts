import { commandOptions } from "../interfaces/commandOptions";
import { registeredCommand } from "../interfaces/registeredCommand";
import { commands } from "../storage/commands";

/**
 * Use this method decorator to declare a class method a command
 * ```
 * class MyCommands {
 * 		@command()
 * 		ping(ctx: Context) {
 * 	 		ctx.send("pong");
 * 		}
 * }
 * ```
 * Using this decorator will automatically register your command function in {@link commands}
 * @param options Here you can declare some metadata like the description or usage of your command
 */
export function command(options?: commandOptions): Function
{
	return async function(parent: Object, name: string, executor: PropertyDescriptor)
	{
		const duplicateCommand: registeredCommand | undefined = commands.list.find((command: registeredCommand) => command.name == name);

		if (duplicateCommand) commands.list.splice(commands.list.indexOf(duplicateCommand), 1);

		const alreadyPushedGroup = commands.groups.find((group: string) => group == parent.constructor.name);

		if (!alreadyPushedGroup) commands.groups.push(parent.constructor.name);

		const hasOptions: boolean = options ? true : false;

		commands.list.push({
			group: parent.constructor.name,
			name: name,
			description: hasOptions && options?.description ? options.description : undefined,
			usage: hasOptions && options?.usage ? options.usage : undefined,
			aliases: hasOptions && options?.aliases ? options.aliases.concat([name]) : [name],
			execute: executor.value,
			prefixRequired: options?.prefixRequired ?? "require",
			argsTypes: []
		});
	};
}