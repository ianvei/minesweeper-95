import React, { useEffect, useState } from 'react';

const Cell = ( { x, y, isMine, neighbors }) => {
    let [flag, setFlag] = useState(false)

    const onClick = () => {
        console.log(x, y, isMine, neighbors)
        console.log(`flag is ${flag}`)
        
    }

    const onContextMenu = (e) => {
        e.preventDefault();
        console.log('context')
        setFlag(flag = !flag)
        console.log(flag)
    }
    return (
        <div className='cell' onClick={onClick} onContextMenu={onContextMenu}>{flag? 'flag' : isMine ? 'mine' : neighbors }</div>
    )
}

export default Cell