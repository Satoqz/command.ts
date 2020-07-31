import { loggerOptions } from "./interfaces/loggerOptions";
import { logType } from "./interfaces/logType";
import { Client } from "./client";
import { MessageEmbed, TextChannel, User } from "discord.js";

export class Logger
{

	constructor(options: loggerOptions)
	{
		this.options = options;
	}

	public options: loggerOptions;

	public log(message: string, type: logType, client: Client)
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
			{
				client.users.fetch(this.options.toDMs).then((user: User) => user.send({ embed: embed }));
			}
			if(this.options.toChannel)
			{
				const channel = client.channels.cache.get(this.options.toChannel) as TextChannel;
				channel.send({ embed: embed });
			}
		}
	}

}