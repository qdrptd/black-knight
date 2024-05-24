import React from 'react';
import { useState } from 'react';
import { position } from './types';
import { isElementAccessExpression } from 'typescript';
import assert from 'assert';

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

  function moveStart(x: number, y: number){
    const newToMove: position = {x: x, y: y};
    setToMove(newToMove);
  }

  function moveEnd(x: number, y: number){
    assert(toMove);
    const canMove = checkMove(board[toMove.x][toMove.y], toMove.x, toMove.y, x, y);
    if(canMove){
      const newBoard = board;
      newBoard[x][y] = newBoard[toMove.x][toMove.y];
      newBoard[toMove.x][toMove.y] = '0';
      setBoard(newBoard);
    }
    setToMove(null);
  }

  function handleClick(pos: position){
    const {x, y} = pos;
    const selected:string = board[x][y];
    if(selected === 'W'){
      setToMove(null);
      return;
    }
    if(!toMove){
      if(selected === '0'){
        return;
      }
      moveStart(x, y);
    }
    else{
      if(selected === '0'){
        moveEnd(x, y);
      }
      else{
        if(toMove.x === x && toMove.y === y){
          setToMove(null);
        }
        else{
          moveStart(x, y);
        }
      }
    }
  }
  
  function  handleDrag(pos: position){
    const {x, y} = pos;
    const selected:string = board[x][y];
    if(selected === 'W'){
      setToMove(null);
      return;
    }
    if(selected === '0'){
      return;
    }
    moveStart(x, y);
  }
  
  function handleDrop(pos: position){
    const {x, y} = pos;
    const selected: string = board[x][y];

    if(selected === 'W'){
      return;
    }
    moveEnd(x, y);
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
                <div onClick={() => {handleClick({x: x, y: y})}} onDragStart={() => {handleDrag({x: x, y: y})}} onDragOver={e => e.preventDefault()} onDrop={()=>{handleDrop({x: x, y: y})}}>
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


