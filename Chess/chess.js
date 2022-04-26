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






boardData = new BoardData(getInitialBoard(),typeWhite);
boardData.getPiece()




function onClickFunc(e, shora, amoda) {

 boardData.clearClasses(shora,amoda)
  selectedCell = e.currentTarget;

  const imgSelectedCell = selectedCell.firstElementChild
 


  const chosenPiece = boardData.getPiece(shora, amoda)
  if (chosenPiece) {
    selectedCell.classList.add('selected');

    let showPossibleMoves = chosenPiece.getPossibleMoves(boardData);

    for (let possibleMove of showPossibleMoves) {
      const cellPossibleMove = table.rows[possibleMove[0]].cells[possibleMove[1]];
     
      const possiblePiece = boardData.getPiece(possibleMove[0], possibleMove[1]);
      
      if (possiblePiece === undefined) {

        cellPossibleMove.classList.add('possibleMoves');
      }
      if (possiblePiece !== undefined && possiblePiece.player !== boardData.getPiece(shora, amoda).player) {

        cellPossibleMove.classList.add('enemy');
      }
      
      cellPossibleMove.addEventListener('click', (e) => { movePieces(e, cellPossibleMove, shora, amoda, table, imgSelectedCell, selectedCell,possibleMove)

      });

    }
  }






}


function movePieces(e,shora, amoda,imgSelectedCell,selectedCell,possibleMove) {
  
 let chosenPiece= boardData.getPiece(shora, amoda)

   selectedCell = e.currentTarget
  
  let updateRow = (selectedCell.id[0])*1
  let updateCol = (selectedCell.id[2])*1
  if(chosenPiece===undefined) return;
  chosenPiece.row = updateRow;
  chosenPiece.col = updateCol;
let secondPlayer=  boardData.getPiece(possibleMove[0],possibleMove[1])
  
  const icon = selectedCell.firstElementChild
  if(secondPlayer.player!==chosenPiece.player){
   boardData.removePiece(possibleMove[0],possibleMove[1])
   selectedCell.firstElementChild.remove()
   selectedCell.appendChild(imgSelectedCell)
   chosenPiece.row=possibleMove[0]
   chosenPiece.col=possibleMove[1]
   


   
  }

  if (icon) return;


  selectedCell.appendChild(imgSelectedCell);
  console.log(boardData.getPiece(shora,amoda))
  console.log(boardData)
  if(boardData.currentPlayer===typeWhite){
    boardData.currentPlayer=typeBlack
  }else{
    boardData.currentPlayer=typeWhite
  }
}








function getInitialBoard() {

  let result = [];
  let container = [ROOK, KNIGHT, BISHOP, KING, QUEEN, BISHOP, KNIGHT, ROOK];
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





















