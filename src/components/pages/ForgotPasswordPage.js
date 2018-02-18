import React from 'react';
import { connect } from 'react-redux';
import { Message, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { resetPasswordRequest } from '../../actions/auth';
import ReactBody from 'react-body';

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
      <div className="forgot-password">
        <ReactBody className="body-login-page" />
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              Forgot Password
            </Header>
            {this.state.success ? (
              <Message>Email has been sent.</Message>
            ) : (
              <ForgotPasswordForm submit={this.submit} />
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
