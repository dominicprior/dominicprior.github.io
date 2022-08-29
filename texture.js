// A minimal example of WebGL instancing.
// Derived from https://stackoverflow.com/questions/46059914/what-does-instancing-do-in-webgl

const vs = `#version 300 es
in vec2 pos;
in vec3 colour;
in vec2 uv;
// out vec3 fragColour;
in vec2 foo;
out vec2 vTexCoord;
uniform float scale;
void main() {
  // fragColour = colour;
  gl_PointSize = 70.0;
  gl_Position = vec4(pos * scale, 0.0, 1.0);
  vTexCoord = foo;
}`;

const fs = `#version 300 es
precision mediump float;
// in vec3 fragColour;
in vec2 vTexCoord;
out vec4 finalColour;
uniform sampler2D uSampler;
void main() {
  // finalColour = vec4(fragColour, 1);
  finalColour = texture(uSampler, vTexCoord);
}`;

let gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(1.0, 0.8, 1.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

let arrays = {
  pos:    { numComponents: 2, data:  [0, 0,      0.5, 0.5,  0, 0.9,   1.6, 0 ], },
  colour: { numComponents: 3, data:  [0, 0,1,    0, 1, 0,   1,0,0,    1,0,0  ], },
  uv:     { numComponents: 2, data:  [0, 0,      1, 0,      0, 1,     1, 1, ], },
  indices: [0,1,2, 0,1,3]
}
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)

let uniforms = { scale: 1, }
twgl.setUniforms(programInfo, uniforms)

// uniform uSampler ?

twgl.createTextures(gl, {
  foo: {
    mag: gl.NEAREST,
    min: gl.LINEAR,
    src: [
      255,180,0,255,
      0,192,192,255,
      192,0,192,255,
      0,255,255,255,
    ],    
 }})

twgl.drawBufferInfo(gl, bufferInfo)
