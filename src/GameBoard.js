import React, { useEffect, useState } from 'react';
import Cell from './Cell';

const GameBoard = () => {
    const [dimension] = useState({
        width: 10,
        height: 10,
        mines: 10,
    })
    const [boardData, setBoardData] = useState([])

    useEffect(() => {
        setBoardData(boardArray())
        // generateMines()
        console.log('mounted')
    }, [])

    // useEffect(() => {
    //     console.log('board data changed!')
    //     generateMines()
    // }, [boardData])

    const boardArray = () => {
        const boardData = []
        for(let i = 0; i < dimension.width; i++){
            boardData.push([])
            for(let j = 0; j < dimension.height; j++) {
                boardData[i][j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    neighbors: 0,
                }
            }
        }
        
        generateMines(boardData)
        return getNeighbors(boardData)
    }

    const generateMines = (boardData) => {
        const mineNo = dimension.mines;
        // const newboardData = [...boardData]
        let minesPlanted = 0; 
            while (minesPlanted < mineNo) {
                const bombX = Math.floor(Math.random() * 10);
                const bombY = Math.floor(Math.random() * 10);
                if(boardData[bombX][bombY].isMine) {
                    console.log(
                        'duplicate!'
                    )
                }
                if(!boardData[bombX][bombY].isMine) {
                    
                    console.log(bombX, bombY)
                    boardData[bombX][bombY].isMine = true;
                    minesPlanted++
                }
            }

            console.log('dood')
            
        console.log(boardData)
        return boardData
        // generate number of mines to randomly place, keep trying 
    }

    const getNeighbors = (boardData) => {

        // const neighbors = []
        // console.log(boardData)
        console.log('neighbors')
        for(let i = 0; i < dimension.width; i++){
            
            for(let j = 0; j < dimension.height; j++) {
                // if(boardData[i + 1][j].x > dimension.width || boardData[i - 1][j].x < 0) {
                //     console.log('PROBLEM')
                //     continue
                // }
                // if(boardData[i][j + 1].y > dimension.width || boardData[i][j - 1].y< 0) {
                //     console.log('PROBLEM')
                //     continue
                // }

                // if(boardData[i+1][j].isMine) {
                //     console.log(boardData[i][j])
                // }
                if(boardData[i][j].isMine) {
                    // console.log(boardData[i][j].x + 1)
                    if((boardData[i][j].x + 1) >= dimension.height){ // issue: it skips completely if the bottom or top is wrong, should still allow one if correct
                        console.log(`x: ${boardData[i][j].x}`)
                        boardData[(i-1)][j].neighbors += 1
                        continue;

                    }

                    if((boardData[i][j].x - 1) < 0){
                        boardData[(i+1)][j].neighbors += 1
                        continue
                    }
                    if(((boardData[i][j].y + 1) >= dimension.width)) {
                        console.log(`y: ${boardData[i][j].y}`)
                        boardData[i][(j-1)].neighbors += 1
                        continue
                    }

                    if(((boardData[i][j].y - 1) < 0)) {
                        boardData[i][(j+1)].neighbors += 1
                        continue
                    }



                    boardData[(i+1)][j].neighbors += 1
                    boardData[(i-1)][j].neighbors += 1
                    boardData[i][(j+1)].neighbors += 1
                    boardData[i][(j-1)].neighbors += 1
                    console.log('hello')

                    // issue : also counting the same spot twice

                    // console.log(, i)
                    // if((boardData[(i+1)][(j)].x === undefined)  || (boardData[(i-1)][(j)].x === undefined)){
                    //     console.log("HAAHAH")
                    //     continue
                    // } else {
                    //     boardData[(i)][(j+1)].neighbors += 1
                    //     boardData[(i)][(j-1)].neighbors += 1
                    // }

                    // boardData[(i)][(j+1)].neighbors += 1
                    // boardData[(i)][(j-1)].neighbors += 1
                    // boardData[(i-1)][(j-1)].neighbors += 1
                    // boardData[(i+1)][(j+1)].neighbors += 1
                }
                // console.log(boardData[i][j])
                
            }
        }
        // console.log(boardData)
        return boardData
    }
// if(boardData[i+1][j].isMine || boardData[i-1][j].isMine || boardData[i][j+1].isMine || boardData[i][j-1].isMine || boardData[i-1][j-1].isMine || boardData[i+1][j+1].isMine || boardData[i+1][j-1].isMine || boardData[i-1][j+1].isMine) {
                //     boardData[i][j].neighbors += 1
                // }
    // const traverseDom = (boardspot)

    return(
        <div className="game-cont">
            {/* <button onClick={onPress}></button> */}
            {boardData.map((row) => {return row.map((col) => {
                
                // return (
                        return(
                            // <div key={col.x + col.y} class='cell'>{col.x}{col.y}</div>
                            <Cell x={col.x} y={col.y} isMine={col.isMine} neighbors={col.neighbors} key={col.x + col.y}/>
                        )
                // )
                    })}
                )}
        </div>
    )
    
}


export default GameBoard