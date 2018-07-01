import * as React from 'react';
import { formatMoney } from 'accounting-js';

import Jar from '.';
import { db } from '../../firebase/firebase';
import Error404 from '../../pages/Error404';
import WithdrawJarTransactionForm from './WithdrawJarTransactionForm';
import AddJarTransactionForm from './AddJarTransactionForm';
import HistoryItem from './HistoryItem';

interface Props {
  id: string;
}

interface State {
  dbReference: firebase.database.Reference;
  isLoading: boolean;
  isExpanded: boolean;
  currentJar: Jar | null;
  isAddFormShown: boolean;
  isMinusFormShown: boolean;
}

class JarListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { id } = this.props;
    const dbReference = db.ref(`/jars/${id}`);

    this.state = {
      dbReference,
      isLoading: true,
      isExpanded: false,
      isAddFormShown: false,
      isMinusFormShown: false,
      currentJar: null,
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  componentDidMount() {
    this.state.dbReference.on('value', (snapshot: any) => {
      const jar: Jar = snapshot.val();
      this.setState({
        currentJar: jar,
        isLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.state.dbReference.off();
  }

  handleAdd() {
    this.setState(prevState => ({
      isAddFormShown: !prevState.isAddFormShown,
      isMinusFormShown: false,
    }));
  }

  handleRemove() {
    this.setState(prevState => ({
      isMinusFormShown: !prevState.isMinusFormShown,
      isAddFormShown: false,
    }));
  }

  handleExpand() {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded,
    }));
  }

  render() {
    const { currentJar, isLoading, isAddFormShown, isMinusFormShown, isExpanded } = this.state;

    if (isLoading) {
      return <div>Please wait...</div>;
    }

    if (currentJar === null) {
      return <Error404 />;
    }

    const { name, currentAmount, goalAmount } = currentJar;

    return (
      <div className="jar-view-content">
        <div className="header-title">
          {name}
        </div>
        <div className="jar-card clickable" onClick={this.handleExpand}>
          <div className="amt-wrapper">
            <span className="symbol">$</span>
            <span className="current-amt">{formatMoney(currentAmount, { symbol: '' })}</span>/{goalAmount}
          </div>
          <div className="percentage">
            You are &nbsp;
            <span className="percent-value">{((currentAmount / goalAmount) * 100).toFixed(2)}%</span>
            &nbsp;of the way there!
          </div>
        </div>
        {isExpanded &&
          <div className="expand-card">
            <div className="actions">
              <div
                className={`remove-transaction-wrapper clickable ${isMinusFormShown ? 'active' : ''}`}
                onClick={this.handleRemove}
              >
                <span className="remove-circle" />
                <span className="text">Withdraw</span>
              </div>

              <div
                className={`add-transaction-wrapper clickable ${isAddFormShown ? 'active' : ''}`}
                onClick={this.handleAdd}
              >
                <span className="add-circle" />
                {/* <i className="fas fa-plus-circle" /> */}
                <span className="text">Add</span>
              </div>
            </div>
            {isMinusFormShown && <WithdrawJarTransactionForm currentJar={currentJar} />}
            {isAddFormShown && <AddJarTransactionForm currentJar={currentJar} />}
            <div className="transaction">
              <div className="header">Transactions</div>
              <div className="transaction-list">
              {currentJar.history && Object.keys(currentJar.history).map((key) => {
                const item = currentJar.history[key];
                return <HistoryItem key={key} item={item} transactionId={key} jarId={currentJar.id} />;
              })}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default JarListItem;
