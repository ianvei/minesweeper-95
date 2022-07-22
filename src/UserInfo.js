import React from 'react'
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function UserInfo() {
const auth = firebase.auth()
  return (
    <div className='user-content'>
        <div>
        <p className='userWelcome'>Welcome:</p>
        <p className='userUserName'>{auth.currentUser.displayName}</p>
        </div>
        
        <img src={auth.currentUser.photoURL} alt="" />
    </div>
  )
}

export default UserInfo