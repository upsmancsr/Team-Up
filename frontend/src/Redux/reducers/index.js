import { combineReducers } from 'redux';
import user from './user.js';
import teamNotes from './teamNotes.js';

export default combineReducers({
  user,
  teamNotes
});