import { Command, Args, Context } from "command.ts";

class PrefixCommands
{
	@Command({
		prefixRequired: "optional"
	})
	get(ctx: Context)
	{
		ctx.send(
			"prefix: " + ctx.dbContext.getDocumentById<string>(
				"PrefixConfig", ctx.guild?.id ?? "dms"
			)
		);
	}

	@Command({
		prefixRequired: "optional"
	})
	set(ctx: Context, @Args.String("Prefix") prefix: string)
	{
		if (!prefix) return;

		ctx.dbContext.setDocument("PrefixConfig", ctx.guild?.id ?? "dms", prefix);
		ctx.dbContext.saveChanges();
	}
}
