import * as DJS from "discord.js";
import { commandContext } from "../interfaces/commandContext";

export class Permission
{
	public static client(permission: DJS.PermissionString | DJS.PermissionString[]): Function
	{
		return function(parent: Object, name: string | symbol, executor: PropertyDescriptor): PropertyDescriptor
		{
			const original = executor.value;
			executor.value = function(context: commandContext)
			{
				if (context.channel.type == "dm")
					return original.apply(this, [context]);
				else if (context.guild!.member(context.client.user!)!.hasPermission(permission))
					return original.apply(this, [context]);
				else return null;
			};
			return executor;
		};
	}
	
	public static user(permission: DJS.PermissionString | DJS.PermissionString[]): Function
	{
		return function(parent: Object, name: string | symbol, executor: PropertyDescriptor): PropertyDescriptor
		{
			const original = executor.value;
			executor.value = function(context: commandContext)
			{
				if (context.channel.type == "dm")
					return original.apply(this, [context]);
				else if (context.guild!.member(context.author!)!.hasPermission(permission))
					return original.apply(this, [context]);
				else return null;
			};
			return executor;
		};
	}
}
