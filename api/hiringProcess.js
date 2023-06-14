import axios from '~/utils/axios';

export default {
  getListProcess() {
    return axios.get('/hr/hiring-process');
  },
  getDetailProcess(id) {
    return axios.get(`/hr/hiring-process/show/${id}`);
  },
  createProcess(payloads) {
    return axios.post('/hr/hiring-process/create', payloads);
  },
  updateProcess(id, payloads) {
    return axios.post(`/hr/hiring-process/edit/${id}`, payloads);
  },
  deleteProcess(id) {
    return axios.post(`/hr/hiring-process/delete/${id}`);
  },
}