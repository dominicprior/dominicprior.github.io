'use strict'

let gl = document.querySelector('canvas').getContext('webgl')
gl.clearColor(0.0, 0.0, 0.3, 1.0)  // Clear to black, fully opaque
gl.clear(gl.COLOR_BUFFER_BIT)

const vs = `
attribute vec4 position;
attribute vec4 offset;
uniform float scale;
void main() {
  gl_Position = position + offset;
}`

const fs = `
precision mediump float;
void main() {
  gl_FragColor = vec4(1, 0, 0.5, 1);
}`

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
const arrays = {
    position: { numComponents: 4, data: [0, 0, 0, 1,   0, 0.9, 0, 1,   0.9, 0, 0, 1,], },
    offset: { numComponents: 4, data:  [ 0.2, 0, 0,0,   0,0    ,0,0,   0,0,    0,0,   ], },
  }
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

const uniforms = {
    scale: 0.5,
}

gl.useProgram(programInfo.program)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
twgl.setUniforms(programInfo, uniforms)
twgl.drawBufferInfo(gl, bufferInfo)
