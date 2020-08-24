import { Client } from "command.ts";
import { join } from "path";

// Load config from your ".env" file, remember to gitignore it
import { config } from "dotenv";

config({ path: "./.env" });

// Initialize a new client/bot instance
const client = new Client({
	defaultPrefix: "!",
	// Loads all command files. You may also manually import them
	loadDirs: [
		join(__dirname, "commands"),
		join(__dirname, "events")
	]
});


// lastly, have your bot connect to discord using your api token
client.login(process.env.TOKEN);
