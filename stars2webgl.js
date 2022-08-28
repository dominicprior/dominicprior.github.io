// An animation of some stars coming towards us.

// The viewpoint moves along the z-axis towards the stars.

'use strict'

const numStars = 240
const starDiam = 15
const boxSize = 1000
let furthestStars = 0
let speed = 15
let eyeZ = 0

let gl = document.querySelector('canvas').getContext('webgl')
gl.clearColor(0.0, 0.0, 0.3, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const vs = `
attribute vec4 position;
void main() {
  gl_Position = position;
}`

const fs = `
precision mediump float;
void main() {
  gl_FragColor = vec4(1, 0, 0.5, 1);
}`

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

let stars = []

addNewStars()

let arrays = {
  position: { numComponents: 4, data: stars, },
}
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)


function step(timestamp) {
  let t = timestamp / 1000
  if (t > 6) {
    return
  }
  eyeZ = speed * t
  let uniforms = { eyeZ: eyeZ, }
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo)
  // window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)



function rnd(a, b) {
  return a + (b - a) * Math.random()
}
  
function rndColor() {
  return new SVG.Color({ r: rnd(100, 255),
                         g: rnd(100, 255),
                         b: rnd(100, 255) })
}

function addNewStars() {
  stars = [ 0, 0, 0, 1,   0, 0.9, 0, 1,   0.9, 0, 0, 1,]
  return
  while (furthestStars < eyeZ + boxSize) {
    const h = boxSize / 2
    for (let i=0; i < numStars / 2; i++) {
      stars.push(rnd(-h, h),
                 rnd(-h, h),
                 rnd(furthestStars, furthestStars + h),
                 1)
    }
    furthestStars += h
  }
}
