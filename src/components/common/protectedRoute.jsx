import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService'; 

// @desc when we use Route component, we either supply a component or a render function
// its possible that, props component is null,(if we use render function)
// {...rest} with rest we can pick any other additional properties, so instead using path = path, spreading it using {...rest}
const ProtectedRoute = ({ path, component: Component, render, ...rest}) => {
  return ( 
    <Route
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()) return <Redirect to={
          {
            pathname: '/login',
            state: {
              from: props.location  
            }
          }
        } />
        return Component ? <Component {...props} /> : render(props);
      }} />
   );
}
 
export default ProtectedRoute;



// @desc scenario : if user not logged in, clicked the movie to edit, then redirect to login. (correct)
// however, after succesfully log in, user redirect back to home, not to the last path.
// solution : location object is property in props in React router, location has pathname current location ,
// redirect has two operation, 1. to string, 2. to: object. this is where we refer to location object
//      pathname: 
//      search:
//      state: set the state to additional data(also an object), we get from props.location. represent the data, before the user get redirect to login page
//          which has all the property of props.location.