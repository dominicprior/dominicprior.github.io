gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(0,0,0.4, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)
//------
vs = `#version 300 es
in float r;
in vec2 c;
void main() {
  gl_Position = vec4(r * c, 0, 1);
}`;
fs = `#version 300 es
precision mediump float;
out vec4 finalCol;
void main() {
    finalCol = vec4(0,1,1, 1);
}`;
p = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(p.program)
arrays = {
  r:  { size: 1, data: [ 0.5 ], divisor: 1 },
  c:  { size: 2, data: [ -1,-1, 1,-1, 1,1, ] }
}
b = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, p, b)
twgl.drawBufferInfo(gl, b, gl.TRIANGLES, 3, 0, 1)
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
p = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(p.program)
arrays = {
  pos: { size: 2, data: [ 0, 0, 0, -1, -1, 0 ],
    // divisor: 0
  }
}
b = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, p, b)
twgl.drawBufferInfo(gl, b)
