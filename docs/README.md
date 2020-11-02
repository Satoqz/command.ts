# command.ts guide

- [Creating a client](#creating-a-client)
- [Creating a command](#creating-a-command)
- [Customizing commands](#customizing-commands)
- [Accessing commands](#accessing-a-list-of-registered-commands)
- [Automatic argument parsing](#automatic-argument-parsing)
- [Creating middleware](#creating-middleware)
- [Using middleware](#using-middleware)
- [Registering other events](#registering-other-events)
- [Troubleshooting](#troubleshooting)

## Creating a client

```ts
import { Client } from "command.ts";

const client = new Client({ prefixes: ["!", "?"] });

client.login("YOUR_TOKEN");
```

This client class extends the discord.js client and preserves all its features. It implements a command handler that you can configure in the constructor.

## Creating a command

```ts
import { Command, Context } from "command.ts";

@Command.Group("First commands") {

    ping(ctx: Context) {
        ctx.send("pong!");
    }

    pong(ctx: Context) {
        ctx.send("ping!");
    }
}
```

## Customizing commands

Lets improve this command logic a bit using the `Meta` decorator.<br>
Also, there are shortcuts available for `Group` and `Meta`:

```ts
import { Group, Meta, Context } from "command.ts";

@Group("First commands") {

    @Meta({
        aliases: ["pong"]
    })
    ping(ctx: Context) {
        if (ctx.usedAlias == "pong")
            ctx.send("ping!");
        else
            ctx.send("pong!");
    }
}
```

## Accessing a list of registered commands

```ts
import { Commands } from "command.ts";

Commands.store // all commands as objects, stored in an array

Commands.groups // all command group names, stores in an array
```

This is extremely helpful to create a dynamic help command.
## Automatic argument parsing

```ts
import { Group, Context, Args } from "command.ts";
import type { User } from "discord.js";

@Group("First commands") {

    ping(ctx: Context, @Args.User("user to be pinged") user: User) {
        // if no user could be parsed, the argument will be undefined
        if (!user)
            return ctx.send("Missing argument: name, id, tag or mention of user to be pinged");
        ctx.send(`${user.username}, you were pinged by ${ctx.author.username}`);
    }
}
```

## Creating middleware

```ts
import { fancify, Context } from "command.ts";

// if ctx.channel.type != "text", do not continue the middleware chain
export const NoDm = fancify((ctx: Context) => ctx.channel.type, "text");
```

The first argument is a function taking in the context that your command can receive later.
If the return value of that function equals to the second argument of fancify or is truthy,
the middleware chain will continue.
Otherwise, the next middleware or the final command will not be executed.

## Using middleware

You can attach your decorators created with `fancify` either on the command group class or on its member methods:<br>

```ts
@Group("commands")
class Commands {
    @NoDm
    ping(ctx: Context) {
        // ...
    }
}
```

Alternatively, on the whole class:

```ts
@Group("commands")
@NoDm
class Commands {
    ping(ctx: Context) {
        // ...
    }
}
```

This will register all commands in the group use this middleware.<br>
You can stack these middlewares however you wish to to create a middleware chain.
They can be applied to the entire class and to its commands at the same time to fully customize the behavior of your groups and particular commands.

## Registering other events
command.ts provides a convenient way to listen to the discord.js client events:

```ts
import { Events } from "command.ts";
import type { Message } from "discord.js";

@Events.Message
class MessageEvent {
    logMessage(msg: Message) {
        console.log(`A message was sent by ${msg.author.username} in ${msg.channel.name}`);
    }
    reactToHello(msg: Message) {
        if (msg.content.toLowercase() == "hello")
            msg.react("👋");
    }
}
```

All methods that you in declare in such a decorated class will fire on event emit.

## Troubleshooting

### Problem 1: Invalid tsconfig.json
Make sure that the `experimentalDecorators` option in your `tsconfig.json` is set to true in order to use decorators.
### Problem 2: Commands not registering
The classes including your commands do not need to be exported. Still, the files containing them must be imported once for the commands to register. There are 2 ways to achieve this:

- Manually importing them:

```ts
import "./commands/ping";
```

- Using the `loadDirs` option in the client constructor:

```ts
import { join } from "path";

const client = new Client({
    loadDirs: [join(__dirname, "/commands"), join(__dirname, "/events")]
})
```

This way you can ensure that all commands and events belonging to your bot are loaded on client initialization.<br>
 You can even reimport your command files to refresh them during runtime.

> Further documentation is available in jsdoc format inside of your editor (e.g. Visual Studio Code).