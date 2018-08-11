#!/usr/bin/env node

const express = require('express');
const app = express();

app.use(express.static('www'));

var Queue = []; //list of UUIDs
//use(siofu.router);
var uuid = require('uuid');
var fs = require('fs.extra');
var mkdirp = require('mkdirp');
var exec = require("child_process").exec;
var siofu = require("socketio-file-upload");
var io = require('socket.io')(2000);
app.set('view engine', 'pug');
app.get('/', function(req, res) {
    res.render("index");
})

var uploader = new siofu();
uploader.dir = "/path/to/save/uploads";
var jobs;
var queueTable= document.GetElemementById();

app.use(siofu.router)
app.listen(2001, () => {
    console.log('3D printer station is listening on port 2001');
})

function upload(stl, baseSettings, student, job, customSettings) {
    var path = __dirname + "/jobs/";
    var stlUUID = uuid.v4(), jobUUID = uuid.v4(), gcodeUUID = uuid.v4();
    var folder = path + jobUUID + '/';
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
    jobs.push({
      jobUUID: {
        "stlUUID": stlUUID,
        "gcodeUUID": gcodeUUID,
        "uuid": jobUUID,
        "student": student,
        "phone-#": "+1",
        "finished": false,
        "startTime": 000000, // hhmmss hour minute second 24 hour time
        "finishTime": 000000, // hhmmss hour minute second 24 hour time
        "jobTime": 0000, //in minutes
        "baseSettings": baseSettings,
        "customSettings": customSettings,
      }
    });
}

io.on("connection", function(socket) {
    var uploader = new siofu();
    uploader.dir = "/upload";
    uploader.listen(socket);

})

function Slice(stl, Bsettings, Csettings, gcode) {
    exec("" + "Slic3r " + stlUUID + ".stl " + "--load " + Bsettings + Csettings, function(err) {
        if (err) {
            console.log(err);
        }
    })
}

function priorityUtility(Importance, added, time, jobuuid) {
    var prio = (importace - added) / time;
    return jobuuid.prio;
}
function startJob() {

}

function gcodeTime(){

}

function queuer(job){

}
