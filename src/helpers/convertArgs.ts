import { commandContext } from "../interfaces/commandContext";
import { registeredCommand, commandArg } from "../interfaces/registeredCommand";

export function convertCommandArgs(context: commandContext, command: registeredCommand, args: commandArg[]): commandArg[]
{
	command.argsTypes.forEach((type: commandArg, index: number) =>
	{
		switch(type)
		{
		case "number":
			args[index] = Number(args[index]);
			break;
		case "boolean":
			const lower = String(args[index]).toLowerCase();
			const bool = lower == "true" ? true : lower == "false" ? false : undefined;
			args[index] = bool;
			break;
		case "string":
			break;
		case "context":
			args[index] = context;
			break;
		}
	});
	
	return args;
}
