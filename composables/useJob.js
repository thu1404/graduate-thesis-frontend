import jobApi from "../api/hrJob";
import { ref } from '@nuxtjs/composition-api';

function useJob() {
  const hrJobs = ref([]);
  const isFetchingHrJobs = ref(true);

  const fetchHrJobs = async() => {
    isFetchingHrJobs.value = true;
    try {
      const response = await jobApi.getJobs();
      hrJobs.value = response.data.jobs;
    } catch (error) {
      console.log(error);
    } finally {
      isFetchingHrJobs.value = false;
    }
  };

  return {
    hrJobs,
    isFetchingHrJobs,
    fetchHrJobs,
  };
};

export default useJob;
