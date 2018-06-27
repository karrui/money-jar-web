import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from "./App";
import { store, persistor } from './store';
import registerServiceWorker from "./registerServiceWorker";
import './styles/css/index.css';

const rootEl = document.getElementById("root") as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NextApp />
        </PersistGate>
      </Provider>,
      rootEl,
    );
  });
}

registerServiceWorker();
