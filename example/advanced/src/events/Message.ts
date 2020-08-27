import { Message } from "discord.js";
import { Events } from "command.ts";
import { client } from "../Main";

@Events.Message
class MessageEvent
{
	hello(msg: Message)
	{
		if (msg.content.toLowerCase() == "hello")
			msg.channel.send("Hey!");
	}

	command(msg: Message)
	{
		client.handleCommand(msg, ["!", "?"]);
	}
}