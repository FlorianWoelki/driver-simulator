import Vue from 'vue';
import Router from 'vue-router';
import StreetMap from './views/StreetMap.vue';
import Information from './views/Information.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'streetMap',
      component: StreetMap
    },
    {
      path: '/information',
      name: 'information',
      component: Information
    }
  ]
});
