import { Context, Commands, Args, fancify } from "command.ts";

// make your own simple decorator
const GuildOnly = fancify((ctx: Context) => ctx.channel.type != "dm");

// give your command group a name
@Commands.Group("Basic Commands")
@GuildOnly
class BasicCommands
{
	// specify additional data for your command
	@Commands.Meta({ aliases: ["pong"], prefix: "optional" })
	ping(ctx: Context)
	{
		ctx.send(ctx.usedAlias == "ping" ? "pong": "ping");
	}

	echo(ctx: Context, @Args.Infinite("Text") text: string)
	{
		ctx.send(text);
	}
}
