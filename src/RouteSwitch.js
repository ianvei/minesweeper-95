import './App.css';
import GameBoard from './GameBoard';
import windowsLogo from './images/windowlogo.png'
import Leaderboard from './Leaderboard';
import LogIn from './LogIn';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'


// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDcbGpd00mwCaUdTYeecCtvOnNWhLcubq4",
//   authDomain: "minesweeper95-eb7bb.firebaseapp.com",
//   projectId: "minesweeper95-eb7bb",
//   storageBucket: "minesweeper95-eb7bb.appspot.com",
//   messagingSenderId: "736483085558",
//   appId: "1:736483085558:web:3bd2ec09cac15387f130d7"
// };

firebase.initializeApp({
  apiKey: "AIzaSyDcbGpd00mwCaUdTYeecCtvOnNWhLcubq4",
  authDomain: "minesweeper95-eb7bb.firebaseapp.com",
  projectId: "minesweeper95-eb7bb",
  storageBucket: "minesweeper95-eb7bb.appspot.com",
  messagingSenderId: "736483085558",
  appId: "1:736483085558:web:3bd2ec09cac15387f130d7"
})

const auth = firebase.auth()
const firestore = firebase.firestore()


function RouteSwitch() {

  const [ user ] = useAuthState(auth);

  return (
    <div className="App">
      <div className="main-screen">
        <BrowserRouter>
          <Routes>
              <Route path='/' element={user? <GameBoard />: <LogIn />} />
              <Route path='/leaderboard' element={user? <Leaderboard />: <LogIn />}/>
          </Routes>
        </BrowserRouter>
        {/* <GameBoard /> */}
      </div>
      <div className="footer">
        <div className="start-button">
            <img src={windowsLogo} alt="windows logo" />
            <p>Start</p>
        </div>
    </div>
    </div>
  );
}

export default RouteSwitch;
