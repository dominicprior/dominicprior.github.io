// trying out some matrix transforms

const vs = `#version 300 es
in vec4 pos;
uniform mat4 view;
uniform mat4 proj;
void main() {
    gl_PointSize = 10.0;
    gl_Position = proj * view * pos;
}`;

const fs = `#version 300 es
precision mediump float;
out vec4 fragColor;
void main() {
    fragColor = vec4(0,0,0,1);
}`;

let gl = document.querySelector('canvas').getContext('webgl2')
gl.clearColor(0.6, 0.8, 0.9, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const programInfo = twgl.createProgramInfo(gl, [vs, fs])
gl.useProgram(programInfo.program)

const view = mat4.create()
const proj = mat4.create()

// negates x and z.  i.e. turns thru 180 about the y-axis
// -1, 0, 0, 0,   0, 1, 0, 0,   0, 0, -1, 0,   0, 0, 0, 1   diagonal matrix
mat4.lookAt(view, [0,0,0], // eye
        [0,0,1],   // looking at
        [0,1,0]);

// 1, 0, 0, 0    column major!  i.e. this is the first column
// 0, 1, 0, 0
// 0, 0, -1, -1      z is flipped (to cancel out the view z-flip)
// 0, 0, -0.4, 0      the -0.4 is a z translation
mat4.perspective(proj, Math.PI / 2, 1,   // flips z
        .2,   //near
        null    //far
        );

let arrays = {
  pos: { numComponents: 3, data:  [ 0, 0, 0.5,   0.5, 0, 0.5,   0.5, 0, 0.6, ], },
}

const uniforms = {view: view, proj: proj}

twgl.setUniforms(programInfo, uniforms)

let bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)
twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
twgl.drawBufferInfo(gl, bufferInfo, gl.POINTS)
