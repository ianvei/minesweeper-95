import React, { useEffect, useState } from 'react';
import Cell from './Cell';

const GameBoard = () => {
    const [dimension] = useState({
        width: 10,
        height: 10,
        mines: 10,
    })
    const [boardData, setBoardData] = useState([])
    const [revealedCells, setRevealedCells] = useState(0);
    const [timer, setTimer] = useState(0);
    const [finalScore, setFinalScore] = useState(0);
    const [stopTime, setStopTime] = useState(false)

    useEffect(() => {

        if (stopTime) {
            setTimer(timer)
        } else {
            setTimeout(() => setTimer(timer + 1), 1000);
        }
        
        // update about every second
    },[timer])

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
        for(let i = 0; i < dimension.height; i++){
            boardData.push([])
            for(let j = 0; j < dimension.width; j++) {
                boardData[i][j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    isRevealed: false,
                    isFlag: false,
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
                }
                if(!boardData[bombX][bombY].isMine) {
                    boardData[bombX][bombY].isMine = true;
                    minesPlanted++
                }
            }

        return boardData
        // generate number of mines to randomly place, keep trying 
    }

    const getNeighbors = (boardData) => {
        for(let i = 0; i < dimension.width; i++){
            for(let j = 0; j < dimension.height; j++) {
                if(boardData[i][j].isMine) {
                    // console.log(boardData[i][j].x + 1)
                    if((boardData[i][j].x + 1) < dimension.height){ // top
                        boardData[(i+1)][j].neighbors += 1
                    }

                    if((boardData[i][j].x - 1) >= 0){ // bottom
                        boardData[(i-1)][j].neighbors += 1
                    }
                    if(((boardData[i][j].y + 1) < dimension.width)) { //right
                        boardData[i][(j+1)].neighbors += 1
                    }

                    if(((boardData[i][j].y - 1) >= 0)) { // left
                        boardData[i][(j-1)].neighbors += 1
                    }

                    if(((boardData[i][j].y - 1) >= 0) && ((boardData[i][j].x - 1) >= 0)) { // top left
                        boardData[i-1][(j-1)].neighbors += 1
                    }

                    if(((boardData[i][j].y + 1) < dimension.width) && ((boardData[i][j].x + 1) < dimension.height)) { // bottom right
                        boardData[i+1][(j+1)].neighbors += 1
                    }

                    if(((boardData[i][j].y + 1) < dimension.width) && ((boardData[i][j].x - 1) >= 0)) { // top right
                        boardData[i-1][(j+1)].neighbors += 1
                    }

                    if(((boardData[i][j].y - 1) >= 0) && ((boardData[i][j].x + 1) < dimension.height)) { // bottom right
                        boardData[i+1][(j-1)].neighbors += 1
                    }
                }
            }
        }
        return boardData
    }
    

    const floodFill = (i, iShift, j, jShift, oldBoard) => {
        const newBoard = [...oldBoard]

        if(oldBoard[i][j].isMine) {
            console.log('GAMEOVER')
            newBoard.map((row) => {return row.map((col) => {
                // setRevealedCells(revealedCells => revealedCells + 1)
                return col.isRevealed = true;
            })})
            return setBoardData(newBoard);
        } 

        if(newBoard[i][j].neighbors === 0){
                // error to fix: I think i need to check for the diagonals in the initial out of bounds check
            if ((newBoard[i][j].x + iShift) < 0 || (newBoard[i][j].x + iShift) >= dimension.width || (newBoard[i][j].y + jShift) < 0 || ((newBoard[i][j].y + jShift) >= dimension.height)) { // not in range
                return
            }
            if(newBoard[i+iShift][j+jShift].isMine) { // bomb
                return;
            }
            if(newBoard[i+iShift][j+jShift].neighbors) {
                setRevealedCells(oldRevealedCells => oldRevealedCells + 1) 
                newBoard[i+iShift][j+jShift].isRevealed = true;
                return;
            }
            
            if (newBoard[i+iShift][j+jShift].isRevealed) { // already revealed, no need to check again
                return;
            }
            newBoard[i+iShift][j+jShift].isRevealed = true;
            setBoardData(newBoard);
            i = i+iShift;
            j = j+jShift;

            setTimeout(() => floodFill(i, 0, j, 1, newBoard), 30);
            setTimeout(() => floodFill(i, 0, j, -1, newBoard), 30);
            setTimeout(() => floodFill(i, 1, j, 0, newBoard), 30);
            setTimeout(() => floodFill(i, -1, j, 0, newBoard), 30);
            setTimeout(() => floodFill(i, 1, j, 1, newBoard), 30);
            setTimeout(() => floodFill(i, -1, j, -1, newBoard), 30);
            setTimeout(() => floodFill(i, 1, j, -1, newBoard), 30);
            setTimeout(() => floodFill(i, -1, j, 1, newBoard), 30);





            // floodFill(i, 0, j, 1, newBoard);
            // floodFill(i, 0, j, -1, newBoard);
            // floodFill(i, 1, j, 0, newBoard);
            // floodFill(i, -1, j, 0, newBoard);
            // floodFill(i, 1, j, 1, newBoard);
            // floodFill(i, -1, j, -1, newBoard);
            // floodFill(i, 1, j, -1, newBoard);
            // floodFill(i, -1, j, 1, newBoard);      
        }

        newBoard[i][j].isRevealed = true;
        // setRevealedCells(oldRevealedCells => oldRevealedCells + 1)

        
        // newBoard.map((row) => {return row.map((col) => {
        //     if(col.isRevealed) {
        //         setRevealedCells(revealedCells => revealedCells + 1)
        //     }
        // })})

        

        checkWin(newBoard);
        // console.log(`revealed cells: ${revealedCells}`)
        return setBoardData(newBoard);
    }

    const contextFunc = (col, boardData, e) => {
        e.preventDefault();
        const newBoard = [...boardData];
        let flagCount = 0;
        col.isFlag = !col.isFlag;

        newBoard.map((row) => {return row.map((col) => {
            if (col.flag && col.isMine) {
                flagCount += 1;
            }     
        })})

        // if (flagCount === 10) {
        //     console.log('you win!')
        //     newBoard.map((row) => {return row.map((col) => {
        //         col.isRevealed = true;
        //     })})
        // }
        // newBoard.map((row) => {return row.map((col) => {
        //     if(col.isRevealed) {
        //         setRevealedCells(revealedCells => revealedCells + 1)
        //     }
        // })})
        console.log(revealedCells)
        checkWin(newBoard);
        return setBoardData(newBoard);
    }

    const checkWin = (newBoard) => {
        // if(((dimension.width * dimension.height ) - revealedCells) === dimension.mines) {
        //     console.log('you win!')
        // }
        let count = 0
        newBoard.map((row) => {return row.map((col) => {
                if(col.isRevealed) {
                    count += 1
                }
            })})
        
        if(((dimension.width * dimension.height ) - count) === dimension.mines) {
            console.log(`it took ${timer} seconds to win! congratulations!`)
            setStopTime(true)
            setFinalScore(timer + 1)
        }

        console.log(count)
    }

    return(
        <div className="main">
            {/* <div className="timer">{timer}</div>
            <div className="score">{stopTime? finalScore : ''}</div> */}
            <div className="score">
                <div className="flags">10</div>
                <div className="smile"></div>
                <div className="timer">{stopTime? finalScore: timer}</div>
            </div>
            <div className="game-cont">
            {boardData.map((row) => {return row.map((col) => {   
                        return(
                            <Cell x={col.x} y={col.y} isMine={col.isMine} flag={col.isFlag} contextfunc={(e) => contextFunc(col, boardData, e)}neighbors={col.neighbors} isRevealed={col.isRevealed} key={col.x + col.y} testFunc={() => floodFill(col.x, 0, col.y, 0, boardData)}/>
                        )
                    })}
                )}
        </div>
        </div>
        
    )
    
}


export default GameBoard