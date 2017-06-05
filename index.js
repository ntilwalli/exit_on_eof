#! /usr/bin/env node
var process = require('process')
var child_process = require('child_process');

if (process.argv.length !== 3) {
  console.log("exit-on-eof requires command to be sent (as a string)")
  process.exit(0)
}

var cmd = process.argv[2]
var tokens = cmd.split(" ").filter(function (x) {return x.length > 0})

if (tokens.length === 0) {
  console.log("command requires at least one token")
  process.exit(0)
}

var proc = tokens[0]
var args = tokens.slice(1)

var child = child_process.spawn(proc, args, {detached: true});

child.stdout.on('data', function(data) {
  console.log(data.toString('utf8'))
})
child.stderr.on('data', function(data) {
  console.error(data.toString('utf8'))
})

function endAll() {
  process.kill(-child.pid)
  process.exit(0)
}

var stdin = process.openStdin()
stdin.on('end', function() {
  endAll()
})

process.on('SIGINT', function() {
  endAll()
})
