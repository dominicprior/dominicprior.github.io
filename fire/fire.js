// An animation of putting out a fire.

'use strict'

const n = 2
const cellSize = 20
const spacing = 5
const stride = cellSize + spacing
const boardTop = 100
const boardLeft = 50

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
    cell.style['background-color'] = 'red'
    cells[i][j] = cell
  }
}
