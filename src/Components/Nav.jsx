import React from 'react';
import { Link, Outlet } from "react-router-dom";
import "./Nav.css"

const Nav = () => {
  return (
    <div className="wholeSite">
      <div className="sideNav">
        <div className="sidenav">
          <div className='heading'>
            <h2>Brew Finder🍺</h2>
          </div>
          <div >
            <Link className="homeButton" to="/">
              <button className='tabs'>
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
};

export default Nav;