<template>
  <div v-if="$auth.user?.role_id === 1">
    <button @click="redirectHRJob">Manage your job posts</button>
    <button @click="redirectHRProcess">Manage your hiring process</button>
  </div>
  <div v-else>
    <button @click="redirectCandidateProfile">Manage your profiles</button>
    <button @click="redirectCandidateJob">Find jobs</button>
  </div>
</template>
<script>
export default {
  name: 'Welcome',

  methods: {
    redirectCandidateProfile() {
      if(this.$auth.user?.role_id === 2) {
        this.$router.push('/candidate');
      }
    },
    redirectCandidateJob() {
      if(this.$auth.user?.role_id === 2) {
        this.$router.push('/candidate/jobs');
      }
    },
    redirectHRJob() {
      if(this.$auth.user?.role_id === 1) {
        this.$router.push('/recruiter');
      }
    },
    redirectHRProcess() {
      if(this.$auth.user?.role_id === 1) {
        this.$router.push('/recruiter/process');
      }
    },
  }
}
</script>
<style lang="scss">
  
</style>
