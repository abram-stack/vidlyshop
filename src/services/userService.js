import httpService from './httpService';
const apiEndpoint = '/users';


export function registerUser(user) {
  return httpService.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  })
}