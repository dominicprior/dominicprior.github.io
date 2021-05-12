// A fractal animation.

'use strict'

const w  = window.innerWidth
const h = window.innerHeight
const minWH = Math.min(w, h)
const trunkHeight = minWH / 3
const trunkWidth = trunkHeight / 10
const trunkBaseY = 0.9 * h
const circleDiameter = trunkWidth
const numLevels = 11

const t = trunkHeight

// The initial positions of the four blobs.

let blobs = [ [ [0, 0.8 * t], [0.4 * t, 1.2 * t] ],
              [ [0, 0.98 * t], [-0.4 * t, 1.5 * t] ] ]

// Draw an SVG tree in the coordinate system implied by the
// group's transform.  A level one tree is just a rectangle
// representing the tree trunk.  A level two tree is a Y-shape
// consisting of the trunk and the two branches.  And so on.

function drawTree(numLevels, matrices, group,
                  width, height, colour) {
  group.rect(width, height).fill(colour).cx(0).opacity(1)
  if (numLevels > 1) {
    for (let matrix of matrices) {
      const subGroup = group.group().transform(matrix)
      drawTree(numLevels - 1, matrices, subGroup,
               width, height, colour)
    }
  }
}

// Change the appearance of the tree by updating its
// transforms according to the matrices.

function updateTransforms(matrices, group) {
  const ch = group.children()
  let n = 0
  for (let i=0; i < ch.length; i++) {
    let child = ch[i]
    if (child.node.nodeName === 'g') {
      child.transform(matrices[n++])
      updateTransforms(matrices, child)
    }
  }
}

// A full-screen SVG element.

let draw = SVG().addTo('body').size(w, h)

// A <g> element whose coordinate system has (0,0) at the base
// of the tree trunk and y going upwards.

let mainGroup = draw.group()
      .transform({tx: w / 2, ty: trunkBaseY, flip: 'y'})

// An array of four SVG <circle> elements.

let circles = []

// Return the two matrices representing the affine transforms
// of the branches w.r.t. the trunk such that the branches land
// on the blobs.

function calcMatrices() {
  let result = []
  for (let br of blobs) {
    const a = (br[1][1] - br[0][1]) / trunkHeight
    const b = (br[1][0] - br[0][0]) / trunkHeight
    const matrix = new SVG.Matrix(a, -b, b, a, br[0][0], br[0][1])
    result.push(matrix)
  }
  return result
}

let matrices = calcMatrices()

// Create the <g> and <rect> elements for the initial tree.
// These elements will persist for the whole app because the
// shape changing will consist of changing the transforms.

drawTree(numLevels, matrices, mainGroup,
         trunkWidth, trunkHeight, 'brown')

drawCircles()
let div = document.createElement('div')
div.innerHTML = "Drag the red blobs around"
document.body.append(div)

// Return the x and y in the main tree coordinate system,
// which the rest of the app can use without thinking about
// y pointing downwards.

function coords(event) {
  return [event.x - w / 2, trunkBaseY - event.y]
}

function drawCircles() {
  for (let br of blobs) {
    for (let end of br) {
      const circle = mainGroup.circle(circleDiameter).
            center(end[0], end[1]).fill('red')
      circles.push(circle)
    }
  }
}

function updateCircles() {
  let i=0
  for (let br of blobs) {
    for (let end of br) {
      circles[i++].center(end[0], end[1])
    }
  }
}

// Return the index in blobs of the blob nearest to the
// mousedown event.

function nearestBlob(x, y) {
  let bestDistance = 1e99
  let bestI
  let bestJ
  for (let i in blobs) {
    const br = blobs[i]    // e.g. [ [0, 300], [150, 580] ]
    for (let j in br) {  // e.g. [0, 300]
      const end = br[j]
      const distance = Math.hypot(end[0] - x, end[1] - y)
      if (distance < bestDistance) {
        bestDistance = distance
        bestI = i
        bestJ = j
      }
    }
  }
  return [bestI, bestJ]
}

// The offset of the blob relative to the mouse position.
// (If the user clicks off-centre, the mouse drag animation
// needs to preserve that offset to prevent the blob from
// jumping).

let cx, cy

let down = false
let nearestI, nearestJ

// Record what blob the user is dragging and its offset from
// the mouse.

draw.node.onpointerdown = (event) => {
  const [x, y] = coords(event);
  [nearestI, nearestJ] = nearestBlob(x, y)
  const b = blobs[nearestI][nearestJ]
  cx = b[0] - x
  cy = b[1] - y
  down = true
  return false
}

// Update the picture according to the mouse position as
// long as the user is still pressing the mouse button.

draw.node.onpointermove = (event) => {
  if (down) {
    const [x, y] = coords(event)
    blobs[nearestI][nearestJ] = [x+cx, y+cy]
    const newMatrices = calcMatrices()
    updateTransforms(newMatrices, mainGroup)
    updateCircles()
  }
  return false
}

draw.node.onpointerup = () => {
  down = false
  return false
}
