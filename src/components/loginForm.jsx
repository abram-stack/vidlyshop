import React, { Component } from 'react';
import Joi from 'joi-browser'
import Input from './common/input';
import { result } from 'lodash';

class LoginForm extends Component {
  // username = React.createRef()

  state = {
    account: {
      username: '',
      password: ''
    },
    errors: {
      // username: 'username is required. ie. username, map account dynamically 
    }
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  validate = () => {
    const options = {abortEarly: false}
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details)
      // we iterate, each item we assign to errors object ie: errors.username = message
      errors[item.path[0]] = item.message;
    
    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    
    const errors = this.validate();
    // we got error returned
    this.setState({ errors});

    if (errors) return;

    // call the server
    // in react, we dont use DOM element directly to get access to user element, we use REFERENCE
    // rule of thumb : minimize reference.
    // const username = this.username.current.value;
    console.log('submitted');
  }

  validateProperty = ({ name, value}) => {
    if (name === 'username') {
      if (value.trim() === '') return 'Username is required';
    }
    if (name === 'password') {
      if (value.trim() === '') return 'Password is required';
    }
  }


  // replace e with dstructuring, e.currentTarget
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name]; //because we want to clear the state

    const account = { ...this.state.account };
    account[input.name] = input.value; //assign account dynamically using [], independently instead of using . 
    this.setState({ account, errors });
  }


  render() { 
    const { account, errors } = this.state;
    return ( 
      <div>
        <h1>Login</h1>
        <form onSubmit={ this.handleSubmit }>
          <Input
            name='username'
            value={account.username}
            label='Username'
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name='password'
            value={account.password}
            label='Password'
            onChange={this.handleChange}
            error={errors.password}
          />
        <button className='btn btn-primary'>Submit</button>
        </form>

      </div>
     );
  }
}
 
export default LoginForm;