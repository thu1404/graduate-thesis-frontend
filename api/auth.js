import axios from '~/utils/axios';

export default {
  logout() {
    return axios.post('/logout');
  }
};
