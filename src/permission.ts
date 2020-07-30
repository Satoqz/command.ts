import { PermissionString } from "discord.js";
import { commandContext } from "./interfaces/commandContext";

export function permission(permission: PermissionString | PermissionString[])
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor)
	{
		const original = executor.value;
		
		executor.value = async function(context: commandContext)
		{
			if(context.channel.type == "dm")
				return original.apply(this, [context]);
			
			else if(context.guild!.member(context.author!)!.hasPermission(permission))
				return original.apply(this, [context]);
			
			else return null;
		};
		
		return executor;
	};
}