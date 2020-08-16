import { CommandContext } from "../../Interfaces/CommandContext";
import { CommandArg } from "../../Interfaces/RegisteredCommand";

/**
 * Declares a {@link command} as guild-only<br><br>
 * Example:
 * ```
 * @Command()
 * @Guildonly()
 * ```
 * This can be extremely useful when your command depends on guild functionality and you want to avoid errors caused by direct messages.
 */
export function GuildOnly(): Function
{
	return function(
		parent: Object,
		name: string | symbol,
		executor: PropertyDescriptor)
	{
		const original = executor.value;

		executor.value = async function(context: CommandContext, ...args: CommandArg[])
		{
			if (context.channel.type == "dm") return null;

			else return original.apply(this, [context, ...args]);
		};
		return executor;
	};
}