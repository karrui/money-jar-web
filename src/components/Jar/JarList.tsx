import * as React from 'react';
import JarListItem from './JarListItem';

const JarList = ({ jars, username }) => (
  <div>
    <h2>My jars</h2>

    {Object.keys(jars).map(id => (
      <JarListItem
        key={id}
        id={id}
        username={username}
        jars={jars}
      />
    ))}
  </div>
);

export default JarList;
