#!/usr/bin/env node

var express = require('express');
var app = express();
var uuid = require('uuid');
var fs = require('fs.extra');
var mkdirp = require('mkdirp');
var exec = require("child_process").exec;
var server = require('http').Server(app);
var io = require('socket.io')(server);



app.set('view engine', 'pug');
app.get('/', function(req, res) {
    res.render("index", {
      "queue": [
        {
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        },{
          "job": "Test job",
          "name": "Sam",
          "eta": "5:30"
        }
      ]
    });
})

app.use('/www', express.static('www'))

server.listen(2001, () => {
  console.log('3D printer station is listening on port 2001');
})

io.on('connection', (socket) => {
  console.log('New connection initiated')
})

function upload(stl) {
    var path = __dirname + "/jobs/"
    var stlUUID = uuid.v4();
    var jobUUID = uuid.v4();
    var gcodeUUID = uuid.v4();
    var folder = path + jobUUID + '/'
    fs.mkdirs(folder, function(err) {
        if (err) {
            console.log(err);
        }
    })
    var fileloc = folder.concat(stlUUID)
    fs.copy(fileloc + ".stl", function(e) {
        if (e) {
            console.log(e);
        }
    })
}

function Slice(stl, Bsettings, Csettings) {
    exec("cd C:/Users/louieadamian/Documents/slic3r-mswin-x64-1-2-9a-stable/Slic3r\nslic3r-console.exe" + "Slic3r " + stlUUID + ".stl " + "--load " + Bsettings + Csettings, function(err) {
        if (err) {
            console.log(err);
        }

    })
}

function priorityUtility(Importance, added, time, jobuuid) {
    var prio = (importace - added) / time;
    return jobuuid.prio;
}
