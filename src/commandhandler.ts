import { Message, MessageEmbed, MessageAttachment } from "discord.js";
import { Client } from "./client";
import { registeredCommand } from "./interfaces/registeredCommand";
import { commandContext, StringResolvable } from "./interfaces/commandContext";
import { commands } from "./storage/commands";

export async function commandHandler(client: Client, message: Message)
{
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

	const command = commands.find((command: registeredCommand) =>
		command.aliases!.includes(context.args[0]) && command.prefixRequired != (hasPrefix ? "notallowed" : "require"));

	if(!command) return;
	
	context.args = context.args.slice(1, context.args.length);
	
	command.execute(context);
}
