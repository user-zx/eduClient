import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'
import ElementUI from 'element-ui'  
import 'element-ui/lib/theme-default/index.css'
import routerConfig from "./router.config.js"
import './assets/style/public.scss'
require('jquery');//jq成为全局
Vue.config.debug=true; 
Vue.use(ElementUI);
Vue.use(vueRouter);
Vue.use(vueResource);
const router = new vueRouter(routerConfig)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
