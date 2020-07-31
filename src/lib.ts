import { Client } from "./client";
import { reload } from "./reload";
import { PermissionCheck } from "./decorators/permissionCheck";
import { guildonly } from "./decorators/guildonly";
import { commandContext } from "./interfaces/commandContext";
import { commands, commandGroups } from "./storage/commands";
import { command } from "./decorators/command";
import { check } from "./decorators/check";
import { RoleCheck } from "./decorators/roleCheck";
import { params } from "./decorators/paramDecorators";

export {
	Client,
	params,
	params as p,
	RoleCheck as rolecheck,
	PermissionCheck as permission,
	commandContext as Context,
	commands,
	commandGroups,
	command,
	reload,
	guildonly,
	check,
};
