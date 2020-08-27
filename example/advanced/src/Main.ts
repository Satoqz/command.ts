import { Client } from "command.ts";

import { join } from "path";
import { config } from "dotenv";

config({ path: "./.env" });

export const client = new Client({
	loadDirs: [
		join(__dirname, "commands"),
		join(__dirname, "events")
	],
	autoHandleCommands: false
});

client.login(process.env.TOKEN);
