// A fractal animation.

'use strict'

const w  = window.innerWidth
const h = window.innerHeight
const minWH = Math.min(w, h)
const trunkHeight = minWH / 3
const trunkWidth = trunkHeight / 10
const trunkbase = 0.9 * h
const circleDiameter = trunkWidth
const numLevels = 12

const t = trunkHeight
let blobs = [ [ [0, 0.8 * t], [0.4 * t, 1.2 * t] ],
              [ [0, 0.98 * t], [-0.4 * t, 1.5 * t] ] ]

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

let draw = SVG().addTo('body').size(w, h)
let mainGroup = draw.group()
      .transform({tx: w / 2, ty: trunkbase, flip: 'y'})

let circles = []

function calcMatrices() {
  let result = []
  for (let br of blobs) {  // e.g. [ [0, 300], [150, 580] ]
    const a = (br[1][1] - br[0][1]) / trunkHeight
    const b = (br[1][0] - br[0][0]) / trunkHeight
    const matrix = new SVG.Matrix(a, -b, b, a, br[0][0], br[0][1])
    result.push(matrix)
  }
  return result
}

let matrices = calcMatrices()

drawTree(numLevels, matrices, mainGroup, trunkWidth, trunkHeight, 'brown')
drawCircles()

function coords(event) {
  return [event.x - w / 2, trunkbase - event.y]
}

function drawCircles() {
  for (let br of blobs) {  // e.g. [ [0, 300], [150, 580] ]
    for (let end of br) {
      const circle = mainGroup.circle(circleDiameter).
            center(end[0], end[1]).fill('red')
      circles.push(circle)
    }
  }
}

function updateCircles() {
  let i=0
  for (let br of blobs) {  // e.g. [ [0, 300], [150, 580] ]
    for (let end of br) {
      circles[i++].center(end[0], end[1])
    }
  }
}

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

let cx, cy  // offset
let down = false
let nearestI, nearestJ

// note what blob we are moving and its offset from the mouse

draw.node.onpointerdown = (event) => {
  const [x, y] = coords(event);
  [nearestI, nearestJ] = nearestBlob(x, y)
  const b = blobs[nearestI][nearestJ]
  cx = b[0] - x
  cy = b[1] - y
  down = true
}

draw.node.onpointermove = (event) => {
  if (down) {
    const [x, y] = coords(event)
    blobs[nearestI][nearestJ] = [x+cx, y+cy]
    const newMatrices = calcMatrices()
    updateTransforms(newMatrices, mainGroup)
    updateCircles()
  }
}

draw.node.onpointerup = () => {
  down = false
}
