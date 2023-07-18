<template>
  <div>
    please login to use

    <button @click="goToLogin">Login</button>
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
