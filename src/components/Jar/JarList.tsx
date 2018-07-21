import * as React from 'react';
import JarListItem from './JarListItem';

const JarList = ({ jars }) => (
  <div className="jar-list-container">
    {Object.keys(jars).map(id => (
      <JarListItem
        key={id}
        id={id}
      />
    ))}
  </div>
);

export default JarList;
