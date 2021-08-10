import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'; 
import saveStateReducer from "redux/reducers/saveReducer";

function configureStore() {
  return createStore(saveStateReducer, applyMiddleware(thunk));
}

export default configureStore;