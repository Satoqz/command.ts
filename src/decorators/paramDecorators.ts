import { commands } from "../storage/commands";
import { registeredCommand, argType } from "../interfaces/registeredCommand";

export class params
{
	/**
	 * Declare a parameter to be parsed a number
	 * @returns number, or NaN if it could not be parsed
	 */
	public static number(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "number");
	}
	
	/**
	 * Declare a parameter to be parsed a boolean
	 * @returns "true" or "false" as boolean, everything else will be undefined
	 */
	public static boolean(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "boolean");
	}
	
	/**
	 * Declare a parameter to be parsed a string
	 * @returns argument as a string
	 */
	public static string(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "string");
	}

	public static GuildMember(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "guildmember");
	}
	public static User(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "user");
	}
	public static TextChannel(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "textchannel");
	}
	public static Role(target: Object, name: string, index: number)
	{
		setArgumentType(name, index, "role");
	}
}

/**
 * Tells a command which type to expect on a specific index
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