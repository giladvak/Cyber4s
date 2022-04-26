let typeBlack = 'black'
let typeWhite = 'white'
let boardData;
let table;
let selectedCell;


const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const KING = 'king';
const QUEEN = 'queen';
const container = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];


function onClickFunc(row, col) {

  boardData.clearClasses(row, col)

  selectedCell = table.rows[row].cells[col];
  const imgSelectedCell = selectedCell.firstElementChild
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

      cellPossibleMove.addEventListener('click', (e) => {movePieces(e,row, col, imgSelectedCell, possibleMove)

      });

    }
  }






}


function movePieces(e, row, col, imgSelectedCell, possibleMove) {

  let chosenPiece = boardData.getPiece(row, col)
  let selectedCell = e.currentTarget
  let updateRow = (selectedCell.id[0]) * 1
  let updateCol = (selectedCell.id[2]) * 1
  const icon = selectedCell.firstElementChild
  
  if (chosenPiece === undefined) return;
  chosenPiece.row = updateRow;
  chosenPiece.col = updateCol;

  let secondPlayer = boardData.getPiece(possibleMove[0], possibleMove[1])

  
  if (secondPlayer.player !== chosenPiece.player) {
    boardData.removePiece(possibleMove[0], possibleMove[1])
    
    // chosenPiece.row = possibleMove[0]
    // chosenPiece.col = possibleMove[1]
    // selectedCell.appendChild(imgSelectedCell)
    // selectedCell.firstElementChild.remove()
  }

  if (icon) return;


  selectedCell.appendChild(imgSelectedCell);
  if (boardData.currentPlayer === typeWhite) {
    boardData.currentPlayer = typeBlack
  } else {
    boardData.currentPlayer = typeWhite
  } console.log(selectedCell)
  console.log(chosenPiece)
  console.log(boardData)
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
  }//inserting letters
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
      cellElement.addEventListener('click', () => onClickFunc(row, col))
    };
  } boardData = new BoardData(getInitialBoard(), typeWhite);

  for (let piece of boardData.pieces) {
    getImg(table.rows[piece.row].cells[piece.col], piece.player, piece.type);
  }

}


window.addEventListener('load', createBoard)




















