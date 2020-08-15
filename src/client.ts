import * as DJS from "discord.js";
import { commandHandler } from "./commandHandler";
import { commandContext } from "./interfaces/commandContext";
import { clientOptions } from "./interfaces/clientOptions";
import { commandArg } from "./interfaces/registeredCommand";
import { baseProv } from "./database/baseProv";
import { inMemProv } from "./database/inMemProv";

export class Client extends DJS.Client
{
	public commandGroups: string[] = [];
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

	public setPrefixForGuild(guildId: string, prefix: string)
	{
		this.dbContext.setDocument("Command", guildId, {
			prefix: prefix
		});
	}
}
