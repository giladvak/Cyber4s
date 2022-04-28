let typeBlack = 'black'
let typeWhite = 'white'
let boardData;
let table;
let selectedCell;
let checkmate = false


const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';
const container = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];


function onClickFunc(row, col) {
  reloadTable()
  boardData.clearClasses(row, col)

  selectedCell = table.rows[row].cells[col];
  const chosenPiece = boardData.getPiece(row, col)

  if (chosenPiece) {
    selectedCell.classList.add('selected');

    let showPossibleMoves = chosenPiece.getPossibleMoves(boardData);

    for (let possibleMove of showPossibleMoves) {
      const cellPossibleMove = table.rows[possibleMove[0]].cells[possibleMove[1]];
      const possiblePiece = boardData.getPiece(possibleMove[0], possibleMove[1]);
      if (possiblePiece === undefined) {

        cellPossibleMove.classList.add('possibleMoves');
      }
      if (possiblePiece !== undefined && possiblePiece.player !== boardData.getPiece(row, col).player) {

        cellPossibleMove.classList.add('enemy');
      }

      cellPossibleMove.addEventListener('click', (e) => {
        movePieces(e, row, col)

      });

    }
  }
}
function showAlert(secondPlayer) {
  let alert = document.createElement('div');
  document.body.appendChild(alert)
  alert.classList.add('alertMassage')

  let winner = secondPlayer.player === typeBlack ? typeWhite : typeBlack

  alert.innerText = `Game over ${winner.charAt(0).toUpperCase() + winner.slice(1)} Won!`
  checkmate = true

}

function reloadTable() {

  document.querySelector('.outerBox').remove()
  createBoard()

}


function movePieces(e, row, col) {

  let index = boardData.getPieceIndex(row, col)
  let selectedCell = e.currentTarget
  let updateRow = Number(selectedCell.id[0])
  let updateCol = Number(selectedCell.id[2])
  boardData.setPieceLocation(updateRow, updateCol, index)

  boardData.currentPlayer = boardData.currentPlayer === typeWhite ? typeBlack : typeWhite
  reloadTable()
}








function getInitialBoard() {

  let result = [];
  for (let i = 0; i < container.length; i++) {
    result.push(new Piece(7, i, container[i], typeBlack))
    result.push(new Piece(0, i, container[i], typeWhite))
    result.push(new Piece(1, i, PAWN, typeWhite))
    result.push(new Piece(6, i, PAWN, typeBlack))
  }

  return result;
}


function getImg(cell, type, name) {
  const img = document.createElement('img');
  img.src = 'pawns/' + type + '/' + name + '.svg'
  img.classList.add('tool')
  cell.appendChild(img)
  return img
}

function createBoard() {

  const div = document.createElement('div');
  document.body.appendChild(div);
  div.className = 'outerBox'

  const divNum = document.createElement('div')
  const divLetters = document.createElement('div')
  div.appendChild(divNum);
  div.appendChild(divLetters);
  divNum.className = 'numbers'
  divLetters.className = 'letters'
  let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  //inserting numbers
  for (let i = 1; i < 9; i++) {
    const innerDivNumbers = document.createElement('div')
    divNum.appendChild(innerDivNumbers);
    innerDivNumbers.innerText = i
  }//insert letters
  for (let i = 0; i < arr.length; i++) {
    const innerDivLetters = document.createElement('div');
    divLetters.appendChild(innerDivLetters);
    innerDivLetters.innerText = arr[i]
  }
  table = document.createElement('table');
  div.appendChild(table);
  table.classList.add('board');

  for (let row = 0; row < 8; row++) {
    const rowElement = table.insertRow()
    for (let col = 0; col < 8; col++) {
      const cellElement = rowElement.insertCell()
      cellElement.id = (row.toString() + ',' + col.toString())
      if (col % 2 === row % 2) {
        cellElement.classList.add('white')
      } else {
        cellElement.classList.add('black')
      };
      if (!checkmate)
        cellElement.addEventListener('click', () => onClickFunc(row, col))
    };
  }
  boardData = boardData || new BoardData(getInitialBoard(), typeWhite);
  for (let piece of boardData.pieces) {
    piece.img = getImg(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }

}


window.addEventListener('load', createBoard)


















