uconst time = require('english-time-mirror')
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
  let camera = new THREE.PerspectiveCamera(75, 1.628, 0.1, 1000)
  let renderer = new THREE.WebGLRenderer()

  renderer.setSize((1.628 * window.innerWidth) / 2.63, window.innerWidth / 2.63)
  $('.no-webgl-placeholder').after($(renderer.domElement).addClass('model-preview')).remove()

  $('.slice-button').click(() => {
    socket.emit('addJob', {
      "job": $('#add-job-job'),
      "name": $('#add-job-name'),
      "eta": "eta"
    })
  })

})
