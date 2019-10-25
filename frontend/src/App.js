import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withFirebase } from './components/contexts/firebase';
import { AuthUserContext } from './components/contexts/session';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/navigation/NavBar';
import LandingPage from './components/LandingPage';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
// import UserAccount from './components/UserAccount';
import MyTeams from './components/MyTeams';
import TeamDashboard from './components/TeamDashboard';
import { toggleAuthHeader, signOutUser } from './authUtilities';
import jwt_decode from "jwt-decode";
import './App.css';

const token = localStorage.jwtToken;
    if (token) {
      // Assign token to axios auth header:
      toggleAuthHeader(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Check for expired token
      const currentTime = Date.now() / 1000; // current time in milliseconds
      if (decoded.exp < currentTime) {
        // Sign out the user:
        signOutUser();
        // Redirect to the Sign In page:
        window.location.href = './signin';
      }
    }

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      authUser: null,
      idToken: null,
      loading: true
    };
  };

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // console.log('onAuthStateChange authUser:' + authUser);
        this.props.firebase.auth.currentUser.getIdToken()
          .then(idToken => {
            axios.defaults.headers.common['Authorization'] = idToken;
            this.setState({
              authenticated: true,
              authUser,
              loading: false
            });
          })
          .catch(error => {
            console.log(error.message);;
          })
      } else {
        this.setState({
          authenticated: false,
          authUser: null,
          loading: false
        });
      }
    });
  };

  componentWillUnmount() {
    this.listener();
  };

  render() {

    return (
      <AuthUserContext.Provider value={this.state.authUser}>
      <div className='App'>
        <Router>
          <NavBar />
          <Switch>
            <Route path='/' exact component={LandingPage}/>
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/signin' component={SignIn} />
            <PrivateRoute path='/myteams' component={MyTeams} authenticated={this.state.authenticated}/>
            <PrivateRoute path='/TeamDashboard/:teamId' component={TeamDashboard} authenticated={this.state.authenticated}/>
          </Switch>
        </Router>
      </div>
      </AuthUserContext.Provider>
    );
  };
};

const App = withFirebase(AppComponent);

export default App;
