import * as React from 'react';
import { reduxForm, Field } from 'redux-form';

import { required, onlyDecimal } from '../Utils/FormUtil';

const CreateJarForm = (props) => {
  const { handleSubmit, pristine, submitting, error, invalid } = props;

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <div className="create-form-wrapper">
          <Field
            className="name-input"
            name="name"
            component="input"
            type="text"
            validate={[required]}
            placeholder="Give your jar a name"
          />
          <div className="amount-wrapper">
            <span className="symbol">$</span>
            <Field
              className="current-amount"
              name="currentAmount"
              component="input"
              type="text"
              normalize={onlyDecimal}
              placeholder="0"
            />
            <span className="slash">/</span>
            <Field
              className="goal-amount"
              name="goalAmount"
              component="input"
              type="text"
              normalize={onlyDecimal}
              placeholder="999"
              validate={[required]}
            />
          </div>
      </div>
          {error && <strong>{error}</strong>}
          <button className="submit-btn" type="submit" disabled={pristine || submitting || invalid}>
            🍯
          </button>
        </form>
  );
};

const connectToReduxForm = reduxForm({
  form: 'createJar',
});

export default connectToReduxForm(CreateJarForm);
