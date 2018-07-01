import * as React from 'react';
import { compose } from 'recompose';
import { formatMoney } from 'accounting-js';

import withAuthorization from '../../components/Authentication/withAuthorization';
import withRights from '../../components/Jar/withRights';
import { connect, Dispatch } from 'react-redux';
import { db } from '../../firebase/firebase';
import AddJarTransactionForm from '../../components/Jar/AddJarTransactionForm';
import WithdrawJarTransactionForm from '../../components/Jar/WithdrawJarTransactionForm';
import Error404 from '../Error404';
import HistoryItem from './HistoryItem';

class JarView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const jarId = window.location.toString().split('/')[5];
    const dbReference = db.ref(`/jars/${jarId}`);

    this.state = {
      dbReference,
      isLoading: true,
      isAddFormShown: false,
      isMinusFormShown: false,
    };

    // This binding is necessary to make `this` work in the callback
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {

    this.state.dbReference.on('value', (snapshot: any) => {
      const jar = snapshot.val();
      this.props.onSetJarView(jar);
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

  render() {
    const { currentJar } = this.state;

    if (this.state.isLoading) {
      return <div>Please wait...</div>;
    }

    if (currentJar === null) {
      return <Error404 />;
    }

    const { name, currentAmount, goalAmount } = currentJar;
    const { isMinusFormShown, isAddFormShown } = this.state;

    return (
      <div className="jar-view-content">
        <div className="header-title">
          {name}
        </div>
        <div className="jar-card">
          <div className="amt-wrapper">
            <span className="symbol">$</span>
            <span className="current-amt">{formatMoney(currentAmount, { symbol: '' })}</span>/{goalAmount}
            {/* Last updated: {new Date(currentJar.lastUpdated).toLocaleTimeString()} */}
          </div>
          <div className="percentage">
            You are &nbsp;
            <span className="percent-value">{((currentAmount / goalAmount) * 100).toFixed(2)}%</span>
            &nbsp;of the way there!
          </div>
        </div>
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
        {isMinusFormShown && <WithdrawJarTransactionForm />}
        {isAddFormShown && <AddJarTransactionForm />}
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
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetJarView: jar => dispatch({ type: 'JAR_VIEW_SET', payload: jar }),
});

const authCondition = currentUser => !!currentUser;

const enhance = compose(
  withAuthorization(authCondition),
  withRights(),
  connect(null, mapDispatchToProps),
);

export default enhance(JarView);
