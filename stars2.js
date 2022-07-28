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
let draw = SVG().addTo('body').size(winW, winH)

const numStars = 240
const starDiam = 10
const boxSize = 100
let furthestStars = 0
let speed = 15

let eyeZ = 0

function rnd(a, b) {
  return a + (b - a) * Math.random()
}

function rndColor() {
  return new SVG.Color({ r: rnd(100, 255),
                         g: rnd(100, 255),
                         b: rnd(100, 255) })
}

let stars = []

// Add new stars that have potentially come into view and
// discard stars that are now behind us.  Also sort them
// by distance so SVG makes the nearer stars occlude the
// further stars.

function addNewStars() {
  stars = stars.filter(star => star[2] > 0)
  while (furthestStars < eyeZ + boxSize) {
    const h = boxSize / 2
    for (let i=0; i < numStars / 2; i++) {
      const star = [rnd(-h, h), rnd(-h, h),
                    rnd(furthestStars, furthestStars + h),
                    rndColor()]
      stars.push(star)
    }
    furthestStars += h
  }
  stars.sort((a, b) => hypotSq(b) - hypotSq(a))
}

function hypotSq(a) {
  return a[0] * a[0] + a[1] * a[1] + a[2] * a[2]
}

draw.circle(200).center(200,100).fill('yellow').attr('foo', 6)

function step(timestamp) {
  let t = timestamp / 1000
  if (t > 60) {
    return
  }
  eyeZ = speed * t
  addNewStars()
  draw.clear()
  for (let star of stars) {
    const z = star[2] - eyeZ
    if (z > 0 && z < boxSize) {
      draw.circle(starDiam * boxSize / z).center(
        star[0] / z * winW + winW / 2,
        star[1] / z * winW + winH / 2).fill(star[3])
    }
  }
  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)
