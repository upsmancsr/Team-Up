import React from 'react';
import { connect } from 'react-redux';

const AccountMenu = () => {
    return (
        <p>Account Menu</p>
    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    null
)(AccountMenu);
