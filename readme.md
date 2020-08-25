# command.ts

This is an unofficial command framework for [discord.js](https://discord.js.org)

If you see this and you're on GitHub, you will find the official documentation [here](https://command.js.org).
If you're not on GitHub, you might want to check out the framework's repository [here](https://github.com/Satoqz/command.ts).


# Getting started

Let's provide you with some basic info and examples to get you started with command.ts.

## Installing packages
First off, you should make sure that you have installed all the necessary packages to properly set up your project

The main packages:
```
npm install command.ts discord.js
```
TypeScript related and other packages for development
```
npm install -D typescript @types/node dotenv
```

The last setup step would be enabling decorators in your `tsconfig.json` as following:
```
{
	"compilerOptions": {
		"experimentalDecorators": true,
		"target": "ESNext"
	}
}
```

## Creating a command
Let's finally get to the code!

First, let's import everything we need from the library to make a basic bot and initialize a client:
```
import { Client, Commands, Context } from "command.ts";

const client = new Client({ defaultPrefix: "!" });
```
Next, let's set up a basic ping command.

Create a class do contain your command and decorate it with the command group decorator as following:
```
@Commands.Group()
class MyCommands
{

}
```
You can also import `Group` directly and use it like so:
```
@Group()
class MyCommands
{

}
```

### Create the command function
```
class MyCommands {
	ping(ctx: Context) {
		ctx.send("pong");
	}
}
```

The last step to set up the ping command is logging into discord with your [api token](https://discord.com/developers). This works the same is in `discord.js`.
```
client.login("<YOUR_TOKEN_HERE>");
```
**To avoid having to put your token into your code, you should setup an external file to load it from. If you use git, you should probably add that file to your `.gitignore`. Libraries like [dotenv](https://www.npmjs.com/package/dotenv) can be very useful here.**

If you now run your code and send `!ping` in a channel that the bot has access to, it should respond with `pong`.
