import * as DJS from "discord.js";
import { readdirSync } from "fs";
import { commandHandler } from "./commandHandler";
import { commandContext } from "./interfaces/commandContext";
import { clientOptions } from "./interfaces/clientOptions";
import { registeredCommand } from "./interfaces/registeredCommand";
import { loggerOptions } from "./interfaces/loggerOptions";
import { Logger } from "./logger";
import { logUrgencyType } from "./interfaces/logType";

export class Client extends DJS.Client
{
	public ownerId?: string;
	public prefixes: string[] = ["!"];
	public commandGroups: string[] = [];
	public commands: registeredCommand[] = [];
	public loggers: Logger[] = [];
	
	constructor(options: clientOptions)
	{
		super();
		if(options.ownerId) this.ownerId = options.ownerId;
		if(options.prefixes) this.prefixes = options.prefixes;
		
		this.register();
	}
	
	/**
	 * Set up standard event handlers
	 */
	private register()
	{
		this.on("message", async (message: DJS.Message) => commandHandler(this, message));
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
				console.log("Autoimporting " + dir + filename);
				require(dir + filename);
			}
		});
	}

	/**
	 * @deprecated
	 */
	public owner()
	{
		const client = this;
		
		return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
		{
			const original = executor.value;
			
			executor.value = function(context: commandContext)
			{
				if(!client.ownerId) {
					console.log("INFO: To use the client#owner decorator, please provide your discord id as ownerId when initializing the client!");
					return null;
				}
				
				if(context.author.id == client.ownerId)
					return original.apply(this, [context]);
				
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
}
