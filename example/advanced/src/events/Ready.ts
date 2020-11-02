import { Events } from "command.ts";

@Events.Ready
class ReadyEvent
{
	logReady()
	{
		console.log("Client is ready.");
	}
	logReadyAgain()
	{
		console.log("Client is really ready!");
	}
}