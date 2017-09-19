import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    UserName: 'admin',
    UserRole: '管理员',
    authorizd: true, //登录状态
    isSearch: true
  },
  mutations:{
    ChangeSearch(){
      this.state.isSearch = !this.state.isSearch
    }
  }
})
