export interface ClientOptions
{
	prefixes?: string[],
	ownerId?: string,
	loadDirs?: string | string[],
	autoHandleCommands?: boolean,
	listenToBots?: boolean,
	listenToSelf?: boolean
}
