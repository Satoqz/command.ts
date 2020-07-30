import * as DJS from "discord.js";
import fs from "fs";
import RegisteredCommand from "./registeredcommand";
import { clientOptions, commandOptions } from "../index";
import { commandHandler } from "./commandhandler";
import { CommandContext } from "./commandcontext";

export default class Client extends DJS.Client
{
	constructor(options: clientOptions)
	{
		super();
		if(options.ownerId) this.ownerId = options.ownerId;
		if(options.prefixes) this.prefixes = options.prefixes;
		if(options.noDM) this.noDM = options.noDM;
		this.token = options.token;

		this.register();
	}

	public noDM: boolean = true;
	public ownerId?: string;
	public prefixes: string[] = ["!"];
	public token: string = "";
	public commandGroups: string[] = [];
	public commands: RegisteredCommand[] = [];

	private register()
	{
		this.on("message", (message: DJS.Message) => commandHandler(this, message));

		this.login(this.token);
	}

	public autoImport(dir: string)
	{
		const files = fs.readdirSync(dir);

		files.forEach((filename: string) =>
		{
			if (filename.endsWith(".ts") || filename.endsWith(".js"))
			{
				console.log("Autoimporting " + dir + filename);
				require(dir + filename);
			}
		});
	}

	public command(options?: commandOptions): Function
	{
		const client: Client = this;
		
		return function(parent: Object, name: string, executor: PropertyDescriptor)
		{
			const duplicateCommand: RegisteredCommand | undefined = client.commands.find((command: RegisteredCommand) => command.name == name);

			if(duplicateCommand) client.commands.splice(client.commands.indexOf(duplicateCommand), 1);

			const alreadyPushedGroup = client.commandGroups.find((group: string) => group == parent.constructor.name);

			if(!alreadyPushedGroup) client.commandGroups.push(parent.constructor.name);

			const hasOptions: boolean = options ? true : false;

			client.commands.push(new RegisteredCommand({
				group: parent.constructor.name,
				name: name,
				description: hasOptions && options?.description ? options.description : undefined,
				usage: hasOptions && options?.usage ? options.usage : undefined,
				aliases: hasOptions && options?.aliases ? options.aliases.concat([name]) : [name],
				execute: executor.value,
				prefixless: hasOptions && options?.prefixless ? options.prefixless : false,
				onlyPrefixless : hasOptions && options?.onlyPrefixless ? options.onlyPrefixless : false
			}));
		};
	}

	public permission(permission: DJS.PermissionString | DJS.PermissionString[])
	{
		const client = this;

		return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
		{
			const original = executor.value;
			
			executor.value = function(context: CommandContext)
			{
				if(context.msg.channel!.type == "dm")
					return original.apply(this, [context]);
				
				else if(context.msg.guild!.member(client.user!)!.hasPermission(permission))
					return original.apply(this, [context]);

				else return null;
			};
			return executor;
		};
	}

	public owner()
	{
		const client = this;

		return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
		{
			const original = executor.value;
			
			executor.value = function(context: CommandContext)
			{
				if(!client.ownerId) {
					console.log("INFO: To use the client#owner decorator, please provide your discord id as ownerId when initializing the client!");
					return null;
				}

				if(context.msg.author.id == client.ownerId)
					return original.apply(this, [context]);

				else return null;
			};
	
			return executor;
		};
	}
}
