import { Command, Context, Args } from "command.ts";

class TextCommands
{
	@Command()
	inf(ctx: Context, @Args.Number amount: number, @Args.Infinite text: string)
	{
		console.log(amount);
		ctx.send(text);
	}
}
