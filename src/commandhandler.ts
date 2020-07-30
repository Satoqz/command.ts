import { Message, MessageAdditions, MessageOptions, MessageEmbed, MessageAttachment } from "discord.js";
import { Client } from "./client";
import { RegisteredCommand } from "./interfaces/registeredCommand";
import { commandContext, StringResolvable } from "./interfaces/commandContext";

export async function commandHandler(client: Client, message: Message)
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

	const context = message as commandContext;
		
	context.args = context.content.replace(usedPrefix, "").split(" ");
	context.send = (
		content: StringResolvable,
		options?: MessageEmbed | MessageAttachment | (MessageEmbed | MessageAttachment)[] | undefined,
	) => {
		return context.channel.send(content, options);
	};

	if(!hasPrefix)
	{
		const command = client.commands.find((command: RegisteredCommand) => command.aliases.includes(context.args[0]) && command.prefixless);
		
		if(!command) return;

		context.args = context.args.slice(1, context.args.length);
		
		command.execute(context);
	}
	else
	{
		const command = client.commands.find((command: RegisteredCommand) => command.aliases.includes(context.args[0]) && !command.onlyPrefixless);
		
		if(!command) return;

		context.args = context.args.slice(1, context.args.length);
		
		command.execute(context);
	}
}
