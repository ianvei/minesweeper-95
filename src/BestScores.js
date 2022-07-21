import React, { useEffect, useState } from 'react'
import { FirebaseError } from 'firebase/app'
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';

import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getDocs } from 'firebase/firestore';

function BestScores( { scores } ) {
    const [currentUserDocs, setCurrentUserDocs] = useState([]);
    
    const auth = firebase.auth()
    // const firestore = firebase.firestore()
    // const gameScoreRef = firestore.collection('scores');
    // const query = gameScoreRef.where('uid', '==', auth.currentUser.uid).orderBy('createdAt');
    // const [scores] = useCollectionData(query, {idField: 'id'});
    let tempLoop = 0;
    
    return (
        <>
        
           <h1>Your Top Times</h1>
            {console.log(scores)}
            {scores && scores.map(score => {
                    if(score.uid === auth.currentUser.uid){
                        tempLoop++
                        return(tempLoop <= 5? <p key={score.createdAt.seconds}>{score.displayName} - {score.text} Seconds</p> : '')
                    }
                    
                })}
        
            
        </>
    )

}

export default BestScores