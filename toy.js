// An example of using the gl_FragCoord.
'use strict'
let gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(0.0, 0.0, 0.3, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const vs = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0, 1);
}`
const fs = `#version 300 es
precision mediump float;
out vec4 finalCol;
void main() {
  if (gl_FragCoord.x > 300.0)
    discard;
  finalCol = vec4(gl_FragCoord.x * 0.002, gl_FragCoord.y * 0.002, 0.5, 1);
}`

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

let arrays = {
    position: { numComponents: 2, data: [ 0, 0,    0, 0.9,   0.9, 0,], },
  }
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
twgl.drawBufferInfo(gl, bufferInfo)
