import { isConstructor } from "../Helpers/Internal/IsConstructor";

export class Events
{
	static Message(parent: Function)
	{
		Events.addEvent("message", parent);
	}
	static Ready(parent: Function)
	{
		Events.addEvent("ready", parent);
	}
	static GuildMemberAdd(parent: Function)
	{
		Events.addEvent("guildMemberAdd", parent);
	}
	private static addEvent(name: string, parent: Function)
	{
		Object.getOwnPropertyNames(parent.prototype).forEach((key: string) =>
		{
			const descriptor = Object.getOwnPropertyDescriptor(parent.prototype, key);

			if (isConstructor(descriptor?.value))
				return;

			Events.store.push({ name: name, execute: descriptor?.value });
		});
	}
	static store: { name: string, execute: Function }[] = []
}