import { commandContext } from "../../interfaces/commandContext";
import { commandArg } from "../../interfaces/registeredCommand";

/**
 * Allows you to make your own custom check function for a {@link command}<br><br>
 * Example:
 * ```
 * @command()
 * @check((ctx: Context) => ctx.guild.id == "527932145273143306")
 * ```
 * @param checkFunction a custom checking function, can take Context as an argument
 */
export function check(checkFunction: Function): Function
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor): PropertyDescriptor
	{
		const original = executor.value;

		executor.value = async function(context: commandContext, ...args: commandArg[])
		{
			if(checkFunction(context))
				return original.apply(this, [context, ...args]);
			else return null;
		};

		return executor;
	};
}