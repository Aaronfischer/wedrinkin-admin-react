import React, { Component } from 'react';
import { Form, Segment, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Invalid Email';
    }
    if (!data.password) {
      errors.password = 'Cant be blank';
    }
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form size="large" onSubmit={this.onSubmit} loading={loading}>
        <Segment>
          {errors.global && (
            <Message negative>
              <Message.Header>Something went wrong!</Message.Header>
              <p>{errors.global}</p>
            </Message>
          )}
          <Form.Field error={!!errors.email}>
            <input
              fluid="true"
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={data.email}
              onChange={this.onChange}
            />
            {errors.email && <InlineError text={errors.email} />}
          </Form.Field>
          <Form.Field error={!!errors.password}>
            <input
              fluid="true"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <Button fluid primary size="large">
            Login
          </Button>
        </Segment>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
