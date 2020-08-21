import * as DJS from "discord.js";
import { commandHandler } from "./CommandHandler";
import { ClientOptions } from "./Interfaces/ClientOptions";
import { BaseProv } from "./Database/BaseProv";
import { InMemProv } from "./Database/InMemProv";

/**
 * A modified verson of the discord.js Client implementing the command.ts command handler
 */
export class Client extends DJS.Client
{
	public commandGroups: string[] = [];
	public dbContext: BaseProv;

	constructor(options: ClientOptions, djsOptions?: DJS.ClientOptions | undefined)
	{
		super(djsOptions);

		this.dbContext = options.database ?? new InMemProv();

		this.dbContext.createContainer("PrefixConfig");
		this.dbContext.setDocument("PrefixConfig", "defaultPrefix",
			options.defaultPrefix ?? "!");

		this.register();
	}

	/**
	 * Set up standard event handlers
	 * @internal
	 */
	private register()
	{
		this.on("message", async(message: DJS.Message) =>
			commandHandler(this, message));
	}

	public setPrefixForGuild(guildId: string, prefix: string)
	{
		this.dbContext.setDocument("Command", guildId, {
			prefix: prefix
		});
	}
}
