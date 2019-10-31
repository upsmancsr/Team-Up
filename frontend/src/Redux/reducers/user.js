import axios from 'axios';

// const initialState = {
//   id: null,
//   username: '',
//   email: '',
//   wins: 0,
//   losses: 0,
//   token: localStorage.getItem('token')
// };

// const SET_TOKEN = 'SET_TOKEN';
// const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case SET_TOKEN:
//       return { ...state, token: action.payload };
//     case SET_ACCOUNT_INFO:
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };

// export const authAccount = form => async dispatch => {
//   const accountInfo = await axios.post('/auth', form);
//   if (accountInfo) {
//     dispatch({ type: SET_ACCOUNT_INFO, payload: accountInfo.data });
//   }
// };

// export const setToken = payload => {
//   payload
//     ? localStorage.setItem('token', payload)
//     : localStorage.removeItem('token');
//   return { type: SET_TOKEN, payload };
// };

const initialState = {
    id: null,       // user._id in MongoDB 
    firstName: '',  
    lastName: '',
    email: '',
};
  
const SET_USER_INFO = 'SET_USER_INFO';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO:
            return { 
                ...state, 
                id: action.payload._id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email 
            };
        default:
            return state;
    }
};

export const setUserInfo = idToken => async dispatch => {
    const userInfo = await axios.get('api/users/currentuser');
    dispatch({ 
        type: SET_USER_INFO, 
        payload: userInfo.data 
    });
};