import { Context, Commands, Args, fancify } from "command.ts";

// Your editor might suggest removing this class, but it's fine :)

// make your own simple decorator
const GuildOnly = fancify((ctx: Context) => ctx.channel.type != "dm");

// give your command group a name
@Commands.Group("Ping Pong")
@GuildOnly()
class PingPongCommands
{
	// specify additional data for your command
	@Commands.Meta({ aliases: ["pingpong"], prefix: "optional" })
	ping(ctx: Context)
	{
		// send back a message
		ctx.send("pong");
	}
	// request an argument that takes all the text after the command keyword
	echo(ctx: Context, @Args.Infinite("Text") text: string)
	{
		ctx.send(text);
	}
}
