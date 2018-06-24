import { combineReducers } from 'redux';
import session from './session';
import jars from './jars';

const rootReducer = combineReducers({
  session,
  jars,
});

export default rootReducer;
