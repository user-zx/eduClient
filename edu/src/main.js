import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui'
import vueRouter from 'vue-router';
import vueResource from 'vue-resource';
import Vuex from 'vuex';
import routerConfig from './router.config';
import vueConfig from './store.config';
import "vue-style-loader!css-loader!sass-loader!./assets/css/style.scss";
import 'vue-style-loader!css-loader!sass-loader!element-ui/lib/theme-default/index.css'

Vue.config.debug=true;
Vue.use(vueRouter);
Vue.use(vueResource);
Vue.use(Vuex);
Vue.use(ElementUI);
const router =new vueRouter(routerConfig);
const store = new Vuex.Store(vueConfig);
/*
 //拦截器
 Vue.http.interceptors.push((request, next) => {
 request.method = 'POST';
 next((response) => {
 if(response.ok){
 if(response.data.success){
 return response;
 }else if(response.data.status=='401'){
 window.location.href="/";
 }
 }
 });
 });*/
new Vue({
    router,
    store,
    el:"#edu",
    render: h => h(App)
});