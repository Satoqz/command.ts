# Getting started

## Create discord client instance
```ts
import { Client } from "command.ts";

const client = new Client({ prefixes: ["!", "?"] });

client.login("YOUR_TOKEN")
```
> This client class extends the discord.js client and preserves all its features

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

Lets improve this command logic a bit using the `Meta` decorator. Also, there are shortcuts available for `Group` and `Meta`:

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

Now, let's receive a parsed user argument to ping someone specifically:

```ts
import { Group, Context, Args } from "command.ts";
import type { User } from "discord.js";

@Group("First commands") {

    ping(ctx: Context, @Args.User("user to be pinged") user: User) {
        if (!user)
            return ctx.send("Missing argument: name, id, tag or mention of user to be pinged");
        ctx.send(`${user.username}, you were pinged by ${ctx.author.username}`);
    }
}
```

## Creating middleware/inhibitors
`NoDm.ts`
```ts
import { fancify, Context } from "command.ts";

export const NoDm = fancify((ctx: Context) => ctx.channel.type, "text");
```
> The first argument is a function taking in the context that your command can receive later.
> If the return value of that function equals to the second argument of fancify or is truthy, The middleware chain will continue.
> Otherwise, the next middleware or the final command will not be executed

## Applying middleware
### There are two places that your can attach your decorators created with `fancify` to:
- On the command function:
```ts
@Group("commands")
class Commands {
    @NoDm
    ping(ctx: Context) {
        // ...
    }
}
```
- Alternatively, on the whole command group class. This will register all commands in the group use this middleware:
```ts
@Group("commands")
@NoDm
class Commands {
    ping(ctx: Context) {
        // ...
    }
}
```
> You can stack these middlewares however you wish to to create a middleware chain.
> You can have them applied to the entire class and to the commands at the same time to fully customize the behavior of your groups and particular commands.

## Further documentation is available in jsdoc format inside of your editor (e.g. Visual Studio Code)