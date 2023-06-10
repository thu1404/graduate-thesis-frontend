import Vue from 'vue';
import Meta from 'vue-meta';

Vue.use(Meta);

// Optionally, you can set default meta tags here as well
Vue.mixin({
  metaInfo: {
    title: 'Default Page Title',
    meta: [
      // Default meta tags
    ],
  },
});
