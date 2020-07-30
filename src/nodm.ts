import { commandContext } from "./interfaces/commandContext";

export function noDM()
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
	{
		const original = executor.value;

		executor.value = async function(context: commandContext)
		{
			if(context.channel.type == "dm") return null;

			else return original.apply(this, [context]);
		};
		return executor;
	};
}