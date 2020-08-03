import * as DJS from "discord.js";
import { commandContext } from "../../interfaces/commandContext";
import { commandArg } from "../../interfaces/registeredCommand";

/**
 * @alias permission
 */
export class PermissionCheck
{
	/**
	 * Check for clients/bots permissions
	 * @param permission Which permissions are to be verified
	 * @param lackingPermissionAction [obsolete] Action on lacking permission
	 * @returns Forwarded decorator
	 */
	public static client(
		permission: DJS.PermissionString | DJS.PermissionString[],
		lackingPermissionAction?: Function
	): Function
	{
		return permissionCheckHelper("client", permission, lackingPermissionAction);
	}

	/**
	 * Check for users/authors permissions
	 * @param permission Which permissions are to be verified
	 * @param lackingPermissionAction [obsolete] Action on lacking permission
	 * @returns Forwarded decorator
	 */
	public static user(
		permission: DJS.PermissionString | DJS.PermissionString[],
		lackingPermissionAction?: Function
	): Function
	{
		return permissionCheckHelper("user", permission, lackingPermissionAction);
	}
}

/**
 * Check for permissions
 * Not for direct use
 * @param who Whose permissions to check?
 * @param permission Which permissions are to be verified
 * @param lackingPermissionAction [obsolete] Action on lacking permission
 * @returns Decorator
 * @internal
 */
function permissionCheckHelper(
	who: "client" | "user",
	permission: DJS.PermissionString | DJS.PermissionString[],
	lackingPermissionAction?: Function) : Function
{
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor): PropertyDescriptor
	{
		const original = executor.value;
		executor.value = function(context: commandContext, ...args: commandArg[])
		{
			const user =  who == "client"
				? context.client.user!
				: context.author!;

			const allowed = context.channel.type == "dm"
				|| context.guild!.member(user)!.hasPermission(permission);

			if(!allowed && lackingPermissionAction != undefined)
				lackingPermissionAction(context);

			return allowed
				? original.apply(this, [context, ...args])
				: null;
		};
		return executor;
	};
}
