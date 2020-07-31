import { Client } from "./client";
import { reload } from "./reload";
import { Permission } from "./decorators/permission";
import { guildonly } from "./guildonly";
import { commandContext } from "./interfaces/commandContext";
import { commands, commandGroups } from "./storage/commands";
import { command } from "./decorators/command";
import { check } from "./decorators/check";

export {
	Client,
	Permission as permission,
	commandContext as Context,
	commands,
	commandGroups,
	command,
	reload,
	guildonly,
	check,
};
