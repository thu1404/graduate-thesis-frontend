<template>
  <div>
    <Header />
    <div v-if="$auth?.loggedIn">
      <Welcome />
    </div>

    <div v-else>
      <Unauthenticated/>
    </div>
  </div>
</template>

<script>
import Unauthenticated from '../components/Unauthenticated.vue';
import Welcome from '../components/Welcome.vue';
import Header from '../components/Header.vue';

export default {
  name: 'IndexPage',

  components: {
    Unauthenticated,
    Welcome,
    Header,
  },


};
</script>
