import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Movies from './components/movies'
import Customers from './components/customers';
import Rentals from './components/rentals';
import notFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';

class App extends Component {

  render() { 
    return (  
      <React.Fragment>
        <NavBar/>
        <main className='container'>
          <Switch>
            <Route path='/register' component={RegisterForm}></Route>
            <Route path='/login' component={LoginForm}></Route>
            <Route path='/movies/:id' component={MovieForm}></Route>
            <Route path='/movies' component={Movies}></Route>
            <Route path='/customers' component={Customers}></Route>
            <Route path='/rentals' component={Rentals}></Route>
            <Route path='/not-found' component={notFound}></Route>
            <Redirect from='/' to='movies' exact></Redirect>
            <Redirect to='/not-found'></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;
