'use strict'

document.querySelector('p').innerHTML = `

This simple drawing, using all the default WebGL options, is enough to show a gamma correction problem. <p>

The border between the red and green triangles are anti-aliased to (127,127,0), which is bad because
the 127 values are then sent to the screen as (127/255)**2.2 * 255, which is far too dark.

`

let vs = `#version 300 es
in vec4 aPosition;
in vec4 col;
out vec4 fragCol;
out vec2 vTexCoord;
void main() {
  fragCol = col;
  gl_Position = aPosition;
}`;

let fs = `#version 300 es
precision mediump float;
in vec4 fragCol;
in vec2 vTexCoord;
uniform sampler2D uSampler;
out vec4 finalCol;
void main() {
  finalCol = fragCol;
}`;

let canvas = document.querySelector('canvas')
let gl = canvas.getContext('webgl2',
      { //alpha: false,
        //premultipliedAlpha: true,
       })
let programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)
gl.clearColor(1,1,1,1)
gl.clear(gl.COLOR_BUFFER_BIT)
//gl.enable(gl.DEPTH_TEST)  //smaller z wins
//gl.enable(gl.BLEND)
//gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
const vertexBufferData = new Float32Array([ 
  -1,1,0,  -.9,.9,0,   -.9,1,0, 
  -1,1,-0.5,  -1,.9,-0.5,  -.9,1,-0.5,
                                          ]);
const colBufferData = new Float32Array([ 
  0,1,0,1, 0,1,0,1, 0,1,0,1,  // green
  1,0,0,1, 1,0,0,1, 1,0,0,1,  // red
            ]);

let arrays = {
    aPosition: { numComponents: 3, data: vertexBufferData, },
    col:       { numComponents: 4, data: colBufferData, },
}
let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)

twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLE)

// ------ Draw the magnified view ------

const width = 20
const height = 20
let pixels = new Uint8Array(4 * width * height)
gl.readPixels(0, canvas.height - height, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

let colors = {}
for (let i=0; i < pixels.length; i +=4) {
  let color = ''
  for (let j=0; j < 4; j++) {
    color += pixels[i+j] + ', '
  }
  if (colors[color]) {
    colors[color]++
  }
  else {
    colors[color] = 1
  }
}

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
