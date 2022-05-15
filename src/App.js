import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { CheckSession } from './services/auth'


import './App.css';
import Login from './components/Login';
import Nav from './components/Nav';
import Register from './components/Register';
import Game from './components/Game';
import Feed from './components/Feed';
import Profile from './components/Profile'


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
    console.log(user)
    setUser(null)
    toggleAuthenticated(false)

  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  },[])
  return (
    <div className="App">
      


      <Router>
      <Nav authenticated={authenticated} user = {user} handleLogOut = {handleLogOut}/>
      <Routes>

        <Route path="/login" exact element={<Login setUser={setUser} toggleAuthenticated={toggleAuthenticated} />} />
        <Route path="/register" exact element={<Register/>} />
        <Route path="/game" exact element={<Game/>} />
        <Route path="/" exact element={<Feed user={user}/>} />
        <Route path="/profile" exact element={<Profile user={user}/>} />

      </Routes>
      </Router>
    </div>
  );
}

export default App;
