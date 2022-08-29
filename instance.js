// A minimal example of WebGL instancing.
// Derived from https://stackoverflow.com/questions/46059914/what-does-instancing-do-in-webgl

const vs = `#version 300 es
in vec2 pos;
in vec2 offset;
void main() {
    gl_PointSize = 20.0;
    gl_Position = vec4(pos + offset, 0.0, 1.0);
}`;

const fs = `#version 300 es
#pragma vscode_glsllint_stage: frag
precision mediump float;
out vec4 fragColor;
void main() {
    fragColor = vec4(1.0, 0.4, 0.6, 1.0);
}`;

let gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(0.0, 0.0, 0.3, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

let arrays = {
  pos: { numComponents: 2, data:  [0, 0, 0.5, 0.5 ], },
  offset: { numComponents: 2, data:  [0, 0, 0.2, -0.2 ], },
}
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)

const loc = gl.getAttribLocation(programInfo.program, 'offset')
gl.vertexAttribDivisor(loc, 1)

const count = 2
const numInstances = 2
twgl.drawBufferInfo(gl, bufferInfo, gl.POINTS, count, 0, numInstances)
