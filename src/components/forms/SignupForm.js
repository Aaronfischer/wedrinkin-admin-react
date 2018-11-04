import React, { Component } from 'react';
import { Form, Button, Message, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class SignupForm extends Component {
  state = {
    data: {
      firstName: '',
      lastName: '',
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

    console.log('data', data);
    console.log('errors', errors);
    console.log('loading', loading);

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Segment>
          {errors.global && (
            <Message negative>
              <Message.Header>Something went wrong!</Message.Header>
              <p>{errors.global}</p>
            </Message>
          )}
          <Form.Field error={!!errors.firstName}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={data.firstName}
              onChange={this.onChange}
            />
            {errors.firstName && <InlineError text={errors.firstName} />}
          </Form.Field>
          <Form.Field error={!!errors.lastName}>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={data.lastName}
              onChange={this.onChange}
            />
            {errors.lastName && <InlineError text={errors.lastName} />}
          </Form.Field>
          <Form.Field error={!!errors.email}>
            <input
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
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <Button fluid primary>Sign Up</Button>
        </Segment>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
