<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> {{ ip }} </h1>
    <ol class="breadcrumb">
      <li>
        <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link>
      </li>
      <li><a href="javascript:;">性能监控</a></li>
      <li>
        <router-link to="/">数据库监控</router-link>
      </li>
      <li class="active"> {{ ip }} </li>
    </ol>
  </section>
  <section class="content">
    <div class="is-search row-base-style" v-show="this.$store.state.isSearch">
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <div class="input-group date">
            <div class="input-group-addon">
              <i class="fa fa-calendar"></i>
            </div>
            <date-picker :date="startTime" :limit="limit"></date-picker>
          </div>
        </div>
        <div class="col-lg-3 col-xs-6">
          <div class="form-group" style="margin-bottom: 0;">
            <input v-model="ip" type="text" class="form-control" placeholder="请输入筛选IP">
          </div>
        </div>
        <div class="col-lg-6 col-xs-12">
          <div class="sidebar-form">
            <div class="input-group">
              <input type="text" v-model='params.search' class="form-control" placeholder="请输入搜索内容">
              <span class="input-group-btn"> <button @click='search' type="button" name="search" class="btn btn-flat"><i class="fa fa-search"></i> </button> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-base-style text-center is-info-row">
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-desktop text-fa9a2a" aria-hidden="true"></i>设备ip：{{ ip }}</div>
      </div>
      <div class="col-lg-2 col-xs-6">
        <div class="item"><i class="fa fa-server text-52dabd" aria-hidden="true"></i>数据库：{{basic.dbType}}</div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-database text-76d4f2" aria-hidden="true"></i>内存：{{ basic.memory/1024/1024/1024 | number(2) }}gb</div>
      </div>
      <div class="col-lg-2 col-xs-6">
        <div class="item"><i class="fa fa-dashboard text-e95658" aria-hidden="true"></i>cpu：{{basic.cpu/2}}核</div>
      </div>
      <div class="col-lg-2 col-xs-12">
        <div class="item"><i class="fa fa-tasks text-81bd51" aria-hidden="true"></i>磁盘：{{ basic.disk/1024/1024/1024 | number(2) }}GB</div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <!--当日数据库命令图表-->
            <x-chart :id="mysqlDay_chart" ref="mysqlDay" :option="mysqlDay_option"></x-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <!--当日连接数趋势-->
            <x-chart :id="mysqlConn_chart" ref="mysqlConn" :option="mysqlConn_option"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <!--当日线程数趋势-->
            <x-chart :id="mysqlThread_chart" ref="mysqlThread" :option="mysqlThread_option"></x-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <!--当日打开表数趋势-->
            <x-chart :id="mysqlOpenTableRand_chart" ref="mysqlOpenTableRand" :option="mysqlOpenTableRand_option"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <!--当日打开文件数趋势-->
            <x-chart :id="mysqlOpenFileRand_chart" ref="mysqlOpenFileRand" :option="mysqlOpenFileRand_option"></x-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <!--当日发送接收趋势-->
            <x-chart :id="mysqlBytesRand_chart" ref="mysqlBytesRand" :option="mysqlBytesRand_option"></x-chart>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script type="es6">
  import myDatepicker from '@/components/datepicker.vue'
  import XChart from '@/components/chat'
  export default {
    name: 'db_single',
    created (){
      this.search()
    },
    data() {
      return {
        ip : this.$route.params.id,
        startTime: {
          time: this.$moment().format('YYYY-MM-DD')
        },
        limit:[],
        params : {
          startTime: '',
          endTime: '',
          search: '*'
        },
        basic : {memory: 0, cpu: 0, disk: 0},
        mysqlDay_chart:'db_mysqlDay',
        mysqlDay_option:{},
        mysqlConn_chart: 'db_mysqlConn',
        mysqlConn_option:{},
        mysqlThread_chart: 'db_mysqlThread',
        mysqlThread_option:{},
        mysqlOpenTableRand_chart: 'db_mysqlOpenTableRand',
        mysqlOpenTableRand_option:{},
        mysqlOpenFileRand_chart: 'db_mysqlOpenFileRand',
        mysqlOpenFileRand_option:{},
        mysqlBytesRand_chart: 'db_mysqlBytesRand',
        mysqlBytesRand_option:{},
      }
    },
    methods:{
      search(){
        let date = this.startTime.time
        this.params.startTime = this.$moment(date).format('x')
        this.params.endTime =this.$moment(date).add(1, 'd').format('x')

        this.getBasic()
        this.getMysqlDay()
        this.getMysqlConn()
        this.getMysqlThread()
        this.getMysqlOpenTable()
        this.getMysqlOpenFile()
        this.getMysqlBytes()
      },
      getBasic(){
        let self = this
        this.$service.dbBasic(this.ip,this.params)
        .then(function(res){
          self.basic = res
        }).catch(function(err){
          console.log('获取数据库基本信息失败!')
        })
      },
      getMysqlDay(){
        let self = this
        self.mysqlDay_option = {
                    chart: {
                        backgroundColor: 'none',
                        type: 'areaspline',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '当日链接数趋势',
                        align: 'left',
                        style: {
                            color: '#fff'
                        },
                        x: 20,
                        y: 30,
                        margin: 40
                    },
                    legend: {
                        itemStyle: {
                            color: '#fff'
                        }
                    },
                    xAxis: {
                        categories: ['0', '4', '8', '12', '16', '20', '24'],
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        },
                        labels: {
                            enabled: false //不显示横坐标
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            formatter: function() {
                                // return this.value;
                                return '<div style="color:#fff">' + this.value + '</div>'
                            }
                        },
                        gridLineColor: '#333', //网格线样式
                        tickAmount: 7 //显示刻度数
                    },
                    tooltip: {
                        split: true,
                        valueSuffix: ''
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#fff',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#fff'
                            }
                        }
                    },
                    series: [{
                        name: 'memory',
                        data: [30, 30, 30, 40, 50, 60, 70],
                        color: '#f7e011'
                    }, {
                        name: 'swap',
                        data: [50, 15, 20, 30, 38, 30, 28],
                        color: '#56c0e8'
                    }]
                }
        this.$service.dbmysqlDay(this.ip,this.params)
        .then(function(res){
          self.mysqlDay_option.series = res
          self.mysqlDay_option.series[0].color = '#53ddbf'
          self.mysqlDay_option.series[1].color = '#56c0e8'
          self.mysqlDay_option.series[2].color = '#facc2a'
          self.mysqlDay_option.series[3].color = '#ff6163'
          self.$refs.mysqlDay.CreateNow()
        }).catch(function(err){
          console.log('获取当日数据库命令执行趋势失败!')
        })
      },
      getMysqlConn(){
        let self = this
        self.mysqlConn_option = {
                    chart: {
                        backgroundColor: 'none',
                        type: 'areaspline',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '当日链接数趋势',
                        align: 'left',
                        style: {
                            color: '#fff'
                        },
                        x: 20,
                        y: 30,
                        margin: 40
                    },
                    legend: {
                        itemStyle: {
                            color: '#fff'
                        }
                    },
                    xAxis: {
                        categories: ['0', '4', '8', '12', '16', '20', '24'],
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        },
                        labels: {
                            enabled: false //不显示横坐标
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            formatter: function() {
                                // return this.value;
                                return '<div style="color:#fff">' + this.value + '</div>'
                            }
                        },
                        gridLineColor: '#333', //网格线样式
                        tickAmount: 7 //显示刻度数
                    },
                    tooltip: {
                        split: true,
                        valueSuffix: ''
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#fff',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#fff'
                            }
                        }
                    },
                    series: []
                }
        this.$service.dbmysqlConn(this.ip,this.params)
        .then(function(res){
          self.mysqlConn_option.series = res
          self.mysqlConn_option.series[0].color = '#f7e011'
          // self.mysqlConn_option.series[1].color = '#56c0e8'
          self.$refs.mysqlConn.CreateNow()
        }).catch(function(err){
          console.log('获取连接数趋势失败!')
        })
      },
      getMysqlThread(){
        let self = this
        self.mysqlThread_option ={
                    chart: {
                        backgroundColor: 'none',
                        type: 'areaspline',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '当日线控数趋势',
                        align: 'left',
                        style: {
                            color: '#fff'
                        },
                        x: 20,
                        y: 30,
                        margin: 40
                    },
                    legend: {
                        itemStyle: {
                            color: '#fff'
                        }
                    },
                    xAxis: {
                        categories: ['0', '4', '8', '12', '16', '20', '24'],
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        },
                        labels: {
                            enabled: false //不显示横坐标
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            formatter: function() {
                                // return this.value;
                                return '<div style="color:#fff">' + this.value + '</div>'
                            }
                        },
                        gridLineColor: '#333', //网格线样式
                        tickAmount: 7 //显示刻度数
                    },
                    tooltip: {
                        split: true,
                        valueSuffix: ''
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#fff',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#fff'
                            }
                        }
                    },
                    series: []
                }
        this.$service.dbmysqlThread(this.ip,this.params)
        .then(function(res){
          self.mysqlThread_option.series = res
          self.mysqlThread_option.series[0].color = '#f7e011'
          // self.mysqlThread_option.series[1].color = '#56c0e8'
          self.$refs.mysqlThread.CreateNow()
        }).catch(function(err){
          console.log('获取线程数趋势失败!')
        })
      },
      getMysqlOpenTable(){
        let self = this
        self.mysqlOpenTableRand_option ={
                    chart: {
                        backgroundColor: 'none',
                        type: 'areaspline',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '当日打开表格趋势',
                        align: 'left',
                        style: {
                            color: '#fff'
                        },
                        x: 20,
                        y: 30,
                        margin: 40
                    },
                    legend: {
                        itemStyle: {
                            color: '#fff'
                        }
                    },
                    xAxis: {
                        categories: ['0', '4', '8', '12', '16', '20', '24'],
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        },
                        labels: {
                            enabled: false //不显示横坐标
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            formatter: function() {
                                // return this.value;
                                return '<div style="color:#fff">' + this.value + '</div>'
                            }
                        },
                        gridLineColor: '#333', //网格线样式
                        tickAmount: 7 //显示刻度数
                    },
                    tooltip: {
                        split: true,
                        valueSuffix: ''
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#fff',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#fff'
                            }
                        }
                    },
                    series: []
                }
        this.$service.dbmysqlOpenTable(this.ip,this.params)
        .then(function(res){
          self.mysqlOpenTableRand_option.series = res
          self.mysqlOpenTableRand_option.series[0].color = '#f7e011'
          // self.mysqlOpenTableRand_option.series[1].color = '#56c0e8'
          self.$refs.mysqlOpenTableRand.CreateNow()
        }).catch(function(err){
          console.log('获取打开表数趋势失败!')
        })
      },
      getMysqlOpenFile(){
        let self = this
        self.mysqlOpenFileRand_option = {
                    chart: {
                        backgroundColor: 'none',
                        type: 'areaspline',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '当日打开表格趋势',
                        align: 'left',
                        style: {
                            color: '#fff'
                        },
                        x: 20,
                        y: 30,
                        margin: 40
                    },
                    legend: {
                        itemStyle: {
                            color: '#fff'
                        }
                    },
                    xAxis: {
                        categories: ['0', '4', '8', '12', '16', '20', '24'],
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        },
                        labels: {
                            enabled: false //不显示横坐标
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            formatter: function() {
                                // return this.value;
                                return '<div style="color:#fff">' + this.value + '</div>'
                            }
                        },
                        gridLineColor: '#333', //网格线样式
                        tickAmount: 7 //显示刻度数
                    },
                    tooltip: {
                        split: true,
                        valueSuffix: ''
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#fff',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#fff'
                            }
                        }
                    },
                    series: []
                }
        this.$service.dbmysqlOpenFile(this.ip,this.params)
        .then(function(res){
          self.mysqlOpenFileRand_option.series = res
          self.mysqlOpenFileRand_option.series[0].color = '#f7e011'
          // self.mysqlOpenFileRand_option.series[1].color = '#56c0e8'
          self.$refs.mysqlOpenFileRand.CreateNow()
        }).catch(function(err){
          console.log('获取打开文件数趋势失败!')
        })
      },
      getMysqlBytes(){
        let self = this
        self.mysqlBytesRand_option = {
                    chart: {
                        backgroundColor: 'none',
                        type: 'areaspline',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '当日数据库命令执行趋势',
                        align: 'left',
                        style: {
                            color: '#fff'
                        },
                        x: 20,
                        y: 30,
                        margin: 40
                    },
                    legend: {
                        itemStyle: {
                            color: '#fff'
                        }
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            millisecond: '%H:%M:%S.%L',
                            second: '%H:%M:%S',
                            minute: '%H:%M',
                            hour: '%H:%M',
                            day: '%m-%d',
                            week: '%m-%d',
                            month: '%Y-%m',
                            year: '%Y'
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        labels: {
                            // formatter: function() {
                            //     // return this.value;
                            //     return '<div style="color:#fff">' + this.value + 'k</div>'
                            // }
                        },
                        gridLineColor: '#333', //网格线样式
                        tickAmount: 7 //显示刻度数
                    },
                    tooltip: {
                      dateTimeLabelFormats: {
                          millisecond: '%H:%M:%S.%L',
                          second: '%H:%M:%S',
                          minute: '%H:%M',
                          hour: '%H:%M',
                          day: '%Y-%m-%d',
                          week: '%m-%d',
                          month: '%Y-%m',
                          year: '%Y'
                      }
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#fff',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#fff'
                            }
                        }
                    },
                    series: []
                }
        this.$service.dbmysqlBytes(this.ip,this.params)
        .then(function(res){
          self.mysqlBytesRand_option.series = res
          self.mysqlBytesRand_option.series[0].color = '#53ddbf'
          self.mysqlBytesRand_option.series[1].color = '#56c0e8'
          self.$refs.mysqlBytesRand.CreateNow()
        }).catch(function(err){
          console.log('获取发送接收字节趋势失败!')
        })
      },
    },
    watch:{
      'startTime.time':function(val,oldVal){
        this.search()
      }
    },
    components: {
      XChart,
      'date-picker': myDatepicker
    }
}
</script>
