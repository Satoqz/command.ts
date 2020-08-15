import { command, params, Context } from "command.ts";

class PrefixCommands
{
	@command({
		prefixRequired: "optional"
	})
	get(ctx: Context)
	{
		ctx.send("prefix: " + ctx.dbContext.getDocumentById<string>("PrefixConfig", ctx.guild?.id ?? "dms"));
	}

	@command({
		prefixRequired: "optional"
	})
	set(ctx: Context, @params.string prefix: string)
	{
		console.log(ctx.content);
		ctx.dbContext.setDocument("PrefixConfig", ctx.guild?.id ?? "dms", prefix);
		ctx.dbContext.saveChanges();
	}
}