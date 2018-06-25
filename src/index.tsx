import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from "./App";
import { store, persistor } from './store';
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
