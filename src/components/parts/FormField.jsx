import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import InlineError from '../parts/InlineError';

class FormField extends Component {
  render() {
    const { error } = this.props;
    let hasError;
    if (typeof error !== 'undefined') {
      hasError = !!error;
    }
    return (
      <Form.Field error={error}>
        {this.props.children}
        {hasError && <InlineError text={error} /> }
      </Form.Field>
    );
  }
}

export default FormField;

