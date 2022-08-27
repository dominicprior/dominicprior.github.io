'use strict'

let gl = document.querySelector('canvas').getContext('webgl')

const vs = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0, 1);
}`

const fs = `
precision mediump float;
void main() {
  gl_FragColor = vec4(1, 0, 0.5, 1);
}`

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
const arrays = {
    position: [ 0, 0, 0,1,   0, 0.5, 0,1,   0.7, 0, 0,1,  ],
  }
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

const uniforms = {
    time: 1.0,
}

gl.useProgram(programInfo.program)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
twgl.setUniforms(programInfo, uniforms)
twgl.drawBufferInfo(gl, bufferInfo)
