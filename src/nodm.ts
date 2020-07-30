import { CommandContext } from "./commandcontext";

export function noDM()
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
	{
		const original = executor.value;

		executor.value = async function(context: CommandContext)
		{
			if(context.msg.channel.type == "dm") return null;

			else return original.apply(this, [context]);
		};
		return executor;
	};
}