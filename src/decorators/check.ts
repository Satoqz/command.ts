import { commandContext } from "../interfaces/commandContext";

/**
 * Allows to check your own specific conditions
 * @param checkFunction a custom checking function, passes commandContext as an argument
 */
export function check(checkFunction: Function): Function
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor): PropertyDescriptor
	{
		const original = executor.value;
		
		executor.value = async function(context: commandContext)
		{
			if(checkFunction(context))
				return original.apply(this, [context]);
			else return null;
		};
		
		return executor;
	};
}