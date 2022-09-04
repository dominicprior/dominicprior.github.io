// Draws a point corresponding to the fish-eye view of
// radius 0.4 sphere that is due East.
'use strict'
const gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(0.8, 0.9, 1, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

const vs = `#version 300 es
in vec3 pos;

float fish(vec2 v) {
    float len = length(v);
    return v.x / (v.y + len);
}

void main() {
    gl_PointSize = 40.0;
    float h2 = length(pos);
    float xz = length(pos.xz);
    float r = 0.4;
    float k = sqrt(h2 - r*r);
    vec2 a = vec2(xz * k - pos.y * r, pos.y * k - xz * r);
    vec2 b = vec2(xz * k + pos.y * r, pos.y * k + xz * r);
    float af = fish(a);
    float bf = fish(b);
    float discRad = (af - bf) * 0.5;
    float q = (af + bf) * 0.5;
    vec2 scrPos = vec2(q * pos.x / xz, q * pos.z / xz);
    gl_Position = vec4(scrPos, 0, 1);
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
    pos: { numComponents: 3, data:  [ 1, 0, 0, ], },  // due east
}

const bi = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, pi, bi)
twgl.drawBufferInfo(gl, bi, gl.POINTS)
