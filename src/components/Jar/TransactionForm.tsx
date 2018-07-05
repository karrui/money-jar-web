import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

import { required, onlyDecimal } from '../Utils/FormUtil';

const TransactionForm = (props) => {
  const { handleSubmit, pristine, submitting, error, type } = props;
 
  return (
    <div className="form-area">
      <div className="action-form-wrapper">
        <form onSubmit={handleSubmit}>
          <span className="symbol">$</span>
          <Field
            className="amt-input"
            name="amountToChange"
            component="input"
            type="text"
            normalize={onlyDecimal}
            placeholder="0"
            validate={[required]}
          />
          <Field
            className="notes-input"
            name="notes"
            component="input"
            type="text"
            placeholder="Enter notes (optional)"
          />
          {error && <strong>{error}</strong>}
          {type === 'add'
            ? (
            <button className="submit-btn" type="submit" disabled={pristine || submitting}>
              🤑
            </button>
            )
            : (
            <button className="withdraw-btn" type="submit" disabled={pristine || submitting}>
              😥
            </button>
            )
          }
        </form>
      </div>
    </div>
  );
};

const connectToReduxForm = reduxForm({
  form: 'transaction'
});

export default connectToReduxForm(TransactionForm);
