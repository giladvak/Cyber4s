let typeBlack='black'
    let typeWhite='white'
    let selectedCell;
    let pieces=[];
    let pieces1=[];





    class Piece { 
        constructor(row,col,type,player){
            this.row=row
            this.col=col
            this.type=type
            this.player=player
        }
        
      }
      function getInitialBoard(x,type,c){
          let result=[];
         result.push(new Piece(x,0, 'rook', type))
         result.push(new Piece(x,1, 'knight',type))
         result.push(new Piece(x,2, 'bishop', type))
         result.push(new Piece(x,3, 'king',type))
         result.push(new Piece(x,4, 'queen', type))
         result.push(new Piece(x,5, 'bishop',type))
         result.push(new Piece(x,6, 'knight', type))
         result.push(new Piece(x,7, 'rook',type))
        
         for (let i = 0; i < 8; i++) {
            result.push(new Piece(c,i,'pawn',type))
             
         }
          return result;
          
         
              
          
      }
 
    function getImg(cell,type,name){
        const img =  document.createElement('img');
        img.src = 'pawns/' + type + '/' + name + '.svg'
        img.classList.add('tool')
        cell.appendChild(img)
    }
    
    
    function createBoard(){
        
            const div = document.createElement('div');
             document.body.appendChild(div);
             div.className='outerBox'
        const table = document.createElement('table');
        div.appendChild(table);
        table.classList.add('board');
       
        for (let i = 0; i < 8; i++) {
            const row = document.createElement('tr');
            table.appendChild(row);
            
        
            for (let j = 0; j < 8; j++) {
            const cell=document.createElement('td');
            row.appendChild(cell)
            cell.id=(i.toString() + ',' +j.toString())
                if (j % 2 === i % 2) {
                    cell.classList.add('white')
                    
    
                } else {
                    cell.classList.add('black');

                } 
               

               
                    function removeColor(){
                        
                    } 
                    function changeEventColor(e){
                        console.log(e.currentTarget);
                        
                        if(selectedCell!==undefined){
                        selectedCell.classList.remove('selected')
                        }
                      
                        selectedCell=e.currentTarget;
                        cell.classList.add('selected')
                    }
                    cell.addEventListener('click',changeEventColor);
                   
                   
            }
              
            }       
                                                                                                    
                pieces=getInitialBoard(0,typeWhite,1);
                pieces.push(...getInitialBoard(7,typeBlack,6));
                
                
               
                for(let piece of pieces){
                    getImg(table.rows[piece.row].cells[piece.col],piece.player,piece.type);
                    
                } 
            }  
               
          
         
        
        
       
   
    

    
   
    window.addEventListener('load', createBoard);
   
   
   
   
   
    
  


   
    


  