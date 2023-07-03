<template>
  <div class="kanban-card">
    <!-- <pre>
      {{ kanban }}
    </pre> -->
    <div class="kanban-card__container">
      <div class="kanban-card__info">
        <div class="kanban-card__info--name">
          {{ kanban.cv.name }}
        </div>
        <div class="kanban-card__info--email">
          {{ kanban.cv.email }}
        </div>
      </div>
    </div>
    <div class="kanban-card__action">
      <el-select
        v-model="currentRound"
        @change="changeRound"
      >
        <el-option
          v-for="(item, index) in hiringProcess.hiring_process_round"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
  </div>
</template>
<script>
import hrKanbanApi from '../../api/hrKanban';

export default {
  name: 'KanbanCvCard',

  props: {
    kanban: {
      type: Object,
      default: () => {},
    },
    hiringProcess: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      currentRound: this.kanban.round_id,
    }
  },

  methods: {
    async changeRound(roundId) {
      try {
        await hrKanbanApi.changeRound(this.kanban.job_id, {
          cv_id: this.kanban.cv_id,
          hiring_process_round_id: roundId,
        });
        this.$emit('changeRound');
      } catch(error) {
        console.log(error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.kanban-card {
  border: 1px solid #000;
  border-radius: 4px;
  width: 350px;
  padding: 8px;
  &__container {
    margin-bottom: 8px;
  }
}
</style>
