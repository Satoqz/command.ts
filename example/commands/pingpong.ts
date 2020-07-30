import client from "../index";
import { Message } from "discord.js";
import { permission } from "command.ts";

// VS Code might suggest removing this class, but it's fine :)
class PingPongCommands {

	// Use "@client.command()" to declare this a command
	// The default name is the functions name
	// You can pass additional options like you can see here
	@client.command({
		aliases: ["ping"],
		description: "play pingpong with the bot",
		usage: client.prefixes.join() + "ping"
	})
	ping(message: Message, args: string[])
	{
		message.reply("pong");
	}

	@client.command()
	// You can require permissions for the your bot (client) like this ("@client.permission")
	// Specifing permissions is allowed using an array of strings or a single string
	@client.permission("SEND_MESSAGES")
	// To check permissions of the user who invoked this command you can use "@permission", same syntax
	@permission(["ADMINISTRATOR", "MANAGE_CHANNELS"])
	hello(message: Message, args: string[])
	{
		message.reply("pong");
	}

}