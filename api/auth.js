import axios from '~/utils/axios';

export default {
  logout() {
    return axios.post('/logout');
  },
  register(payload) {
    return axios.post('/register', payload);
  },
};
