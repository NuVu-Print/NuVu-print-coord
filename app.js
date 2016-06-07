#!/usr/bin/env node

const express = require('express');
const app = express();
const uuid = require('uuid');
const fs = require('fs.extra');
const mkdirp = require('mkdirp');
const exec = require("child_process").exec;
const server = require('http').Server(app);
const io = require('socket.io')(server);
const time = require('english-time-mirror')
const every = require('every-time-mirror')
const msTime = require('ms-time')

let queue = [
  {
    "job": "Earplugs",
    "name": "Lila",
    "eta": "5:30"
  },{
    "job": "Mushroom",
    "name": "Sam",
    "eta": "5:30"
  },{
    "job": "Ladder model",
    "name": "Myles",
    "eta": "5:30"
  },{
    "job": "Flower",
    "name": "Myles",
    "eta": "5:30"
  },{
    "job": "Saeedcoins",
    "name": "Saeed",
    "eta": "5:30"
  },{
    "job": "Extra extruder cold end",
    "name": "Stefano",
    "eta": "5:30"
  },{
    "job": "Facemask",
    "name": "Ian",
    "eta": "5:30"
  },{
    "job": "iPhone servo case",
    "name": "Micah",
    "eta": "5:30"
  },{
    "job": "Robot base",
    "name": "Sam",
    "eta": "5:30"
  }
]

app.set('view engine', 'pug');
app.get('/', function(req, res) {
    res.render("index", {
      "queue": queue
    });
})

app.use('/www', express.static('www'))

server.listen(2001, () => {
  console.log('3D printer station is listening on port 2001');
})

io.on('connection', (socket) => {
  console.log('New connection initiated')
  socket.emit('displayQueue', queue)
  let refresher = every('second', () => {
    socket.emit('displayQueue', queue)
  })
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
