# `exit_on_eof` for Phoenix projects using `npm scripts` instead of Brunch

`npm install -g exit_on_eof`

## Usage

This script allows `npm scripts`-based build-workflows to be used with the
Phoenix build process.  The phoenix watcher sends `EOF` to shut down the watcher
process (as per Chris McCord here: https://groups.google.com/forum/#!topic/phoenix-talk/IHS9VoO8Kws)

`npm run ...` is not normally sensitive to `EOF`, this scripts allows clients
to send one command to be run such that it becomes sensitive to both the `SIGINT`
signal and `EOF` from `stdin` to trigger termination.  This allows a call to
`npm run` to also become sensitive to `EOF`

#Example

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
