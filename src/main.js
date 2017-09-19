import Vue from 'vue'
import App from './App'
import moment from 'moment'
import router from '@/common/router'
import api from '@/common/api'
import filter from '@/common/filter'
import store from '@/common/store'
import directive from '@/common/directive'

Vue.config.productionTip = false
Vue.prototype.$http = api
Vue.prototype.$moment = moment


router.beforeEach((to,from,next) => {
    if(to.matched.some( m => m.meta.auth)){
        if(store.state.authorizd) {
            next()
        }else{
            // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
            next({path:'/login',query:{ referrer: to.fullPath} })
        }
    }else{
        next()
    }
})


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
