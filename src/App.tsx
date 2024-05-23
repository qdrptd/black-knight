import React from 'react';
import { useState } from 'react';

function App() {
  const [board, setBoard] = useState([['M', 'B', 'B', 'B', 'B', 'R'],
                                      ['N', 'N', 'N', 'N', 'R', 'R'],
                                      ['W', 'W', 'W', 'W', 'R', '0']])
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
                <div>
                {
                  value === 'W'?
                  <div className='w-40 h-40 bg-white'></div>
                  :
                  <div className={`w-40 h-40 ${(x+y)%2==0 ? 'bg-light' : 'bg-dark'}`}>
                    {
                      value === '0'?
                      <div/>
                      :
                      <img src={`${value}.svg`} className='w-full h-full'></img>
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
