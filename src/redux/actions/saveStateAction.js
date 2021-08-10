
export const updateReduxStore = values => async(dispatch) => {
    dispatch({ type: "UPDATE_SEARCH_REQUEST",  payload: values });
};