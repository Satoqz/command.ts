import { commandOptions } from "../index";
import Theach from "./client";
import RegisteredCommand from "./registeredcommand";

export default function Command(client: Theach, options?: commandOptions): Function {

	return function(parent: any, name: string, executor: PropertyDescriptor) {

		const duplicateCommand: RegisteredCommand = client.commands.find((command: RegisteredCommand) => command.name == name);

		if(duplicateCommand) client.commands.splice(client.commands.indexOf(duplicateCommand), 1);

		const alreadyPushedGroup = client.commandGroups.find((group: string) => group == parent.constructor.name);

		if(!alreadyPushedGroup) client.commandGroups.push(parent.constructor.name);

		const hasOptions = options ? true : false;

		client.commands.push(new RegisteredCommand({
			group: parent.constructor.name,
			name: name,
			aliases: hasOptions && options.aliases ? options.aliases.concat([name]) : [name],
			execute: executor.value,
			prefixless: hasOptions && options.prefixless ? options.prefixless : false,
			onlyPrefixless : hasOptions && options.onlyPrefixless ? options.onlyPrefixless : false
		}));

	};
}