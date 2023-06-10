<template>
  <div>
    <div v-for="(job, index) in jobs" :key="index">
      <JobCard :job="job"/>
    </div>
    <pre>
      {{ jobs }}
    </pre>
  </div>
</template>
<script>
import JobCard from './JobCard.vue';
import userCandidate from '~/composables/useCandidate';

export default {
  name: 'ListJobs',

  components: {
    JobCard,
  },

  // props: {
  //   jobs: {
  //     type: Array,
  //     default: () => [],
  //   },
  // },

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
};
</script>
<style lang="scss" scoped>
  
</style>
