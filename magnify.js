// Draws a red disc using the fragment shader.

const vs = `#version 300 es
// uniform vec2 canvasSize;
in float rad;  // in clip space
in vec2 centre;   // in clip space
in vec2 pos;  // in disc space (e.g. interpolation of things like (1,1) and (-1,1))
in vec3 col;
out vec2 fsPos;
out vec3 fsCol;
void main() {
  fsPos = pos;
  fsCol = col;
  gl_Position = vec4(centre + rad * pos, 0, 1);
}`;
const fs = `#version 300 es
precision mediump float;
//uniform vec2 canvasSize;
in vec2 fsPos;
in vec3 fsCol;
out vec4 finalCol;
void main() {
  if (length(fsPos) > 1.0)
    discard;
  finalCol = vec4(fsCol, 1);
}`;
let canvas = document.querySelector('canvas')
let gl = canvas.getContext('webgl2',
      { alpha: false,
        premultipliedAlpha: true,
       })
gl.clearColor(0.8, 0.9, 1.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)
const programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

const arrays = {
  centre: { size: 2, data: [ 0,0, ], divisor: 1},
  rad:    { size: 1, data: [ 0.2, ], divisor: 1},
  col:    { size: 3, data: [ 1,0,0, ], divisor: 1},
  pos:    { size: 2, data: [ -1,-1, 1,-1, 1,1, -1,-1, 1,1, -1,1, ] },
}
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)

const uniforms = {
  canvasSize: [ canvas.width, canvas.height ],
}
twgl.setUniforms(programInfo, uniforms)

twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES, 6, 0, 1)
