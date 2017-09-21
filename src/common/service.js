import Vue from 'vue'
import api from '@/common/api'

Vue.prototype.$service = {
  //登录
  login(params) {
    // return api.post('login', params)
    return api.post('login.json', params)
  },


  /*------------------------------------------------------------------------------------------------------------*/
  /*--------------------------------------------------主机监控---------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------*/

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

  //性能监控-中间件监控-基本信息
  wsBasic(ip,params){
    //return api.post('performance/ws/'+ ip +'/basic',params)
    return api.post('performance/ws/basic.json',params)
  },

  //性能监控-中间件监控-当天请求总数
  wsCount(ip,params){
    //return api.post('performance/ws/'+ ip +'/count',params)
    return api.post('performance/ws/count.json',params)
  },

  //性能监控-中间件监控-当日连接数趋势
  wsCountDay(ip,params){
    //return api.post('performance/ws/'+ ip +'/count/day',params)
    return api.post('performance/ws/day.json',params)
  },

  //性能监控-中间件监控-当日HTTP请求类型统计
  wsMethod(ip,params){
    //return api.post('performance/ws/'+ ip +'/method',params)
    return api.post('performance/ws/method.json',params)
  },

  //性能监控-中间件监控-当日HTTP请求状态统计
  wsStatus(ip,params){
    //return api.post('performance/ws/'+ ip +'/status',params)
    return api.post('performance/ws/status.json',params)
  },

  //性能监控-中间件监控-当日客户端IP TOP统计
  wsClientipTop(ip,params){
    //return api.post('performance/ws/'+ ip +'/clientip/top',params)
    return api.post('performance/ws/clientip.json',params)
  },

  //性能监控-中间件监控-当日流量趋势
  wsFlowDay(ip,params){
    //return api.post('performance/ws/'+ ip +'/flow/day',params)
    return api.post('performance/ws/flowday.json',params)
  },

  //性能监控-中间件监控-当日URL访问量 TOP统计
  wsRequestTop(ip,params){
    //return api.post('performance/ws/'+ ip +'/request/top',params)
    return api.post('performance/ws/requesttop.json',params)
  },

  //性能监控-中间件监控-当日最耗流量URL TOP统计
  wsByteTop(ip,params){
    //return api.post('performance/ws/'+ ip +'/byte/top',params)
    return api.post('performance/ws/bytetop.json',params)
  },


  /*--------------------------------------------------网络设备监控---------------------------------------------------*/


  //性能监控-网络设备监控
  netmonitor(params){
    // return api.post('performance/net/monitor',params)
    return api.post('performance/net/monitor.json',params)
  },

  //性能监控-网络设备监控-基本信息
  netBasic(ip,params){
    // return api.post('/highdata/performance/net/'+ip+'/basic',params)
    return api.post('performance/net/basic.json',params)
  },

  //性能监控-网络设备监控-当日事件数
  netCount(ip,params){
    // return api.post('/highdata/performance/net'+ip+'/count')
    return api.post('performance/net/count.json',params)
  },

  //性能监控-网络设备监控-当日事件趋势
  netCountDay(ip,params){
    // return api.post('/highdata/performance/net/'+ip+'/count/day',params)
    return api.post('performance/net/countday.json')
  },

  //性能监控-网络设备监控-当天最后事件
  netLastEvent(ip,params){
    // return api.post('/highdata/performance/net/'+ip+'/lastevent',params)
    return api.post('performance/net/lastevent.json')
  },




  /*------------------------------------------------------------------------------------------------------------*/
  /*--------------------------------------------------外网边界监控---------------------------------------------------*/
  /*------------------------------------------------------------------------------------------------------------*/

  //外网边界监控-当天DDOS事件总数
  exddosCount(params) {
    //return http.post('security/ex/ddos/count', params)
    return api.post('security/ex/count.json', params)
  },

  //当天DDOS事件趋势
  exddosDay(params) {
    //return http.post('security/ex/ddos/day', params)
    return api.post('security/ex/day.json', params)
  },

  //当天DDOS攻击类型统计
  exddosType(params) {
    //return http.post('security/ex/ddos/type', params)
    return api.post('security/ex/type.json', params)
  },

  //当天DDOS目标端口统计
  exddosDisport(params) {
    //return http.post('security/ex/ddos/disport', params)
    return api.post('security/ex/disport.json', params)
  },

  //最近DDOS事件
  exevent(params) {
    //return http.post('security/ex/event', params)
    return api.post('security/ex/event.json', params)
  },


  /*--------------------------------------------------内网边界监控---------------------------------------------------*/

  //当天攻击总量
  inattackCount(params) {
    //return api.post('security/in/attack/count', params)
    return api.post('security/in/count.json', params)
  },

  //当天攻击趋势
  inattackDay(params) {
    //return api.post('security/in/attack/day', params)
    return api.post('security/in/day.json', params)
  },

  //当天连接状态趋势
  inconnStatus(params) {
    //return api.post('security/in/connstatus', params)
    return api.post('security/in/connstatus.json', params)
  },

  //当天攻击类型TOP统计
  inattackTypeTop(params) {
    //return api.post('security/in/attacktype/top', params)
    return api.post('security/in/top.json', params)
  },

  //当天攻击源IP TOP统计
  insrcipTop(params) {
    //return api.post('security/in/srcip/top', params)
    return api.post('security/in/srcip.json', params)
  },

  //当天攻击IP TOP统计
  indisipTop(params) {
    //return api.post('security/in/disip/top', params)
    return api.post('security/in/disip.json', params)
  },

  //当天攻击端口 TOP统计
  indisportTop(params) {
    //return api.post('security/in/disport/top', params)
    return api.post('security/in/disporttop.json', params)
  },

  /*--------------------------------------------------安全防御监控---------------------------------------------------*/

  //当天WAF事件总数
  wafCount(params) {
      //return api.post('security/def/waf/count', params)
      return api.post('security/def/count.json', params)
  },

  //当天WAF攻击趋势
  wafDay(params) {
      //return api.post('security/def/waf/day', params)
      return api.post('security/def/day.json', params)
  },

  //当天WAF攻击级别统计
  wafAttackLevel(params) {
      //return api.post('security/def/waf/attack/level', params)
      return api.post('security/def/level.json', params)
  },

  //当天WAF攻击类型统计
  wafAttackType(params) {
      //return api.post('security/def/waf/attack/type', params)
      return api.post('security/def/type.json', params)
  },


  //当天WAF目标IP TOP统计
  wafDisipTop(params) {
      //return api.post('security/def/waf/disip/top', params)
      return api.post('security/def/disip.json', params)
  },


  //当天WAF源IP TOP统计
  wafSrcipTop(params) {
    //  return api.post('security/def/waf/srcip/top', params)
      return api.post('security/def/srcip.json', params)
  },

  //当天WAF攻击目标端口TOP统计
  wafDisportTop(params) {
      //return api.post('security/def/waf/disport/top', params)
      return api.post('security/def/disport.json', params)
  },

  //当天上网行为协议类型统计
  wafibmaType(params) {
      //return api.post('security/def/ibma/type', params)
      return api.post('security/def/ibma.json', params)
  },

  /*--------------------------------------------------安全威胁监控---------------------------------------------------*/

  //当日关注
  twday(params) {
      //return api.post('security/tw/day', params)
      return api.post('security/tw/day.json', params)
  },

  //当天威胁趋势
  twweek(params) {
      //return api.post('security/tw/week', params)
      return api.post('security/tw/week.json', params)
  },

  //本周威胁趋势
  twassets(params) {
      //return api.post('security/tw/assets', params)
      return api.post('security/tw/assets.json', params)
  },

  //当天资产事件统计TOP10
  twflowDay(params) {
      //return api.post('security/tw/flowday', params)
      return api.post('security/tw/flowday.json', params)
  },

  /*--------------------------------------------------系统安全监控---------------------------------------------------*/
  //当天windows事件量
  syswinCount(params) {
      //return api.post('security/sys/win/count', params
      return api.post('security/sys/wincount.json', params)
  },

  //当天linux事件量
  syslinuxCount(params) {
      //return api.post('security/sys/linux/count', params)
      return api.post('security/sys/linuxcount.json', params)
  },

  //当天windows日志趋势
  syswinDay(params) {
      //return api.post('security/sys/win/day', params)
      return api.post('security/sys/winday.json', params)
  },

  //当天linux日志趋势
  syslinuxDay(params) {
      //return api.post('security/sys/linux/day', params)
      return api.post('security/sys/linuxday.json', params)
  },

  //当天windows事件级别统计
  syswinLevel(params) {
      //return api.post('security/sys/win/level', params)
      return api.post('security/sys/winlevel.json', params)
  },

  //当天linux事件级别统计
  syslinuxLevel(params) {
      //return api.post('security/sys/linux/level', params)
      return api.post('security/sys/linuxlevel.json', params)
  },


  /*--------------------------------------------------用户访问监控---------------------------------------------------*/
  //当天登录失败统计
  usercount(params) {
      //return api.post('security/user/count', params)
      return api.post('security/user/count.json', params)
  },

  //当天windows登录失败目标IP TOP统计
  userabnWinDisipTop(params) {
      //return api.post('security/user/abn/win/disip/top', params)
      return api.post('security/user/windisiptop.json', params)
  },

  //当天linux登录失败目标IP TOP统计
  userabnLinuxDisipTop(params) {
      //return api.post('security/user/abn/linux/disip/top', params)
      return api.post('security/user/linuxdisiptop.json', params)
  },

  //当天windows登录失败趋势
  userabnWinDay(params) {
      //return api.post('security/user/abn/win/day', params)
      return api.post('security/user/winday.json', params)
  },

  //当天linux登录失败趋势
  userabnLinuxDay(params) {
      //return api.post('security/user/abn/linux/day', params)
      return api.post('security/user/linuxday.json', params)
  }


  /*--------------------------------------------------告警监控---------------------------------------------------*/
  


}
