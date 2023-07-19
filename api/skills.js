import axios from "@/utils/axios";

export default {
  getListSkills() {
    return axios.get('/skills');
  },
};
