// An interactive animation of putting out a fire.

'use strict'

const n = 40
const cellSize = 5
const spacing = 0
const stride = cellSize + spacing
const boardTop = 100
const boardLeft = 50
const numUpdatesPerFrame = 400
const range = 2
const splodgeRadius = 12
const initialProbabilityOfBeingRed = 0.53

// An array of arrays of div elements.  The div elements are positioned
// in a grid using the 'position: fixed' attribute.
//
// Each element has an 'on' property saying whether it is red (as well
// as having the corresponding background-colour attribute).

let cells = new Array(n)

// Create the n by n set of div elements and append them straight onto
// the document body.

function initializeCells() {
  for (let i=0; i < n; i++) {
    cells[i] = new Array(n)
    for (let j=0; j < n; j++) {
      let cell = document.createElement('div')
      document.body.append(cell)
      cell.style.position = 'fixed'
      cell.style.top =  (boardTop  + i * stride) + 'px'
      cell.style.left = (boardLeft + j * stride) + 'px'
      cell.style.height = cellSize + 'px'
      cell.style.width  = cellSize + 'px'
      cell.on = Math.random() < initialProbabilityOfBeingRed
      cell.style['background-color'] = cell.on ? 'red' : 'blue'
      cells[i][j] = cell
    }
  }
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

// Update the 'on' attribute (and colour) of a randomly selected cell.
// The probability of the cell being on fire depends on how many of its
// surrounding cells were on fire.

function updateOneCell() {
  const i = randomInt(n)
  const j = randomInt(n)
  const proportionOnFire = getProportionOnFire(i, j)
  let cell = cells[i][j]
  cell.on = Math.random() < getProbabitity(proportionOnFire)
  cell.style['background-color'] = cell.on ? 'red' : 'blue'
}

// Return the proportion of neighbours (including itself) that are on fire.
// This function clips the neighbours to the grid, rather than doing any
// wrap-around.

function getProportionOnFire(i, j) {
  const maxI = Math.min(i + range, n - 1)
  const maxJ = Math.min(j + range, n - 1)
  const minI = Math.max(i - range, 0)
  const minJ = Math.max(j - range, 0)
  let numOnFire = 0
  for (var ii = minI; ii <= maxI; ii++) {
    for (var jj = minJ; jj <= maxJ; jj++) {
      numOnFire += cells[ii][jj].on
    }
  }
  return numOnFire / (maxI - minI + 1) / (maxJ - minJ + 1)
}

// Return the probability that the cell will be red, depending on the
// proportion of neighbours that are red.
//
// The function is a bit like a https://en.wikipedia.org/wiki/Sigmoid_function
// but cheaper.
// 
// It is monotonic on 0 to 1 and goes through (0,0) and (1,1).
// It is also symmetric.

function getProbabitity(p) {
  return p * p * (3 - 2 * p)
}

// Respond to a mouse click by setting a circle of cells to blue.

document.onpointerdown = (event) => {
  const i = Math.floor((event.y - boardTop)  / stride)
  const j = Math.floor((event.x - boardLeft) / stride)
  for (var ii = i - splodgeRadius; ii < i + splodgeRadius; ii++) {
    for (var jj = j - splodgeRadius; jj < j + splodgeRadius; jj++) {
      if (ii >= 0 && ii < n && jj >= 0 && jj < n) {
        const dist = Math.hypot(jj - j, ii - i)
        if (dist < splodgeRadius) {
          var cell = cells[ii][jj]
          cell.on = 0
          cell.style['background-color'] = 'blue'
        }
      }
    }
  }
}

// Update the page and schedule another update.
// The updates should happen at 60Hz.

function updateCells() {
  for (let i=0; i < numUpdatesPerFrame; i++) {
    updateOneCell()
  }
  requestAnimationFrame(updateCells)
}

initializeCells()
requestAnimationFrame(updateCells)
