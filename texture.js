// A minimal example of TWGL textures.

const vs = `#version 300 es
in vec4 a_position;
in vec2 a_texcoord;
out vec2 v_texCoord;
void main() {
  v_texCoord = a_texcoord;
  gl_Position = a_position.zxyw;
}`;

const fs = `#version 300 es
precision mediump float;
in vec2 v_texCoord;
out vec4 finalColour;
uniform sampler2D u_diffusez;
void main() {
  finalColour = texture(u_diffusez, v_texCoord);
}`;
twgl.setDefaults({attribPrefix: "a_"});

let gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(1.0, 0.8, 1.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

const bufferInfo = twgl.primitives.createPlaneBufferInfo(gl)

twgl.createTexture(gl, {
    mag: gl.NEAREST,
    min: gl.LINEAR,
    src: [
      255,180,0,255,
      0,192,192,255,
      192,0,192,255,
      0,255,255,255,
    ],
    width: 2
})

let drawObjects = [{
  programInfo: programInfo,
  bufferInfo: bufferInfo,
}];

twgl.drawObjectList(gl, drawObjects);
