import * as React from 'react';
import { formatMoney } from 'accounting-js';

import { removeTransactionFromJar } from '../../firebase/db/jars';

interface State {
  isActionShown: boolean;
}

interface Props {
  transactionId: string;
  item: any;
  jarId: string;
}
class HistoryItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isActionShown: false,
    };
  }

  showActions = () => {
    this.setState({
      isActionShown: true,
    });
  }

  hideActions = () => {
    if (this.state.isActionShown) {
      this.setState({
        isActionShown: false,
      });
    }
  }

  formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      // hour12: false,
    };
    return date.toLocaleString(undefined, options);
  }

  render() {
    const { transactionId, item, jarId } = this.props;
    return (
      <div className="history-item" onClick={this.hideActions}>
        {this.state.isActionShown
          ? <i
            className="far fa-trash-alt delete-transaction clickable"
            onClick={() => removeTransactionFromJar(transactionId, jarId, item.type)}
          />
          : <i className="fas fa-ellipsis-v clickable show-actions" onClick={this.showActions}/>
        }
      
        {/* <span className={`${item.type}-circle`} /> */}
        <span className="user">{item.username}</span>
        {item.notes && <span className="notes">{item.notes}</span>}
        <span className="time">{this.formatDate(item.createdAt)}</span>
        {item.type === 'add'
          ? <span className="add-amount">
              +{formatMoney(item.amount)}
            </span>
          : <span className="withdraw-amount">
              -{formatMoney(item.amount)}
            </span>
        }
      </div>
    );
  }
}

export default HistoryItem;
