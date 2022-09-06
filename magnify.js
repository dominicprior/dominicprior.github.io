// Draws a red disc using the fragment shader.

const vs = `#version 300 es
uniform float canvasSize;   // assuming square for now
in float rad;  // in clip space
in vec2 centre;   // in clip space
in vec2 coord;  // in *disc* space (e.g. interpolation of things like (1,1) and (-1,1))
in vec3 col;
out float r;
out vec2 pos;
out vec2 c;   // centre, in canvas pixel coords
out vec3 fsCol;
void main() {
  r = rad * canvasSize * 0.5;
  vec2 fragPos = centre + rad * coord;   // in clip space
  pos = (fragPos + 1.0) * canvasSize * 0.5;  // in canvas pixel coords
  c = (centre + 1.0) * canvasSize * 0.5;  // in canvas pixel coords
  fsCol = col;
  gl_Position = vec4(fragPos, 0, 1);   // in clip space
}`;
const fs = `#version 300 es
precision mediump float;
//uniform vec2 canvasSize;
in float r;   // in canvas pixel coords
in vec2 pos;  // in canvas pixel coords
in vec2 c;    // centre, in canvas pixel coords
in vec3 fsCol;
out vec4 finalCol;
void main() {
  if (length(pos - c) > r) {
    discard;
  }
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
  coord:  { size: 2, data: [ -1,-1, 1,-1, 1,1, -1,-1, 1,1, -1,1, ] },
}
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)

const uniforms = {
  canvasSize: canvas.width,
}
twgl.setUniforms(programInfo, uniforms)

twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES, 6, 0, 1)
