import kanbanApi from '../api/hrKanban';
import { ref } from '@nuxtjs/composition-api';

function useKanban() {
  const kanban = ref([]);
  const isFetchingKanban = ref(true);
  // const kanbanProcess = ref({});
  // const isFetchingKanbanProcess = ref(true);

  const fetchKanban = async(jobId) => {
    isFetchingKanban.value = true;
    try {
      const response = await kanbanApi.getKanban(jobId);
      kanban.value = response.data.kanbanBoard;
    } catch (error) {
      console.log(error);
    } finally {
      isFetchingKanban.value = false;
    }
  };

  return {
    kanban,
    isFetchingKanban,
    fetchKanban,
  };
};

export default useKanban;
