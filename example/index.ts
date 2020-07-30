// Import from the libary
import { Client } from "command.ts";
import { join } from "path";

//#region Load config
// Load config from your ".env" file, remember to gitignore it
// This is fine for development, for production you should consider to use another method to get your token
import { config } from "dotenv";
config({ path: "./.env" });
//#endregion

// Initialize a new client/bot instance 
const client = new Client({
	token: process.env.BotToken,	// When you use dotenv
	prefixes: ["?", "!"]	// Prefixes for your bot, you can specify multiple, also something like "mybot "
});

// Useful to access client other commands
export default client;

// This automatically imports all files/commands in the commands folder
client.autoImport(join(__dirname, "/commands/"));

// If you want, you can load/import files/commands like this, too
// Also, you can mix this kind of importing with the automatic one
// import "./commands/pingpong";
