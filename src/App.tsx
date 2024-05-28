import React from 'react';
import { useState } from 'react';
import { position } from './types';
import assert from 'assert';
import Modal from './modal';

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
  const [moves, setMoves] = useState(0);

  function moveStart(pos: position){
    const {row, col} = pos;
    const newToMove: position = {row: row, col: col};
    setToMove(newToMove);
  }

  function moveEnd(pos: position){
    const {row, col} = pos;
    assert(toMove);
    const canMove = checkMove(board[toMove.row][toMove.col], toMove.row, toMove.col, row, col);
    if(canMove){
      const newBoard = board;
      newBoard[row][col] = newBoard[toMove.row][toMove.col];
      newBoard[toMove.row][toMove.col] = '0';
      setBoard(newBoard);
    }
    setMoves((moves)=>{return moves+1;});
    setToMove(null);
  }

  function handleClick(pos: position){
    const {row, col} = pos;
    const selected:string = board[row][col];
    if(selected === 'W'){
      setToMove(null);
      return;
    }
    if(!toMove){
      if(selected === '0'){
        return;
      }
      moveStart(pos);
    }
    else{
      if(selected === '0'){
        moveEnd(pos);
      }
      else{
        if(toMove.row === row && toMove.col === col){
          setToMove(null);
        }
        else{
          moveStart(pos);
        }
      }
    }
  }
  
  function handleDrag(pos: position){
    const {row, col} = pos;
    const selected:string = board[row][col];
    if(selected === 'W'){
      setToMove(null);
      return;
    }
    if(selected === '0'){
      return;
    }
    moveStart(pos);
  }
  
  function handleDrop(pos: position){
    const {row, col} = pos;
    const selected: string = board[row][col];

    if(selected !== '0'){
      setToMove(null);
      return;
    }
    moveEnd(pos);
  }

  return (
    <div className='flex items-center justify-center mt-16'>
    <div>
      {
        board.map((value, row)=>{
          return(
            <div className='flex items-center'>
              {
            value.map((value, col) =>{
              return(
                <div onClick={() => {handleClick({row: row, col: col})}} onDragStart={() => {handleDrag({row: row, col: col})}} onDragOver={e => e.preventDefault()} onDrop={()=>{handleDrop({row: row, col: col})}}>
                {
                  value === 'W'?
                  <div className='w-16 lg:w-40 h-16 lg:h-40 bg-white'></div>
                  :
                  <div className={`w-16 lg:w-40 h-16 lg:h-40 ${ (row === 2 && col === 5) ? (toMove && row === toMove.row && col === toMove.col ? 'bg-selectedgoal': 'bg-goal'): (toMove && row === toMove.row && col === toMove.col)? (row+col)%2===0 ? 'bg-selectedlight' : 'bg-selecteddark': (row+col)%2===0 ? 'bg-light' : 'bg-dark'}`}>
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
    {
      board[2][5]==="M"
      ?
      <div>
        <Modal moves={moves}></Modal>
      </div>
      : 
      <div/>
    }
    </div>
  );
}

export default App;


