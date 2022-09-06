// Draws a red disc using the fragment shader.
let canvas = document.querySelector('canvas')
let gl = canvas.getContext('webgl2',
      { alpha: false,
        // premultipliedAlpha: true,
       })
gl.clearColor(0,0,0.4, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)
//------
let vs = `#version 300 es
in vec2 pos;
uniform float foo;
void main() {
  gl_Position = vec4(pos, 0, 1);
}`
let fs = `#version 300 es
precision mediump float;
out vec4 finalCol;
void main() {
  finalCol = vec4(gl_FragCoord.x * 0.002, gl_FragCoord.y * 0.002, 0.5, 1);
}`
let pi = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(pi.program)
let arrays = { pos: { size: 2, data: [ 0, 0,   0, 0.9,   0.9, 0,], },  }
let bi = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, pi, bi)
twgl.setUniforms(pi, {foo: 1})
twgl.drawBufferInfo(gl, bi)
//------
/*
let vs = `#version 300 es
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
let fs = `#version 300 es
precision mediump float;
//uniform vec2 canvasSize;
in float r;   // in canvas pixel coords
in vec2 pos;  // in canvas pixel coords
in vec2 c;    // centre, in canvas pixel coords
in vec3 fsCol;
out vec4 finalCol;

float f(float a, float b, float c) {
  return c == a ? 0.0 : (b - a) / (c - a);
}

void main() {
  vec2 d = abs(pos - c);
  if (d.y > d.x)
    d = d.yx;
  vec2 near = d - 0.5;
  vec2 far = d + 0.5;
  float nearSq = dot(near, near);
  float radSq = r * r;
  if (radSq < nearSq) {
    discard;
    return;
  }
  float farSq = dot(far, far);
  if (radSq > farSq) {
    finalCol = vec4(fsCol, 1);
    return;
  }
  vec2 topLeft = vec2(near.x, far.y);
  float topLeftSq = dot(topLeft, topLeft);
  vec2 botRight = vec2(near.y, far.x);
  float botRightSq = dot(botRight, botRight);
  float k = f(nearSq, radSq, botRightSq);
  if (radSq < topLeftSq) {
    float h = f(nearSq, radSq, topLeftSq);
    finalCol = vec4(fsCol, pow((h * k * 0.5), 0.4545));
    return;
  }
  float k2 = f(topLeftSq, radSq, farSq);
  if (radSq < botRightSq) {
    finalCol = vec4(fsCol, pow(((k + k2) * 0.5), 0.4545));
    return;
  }
  float h2 = f(botRightSq, radSq, farSq);
  float opacity = 1.0 - (1.0 - h2) * (1.0 - k2) * 0.5;
  finalCol = vec4(fsCol, pow(opacity, 0.4545));
}`;
let programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

let arrays = {
  centre: { size: 2, data: [ -0.95, 0.95, ], divisor: 1},
  rad:    { size: 1, data: [ 0.05, ], divisor: 1},
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
*/
//---------------
/*
let pixels = new Uint8Array(400)  // unrelated example of calling readPixels
gl.readPixels(0, 190, 10, 10, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

vs = `#version 300 es
in vec2 pos;
in vec2 texcoord;
out vec2 v_texCoord;
void main() {
  v_texCoord = texcoord;
  gl_Position = vec4(pos, 0.0, 1.0);
}`;
fs = `#version 300 es
precision mediump float;
in vec2 v_texCoord;
out vec4 finalColour;
uniform sampler2D s;
void main() {
  finalColour = vec4(1.0, 1.0, 0.0, 1.0); //texture(s, v_texCoord);
}`;

programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

arrays = {
  pos:      { size: 2, data: [ -0.8,-0.8, 0.8,-0.8, 0.8,0.8, -0.8,-0.8, 0.8,0.8, -0.8,0.8, ] },
  texcoord: { size: 2, data: [ 0,0, 1,0, 1,1, 0,0, 1,1, 0,1, ] },
}
bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)

//twgl.createTexture(gl, {
//  mag: gl.NEAREST,
//  min: gl.LINEAR,
//  src: pixels,
//  width: 10
//})

twgl.drawBufferInfo(gl, bufferInfo)
*/
//----------------
vs = `#version 300 es
in vec2 pos;
uniform float bar;
void main() {
  gl_Position = vec4(pos, 0, 1);
}`
fs = `#version 300 es
precision mediump float;
out vec4 finalCol;
void main() {
  finalCol = vec4(1, gl_FragCoord.y * 0.002, 0.5, 1);
}`
pi = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(pi.program)
arrays = { pos: { size: 2, data: [ 0, 0,   0, -1,   -1, 0,], },  }
bi = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, pi, bi)
twgl.setUniforms(pi, {bar: 2})
twgl.drawBufferInfo(gl, bi)
