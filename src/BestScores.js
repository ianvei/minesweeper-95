import React from 'react'
import { FirebaseError } from 'firebase/app'
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';

import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function BestScores() {
    const auth = firebase.auth()
    const firestore = firebase.firestore()
    const gameScoreRef = firestore.collection('scores').where('uid', '==', auth.currentUser.uid).limit(10);
    const query = gameScoreRef.orderBy('text')
    const [individualScores] = useCollectionData(gameScoreRef, {idField: 'id'});

    return (
        <>
        
           <h1>Top 10 Scores</h1>
            {/* {console.log(scores)} */}
            {individualScores && individualScores.map(score => {
                    // console.log(query);
                    return(<p key={score.createdAt.seconds}>{score.displayName} {score.text}</p>)
                })}
        
            
        </>
    )

}

export default BestScores