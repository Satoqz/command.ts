import { TextChannel, User, GuildMember, Guild, Channel, GuildChannel, Role } from "discord.js";
import { Client } from "../client";
import { isNull } from "util";

export class Convert
{
	public static toUser(input: string, client: Client): User | undefined
	{
		input = input.toLowerCase();

		let user: User | undefined = client.users.cache.get(input.replace(/\!\<\>\@/, ""));
		if(!user) user = client.users.cache.find((user: User) => user.tag.toLowerCase() == input);
		if(!user) user = client.users.cache.find((user: User) => user.username.toLowerCase() == input);
		
		return user;
	}
	public static toMember(input: string, guild: Guild | null): GuildMember | undefined
	{
		if(isNull(guild)) return undefined;

		input = input.toLowerCase();

		let member: GuildMember | undefined = guild.members.cache.get(input.replace(/\!\<\>\@/, ""));
		if(!member) member = guild.members.cache.find((member: GuildMember) => member.user.tag.toLowerCase() == input);
		if(!member) member = guild.members.cache.find((member: GuildMember) => member.user.username.toLowerCase() == input);

		return member;
	}
	public static toChannel(input: string, guild: Guild | null): TextChannel | undefined
	{
		if(isNull(guild)) return undefined;

		input = input.toLowerCase();

		let channel: Channel | undefined = guild.channels.cache.get(input.replace(/\!\<\>\@/, ""));
		if(!channel) channel = guild.channels.cache.find((channel: GuildChannel) => channel.name.toLowerCase() == input);

		return channel as TextChannel;
	}
	public static toRole(input: string, guild: Guild | null): Role | undefined
	{
		if(isNull(guild)) return undefined;

		input = input.toLowerCase();

		let role: Role | undefined = guild.roles.cache.get(input.replace(/\!\<\>\@\&/, ""));
		if(!role) role = guild.roles.cache.find((role: Role) => role.name.toLowerCase() == input);
	}
}