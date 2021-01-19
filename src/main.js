import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import router from './router';
import 'vuetify/dist/vuetify.min.css';
import store from './store';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import Axios from 'axios';
import Toasted from 'vue-toasted';

Vue.use(Vuetify);
Vue.use(VeeValidate);
Vue.use(Vuex);
Vue.use(Toasted);

Vue.prototype.$http = Axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ${token}'
}

Vue.config.productionTip = false 

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


