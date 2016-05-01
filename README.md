## `exit_on_eof`

Helper script for Elixir/Phoenix projects using `npm scripts` as a watcher instead of Brunch

`npm install -g exit_on_eof`

### Usage

Elixir/Phoenix projects use Brunch by default for front-end workflows, but this can be modified to use
a simpler approach like `npm scripts` as described [here](http://martinholman.co.nz/blog/2015/09/27/elixir-phoenix-browserify/).  A problem arises though
when killing/exiting the server.  Phoenix sends an EOF signal through `stdin` to the watch process
to indicate it should terminate.  `npm scripts`, like many commands, does not respond to EOF like SIGINT
so the node processes remain running.

This script helps deal with this issue by wrapping a user-given command in a parent process that is sensitive
to both SIGINT and EOF.

To read more about this sensitivity to EOF as per Chris McCord, view [this](https://groups.google.com/forum/#!topic/phoenix-talk/IHS9VoO8Kws)

(Both [Webpack](https://github.com/webpack/webpack/pull/1311) and [Brunch](https://github.com/brunch/brunch/blob/master/CHANGELOG.md) were actively PR'd to allow for this behavior.  This is a stop-gap until a more elegant [solution](https://github.com/phoenixframework/phoenix/issues/1540) presents.)

###Example

In Phoenix project update `config/dev.exs`:
```
config :{YOUR_PROJECT_NAME_ATOM}, {YOUR_PROJECT_NAME}.Endpoint
...
watchers: [exit_on_eof: ["npm run watch"]]
```
In your `package.json`:
```
{
  ...
  "scripts": {
    ...
    "watch": some set of commands
    ...
  },
  ...
}
```

When you start the server your command should run and when you stop the server
the node processes that were spun up to manage the front-end build will also
be killed.
