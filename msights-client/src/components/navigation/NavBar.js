import React from "react";
import { AuthUserContext } from '../contexts/session';
import NavAuth from './NavAuth';
import NavNonAuth from './NavNonAuth';

import './css/NavBar.css';

const NavBar = () => {
  return (
    <div className='nav-bar-container'>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <NavAuth /> : <NavNonAuth />
        }
      </AuthUserContext.Consumer>
    </div>
  );
};

export default NavBar;