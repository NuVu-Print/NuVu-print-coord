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
    "eta": "12:35"
  },{
    "job": "Mushroom",
    "name": "Sam",
    "eta": "12:37"
  },{
    "job": "Ladder model",
    "name": "Myles",
    "eta": "1:03"
  },{
    "job": "Flower",
    "name": "Myles",
    "eta": "1:14"
  },{
    "job": "Extra extruder cold end",
    "name": "Stefano",
    "eta": "1:53"
  },{
    "job": "Facemask",
    "name": "Ian",
    "eta": "3:46"
  },{
    "job": "iPhone servo case",
    "name": "Micah",
    "eta": "4:02"
  },{
    "job": "Robot base",
    "name": "Sam",
    "eta": "4:20"
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
    var jobUUID = uuid.v4()
    var stlUUID = jobUUID;
    var gcodeUUID = jobUUID;
    var folder = path + jobUUID + '/'
    fs.mkdirs(folder, function(err) {
        if (err) {
            console.log(err);
        }
    })
    var fileloc = folder.concat(stlUUID)
    fs.copy(fileloc + ".stl", function(err) {
        if (err) {
            console.log(e);
        }
    })
    //slice(stlUUID,fast)
}

function Slice(stlUUID, Bsettings, Csettings) {
    exec("Slic3r " + stlUUID + ".stl " + "--load " + Bsettings + Csettings, function(err) {
        if (err) {
            console.log(err);
        }

    })
}

function priorityUtility(Importance, added, time, jobuuid) {
    var prio = (importace - added) / time;
    return jobuuid.prio;
}
