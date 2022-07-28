// An animation of some stars (spheres) moving away from us.

// It relies on SVG using sub-pixel accuracy.

// The spheres have random colours and random positions
// inside a cube.

// The positions are stored in the custom SVG attributes, xx, yy and zz.

// See https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

'use strict'

const winW  = window.innerWidth
const winH = window.innerHeight
let div = document.createElement('div')
document.body.append(div)
let draw = SVG().addTo('body').size(winW, winH)

const numStars = 40
const starRad = 1
const boxSize = 100
let furthestStars = 0
let speed = 5

let eyeZ = 0

function rnd(a, b) {
  return a + (b - a) * Math.random
}

function rndColor() {
  return new SVG.Color({ r: 150 + 100 * rnd(),
                         g: 150 + 100 * rnd(),
                         b: 150 + 100 * rnd() })
}

let stars = []

function addNewStars() {
  stars = stars.filter(star => star[2] < 0)
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
  stars.sort((a, b) => hypotSq(a) - hypotSq(b))
}

function hypotSq(a) {
  return a[0] * a[0] + a[1] * a[1] + a[2] * a[2]
}

for (let i=0; i < numStars; i++) {
  let circ = draw.circle(0).
  attr('xx', 2*rnd()-1).
  attr('yy', 2*rnd()-1).
  attr('zz', 2*rnd()-1).
  fill(new SVG.Color({ r: 150 + 100 * rnd(),
                       g: 150 + 100 * rnd(),
                       b: 150 + 100 * rnd() }))
  circles.push(circ)
}

let circ = draw.circle(200).center(200,100).fill('yellow').attr('foo', 6)

function step(timestamp) {
  let t = timestamp / 1000
  if (t > 4) {
    return
  }
  div.innerHTML = "t: " + t
  let eyeZ = speed * t
  for (let circ of circles) {
    const z = circ[2] - eyeZ
    if (z > 0) {
      draw.circle(starDiam / z).center(
        circ[0] / z * winW + winW / 2,
        circ[1] / z * winW + winH / 2).fill(circ[3])
    }
  }
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
