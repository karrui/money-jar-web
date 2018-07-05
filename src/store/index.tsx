import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from '../reducers';
const persistConfig = {
  storage,
  key: 'root',
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk, logger];

const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
 );

const persistor = persistStore(store);

export {
  store,
  persistor,
};
