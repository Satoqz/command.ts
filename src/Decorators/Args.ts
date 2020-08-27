import { Commands } from "./Commands";
import { Command, ParamType } from "../Interfaces/Command";

/**
 * @description Class containing static methods (parameter decorators).
 * Use these decorator methods to decorate the parameters of you command methods
 * for automatic argument parsing from a string to your desired type.
 * In most cases, if an argument cannot be parsed into the specified type or doesnt exist,
 * undefined will be returned.
 */
export class Args
{
	/**
	 * @description Declare a command argument to be parsed to your command function as a number.
	 * If the input argument cannot be parsed, NaN will be passed as an indicator.
	 * This is a `parameter decorator`.
	 * If the argument does not exist, it will be undefined.
	 * @returns number, NaN or undefined
	 * @param name (optional) the name to register for the parameter
	 */
	public static Number(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "number");
		};
	}

	/**
	 * @description Declare a command argument to be parsed to your command function as a boolean.
	 * Strings such as "yes", "true" or "y" will return true, "no", "n", "false" return false and any other
	 * input will be parsed as undefined.
	 * This is a `parameter decorator`.
	 * @returns boolean or undefined
	 * @param name (optional) the name to register for the parameter
	 */
	public static Boolean(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "boolean");
		};
	}

	/**
	 * @description Declare a command argument to be parsed to your command function as a string.
	 * This is a `parameter decorator`.
	 * @returns string or undefined
	 * @param name (optional) the name to register for the parameter
	 */
	public static String(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "string");
		};
	}

	/**
	 * @description Declare a command argument to be parsed to your command function as a discord.js GuildMember object.
	 * This is a `parameter decorator`.
	 * @returns discord.js GuildMember object or undefined
	 * @param name (optional) the name to register for the parameter
	 */
	public static GuildMember(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "guildmember");
		};
	}

	/**
	 * @description Declare a command argument to be parsed to your command function as a discord.js User object.
	 * This is a `parameter decorator`.
	 * @returns discord.js User object or undefined
	 * @param name (optional) the name to register for the parameter
	 */
	public static User(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "user");
		};
	}

	/**
	 * @description Declare a command argument to be parsed to your command function as a discord.js TextChannel object.
	 * This is a `parameter decorator`.
	 * @returns discord.js TextChannel object or undefined
	 * @param name (optional) the name to register for the parameter
	 */
	public static Channel(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "textchannel");
		};
	}

	/**
	 * @description Declare a command argument to be parsed to your command function as a discord.js Role object.
	 * This is a `parameter decorator`.
	 * @returns discord.js Role object or undefined
	 * @param name (optional) the name to register for the parameter
	 */
	public static Role(name: string = "Argument")
	{
		return function(target: Object, functionName: string, index: number)
		{
			setArgumentType(name, functionName, index, "role");
		};
	}
	/**
	 * @description Declare a command argument to be parsed from the argument position
	 * until the end of the original message content.
	 * This will also keep the original spacing and linebreaks.
	 * @returns string or undefined
	 * @param name (optional) the name to register for the parameter
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
 * Tells the argument type converter which type to parse on which argument
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
