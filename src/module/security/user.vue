<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> 用户访问监控 </h1>
    <ol class="breadcrumb">
      <li>
        <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link>
      </li>
      <li class=""><a href="javascript:;">安全监控</a></li>
      <li class="active">用户访问监控</li>
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
        <div class="col-lg-9 col-xs-12">
          <div class="sidebar-form">
            <div class="input-group">
              <input type="text" v-model='params.search' class="form-control" placeholder="请输入搜索内容">
              <span class="input-group-btn"> <button @click='search' type="button" name="search" class="btn btn-flat"><i class="fa fa-search"></i> </button> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row-base-style text-center is-info-row is-info-row2">
      <div class="title">当天登录失败统计</div>
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <div class="item">登录失败总数
            <p class="text-size20 text-76d4f2">{{count.sum}}</p>
          </div>
        </div>
        <div class="col-lg-3 col-xs-6">
          <div class="item">windows登录失败
            <p class="text-size20 text-52dabd">{{count.win}}</p>
          </div>
        </div>
        <div class="col-lg-3 col-xs-6">
          <div class="item">linux登录失败
            <p class="text-size20 text-b288ff">{{count.linx}}</p>
          </div>
        </div>
        <div class="col-lg-3 col-xs-12">
          <div class="item">vpn登录失败
            <p class="text-size20 text-f8cf61">{{count.vpn}}</p>
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
            <x-chart :id="abnWinDisipTop_chart" :option="abnWinDisipTop_option" ref="abnWinDisipTop"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="abnLinuxDisipTop_chart" :option="abnLinuxDisipTop_option" ref="abnLinuxDisipTop"></x-chart>
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
            <x-chart :id="abnWinDay_chart" :option="abnWinDay_option" ref="abnWinDay"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="abnLinuxDay_chart" :option="abnLinuxDay_option" ref="abnLinuxDay"></x-chart>
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
    name: 'user',
    created (){
      this.search()
    },
    data() {
      return {
        startTime: {
          time: this.$moment().format('YYYY-MM-DD')
        },
        limit:[],
        params : {
          startTime: '',
          endTime: '',
          search: '*'
        },
        count:{linx: 0, vpn: 0, sum: 0, win: 0},
        abnWinDisipTop_chart: 'user_abnWinDisipTop_chart',
        abnWinDisipTop_option: {},
        abnLinuxDisipTop_chart: 'user_abnLinuxDisipTop_chart',
        abnLinuxDisipTop_option:{},
        abnWinDay_chart: 'user_abnWinDay_chart',
        abnWinDay_option:{},
        abnLinuxDay_chart: 'user_abnLinuxDay_chart',
        abnLinuxDay_option:{}
      }
    },

    methods:{
      search(){
        let date = this.startTime.time
        this.params.startTime = this.$moment(date).format('x')
        this.params.endTime =this.$moment(date).add(1, 'd').format('x')

        this.getCount()
        this.getAbnWinDisipTop()
        this.getAbnLinuxDisipTop()
        this.getAbnWinDay()
        this.getAbnLinuxDay()
      },
      getCount(){
        let self = this
        this.$service.usercount(this.params)
        .then(function(res){
          self.count = res
        }).catch(function(err){
          console.log('获取数量统计数据失败!')
        })
      },
      getAbnWinDisipTop(){
        let self = this
        this.abnWinDisipTop_option ={
            chart: {
                type: 'column',
                backgroundColor: 'none',
                marginLeft: 60,
                marginRight: 20
            },
            title: {
                text: '当天windows登录失败目标IP TOP统计',
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
        this.$service.userabnWinDisipTop(this.params)
        .then(function(res){
          self.abnWinDisipTop_option.xAxis.categories = res.categories
          self.abnWinDisipTop_option.series = new Array(res.series)
          self.abnWinDisipTop_option.series[0].color = '#76d4f2'
          self.$refs.abnWinDisipTop.CreateNow()
        }).catch(function(err){
          console.log('获取windows登录失败TOP统计失败!')
        })
      },
      getAbnLinuxDisipTop(){
        let self = this
        this.abnLinuxDisipTop_option ={
            chart: {
                type: 'column',
                backgroundColor: 'none',
                marginLeft: 60,
                marginRight: 20
            },
            title: {
                text: '当天linux登录失败目标IP TOP统计',
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
        this.$service.userabnLinuxDisipTop(this.params)
        .then(function(res){
          self.abnLinuxDisipTop_option.xAxis.categories = res.categories
          self.abnLinuxDisipTop_option.series = new Array(res.series)
          self.abnLinuxDisipTop_option.series[0].color = '#2effd2'
          self.$refs.abnLinuxDisipTop.CreateNow()
        }).catch(function(err){
          console.log('获取linux登录失败TOP统计失败!')
        })
      },
      getAbnWinDay(){
        let self = this
        self.abnWinDay_option = {
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天windows登录失败趋势',
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
                    categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
        this.$service.userabnWinDay(this.ip,this.params)
        .then(function(res){
          self.abnWinDay_option.series[0]=res
          self.abnWinDay_option.series[0].color="#76d4f2"
          self.$refs.abnWinDay.CreateNow()
        }).catch(function(err){
          console.log('获取windows登录失败趋势失败!')
        })
      },
      getAbnLinuxDay(){
        let self = this
        self.abnLinuxDay_option = {
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天linux登录失败趋势',
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
                    categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
                series: [{
                    name: '流量',
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#2effd2'
                }]
            }
        this.$service.userabnLinuxDay(this.ip,this.params)
        .then(function(res){
          self.abnLinuxDay_option.series[0]=res
          self.abnLinuxDay_option.series[0].color="#2effd2"
          self.$refs.abnLinuxDay.CreateNow()
        }).catch(function(err){
          console.log('获取linux登录失败趋势失败!')
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
      CChart,
      'date-picker': myDatepicker
    }
  }
</script>
