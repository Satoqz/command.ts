import { commandContext } from "../interfaces/commandContext";
import { registeredCommand, commandArg } from "../interfaces/registeredCommand";

/**
 * Transforms arguments from strings to their real type
 * @param context The context to be passed to the command
 * @param command The registered Command, to check the wanted arguments
 * @param args The arguments specified by the user
 * @returns The transformed command arguments
 */
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
