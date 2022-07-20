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
import UserInfo from './UserInfo';
import BestScores from './BestScores';

const Leaderboard = ( ) => {

    const auth = firebase.auth()
    const firestore = firebase.firestore()
    const gameScoreRef = firestore.collection('scores');
    const query = gameScoreRef.orderBy('createdAt').limit(25);
    const [scores] = useCollectionData(query, {idField: 'id'});

    return (
        <div className='leaderboard'>
            <div className='leaderboard-left'>
                <Window contentComponent={<ExampleContent />} nameOfClass="leaderboardcont" componentTitle='Leaderboard'/>
                <button><Link to="/">Back to Game</Link></button>
            </div>
            
            {!auth.currentUser.isAnonymous &&
                <div className='user-info leaderboard-user'>
                    <Window contentComponent={<UserInfo />} nameOfClass="userInfoComponent" componentTitle='User Information'/>
                    <Window contentComponent={<BestScores />} nameOfClass="userInfoComponent" componentTitle='User Information'/>
                </div>}
        </div>
    )
}

export default Leaderboard