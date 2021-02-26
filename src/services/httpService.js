import axios from 'axios';
import { toast } from 'react-toastify'
import logger from './logService';

// we dont have to repeat the error report,
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
  delete: axios.delete
}