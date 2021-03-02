import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './components/movies'
import Customers from './components/customers';
import Rentals from './components/rentals';
import notFound from './components/notFound';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import auth from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() { 
    const { user } = this.state;

    return (  
      <React.Fragment>
        <ToastContainer/>
        <NavBar user={user}/>
        <main className='container'>
          <Switch>
            <Route path='/register' component={RegisterForm}/>
            <Route path='/login' component={LoginForm}/>
            <Route path='/logout' component={Logout}/>
            <ProtectedRoute path='/movies/:id' component={MovieForm}/>
            <Route path='/movies'
              render={props => <Movies {...props} user={user}/>  }   />
            <Route path='/customers' component={Customers}/>
            <Route path='/rentals' component={Rentals}/>
            <Route path='/not-found' component={notFound}/>
            <Redirect from='/' to='movies' exact></Redirect>
            <Redirect to='/not-found'></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;

// @desc
// we cant just pass user object in routing, like additional props
// we need the render attributes, with all the defaults props like match,history etc, and after that the additional props ie : 
// before : component{Movies} 
// after : render={ <Movies {...props} user={this.state.user}/> }
// render is basically function, with logic inside. so we can dynamically pass the props component or render itself
// , we basically pass function, in that function, we check if user is null then redirect the user
// otherwise : render movie