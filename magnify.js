let canvas = document.querySelector('canvas')
let gl = canvas.getContext('webgl2')
gl.clearColor(0,0,0.4, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)
//------
vs = `#version 300 es
in float radz;
in vec2 cordz;
void main() {
  //gl_Position = vec4(cordz, 0, 1);           // This line allows the downstream program to run.
  gl_Position = vec4(radz * cordz, 0, 1);  // This line lines doesn't.
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
  radz:    { size: 1, data: [ 0.5, ], divisor: 1},
  cordz:  { size: 2, data: [ -1,-1, 1,-1, 1,1, ] },
}
bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES, 3, 0, 1)
//------
vs = `#version 300 es
in vec2 pos;
void main() {
  gl_Position = vec4(pos, 0, 1);
}`
fs = `#version 300 es
precision mediump float;
out vec4 finalCol;
void main() {
  finalCol = vec4(1, 0.5, 0.5, 1);
}`
pi = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(pi.program)

gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([ 0, 0, 0, -1, -1, 0, ]), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(pi.program, 'pos')
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(loc);
gl.drawArrays(gl.TRIANGLES, 0, 3)

/*
arrays = { pos: { size: 2, data: [ 0, 0,   0, -1,   -1, 0,], },  }
bi = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, pi, bi)
twgl.drawBufferInfo(gl, bi)
*/
