import React, { useEffect, useState } from 'react';
import flagImg from './images/flag.png'
import mineImg from './images/mine.png'


const Cell = ( { x, y, isMine, neighbors, testFunc, isRevealed, contextfunc, flag, win, startGame }) => {

    const onClick = () => {
        console.log(x, y, isMine, neighbors, isRevealed)
        console.log(`flag is ${flag}`)
        
    }

    return (
        <div style={{ pointerEvents: (isRevealed || win) ? 'none' : 'auto' }} className={isRevealed? `cell revealed neighbor${neighbors}` : 'cell' } onClick={function(event){ testFunc(); startGame()}} onContextMenu={contextfunc}> {flag? <img src={flagImg} alt="flag" /> : isRevealed&&isMine? <img src={mineImg} alt="mine"/>: isRevealed&&neighbors? neighbors: '' } </div>
    )
}

export default Cell