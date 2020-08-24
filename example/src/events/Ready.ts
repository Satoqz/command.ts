import { Events, Client } from "command.ts";

@Events.Ready
class ReadyEvent
{
	logReady(client: Client)
	{
		console.log("Client is ready and logged in as " + client.user.username);
	}
}