import { Message, MessageEmbed, MessageAttachment } from "discord.js";
import { Client } from "./client";
import { registeredCommand, commandArg } from "./interfaces/registeredCommand";
import { commandContext, StringResolvable } from "./interfaces/commandContext";
import { commands } from "./storage/commands";
import { convertCommandArgs } from "./util/convertArgs";

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
		command.aliases!.includes(String(context.args[0])) && command.prefixRequired != (hasPrefix ? "notallowed" : "require"));

	if(!command) return;
	
	command.execute(...convertCommandArgs(context, command, context.args)); // dont ask why, it works
}
