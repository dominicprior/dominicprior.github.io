// A minimal example of TWGL textures.

const vs = `#version 300 es
in vec4 position;  // These two names are chosen
in vec2 texcoord;  // by the twgl primitives.
out vec2 v_texCoord;
void main() {
  v_texCoord = texcoord;
  gl_Position = position.zxyw;
}`;

const fs = `#version 300 es
precision mediump float;
in vec2 v_texCoord;
out vec4 finalColour;
uniform sampler2D s;  // A sampler2D is a thing for doing lookup in a standard texture image.
                      // The value of a sampler2D variable is a reference to a texture unit.
                      // It says which texture unit is being invoked.
void main() {
  finalColour = texture(s, v_texCoord);  // texture is the modern function; texture2D is deprecated
}`;

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
