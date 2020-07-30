import { Message, PermissionString } from "discord.js";

export default function permission(permission: PermissionString | PermissionString[]) {
	return function(parent: Object, name: string | symbol, executor: PropertyDescriptor) {

		const original = executor.value;

		executor.value = function(message: Message, args: string[]) {

			if(message.channel.type == "dm") return original.apply(this, [message, args]);

			else if(message.guild.member(message.author).hasPermission(permission)) {

				return original.apply(this, [message, args]);

			}

			else return null;
		};

		return executor;
	};
}