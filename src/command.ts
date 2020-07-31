import { commandOptions } from "./interfaces/commandOptions";
import { registeredCommand } from "./interfaces/registeredCommand";
import { commands, commandGroups } from "./storage/commands";

export function command(options?: commandOptions): Function
{
	
	return async function(parent: Object, name: string, executor: PropertyDescriptor)
	{
		const duplicateCommand: registeredCommand | undefined = commands.find((command: registeredCommand) => command.name == name);

		if(duplicateCommand) commands.splice(commands.indexOf(duplicateCommand), 1);

		const alreadyPushedGroup = commandGroups.find((group: string) => group == parent.constructor.name);

		if(!alreadyPushedGroup) commandGroups.push(parent.constructor.name);

		const hasOptions: boolean = options ? true : false;

		commands.push({
			group: parent.constructor.name,
			name: name,
			description: hasOptions && options?.description ? options.description : undefined,
			usage: hasOptions && options?.usage ? options.usage : undefined,
			aliases: hasOptions && options?.aliases ? options.aliases.concat([name]) : [name],
			execute: executor.value,
			prefixless: hasOptions && options?.prefixless ? options.prefixless : false,
			onlyPrefixless : hasOptions && options?.onlyPrefixless ? options.onlyPrefixless : false
		});
	};
}