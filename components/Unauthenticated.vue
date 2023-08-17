<template>
  <div>
    please login to use

    <el-button @click="goToLogin">Login</el-button>
  </div>
</template>
<script>
export default {
  name: "UnauthorizePage",

  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
  },
}
</script>
<style lang="scss">
  
</style>
