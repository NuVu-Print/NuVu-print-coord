const express = require('express');
const app = express();

app.use(express.static('www'));

var queue= []; // list of UUIDs
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
var printjobs = fs.readJsonSync('printJobs.json', 'utf8');
var uploader = new siofu();
uploader.dir = "/path/to/save/uploads";
var jobs;
// var queueTable= document.GetElemementById();

app.use(siofu.router)
app.listen(2001, () => {
    console.log('3D printer station is listening on port 2001');
})

function upload(stlUploads, baseSettings, student, job, customSettings, userPriority) {
    var path = __dirname + "/jobs/";
    var stl = uuid.v4(), jobUUID = uuid.v4(), Gcode = uuid.v4();
    var folder = path + jobUUID + '/';
    var pritority;
    fs.mkdirs(folder, function(err) {
        if (err) {
            console.log(err);
        }
    })
    var fileloc = folder.concat(stlUUID)
    fs.copy(fileloc + ".stl", function(e) {
        if (e) {
            console.log(e);
        };
    });
    slice(stl, baseSettings, customSettings, Gcode)
    printJobs.push({
      jobUUID: {
        "stlUUID": stlUUID,
        "gcodeUUID": gcodeUUID,
        "uuid": jobUUID,
        "student": student,
        "phone#": "+1",
        "priority": 0,
        "finished": false,
        "startTime": 1535657141, //epoch time
        "finishTime": 1535657141, //epoch time
        "jobTime": 200, //in minutes
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

function Slice(stls, Bsettings, Csettings, Gcode) {
  var stlPaths = [];
  for(var i  = 0; i<stls.length; i++){
    stlPaths += "/jobs" + stlpaths[i] + ".stl"
  }
    exec("" + "Slic3r "  + "--load " + Bsettings + Csettings + "--output" + Gcode, function(err) {
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
