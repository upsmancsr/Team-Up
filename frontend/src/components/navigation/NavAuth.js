import React from 'react';
import { NavLink } from 'react-router-dom';
import SignOut from '../auth/SignOut';
import AccountNavMenu from './AccountNavMenu';

import styles from '../../scss/components/NavAuth.module.scss';

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
    <div className={styles.NavAuth}>
        {/* <div> */}
            {styledNavLink('/', 'Home', 'exact')}
            {styledNavLink('/myteams', 'My Teams')}
            <AccountNavMenu />
            <SignOut />
        {/* </div> */}
    </div>
);

export default NavAuth;