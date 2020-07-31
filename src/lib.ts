import { Client } from "./client";
import { reload } from "./reload";
import { Permission } from "./decorators/permission";
import { guildonly } from "./guildonly";
import { commandContext } from "./interfaces/commandContext";
import { commands, commandGroups } from "./storage/commands";
import { command } from "./decorators/command";
import { check } from "./decorators/check";
import { params } from "./decorators/paramDecorators";

export {
	Client,
	Permission as permission,
	commandContext as Context,
	commands,
	commandGroups,
	command,
	params,
	params as p,
	reload,
	guildonly,
	check,
};
