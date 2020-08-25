import { Client, Commands, Context } from "command.ts";

const client = new Client();

@Commands.Group()
class BotCommands
{
	ping(ctx: Context)
	{
		ctx.reply("pong!");
	}
}

client.login("<TOKEN>");