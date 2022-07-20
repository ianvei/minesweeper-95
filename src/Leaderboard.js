import React, { useEffect, useState } from 'react';
import Window from './Window';
import ExampleContent from './ExampleContent';
import { Link } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Leaderboard = ( ) => {

    const auth = firebase.auth()
    const firestore = firebase.firestore()
    const gameScoreRef = firestore.collection('scores');
    const query = gameScoreRef.orderBy('createdAt').limit(25);
    const [scores] = useCollectionData(query, {idField: 'id'});

    return (
        <div className='leaderboard'>
            <Window contentComponent={<ExampleContent />} nameOfClass="leaderboardcont" componentTitle='Leaderboard'/>
            <button><Link to="/">Back to Game</Link></button>
        </div>
    )
}

export default Leaderboard