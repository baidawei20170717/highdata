<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> {{ ip }}</h1>
    <ol class="breadcrumb">
      <li>
        <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link>
      </li>
      <li><a href="javascript:;">性能监控</a></li>
      <li>
        <router-link to="/">中间件监控</router-link>
      </li>
      <li class="active">{{ ip }}</li>
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
        <div class="item"><i class="fa fa-server text-52dabd" aria-hidden="true"></i>数据库：{{basic.wsType}}</div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-database text-76d4f2" aria-hidden="true"></i>内存：{{ basic.memory/1024/1024/1024 | number(2) }}GB</div>
      </div>
      <div class="col-lg-2 col-xs-6">
        <div class="item"><i class="fa fa-dashboard text-e95658" aria-hidden="true"></i>cpu：{{basic.cpu/2}}核</div>
      </div>
      <div class="col-lg-2 col-xs-12">
        <div class="item"><i class="fa fa-tasks text-81bd51" aria-hidden="true"></i>磁盘：{{ basic.disk/1024/1024/1024 | number(2) }}GB</div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item text-center" style="height: 300px;">
            <br>
            <br>
            <br>
            <br>
            <br>
            <p>当天请求总数</p>
            <p class="text-size60 text-76d4f2">{{count}}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <!--连接数图表 -->
            <x-chart :id="countDay_chart" :option="countDay_option" ref="countDay" :css="300"></x-chart>
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
            <!--当日http请求类型统计 -->
            <c-chart :id="methodRand_chart" :option="methodRand_option" ref='methodRand' ></c-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <!--当日http请求状态类型统计 -->
            <c-chart :id="statusRand_chart" :option="statusRand_option" ref="statusRand"></c-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item" >
            <!--当日ke客户端IP TOP统计 -->
            <x-chart :id="clientipTopRand_chart" :option="clientipTopRand_option" ref="clientipTopRand"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item" >
            <!--当日流量趋势 -->
            <x-chart :id="flowDayRand_chart" :option="flowDayRand_option" ref="flowDayRand"></x-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style is-table-data">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <div class="box-header">
              <h3 class="box-title">当日URL访问量 TOP统计</h3>
            </div>
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th style="width: 40px">序号</th>
                  <th>url</th>
                  <th style="width: 70px">访问量</th>
                </tr>
                <tr v-for="(item,index) in requestTop">
                  <td>{{index+1}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.count}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style is-table-data">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <div class="box-header">
              <h3 class="box-title">当日最耗流量URL TOP统计</h3>
            </div>
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th style="width: 40px">序号</th>
                  <th>url</th>
                  <th style="width: 70px">访问量</th>
                </tr>
                <tr v-for="(item,index) in byteTop">
                  <td>{{index+1}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.byte / 1024 | number(2) }}KB</td>
                </tr>
              </table>
            </div>
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
  import CChart from '@/components/cirChart'
  export default {
    name: 'ws_single',
    created (){
      this.search()
    },
    data() {
      return {
        ip : this.$route.params.id,
        count : 0,
        startTime: {
          time: this.$moment().format('YYYY-MM-DD')
        },
        limit:[],
        params : {
          startTime: '',
          endTime: '',
          search: '*'
        },
        basic:{
          memory: 0, cpu: 0, disk: 0
        },
        countDay_chart: 'ws_countDay',
        countDay_option:{},
        methodRand_chart: 'ws_methodRand',
        methodRand_option:{},
        statusRand_chart : 'ws_statusRand',
        statusRand_option:{},
        clientipTopRand_chart:'ws_clientipTopRand',
        clientipTopRand_option:{},
        flowDayRand_chart:'ws_flow',
        flowDayRand_optio:{},
        requestTop:[],
        byteTop:[]
      }
    },
    methods:{
      search(){
        let date = this.startTime.time
        this.params.startTime = this.$moment(date).format('x')
        this.params.endTime =this.$moment(date).add(1, 'd').format('x')

        this.getBasic()
        this.getCount()
        this.getCountDay()
        this.getMethod()
        this.getStatus()
        this.getClientipTop()
        this.getFlowDay()
        this.getRequestTop()
        this.getByteTop()
      },
      getBasic(){
        let self = this
        this.$service.wsBasic(this.ip,this.params)
        .then(function(res){
          self.basic = res
        }).catch(function(err){
          console.log('获取基本信息失败!')
        })
      },
      getCount(){
        let self = this
        this.$service.wsCount(this.ip,this.params)
        .then(function(res){
          self.count = res
        }).catch(function(err){
          console.log('获取当日访问量失败!')
        })
      },
      getCountDay(){
        let self = this
        self.countDay_option = {
            chart: {
                backgroundColor: 'none',
                type: 'line',
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
                    formatter: function() {
                        // return this.value;
                        return '<div style="color:#fff">' + this.value + '</div>'
                    }
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
        this.$service.wsCountDay(this.ip,this.params)
        .then(function(res){
          self.countDay_option.series = res
          self.countDay_option.series[0].color = '#50ddbd'
          self.$refs.countDay.CreateNow()
        }).catch(function(err){
          console.log('获取当日访问趋势失败!')
        })
      },
      getMethod(){
        let self = this
        self.methodRand_option = {
                chart: {
                    backgroundColor: 'none',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '当日HTTP请求类型统计',
                    floating: true,
                    style: {
                        color: '#fff'
                    }

                },
                tooltip: {
                    pointFormat :'<b>数量:</b>  <b>{point.y}</b> <br/>' + '<b>占比:</b>  <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        borderColor: 'none',
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                              return this.point.name + ': ' + this.point.y + ' (' + this.percentage.toFixed(1) + '%)';
                            },
                            style: {
                                color: '#ffffff' || 'black'
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',
                    data: []
                }]
            }
        this.$service.wsMethod(this.ip,this.params)
        .then(function(res){
          self.methodRand_option.series[0].data = res
          self.methodRand_option.series[0].data[0].color = '#fabd2a'
          self.methodRand_option.series[0].data[1].color = '#76d4f2'
          self.methodRand_option.series[0].data[2].color = '#818de8'
          self.$refs.methodRand.CreateNow()
        }).catch(function(err){
          console.log('获取当日HTTP请求类型失败!')
        })
      },
      getStatus(){
        let self = this
        self.statusRand_option = {
                chart: {
                    backgroundColor: 'none',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '当日HTTP请求状态类型统计',
                    floating: true,
                    style: {
                        color: '#fff'
                    }

                },
                tooltip: {
                    pointFormat :'<b>数量:</b>  <b>{point.y}</b> <br/>' + '<b>占比:</b>  <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        borderColor: 'none',
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: '#ffffff' || 'black'
                            }
                        },
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',

                    data: []
                }]
            }
        this.$service.wsStatus(this.ip,this.params)
        .then(function(res){
            self.statusRand_option.series[0].data = res
            self.statusRand_option.series[0].data[0].color = '#fabd2a'
            self.statusRand_option.series[0].data[1].color = '#76d4f2'
            self.statusRand_option.series[0].data[2].color = '#818de8'
            self.statusRand_option.series[0].data[3].color = '#52dabd'
            // self.statusRand_option.series[0].data[4].color = '#e95658'
          self.$refs.statusRand.CreateNow()
        }).catch(function(err){
          console.log('获取当日HTTP请求状态失败!')
        })
      },
      getClientipTop(){
        let self = this
        self.clientipTopRand_option ={
                chart: {
                    type: 'column',
                    backgroundColor: 'none',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日客户端IP TOP统计',
                    align: 'left',
                    x: 20,
                    y: 30,
                    margin: 40,
                    style: {
                        color: '#fff'
                    }
                },
                subtitle: {
                    text: ''
                },
                legend: {
                    enabled: false,
                    itemStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {
                    categories: [],
                    crosshair: true,
                    labels: {

                        style: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                        style: {
                            color: '#fff'
                        }
                    },
                    labels: {
                        formatter: function() {
                            // return this.value;
                            return '<div style="color:#fff">' + this.value + 'k</div>'
                        }
                    },
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    },
                    series: {
                        pointWidth: 30,
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: '#fff'
                            }
                        }
                    }

                },
                series: []
            }
        this.$service.wsClientipTop(this.ip,this.params)
        .then(function(res){
          self.clientipTopRand_option.xAxis.categories = res.categories
          self.clientipTopRand_option.series = new Array(res.series)
          self.clientipTopRand_option.series[0].color = '#76d4f2'
          self.$refs.clientipTopRand.CreateNow()
        }).catch(function(err){
          console.log('获取当日客户端IP TOP统计失败!')
        })
      },
      getRequestTop(){
        let self = this
        this.$service.wsRequestTop(this.ip,this.params)
        .then(function(res){
          self.requestTop = res
        }).catch(function(err){
          console.log('获取当日URL访问量TOP失败!')
        })
      },
      getByteTop(){
        let self = this
        this.$service.wsByteTop(this.ip,this.params)
        .then(function(res){
          self.byteTop = res
        }).catch(function(err){
          console.log('获取当日最耗流量TOP失败!')
        })
      },
      getFlowDay(){
        let self = this
        self.flowDayRand_option = {
            chart: {
                backgroundColor: 'none',
                type: 'areaspline',
                marginLeft: 60,
                marginRight: 20
            },
            title: {
                text: '当日流量趋势',
                align: 'left',
                style: {
                    color: '#fff'
                },
                x: 20,
                y: 30,
                margin: 40
            },
            legend: {
                enabled: false,
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
                // labels: {
                //     formatter: function() {
                //         // return this.value;
                //         return '<div style="color:#fff">' + this.value + '</div>'
                //     }
                // },
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
                },
                series: {
                    pointWidth: 50,
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: '#fff'
                        }
                    }
                }
            },
            series: []
        }
        this.$service.wsFlowDay(this.ip,this.params)
        .then(function(res){
          self.flowDayRand_option.series = res
          self.flowDayRand_option.series[0].color = '#76d4f2'
          self.$refs.flowDayRand.CreateNow()
        }).catch(function(err){
          console.log('获取当日流量趋势失败')
        })
      }
    },
    watch:{
      'startTime.time':function(val,oldVal){
        this.search()
      }
    },
    components: {
      XChart,
      CChart,
      'date-picker': myDatepicker
    }
  }
</script>
