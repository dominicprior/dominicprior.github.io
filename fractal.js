'use strict'

function drawTree(numLevels, matrices, group,
                  width, height, colour) {
  group.rect(width, height).fill(colour).cx(0).opacity(1)
  if (numLevels > 1) {
    for (let matrix of matrices) {
      let subGroup = group.group().transform(matrix)
      drawTree(numLevels - 1, matrices, subGroup,
               width, height, colour)
    }
  }
}

function updateTransforms(matrices, group) {
  let ch = group.children()
  let n = 0
  for (let i=0; i < ch.length; i++) {
    let child = ch[i]
    if (child.node.nodeName === 'g') {
      child.transform(matrices[n++])
      updateTransforms(matrices, child)
    }
  }
}

let w  = window.innerWidth
let h = window.innerHeight
let draw = SVG().addTo('body').size(w, h)
let mainGroup = draw.group()
      .transform({tx: w / 2, ty: 4 * h / 5, flip: 'y'})

let blobs = [ [ [0, 300], [150, 580] ],
              [ [0, 420], [-150, 640] ] ]

let circles = []

function calcMatrices() {
  let result = []
  for (let br of blobs) {  // e.g. [ [0, 300], [150, 580] ]
    let a = (br[1][1] - br[0][1]) / (h / 3)
    let b = (br[1][0] - br[0][0]) / (h / 3)
    let matrix = new SVG.Matrix(a, -b, b, a, br[0][0], br[0][1])
    result.push(matrix)
  }
  return result
}

let matrices = calcMatrices()

drawTree(10, matrices, mainGroup, h / 30, h / 3, 'brown')
drawCircles()

function drawCircles() {
  for (let br of blobs) {  // e.g. [ [0, 300], [150, 580] ]
    for (let end of br) {
      let circle = mainGroup.circle(50).
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

function coords(event) {
  return [event.x - w / 2, 4 * h / 5 - event.y]
}

function nearestBlob(x, y) {
  let bestDistance = 1e99
  let bestI
  let bestJ
  for (let i in blobs) {
    let br = blobs[i]    // e.g. [ [0, 300], [150, 580] ]
    for (let j in br) {  // e.g. [0, 300]
      let end = br[j]
      let distance = Math.hypot(end[0] - x, end[1] - y)
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
  let [x, y] = coords(event);
  [nearestI, nearestJ] = nearestBlob(x, y)
  let b = blobs[nearestI][nearestJ]
  cx = b[0] - x
  cy = b[1] - y
  down = true
}


draw.node.onpointermove = (event) => {
  if (down) {
    let [x, y] = coords(event)
    blobs[nearestI][nearestJ] = [x+cx, y+cy]
    let newMatrices = calcMatrices()
    updateTransforms(newMatrices, mainGroup)
    updateCircles()
  }
}


draw.node.onpointerup = () => {
  down = false
}
