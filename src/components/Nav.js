import { Link } from "react-router-dom";
// import '../style/nav.css'
import React from "react";
import { useState, useEffect } from "react"



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
              <li className="navLinks"> Welcome {user.username} </li>


              <li className="navLinks">
                <Link className="navLinks" to={"/profile"}>
                  Profile
                </Link>
              </li>
              <li className="navLinks">
                <Link className="navLinks" onClick={handleLogOut} to="/">
                  Sign Out
                </Link>
              </li>
            </ul>
         
          <div className="navLinks">

          </div>
        </nav>
      </div>
    );
  }
  let publicOptions = (
    
    <div className="welcomeNav">

      <nav className="navigation">
          <Link to="/register">Create Account</Link>
          <Link to="/login"> Login </Link>
          <Link to= "/game"> Draw! </Link>
      </nav>
      </div>
      )


      return (

        <header>

           { authenticated && user ? authenticatedOptions : publicOptions}
        </header>
      )
}

export default Nav