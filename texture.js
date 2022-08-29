// A minimal example of WebGL instancing.
// Derived from https://stackoverflow.com/questions/46059914/what-does-instancing-do-in-webgl

const vs = `#version 300 es
uniform float scale;
in vec4 a_position;
in vec2 a_texcoord;
out vec2 v_texCoord;
void main() {
  v_texCoord = a_texcoord;
  gl_Position = a_position;
}`;

const fs = `#version 300 es
precision mediump float;
in vec2 v_texCoord;
out vec4 finalColour;
uniform sampler2D u_diffuse;
void main() {
  finalColour = texture(u_diffuse, v_texCoord);
}`;
twgl.setDefaults({attribPrefix: "a_"});

let gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(1.0, 0.8, 1.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

let arrays = {
  pos:    { numComponents: 2, data:  [0, 0,  0.5, 0.5,  0, 0.9,   1.6, 0 ], },
}

let cube = twgl.primitives.createCubeBufferInfo(gl, 0.8)

const textures = twgl.createTextures(gl, {
  checker: {
    mag: gl.NEAREST,
    min: gl.LINEAR,
    src: [
      255,180,0,255,
      0,192,192,255,
      192,0,192,255,
      0,255,255,255,
    ],    
 }})

let uniforms = { scale: 1,
  u_diffuse: textures.checker
}
twgl.setUniforms(programInfo, uniforms)

let drawObjects = [{
  programInfo: programInfo,
  bufferInfo: cube,
  uniforms: uniforms,
}];

//twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)

twgl.drawObjectList(gl, drawObjects);
//twgl.drawBufferInfo(gl, bufferInfo)
