import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser'
import Form from './common/form'
import auth from '../services/authService';

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: ''
    },
    errors: { }
      // username: 'username is required. ie. username, map data dynamically 
    
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };


  doSubmit = async() => {
    try {
      const { data} = this.state;
      await auth.login(data.username, data.password);
      // we set back to homepage, instead of using history push, we have to reload the page(old implementation)
      // window location: only when the user is trying  to login, so we reload the application, so our application is remounted in right state
      // (new impl)we also want to redirect user where user last time was. props.location, might have state property, pick the state
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() { 
    // if user logged in, redirect to home '/'
    if(auth.getCurrentUser()) return <Redirect to='/'/>
    return ( 
      <div>
        <h1>Login</h1>
        <form onSubmit={ this.handleSubmit }>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>

      </div>
     );
  }
}
 
export default LoginForm;