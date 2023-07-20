import axios from '~/utils/axios';

export default {
  getJobs() {
    return axios.get('hr/list-jobs');
  },
  getDetailJob(id) {
    return axios.get(`hr/show-job/${id}`)
  },
  createJob(payloads) {
    return axios.post('hr/create-job', payloads);
  },
  updateJob(id, payloads) {
    return axios.post(`hr/edit-job/${id}`, payloads);
  },
  deleteJob(id) {
    return axios.post(`hr/delete-job/${id}`);
  },
  enableJob(id) {
    return axios.post(`hr/enable-job/${id}`);
  },
  disableJob(id) {
    return axios.post(`hr/disable-job/${id}`);
  }
};
