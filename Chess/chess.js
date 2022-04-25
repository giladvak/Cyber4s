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




class Piece {
  constructor(row, col, type, player) {
    this.row = row
    this.col = col
    this.type = type
    this.player = player
  };

  getPossibleMoves(boardData) {


    let moves;
    if (this.type === PAWN) {
      moves = this.pawnPossibleMoves(boardData)

    } else if (this.type === ROOK) {
      moves = this.rookPossibleMoves(boardData)
    } else if (this.type === KNIGHT) {
      moves = this.knightPossibleMoves(boardData)
    } else if (this.type === BISHOP) {
      moves = this.bishopPossibleMoves(boardData)
    } else if (this.type === KING) {
      moves = this.kingPossibleMoves(boardData)
    } else if (this.type === QUEEN) {
      moves = this.queenPossibleMoves(boardData)
    } else {
      console.log('Unknown type')

    };


    let filteredMoves = [];
    for (let absoluteMove of moves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    } console.log(filteredMoves)
    return filteredMoves;
  };

  pawnPossibleMoves(boardData) {
    let result = [];
    let direction = 1;

    if (this.player === typeBlack) {
      direction = -1
    }
    let position = [this.row + direction, this.col]
    if (boardData.isEmpty(position[0], position[1])) {
      result.push(position);
    }

    position = [this.row + direction, this.col + direction]
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position)
    }

    position = [this.row + direction, this.col - direction]
    if (boardData.isPlayer(position[0], position[1], this.getOpponent())) {
      result.push(position)
    }
    return (result);
  }




  rookPossibleMoves(boardData) {
    let result = [];

    result = result.concat(this.getMovesInDirection(-1, 0, boardData))
    result = result.concat(this.getMovesInDirection(1, 0, boardData))
    result = result.concat(this.getMovesInDirection(0, -1, boardData))
    result = result.concat(this.getMovesInDirection(0, 1, boardData))

    return result;
  }
  getMovesInDirection(directionRow, directionCol, boardData) {
    let result = [];
    for (let i = 1; i < 8; i++) {
      let row = this.row + directionRow * i;
      let col = this.col + directionCol * i;
      if (boardData.isEmpty(row, col)) {
        result.push([row, col]);
      } else if (boardData.isPlayer(row, col, this.getOpponent())) {
        return result;
      } else if (boardData.isPlayer(row, col, this.player)) {
        return result;
      }
    }
    return result;
  }
  knightPossibleMoves() {
    let result = [];
    const relativeMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [-1, 2], [1, 2], [-1, -2], [1, -2]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;

  }
  bishopPossibleMoves() {
    let result = [];
    result = result.concat(this.getMovesInDirection(-1, -1, boardData));
    result = result.concat(this.getMovesInDirection(-1, 1, boardData));
    result = result.concat(this.getMovesInDirection(1, -1, boardData));
    result = result.concat(this.getMovesInDirection(1, 1, boardData));
    return result;

  };
  queenPossibleMoves() {
    let result = this.bishopPossibleMoves(boardData);
    result = result.concat(this.rookPossibleMoves(boardData));
    return result;



  };
  kingPossibleMoves() {
    let result = [];
    const relativeMoves = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let relativeMove of relativeMoves) {
      let row = this.row + relativeMove[0];
      let col = this.col + relativeMove[1];
      if (!boardData.isPlayer(row, col, this.player)) {
        result.push([row, col]);
      }
    }
    return result;

  }


  getOpponent() {
    if (this.player === typeWhite) {
      return typeBlack;
    } else
      return typeWhite;

  }
}


class BoardData {
  constructor(hatihot,) {
    this.hatihot = hatihot



  }



  //  removePiece(row, col) {

  //   for (let i = 0; i < boardData.hatihot.length; i++) {
  //     const piece = this.hatihot[i];
  //     if (piece.row === row && piece.col === col) {

  //       this.hatihot.splice(i, 1);
  //     }
  //   }
  // }
  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col);
    return piece !== undefined && piece.player === player
  }


  getPiece(shora, amoda) {

    for (let hatha of boardData.hatihot) {
      if (shora === hatha.row && amoda === hatha.col) {
        return hatha

      }
    }
  };

};

boardData = new BoardData(getInitialBoard());
boardData.getPiece()




function onClickFunc(e, shora, amoda, cell) {
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      table.rows[x].cells[y].classList.remove('possibleMoves');
      table.rows[x].cells[y].classList.remove('selected');
      table.rows[x].cells[y].classList.remove('enemy');
    }
  }


  selectedCell = e.currentTarget;

  const imgSelectedCell = selectedCell.firstElementChild



  const chosenPiece = boardData.getPiece(shora, amoda)

  if (chosenPiece) {
    if (selectedCell !== undefined) {

      selectedCell.classList.add('selected');
    }

    let showPossibleMoves = chosenPiece.getPossibleMoves(boardData);

    for (let possibleMove of showPossibleMoves) {
      const cellPossibleMove = table.rows[possibleMove[0]].cells[possibleMove[1]];


      if (boardData.getPiece(possibleMove[0], possibleMove[1]) === undefined) {

        cellPossibleMove.classList.add('possibleMoves');
      }
      if (boardData.getPiece(possibleMove[0], possibleMove[1]) !== undefined && boardData.getPiece(possibleMove[0], possibleMove[1]).player !== boardData.getPiece(shora, amoda).player) {

        cellPossibleMove.classList.add('enemy');
      }

      cellPossibleMove.addEventListener('click', (e) => {
        movePieces(e, cellPossibleMove, shora, amoda, table, imgSelectedCell, selectedCell)

      });

    }
  }






}


function movePieces(e, cellPossibleMove, shora, amoda, table, imgSelectedCell) {

  let piece = boardData.getPiece(shora, amoda)

  const currentTarget = e.currentTarget
  let updateRow = parseInt(currentTarget.id[0])
  let updateCol = parseInt(currentTarget.id[2])
  piece.row = updateRow;
  piece.col = updateCol;
  const icon = currentTarget.firstElementChild

  if (icon) return;


  currentTarget.appendChild(imgSelectedCell);



}








function getInitialBoard() {
  //creating hatihot and putting them in the right place
  let result = [];
  let container = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];
  for (let i = 0; i < container.length; i++) {
    result.push(new Piece(7, i, container[i], typeBlack))
    result.push(new Piece(0, i, container[i], typeWhite))
    result.push(new Piece(1, i, PAWN, typeWhite))
    result.push(new Piece(6, i, PAWN, typeBlack))
  }
  console.log(result)
  return result;
}

//puts selected img in selected cell
function getImg(cell, type, name) {
  const img = document.createElement('img');
  img.src = 'pawns/' + type + '/' + name + '.svg'
  img.classList.add('tool')
  cell.appendChild(img)
}


function createBoard() {
  //creating outerbox div
  const div = document.createElement('div');
  document.body.appendChild(div);
  div.className = 'outerBox'
  //Creating numbers and letter divs
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
  //creating table 
  table = document.createElement('table');
  div.appendChild(table);
  table.classList.add('board');
  //inserting tr

  for (let shora = 0; shora < 8; shora++) {
    const row = document.createElement('tr');
    table.appendChild(row);

    //inserting td's inside each tr
    for (let amoda = 0; amoda < 8; amoda++) {
      const cell = document.createElement('td');
      row.appendChild(cell)
      cell.id = (shora.toString() + ',' + amoda.toString())

      //appending classes on condition 
      if (amoda % 2 === shora % 2) {
        cell.classList.add('white')


      } else {
        cell.classList.add('black');

      }


      //calling event listener on each cell 
      cell.addEventListener('click', (e) => onClickFunc(e, shora, amoda, cell));




    }

  };


  //calling getImg for each hatha
  for (let hatha of boardData.hatihot) {
    getImg(table.rows[hatha.row].cells[hatha.col], hatha.player, hatha.type);


  }




};


window.addEventListener('load', createBoard)





















