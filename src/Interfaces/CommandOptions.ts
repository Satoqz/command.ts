
export interface CommandOptions
{
	/**
	 * Whether to allow omitting the prefix in front of a command, to require it, or to forbid it.
	 */
	prefix?: "optional" | "require" | "notallowed",
	/**
	 * All aliases available for your command.
	 * Your command's method name will always be added to the aliases automatically
	 * unless you set {@link CommandOptions.defaultName} to false.
	 */
	aliases?: string[],
	/**
	 * Any kind of description that you want to give for your command.
	 * Used to make dynamic help pages.
	 */
	description?: string,
	/**
	 * Any kind of usage information that you want to give for your command.
	 * Used to make dynamic help pages.
	 */
	usage?: string,
	/**
	 * Whether to register the name of the command method as an alias automatically.
	 * Will be ignored if no aliases are specified.
	 * Default is true.
	 */
	defaultName?: boolean
}
