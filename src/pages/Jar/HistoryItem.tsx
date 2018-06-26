import * as React from 'react';
import { removeTransactionFromJar } from '../../firebase/db/jars';

const HistoryItem = ({ transactionId, item, jarId }) => (
    <div>
      Amount:{item.amount}
      Created at: {item.createdAt}
      Notes: {item.notes}
      By: {item.username}

      <button onClick={() => removeTransactionFromJar(transactionId, jarId)} type="button">Delete</button>
    </div>
);

export default HistoryItem;
