import Amplify from 'aws-amplify';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import awsExports from './aws-exports';
import registerServiceWorker from './registerServiceWorker';

Amplify.configure(awsExports);

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
