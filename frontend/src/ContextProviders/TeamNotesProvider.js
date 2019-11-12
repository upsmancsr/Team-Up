import React, { useReducer, createContext } from 'react';
import { reducer, initialState } from './reducers/teamNotes.js';
import axios from 'axios';

export const TeamNotesContext = createContext();

export function TeamNotesProvider(props) {
  const { Provider } = TeamNotesContext;

  const [state, dispatch] = useReducer(reducer, initialState);

  const getState = teamId => {
    if (!state.notes.length) {
      axios
        .get(`api/notes/${teamId}`)
        .then(res => dispatch({ type: 'SET_NOTES', payload: res.data }));
    }
    return [state, dispatch];
  };

  return <Provider value={getState}>{props.children}</Provider>;
}