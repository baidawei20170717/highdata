import Vue from 'vue'
import Router from 'vue-router'
import AppHeader from '@/components/header.vue'
import AppAside from '@/components/aside.vue'

const home = r => require.ensure([], () => r(require('@/module/index/home.vue')), 'home')
const login = r => require.ensure([], () => r(require('@/module/login/login.vue')), 'login')
const db = r => require.ensure([], () => r(require('@/module/performance/db.vue')), 'db')
const db_single = r => require.ensure([], () => r(require('@/module/performance/db_single.vue')), 'db_single')
const host = r => require.ensure([], () => r(require('@/module/performance/host.vue')), 'host')
const host_single = r => require.ensure([], () => r(require('@/module/performance/host_single.vue')), 'host_single')
const net = r => require.ensure([], () => r(require('@/module/performance/net.vue')), 'net')
const net_single = r => require.ensure([], () => r(require('@/module/performance/net_single.vue')), 'net_single')
const ws = r => require.ensure([], () => r(require('@/module/performance/ws.vue')), 'ws')
const ws_single = r => require.ensure([], () => r(require('@/module/performance/ws_single.vue')), 'ws_single')
const def = r => require.ensure([], () => r(require('@/module/security/def.vue')), 'def')
const ex = r => require.ensure([], () => r(require('@/module/security/ex.vue')), 'ex')
const int = r => require.ensure([], () => r(require('@/module/security/int.vue')), 'int')
const sys = r => require.ensure([], () => r(require('@/module/security/sys.vue')), 'chunk14')
const tw = r => require.ensure([], () => r(require('@/module/security/tw.vue')), 'tw')
const user = r => require.ensure([], () => r(require('@/module/security/user.vue')), 'user')
const monitor = r => require.ensure([], () => r(require('@/module/warn/monitor.vue')), 'monitor')
const monitor_single = r => require.ensure([], () => r(require('@/module/warn/monitor_single.vue')), 'monitor_single')
const security = r => require.ensure([], () => r(require('@/module/warn/security.vue')), 'security')
const security_single = r => require.ensure([], () => r(require('@/module/warn/security_single.vue')), 'security_single')


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      components: {
        default: login
      }
    },
    {
      path: '/',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: home
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/performance/db',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: db
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      name: 'db_single',
      path: '/performance/db/:id',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: db_single
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/Performance/host',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: host
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      name: 'host_single',
      path: '/Performance/host/:id',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: host_single
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/Performance/net',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: net
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      name: 'net_single',
      path: '/Performance/net/:id',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: net_single
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/Performance/ws',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: ws
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      name: 'ws_single',
      path: '/Performance/ws/:id',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: ws_single
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/security/def',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: def
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/security/ex',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: ex
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/security/int',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: int
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/security/sys',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: sys
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/security/tw',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: tw
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/security/user',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: user
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/warn/monitor',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: monitor
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      name:'warn_monitor_single',
      path: '/warn/monitor/:id',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: monitor_single
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      path: '/warn/security',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: security
      },
      meta:{
        auth: true //需要校验
      }
    },
    {
      name:'warn_security_single',
      path: '/warn/security/:id',
      components: {
        header: AppHeader,
        aside: AppAside,
        default: security_single
      },
      meta:{
        auth: true //需要校验
      }
    }
    // ,
    // {
    //   path:'*',
    //   component: {template:'<div style="font-size:48px;color:#fff">404</div>'}
    // }
  ]
})
