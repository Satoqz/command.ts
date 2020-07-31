import * as DJS from "discord.js";
import { readdirSync } from "fs";
import { commandHandler } from "./commandHandler";
import { commandContext } from "./interfaces/commandContext";
import { clientOptions } from "./interfaces/clientOptions";
import { registeredCommand } from "./interfaces/registeredCommand";

export class Client extends DJS.Client
{
	public ownerId?: string;
	public prefixes: string[] = ["!"];
	public commandGroups: string[] = [];
	public commands: registeredCommand[] = [];

	constructor(options: clientOptions)
	{
		super();
		if(options.ownerId) this.ownerId = options.ownerId;
		if(options.prefixes) this.prefixes = options.prefixes;
		
		this.register();
	}
	
	private register()
	{
		this.on("message", async (message: DJS.Message) => commandHandler(this, message));
	}
	
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
}
