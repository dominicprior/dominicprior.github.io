// A simulation of moving around in 3D space.  The six degrees of
// freedom give us the 12 keybindings.  Pitch and yaw can also be
// done with the mouse.

// The space contains spheres, which are rendered as circles via SVG.

// SVG gives us sub-pixel accuracy and perfectly round spheres (unlike
// spheres made out of triangle meshes).

// To widen the field of view, we use a fish-eye view based on the
// stereographic projection.

'use strict'

const winW = window.innerWidth
const winH = window.innerHeight
const minWH = Math.min(winW, winH)
let div = document.createElement('div')
document.body.append(div)
let svg = SVG().addTo('body').size(winW, winH)

const starDiam = 0.2
const boxSize = 1000
let speed = 0
let baseSpeed = 0.04
let warpFactor = 0
let strafeDist = baseSpeed

let eyePos   = [0, 0, 0]
let eyeDir   = [0, 1, 0]   // facing North
let eyeRight = [1, 0, 0]   // screen x dir
let eyeUp    = [0, 0, 1]

let prevMousePos = false

let pressed = {}

window.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    speed = 1 - speed
  }
  pressed[event.key] = true
  return false
})

window.addEventListener('keyup', (event) => {
  delete pressed[event.key];
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

function createGrid() {
  for (let j=6; j >= -6; j--) {
    for (let i=2; i >= -2; i--) {
      stars.push([2*j, 4, 2*i, rndColor()])
    }
  }
}

function createRandomCube() {
  const h = 5
  for (let i=0; i < 200; i++) {
    stars.push([rnd(-h, h), rnd(0, 2 * h),
      rnd(-h, h),
      rndColor()])
  }
}

function createLongLat() {
  for (let lat = -6; lat <= 6; lat++) {
    const a = Math.PI / 12 * lat
    for (let long = 0; long < 12; long++) {
      const b = Math.PI / 6 * long
      stars.push([
        2 * Math.cos(a) * Math.cos(b),
        2 * Math.sin(a),
        2 * Math.cos(a) * Math.sin(b),
        rndColor()])
    }
  }
}

createRandomCube()
// createLongLat()
// createGrid()

function draw(eyePos, eyeDir, eyeRight, eyeUp, scrPos, scale, clip) {
  let group = svg.group()

  for (let star of stars) {
    const pos = minus(star, eyePos)
    let z = dot(pos, eyeDir)
    const y = dot(pos, eyeUp)
    const x = dot(pos, eyeRight)
    if (z < boxSize) {
      z += 1.0 * Math.sqrt(x*x + y*y + z*z)
      if (z > starDiam) {
        group.circle(starDiam * scale / z).center(
          x / z * scale + scrPos[0],
          - y / z * scale + scrPos[1]).fill(star[3])
      }
    }
  }
  if (clip) {
    group.clipWith(clip)
  }
}

function writeInstructions() {
  svg.text(`strafe: Q, E, T, G
roll: O, P
yaw: A, D, left, right
pitch: Y, H
forward and back: W, S, up, down
faster and slower (warp: ${warpFactor}): N, M
one viewport or two: 1, 2`).
  font({size: 20, fill: '#ffddcc'})
}

let numPortals = 1

let prevT = 0
let prevView = 'no view yet'

// Update the SVG model.
// For simplicity, we throw away the current SVG model and
// regenerates it from the stars array.

function step(timestamp) {
  let t = timestamp / 1000
  let deltaT = t - prevT
  prevT = t
  eyePos = plus(eyePos, times(deltaT * speed, eyeDir))
  if (pressed.ArrowLeft || pressed.a) {  updateDirs(eyeDir, eyeRight, 0.01)  }
  if (pressed.ArrowRight || pressed.d) { updateDirs(eyeDir, eyeRight, -0.01) }
  if (pressed.y) { updateDirs(eyeDir, eyeUp, -0.01) }
  if (pressed.h) { updateDirs(eyeDir, eyeUp, 0.01)  }
  if (pressed.o) { updateDirs(eyeRight, eyeUp, 0.01) }
  if (pressed.p) { updateDirs(eyeRight, eyeUp, -0.01) }
  if (pressed.q) { eyePos = plus(eyePos, times(-strafeDist, eyeRight)) }
  if (pressed.e) { eyePos = plus(eyePos, times(strafeDist, eyeRight))  }
  if (pressed.t) { eyePos = plus(eyePos, times(strafeDist, eyeUp))  }
  if (pressed.g) { eyePos = plus(eyePos, times(-strafeDist, eyeUp)) }
  if (pressed.ArrowUp || pressed.w) { eyePos = plus(eyePos, times(strafeDist, eyeDir)) }
  if (pressed.ArrowDown || pressed.s) { eyePos = plus(eyePos, times(-strafeDist, eyeDir)) }
  if (pressed.n) { warpFactor++; strafeDist = baseSpeed * 1.04 ** warpFactor  }
  if (pressed.m) { warpFactor--; strafeDist = baseSpeed * 1.04 ** warpFactor  }
  if (pressed['1']) { numPortals = 1 }
  if (pressed['2']) { numPortals = 2 }

  let newView = _.cloneDeep([eyePos, eyeDir, eyeRight, eyeUp, warpFactor, numPortals])
  if (! _.isEqual(newView, prevView)) {
    svg.clear()
    stars.sort((a, b) => distSq(b, eyePos) - distSq(a, eyePos))

    if (numPortals === 2) {
      let circle = svg.circle(minWH).center(winW / 4, winH / 2).stroke('blue')
      svg.add(circle.clone())
      let clip = svg.clip().add(circle)
      draw(eyePos, eyeDir, eyeRight, eyeUp, [winW / 4, winH / 2], minWH / 2, clip)

      let circle2 = svg.circle(minWH).center(3 * winW / 4, winH / 2).stroke('blue')
      svg.add(circle2.clone())
      let clip2 = svg.clip().add(circle2)
      draw(eyePos, times(-1, eyeDir), times(-1, eyeRight), eyeUp,
        [3 * winW / 4, winH / 2], minWH / 2, clip2)
    }
    else {
      draw(eyePos, eyeDir, eyeRight, eyeUp, [winW / 2, winH / 2], minWH / 2, false)
    }
    writeInstructions()
  }
  prevView = newView
  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)
