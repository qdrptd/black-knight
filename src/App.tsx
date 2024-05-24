import React from 'react';
import { useState } from 'react';
import { position } from './types';

function checkMove(piece: string, x1: number, y1: number, x2: number, y2: number){
  const dx: number = Math.abs(x2-x1), dy: number = Math.abs(y2-y1);
  if(piece === "R"){
    if((dx === 0 && dy === 1) || (dx === 1 && dy ===0)){
      return true;
    }
    return false;
  }
  if(piece === "B"){
    if(dx === 1 && dy === 1){
      return true;
    }
    return false;
  }
  if(piece === "M" || piece === "N"){
    if((dx === 1 && dy === 2) || (dx === 2 && dy === 1)){
      return true;
    }
    return false;
  }
}


function App() {
  const [board, setBoard] = useState([['M', 'B', 'B', 'B', 'B', 'R'],
                                      ['N', 'N', 'N', 'N', 'R', 'R'],
                                      ['W', 'W', 'W', 'W', 'R', '0']])
  const [toMove, setToMove] = useState<position | null>(null)
  function clickEvent(x: number ,y: number){
    const selected:string = board[x][y];
    if(selected === 'W') return;

    if(!toMove){
      if(selected === '0'){
        return;
      }
      const newToMove: position = {x: x, y: y};
      setToMove(newToMove);
    }
    else{
      if(selected === '0'){
        const canMove = checkMove(board[toMove.x][toMove.y], toMove.x, toMove.y, x, y);
        if(canMove){
          const newBoard = board;
          newBoard[x][y] = newBoard[toMove.x][toMove.y];
          newBoard[toMove.x][toMove.y] = '0';
          setBoard(newBoard);
          setToMove(null);
        }
      }
      else{
        if(toMove.x === x && toMove.y === y){
          setToMove(null);
        }
        else{
          const newToMove: position = {x: x, y: y};
          setToMove(newToMove);
        }
      }
    }
  }
  
  return (
    <div className='flex items-center justify-center mt-16'>
    <div>
      {
        board.map((value, x)=>{
          return(
            <div className='flex items-center'>
              {
            value.map((value, y) =>{

              return(
                <div onClick={() => {clickEvent(x, y)}}>
                {
                  value === 'W'?
                  <div className='w-40 h-40 bg-white'></div>
                  :
                  <div className={`w-40 h-40 ${ (toMove && x === toMove.x && y === toMove.y)? (x+y)%2===0 ? 'bg-selectedlight' : 'bg-selecteddark': (x+y)%2===0 ? 'bg-light' : 'bg-dark'}`}>
                    {
                      value === '0'?
                      <div/>
                      :
                      <img src={`${value}.svg`} alt='mm..' className='w-full h-full'></img>
                    }
                    
                  </div>
                }
                </div>
              )
            })
          }
            <br/>
            </div>
          )
        })
      }
    </div>
    </div>
  );
}

export default App;


