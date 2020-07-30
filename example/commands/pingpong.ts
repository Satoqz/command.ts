import client from "../index";
import { Context } from "command.ts";

// VS Code might suggest removing this class, but it's fine :)
class PingPongCommands
{
	// Use "@client.command()" to declare this a command
	// The default name is the functions name
	// You can pass additional options like you can see here
	@client.command({
		aliases: ["ping"],
		description: "play pingpong with the bot",
		usage: client.prefixes.join() + "ping"
	})
	ping(context: Context)
	{
		// Reply. You can pass true as an additional argument to tag the author
		context.reply("pong");
	}
}