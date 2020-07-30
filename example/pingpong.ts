import client from "./index";
import { Message } from "discord.js";

class PingPongCommands {

	@client.command({
		aliases: ["pingggggg!!!"],
		description: "play pingpong with the bot",
		usage: client.prefixes.join() + "ping"
	})
	ping(message: Message, args: string[]) {
		message.reply("pong");
	}

	// let's make this a secret command for the bot owner only

	@client.command()
	@client.owner()
	pong(message: Message, args: string) {
		message.reply("ping");
	}

}