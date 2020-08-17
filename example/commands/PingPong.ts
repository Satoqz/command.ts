import { Context, Command } from "command.ts";

// Your editor might suggest removing this class, but it's fine :)
class PingPongCommands
{
	// Use "@command()" to declare a command function
	// The default name is the functions name
	// You can pass additional options like you can see here
	@Command({
		aliases: ["pingpong"],	// command function name will always be the default alias
		description: "play pingpong with the bot",
		usage: "prefix + ping",
		prefixRequired: "notallowed"
	})
	ping(ctx: Context)
	{
		// Send a message back. This is a shortcut to "ctx.channel.send"
		ctx.send("pong");
	}
	@Command()
	gg(ctx: Context)
	{
		ctx.send(cum);
	}
}

const cum = "lol";