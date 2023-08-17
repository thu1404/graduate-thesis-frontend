import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add the solid icons to the library
library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);