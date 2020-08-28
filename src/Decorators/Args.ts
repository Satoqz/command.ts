import { Commands } from "./Commands";
import { Command, ParamType } from "../Interfaces/Command";

/**
 * Class containing decorator factories for command parameters.
 * Used to automatically parse to a different type from a string command argument to the command method, e.g. a `number` or a
 * [User](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/User).
 *
 * ```
 * // example ban command
 * @Group("Admin commands")
 * class AdminCommands {
 * 		ban(
 * 			ctx: Context,
 * 			@Args.Member("Member to be banned") member: Member,
 * 			@Args.Infinite("Ban reason") reason: string
 * 		) {
 * 			// ban command implementation
 * 		}
 * }
 * ```
 */
export class Args
{
	/**
	 * Tries to convert a command argument into a `number`.
	 * If no `number` could be parsed, the argument will be `NaN` or `undefined` if the argument didnt exist in the first place
	 */
	public static Number(name?: string)
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name ?? "Unnamed Argument", functionName, index, "number", target);
		};
	}

	/**
	 * Tries to convert a command argument into a `boolean`.
	 * Resolves `"true", "yes", "y"` into `true` and `"false", "no", "n"` into `false`.
	 * If no "boolean indication" could be parsed, the argument will be `undefined`.
	 */
	public static Boolean(name?: string)
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name ?? "Unnamed Argument", functionName, index, "boolean", target);
		};
	}

	/**
	 * Parses a command argument into a `string`.
	 */
	public static String(name?: string)
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name ?? "Unnamed Argument", functionName, index, "string", target);
		};
	}

	/**
	 * Uses {@link Convert.toMember} internally to resolve a
	 * [GuildMember](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/GuildMember)
	 * argument or `undefined`.
	 */
	public static GuildMember(name?: string)
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name ?? "Unnamed Argument", functionName, index, "guildmember", target);
		};
	}

	/**
	 * Uses {@link Convert.toUser} internally to resolve a
	 * [User](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/User)
	 * argument or `undefined`.
	 */
	public static User(name?: string)
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name ?? "Unnamed Argument", functionName, index, "user", target);
		};
	}

	/**
	 * Uses {@link Convert.toChannel} internally to resolve a
	 * [TextChannel](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/TextChannel)
	 * argument or `undefined`.
	 */
	public static Channel(name?: string)
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name ?? "Unnamed Argument", functionName, index, "textchannel", target);
		};
	}

	/**
	 * Uses {@link Convert.toRole} internally to resolve a
	 * [Role](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/Role)
	 * argument or `undefined`.
	 */
	public static Role(name?: string)
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name ?? "Unnamed Argument", functionName, index, "role", target);
		};
	}
	/**
	 * Get all the remaining text relative to the argument position. Useful to easily capture a text input with unpredictable size.
	 * Also preserves original spacing and linebreaks.
	 */
	public static Infinite(name?: string)
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name ?? "Unnamed Argument", functionName, index, "infinite", target);
		};
	}
}

/**
 * Tells the argument type converter which type to parse on which argument
 * @internal
 */
function setArgumentType(
	paramName: string,
	functionName: string,
	index: number,
	type: ParamType,
	target: Object
)
{
	if (typeof target != "object" || typeof index != "number")
		throw new Error("Argument parsing decorators can be applied to parameters only");

	const interval = setInterval(() =>
	{
		const command: Command | undefined =
			Commands.store.find((command: Command) =>
				command.name == functionName);

		if (command)
		{
			clearInterval(interval);
			command.paramTypes[index - 1] = type;
			command.paramNames[index - 1] = paramName;
		}
	}, 0);
}
