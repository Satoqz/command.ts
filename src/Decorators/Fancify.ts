import { CommandContext } from "../Interfaces/CommandContext";
import { CommandParam } from "../Interfaces/Command";
import { isConstructor } from "../Helpers/Internal/IsConstructor";

export function fancify(condition: Function, expect?: any): Function
{
	return function(
		parent: Object | Function,
		name: string,
		executor: PropertyDescriptor
	)
	{
		// is a method
		if (typeof parent == "object")
		{
			const original = executor.value;

			executor.value = async function(
				context: CommandContext,
				...args: CommandParam[]
			)
			{
				if (
					expect
						? condition(context, ...args) == expect
						: condition(context, ...args)
				)
					return original.apply(this, [context, ...args]);
				else return null;
			};

			return executor;
		}
		// is a class
		else if (typeof parent == "function")
		{
			Object.getOwnPropertyNames(parent.prototype).forEach((key: string) =>
			{
				const descriptor = Object.getOwnPropertyDescriptor(parent.prototype, key);
				if (isConstructor(descriptor?.value))
					return;

				const original = descriptor?.value;

					descriptor!.value = async function(
						context: CommandContext,
						...args: CommandParam[]
					)
					{
						if (
							expect
								? condition(context, ...args) == expect
								: condition(context, ...args)
						)
							return original.apply(this, [context, ...args]);
						else return null;
					};
					Object.defineProperty(parent.prototype, key, descriptor!);
			});
		}
	};
}