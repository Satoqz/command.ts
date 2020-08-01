import { loggerOptions } from "./interfaces/loggerOptions";
import { logUrgencyType } from "./interfaces/logType";
import { Client } from "./client";
import { MessageEmbed, TextChannel, User } from "discord.js";

/**
 * @internal
 */
export class Logger
{
	public options: loggerOptions;

	constructor(options: loggerOptions)
	{
		this.options = options;
	}
	
	/**
	 * Sends a log message to the specified outputs
	 * @param message The message
	 * @param type The urgency
	 * @param client The client instance
	 */
	public log(message: string, type: logUrgencyType, client: Client)
	{
		if(this.options.toConsole == true)
		{
			console.log(type.toUpperCase() + ":");
			console.log(message);
		}
		if(this.options.toChannel || this.options.toDMs)
		{
			const embed = new MessageEmbed()
				.setColor(type == "error" ? "RED" : type == "info" ? "AQUA" : "AQUA")
				.setAuthor(type.toUpperCase(), client.user?.displayAvatarURL())
				.setDescription("```ts\n"+message+"\n```");
			
			if(this.options.toDMs)
				client.users.fetch(this.options.toDMs).then((user: User) => user.send({ embed: embed }));
			if(this.options.toChannel)
			{
				const channel = client.channels.cache.get(this.options.toChannel) as TextChannel;
				channel.send({ embed: embed });
			}
		}
	}
}