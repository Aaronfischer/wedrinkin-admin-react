import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Grid, Header } from 'semantic-ui-react';
import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/users';
import ReactBody from 'react-body';

class SignupPage extends Component {
  submit = data =>
    this.props.signup(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div>
        <ReactBody className="body-login-page" />
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              Sign Up
            </Header>
            <SignupForm submit={this.submit} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default SignupPage;
