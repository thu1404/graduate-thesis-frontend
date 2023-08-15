<template>
  <div>
    <Header />
    <ListCvs
      :cvs="cvs"
      @updateCVs="fetchCvs"
    />
  </div>
</template>
<script>
import ListCvs from '../../components/ListCvs/index.vue';
import Header from '../../components/Header.vue';
import userCandidate from '~/composables/useCandidate';

export default {
  name: 'CandidateProfile',

  components: {
    ListCvs,
    Header,
  },

  setup() {
    const {
      cvs,
      isFetchingCvs,
      fetchCvs,
    } = userCandidate();

    return {
      cvs,
      isFetchingCvs,
      fetchCvs,
    };
  },

  async mounted() {
    await this.fetchCvs();
    console.log('dsfsdfsdf');
  },
}
</script>
<style lang="scss">
  
</style>
