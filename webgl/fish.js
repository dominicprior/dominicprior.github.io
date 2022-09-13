// Draws a point corresponding to the fish-eye view of
// radius 0.4 sphere that is due East.
'use strict'
const gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(0.8, 0.9, 1, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

const vs = `#version 300 es
in vec3 pos;
in float n;
uniform float N;
#define PI 3.141592653589793

float fish(vec2 v) {
    float len = length(v);
    return v.x / (v.y + len);
}

void main() {
    gl_PointSize = 5.0;
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
    float x = q * pos.x / xz;
    float y = q * pos.z / xz;
    float i = float(int(n) / 3);
    float j = float(int(n) % 3);
    if (j != 2.0) {
        float angle = 2.0 * PI * (n + j) / N;
        x += discRad * cos(angle);
        y += discRad * sin(angle);
    }
    vec2 centre = vec2(x, y);
    gl_Position = vec4(centre, 0, 1);
}`
const fs = `#version 300 es
precision mediump float;
out vec4 finalCol;
void main() {
    finalCol = vec4(1,0,0,1);
}`
const pi = twgl.createProgramInfo(gl, [vs, fs])
const N = 4
const RESTART = 65535
gl.useProgram(pi.program)
let arrays = {
    pos: { numComponents: 3, data:  [ 1, 1, 0, ], },
    n: {numComponents: 1, data: [ ...Array(3 * N).keys()] },
}

const bi = twgl.createBufferInfoFromArrays(gl, arrays)

const uniforms = { N: N, };

twgl.setBuffersAndAttributes(gl, pi, bi)

const loc = gl.getAttribLocation(pi.program, 'n')
gl.vertexAttribDivisor(loc, 1)

twgl.drawBufferInfo(gl, bi, gl.POINTS, 1, 0, 3*N)
