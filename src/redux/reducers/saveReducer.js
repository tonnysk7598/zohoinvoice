/* eslint-disable import/no-anonymous-default-export */
const INITIAL_STATE = {}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "UPDATE_SEARCH_REQUEST":
            const newSearch = action.payload;
            return { ...state, ...newSearch };
        default:
            return state;
    }
};