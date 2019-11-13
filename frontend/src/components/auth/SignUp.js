import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { signUpUser } from '../../authUtilities';
import { withFirebase } from '../contexts/firebase';
import axios from 'axios';

import './css/auth.css';

class SignUpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
    }

    onChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    onSubmit = event => {
        const {
            email, 
            password, 
            firstName, 
            lastName, 
        } = this.state;

        this.props.firebase.createUser(email, password)
            .then(authUser => {
                console.log('authUser on sign up: ', authUser);
        
                this.props.firebase.auth.currentUser.getIdToken()
                    .then(idToken => {
                        axios.defaults.headers.common['Authorization'] = idToken;

                        const signUpData = { email, firstName, lastName };

                        axios.post('/api/users/signup', signUpData)
                            .then(signUpResponse => {
                                console.log('response from POST to /register', signUpResponse);
                                this.props.history.push({         
                                    pathname: "/myteams"
                                });
                            })
                            .catch(error => {
                                console.log(error.message);
                            })
                    })  
                    .catch(error => {                 // if Firebase getIdToken throws an error
                        this.setState({ 
                            error: error 
                        });
                    })
            })
            .catch(error => {                    // if Firebase createUser throws an error
                this.setState({ 
                    error: error 
                });
            });
        event.preventDefault();
    };
      
    render() {
        const { errors } = this.state;
        return (
            <div className='container'>
                <div className='row'>
                    <div>
                        <div>
                            <h4>
                                <b>Sign up</b> below
                            </h4>
                            <p>
                                Already have an account? <Link to='/signin'>Sign in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                    error={errors.firstName}
                                    id='firstName'
                                    type='text'
                                />
                                <label htmlFor='firstName'>First Name</label>
                            </div>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                    error={errors.lastName}
                                    id='lastName'
                                    type='text'
                                />
                                <label htmlFor='lastName'>Last Name</label>
                            </div>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id='email'
                                    type='email'
                                />
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id='password'
                                    type='password'
                                />
                                <label htmlFor='password'>Password</label>
                            </div>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id='password2'
                                    type='password'
                                />
                                <label htmlFor='password2'>Confirm Password</label>
                            </div>
                            <div>
                                <button
                                    type='submit'
                                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
  }
}

const SignUp = withFirebase(SignUpComponent);
export default SignUp;