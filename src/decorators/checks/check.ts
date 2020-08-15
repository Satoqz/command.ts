import { CommandContext } from "../../interfaces/CommandContext";
import { CommandArg } from "../../interfaces/RegisteredCommand";

/**
 * Allows you to make your own custom check function for a {@link command}<br><br>
 * Example:
 * ```
 * @command()
 * @check((ctx: Context) => ctx.guild.id == "527932145273143306")
 * ```
 * @param checkFunction a custom checking function, can take Context as an argument
 */
export function Check(checkFunction: Function): Function
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor): PropertyDescriptor
	{
		const original = executor.value;

		executor.value = async function(context: CommandContext, ...args: CommandArg[])
		{
			if (checkFunction(context))
				return original.apply(this, [context, ...args]);
			else return null;
		};

		return executor;
	};
}