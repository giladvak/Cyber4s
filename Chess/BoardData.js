class BoardData {
  constructor(pieces, firstPlayer) {
    this.pieces = pieces
    this.currentPlayer = firstPlayer


  }
  clearClasses(row, col) {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        table.rows[x].cells[y].classList.remove('possibleMoves');
        table.rows[x].cells[y].classList.remove('selected');
        table.rows[x].cells[y].classList.remove('enemy');
      }
    }
  }


  removePiece(row, col) {

    for (let i = 0; i < boardData.pieces.length; i++) {
      const piece = this.pieces[i];
      if (piece.row === row && piece.col === col) {

        this.pieces.splice(i, 1);
      }
    }
  }
  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col);
    return piece !== undefined && piece.player === player
  }


  getPiece(row, col) {

    for (let piece of boardData.pieces) {
      if (row === piece.row && col === piece.col) {
        return piece

      }
    }
  };

};