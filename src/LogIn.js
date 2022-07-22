import { FirebaseError } from 'firebase/app'
import React from 'react'

import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LogIn() {

    const auth = firebase.auth()

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    const signInAnon = () => {
        auth.signInAnonymously();
    }

    const signInWithEmail = () => {
        
    }

    return (
        <div className='login-buttons'>
            <button className='google-signin' onClick={signInWithGoogle}>Sign in with google</button>
            <button className='email-signin' onClick={signInWithEmail}>Sign in with email</button>
            <h1>or</h1>
            <button onClick={signInAnon}>Sign in as Guest</button>
        </div>
    )
}

export default LogIn