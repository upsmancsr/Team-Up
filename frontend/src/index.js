import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from './components/contexts/firebase';
import axios from 'axios';

// Set the base URL for axios requests to localhost:5000:
axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();