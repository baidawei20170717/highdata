// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/common/router'
import api from '@/common/api'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.prototype.$http = api;
/* eslint-disable no-new */

Vue.filter('number',function(key,val) {
  return key.toFixed(1);
});
Vue.use(Vuex)

const store =  new Vuex.Store({
  state:{
    UserName: 'admin',
    UserRole: '管理员',
    isSearch: true
  },
  mutations:{
    ChangeSearch(){
      this.state.isSearch = !this.state.isSearch
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})