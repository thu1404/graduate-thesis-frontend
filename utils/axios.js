import axios from 'axios';
import Cookie from 'js-cookie';

const token = Cookie.get('access_token');
const XSRF = Cookie.get('XSRF-TOKEN');

// axios.interceptors.request.use(function (config) {
//   const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
//   config.headers['X-CSRF-TOKEN'] = csrfToken;
//   return config;
// });

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
    withCredentials: true,
    'X-Requested-With': 'XMLHttpRequest',
    // 'X-XSRF-TOKEN': XSRF,

  },
});

export default instance;
