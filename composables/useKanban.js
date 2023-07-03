import kanbanApi from '../api/hrKanban';
import { ref } from '@nuxtjs/composition-api';

function useKanban() {
  const kanbans = ref([]);
  const isFetchingKanban = ref(true);
  const kanbanProcess = ref({});
  const isFetchingKanbanProcess = ref(true);

  const fetchKanban = async(jobId) => {
    isFetchingKanban.value = true;
    isFetchingKanbanProcess.value = true;
    try {
      const response = await kanbanApi.getKanban(jobId);
      kanbans.value = response.data.kanbanBoard;
      kanbanProcess.value = response.data.hiringProcess;
    } catch (error) {
      console.log(error);
    } finally {
      isFetchingKanban.value = false;
    }
  };

  return {
    kanbans,
    isFetchingKanban,
    fetchKanban,
    kanbanProcess,
    isFetchingKanbanProcess,
  };
};

export default useKanban;
