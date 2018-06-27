import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import * as Account from './pages/Account';
import Landing from './pages/Landing';
import Home from './pages/Home';
import JarView from './pages/Jar/JarView';

import * as routes from './constants/routes';
import withAuthentication from './components/Authentication/withAuthentication';
import Header from './components/Header';

const App = () => (
  <Router>
    <div>
      <Header />

      <hr/>

      <Route exact={true} path={routes.LANDING} component={Landing} />
      <Route exact={true} path={routes.SIGN_UP} component={Account.SignUp} />
      <Route exact={true} path={routes.SIGN_IN} component={Account.SignIn} />
      <Route exact={true} path={routes.PASSWORD_FORGET} component={Account.PasswordForget} />
      <Route exact={true} path={routes.HOME} component={Home} />
      <Route exact={true} path={routes.ACCOUNT} component={Account.Account} />

      <Route path={'/:user/jars/:id'} component={JarView} />
    </div>
  </Router>
);

export default withAuthentication(App);
