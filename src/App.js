import logo from './logo.png';
import './App.css';
import GBETStats from './pages/statPage/GBETStats.component';
import Transaction from './pages/transactions/Transaction.component';

import { BrowserRouter, Route, Link, Switch, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='g-header'>
          <div className='container'>
            <div className='logo-placement'>
              <div className='icon-logo'>
                <img src={logo} />
              </div>
              <div className='logo-text'>GBET Tracker</div>
            </div>
            <div className='nav-itemsContainer'>
              <NavLink exact className='nav-item' activeClassName='selected' to='/'>
                Summary
              </NavLink>
              <NavLink exact className='nav-item' activeClassName='selected' to='/transfers'>
                Transactions
              </NavLink>
              <NavLink exact className='nav-item' activeClassName='selected' to='/holder'>
                Holders
              </NavLink>
            </div>
          </div>
        </div>

        <div className='bodyContainer'>
          <Switch>
            <Route path='/' exact component={GBETStats} />
            <Route path='/transfers' component={Transaction} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
