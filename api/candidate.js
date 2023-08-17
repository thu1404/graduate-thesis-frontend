import axios from '~/utils/axios';

export default {
  getListCvs() {
    return axios.get('/candidate/profile');
  },
  getJobs(params) {
    if (params) {
      return axios.get(`/candidate/jobs?${params}`);
    } else {
      return axios.get('/candidate/jobs');
    }
  },
  createCv(payloads) {
    return axios.post('/candidate/profile', payloads);
  },
  updateCv(payloads, cvId) {
    return axios.post(`/candidate/updateProfile/${cvId}`, payloads);
  },
  deleteCv(cvId) {
    return axios.post(`/candidate/deleteProfile/${cvId}`);
  },
  applyJob(payloads) {
    return axios.post('/candidate/applyJobs', payloads);
  },
};
