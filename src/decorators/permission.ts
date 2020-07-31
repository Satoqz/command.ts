import * as DJS from "discord.js";
import { commandContext } from "../interfaces/commandContext";

export class Permission
{
	public static client(permission: DJS.PermissionString | DJS.PermissionString[]): Function
	{
		return funcc("client", permission);
	}
	
	public static user(permission: DJS.PermissionString | DJS.PermissionString[]): Function
	{
		return funcc("user", permission);
	}
}

function funcc(who: "client" | "user", permission: DJS.PermissionString | DJS.PermissionString[])
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor): PropertyDescriptor
	{
		const original = executor.value;
		executor.value = function(context: commandContext)
		{
			const user =  who == "client"
				? context.client.user!
				: context.author!;
			return context.channel.type == "dm" || context.guild!.member(user)!.hasPermission(permission)
				? original.apply(this, [context])
				: null;
		};
		return executor;
	};
}
