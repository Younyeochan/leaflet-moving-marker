import Vue from 'vue'
import App from './App.vue'
import { router } from './routes/index.js';
import { store } from './store/index'
import 'leaflet/dist/leaflet.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
