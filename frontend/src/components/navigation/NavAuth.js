import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SignOut from '../auth/SignOut';

const styledNavLink = (route, name) => {
    return (
      <NavLink 
        to={route}
        className='navlink'
        activeStyle={{ color: 'blue' }}
        exact
      >
        {name}
      </NavLink>
    )
};

const NavAuth = () => (
    <div className='nav-auth-container'>
        <span>
            {styledNavLink('/', 'Home', 'exact')}
            {styledNavLink('/myteams', 'My Teams')}
            <SignOut />
        </span>
    </div>
);

export default NavAuth;