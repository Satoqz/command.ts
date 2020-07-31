import { commands } from "../storage/commands";
import { registeredCommand, argType } from "../interfaces/registeredCommand";

export class params
{
	public static number(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "number");
	}

	public static boolean(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "boolean");
	}

	public static string(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "string");
	}
}

function setArgumentType(name: string, index: number, type: argType) {
	const interval = setInterval(() => {
		const command: registeredCommand | undefined = commands.find((command: registeredCommand) => command.name == name);

		if(command)
		{
			clearInterval(interval);
			command.argsTypes[index] = type;
		}
	}, 0);
}