import {
	TextChannel,
	User,
	GuildMember,
	Guild,
	Channel,
	GuildChannel,
	Role
} from "discord.js";
import { Client } from "../../Client";
import { isNull } from "util";

/**
 * Use the methods contained in the Convert class to resolve discord.js objects like GuildMembers from strings.
 * The wanted result will be attempted to be resolved in the following order:
 * - Id or mention
 * - Lowercase tag (if a GuildMember or User)
 * - Lowercase name
 * If nothing can be resolved from the input string, `undefined` will be returned.
 *
 * ```
 * // examples
 *
 * const user = Convert.toUser("Satoqz", client);
 *
 * const user = Convert.toUser("satoqz#9674", client);
 *
 * const user = Convert.toUser("287204567236739073", client)
 * ```
 * The methods take a {@link Client} argument to access its user/channel etc. cache.
 */
export class Convert
{
	/**
	 * Converts string to [User](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/User).
	 */
	public static toUser(input: string, client: Client): User | undefined
	{
		input = input.toLowerCase();
		let user: User | undefined =
			client.users.cache.get(input.replace(/\!|\<|\>|\@/g, ""));
		if (!user) user = client.users.cache.find((user: User)=>
			user.tag.toLowerCase() == input);
		if (!user) user = client.users.cache.find((user: User) =>
			user.username.toLowerCase() == input);

		return user;
	}

	/**
	 * Converts string to [GuildMember](https://discord.js.org/?source=post_page---------------------------#/docs/main/stable/class/GuildMember).
	 */
	public static toMember(
		input: string,
		guild: Guild | null
	) : GuildMember | undefined
	{
		if (isNull(guild))
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
	public static toChannel(
		input: string,
		guild: Guild | null
	): TextChannel | undefined
	{
		if (isNull(guild)) return undefined;

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
	public static toRole(input: string, guild: Guild | null): Role | undefined
	{
		if (isNull(guild)) return undefined;

		input = input.toLowerCase();

		let role: Role | undefined =
			guild.roles.cache.get(input.replace(/\!|\<|\>|\@|\&/g, ""));
		if (!role)
			role = guild.roles.cache.find((role: Role) =>
				role.name.toLowerCase() == input);
	}
}