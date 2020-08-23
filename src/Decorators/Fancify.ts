import { CommandContext } from "../Interfaces/CommandContext";
import { CommandArg } from "../Interfaces/RegisteredCommand";

export function fancify(condition: Function, expect: any = true): Function
{
	return function()
	{
		return function(
			parent: Object,
			name: string,
			executor: PropertyDescriptor
		): PropertyDescriptor
		{
			const original = executor.value;

			executor.value = async function(context: CommandContext, ...args: CommandArg[])
			{
				if (condition(context, ...args) == expect)
					return original.apply(this, [context, ...args]);
				else return null;
			};

			return executor;
		};
	};
}