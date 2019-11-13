export const initialState = {
    notes: [],
};
  
export function reducer(state, action) {
    switch (action.type) {
        case 'SET_NOTES':
            return {
                ...state,
                notes: action.payload
            };
        default:
            return state;
    }
}
  