// An animation of putting out a fire.

'use strict'

const n = 50
const cellSize = 5
const spacing = 0
const stride = cellSize + spacing
const boardTop = 100
const boardLeft = 50
const numUpdatesPerFrame = 400
const range = 2

let cells = new Array(n)

let board = document.getElementById('board')

for (let i=0; i < n; i++) {
  cells[i] = new Array(n)
  let row = document.createElement('div')
  board.append(row)
  for (let j=0; j < n; j++) {
    let cell = document.createElement('div')
    row.append(cell)
    cell.style.position = 'fixed'
    cell.style.top =  (boardTop  + i * stride) + 'px'
    cell.style.left = (boardLeft + j * stride) + 'px'
    cell.style.height = cellSize + 'px'
    cell.style.width  = cellSize + 'px'
    cell.on = Math.random() > 0.47
    cell.style['background-color'] = cell.on ? 'red' : 'blue'
    cells[i][j] = cell
  }
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function updateOneCell() {
  const i = randomInt(n)
  const j = randomInt(n)
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
  const proportionOnFire = numOnFire / (maxI - minI + 1) / (maxJ - minJ + 1)
  let cell = cells[i][j]
  const threshold = getThreshold(proportionOnFire)
  cell.on = Math.random() < threshold
  cell.style['background-color'] = cell.on ? 'red' : 'blue'
}

// 0 -> 0, 1 -> 1, 0.5 -> 0.5
// we want a cubic
function getThreshold(p) {
  return p * p * (3 - 2 * p)
}

function updateCells() {
  for (let i=0; i < numUpdatesPerFrame; i++) {
    updateOneCell()
  }
  requestAnimationFrame(updateCells)
}
requestAnimationFrame(updateCells)
