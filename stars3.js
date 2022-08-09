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
const halfWH = minWH / 2
const midX = winW / 2
const midY = winH / 2
let div = document.createElement('div')
document.body.append(div)
let svg = SVG().addTo('body').size(winW, winH)
const sqrt = Math.sqrt

const starDiam = 0.2
const starRad = starDiam / 2
let speed = 0
let baseSpeed = 2   // per second
let warpFactor = 0
let strafeSpeed = baseSpeed   // for forward, back and strafe
let rotateSpeed = 0.5   // radians per second

let eyePos   = [0, 0, 0]

// Our orientation compared to the world coordinates.
// The rows are right, forwards and up.
let dirs = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

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

// Return xyz direction corresponding to the y-downwards screen pos.
// The xyz direction is in the world frame where y is forwards and
// z is up.

function scr2dir(scrPos) {
  const X = (scrPos[0] - midX) / halfWH
  const Y = (midY - scrPos[1]) / halfWH
  return [2*X, 1 - X*X - Y*Y, 2*Y]
}

// Rotate the global dirs.

svg.node.onpointermove = (event) => {
  if (event.buttons === 1) {
    let newDir = scr2dir([event.x, event.y])
  }
  // prevMousePos = [event.x, event.y]
  return false
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

function mmult(aa, b) {
  let a = _.map(aa, normalize)
  let result = []
  for (let i = 0; i < a.length; i++) {
      result[i] = []
      for (let j = 0; j < b[0].length; j++) {
          let sum = 0
          for (let k = 0; k < a[0].length; k++) {
              sum += a[i][k] * b[k][j]
          }
          result[i][j] = sum
      }
  }
  return result
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
  for (let i=0; i < 80; i++) {
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
  stars.push([2, -2, -2, 'orange'])
  stars.push([0, -2, 0, 'red'])
  stars.push([2, -2, 0, 'yellow'])
  stars.push([2, 0, 0, 'green'])
  stars.push([2, 0, 2, 'cyan'])
  stars.push([0, 0, 2, 'blue'])
  stars.push([0, -2, 2, 'magenta'])
  stars.push([2, 0, -2, 'pink'])
  stars.push([-2, 0, -2, 'purple'])
  stars.push([-2, -2, -2, 'brown'])
  stars.push([-2, -2, 2, 'bisque'])
}

createRandomCube()

function isVisible(pos, visibilityData) {
  if (! visibilityData) {
    return true
  }
  let x = dot(visibilityData[0][0], pos)
  let z = dot(visibilityData[0][1], pos)   // z !!
  let y = dot(visibilityData[0][2], pos)
  let leftRight = visibilityData[1]
  let upperLower = visibilityData[2]
  if (z > starRad) {
    return false   // because the star is completely in the front hemisphere
  }
  if (x > starRad && leftRight === 'left' || x + starRad < 0 && leftRight === 'right') {
    return false
  }
  if (y > starRad && upperLower === 'lower' || y + starRad < 0 && upperLower === 'upper') {
    return false
  }
  return true
}

function fish(x, z) {
  return x / (z + sqrt(x*x + z*z))
}

function draw(eyePos, directions, scrPos, scale, clipShape, visibilityData) {
  // the directions are right,dir,up
  if (clipShape) {
    svg.add(clipShape.clone())
  }
  let group = svg.group()

  for (let star of stars) {
    const pos = minus(star, eyePos)
    const x = dot(pos, normalize(directions[0]))
    let z   = dot(pos, normalize(directions[1]))
    const y = dot(pos, normalize(directions[2]))   // up the screen
    let r = starRad
    if (visibilityData ? isVisible(pos, visibilityData) : z + starRad > 0) {
      if (x*x + y*y + z*z < r*r) {
        group.add(clipShape.clone().fill(star[3]).opacity(0.9))
      }
      else {
        let u = sqrt(x*x + y*y)
        let d = sqrt(x*x + y*y + z*z - r * r)
        let near = fish(u * d - z * r, z * d + u * r)
        let far  = fish(u * d + z * r, z * d - u * r)
        let mid = (near + far) / 2
        let diam = far - near
        let cx =   (u == 0 ? 0 : mid * scale * x / u) + scrPos[0]
        let cy = - (u == 0 ? 0 : mid * scale * y / u) + scrPos[1]
        if (diam > 0) {
          group.circle(diam * scale).center(cx, cy).fill(star[3])
        }
        else {
          let portal = clipShape.clone().fill(star[3])
          let black = clipShape.clone().fill('#fff')
          let bite = svg.circle(- diam * scale).center(cx, cy).fill('#000')
          let mask = svg.mask().add(black).add(bite)
          portal.maskWith(mask)
          group.add(portal)
        }
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
one viewport or two or five: 1, 2, 5
different stars: 7, 8, 9, -
zoom in and out: 3, 4`).
  font({size: 20, fill: '#ffddcc'})
}

let numPortals = 5

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
  ]).stroke('#77d')
}

// Update the SVG model.
// For simplicity, we throw away the current SVG model and
// regenerates it from the stars array.

function step(timestamp) {
  let t = timestamp / 1000
  let deltaT = t - prevT
  let strafeDist = deltaT * strafeSpeed
  let rotateAmount = deltaT * rotateSpeed
  prevT = t
  eyePos = plus(eyePos, times(deltaT * speed, dirs[0]))
  let c = Math.cos(rotateAmount)
  let s = Math.sin(rotateAmount)
  if (pressed.ArrowLeft || pressed.a)  { dirs = mmult([[c, s,0], [-s,c,0], [0,0,1]], dirs) }
  if (pressed.ArrowRight || pressed.d) { dirs = mmult([[c,-s,0], [ s,c,0], [0,0,1]], dirs) }
  if (pressed.y) { dirs = mmult([[1,0,0], [0,c, s], [0,-s,c]], dirs) }
  if (pressed.h) { dirs = mmult([[1,0,0], [0,c,-s], [0, s,c]], dirs) }
  if (pressed.o) { dirs = mmult([[c,0,-s], [0,1,0], [ s,0,c]], dirs) }
  if (pressed.p) { dirs = mmult([[c,0, s], [0,1,0], [-s,0,c]], dirs) }
  if (pressed.q) { eyePos = plus(eyePos, times(-strafeDist, dirs[0])) }
  if (pressed.e) { eyePos = plus(eyePos, times( strafeDist, dirs[0])) }
  if (pressed.t) { eyePos = plus(eyePos, times( strafeDist, dirs[2])) }
  if (pressed.g) { eyePos = plus(eyePos, times(-strafeDist, dirs[2])) }
  if (pressed.ArrowUp   || pressed.w) { eyePos = plus(eyePos, times( strafeDist, dirs[1])) }
  if (pressed.ArrowDown || pressed.s) { eyePos = plus(eyePos, times(-strafeDist, dirs[1])) }
  if (pressed.n) { warpFactor++; strafeSpeed = baseSpeed * 1.04 ** warpFactor  }
  if (pressed.m) { warpFactor--; strafeSpeed = baseSpeed * 1.04 ** warpFactor  }
  if (pressed['1']) { numPortals = 1 }
  if (pressed['2']) { numPortals = 2 }
  if (pressed['5']) { numPortals = 5 }
  if (pressed['3']) { eyePos[0] += 1e-6; zoomFactor *= 1.05  }
  if (pressed['4']) { eyePos[0] += 1e-6; zoomFactor /= 1.05  }
  if (pressed['7']) { stars = []; eyePos[0] += 1e-6; createRandomCube()    }
  if (pressed['8']) { stars = []; eyePos[0] += 1e-6; createLongLat() }
  if (pressed['9']) { stars = []; eyePos[0] += 1e-6; createGrid() }
  if (pressed['-']) { stars = []; eyePos[0] += 1e-6; createOctant() }

  let newView = _.cloneDeep([eyePos, dirs, warpFactor, numPortals])
  if (! _.isEqual(newView, prevView)) {
    svg.clear()
    stars.sort((a, b) => distSq(b, eyePos) - distSq(a, eyePos))

    if (numPortals === 2) {
      let scale = midX > 2 * midY ? midY : midX / 2
      let circle = svg.circle(2 * scale).center(midX - scale, midY).stroke('blue')
      draw(eyePos, dirs, [midX - scale, midY],
        zoomFactor * scale, circle, false)

      let circle2 = svg.circle(2 * scale).center(midX + scale, midY).stroke('blue')
      draw(eyePos,
        mmult([[-1,0,0], [0,-1,0], [0,0,1]], dirs),
        [midX + scale, midY],
        zoomFactor * scale, circle2, false)
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
      let p = halfWH - k       // the difference in x (or y) in pixels between the centre of the screen and the centre of the portal.
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
      let a = mmult([[1,0,-1], [1,-1,1], [-1,-2,-1]], dirs)
      let newDirs = mmult([[1,0,1], [0,1,0], [-1,0,1]], a)
      draw(eyePos, newDirs, [rightX, topY], zoomFactor * q, triangle, [dirs, 'right', 'upper'])

      let b2 = [rightX + sin15, botY - cos15]
      let g2 = [rightX - cos15, botY + sin15]
      let r2 = [midX + halfWH, midY + halfWH]
      let t2 = trianglePath(b2, g2, r2, arcRad)
      let a2 = mmult([[-1,0,-1], [1,-1,-1], [-1,-2,1]], dirs)
      let d2 = mmult([[-1,0,1], [0,1,0], [-1,0,-1]], a2)
      draw(eyePos, d2, [rightX, botY], zoomFactor * q, t2, [dirs, 'right', 'lower'])

      let b3 = [leftX + cos15, botY + sin15]
      let g3 = [leftX - sin15, botY - cos15]
      let r3 = [midX - halfWH, midY + halfWH]
      let t3 = trianglePath(b3, g3, r3, arcRad)
      let a3 = mmult([[1,0,-1], [-1,-1,-1], [1,-2,1]], dirs)
      let d3 = mmult([[1,0,-1], [0,1,0], [-1,0,-1]], a3)
      draw(eyePos, d3, [leftX, botY], zoomFactor * q, t3, [dirs, 'left', 'lower'])

      let b4 = [leftX - sin15, topY + cos15]
      let g4 = [leftX + cos15, topY - sin15]
      let r4 = [midX - halfWH, midY - halfWH]
      let t4 = trianglePath(b4, g4, r4, arcRad)
      let a4 = mmult([[1,0,1], [-1,-1,1], [1,-2,-1]], dirs)
      let d4 = mmult([[1,0,-1], [0,1,0], [1,0,1]], a4)
      draw(eyePos, d4, [leftX, topY], zoomFactor * q, t4, [dirs, 'left', 'upper'])

      let circle = svg.circle(minWH).center(midX, midY).stroke('#77d')
      draw(eyePos, dirs, [midX, midY], zoomFactor * halfWH, circle, false)
    }
    else {
      const amplitude = 0.08
      const omega = 2
      let oscillatingPos = plus(plus(eyePos,
        times(amplitude * Math.sin(omega * t), dirs[0])),
        times(amplitude * Math.cos(omega * t), dirs[2]))
      draw(eyePos, dirs, [midX, midY], zoomFactor * halfWH, false, false)
    }
    //writeInstructions()
  }
  prevView = newView
  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)
