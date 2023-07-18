<template>
  <div>
    <Header />
    <ListCvs />
  </div>
</template>
<script>
import ListCvs from '../../components/ListCvs/index.vue';
import Header from '../../components/Header.vue';

export default {
  name: 'CandidateProfile',

  components: {
    ListCvs,
    Header,
  },
}
</script>
<style lang="scss">
  
</style>
