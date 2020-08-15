import { Command, Context, Args, Convert } from "command.ts";
import { User } from "discord.js";

class TextCommands
{
	@Command()
	inf(ctx: Context, @Args.Number amount: number, @Args.Infinite text: string)
	{
		console.log(amount);
		ctx.send(text);
	}

	@Command()
	con(ctx: Context, user: string)
	{
		console.log(Convert.toUser(user, ctx.c));
	}
}
