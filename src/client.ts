import * as DJS from "discord.js";
import RegisteredCommand from "./registeredcommand";
import { clientOptions, commandOptions } from "../index";

export default class Client extends DJS.Client {

	constructor(options: clientOptions) {
		super();
		if(options.ownerId) this.ownerId = options.ownerId;
		if(options.prefixes) this.prefixes = options.prefixes;
		if(options.noDM) this.noDM = options.noDM;
		this.token = options.token;

		this.register();
	}

	public noDM: boolean = true;

	public ownerId: string;

	public prefixes: string[] = ["!"];

	public token: string = "";

	public commandGroups: string[] = [];

	public commands: RegisteredCommand[] = [];

	private register() {
		this.on("message", (message: DJS.Message) => {

			if(this.noDM && message.channel.type == "dm") return;
			
			let hasPrefix = false;
			let usedPrefix = "";

			this.prefixes.forEach((prefix: string) => {
				if(message.content.startsWith(prefix)) {
					hasPrefix = true;
					usedPrefix = prefix;
				}
			});

			if(!hasPrefix) {

				const args = message.content.split(" ");

				const command = this.commands.find((command: RegisteredCommand) => command.aliases.includes(args[0]) && command.prefixless);

				if(!command) return;

				command.execute(message, args);
			}

			else {

				const args = message.content.replace(usedPrefix, "").split(" ");
			
				const command = this.commands.find((command: RegisteredCommand) => command.aliases.includes(args[0]) && !command.onlyPrefixless);

				if(!command) return;

				command.execute(message, args);
			}
		});
		this.login(this.token);
	}

	public command(options?: commandOptions): Function {

		const client: Client = this;
		
		return function(parent: Object, name: string, executor: PropertyDescriptor) {
			
			const duplicateCommand: RegisteredCommand = client.commands.find((command: RegisteredCommand) => command.name == name);

			if(duplicateCommand) client.commands.splice(client.commands.indexOf(duplicateCommand), 1);

			const alreadyPushedGroup = client.commandGroups.find((group: string) => group == parent.constructor.name);

			if(!alreadyPushedGroup) client.commandGroups.push(parent.constructor.name);

			const hasOptions = options ? true : false;

			client.commands.push(new RegisteredCommand({
				group: parent.constructor.name,
				name: name,
				description: hasOptions && options.description ? options.description : undefined,
				usage: hasOptions && options.usage ? options.usage : undefined,
				aliases: hasOptions && options.aliases ? options.aliases.concat([name]) : [name],
				execute: executor.value,
				prefixless: hasOptions && options.prefixless ? options.prefixless : false,
				onlyPrefixless : hasOptions && options.onlyPrefixless ? options.onlyPrefixless : false
			}));

		};
	}

	public permission(permission: DJS.PermissionString | DJS.PermissionString[]) {

		const client = this;

		return function(parent: Object, name: string | symbol, executor: PropertyDescriptor) {

			const original = executor.value;
	
			executor.value = function(message: DJS.Message, args: string[]) {

				if(message.channel.type == "dm") return original.apply(this, [message, args]);

				else if(message.guild.member(client.user).hasPermission(permission)) {

					return original.apply(this, [message, args]);

				}

				else return null;
			};
	
			return executor;
		};
	}
	public owner() {

		const client = this;

		return function(parent: Object, name: string | symbol, executor: PropertyDescriptor) {

			const original = executor.value;
	
			executor.value = function(message: DJS.Message, args: string[]) {

				if(!client.ownerId) {
					console.log("INFO: To use the client#owner decorator, please provide your discord id as ownerId when initializing the client!");
					return null;
				}

				if(message.author.id == client.ownerId) {

					return original.apply(this, [message, args]);

				}

				else return null;
			};
	
			return executor;
		};
	}
}