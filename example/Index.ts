// Import from the libary
import { Client, Providers, importAll, Panel } from "command.ts";
import { join } from "path";

//#region Load config
// Load config from your ".env" file, remember to gitignore it
// This is fine for development, for production you should consider to use another method to get your token
import { config } from "dotenv";
import { MessageEmbed, Message } from "discord.js";

config({ path: "./.env" });
//#endregion

const dbProvider = new Providers.File(join(__dirname, "cfg.json"));

// Initialize a new client/bot instance
const client = new Client({	// When you use dotenv
	defaultPrefix: "!",	// Prefixes for your bot, specify as many as you want to. Default is "!".
	database: dbProvider
});

// This automatically imports all files/commands in the commands folder
importAll(join(__dirname, "commands"));

// If you want to, you can load/import files/commands like this, too
// Also, you can mix normal imports with the automatic one
// import "./commands/pingpong";

// lastly, have your bot connect to discord using your api token
client.login(process.env.TOKEN);

client.on("ready", () => createPanel());

async function createPanel()
{
	const embed = new MessageEmbed().setTitle("hey :D");

	const panel = new Panel(
		{
			channel: "741824711888994425",
			message: "746513377408319629",
			client: client
		},
		embed
	);

	setTimeout(() =>
	{
		panel
			.setTitle("test")
			.render();
	}, 10000);

	setTimeout(() =>
	{
		panel
			.setDescription("OMG THIS IS WORKING")
			.render();
	}, 20000);
}


