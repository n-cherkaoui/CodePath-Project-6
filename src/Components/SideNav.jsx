import React from 'react';

const SideNav = () => (
  <div className="sidenav">
    <div className='heading'>
      <h2>Brewery Stop🍺</h2>
    </div>
    <div >
        <button className='tabs'>🏠Dashboard</button>
        <button className='tabs'>🔍Search</button>
        <button className='tabs'>ℹ️ About</button>
    </div>
  </div>
);

export default SideNav;