import { CommandContext } from "../Interfaces/CommandContext";
import { CommandParam } from "../Interfaces/Command";
import { isConstructor } from "../Helpers/Internal/IsConstructor";

/**
 * @description The `fancify` method allows you to create a decorator to apply either on a whole command group class
 * or on a single command method. The decorator will validate whether or not to run the command, depending on your `condition` method
 * @param condition Function that should be used to validate a command invocation.
 * You can run whatever you want to here, just be aware that the command(s) the decorator is applied to
 * will only run if the condition returns the `expected` value or if not specified, a truthy value.
 * `Command Context` and all other arguments of a command will be passed to this function.
 * @param expected Value to be returned by the condition method to pass the command check
 * @returns class and method decorator
 */
export function fancify(condition: Function, expected?: any): Function
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
					expected
						? condition(context, ...args) === expected
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
							expected
								? condition(context, ...args) === expected
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