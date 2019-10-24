import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from '../contexts/firebase';

class SignOutBase extends Component {

    logOut = event => {
        this.props.firebase.logOut();
    }

    render() {
        return (
            <Link to="/" className="log-out-link" onClick={this.logOut}>
                Sign Out
            </Link>
        );
    }
}

const SignOut = withRouter(withFirebase(SignOutBase));

export default SignOut;