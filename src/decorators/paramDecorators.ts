import { commands } from "../storage/commands";
import { registeredCommand, argType } from "../interfaces/registeredCommand";

export class params
{
	/**
	 * Declare a command argument to parsed to your command as function a number.
	 * @returns number, or NaN if it could not be parsed.
	 */
	public static number(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "number");
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a boolean.
	 * @returns "true" or "false" as boolean, everything else will be undefined.
	 */
	public static boolean(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "boolean");
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a string.<br>
	 * Technically, this is completely redundant because the default argument type is a string, but you might aswell want to use this to write cleaner code. It is up to you.
	 * @returns Passes as a string.
	 */
	public static string(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "string");
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a discord.js GuildMember.
	 * @returns Passes a discord.js GuildMember class or undefined if no member could be parsed.
	 */
	public static GuildMember(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "guildmember");
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a discord.js User.
	 * @returns Passes a discord.js User class or undefined if no user could be parsed.
	 */
	public static User(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "user");
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a discord.js TextChannel.
	 * @returns Passes a discord.js TextChannel class or undefined if no channel could be parsed.
	 */
	public static TextChannel(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "textchannel");
	}

	/**
	 * Declare a command argument to be parsed to your comamnd function as a discord.js Role.
	 * @returns Passes a discord.js Role class or undefined if no role could be parsed.
	 */
	public static Role(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "role");
	}
}

/**
 * Tells a command which type to expect on a specific index
 * @internal
 */
function setArgumentType(name: string, index: number, type: argType)
{
	const interval = setInterval(() =>
	{
		const command: registeredCommand | undefined = commands.find((command: registeredCommand) => command.name == name);

		if(command)
		{
			clearInterval(interval);
			command.argsTypes[index - 1] = type;
		}
	}, 0);
}