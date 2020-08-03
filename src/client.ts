import * as DJS from "discord.js";
import { readdirSync } from "fs";
import { commandHandler } from "./commandHandler";
import { commandContext } from "./interfaces/commandContext";
import { clientOptions } from "./interfaces/clientOptions";
import { registeredCommand, commandArg } from "./interfaces/registeredCommand";
import { loggerOptions } from "./interfaces/loggerOptions";
import { Logger } from "./logger";
import { logUrgencyType } from "./interfaces/logType";
import { baseProv } from "./database/baseProv";
import { inMemProv } from "./database/inMemProv";
import { join } from "path";

export class Client extends DJS.Client
{
	public commandGroups: string[] = [];
	public commands: registeredCommand[] = [];
	public loggers: Logger[] = [];
	public dbContext: baseProv;

	constructor(options: clientOptions)
	{
		super();

		this.dbContext = options.database ?? new inMemProv();

		this.dbContext.createContainer("PrefixConfig");
		this.dbContext.setDocument("PrefixConfig", "defaultPrefix", options.defaultPrefix ?? "!");
		if (options.ownerId)
		{
			this.dbContext.createContainer("Config");
			this.dbContext.setDocument("Config", "clientOwnerId", options.ownerId!);
		}
		this.register();
	}

	/**
	 * Set up standard event handlers
	 * @internal
	 */
	private register()
	{
		this.on("message", async(message: DJS.Message) => commandHandler(this, message));
		this.on("ready", () => this.log("Client has logged into discord", "info"));
		this.on("error", (error) => this.log(error.message, "error"));
		this.on("rateLimit", (data: DJS.RateLimitData) => this.log(JSON.stringify(data, null, 1), "error"));
	}

	/**
	 * Automatically imports all commands/files inside a specified directory
	 * @param dir Directory, e.g. path.join(__dirname, "/commands/")
	 */
	public autoImport(dir: string)
	{
		const files = readdirSync(dir);

		files.forEach((filename: string) =>
		{
			if (filename.endsWith(".ts") || filename.endsWith(".js"))
			{
				console.log("Autoimporting " + join(dir, filename));
				require(join(dir, filename));
			}
		});
	}

	/**
	 * Only allows one specific person (client/bot-wide) to use this command
	 * Great for private bots
	 * @category Decorators
	 */
	public owner()
	{
		const ownerId = this.dbContext.getDocumentById<string>("Config", "clientOwnerId");
		return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
		{
			const original = executor.value;
			executor.value = function(context: commandContext, ...args: commandArg[])
			{
				if (!ownerId)
				{
					console.log("INFO: To use the client#owner decorator, please provide your discord id as ownerId when initializing the client!");
					return null;
				}

				if (context.author.id == ownerId)
					return original.apply(this, [context, ...args]);

				else return null;
			};
			return executor;
		};
	}

	/**
	 * Adds a logger service to your bot/client
	 * @param options Logs can be sent to DMs, channels, and the console
	 */
	public addLogger(options: loggerOptions)
	{
		this.loggers.push(new Logger(options));
	}

	/**
	 * Allows you to log a message to registered loggers
	 * @param message message
	 * @param type Urgency
	 */
	public log(message: string, type: logUrgencyType)
	{
		this.loggers.forEach((logger: Logger) =>
			logger.log(message, type, this));
	}

	public setPrefixForGuild(guildId: string, prefix: string)
	{
		this.dbContext.setDocument("Command", guildId, {
			prefix: prefix
		});
	}
}
