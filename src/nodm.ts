import { Message } from "discord.js";

export default function noDM()
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
	{
		const original = executor.value;

		executor.value = function(message: Message, args: string[])
		{
			if(message.channel.type == "dm") return null;

			else return original.apply(this, [message, args]);
		};
		
		return executor;
	};
}