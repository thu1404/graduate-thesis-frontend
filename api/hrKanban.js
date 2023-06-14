import axios from '~/utils/axios';

export default {
  getKanban(jobId) {
    return axios.get(`/hr/job/${jobId}/process`);
  },
  changeRound(jobId, payloads) {
    return axios.post(`/hr/job/${jobId}/process/change-round`, payloads);
  },
  rejectCv(jobId, cvId) {
    return axios.post(`/hr/job/${jobId}/process/reject`, { cv_id: cvId });
  },
};
