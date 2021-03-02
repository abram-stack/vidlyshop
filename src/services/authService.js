import httpService from './httpService';
import jwtDecode from 'jwt-decode';

const apiEndpoint = '/auth';
const tokenKey = 'token';


httpService.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

// when we await, we got response and the name is data, we destructure it to jwt. 
// store it in localstorage
export async function login(email, password) {
  const { data: jwt } = await httpService.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

 // getting current user in the state, 
 // when rendering components i.e NavBar, then pass user as prop to other component
 // what if user doesnt have jwt, => crashed(w/o trycatch), we should surf anonymous
export function getCurrentUser() {
  try {
      const jwt = localStorage.getItem(tokenKey);
      return jwtDecode(jwt);
  } catch (ex) {
    return null;
    }
}



// export default object, so we are doing more object oriented
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
}