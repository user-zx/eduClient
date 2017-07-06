import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui'
import vueRouter from 'vue-router';
import vueResource from 'vue-resource';
import Vuex from 'vuex';
import routerConfig from './router.config';
import './utils';
import vueConfig from './store.config';
import imgUtils from './imgUtil'; 
import page from './components/currentPage.js';
import "vue-style-loader!css-loader!sass-loader!./assets/css/style.scss";
import 'vue-style-loader!css-loader!sass-loader!element-ui/lib/theme-default/index.css'
import areas from './area'

Vue.config.debug=true;
Vue.use(ElementUI);
Vue.use(vueRouter);
Vue.use(vueResource);
Vue.use(Vuex);
Vue.use(imgUtils);
Vue.use(page);
Vue.use(areas);
const router =new vueRouter(routerConfig);
const store = new Vuex.Store(vueConfig);
Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if (response.status == 403) {
            window.location.href="/login";
        } else if(response.status >= 500) {
            // window.location.href="/500";
            console.log(response);
        }
    });
});
new Vue({
    store,
    router,
    el:"#edu",
    render: h => h(App)
});