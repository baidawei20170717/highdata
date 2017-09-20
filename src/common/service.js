import Vue from 'vue'
import api from '@/common/api'

Vue.prototype.$service = {
  //登录
  login(params) {
    // return api.post('login', params)
    return api.post('login.json', params)
  },


  /*--------------------------------------------------主机监控---------------------------------------------------*/


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
  },

  /*--------------------------------------------------数据库监控---------------------------------------------------*/


  //性能监控-数据库监控
  dbMonittor(params){
    // return api.post('performance/db/monitor',params)
    return api.post('performance/db/monitor.json',params)
  },

  //性能监控-数据库监控-基本信息
  dbBasic(ip , params){
    // return api.post('performance/db/'+ ip +'/basic', params)
    return api.post('performance/db/basic.json', params)
  },

  //性能监控-数据库监控-当日数据库命令执行趋势
  dbmysqlDay(ip,params){
    // return api.post('performance/db/'+ ip +'/mysql/day',params)
    return api.post('performance/db/mysqlday.json',params)
  },

  //性能监控-数据库监控-当日连接数趋势
  dbmysqlConn(ip,params){
    // return api.post('performance/db/'+ ip +'/mysql/conn',params)
    return api.post('performance/db/mysqlconn.json',params)
  },

  //性能监控-数据库监控-当日线程数趋势
  dbmysqlThread(ip,params){
    // return api.post('performance/db/'+ ip +'/mysql/thread',params)
    return api.post('performance/db/mysqlthread.json',params)
  },

  //性能监控-数据库监控-当日打开表数趋势
  dbmysqlOpenTable(ip,params){
    // return api.post('performance/db/'+ ip +'/mysql/opentable',params)
    return api.post('performance/db/mysqlOpenTable.json',params)
  },

  //性能监控-数据库监控-当日打开文件数趋势
  dbmysqlOpenFile(ip,params){
    // return api.post('performance/db/'+ ip +'/mysql/openfile',params)
    return api.post('performance/db/mysqlOpenFile.json',params)
  },

  //性能监控-数据库监控-当日发送接收趋势
  dbmysqlBytes(ip,params){
    // return api.post('performance/db/'+ ip +'/mysql/bytes',params)
    return api.post('performance/db/mysqlBytes.json',params)
  },

  /*--------------------------------------------------中间件监控---------------------------------------------------*/

  //性能监控-中间件监控
  wsmonitor(params){
    // return api.post('performance/ws/monitor',params)
    return api.post('performance/ws/monitor.json',params)
  },

  //性能监控-中间件监控-

  /*--------------------------------------------------网络设备监控---------------------------------------------------*/


  //性能监控-网络设备监控
  wsmonitor(params){
    // return api.post('performance/net/monitor',params)
    return api.post('performance/net/monitor.json',params)
  }

  //

}
