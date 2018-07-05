import * as React from 'react';
import { reduxForm, Field } from 'redux-form';

import { required } from '../Utils/FormUtil';

const ShareForm = (props) => {
  const { handleSubmit, pristine, submitting, error } = props;

  return (
    <div className="share-form-wrapper">
      <form onSubmit={handleSubmit}>
        <Field
          className="share-input"
          name="shareTo"
          component="input"
          type="email"
          placeholder="Enter email address to share to"
          validate={[required]}
        />
        {error && <strong>{error}</strong>}
        <button className="share-btn" type="submit" disabled={pristine || submitting}>
          💌
        </button>
      </form>
    </div>
  );
};

const connectToReduxForm = reduxForm({
  form: 'share',
});

export default connectToReduxForm(ShareForm);
