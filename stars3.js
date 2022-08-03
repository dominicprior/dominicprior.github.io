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
const midX = winW / 2
const midY = winH / 2
let div = document.createElement('div')
document.body.append(div)
let svg = SVG().addTo('body').size(winW, winH)
const sqrt = Math.sqrt

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

function normalize(u) {
  return times(1 / sqrt(hypotSq(u)), u)
}

function cross(u, v) {
  return [
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0]
  ]
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

function createOctant() {
  stars.push([2, -2, 2, 'white'])
  stars.push([0, -2, 0, 'red'])
  stars.push([2, -2, 0, 'yellow'])
  stars.push([2, 0, 0, 'green'])
  stars.push([2, 0, 2, 'cyan'])
  stars.push([0, 0, 2, 'blue'])
  stars.push([0, -2, 2, 'magenta'])
}

createRandomCube()

let fishEye = true

function draw(eyePos, eyeDir, eyeRight, eyeUp, scrPos, scale, clipShape) {
  if (clipShape) {
    svg.add(clipShape.clone())
  }
  eyeDir   = normalize(eyeDir)
  eyeRight = normalize(eyeRight)
  eyeUp    = normalize(eyeUp)
  let group = svg.group()

  for (let star of stars) {
    const pos = minus(star, eyePos)
    let z = dot(pos, eyeDir)
    const y = dot(pos, eyeUp)
    const x = dot(pos, eyeRight)
    if (z < boxSize) {
      if (fishEye) {
        z += 1.0 * sqrt(x*x + y*y + z*z)
      }
      if (z > starDiam) {
        group.circle(starDiam * scale / z).center(
            x / z * scale + scrPos[0],
          - y / z * scale + scrPos[1]).fill(star[3])
      }
    }
  }
  if (clipShape) {
    let clip = svg.clip().add(clipShape)
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
one viewport or two or five: 1, 2, 0
different stars: 7, 8, 9, -
fisheye, not fisheye: 5, 6
zoom in and out: 3, 4`).
  font({size: 20, fill: '#ffddcc'})
}

let numPortals = 1

// The zoom factor compared to the default scaling where a value of 1
// (after the fish-eye adjustment) corresponds to half the portal width.
// i.e. where a portal has a hemi-sphere view.
let zoomFactor = 1

let prevT = 0
let prevView = 'no view yet'

function trianglePath(u, v, w, rad) {
  return svg.path(['M', u,
  'A', rad, rad, 0, 0, 0, v,
  'A', rad, rad, 0, 0, 0, w,
  'A', rad, rad, 0, 0, 0, u
  ]).stroke('blue')
}

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
  if (pressed['0']) { numPortals = 5 }
  if (pressed['3']) { eyePos[0] += 1e-6; zoomFactor *= 1.05  }
  if (pressed['4']) { eyePos[0] += 1e-6; zoomFactor /= 1.05  }
  if (pressed['5']) { eyePos[0] += 1e-6; fishEye = true  }
  if (pressed['6']) { eyePos[0] += 1e-6; fishEye = false }
  if (pressed['7']) { stars = []; eyePos[0] += 1e-6; createRandomCube()    }
  if (pressed['8']) { stars = []; eyePos[0] += 1e-6; createLongLat() }
  if (pressed['9']) { stars = []; eyePos[0] += 1e-6; createGrid() }
  if (pressed['-']) { stars = []; eyePos[0] += 1e-6; createOctant() }

  let newView = _.cloneDeep([eyePos, eyeDir, eyeRight, eyeUp, warpFactor, numPortals])
  if (! _.isEqual(newView, prevView)) {
    svg.clear()
    stars.sort((a, b) => distSq(b, eyePos) - distSq(a, eyePos))

    if (numPortals === 2) {
      let scale = midX > 2 * midY ? midY : midX / 2
      let circle = svg.circle(2 * scale).center(midX - scale, midY).stroke('blue')
      draw(eyePos, eyeDir, eyeRight, eyeUp, [midX - scale, midY],
        zoomFactor * scale, circle)

      let circle2 = svg.circle(2 * scale).center(midX + scale, midY).stroke('blue')
      draw(eyePos, times(-1, eyeDir), times(-1, eyeRight), eyeUp, [midX + scale, midY],
        zoomFactor * scale, circle2)
    }
    else if (numPortals === 5) {
      /*
      1. Calculate where the red [0, -2, 0] and cyan [2, 0, 2] stars will land.
      2. Move and scale so the cyan star matches in both portals
         and the red star is the same height as the blue star.
      3. Calculate the radius of the three arcs.
      4. Create the path with the three arcs and use it as the clip.
      */

      let denom = 1 / (1 + sqrt(3)) + 1 / (2 + sqrt(6))   // red x minus cyan x in pre-screen-scaling units
      let numer = minWH * (2 - sqrt(2)) / 4   // red x minus cyan x in pixels.  The portal has to tuck in the corner.
      let q = numer / denom    // new name for the scale factor for converting the small portals to pixels.
      let k = q / (1 + sqrt(3))   // the difference in x (or y) in pixels between a portal centre and a portal extreme such as the red star.
      let p = minWH / 2 - k       // the difference in x (or y) in pixels between the centre of the screen and the centre of the portal.
      let leftX  = midX - p     // for a left-hand portal
      let rightX = midX + p     // for a right-hand portal
      let topY   = midY - p     // for a top portal.  y-coord downwards.
      let botY   = midY + p     // for a bottom portal.  y-coord downwards.

      let redPos = [rightX + k, topY - k]

      let hg = sqrt(3) / 2 / (1 + sqrt(3))
      let wc = 1 / (2 + sqrt(6))
      let wh = 0.5 / (1 + sqrt(3))
      let hc = wc - wh
      let alpha = 2 * Math.atan(hg / hc)
      let arcRad = hg / Math.sin(alpha) * q * sqrt(2)
      let redDist = k * sqrt(2)  // in pixels from the centre of the portal
      let sin15 = redDist * Math.sin(Math.PI / 12)
      let cos15 = redDist * Math.cos(Math.PI / 12)

      let bluePos  = [rightX - cos15, topY - sin15]
      let greenPos = [rightX + sin15, topY + cos15]
      let triangle = trianglePath(bluePos, greenPos, redPos, arcRad)

      const upRight = plus(eyeUp, eyeRight)
      const newEyeDir = normalize(minus(upRight, eyeDir))
      const newEyeUp  = normalize(times(-1, plus(upRight, times(2, eyeDir))))
      const newEyeRight = cross(newEyeDir, newEyeUp)

      draw(eyePos, newEyeDir, plus(newEyeRight, newEyeUp), minus(newEyeUp, newEyeRight),
        [rightX, topY], zoomFactor * q, triangle)

      let circle = svg.circle(minWH).center(midX, midY).stroke('blue')
      draw(eyePos, eyeDir, eyeRight, eyeUp, [midX, midY],
        zoomFactor * minWH / 2, circle)
    }
    else {
      draw(eyePos, eyeDir, eyeRight, eyeUp, [midX, midY],
        zoomFactor * minWH / 2, false)
    }
    writeInstructions()
  }
  prevView = newView
  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)
