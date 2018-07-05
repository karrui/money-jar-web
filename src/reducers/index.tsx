import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';
import jars from './jars';

const rootReducer = combineReducers({
  session,
  jars,
  form,
});

export default rootReducer;
