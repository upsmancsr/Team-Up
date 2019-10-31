import React from 'react';
import { NavLink } from 'react-router-dom';
import SignOut from '../auth/SignOut';
import AccountMenu from './AccountMenu';

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

const NavAuth = (props) => (
    <div className='nav-auth-container'>
        <span>
            {styledNavLink('/', 'Home', 'exact')}
            {styledNavLink('/myteams', 'My Teams')}
            <AccountMenu />
            <SignOut />
        </span>
    </div>
);

export default NavAuth;