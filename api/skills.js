import axios from "@/utils/axios";

export default {
  getListSkills(params) {
    return axios.get('/skills', params);
  },
};
