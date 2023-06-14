<template>
  <div class="list__container">
    <div v-for="(job, index) in jobs" :key="index" class="list__item">
      <JobCard
        :job="job"
        @apply="openApplyJob(job.id)"
        @edit="handleOpenEdit(job)"
      />
    </div>
    <el-button v-if="$auth.user?.role_id === 1" @click="openCreateJob">Add new Job</el-button>
    <CreateJob
      ref="createJobModal"
      @submit="$emit('reloadList')"
    />
    <UpdateJob
      ref="updateJobModal"
      @submit="$emit('reloadList')"
    />
    <KanbanJob
      ref="kanbanJobDrawer"
    />
    <ApplyJob
      ref="applyJobDrawer"
      @apply="$emit('applyJob')"
    />
  </div>
</template>
<script>
import JobCard from './JobCard.vue';
// import userCandidate from '~/composables/useCandidate';
import CreateJob from '../Job/CreateJob.vue';
import UpdateJob from '../Job/UpdateJob.vue';
import KanbanJob from '../Job/KanbanJob.vue';
import ApplyJob from '../Job/ApplyJob.vue';

export default {
  name: 'ListJobs',

  components: {
    JobCard,
    CreateJob,
    UpdateJob,
    KanbanJob,
    ApplyJob,
  },

  props: {
    jobs: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    openApplyJob(id) {
      this.$refs.applyJobDrawer.open(id)
    },
    openCreateJob() {
      if (this.$auth.user?.role_id === 1) {
        this.$refs.createJobModal.open();
      }
    },
    handleOpenEdit(job) {
      if (this.$auth.user?.role_id === 1) {
        this.$refs.updateJobModal.open(job);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__item {
    max-width: 1200px;
    width: 100%;
  }
}
</style>
