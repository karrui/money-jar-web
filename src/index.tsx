import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import App from "./App";
import { store } from './store';
import registerServiceWorker from "./registerServiceWorker";
import './styles/css/index.css';

const rootEl = document.getElementById("root") as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl,
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      rootEl,
    );
  });
}

registerServiceWorker();
