import discordjs, { Message } from "discord.js";

import { commandHandler } from "./CommandHandler";
import { importAll } from "./Helpers/Internal/ImportAll";
import { ClientOptions } from "./Interfaces/ClientOptions";
import { Events } from "./Decorators/Events";
import { eventList } from "./Helpers/Internal/EventList";
import { Converter } from "./Helpers/Exported/Converter";

/**
 * An extended verson of the
 * discord.js [Client](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/Client)
 * class implementing the command.ts command and event handlers.
 */
export class Client extends discordjs.Client
{
	constructor(
		options: ClientOptions = {},
		djsOptions?: discordjs.ClientOptions
	)
	{
		super(djsOptions);

		this.listenToBots = options.listenToBots ?? false;
		this.listenToSelf = options.listenToSelf ?? false;
		this.autoHandleCommands = options.autoHandleCommands ?? true;

		this.prefixes = options.prefixes ?? ["!"];

		if (options.loadDirs)
		{
			if (Array.isArray(options.loadDirs))
				options.loadDirs.forEach((dir: string) =>
					importAll(dir)
				);
			else
				importAll(options.loadDirs);
		}

		this.register();
	}

	/**
	 * {@link ClientOptions.autoHandleCommands}
	 */
	private autoHandleCommands: boolean;

	/**
	 * {@link ClientOptions.listenToBots}
	 */
	public listenToBots: boolean;

	/**
	 * {@link ClientOptions.listenToSelf}
	 */
	public listenToSelf: boolean;

	/**
	 * {@link ClientOptions.prefixes}
	 */
	public prefixes: string[]

	/**
	 * Manually run a message through the command handling process.<br>
	 * The method takes a prefix or an array of prefixes for the command handler to accept as a second parameter<br>
	 * This is useful if you are loading custom prefixes per guild.
	 */
	public handleCommand(message: Message, prefixes: string | string[])
	{
		commandHandler(message, prefixes);
	}

	public convert = new Converter(this)

	/**
	 * Sets up the command handler to listen to the
	 * `message` event and registers most other client events
	 * @internal
	 */
	private register()
	{
		if (this.autoHandleCommands)
			this.on("message", data => this.handleCommand(data, this.prefixes));

		eventList.forEach(event =>
			this.on(event, (...args) =>
				this.dispatchEvents(event, ...args)
			)
		);
	}

	/**
	 * dispatches all methods that were registered using the `Event` decorators
	 * if they match the name of the emitted event
	 * @internal
	 */
	private dispatchEvents(name: keyof discordjs.ClientEvents, ...args: any[])
	{
		Events.store
			.filter(event => event.name == name)
			.forEach(event => event.run(...args));
	}
}
