import React from 'react';
import { Link, Outlet } from "react-router-dom";
import "./Nav.css"

const Nav = () => {
  return (
    <div className="wholeSite">
      <div className="sidenav">
        <div className='heading'>
          <h2>Brewery Stop🍺</h2>
        </div>
        <div >
          <button className='tabs'>
            <Link href="/">
              Home
            </Link>
          </button>
          <button className='tabs'>Search</button>
          <button className='tabs'>About</button>
        </div>
      </div>
      <Outlet />
    </div>
  )
};

export default Nav;