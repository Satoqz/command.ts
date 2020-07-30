import { PermissionString } from "discord.js";
import { CommandContext } from "./commandContext";

export function permission(permission: PermissionString | PermissionString[])
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
	{
		const original = executor.value;
		
		executor.value = function(context: CommandContext)
		{
			if(context.msg.channel.type == "dm")
				return original.apply(this, [context]);
			
			else if(context.msg.guild!.member(context.msg.author!)!.hasPermission(permission))
				return original.apply(this, [context]);
			
			else return null;
		};
		
		return executor;
	};
}