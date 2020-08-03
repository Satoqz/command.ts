import * as DJS from "discord.js";
import { commandContext } from "../../interfaces/commandContext";
import { isArray } from "util";
import { commandArg } from "../../interfaces/registeredCommand";

/**
 * @alias roleCheck
 */
export class RoleCheck
{
	/**
	 * Check for clients/bots permissions
	 * @param roles ID(s) or role object(s) of roles to be verified
	 * @returns Forwarded decorator
	 */
	public static client(
		roles:
			| DJS.Role
			| string
			| (string | DJS.Role)[],
		lackingPermissionAction?: Function
	): Function
	{
		return roleCheckHelper("client", roles);
	}

	/**
	 * Check for users permissions
	 * @param roles ID(s) or role object(s) of roles to be verified
	 * @returns Forwarded decorator
	 */
	public static user(
		roles:
			| DJS.Role
			| string
			| (string | DJS.Role)[],
		lackingPermissionAction?: Function
	): Function
	{
		return roleCheckHelper("user", roles);
	}
}

/**
 * Check for permissions
 * This is a helper, not for direct use
 * @param who Whose permissions to check?
 * @param roles ID(s) or role object(s) of roles to be verified
 * @returns Decorator
 * @internal
 */
function roleCheckHelper(
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
		executor.value = function(context: commandContext, ...args: commandArg[])
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
			return original.apply(this, [context, ...args]);
		};
		return executor;
	};
}
