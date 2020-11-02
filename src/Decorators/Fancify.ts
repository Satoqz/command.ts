import { CommandContext } from "../Interfaces/CommandContext";
import { CommandParam } from "../Interfaces/Command";
import { isConstructor } from "../Helpers/IsConstructor";

/**
 * The `fancify` method is used to create command execution middleware decorators.<br>
 * Let's take a look at an example first:
 *
 * ```
 * const GuildOnly = fancify((ctx: Context) => ctx.channel.type == "text");
 *
 * @Group("Example commands")
 * class Example {
 *
 * 		@GuildOnly
 * 		ping(ctx: Context) {
 * 			ctx.send("Pong!");
 * 		}
 * }
 * ```
 *
 * Now the ping command will only be rund if the channel it was invoked in is in a guild ("text" type channel).<br>
 * You may also pass in more complicated middleware,
 * for example a `GuildOnly` decorator that will tell the user about the command only working in guild if invoked in a dm channel.
 *
 * ```
 * function guildOnly(ctx: Context) {
 * 		if (ctx.channel.type != "text")
 * 			ctx.channel.send("This command only works in guilds!");
 *
 * 		return ctx.channel.type == "text";
 * }
 *
 * const GuildOnly = fancify(guildOnly);
 * ```
 *
 * These decorators can also be applied to a command group class, applying it to all member command methods.<br>
 * Stack fancify decorators to create powerful middleware chains to inhibit your commands.
 *
 * If needed, you can provide a second argument that will define the expected return value of your middleware function.
 * Usually, the next middleware or the command is called when something truthy is returned.
 * You can alter this behavior by passing a value of your choice into the second parameter.
 * @returns Returns class / method decorator
 */
export function fancify(condition: Function, expected?: any): Function
{
	return (
		parent: Object | Function,
		___: string,
		executor: PropertyDescriptor
	) =>
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
