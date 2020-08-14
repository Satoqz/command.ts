import { Client } from "./client";
import { reload } from "./reload";
import { check } from "./decorators/checks/check";
import { command } from "./decorators/command";
import { guildOnly } from "./decorators/checks/guildOnly";
import { RoleCheck } from "./decorators/checks/roleCheck";
import { params } from "./decorators/paramDecorators";
import { PermissionCheck } from "./decorators/checks/permissionCheck";
import { commandContext } from "./interfaces/commandContext";
import { commands } from "./storage/commands";
import { Convert } from "./helpers/discordConverters";
import { providers } from "./database/providers";
import { clientOptions } from "./interfaces/clientOptions";
import { commandOptions } from "./interfaces/commandOptions";
import { registeredCommand } from "./interfaces/registeredCommand";

export {

	// main classes and methods

	Client,
	command,
	params,
	params as p,
	RoleCheck as roleCheck,
	PermissionCheck as permission,
	commandContext as Context,
	commands,

	// utility classes and methods
	reload,
	guildOnly,
	check,
	providers,
	Convert,
	// interfaces, types and interface-like classes

	clientOptions,
	commandOptions,
	registeredCommand
};
