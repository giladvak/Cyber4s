
class Piece {
  constructor(row, col, type, player) {
    this.row = row
    this.col = col
    this.type = type
    this.player = player
  }

  getPossibleMoves(boardData) {

    if (boardData.currentPlayer !== this.player) {
      return [];
    }
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
    for (let move of moves) {
      const absoluteRow = move[0];
      const absoluteCol = move[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(move);
      }
    }
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
        result.push([row, col])
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

  deletePiece(){
    this.row = -1;
    this.col = -1;
    this.img.remove();
  }

  moveToLocation(row,col){
    this.row = row
    this.col = col
    // table.rows[row].cells[col].appendChild(this.img)
  }
}