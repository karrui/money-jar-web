import * as React from 'react';
import { reduxForm, Field } from 'redux-form';

import { required } from '../Utils/FormUtil';

const ShareForm = (props) => {
  const { handleSubmit, pristine, submitting, message, error } = props;

  return (
    <form className="share-form" onSubmit={handleSubmit}>
      <Field
        className="share-input"
        name="shareTo"
        component="input"
        type="email"
        placeholder="Enter email address to share to"
        validate={[required]}
      />
      {error && <span className="message error">{error}</span>}
      {message && <span className="message success">{message}</span>}
      <button className="share-btn" type="submit" disabled={pristine || submitting}>
        💌
      </button>
    </form>
  );
};

const connectToReduxForm = reduxForm({
  form: 'share',
});

export default connectToReduxForm(ShareForm);
