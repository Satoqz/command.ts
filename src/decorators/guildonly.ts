import { commandContext } from "../interfaces/commandContext";
import { commandArg } from "../interfaces/registeredCommand";

/**
 * Declares a {@link command} as guild-only<br><br>
 * Example:
 * ```
 * @command()
 * @guildonly()
 * ```
 * This can be extremely useful when your command depends on guild functionality and you want to avoid errors caused by direct messages.
 */
export function guildonly(): Function
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
	{
		const original = executor.value;
		
		executor.value = async function(context: commandContext, ...args: commandArg[])
		{
			if(context.channel.type == "dm") return null;
			
			else return original.apply(this, [context, ...args]);
		};
		return executor;
	};
}