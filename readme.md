# command.ts

### This is an unofficial command framework for [discord.js](https://discord.js.org)

#### If you see this and you're on GitHub, you will find the official documentation [here](https://command.js.org).
#### If you're not on GitHub, you might want to check out the framework's repository [here](https://github.com/Satoqz/command.ts).


# Guide

### Let's provide you with some basic info and examples to get you started with command.ts

### First off, you should make sure that you have installed all the necessary packages to properly set up your project

### The main packages:
```
npm install command.ts discord.js
```
### TypeScript related and other packages for development
```
npm install -D typescript @types/node ts-node dotenv
```
### We highly recommend using ts-node, but you might aswell manually compile your typescript

### Let's get to the code

### First, let's import everything we need from the library to make a basic bot and initialize a client:
```
import { Client, command, Context } from "command.ts";

const client = new Client();
```
### Next, let's set up a basic ping command:

#### Create a class do contain your command:
```
class MyCommands {

}
```
#### The class name will be the group name of your command. Commands must be wrapped in a class to make use of decorators, as we will see in the next step.
### Create the command function
```
class MyCommands {
	@command()
	ping(ctx: Context) {
		ctx.send("pong");
	}
}
```
### Let's take a look at what is happening here:
- The `@command()` decorator will register your function as a command
- `ctx` is an argument that will be passed to every command. It contains the usual `Message` class from `discord.js` including useful shortcuts like `ctx.send()` which is an alias to `message.channel.send()`

### The last step to set up the ping command is logging into discord with your [api token](https://discord.com/developers). This works the same is in `discord.js`.
```
client.login("<YOUR_TOKEN_HERE>");
```
### To avoid having to put your token into your code, you should setup an external file to load it from. If you use git, you should probably add that file to your `.gitignore`. Libraries like [dotenv](https://www.npmjs.com/package/dotenv) can be very useful here.

### If you now run your code and send `!ping` in a channel that the bot has access to, it should respond with `pong`.

## How to change the command prefix:
```
const client = new Client({
	prefixes = ["!", "?"]
});
```
#### or
```
client.prefixes = ["!", "?"];
```

## Use other decorators

### There are plenty of other decorators available than can stack with the `@command()` decorator. Just make sure that the `@command()` decorator stays at the top. Let's use the `guildonly()` decorator as an example:
```
@command()
@guildonly()
ping(ctx: Context) {
	ctx.send("pong");
}
```
### Now, the bot will only respond if the the ping command was sent in a guild/server and ignore dms.

## Request argument types

### To make your life easier, you can request converted argument types in your command definition. Here's a full example:
```
import { Client, Context, params, command } from "command.ts";
import { User } from "discord.js";

// declare client etc

class CommandsWithCustomAguments {

	username(ctx: Context, @params.User user: User) {
		ctx.send(user.username);
	}

	square(ctx: Context, @params.number base: number) {
		ctx.send(Math.pow(base, 2))
	}
}
```
### As you can see, we've declarated 2 commands. Let's check their output:
```
!username coffee
>>> Coffee
```
### This does not look like much, but under the hood the client looked for a user who can somehow be parsed having the information "coffee". It found the user "Coffee" whose lowercase name is "coffee" and returned the resolved User class that we could then get the username property from. This also works with mentioning the user or just sending their discord ID.

### Let's see how the second command works:
```
!square 8
>>> 64
```
### Because we got the input "8" passed as a number instead of a string, we were able to instantly square it without any typeconversion.

### Let's break down the syntax of these parameter annotations:
```
square(ctx: Context, @params.number base: number)
	   ^^^			 ^^^^^^^^^^^^^^       ^^^^^^
		|					|			 // The classic TypeScript type annotation
		|					|
	   	|	// The annotation that tells the command handler what type to pass
		|
// The evocation context that will always be passed'
```




