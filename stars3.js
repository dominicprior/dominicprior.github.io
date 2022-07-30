// An animation of some stars coming towards us.

// It relies on SVG using sub-pixel accuracy.

// See https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

// The viewpoint moves along the z-axis towards the stars that are
// generated by addNewStars.

'use strict'

const winW = window.innerWidth
const winH = window.innerHeight
let div = document.createElement('div')
document.body.append(div)
let svg = SVG().addTo('body').size(winW, winH)

const numStars = 240
const starDiam = 0.4
const boxSize = 1000
let furthestStars = 0
let speed = 1

let eyePos   = [0, 0, 0]
let eyeDir   = [0, 1, 0]   // facing North
let eyeRight = [1, 0, 0]   // screen x dir
let eyeUp    = [0, 0, 1]

let prevMousePos = false

window.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    speed = 1 - speed
  }
  return false
})

svg.node.onpointerdown = (event) => {
  prevMousePos = [event.x, event.y]
  return false
}

svg.node.onpointermove = (event) => {
  if (event.buttons === 2) {
    const dx = event.x - prevMousePos[0]
    const dy = event.y - prevMousePos[1]
    if (dx) {
      updateDirs(eyeDir, eyeRight, -dx/400)
    }
    if (dy) {
      updateDirs(eyeDir, eyeUp, dy/400)
    }
  }
  prevMousePos = [event.x, event.y]
  return false
}

function updateDirs(u, v, angle) {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const uu = minus(times(c,u), times(s,v))
  const vv = plus (times(s,u), times(c,v))
  assign(u, uu)
  assign(v, vv)
}

function rnd(a, b) {
  return a + (b - a) * Math.random()
}

function rndColor() {
  return new SVG.Color({ r: rnd(100, 255),
                         g: rnd(100, 255),
                         b: rnd(100, 255),
                         a: 100 })
}

let stars = []

function hypotSq(a) {
  return dot(a, a)
}

function plus(u, v) {
  return [u[0] + v[0], u[1] + v[1], u[2] + v[2]]
}

function minus(u, v) {
  return [u[0] - v[0], u[1] - v[1], u[2] - v[2]]
}

function dot(u, v) {
  return u[0] * v[0] + u[1] * v[1] + u[2] * v[2]
}

function distSq(u, v) {
  return hypotSq(minus(u, v))
}

function times(k, u) {
  return [k * u[0], k * u[1], k * u[2]]
}

function assign(u, v) {
  u[0] = v[0]
  u[1] = v[1]
  u[2] = v[2]
}

stars = []
for (let j=2; j >= -2; j--) {
  for (let i=2; i >= -2; i--) {
    stars.push([2*j, 4, 2*i, rndColor()])
  }
}

function draw() {
  svg.clear()
  stars.sort((a, b) => distSq(b, eyePos) - distSq(a, eyePos))
  for (let star of stars) {
    const pos = minus(star, eyePos)
    let z = dot(pos, eyeDir)
    const y = dot(pos, eyeUp)
    const x = dot(pos, eyeRight)
    if (z < boxSize) {
      let tanFov = 2
      z += Math.sqrt(x*x + y*y + z*z) ; tanFov /= 2
      if (z > starDiam) {
        const scale = Math.min(winW, winH) / tanFov
        svg.circle(starDiam * scale / z).center(
          x / z * scale + winW / 2,
          - y / z * scale + winH / 2).fill(star[3])
      }
    }
  }
}

// Update the SVG model (in response to requestAnimationFrame).
// For simplicity, it throws away the current SVG model and
// regenerates it from the circles array.

let prevT = 0

function step(timestamp) {
  let t = timestamp / 1000
  let deltaT = t - prevT
  prevT = t
  eyePos = plus(eyePos, times(deltaT * speed, eyeDir))
  if (t > 60) {
    // return
  }
  draw()
  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)

// draw(0)
