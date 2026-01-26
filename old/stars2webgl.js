// An animation of some triangles coming towards us.

// The viewpoint moves along the z-axis towards the stars.

'use strict'

const numStars = 50
const starDiam = 15
const boxSize = 1000
let speed = 15
let eyeZ = 0

let gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(0.0, 0.0, 0.3, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const vs = `#version 300 es
in vec3 pos;
in vec2 offset;
uniform float eyeZ;
void main() {
  float z = pos.z - eyeZ;
  gl_Position = vec4(pos.x / z + offset.x, pos.y / z + offset.y, 0, 1);
}`

const fs = `#version 300 es
precision mediump float;
out vec4 colour;
void main() {
  colour = vec4(1, 0, 0.5, 1);
}`

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

let stars = []

addNewStars()

let offsets = []
const numInstances = 100
for (let i=0; i < numInstances / 20; i++) {
  for (let j=0; j < 20; j++) {
    offsets.push(j / 200, i / 200)
  }
}

let arrays = {
  pos: { numComponents: 3, data: stars, },
  offset: { numComponents: 2, data: offsets, },
}
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)

const loc = gl.getAttribLocation(programInfo.program, 'offset')
gl.vertexAttribDivisor(loc, 1)

function step(t) {
  t /= 1000
  if (t > 6) { return }
  eyeZ = speed * t
  let uniforms = { eyeZ: eyeZ, }
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES,
    numStars * 3, 0, numInstances)
  window.requestAnimationFrame(step)
}

window.requestAnimationFrame(step)


function addNewStars() {
  const h = boxSize / 2
  for (let i=0; i < numStars; i++) {
    const x = rnd(-h, h)
    const y = rnd(-h, h)
    const z = rnd(2*h, 3*h)
    stars.push(x, y, z)
    stars.push(x + starDiam, y, z)
    stars.push(x, y + starDiam, z)
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
