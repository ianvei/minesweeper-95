import React, { useEffect, useState } from 'react';
import menuImg from './images/hello.png'
import { Link } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where } from "firebase/firestore";

const ExampleContent = ( ) => {
    const auth = firebase.auth()
    const firestore = firebase.firestore()
    const gameScoreRef = firestore.collection('scores');
    const query = gameScoreRef.orderBy('text').limit(10);
    const [scores] = useCollectionData(query, {idField: 'id'});
    

    return (
        <>
        
           <h1>Global top 10 Times</h1>
           <div className='leaderboardInfo'>
                <h3 className='rank'>Rank</h3>
                <h3 className='username'>Username</h3>
                <h3 className='leaderboardScore'>Score</h3>
                <h3 className='date'>Date</h3>

           </div>
            {/* {console.log(scores)} */}
            <div className='leaderboardMain'>
            {scores && scores.map((score, index) => {
                function removeFirstWord(str) {
                    const indexOfSpace = str.indexOf(' ');
                  
                    if (indexOfSpace === -1) {
                      return '';
                    }
                  
                    return str.substring(indexOfSpace + 1);
                  }
                    console.log(scores);
                    let time = {
                        seconds: score.createdAt.seconds,
                        nanoseconds: score.createdAt.nanoseconds,
                      }
                      
                      const fireBaseTime = new Date(
                        time.seconds * 1000 + time.nanoseconds / 1000000,
                      );
                      const date = fireBaseTime.toDateString();
                      const atTime = fireBaseTime.toLocaleTimeString();
                    return(<div className='leaderboardContent'>
                        {console.log(index)}
                        <div className='leaderboardEntry'>
                            <p className='rank'>{index + 1}</p>
                            <p key={score.uid} className='username'>{score.displayName}</p>
                            <p className='leaderboardScore' key={score.createdAt.seconds}>{score.text} Seconds</p>
                            {console.log (score)}
                            <p className='date'>{removeFirstWord(date)}</p>
                        </div>
                        {index < 9? <hr />: ''}
                        </div>)
                })}
            </div>
            
        
            
        </>
    )
}

export default ExampleContent