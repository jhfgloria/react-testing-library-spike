import { createStore, combineReducers } from "redux";
import todos from '../todo-list/state/reducer.js';

const rootReducer = combineReducers({ todos });
export default createStore(
  rootReducer,
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export { rootReducer };