import { Group, Args, Context } from "command.ts";

@Group("Prefix commands")
class PingPong
{
	get(ctx: Context)
	{
		ctx.send(
			"prefix: " + ctx.dbContext.getDocumentById<string>(
				"PrefixConfig", ctx.guild?.id ?? "dms"
			)
		);
	}
	set(ctx: Context, @Args.String("Prefix") prefix: string)
	{
		if (!prefix) return;

		ctx.dbContext.setDocument("PrefixConfig", ctx.guild?.id ?? "dms", prefix);
		ctx.dbContext.saveChanges();
	}
}
