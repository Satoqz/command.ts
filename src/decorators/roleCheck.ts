import * as DJS from "discord.js";
import { commandContext } from "../interfaces/commandContext";
import { isArray } from "util";

export class RoleCheck
{
	public static client(
		roles:
			| DJS.Role
			| string
			| (string | DJS.Role)[],
		lackingPermissionAction?: Function
	): Function
	{
		return funcc("client", roles);
	}

	public static user(
		roles:
			| DJS.Role
			| string
			| (string | DJS.Role)[],
		lackingPermissionAction?: Function
	): Function
	{
		return funcc("user", roles);
	}
}

/**
 * Check for permissions
 * Not for direct use
 * @param who Whose permissions to check?
 * @param roles ID(s) or role object(s) of roles to be verified
 */
function funcc(
	who: "client" | "user",
	roles:
		| DJS.Role
		| string
		| (string | DJS.Role)[]
) : Function
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor): PropertyDescriptor
	{
		const original = executor.value;
		executor.value = function(context: commandContext)
		{
			const user = who == "client"
				? context.client.user!
				: context.author!;
			
			if (context.channel.type != "dm")
			{
				let fail: boolean = false;
				
				if (!isArray(roles))
					roles = [roles];
				
				roles.forEach(i =>
				{
					if (typeof(i) == "object")
						i = i.id;
					
					if (!context.guild!.member(user)!.roles.cache.has(i))
					{
						fail = true;
						return null;
					}
				});
				if (fail) return null;
			}
			return original.apply(this, [context]);;
		};
		return executor;
	};
}
