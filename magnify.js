// Draws a red disc using the fragment shader.
let canvas = document.querySelector('canvas')
let gl = canvas.getContext('webgl2',
      { alpha: false,
        // premultipliedAlpha: true,
       })
gl.clearColor(0,0,0.4, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)
//------
/*
vs = `#version 300 es
in vec2 pos;
uniform float foo;
void main() {
  gl_Position = vec4(pos, 0, 1);
}`
fs = `#version 300 es
precision mediump float;
out vec4 finalCol;
void main() {
  finalCol = vec4(gl_FragCoord.x * 0.002, gl_FragCoord.y * 0.002, 0.5, 1);
}`
let pi = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(pi.program)
arrays = { pos: { size: 2, data: [ 0, 0,   0, 0.9,   0.9, 0,], },  }
bi = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, pi, bi)
twgl.setUniforms(pi, {foo: 1})
twgl.drawBufferInfo(gl, bi)
*/
//------
vs = `#version 300 es
in float rad;
in vec2 centre;
in vec2 coord;
void main() {
  //gl_Position = vec4(coord, 0, 1);    // This line allows the downstream program to run,
  vec2 fragPos = centre + rad * coord;  // but these two
  gl_Position = vec4(fragPos, 0, 1);    // lines don't.
}`;
fs = `#version 300 es
precision mediump float;
out vec4 finalCol;
void main() {
    finalCol = vec4(0,1,1, 1);
}`;
programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)
arrays = {
  centre: { size: 2, data: [ -0.95, 0.95, ], divisor: 1},
  rad:    { size: 1, data: [ 0.05, ], divisor: 1},
  coord:  { size: 2, data: [ -1,-1, 1,-1, 1,1, -1,-1, 1,1, -1,1, ] },
}
bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES, 6, 0, 1)
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
