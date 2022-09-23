'use strict'
const pr = console.log

const params = 'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING VERTEX_ATTRIB_ARRAY_ENABLED VERTEX_ATTRIB_ARRAY_SIZE VERTEX_ATTRIB_ARRAY_STRIDE VERTEX_ATTRIB_ARRAY_TYPE VERTEX_ATTRIB_ARRAY_NORMALIZED CURRENT_VERTEX_ATTRIB'.split(' ')

function prState() {
  for (let i of [0,1]) {
    pr(params.map(p => gl.getVertexAttrib(i, gl[p])))
  }
}
