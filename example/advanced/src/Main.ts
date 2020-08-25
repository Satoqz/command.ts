import { Client } from "command.ts";

import { join } from "path";
import { config } from "dotenv";

config({ path: "./.env" });

const client = new Client({
	defaultPrefix: "!",
	loadDirs: [
		join(__dirname, "commands"),
		join(__dirname, "events")
	]
});

client.login(process.env.TOKEN);
