'use strict'

document.querySelector('p').innerHTML = `

Anti-aliased discs. <p>

The anti-aliasing calculates (using the WebGL fragment shader)
the proportion of each pixel covered by the disk and sets the
alpha value accordingly. <p>

In other words, it doesn't do super-sampling. Nor does it use 
<a href="https://en.wikipedia.org/wiki/Spatial_anti-aliasing">
the more sophisticated anti-aliasing methods</a>,
which may explain the discs looking slightly square shaped. <p>

For gamma correction, the alpha values are simply raised to the power of 0.4545
as we go along.  (It would have been more correct to do the gamma correction
only after everything has been drawn).
`

let canvas = document.querySelector('canvas')
let gl = canvas.getContext('webgl2',
      { //alpha: false,
        //premultipliedAlpha: true,
       })
gl.clearColor(0,0,0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)
gl.enable(gl.BLEND)
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

// ------ Draw the discs ------

let vs = `#version 300 es
uniform float canvasSize;   // assuming square for now
in float rad;   // in clip space
in vec2 centre; // in clip space
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
  c   = (centre  + 1.0) * canvasSize * 0.5;  // in canvas pixel coords
  fsCol = col;
  gl_Position = vec4(fragPos, 0, 1);     // in clip space
}`;
let fs = `#version 300 es
precision mediump float;
in float r;   // in canvas pixel coords
in vec2 pos;  // in canvas pixel coords
in vec2 c;    // centre, in canvas pixel coords
in vec3 fsCol;
out vec4 finalCol;

float f(float a, float b, float c) {
  return c == a ? 0.0 : (b - a) / (c - a);
}

// The main function sets the alpha value according to how much
// of the current pixel is covered by the disc.

// The are calculations are approximations that avoid doing any
// square roots.

void main() {
  vec2 d = abs(pos - c);  // to reduce the cases to one quadrant
  if (d.y > d.x)
    d = d.yx;             // to reduce down to one octant
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
    finalCol = vec4(fsCol, 1);  // completely inside
    return;
  }

  // The remaining cases depend on which corners of the pixel
  // are inside the disc.

  vec2 topLeft = vec2(near.x, far.y);
  float topLeftSq = dot(topLeft, topLeft);
  vec2 botRight = vec2(near.y, far.x);
  float botRightSq = dot(botRight, botRight);
  float k = f(nearSq, radSq, botRightSq);
  if (radSq < topLeftSq) {
    // then the intersection is a triangle, where k is the width and h is the height.
    float h = f(nearSq, radSq, topLeftSq);
    finalCol = vec4(fsCol, pow((h * k * 0.5), 0.4545));
    return;
  }
  float k2 = f(topLeftSq, radSq, farSq);
  if (radSq < botRightSq) {
    // then the intersection is a trapezium.
    finalCol = vec4(fsCol, pow(((k + k2) * 0.5), 0.4545));
    return;
  }
  // else the intersection is the whole pixel minus a triangle.
  float h2 = f(botRightSq, radSq, farSq);
  float opacity = 1.0 - (1.0 - h2) * (1.0 - k2) * 0.5;
  finalCol = vec4(fsCol, pow(opacity, 0.4545));
}`;
let programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

let arrays = {
  centre: { size: 2, data: [ -0.95, 0.95,  -0.91, 0.92, ], divisor: 1},
  rad:    { size: 1, data: [ 0.0394,        0.038,      ], divisor: 1},
  col:    { size: 3, data: [ 0,1,1,         1,1,0,      ], divisor: 1},
  coord:  { size: 2, data: [ -1,-1, 1,-1, 1,1, -1,-1, 1,1, -1,1, ] },
}
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
const uniforms = {
  canvasSize: canvas.width,
}
twgl.setUniforms(programInfo, uniforms)
twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES, 6, 0, 2)

// ------ Draw the magnified view ------

const width = 20
const height = 20
let pixels = new Uint8Array(4 * width * height)
gl.readPixels(0, canvas.height - height, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

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
  finalColour = texture(s, v_texCoord);
}`;

programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

const left = -0.7
const bot = -0.7
const right = 0.7
const topp = 0.7
arrays = {
  pos:      { size: 2, data: [ left,bot, right,bot, right,topp, left,bot, right,topp, left,topp, ], divisor: 0 },
  texcoord: { size: 2, data: [ 0,0, 1,0, 1,1, 0,0, 1,1, 0,1, ], divisor: 0 },
}
bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)

twgl.createTexture(gl, {
  mag: gl.NEAREST,
  min: gl.LINEAR,
  src: pixels,
  width: 20
})

twgl.drawBufferInfo(gl, bufferInfo)
