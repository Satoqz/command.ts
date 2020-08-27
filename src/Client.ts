import * as DJS from "discord.js";
import { isArray } from "util";

import { commandHandler } from "./CommandHandler";
import { importAll } from "./Helpers/Internal/ImportAll";
import { ClientOptions } from "./Interfaces/ClientOptions";
import { Events } from "./Decorators/Events";
import { eventList } from "./Helpers/Internal/EventList";

/**
 * @description A modified verson of the discord.js Client implementing the command.ts command and event handler
 */
export class Client extends DJS.Client
{
	constructor(
		options: ClientOptions = {},
		djsOptions?: DJS.ClientOptions
	)
	{
		super(djsOptions);

		this.listenToBots = options.listenToBots ?? false;
		this.listenToSelf = options.listenToSelf ?? false;
		this.autoHandleCommands = options.autoHandleCommands ?? true;

		this.prefixes = options.prefixes ?? ["!"];

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
	 * @description Whether or not to automatically run the command handler on every received message.
	 * If set to false, commands can be ran on message using the `<Client>#handleCommand` method
	 */
	public autoHandleCommands: boolean;
	/**
	 * @description Whether or not to run a command if it was invoked by a bot user
	 */
	public listenToBots: boolean;
	/**
	 * @description Whether or not to run a command if it was invoked by the client user itself
	 */
	public listenToSelf: boolean;

	/**
	 * @description Default prefixes to use if no specific prefix is specified in the `<Client>#handleCommand` method
	 */
	public prefixes: string[]

	/**
	 * @description Manually make a message go through the command handling process
	 * @param message
	 */
	public handleCommand(message: DJS.Message, prefixes: string | string[])
	{
		commandHandler(this, message, prefixes);
	}

	/**
	 * @description Sets up the command handler to listen to the
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
	 * @description dispatched all methods that were registered using the `Event` decorators
	 * if they match the name of the emitted event
	 * @internal
	 */
	private dispatchEvents(name: keyof DJS.ClientEvents, ...args: any[])
	{
		Events.store
			.filter(event => event.name == name)
			.forEach(event => event.execute(...args));
	}
}
