import { Client } from "../";

const client = new Client({
	token: "<YOUR_TOKEN>",
	ownerId: "<YOUR_DISCORD_ID>",
	prefixes: ["?", "!"]
});

export default client;

import "./pingpong";