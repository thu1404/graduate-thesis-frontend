
import Vue from 'vue'
import vueCsrf from 'vue-csrf'

Vue.use(vueCsrf, {
  keyName: '_csrf',
  tokenGetter: () => document.getElementById('csrfToken').getAttribute('content')
});
