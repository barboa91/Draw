import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CheckSession } from './services/auth'


import './App.css';
import Login from './components/Login';
import Nav from './components/Nav';
import Register from './components/Register';
import Game from './components/Game';

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState({

    username:'',
    id:NaN
  })

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }


  const handleLogOut = () =>{
    setUser(null)
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  },[])
  return (
    <div className="App">
        <div>{user.username}</div>
      


      <Router>
      <Nav authenticated={authenticated} user = {user} handleLogOut = {handleLogOut}/>
      <Routes>

        <Route path="/login" exact element={<Login setUser={setUser} toggleAuthenticated={toggleAuthenticated} />} />
        <Route path="/register" exact element={<Register/>} />
        <Route path="/game" exact element={<Game/>} />


      </Routes>
      </Router>
    </div>
  );
}

export default App;
