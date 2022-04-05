import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Nav } from './components/Nav';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { CreateBug } from './components/CreateBug';
import { Edit } from './components/Edit';
import './App.css';

function App() {
  // define whether logged in
  const {auth} = useSelector(state => state);

  const [navShown, setNavShown] = useState(false);

  const handleClick = () => {
    setNavShown(!navShown)
    console.log(navShown)
  }

  return (
    <div className='app'>
      <Router>
      {auth.loggedIn && <Nav navShown={navShown} />}
      {auth.loggedIn && <div className='hamburger' onClick={handleClick}>Ham</div>}
      <Routes>
        <Route path='/' element={!auth.loggedIn ? <Login /> : <Home />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/createBug' element={<CreateBug />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
