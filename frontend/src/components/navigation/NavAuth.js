import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
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

const NavAuth = (props) => (
    <div className='nav-auth-container'>
        <span>
            {styledNavLink('/', 'Home', 'exact')}
            {styledNavLink('/myteams', 'My Teams')}
            {props.user.firstName}
            <SignOut />
        </span>
    </div>
);

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    null
)(NavAuth);