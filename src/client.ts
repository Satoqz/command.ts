import * as DJS from "discord.js";
import RegisteredCommand from "./registeredcommand";
import { clientOptions } from "../index";

export default class Client extends DJS.Client {

	constructor(options: clientOptions) {
		super();
		this.token = options.token;
		if(options.prefixes) {
			this.prefixes = options.prefixes;
			console.log(this.prefixes);
		}
		this.register();
	}

	public prefixes: string[] = ["!"];

	public token: string = "";

	public commandGroups: string[] = [];

	public commands: RegisteredCommand[] = [];

	private register() {
		this.on("message", (message: DJS.Message) => {
			
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

}