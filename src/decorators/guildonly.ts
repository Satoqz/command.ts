import { commandContext } from "../interfaces/commandContext";
import { commandArg } from "../interfaces/registeredCommand";

// TODO
export function guildonly()
{
	/**
	 * Declare a command to be only used in a guild
	 */
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