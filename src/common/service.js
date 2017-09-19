import Vue from 'vue'
import api from '@/common/api'

Vue.prototype.$service = {
  //登录
  login(params) {
    // return api.post('login', params)
    return api.post('login.json', params)
  },

  //性能监控-主机监控
  hostMonitor(params){
    // return api.post('performance/host/monitor', params)
    return api.post('performance/host/monitor.json', params)
  },

  //性能监控-主机监控-基本信息
  hostBasic(ip , params){
    // return api.post('performance/host/' + ip + '/basic', params)
    return api.post('performance/host/basic.json', params)
  },

  //性能监控-主机监控-当日cpu使用率趋势
  hostCpuDay(ip , params){
    //return api.post('performance/host/' + ip + '/cpu/day', params)
    return api.post('performance/host/cpuday.json', params)
  },

  //性能监控-主机监控-当日内存使用率趋势
  hostMemDay(ip , params){
    //return api.post('performance/host/' + ip + '/mem/day', params)
    return api.post('performance/host/memday.json', params)
  },

  //性能监控-主机监控-当前进程列表
  hostProcess(ip , params){
    //return api.post('performance/host/' + ip + '/process', params)
    return api.post('performance/host/process.json', params)
  },

  //性能监控-主机监控-当前磁盘列表
  hostDisk(ip , params){
    //return api.post('performance/host/' + ip + '/disk', params)
    return api.post('performance/host/disk.json', params)
  }

}
