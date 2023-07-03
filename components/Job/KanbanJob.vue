<template>
  <el-drawer
    title="Job kanbans board"
    :visible.sync="isOpen"
    direction="btt"
    size="90%"
  >
    <div v-if="kanbans.length <= 0" class="empty-drawer">
      No one has applied to this Job
    </div>
    <div v-else class="kanban-board">
      <div
        v-for="(item, index) in kanbans"
        :key="item.id"
      >
        <KanbanCvCard
          :kanban="item"
          :hiring-process="kanbanProcess[0]"
          @changeRound="fetchKanban(item.job_id)"
        />
      </div>
    </div>
  </el-drawer>
</template>
<script>
import useKanban from '../../composables/useKanban';
import KanbanCvCard from '../Job/KanbanCvCard.vue';

export default {
  name: 'KanbanJob',

  components: {
    KanbanCvCard,
  },

  setup() {
    const {
      kanbans,
      isFetchingKanban,
      fetchKanban,
      kanbanProcess,
      isFetchingKanbanProcess,
    } = useKanban();

    return {
      kanbans,
      isFetchingKanban,
      fetchKanban,
      kanbanProcess,
      isFetchingKanbanProcess,
    };
  },

  data() {
    return {
      isOpen: false,
    }
  },

  methods: {
    open(jobId) {
      this.isOpen = true;
      this.fetchKanban(jobId);
    }
  }
};
</script>
<style lang="scss" scoped>
.empty-drawer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.kanban-board {
  height: 100%;
  padding: 16px;
}
</style>
