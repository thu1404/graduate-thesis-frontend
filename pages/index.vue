<template>
  <div>
    <Candidate v-if="$auth.user?.role_id === 2"/>
    <Recruiter v-else-if="$auth.user?.role_id === 1"/>
    <div v-else>{{ $auth.loggedIn }}</div>
  </div>
</template>

<script>
import Recruiter from '~/components/Recruiter.vue';
import Candidate from '~/components/Candidate.vue';


export default {
  name: 'IndexPage',

  components: {
    Candidate,
    Recruiter,
  },


};
</script>
