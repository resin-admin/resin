#!/usr/bin/env node

var path = require('path')
var connect = require('connect')
var serveStatic = require('serve-static')

var port = process.env.PORT || 2000
var server = connect()

server.use('/vendor', serveStatic(path.join(__dirname, '/vendor')))
server.use(serveStatic(__dirname+'/dist'))
server.listen(port)

console.log('Listening on port', port)
