import * as React from 'react';
import { Link } from 'react-router-dom';

const JarListItem = ({ id, username, jars }) => {
  const { name, currentAmount, goalAmount } = jars[id];
  const percentDone = (currentAmount / goalAmount).toFixed(2);
  return (
    <div>
      <Link to={`/${username}/jars/${id}`}>{name}</Link>
      Current amount: ${currentAmount}
      Goal amount: ${goalAmount}
      Percentage done: {percentDone}%
    </div>
  );
};

export default JarListItem;
