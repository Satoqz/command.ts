import { CommandContext } from "../../interfaces/CommandContext";
import { RegisteredCommand, CommandArg } from "../../interfaces/RegisteredCommand";
import { Convert } from "../exported/Convert";
/**
 * Transforms arguments from strings to their real type
 * @param context The context to be passed to the command
 * @param command The registered Command, to check the wanted arguments
 * @param args The arguments specified by the user
 * @returns The transformed command arguments
 * @internal
 */
export function convertCommandArgs(context: CommandContext, command: RegisteredCommand): CommandArg[]
{
	command.argsTypes.forEach((type: CommandArg, index: number) =>
	{
		switch (type)
		{
		case "number":
			context.args[index] = Number(context.args[index]);
			break;
		case "boolean":
			const lower = String(context.args[index]).toLowerCase();
			const bool = lower == "true" ? true : lower == "false" ? false : undefined;
			context.args[index] = bool;
			break;
		case "string":
			break;
		case "user":
			context.args[index] = Convert.toUser(context.args[index] as string, context.c);
			break;
		case "guildmember":
			context.args[index] = Convert.toMember(context.args[index] as string, context.guild);
			break;
		case "textchannel":
			context.args[index] = Convert.toChannel(context.args[index] as string, context.guild);
			break;
		case "role":
			context.args[index] = Convert.toRole(context.args[index] as string, context.guild);
			break;
		}
	});
	return context.args;
}
