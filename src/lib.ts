import { Client } from "./client";
import { reload } from "./reload";
import { permission } from "./permission";
import { guildonly } from "./guildonly";
import { commandContext } from "./interfaces/commandContext";
import { commands, commandGroups } from "./storage/commands";
import { command } from "./decorators/command";
import { check } from "./decorators/check";

export {
	Client,
	commands,
	commandGroups,
	command,
	commandContext as Context,
	reload,
	guildonly,
	check,
	permission,
	permission as userPermission,
};
