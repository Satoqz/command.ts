import { Message, PermissionString } from "discord.js";
import { CommandContext } from "./commandcontext";

export default function permission(permission: PermissionString | PermissionString[])
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
	{
		const original = executor.value;

		executor.value = function(context: CommandContext)
		{
			if(context.originalMessage.channel.type == "dm")
				return original.apply(this, [context]);
			
			else if(context.originalMessage.guild!.member(context.originalMessage.author!)!.hasPermission(permission))
				return original.apply(this, [context]);
			
			else return null;
		};
		
		return executor;
	};
}