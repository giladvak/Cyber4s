class BoardData {
    constructor(hatihot,firstPlayer) {
      this.hatihot = hatihot
      this.currentPlayer=firstPlayer
  
  
    }
    clearClasses(shora,amoda){
        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++) {
            table.rows[x].cells[y].classList.remove('possibleMoves');
            table.rows[x].cells[y].classList.remove('selected');
            table.rows[x].cells[y].classList.remove('enemy');
          }
        }
        }
  
  
     removePiece(row, col) {
  
      for (let i = 0; i < boardData.hatihot.length; i++) {
        const piece = this.hatihot[i];
        if (piece.row === row && piece.col === col) {
  
          this.hatihot.splice(i, 1);
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
  
  
    getPiece(shora, amoda) {
  
      for (let hatha of boardData.hatihot) {
        if (shora === hatha.row && amoda === hatha.col) {
          return hatha
  
        }
      }
    };
  
  };