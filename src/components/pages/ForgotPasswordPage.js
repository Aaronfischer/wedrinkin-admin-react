import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { resetPasswordRequest } from '../../actions/auth';

export class ForgotPasswordPage extends React.Component {
  static propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
  };

  state = {
    success: false
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    return (
      <div>
        {this.state.success ? (
          <Message>Email has been sent.</Message>
        ) : (
          <ForgotPasswordForm submit={this.submit} />
        )}
      </div>
    );
  }
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
