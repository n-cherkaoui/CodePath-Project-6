import React from 'react';

const Header = (count) => (
  <div className="header-blocks">
    <div className='blocks'>
        <h4>State</h4>
        <h4>Florida, USA</h4>
    </div>
    <div className='blocks'>
        <h4>Total Breweries</h4>
        <h4>{count.input}</h4>
    </div>
    <div className='blocks'>
        <h4>Most Common</h4>
        <h4>{count.input2.toUpperCase()}</h4>
    </div>
  </div>
);

export default Header;