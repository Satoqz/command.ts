import { commandContext } from "../interfaces/commandContext";
import { registeredCommand, commandArg } from "../interfaces/registeredCommand";
import { Convert } from "./discordConverters";
/**
 * Transforms arguments from strings to their real type
 * @param context The context to be passed to the command
 * @param command The registered Command, to check the wanted arguments
 * @param args The arguments specified by the user
 * @returns The transformed command arguments
 * @internal
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
		case "user":
			args[index] = Convert.toUser(args[index] as string, context.c);
			break;
		case "guildmember":
			args[index] = Convert.toMember(args[index] as string, context.guild);
			break;
		case "textchannel":
			args[index] = Convert.toChannel(args[index] as string, context.guild);
			break;
		case "role":
			args[index] = Convert.toRole(args[index] as string, context.guild);
			break;
		}
	});
	return args;
}
