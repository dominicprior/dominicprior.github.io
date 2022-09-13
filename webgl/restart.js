// Example of restarting a triangle fan.
'use strict'
const gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(0.8, 0.9, 1, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

const vs = `#version 300 es
in vec2 pos;

void main() {
    gl_Position = vec4(pos, 0, 1);
}`
const fs = `#version 300 es
precision mediump float;
out vec4 finalCol;
void main() {
    finalCol = vec4(1,0,0,1);
}`
const pi = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(pi.program)
let arrays = {
    pos: { numComponents: 2, data:  [ 0.5,0, 1,0, 1,1,  0,0, 0,1, -1,1, ], },
    indices: [0,1,2, 65535, 3,4,5 ],
}

const bi = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, pi, bi)
twgl.drawBufferInfo(gl, bi, gl.TRIANGLE_FAN)
