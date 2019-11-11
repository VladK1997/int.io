import './assets/style.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './templates/App.vue'
import Item from './templates/item.vue';
import Home from './templates/home.vue';
import vSelect from 'vue-select';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo, {
    container: "body",
    duration: 2000,
    easing: "ease",
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})

Vue.component('VueSlider', VueSlider);
Vue.component('v-select', vSelect);


window.axios = require('axios');
Vue.use(VueRouter);
const routes = [
    {path: '/vessel', component: Item},
    {path: '/', component: Home},
];
const router = new VueRouter({
    routes
});
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
