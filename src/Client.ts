import * as DJS from "discord.js";
import { commandHandler } from "./CommandHandler";
import { importAll } from "./Helpers/Internal/ImportAll";
import { ClientOptions } from "./Interfaces/ClientOptions";
import { BaseProv } from "./Database/BaseProv";
import { InMemProv } from "./Database/InMemProv";
import { isArray } from "util";
import { Events } from "./Decorators/Events";

/**
 * A modified verson of the discord.js Client implementing the command.ts command handler
 */
export class Client extends DJS.Client
{
	public commandGroups: string[] = [];
	public dbContext: BaseProv;

	constructor(
		options: ClientOptions = {},
		djsOptions?: DJS.ClientOptions
	)
	{
		super(djsOptions);

		this.dbContext = options.database ?? new InMemProv();

		this.dbContext.createContainer("PrefixConfig");
		this.dbContext.setDocument(
			"PrefixConfig",
			"defaultPrefix",
			options.defaultPrefix ?? "!"
		);

		if (options.loadDirs)
		{
			if (isArray(options.loadDirs))
				options.loadDirs.forEach((dir: string) =>
					importAll(dir)
				);
			else
				importAll(options.loadDirs);
		}

		this.register();

	}

	/**
	 * Set up standard event handlers
	 * @internal
	 */
	private register()
	{
		this.on("message", async(message: DJS.Message) =>
		{
			Events.store
				.filter(event => event.name == "message")
				.forEach(event => event.execute(message));

			commandHandler(this, message);
		});

		this.on("ready", () =>
		{
			Events.store
				.filter(event => event.name == "ready")
				.forEach(event => event.execute(this));
		});

		this.on("guildMemberAdd", async(member: DJS.GuildMember | DJS.PartialGuildMember) =>
		{
			Events.store
				.filter(event => event.name == "guildMemberAdd")
				.forEach(event => event.execute(member));
		});
	}

	public setPrefixForGuild(guildId: string, prefix: string)
	{
		this.dbContext.setDocument("Command", guildId, {
			prefix: prefix
		});
	}
}
