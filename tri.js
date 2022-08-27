'use strict'

var canvas = document.querySelector('canvas')
var gl = canvas.getContext('webgl')

const programInfo = twgl.createProgramInfo(gl, ['vs', 'fs'])
const arrays = {
    position: [ 0, 0, 0,1,   0, 0.5, 0,1,   0.7, 0, 0,1,  ],
  }
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

const uniforms = {
    time: 1.0,
}

//gl.clearColor(0, 0, 0, 0);
//gl.clear(gl.COLOR_BUFFER_BIT)

twgl.resizeCanvasToDisplaySize(gl.canvas)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

gl.useProgram(programInfo.program)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
twgl.setUniforms(programInfo, uniforms)
twgl.drawBufferInfo(gl, bufferInfo)
