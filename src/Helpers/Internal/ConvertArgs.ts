import {
	Command,
	CommandParam
} from "../../Interfaces/Command";
import { CommandContext } from "../../Interfaces/CommandContext";
import { Convert } from "../Exported/Convert";
/**
 * Transforms arguments from strings to their real type
 * @param context The context to be passed to the command
 * @param command The registered Command, to check the wanted arguments
 * @param args The arguments specified by the user
 * @returns The transformed command arguments
 * @internal
 */
export function convertArgs(
	context: CommandContext,
	command: Command
) : CommandParam[]
{
	const stringArgs = context.args as string[];

	command.paramTypes.forEach((type: CommandParam, index: number) =>
	{
		if (context.args[index] != undefined)
		{
			switch (type)
			{
			case "number":
				context.args[index] = Number(context.args[index]);
				break;

			case "boolean":
				const lower = String(context.args[index]).toLowerCase();
				const bool = ["true", "yes", "y"].includes(lower) ? true
					: ["false", "no", "n"].includes(lower) ? false : undefined;
				context.args[index] = bool;
				break;

			case "string":
				break;

			case "user":
				context.args[index] = Convert.toUser(
					context.args[index] as string, context.c
				);
				break;

			case "guildmember":
				context.args[index] = Convert.toMember(
					context.args[index] as string, context.guild
				);
				break;

			case "textchannel":
				context.args[index] = Convert.toChannel(
					context.args[index] as string, context.guild
				);
				break;

			case "role":
				context.args[index] = Convert.toRole(
					context.args[index] as string, context.guild
				);
				break;

			case "infinite":
				//context.args[index] = context.args.slice(index).join(" ");
				let content = context.content
					.replace(context.usedPrefix, "")
					.replace(context.usedAlias, "")
					.trim();
				for (let i = 0; i < index; i++)
				{
					content = content.slice(content.indexOf(stringArgs[i]));
				}
				context.args[index] = content;
				break;
			}
		}
	});
	return context.args;
}
