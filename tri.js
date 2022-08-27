'use strict'

let gl = document.querySelector('canvas').getContext('webgl')
gl.clearColor(0.0, 0.0, 0.3, 1.0)  // Clear to black, fully opaque
gl.clear(gl.COLOR_BUFFER_BIT)

const vs = `
attribute vec2 position;
attribute vec2 offset;
uniform float scale;
void main() {
  gl_Position = vec4(scale * (position + offset), 0, 1);
}`

const fs = `
precision mediump float;
void main() {
  gl_FragColor = vec4(1, 0, 0.5, 1);
}`

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
let arrays = {
    position: { numComponents: 2, data: [ 0, 0,    0, 0.9,   0.9, 0,], },
    offset:   { numComponents: 2, data: [ 0.2, 0,  0,0,      0,0,   ], },
  }
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

gl.useProgram(programInfo.program)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)

let uniforms = {
    scale: 0.5,
}
twgl.setUniforms(programInfo, uniforms)
twgl.drawBufferInfo(gl, bufferInfo)

arrays.position.data[0] = 0.4
bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
uniforms.scale = -1

twgl.setUniforms(programInfo, uniforms)
twgl.drawBufferInfo(gl, bufferInfo)
