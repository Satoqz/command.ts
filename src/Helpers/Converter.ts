import {
	TextChannel,
	User,
	GuildMember,
	Guild,
	Channel,
	GuildChannel,
	Role
} from "discord.js";
import { Client } from "../Client";

export class Converter
{
	constructor(public client: Client)
	{}
	/**
	 * Converts string to [User](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/User).
	 */
	public toUser(input: string): User | undefined
	{
		input = input.toLowerCase();
		let user: User | undefined =
			this.client.users.cache.get(input.replace(/\!|\<|\>|\@/g, ""));
		if (!user) user = this.client.users.cache.find((user: User)=>
			user.tag.toLowerCase() == input);
		if (!user) user = this.client.users.cache.find((user: User) =>
			user.username.toLowerCase() == input);

		return user;
	}

	/**
	 * Converts string to [GuildMember](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/GuildMember).
	 */
	public toMember(
		input: string,
		guild: Guild | null
	) : GuildMember | undefined
	{
		if (guild == null)
			return undefined;

		input = input.toLowerCase();

		let member: GuildMember | undefined =
			guild.members.cache.get(input.replace(/\!|\<|\>|\@/g, ""));
		if (!member)
			member = guild.members.cache.find((member: GuildMember) =>
				member.user.tag.toLowerCase() == input);
		if (!member)
			member = guild.members.cache.find((member: GuildMember) =>
				member.user.username.toLowerCase() == input);

		return member;
	}

	/**
	 * Converts string to [TextChannel](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/TextChannel).
	 */
	public toChannel(
		input: string,
		guild: Guild | null
	): TextChannel | undefined
	{
		if (guild == null)
			return undefined;

		input = input.toLowerCase();

		let channel: Channel | undefined =
			guild.channels.cache.get(input.replace(/\<|\>|\#/g, ""));
		if (!channel)
			channel = guild.channels.cache.find((channel: GuildChannel) =>
				channel.name.toLowerCase() == input);

		return channel as TextChannel;
	}

	/**
	 * Converts string to [Role](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/Role).
	 */
	public toRole(input: string, guild: Guild | null): Role | undefined
	{
		if (guild == null)
			return undefined;

		input = input.toLowerCase();

		let role: Role | undefined =
			guild.roles.cache.get(input.replace(/\!|\<|\>|\@|\&/g, ""));
		if (!role)
			role = guild.roles.cache.find((role: Role) =>
				role.name.toLowerCase() == input);
	}
}