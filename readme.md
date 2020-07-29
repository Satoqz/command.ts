# command.ts

### This is an unofficial command framework for [discord.js](https://github.com/discordjs/discordjs)

## So what's special about this?

### This framework makes use of experimental TypeScript decorators which allow the following syntax:

<pre><code>@Command(client)
public ping(message, args) {
	message.reply("pong");
}</code></pre>

### Much simpler than...

<pre><code>client.on("message", message => {
	if(message.content.startsWith(prefix)) {
		const args = message.content.split(" ");
		switch(args[0]) {
			case "ping" {
				message.reply("pong");
			}
		}
	}
});
</code></pre>

### ...right? Also, imagine setting an alias using the above code.. what a chaos

### Why not just use:

<pre><code>@Command(client, {
	aliases: ["ping2", "pingpong"]
})
public ping(message, args) {
	message.reply("pong");
}</code></pre>

# Documentation

## Client

<pre><code>import { Client } from "command.ts";

const client = new Client({
	token: &ltYOUR_CLIENT_TOKEN_HERE&gt,

	// optional, default is "!"
	prefixes: ["!", "?"]
});

// No login function is required!

export default client;

// You should export the client object to declare commands in other files.
</code></pre>

### Client.commands:
An array of all registered commands

### Client.commandGroups
An array with the names of all registered command groups

### Client.prefixes
An array of the client's specified prefixes


## Command

<pre><code>import { Command } from "command.ts";

// Your commands must be wrapped in a class because we are using decorators.
// The class name is used as the group name of the commands you define in it.

class MyCommands {

	@Command(client, commandOptions)
	public ping(message, args) {

	}

}
</code></pre>

## commandOptions

### commandOptions.aliases (optional)
An array of the aliases that you want to add to the command.<br>
Keep in mind that every command will have the name of its function as a default trigger

### commandOptions.guildOnly (optional)
boolean to determine if a command can only be executed in a guild.

### commandOptions.prefixless (optional)
boolean, if true the command will be triggered even if a message does not use one of the client's prefixes

### commandOptions.onlyPrefixless (optional)
boolean, if true the command can only be triggered if there is no prefix in a message

## reload
`reload` is a function that deletes the cache of a loaded source file and then imports it again.<br>It should be used to reload/change commands without restarting the whole process.<br>
`reload` takes one argument, which is the full path of the file you want to reload.<br>
If you're not using ts-node, you must pass in the transpiled `.js` file that you wish to reload<br>
It is made sure that you do not load a command twice and that newly loaded commands will replace the old ones

## Disclaimer: 

### This is still in early development. Expect frequent and sudden breaking changes.
