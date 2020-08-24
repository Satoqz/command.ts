import { Commands } from "./Commands";
import { Command, ParamType } from "../Interfaces/Command";

export class Args
{
	/**
	 * Declare a command argument to parsed to your command as function a number.
	 * @returns number, or NaN if it could not be parsed.
	 */
	public static Number(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "number");
		};
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a boolean.
	 * @returns "true" or "false" as boolean, everything else will be undefined.
	 */
	public static Boolean(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "boolean");
		};
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a string.<br>
	 * Technically, this is completely redundant because the default argument type is a string, but you might aswell want to use this to write cleaner code. It is up to you.
	 * @returns Passes as a string.
	 */
	public static String(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "string");
		};
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a discord.js GuildMember.
	 * @returns Passes a discord.js GuildMember objector undefined if no member could be parsed.
	 */
	public static GuildMember(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "guildmember");
		};
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a discord.js User.
	 * @returns Passes a discord.js User object or undefined if no user could be parsed.
	 */
	public static User(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "user");
		};
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a discord.js TextChannel.
	 * @returns Passes a discord.js TextChannel object or undefined if no channel could be parsed.
	 */
	public static Channel(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "textchannel");
		};
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a discord.js Role.
	 * @returns Passes a discord.js Role object or undefined if no role could be parsed.
	 */
	public static Role(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "role");
		};
	}
	/**
	 * Declare a command argument to be parsed to your comamnd function as a discord.js Role.
	 * @returns Passes the part of the message that invocated a command where the infinite argument begins.
	 */
	public static Infinite(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "infinite");
		};
	}
}

/**
 * Tells a command which type to expect on a specific index
 * @internal
 */
function setArgumentType(
	paramName: string,
	functionName: string,
	index: number,
	type: ParamType
)
{
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
