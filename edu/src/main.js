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
Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if (response.status == 403) {
            //to login
            window.location.href="/login";
        }
    });
});
new Vue({
    router,
    store,
    el:"#edu",
    render: h => h(App)
});