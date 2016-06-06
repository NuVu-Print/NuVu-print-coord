const time = require('english-time-mirror')
const every = require('every-time-mirror')
const msTime = require('ms-time')
const submitJob = require('./_submitJob.js')

let oldQueue = []

$(document).ready(() => {

  $(".jobs-tbody").find("tr:gt(0)").remove()

  var socket = io.connect(window.location.href)

  socket.on('connect', () => {
    console.log('WebSockets connection established')
  })

  socket.on('displayQueue', (data) => {
    if(!_.isEqual(data, oldQueue)) {
      console.log('rendering new queue on page')
      oldQueue = data
      $('.jobs-tbody').render(data)
    }
  })

  let scene = new THREE.Scene()
  let camera = new THREE.Persp

  $('.slice-button').click(() => {
    socket.emit('addJob', {
      "job": $('#add-job-job'),
      "name": $('#add-job-name'),
      "eta": "eta"
    })
  })

})
