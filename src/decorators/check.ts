import { commandContext } from "../interfaces/commandContext";

export function check(checkFunction: Function)
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
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