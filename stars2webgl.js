// An animation of some triangles coming towards us.

// The viewpoint moves along the z-axis towards the stars.

'use strict'

const numStars = 240
const starDiam = 15
const boxSize = 1000
let speed = 15
let eyeZ = 0

let gl = document.querySelector('canvas').getContext('webgl')
gl.clearColor(0.0, 0.0, 0.3, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const vs = `
attribute vec4 pos;
uniform float eyeZ;
void main() {
  float z = pos.z - eyeZ;
  gl_Position = vec4(pos.x / z, pos.y / z, 0, 1);
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
  pos: { numComponents: 4, data: stars, },
}
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)


function step(t) {
  t /= 1000
  if (t > 6) { return }
  eyeZ = speed * t
  let uniforms = { eyeZ: eyeZ, }
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo)
  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)


function addNewStars() {
  const h = boxSize / 2
  for (let i=0; i < numStars; i++) {
    const x = rnd(-h, h)
    const y = rnd(-h, h)
    const z = rnd(0, 2*h)
    stars.push(x, y, z, 1)
    stars.push(x + starDiam, y, z, 1)
    stars.push(x, y + starDiam, z, 1)
  }
}

function rnd(a, b) {
  return a + (b - a) * Math.random()
}
  
function rndColor() {
  return new SVG.Color({ r: rnd(100, 255),
                         g: rnd(100, 255),
                         b: rnd(100, 255) })
}
