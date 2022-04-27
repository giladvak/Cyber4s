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


  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  isPlayer(row, col, player) {
    const piece = this.getPiece(row, col);
    return piece !== undefined && piece.player === player
  }


  getPiece(row, col) {
    let index = this.getPieceIndex(row, col)
    if (index !== -1)
      return this.pieces[index]
  }

  getPieceIndex(row, col) {
    for (let i = 0; i < this.pieces.length; i++) {
      if (row === this.pieces[i].row && col === this.pieces[i].col) {
        return i
      }
    }
    return -1
  }

  setPieceLocation(row, col, index) {
    let secondIndex = this.getPieceIndex(row, col)
    let secondPlayer = secondIndex !== -1 ? this.pieces[secondIndex] : undefined
    let currentPiece = this.pieces[index]

    if (secondPlayer) {
     
    secondPlayer.deletePiece()
     this.removedPiece(secondPlayer)
      this.pieces.splice(secondIndex, 1)
    }
    currentPiece.moveToLocation(row, col)

  }
  removedPiece(secondPlayer){
   secondPlayer
if(secondPlayer.type===KING){
  showAlert()
  boardData1.pieces
}
console.log(boardData1)
  }
 

  

}