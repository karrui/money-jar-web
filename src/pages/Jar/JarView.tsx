import * as React from 'react';
import { compose } from 'recompose';

import withAuthorization from '../../components/Authentication/withAuthorization';
import withRights from '../../components/Jar/withRights';

class JarView extends React.Component {
  
  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

const authCondition = currentUser => !!currentUser;

const enhance = compose(
  withAuthorization(authCondition),
  withRights(),
);

export default enhance(JarView);
