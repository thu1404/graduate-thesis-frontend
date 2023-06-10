<template>
  <div>
    <metaInfo>
      <!-- <meta name="csrf-token" :content="csrfToken" /> -->
    </metaInfo>
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

  // computed: {
  //   csrfToken() {
  //     // const { $auth } = this.$nuxt.context; // Access the auth module instance
  //     return this.$auth.strategy.token?.csrfToken || ''; // Retrieve the CSRF token
  //   },
  // },

  // computed: {
  //   ...mapState({
  //     user: state => state.modules.user,
  //   })
  // }



};
</script>
