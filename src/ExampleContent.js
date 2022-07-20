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
        
           <h1>Top 10 Scores</h1>
            {/* {console.log(scores)} */}
            {scores && scores.map(score => {
                    console.log(scores);
                    return(<p key={score.createdAt.seconds}>{score.displayName} {score.text}</p>)
                })}
        
            
        </>
    )
}

export default ExampleContent