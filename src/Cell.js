import React, { useEffect, useState } from 'react';

const Cell = ( { x, y, isMine, neighbors, testFunc, isRevealed }) => {
    let [flag, setFlag] = useState(false)

    const onClick = () => {
        console.log(x, y, isMine, neighbors, isRevealed)
        console.log(`flag is ${flag}`)
        
    }

    const onContextMenu = (e) => {
        e.preventDefault();
        console.log('context')
        setFlag(flag = !flag)
        console.log(flag)
        console.log(isRevealed)
    }
    return (
        <div className={isRevealed? 'cell revealed' : 'cell' } onClick={testFunc} onContextMenu={onContextMenu}>{isMine? 'mine': neighbors? neighbors:''}</div>
        // {flag? 'flag' : isMine ? 'mine' : isRevealed? "revealed ": neighbors }
    )
}

export default Cell