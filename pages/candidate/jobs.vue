<template>
  <div>
    <Header />
    <ListJobs
      :jobs="jobs"
      @applyJob="fetchJobs"
    />
  </div>
</template>
<script>
import ListJobs from '../../components/ListJobs/index.vue';
import Header from '../../components/Header.vue';
import userCandidate from '~/composables/useCandidate';

export default {
  name: 'CandidateJobPage',

  components: {
    ListJobs,
    Header,
  },

  setup() {
    const {
      jobs,
      isFetchingJobs,
      fetchJobs,
    } = userCandidate();

    // fetchJobs();

    return {
      jobs,
      isFetchingJobs,
      fetchJobs,
    };
  },

  mounted() {
    this.fetchJobs();
  }
}
</script>
<style lang="scss">
  
</style>
