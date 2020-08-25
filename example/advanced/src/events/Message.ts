import { Message } from "discord.js";
import { Events } from "command.ts";

@Events.Message
class MessageEvent
{
	hello(msg: Message)
	{
		if (msg.content.toLowerCase() == "hello")
			msg.channel.send("Hey!");
	}
}