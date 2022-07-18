import './App.css';
import GameBoard from './GameBoard';
import windowsLogo from './images/windowlogo.png'
import Leaderboard from './Leaderboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="main-screen">
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<GameBoard />} />
              <Route path='/leaderboard' element={<Leaderboard />}/>
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

export default App;
