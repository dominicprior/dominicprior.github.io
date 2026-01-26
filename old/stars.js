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

const numStars = 400
const starRad = 0.01

const rnd = Math.random

let circles = [];

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

const r = 50;

let circ = draw.circle(200).center(200,100).fill('yellow').attr('foo', 6);

function step(timestamp) {
  if (timestamp < 5000) {
    let t = timestamp / 1000;
    let eyeZ = t - 1;
    div.innerHTML = "t: " + t;
    for (let c of circles) {
      const z = eyeZ + c.attr('zz')
      if (z < 0)
        c.hide()
      else {
        c.show() 
        c.radius(starRad / z * winW)
        c.cx(c.attr('xx') / z * winW + winW / 2) 
        c.cy(c.attr('yy') / z * winW + winH / 2) 
      }
    }
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
