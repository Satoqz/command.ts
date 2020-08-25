import { Group, Meta, Args, Context } from "command.ts";

@Group("Prefix commands")
class PrefixCommands
{
	@Meta({
		"prefix": "optional",
		"description": "Get the prefix of the channel the command was sent in"
	})
	get(ctx: Context)
	{
		ctx.send(
			"prefix: " + ctx.dbContext.getDocumentById<string>(
				"PrefixConfig", ctx.guild?.id ?? "dms"
			)
		);
	}

	@Meta({
		"prefix": "optional",
		"description": "Set the prefix of the channel the command was sent in"
	})
	set(ctx: Context, @Args.String("Prefix") prefix: string)
	{
		if (!prefix) return;

		ctx.dbContext.setDocument("PrefixConfig", ctx.guild?.id ?? "dms", prefix);
		ctx.dbContext.saveChanges();
	}
}
