<template>
  <div class="list__container">
    <div v-for="(job, index) in jobs" :key="index" class="list__item">
      <JobCard
        :job="job"
        @apply="openApplyJob(job.id)"
      />
    </div>
    <!-- <pre>
      {{ jobs }}
    </pre> -->

    <CreateJob
      ref="createJobModal"
    />
    <UpdateJob
      ref="updateJobModal"
    />
    <KanbanJob
      ref="kanbanJobDrawer"
    />
    <ApplyJob
      ref="applyJobDrawer"
      @apply="fetchJobs"
    />
  </div>
</template>
<script>
import JobCard from './JobCard.vue';
import userCandidate from '~/composables/useCandidate';
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

  setup() {
    const {
      jobs,
      isFetchingJobs,
      fetchJobs,
    } = userCandidate();

    fetchJobs();

    return {
      jobs,
      isFetchingJobs,
      fetchJobs,
    };
  },

  methods: {
    openApplyJob(id) {
      this.$refs.applyJobDrawer.open(id)
    }
  }
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
