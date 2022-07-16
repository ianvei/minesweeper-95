import './App.css';
import GameBoard from './GameBoard';
import windowsLogo from './images/windowlogo.png'

function App() {
  return (
    <div className="App">
      <div className="main-screen">
        <GameBoard />
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
