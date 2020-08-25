import * as DJS from "discord.js";
import { isArray } from "util";

import { commandHandler } from "./CommandHandler";
import { importAll } from "./Helpers/Internal/ImportAll";
import { ClientOptions } from "./Interfaces/ClientOptions";
import { BaseProv } from "./Database/BaseProv";
import { InMemProv } from "./Database/InMemProv";
import { Events } from "./Decorators/Events";
import { eventList } from "./Helpers/Internal/EventList";

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

	public handleCommand(message: DJS.Message)
	{
		commandHandler(this, message);
	}

	/**
	 * Set up standard event handlers
	 * @internal
	 */
	private register()
	{
		this.on("message", data => this.handleCommand(data));

		eventList.forEach(event =>
			this.on(event, (...args) =>
				this.runListeners(event, ...args)
			)
		);
	}

	/**
	 * @internal
	 */
	private runListeners(name: keyof DJS.ClientEvents, ...args: any[])
	{
		Events.store
			.filter(event => event.name == name)
			.forEach(event => event.execute(...args));
	}

	public setPrefixForGuild(guildId: string, prefix: string)
	{
		this.dbContext.setDocument("Command", guildId, {
			prefix: prefix
		});
	}
}
