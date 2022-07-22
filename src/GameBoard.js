import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import deathImg from './images/death.png';
import neutralImg from './images/smile.png';
import winImg from './images/win.png'
import { Link } from 'react-router-dom';
import { FirebaseError } from 'firebase/app'
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Window from './Window';
import UserInfo from './UserInfo';
import arrowImg from './images/arrow.png'

const GameBoard = () => {
    const [dimension] = useState({
        width: 10,
        height: 10,
        mines: 10,
    })
    const [boardData, setBoardData] = useState([])
    const [startTime, setStartTime] = useState(false)
    const [revealedCells, setRevealedCells] = useState(0);
    const [flags, setFlags] = useState(0);
    const [timer, setTimer] = useState(0);
    const [finalScore, setFinalScore] = useState(0);
    const [stopTime, setStopTime] = useState(false)
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const [reset, setReset] = useState(false)
    const [endGame, setEndGame] = useState(false);

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [begin, setBegin] = useState(false);
    
    const auth = firebase.auth()
    const firestore = firebase.firestore()

    useEffect(() => {
        if(running) {
            const timer = setInterval(() => {
                setTime(time + 1);
            }, 1000);
            
            return () => {
                clearInterval(timer)
            }
        }

        
    }, [running, time]);


    const startGame = () => {
        // start the game
        if(!running) {
            setRunning(true)
        }
        
    }
    const startTimer = () => {
        setInterval(() => {
            setTimer(timer => timer + 1)
        }, 1000)
    }

    const stopTimer = () => {
        clearInterval(setTimer(0))
        // document.querySelector('#counter').remove()
    }

    useEffect(() => {
        setBoardData(boardArray())
        console.log('mounted')
        console.log(auth.currentUser)
        setReset(false)
    }, [reset])

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
        // setStartTime(true)
        console.log(startTime);
        if(oldBoard[i][j].isMine) {
            
            console.log('GAMEOVER')
            newBoard.map((row) => {return row.map((col) => {
                // setRevealedCells(revealedCells => revealedCells + 1)
                col.isFlag = false;
                return col.isRevealed = true;
            })})
            // setStopTime(true)
            setFinalScore(timer + 1)
            setLose(true);
            setRunning(false);
            // setBegin(false); 
            
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
            
            setBegin(true);
            setTimeout(() => floodFill(i, 0, j, 1, newBoard), 30);
            setTimeout(() => floodFill(i, 0, j, -1, newBoard), 30);
            setTimeout(() => floodFill(i, 1, j, 0, newBoard), 30);
            setTimeout(() => floodFill(i, -1, j, 0, newBoard), 30);
            setTimeout(() => floodFill(i, 1, j, 1, newBoard), 30);
            setTimeout(() => floodFill(i, -1, j, -1, newBoard), 30);
            setTimeout(() => floodFill(i, 1, j, -1, newBoard), 30);
            setTimeout(() => floodFill(i, -1, j, 1, newBoard), 30);    
        }

        newBoard[i][j].isRevealed = true;
        checkWin(newBoard);
        setStartTime(true);
        return setBoardData(newBoard);
    }

    const contextFunc = (col, boardData, e) => {
        e.preventDefault();
        const newBoard = [...boardData];
        let flagCount = 0;
        col.isFlag = !col.isFlag;

        newBoard.map((row) => {return row.map((col) => {
            if(col.isFlag) {
                flagCount += 1
                
            }
            if (col.flag && col.isMine) {
                flagCount += 1;
            }     
        })})

        console.log(revealedCells)
        setFlags(flagCount);
        checkWin(newBoard);
        return setBoardData(newBoard);
    }

    const checkWin = (newBoard) => {
        let count = 0
        newBoard.map((row) => {return row.map((col) => {
                if(col.isRevealed) {
                    count += 1
                }
            })})
        
        if(((dimension.width * dimension.height ) - count) === dimension.mines) {
            console.log(`it took ${time} seconds to win! congratulations!`)
            setStopTime(true);
            setWin(true);
            setFinalScore(time + 1);
            sendScore(time)
        }

        console.log(count)
    }

    const resetGame = () => {
        // setTimer(0)
        if(running || lose) {
            stopTimer()
            setReset(true);
            setBoardData([])
            
            setStartTime(false)
            setRevealedCells(0)
            setFlags(0)
        
            setFinalScore(0)
            // setStopTime(false)
            setWin(false)
            setLose(false)
            setTimer(0)
            setEndGame(true);
            setTime(0)
            setRunning(false);


            setStopTime(false);
            setWin(false);
            setFinalScore(0);
        }
        
    }

    const sendScore = async(time) => {
        const gameScoreRef = firestore.collection('scores');
        const { uid, displayName } = auth.currentUser;
        // console.log(auth)
        if(!auth.currentUser.isAnonymous){
            await gameScoreRef.add({
                text: time,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName
            })
        }
    } 
    

    return(
        <div className="game-screen">
            <div className="main">
            {/* <button onClick={resetGame}></button> */}
            <div className="score">
                <div className="flags">{flags}</div>
                <div className='smile' onClick={resetGame}>
                    <img src={lose? deathImg : win? winImg : neutralImg} alt=""/>
                </div>
                <div className="timer">{stopTime? finalScore: time}</div>
            </div>
            <div className="game-cont" style={{ pointerEvents: win || lose ? 'none' : 'auto' }}>
            {boardData.map((row) => {return row.map((col) => {   
                        return(
                            <Cell win={win} startGame={() => startGame()} x={col.x} y={col.y} isMine={col.isMine} flag={col.isFlag} contextfunc={(e) => contextFunc(col, boardData, e)}neighbors={col.neighbors} isRevealed={col.isRevealed} key={col.x + col.y} testFunc={() => floodFill(col.x, 0, col.y, 0, boardData)}/>
                        )
                    })}
                )}
            </div>
            </div>
            <div className="right-side">
                {!auth.currentUser.isAnonymous &&
                <div className='user-info'>
                    <Window contentComponent={<UserInfo />} nameOfClass="userInfoComponent" componentTitle='User Information'/>
                </div>}
                <div className='main-buttons'>
                    <Link to="/leaderboard"><button className='leaderboardButton'>Leaderboard <img src={arrowImg}/></button></Link>
                    <button onClick={() => auth.signOut()} className="logButton">{!auth.currentUser.isAnonymous? 'Log Out' : 'Log In'}</button>
                </div>
                

            </div>
            
        </div>
        
        
    )
    
}


export default GameBoard