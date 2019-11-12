import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';             // Global Redux provider
// import ContextProviders from './ContextProviders';  // Specific Context providers
import store from './Redux/store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/contexts/firebase';
import axios from 'axios';

import './index.css';

// Set the base URL for axios requests:
axios.defaults.baseURL = 
  process.env.NODE_ENV === 'production'
    ? 'https://msights-auth2.herokuapp.com/'
    : 'http://localhost:5000';


ReactDOM.render(
  <Provider store={store}>
    {/* <ContextProviders> */}
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    {/* </ContextProviders> */}
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();