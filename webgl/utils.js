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
