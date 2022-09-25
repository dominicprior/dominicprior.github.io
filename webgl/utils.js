'use strict'
const pr = console.log

const params = 'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING VERTEX_ATTRIB_ARRAY_ENABLED VERTEX_ATTRIB_ARRAY_SIZE VERTEX_ATTRIB_ARRAY_STRIDE VERTEX_ATTRIB_ARRAY_TYPE VERTEX_ATTRIB_ARRAY_NORMALIZED CURRENT_VERTEX_ATTRIB'.split(' ')

function prState() {
  for (let i of [0,1]) {
    pr(params.map(p => gl.getVertexAttrib(i, gl[p])))
  }
}

function prHist(pixels) {
  gl.flush()
  let colors = {}
  let para = document.createElement('p')
  document.body.appendChild(para)
  for (let i=0; i < pixels.length; i +=4) {
    let color = ''
    for (let j=0; j < 3; j++) {
      color += pixels[i+j] + ', '
    }
    if (colors[color]) {
      colors[color]++
    }
    else {
      colors[color] = 1
    }
  }
  for (let c in colors) {
    let msg = c + ' --- ' + colors[c]
    pr(msg)
    para.insertAdjacentHTML('beforeend', msg + '<br>')
  }
}

function magnify(
  gl,
  scale,
  x, y, clipW, clipH,   // src in clip coords
  u, v,                 // dest in clip coords
) {

  x = Math.round((x + 1) * gl.canvas.width * 0.5)
  y = Math.round((y + 1) * gl.canvas.height * 0.5)
  let w = Math.round(clipW * gl.canvas.width * 0.5)
  let h = Math.round(clipH * gl.canvas.width * 0.5)

  let pixels = new Uint8Array(4 * w * h)
  gl.readPixels(x, y, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

  let vs = `#version 300 es
  in vec2 pos;
  in vec2 texcoord;
  out vec2 v_texCoord;
  void main() {
    v_texCoord = texcoord;
    gl_Position = vec4(pos, 0.0, 1.0);
  }`;
  let fs = `#version 300 es
  precision mediump float;
  in vec2 v_texCoord;
  out vec4 finalColour;
  uniform sampler2D s;
  void main() {
    finalColour = texture(s, v_texCoord);
  }`;
  
  let pi = twgl.createProgramInfo(gl, [vs, fs])
  gl.useProgram(pi.program)
  
  const right = u + clipW * scale
  const topp  = v + clipH * scale
  let arrays = {
    pos:      { size: 2, data: [ u,v, right,v, right,topp, u,v, right,topp, u,topp, ], divisor: 0 },
    texcoord: { size: 2, data: [ 0,0, 1,0, 1,1, 0,0, 1,1, 0,1, ], divisor: 0 },
  }
  let bi = twgl.createBufferInfoFromArrays(gl, arrays)
  twgl.setBuffersAndAttributes(gl, pi, bi)
  
  twgl.createTexture(gl, {
    mag: gl.NEAREST,
    min: gl.LINEAR,
    src: pixels,
    width: w
  })
  twgl.drawBufferInfo(gl, bi)
  return pixels
}
