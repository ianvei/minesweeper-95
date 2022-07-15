import React, { useEffect, useState } from 'react';

const Cell = ( { x, y, isMine, neighbors, testFunc, isRevealed, contextfunc, flag }) => {
    // let [flag, setFlag] = useState(false)

    const onClick = () => {
        console.log(x, y, isMine, neighbors, isRevealed)
        console.log(`flag is ${flag}`)
        
    }

    // const onContextMenu = (e) => {
    //     e.preventDefault();
    //     console.log('context')
    //     setFlag(flag = !flag)
    //     console.log(flag)
    //     console.log(isRevealed)
    //     console.log(neighbors)
    // }
    return (
        <div className={isRevealed? `cell revealed neighbor${neighbors}` : 'cell' } onClick={testFunc} onContextMenu={contextfunc}> {flag? 'flag' : isRevealed&&isMine? 'M' : isRevealed&&neighbors? neighbors: '' } </div>
        // {flag? 'flag' : isMine ? 'mine' : isRevealed? "revealed ": neighbors }
    )
    //isMine? 'mine' : 
}

export default Cell