// A minimal example of WebGL instancing.
// Derived from https://stackoverflow.com/questions/46059914/what-does-instancing-do-in-webgl

const vs = `#version 300 es
in vec2 pos;
in vec2 offset;
in vec3 col;
out vec3 fragCol;
void main() {
    fragCol = col;
    gl_PointSize = 10.0;
    gl_Position = vec4(pos + offset, 0.0, 1.0);
}`;

const fs = `#version 300 es
#pragma vscode_glsllint_stage: frag
precision mediump float;
in vec3 fragCol;
out vec4 fragColor;
void main() {
    fragColor = vec4(fragCol, 1.0);
}`;

let gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(0.6, 0.8, 0.9, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

let arrays = {
  pos: { numComponents: 2, data:  [ -0.5, -0.5, 0, 0, 0.5, 0.5, ], },
  offset: { numComponents: 2, data:  [ -0.2, 0.2, -0.4, 0.4, 0, 0, 0.2, -0.2, 0.4, -0.4, ], },
  col: { numComponents: 3, data:  [1,0,0, 0,0,1, ], },
}
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)

const loc = gl.getAttribLocation(programInfo.program, 'pos')
gl.vertexAttribDivisor(loc, 0)

const loc2 = gl.getAttribLocation(programInfo.program, 'offset')
gl.vertexAttribDivisor(loc2, 1)

const loc3 = gl.getAttribLocation(programInfo.program, 'col')
gl.vertexAttribDivisor(loc3, 2)

const count = 3
const numInstances = 5
twgl.drawBufferInfo(gl, bufferInfo, gl.POINTS, count, 0, numInstances)
