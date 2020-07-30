import { Message } from "discord.js";
import Client from "./client";
import RegisteredCommand from "./registeredcommand";
import { CommandContext } from "./commandContext";

export function commandHandler(client: Client, message: Message)
{
	if(client.noDM && message.channel.type == "dm") return;
	
	let hasPrefix = false;
	let usedPrefix = "";
	
	client.prefixes.forEach((prefix: string) =>
	{
		if(message.content.startsWith(prefix))
		{
			hasPrefix = true;
			usedPrefix = prefix;
		}
	});

	if(!hasPrefix)
	{
		const args = message.content.split(" ");
		const command = client.commands.find((command: RegisteredCommand) => command.aliases.includes(args[0]) && command.prefixless);
		
		if(!command) return;
		
		command.execute(new CommandContext(message, args.slice(1, args.length)));
	}
	else
	{
		const args = message.content.replace(usedPrefix, "").split(" ");
		const command = client.commands.find((command: RegisteredCommand) => command.aliases.includes(args[0]) && !command.onlyPrefixless);
		
		if(!command) return;
		
		command.execute(new CommandContext(message, args.slice(1, args.length)));
	}
}
