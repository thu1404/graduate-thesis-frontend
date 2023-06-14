import axios from '~/utils/axios';

export default {
  getListRounds() {
    return axios.get('/hr/hiring-process-round');
  },
  createRound(payloads) {
    return axios.post('/hr/hiring-process-round/create', payloads);
  },
  updateRound(id, payloads) {
    return axios.post(`/hr/hiring-process-round/edit/${id}`, payloads);
  },
  deleteRound(id) {
    return axios.post(`/hr/hiring-process-round/delete/${id}`);
  },
};
