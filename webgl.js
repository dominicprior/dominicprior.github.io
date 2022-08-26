/*
A shader is a program that generates the positions and colors.

There are two functions: the vertex shader and the fragment shader.

A set of vertex and fragment shaders is called a shader program.

The vertex shader is run for each vertex in the shape.

The vertex shader returns the transformed vertex by saving it in
a special variable provided by GLSL, called gl_Position.

The vertex shader can also do things like determine the coordinates
within the face's texture of the texel, apply the normals to determine
the lighting factor to apply to the vertex, and so on. This information
can then be stored in varyings or attributes as appropriate to be
shared with the fragment shader.

The fragment shader is called once for every pixel on each shape.
Its job is to determine the color of that pixel by figuring out which
texel and lighting to apply.  The color is returned by storing it in
the special variable gl_FragColor.

WebGL objects are built using sets of vertices, each of which has a
position and a color.

By default, all other pixels' colors (and all its other attributes,
including position) are computed using interpolation.

Uniforms are values passed to the shader that stay the same for all
vertices in a draw call.

A uniform is a constant global that can be used by a shader.

The clip space is a 2 unit wide cube centred at (0,0,0).

Modern OpenGL and WebGL are just rasterization APIs. You write shaders,
which are small functions that run on the GPU. You provide those shaders
with data through attributes (per iteration data), uniforms (global
variables), textures (2d/3d arrays), varyings (data passed from vertex
shaders to fragment shaders).


This program is based on:
https://github.com/mdn/dom-examples/blob/master/webgl-examples/tutorial/sample2/webgl-demo.js
and
https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
Note that the tutorial webpage lags behind the dom-examples.

Here are the API calls it uses.

shader = createShader(type)
shaderSource(shader, sourceStr)
compileShader(shader)

prog = createProgram()
attachShader(prog, shader)
linkProgram(prog)

getAttribLocation
getUniformLocation

buf = createBuffer()
bindBuffer(gl.ARRAY_BUFFER, buf)
bufferData(gl.ARRAY_BUFFER,
           new Float32Array(positions),
           gl.STATIC_DRAW)

clearColor(0.0, 0.0, 0.0, 1.0)
clearDepth(1.0)
enable(gl.DEPTH_TEST)
depthFunc(gl.LEQUAL)
clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

vertexAttribPointer
enableVertexAttribArray

useProgram(prog)

uniformMatrix4fv   // set the value of a uniform
getUniformLocation

drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
*/ 


const canvas = document.querySelector('canvas')
const gl = canvas.getContext('webgl')

if (!gl) {
alert('Unable to initialize WebGL. Your browser or machine may not support it.')
}

// Vertex shader program

const vsSource = `
attribute vec4 aVerPos;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVerPos;
}
`

// Fragment shader program

const fsSource = `
precision mediump float;
void main() {
    gl_FragColor = vec4(1.0, 0.5, 1.0, 1.0);
}
`

const prog = initShaderProgram(gl, vsSource, fsSource)

initBuffers(gl)

drawScene(gl)

function initBuffers(gl) {
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  const positions = [ 1.0,  1.0,  -1.0,  1.0,  1.0, -1.0,  -1.0, -1.0 ]
  gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(positions),
                gl.STATIC_DRAW)
}

function drawScene(gl) {
  gl.clearColor(0.0, 0.0, 0.3, 1.0)  // Clear to black, fully opaque
  gl.clearDepth(1.0)                 // Clear everything
  gl.enable(gl.DEPTH_TEST)           // Enable depth testing
  gl.depthFunc(gl.LEQUAL)            // Near things obscure far things

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
  const zNear = 0.1
  const zFar = 100.0
  const projectionMatrix = mat4.create()

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar)

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create()

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, 0.0, -6.0])  // amount to translate

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    const aVerPos = gl.getAttribLocation(prog, 'aVerPos')
    gl.vertexAttribPointer(
        aVerPos,
        numComponents,
        type,
        normalize,
        stride,
        offset)
    gl.enableVertexAttribArray(
        aVerPos)
  }

  gl.useProgram(prog)

  // Set the shader uniforms

  gl.uniformMatrix4fv(
    gl.getUniformLocation(prog, 'uProjectionMatrix'),
      false,
      projectionMatrix)
  gl.uniformMatrix4fv(
    gl.getUniformLocation(prog, 'uModelViewMatrix'),
      false,
      modelViewMatrix)

  const offset = 0
  const vertexCount = 4
  gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  // Create the shader program

  const prog = gl.createProgram()
  gl.attachShader(prog, vertexShader)
  gl.attachShader(prog, fragmentShader)
  gl.linkProgram(prog)

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(prog))
    return null
  }
  return prog
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}
