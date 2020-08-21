import * as DJS from "discord.js";
import { CommandContext } from "../../Interfaces/CommandContext";
import { isArray } from "util";
import { CommandArg } from "../../Interfaces/RegisteredCommand";

export class Role
{
	/**
	 * Check for clients/bots permissions
	 * @param roles ID(s) or role object(s) of roles to be verified
	 * @returns Forwarded decorator
	 */
	public static Client(
		roles:
			| DJS.Role
			| string
			| (string | DJS.Role)[]
	): Function
	{
		return roleHelper("client", roles);
	}

	/**
	 * Check for users permissions
	 * @param roles ID(s) or role object(s) of roles to be verified
	 * @returns Forwarded decorator
	 */
	public static User(
		roles:
			| DJS.Role
			| string
			| (string | DJS.Role)[]
	): Function
	{
		return roleHelper("user", roles);
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
function roleHelper(
	who: "client" | "user",
	roles:
		| DJS.Role
		| string
		| (string | DJS.Role)[]
) : Function
{
	return function(
		parent: Object,
		name: string | symbol,
		executor: PropertyDescriptor
	): PropertyDescriptor
	{
		const original = executor.value;
		executor.value = function(context: CommandContext, ...args: CommandArg[])
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
