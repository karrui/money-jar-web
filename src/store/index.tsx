import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers';

let middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
 );

export {
  store,
};
