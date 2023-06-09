import candidateApi from "../api/candidate";
import { ref } from '@nuxtjs/composition-api';

function useCandidate() {
  const jobs = ref([]);
  const isFetchingJobs = ref(true);
  const cvs = ref([]);
  const isFetchingCvs = ref(true);

  const fetchJobs = async() => {
    isFetchingJobs.value = true;
    try {
      const response = await candidateApi.getJobs();
      jobs.value = response.data.data;
    } catch (error) {
      console.log(error);
    } finally {
      isFetchingJobs.value = false;
    }
  };

  const fetchCvs = async() => {
    isFetchingCvs.value = true;
    try {
      const response = await candidateApi.getListCvs();
      cvs.value = response.data.data;
    } catch (error) {
      console.log(error);
    } finally {
      isFetchingCvs.value = false;
    }
  };

  return {
    jobs,
    fetchJobs,
    isFetchingJobs,
    cvs,
    fetchCvs,
    isFetchingCvs,
  };
};

export default useCandidate;
