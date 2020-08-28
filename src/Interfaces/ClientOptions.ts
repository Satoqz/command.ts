export interface ClientOptions
{
	/**
	 * String array of default prefix(-es) to use for commands
	 */
	prefixes?: string[],
	/**
	 * All directories with source files that should be autoimported to load events and commands in them.<br>
	 * You should use `path.join` to accurately specify the directories.
	 *
	 * ```
	 * // example
	 * loadDirs: [
	 * 		path.join(__dirname, "/commands"),
	 * 		path.join(__dirname, "/events"),
	 * ]
	 * ```
	 */
	loadDirs?: string | string[],
	/**
	 * Whether or not the command handler should be automatically invoked on every received message.
	 * Default is true.<br>
	 * If set to false, commands can be invoked using {@link Client.handleCommand} in e.g. an on message event.
	 * The latter solution also allows you to load custom prefixes per message context, for example per guild using a database.
	 */
	autoHandleCommands?: boolean,
	/**
	 * Whether other bots can invoke commands. Default is false.
	 */
	listenToBots?: boolean,
	/**
	 * Whether the client itself can invoke its own commands. Default is false.
	 */
	listenToSelf?: boolean
}
