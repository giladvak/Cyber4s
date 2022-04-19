let typeBlack = 'black'
let typeWhite = 'white'
let selectedCell;
let pieces = [];


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

    getPossibleMoves() {
        let relativeMoves;
        if (this.type === PAWN) {
            let relativeMoves = this.getPawnRelativeMoves()
        } else if (this.type === ROOK) {
            relativeMoves = this.rookPossibleMoves()
        } else if (this.type === KNIGHT) {
            relativeMoves = this.knightPossibleMoves()
        } else if (this.type === BISHOP) {
            relativeMoves = this.bishopPossibleMoves()
        } else if (this.type === KING) {
            relativeMoves = this.kingPossibleMoves()
        } else if (this.type === QUEEN) {
            relativeMoves = this.queenPossibleMoves()
        } else{ console.log('Unknown type')
    };
    let absoluteMoves = [];
    for (let relativeMoves of relativeMoves) {
      const absoluteRow = this.row + relativeMoves[0];
      const absoluteCol = this.col + relativeMoves[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    };
    console.log(absoluteMoves)
    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
    }

     getPawnRelativeMoves() {
    
    return [[1, 0]];
  }

  getRookRelativeMoves() {
    let result = [];
    for (let i = 1; i < 8; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }
  getKnightRelativeMoves() {
    
    return [[1, 0]];
  }
 

        
    
      
       

    };

  







function getInitialBoard(x, type, c) {
    let result = [];
    result.push(new Piece(x, 0, 'rook', type))
    result.push(new Piece(x, 1, 'knight', type))
    result.push(new Piece(x, 2, 'bishop', type))
    result.push(new Piece(x, 3, 'king', type))
    result.push(new Piece(x, 4, 'queen', type))
    result.push(new Piece(x, 5, 'bishop', type))
    result.push(new Piece(x, 6, 'knight', type))
    result.push(new Piece(x, 7, 'rook', type))

    for (let i = 0; i < 8; i++) {
        result.push(new Piece(c, i, 'pawn', type))

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
    const table = document.createElement('table');
    div.appendChild(table);
    table.classList.add('board');


    for (let i = 0; i < 8; i++) {
        const row = document.createElement('tr');
        table.appendChild(row);


        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('td');
            row.appendChild(cell)
            cell.id = (i.toString() + ',' + j.toString())


            if (j % 2 === i % 2) {
                cell.classList.add('white')


            } else {
                cell.classList.add('black');

            }


            function onClickFunc(e) {
                  


                console.log(e.currentTarget);
                console.log(i, j)




                if (selectedCell !== undefined) {
                    selectedCell.classList.remove('selected')
                }

                selectedCell = e.currentTarget;
                cell.classList.add('selected')


                let chosenPiece;
                for (piece of pieces) {
                    if (i === piece.row && j === piece.col) {
                        chosenPiece = piece

                    }



                }
                console.log(chosenPiece)
            }
            cell.addEventListener('click', onClickFunc);




        }

    }

    pieces = getInitialBoard(0, typeWhite, 1);
    pieces.push(...getInitialBoard(7, typeBlack, 6));



    for (let piece of pieces) {
        getImg(table.rows[piece.row].cells[piece.col], piece.player, piece.type);

        
    }

}











window.addEventListener('load', createBoard);













