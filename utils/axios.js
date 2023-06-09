import axios from 'axios';
import Cookie from 'js-cookie';

const token = Cookie.get('access_token');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  },
});
export default instance;
