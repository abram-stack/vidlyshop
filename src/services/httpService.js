import axios from 'axios';
import { toast } from 'react-toastify'
import logger from './logService';

function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt;
}


// we dont have to repeat the error report once it declared,
axios.interceptors.response.use(null, error => {
  // will be executed evrytime unxepected error occured
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
  if (!expectedError) {
    // we dont want to log in the browser.
    logger.log(error);
    toast.error('an unexpected error occured');
  }
    return Promise.reject(error);
});


export default {
  get: axios.get,
  post: axios.post, 
  put: axios.put,
  delete: axios.delete,
  setJwt
}


// desc
// issue : bi-directional dependency
// between http and authService
// solution : define the most important: httpService. in that module, dont ask any service, reverse, that authService will serve it.
// in authService : setJwt() instead the httpService ask for jwt

// old impl:
// whenever to make http request, make sure include the headers 
// axios.defaults.headers.common['x-auth-token'] = auth.getJwt();