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

    getPossibleMoves() {
        //apply on each hatha the currect possible move method and stores it in relativeMoves 
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
    //runs over all relativeMoves and adds each relativeMove row&col to hatha row&col and pushes to array
    let absoluteMoves = [];
    for (let relativeMove of relativeMoves) {
      const absoluteRow = this.row + relativeMove[0];
      const absoluteCol = this.col + relativeMove[1];
      absoluteMoves.push([absoluteRow, absoluteCol]);
    
    }; 
    //runs over absoluteMoves and pushes into array only moves in the board limits 
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
    
    //creating BoardData class to act as manager
    class BoardData{
        constructor(hatihot,){
            this.hatihot=hatihot
            
           
            
        }
        isEmpty(){
            selectedCell===undefined
        }
     
      
        
        getPiece(shora,amoda){
         
            for (let hatha of boardData.hatihot) {
                if (shora === hatha.row && amoda === hatha.col) {
                    return hatha
                    
                }
        } 
    };
        
    };
    //inserting getInitialBoard value into boardData.hatihot 
    boardData=new BoardData(getInitialBoard());
    boardData.getPiece()
  
   


    function onClickFunc(e,shora,amoda,cell) { 
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
              table.rows[x].cells[y].classList.remove('possibleMoves');
              table.rows[x].cells[y].classList.remove('selected');
              table.rows[x].cells[y].classList.remove('enemy');
            }
          }
       
        // if (selectedCell) {
        //     selectedCell.classList.remove('selected')
        // }
        //storing current clicked cell 
         selectedCell = e.currentTarget;
       //storing selected cells images
       const imgSelectedCell= selectedCell.firstElementChild
       
       selectedCell.classList.add('selected');
      //if no img doesnt enter function
    //    if (!imgSelectedCell) return;
    
  
        //removing 'possibleMoves class from each cell
        // for (let x = 0; x < 8; x++) {
        //     for (let y = 0; y < 8; y++) {
        //       table.rows[x].cells[y].classList.remove('possibleMoves');
            
        //     }
        //   }
     
          


      
      
        //goes over hatihot and gets a hatha if table row&col are the same as hatha object row&col
        // let chosenPiece;
        // for (let hatha of boardData.hatihot) {
        //     if (shora === hatha.row && amoda === hatha.col) {
        //         chosenPiece = hatha    
        //     }   
        // };
       const chosenPiece= boardData.getPiece(shora,amoda);
         //if chosen piece is true it enters the function
        // if (!chosenPiece) return

       //apply getPossibleMoves method on chosenPiece=(hatha in the condition of having a piece in it)
        
      
        
        if(chosenPiece){
          let showPossibleMoves = chosenPiece.getPossibleMoves();
          for (let possibleMove of showPossibleMoves){
            const cellPossibleMove= table.rows[possibleMove[0]].cells[possibleMove[1]];
            
        if (boardData.getPiece(possibleMove[0],possibleMove[1])===undefined){

          cellPossibleMove.classList.add('possibleMoves');
        }
        if(boardData.getPiece(possibleMove[0],possibleMove[1])!==undefined&&boardData.getPiece(possibleMove[0],possibleMove[1]).player!==boardData.getPiece(shora,amoda).player){

            cellPossibleMove.classList.add('enemy');
          
        }
         
           cellPossibleMove.addEventListener('click',(e)=>{movePieces(e,cellPossibleMove,shora,amoda,table,imgSelectedCell,selectedCell)
              
        });
          
          } 
        }
   
       
        

        
        
    }

    function movePieces(e,cellPossibleMove,shora,amoda,table,imgSelectedCell){
        // marked possible moves
     const currentTarget=e.currentTarget
     //possible moves with img
     const icon=currentTarget.firstElementChild
     
    //if the cell is full stop
    if(icon) return;
    
    //prints inside selected cell the img of the previous selected cell
    currentTarget.appendChild(imgSelectedCell);
   
       
         
    }
  
    






function getInitialBoard() {
    //creating hatihot and putting them in the right place
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
    const divNum=document.createElement('div')
    const divLetters=document.createElement('div')
    div.appendChild(divNum);
    div.appendChild(divLetters);
    divNum.className = 'numbers'
    divLetters.className = 'letters'
    let arr=['A','B','C','D','E','F','G','H']
     //inserting numbers
    for (let i = 1; i < 9; i++) {
    const innerDivNumbers=document.createElement('div')
    divNum.appendChild(innerDivNumbers);
    innerDivNumbers.innerText=i
    }//inserting letters
    for (let i = 0; i < arr.length; i++) {
        const innerDivLetters=document.createElement('div');
        divLetters.appendChild(innerDivLetters);
        innerDivLetters.innerText=arr[i]
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
            cell.addEventListener('click',(e)=> onClickFunc(e,shora,amoda,cell)); 

           


        }

    };
    
   
       //calling getImg for each hatha
    for (let hatha of boardData.hatihot) {
        getImg(table.rows[hatha.row].cells[hatha.col], hatha.player, hatha.type);
     
       
    } 
  



};


window.addEventListener('load',createBoard)





















