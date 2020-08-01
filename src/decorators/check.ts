import { commandContext } from "../interfaces/commandContext";
import { commandArg } from "../interfaces/registeredCommand";

/**
 * Allows to check your own specific conditions
 * @param checkFunction a custom checking function, passes commandContext as an argument
 * @category Decorators
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