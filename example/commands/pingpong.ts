import { Context, command, permission, roleCheck, p } from "command.ts";

// VS Code might suggest removing this class, but it's fine :)
class PingPongCommands
{
	// Use "@command()" to declare a command function
	// The default name is the functions name
	// You can pass additional options like you can see here
	@command({
		aliases: ["pingpong"],	// command function name will always be the default alias
		description: "play pingpong with the bot",
		usage: "prefix + ping",
		prefixRequired: "require"
	})
	ping(ctx: Context)
	{
		// Send a message back. This is a shortcut to "ctx.channel.send"
		ctx.send("pong");
	}

	@command({
		prefixRequired: "optional"
	})
	get(ctx: Context)
	{
		// Send a message back. This is a shortcut to "ctx.channel.send"
		ctx.send("prefix " + ctx.dbContext.getDocumentById<string>("PrefixConfig", ctx.guild?.id ?? "dms"));
	}

	@command({
		prefixRequired: "optional"
	})
	set(ctx: Context)
	{
		// Send a message back. This is a shortcut to "ctx.channel.send"
		ctx.dbContext.setDocument("PrefixConfig", ctx.guild?.id ?? "dms", "-");
		ctx.dbContext.saveChanges();
	}
}