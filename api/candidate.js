import axios from '~/utils/axios';

export default {
  getListCvs() {
    return axios.get('/candidate/profile');
  },
  getJobs() {
    return axios.get('/candidate/jobs');
  },
  createCv(payloads) {
    return axios.post('/candidate/profile', payloads);
  },
  updateCv(payloads, cvId) {
    return axios.post(`/candidate/profile/${cvId}`, payloads);
  },
  deleteCv(cvId) {
    return axios.post(`/candidate/deleteProfile/${cvId}`);
  },
  applyJob(payloads) {
    return axios.post('/candidate/applyJobs', payloads);
  },
};
