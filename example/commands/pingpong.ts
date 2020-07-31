import { Context, command, permission, roleCheck, prefixes, p } from "command.ts";

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
	setPrefix(ctx: Context, @p.string pref: string)
	{
		prefixes[ctx.guild.id] = "-";
	}
	
	@command({
		prefixRequired: "optional"
	})
	getPrefix(ctx: Context, @p.string pref: string)
	{
		ctx.send(prefixes[ctx.guild.id]);
	}
}