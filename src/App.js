import logo from './logo.png';
import './App.css';
import GBETStats from './pages/statPage/GBETStats.component';
function App() {
  return (
    <div className='App'>
      <div className='g-header'>
        <div className='container'>
          <div className='logo-placement'>
            <div className='icon-logo'>
              <img src={logo} />
            </div>
            <div className='logo-text'>GBET Tracker</div>
          </div>
        </div>
      </div>
      <div className='bodyContainer'>
        <GBETStats />
      </div>
    </div>
  );
}

export default App;
