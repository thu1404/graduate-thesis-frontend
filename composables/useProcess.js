import hiringProcessApi from '../api/hiringProcess';
import { ref } from '@nuxtjs/composition-api';

function useHiringProcess() {
  const listProcess = ref([]);
  const isFetchingListProcess = ref(true);

  const fetchListProcess = async() => {
    isFetchingListProcess.value = true;
    try {
      const response = await hiringProcessApi.getListProcess();
      listProcess.value = response.data.hiring_process;
    } catch (error) {
      console.log(error);
    } finally {
      isFetchingListProcess.value = false;
    }
  };

  return {
    listProcess,
    isFetchingListProcess,
    fetchListProcess,
  };
};

export default useHiringProcess;
