import { Link } from "react-router-dom";
// import '../style/nav.css'
import React from "react";
import { useState, useEffect } from "react"
import '../style/nav.css'



const Nav = ({ authenticated, user, handleLogOut }) => {

  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)


//   const toggleNav = () => {
//     setToggleMenu(!toggleMenu)
//   }

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', changeWidth)

    // cleanup function //
    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  }, [])

  let authenticatedOptions
  if (user){ 
    authenticatedOptions = (
      <div className="header">
        <nav className="navigation">
        
            <ul className="list">
              <li className="navLinks">
                {" "}
                <Link to="/">
                  <div className="logo-wrapper" alt="logo">
                    {/* <img className="logo" src={Logo} alt="ITB Logo" /> */}

                    HOME
                  </div>
                </Link>
              </li>


              <li className="navLinks">Welcome 
                <Link className="navLinks" to={"/profile"}>
                {user.id}
                </Link>
              </li>
              <li className="navLinks">
                <Link className="navLinks" onClick={handleLogOut} to="/">
                  Sign Out
                </Link>
              </li>
          <Link to= "/game"> Draw! </Link>
              <li></li>
            </ul>
         

        </nav>
      </div>
    );
  }
  let publicOptions = (
    <div className="welcomeNav">
      <nav className="navigation">
        <ul className="list">
          <li className="navLinks">
            <Link to="/register">Create Account</Link>
          </li>
          <li className="navLinks">
            <Link to="/login"> Login </Link>
          </li>
          <li className="navLinks">
            <Link to="/game"> Draw! </Link>
          </li>
        </ul>
      </nav>
    </div>
  );


      return (

        <header>

           { authenticated && user ? authenticatedOptions : publicOptions}
        </header>
      )
}

export default Nav