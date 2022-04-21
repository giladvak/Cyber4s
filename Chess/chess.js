let typeBlack = 'black'
let typeWhite = 'white'
let selectedCell;
let pieces = [];
let boardData;
let table;

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
             relativeMoves = this.pawnPossibleMoves()
             
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
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
     
    }; 
    let filteredMoves = [];
    for (let absoluteMove of absoluteMoves) {
      const absoluteRow = absoluteMove[0];
      const absoluteCol = absoluteMove[1];
      if (absoluteRow >= 0 && absoluteRow <= 7 && absoluteCol >= 0 && absoluteCol <= 7) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
    }; 
   
     pawnPossibleMoves() {

        
             if(this.row===1){
         return[[1, 0],[2,0]]
     }else if(this.row===6){
         return[[-1, 0],[-2,0]]
      } else if (this.player===typeWhite){
    
    return [[1, 0]]
}else if(this.player===typeBlack){
    return [[-1,0]]


}
  };

 rookPossibleMoves() {
    let result = [];
    for (let i = 1; i < 8; i++) {
      result.push([i, 0]);
      result.push([-i, 0]);
      result.push([0, i]);
      result.push([0, -i]);
    }
    return result;
  }
  knightPossibleMoves() {
let result=[];

   
    for (let j = 1; j <2; j++) {
        let i=2
        result.push([i, j]);
        result.push([i, -j]);
        result.push([j, i]);
        result.push([j, -i]);
        result.push([-i, -j]);
        result.push([-i, j]);
        result.push([-j, -i]);
        result.push([-j, i]);
        
      
      
    
    }
 
return result;

  }
  bishopPossibleMoves(){
    let result = [];
    let j=0
    for (let i = 0; i < 8; i++&j++) {
        result.push([i, j]);
        result.push([i, -j]);
        result.push([-i, -j]);
        result.push([-i, j]);
     
       
    } 
    return result;
    
  };
  queenPossibleMoves(){
    let result = [];
    let j=0
    for (let i = 0; i < 8; i++&j++) {
        result.push([i, j]);
        result.push([i, -j]);
        result.push([-i, -j]);
        result.push([-i, j]);
        
       
    } 
    for (let i = 1; i < 8; i++) {
        result.push([i, 0]);
        result.push([-i, 0]);
        result.push([0, i]);
        result.push([0, -i]);
      }
    return result;
   

  };
  kingPossibleMoves(){
 return [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];

  }
    

    };
    class BoardData{
        constructor(hatihot){
            this.hatihot=hatihot
        }
        
        
    }
    boardData=new BoardData(getInitialBoard());
   
    


    function onClickFunc(e,row,col,cell) { //defining func setting parameters
                  
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
              table.rows[x].cells[y].classList.remove('possibleMoves');
            }
          }
          

        console.log(e.currentTarget);
      console.log(row,col)


        let chosenPiece;
        for (let hatha of boardData.hatihot) {
            if (row === hatha.row && col === hatha.col) {
                chosenPiece = hatha
                
            }
         
        };
        if (chosenPiece){

       
        let showPossibleMoves = chosenPiece.getPossibleMoves();
        
        
              for (let possibleMove of showPossibleMoves){
              table.rows[possibleMove[0]].cells[possibleMove[1]].classList.add('possibleMoves');
              
        }}  console.log(chosenPiece)
        
        
        

        if (selectedCell) {
            selectedCell.classList.remove('selected')
        }

        selectedCell = e.currentTarget;
        cell.classList.add('selected')
    };
  







function getInitialBoard() {
    
   let result=[];
   let container=[ROOK,KNIGHT,BISHOP,KING,QUEEN,BISHOP,KNIGHT,ROOK];
   for (let i = 0; i < container.length; i++) {
    result.push(new Piece(0, i, container[i], typeBlack))
    result.push(new Piece(7, i, container[i], typeWhite))
    result.push(new Piece(6, i, PAWN, typeWhite))
    result.push(new Piece(1, i, PAWN, typeBlack))
   }
   console.log(result)
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
    const divNum=document.createElement('div')
    const divLetters=document.createElement('div')
    div.appendChild(divNum);
    div.appendChild(divLetters);
    divNum.className = 'numbers'
    divLetters.className = 'letters'
    let arr=['A','B','C','D','E','F','G','H']

    for (let i = 1; i < 9; i++) {
    const innerDivNumbers=document.createElement('div')
    divNum.appendChild(innerDivNumbers);
    innerDivNumbers.innerText=i
    }
    for (let i = 0; i < arr.length; i++) {
        const innerDivLetters=document.createElement('div');
        divLetters.appendChild(innerDivLetters);
        innerDivLetters.innerText=arr[i]
        }
     table = document.createElement('table');
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
            

              //event explenation
            //  function clickH(e){
            //     onClickFunc(e,i,j,cell,table)
            //  }
            cell.addEventListener('click',(e)=> onClickFunc(e,i,j,cell)); //calling function insert values




        }

    }
    
   
    



    for (let piece of boardData.hatihot) {
        getImg(table.rows[piece.row].cells[piece.col], piece.player, piece.type);

        
    }

}











window.addEventListener('load', createBoard);













