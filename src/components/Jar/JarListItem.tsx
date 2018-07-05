import * as React from 'react';
import { formatMoney, toFixed } from 'accounting-js';
import { SlideDown } from 'react-slidedown';
import { SubmissionError, reset } from 'redux-form';
import 'react-slidedown/lib/slidedown.css';

import Jar from '.';
import { db } from '../../firebase/firebase';
import Error404 from '../../pages/Error404';
import TransactionForm from './TransactionForm';
import HistoryItem from './HistoryItem';
import { connect } from 'react-redux';
import { addTransactionToJar, withdrawTransactionFromJar, shareJarToUserId } from '../../firebase/db/jars';
import ShareForm from './ShareForm';
import { findUserByEmail } from '../../firebase/db/users';

interface Props {
  id: string;
  currentUser: any;
  resetShareForm: any;
}

interface State {
  dbReference: firebase.database.Reference;
  isLoading: boolean;
  isJarExpanded: boolean;
  isShareExpanded: boolean;
  currentJar: Jar | null;
  isAddFormShown: boolean;
  isWithdrawFormShown: boolean;
  message: string;
}

interface TransactionFormValues {
  amountToChange: string;
  notes?: string;
}

interface ShareFormValues {
  shareTo: string;
}

const connectToRedux = connect(
  (state: any) => ({
    currentUser: state.session.currentUser,
  }),
  (dispatch: any) => ({
    resetShareForm: () => dispatch(reset('share')),
  })
);

class JarListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { id } = this.props;
    const dbReference = db.ref(`/jars/${id}`);

    this.state = {
      dbReference,
      isLoading: true,
      isJarExpanded: false,
      isShareExpanded: false,
      isAddFormShown: false,
      isWithdrawFormShown: false,
      currentJar: null,
      message: "",
    };

    this.handleExpandAdd = this.handleExpandAdd.bind(this);
    this.handleExpandRemove = this.handleExpandRemove.bind(this);
    this.handleExpandJar = this.handleExpandJar.bind(this);
    this.handleExpandShare = this.handleExpandShare.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
    this.handleShare = this.handleShare.bind(this);
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

  handleExpandAdd() {
    this.setState(prevState => ({
      isAddFormShown: !prevState.isAddFormShown,
      isWithdrawFormShown: false,
    }));
  }

  handleExpandRemove() {
    this.setState(prevState => ({
      isWithdrawFormShown: !prevState.isWithdrawFormShown,
      isAddFormShown: false,
    }));
  }

  handleExpandJar() {
    this.setState(prevState => ({
      isJarExpanded: !prevState.isJarExpanded,
    }));
  }

  handleExpandShare() {
    this.setState(prevState => ({
      isShareExpanded: !prevState.isShareExpanded,
      message: ""
    }));
  }

  handleAdd = (values: TransactionFormValues) => {
    const { amountToChange, notes } = values;
    const { currentJar } = this.state;
    const { currentUser } = this.props;

    if (currentJar) {
      addTransactionToJar(currentJar, currentUser, amountToChange, notes);
    }

    this.setState({
      isAddFormShown: false,
    });
  }

  handleWithdraw = (values: TransactionFormValues) => {
    const { amountToChange, notes } = values;
    const { currentJar } = this.state;
    const { currentUser } = this.props;

    if (currentJar) {
      withdrawTransactionFromJar(currentJar, currentUser, amountToChange, notes);
    }

    this.setState({
      isWithdrawFormShown: false,
    });
  }

  handleShare = (values: ShareFormValues) => {
    const { shareTo } = values;
    const { currentJar } = this.state;
    const { resetShareForm } = this.props;

    return findUserByEmail(shareTo).then((snapshot) => {
      const user = snapshot.val();
      if (!user) {
        throw new SubmissionError({ _error: 'Email does not exist 😢' });
      } else {
        shareJarToUserId(currentJar!.id, Object.keys(user)[0]);
        resetShareForm();
        this.setState({
          message: `Successfully shared to ${shareTo}`
        });
      }
    });
  }

  render() {
    const {
      currentJar,
      isLoading,
      isAddFormShown,
      isWithdrawFormShown,
      isJarExpanded,
      isShareExpanded,
      message,
    } = this.state;

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
          <i className="fas fa-ellipsis-v clickable show-actions" onClick={this.handleExpandShare}/>
        </div>
        <SlideDown>
          {isShareExpanded && 
            <div className="share-wrapper">
              <ShareForm onSubmit={this.handleShare} />
              {message && <span>{message}</span>}
            </div>
          }
        </SlideDown>
        <div
          className={`jar-card clickable ${isJarExpanded ? 'expand' : ''}`}
          onClick={this.handleExpandJar}
        >
          <div className="amt-wrapper">
            <span className="symbol">$</span>
            <span className="current-amt">{formatMoney(currentAmount, { symbol: '' })}</span>/{goalAmount}
          </div>
          <div className="percentage">
            You are &nbsp;
            <span className="percent-value">{toFixed(((currentAmount / goalAmount) * 100), 2)}%</span>
            &nbsp;of the way there!
          </div>
        </div>
        <SlideDown>
          {isJarExpanded &&
            <div className="expand-card">
              <div className="actions">
                <div
                  className={`remove-transaction-wrapper clickable ${isWithdrawFormShown ? 'active' : ''}`}
                  onClick={this.handleExpandRemove}
                >
                  <span className="remove-circle" />
                  <span className="text">Withdraw</span>
                </div>

                <div
                  className={`add-transaction-wrapper clickable ${isAddFormShown ? 'active' : ''}`}
                  onClick={this.handleExpandAdd}
                >
                  <span className="add-circle" />
                  <span className="text">Add</span>
                </div>
              </div>
              <SlideDown className="transition-action-slidedown">
                {isAddFormShown && <TransactionForm type="add" onSubmit={this.handleAdd} />}
                {isWithdrawFormShown && <TransactionForm type="withdraw" onSubmit={this.handleWithdraw} />}
              </SlideDown>
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
        </SlideDown>
      </div>
    );
  }
}

export default connectToRedux(JarListItem);
