import { createStore } from 'redux';

import rootReducer from '../ducks';

const w: any = window as any;
const devtools: any = w.devToolsExtension ? w.devToolsExtension() : (f: any) => f;

const store = createStore(
  rootReducer, 
  devtools,
 );

export default store;