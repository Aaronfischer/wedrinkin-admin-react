import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';
import { Link } from 'react-router-dom';
import ReactBody from 'react-body';

class LoginPage extends Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div className="login-page">
        <ReactBody className="body-login-page" />
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              <Image src="/logo.png" />
              Login
            </Header>
            <LoginForm submit={this.submit} />
            <Message>
              New to us? <Link to="/signup">Sign Up</Link> <br />
            </Message>
            <Link size="mini" to="/forgot-password">Forgot Password?</Link>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
