import axios from 'axios';

const initialState = {
    notes: []
};
  
const SET_TEAM_NOTES = 'SET_TEAM_NOTES';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TEAM_NOTES:
            return { 
                ...state, 
                notes: action.payload
            };
        default:
            return state;
    }
};

export const getTeamNotes = teamId => async dispatch => {
    const notes = await axios.get(`api/notes/${teamId}`);
    // console.log('getTeamNotes redux action, notes API response: ', notes.data);
    dispatch({ 
        type: SET_TEAM_NOTES, 
        payload: notes.data 
    });
};

export const addTeamNote = noteData => async dispatch => {   // newNote contains teamId, title, content, tagged users
    const notes = await axios.post('api/notes/newnote', noteData); // Creates new note and gets all notes in response
    console.log('addTeamNote redux action, notes API response: ', notes.data.notes);
    dispatch({ 
        type: SET_TEAM_NOTES, 
        payload: notes.data.notes
    });
};

