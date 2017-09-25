<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> 安全威胁监控 </h1>
    <ol class="breadcrumb">
      <li>  <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link></li>
      <li class=""><a href="javascript:;">安全监控</a></li>
      <li class="active">安全威胁监控</li>
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
    <div class="row row-base-style text-center is-info-row">
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-bug text-fa9a2a" aria-hidden="true"></i>木马：{{day.trojan != null ? day.trojan : '加载中..'}}</div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-ban text-76d4f2" aria-hidden="true"></i>威胁：{{day.threaten != null ? day.threaten : '加载中..'}}</div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-hand-pointer-o text-e95658" aria-hidden="true"></i>行为：{{day.behavior != null ? day.behavior : '加载中..'}}</div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-exclamation-triangle text-81bd51" aria-hidden="true"></i>告警：{{day.warning != null ? day.warning : '加载中..'}}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <x-chart :id="flowDay_chart" :option="flowDay_option" ref="flowDay"></x-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="week_chart" :option="week_option" ref="week"></x-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="aqwx-top10-list">
      <div class="row-base-style">
        <div class="left-icon"></div>
        <div class="right-icon"></div>
        <div class="title">当天资产事件统计TOP10</div>
        <div class="row">
          <div class="col-lg-3 col-xs-12" v-for="asset in assets">
            <div class="box box-solid">
              <div class="box-header text-center">
                <h3 class="box-title" :class="asset.m >0 ? 'text-f72729' : 'box-body'">{{asset.ip}}</h3>
                <div class="box-body">
                  <p :class="asset.m >0 ? 'text-f72729' : ''">木马：{{asset.m}}</p>
                  <p>威胁分析：{{asset.w}}&nbsp;&nbsp;&nbsp;行为分析：{{asset.x}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>
<script type="es6">
  import _ from 'lodash'
  import myDatepicker from '@/components/datepicker.vue'
  import XChart from '@/components/chat'
  export default {
    name: 'tw',
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
        day:{},
        assets:[],
        flowDay_chart: 'tw_today',
        flowDay_option:{},
        week_chart: 'tw_week',
        week_option:{}
      }
    },
    methods:{
      search(){
        let date = this.startTime.time
        this.params.startTime = this.$moment(date).format('x')
        this.params.endTime =this.$moment(date).add(1, 'd').format('x')

        this.getDay()
        this.getWeek()
        this.getAssets()
        this.getFlowDay()
      },
      //当日关注
      getDay(){
        let self = this
        this.$service.twday(this.params)
        .then(function(res){
          self.day = res
        }).catch(function(err){
          console.log('获取当日关注失败!')
        })
      },
      //本周威胁趋势
      getWeek(){
        let self = this
        this.week_option = {
                    chart: {
                        type: 'column',
                        backgroundColor: 'none',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '本周威胁趋势',
                        y: 30,
                        margin: 40,
                        style: {
                            color: '#fff'
                        }
                    },
                    legend: {
                        itemStyle: {
                            color: '#fff'
                        }
                    },
                    xAxis: {labels: {
                      style:{
                        color:'#fff'
                      }
                    },
                      type:'category',
                        labels: {
                          style:{
                            color:'#fff'
                          }
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        gridLineColor: '#333', //网格线样式
                        tickAmount: 7, //显示刻度数
                        labels: {
                            formatter: function() {
                                // return this.value;
                                return '<div style="color:#fff">' + this.value + '</div>'
                            }
                        }
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: []
                }
        this.$service.twweek(this.params)
        .then(function(res){
          self.week_option.series=res
          self.week_option.series[0].color="#76d4f2"
          self.week_option.series[1].color="#51d8bc"
          self.week_option.series[2].color="#facc2a"
          self.week_option.series[3].color="#ff6163"
          self.week_option.series[4].color="#7d8ae3"
          self.$refs.week.CreateNow()
        }).catch(function(err){
          console.log('获取本周威胁趋势失败!')
        })
      },
      //当天资产事件统计TOP10
      getAssets(){
        let self = this
        this.$service.twassets(this.params)
        .then(function(res){
          self.assets = _.sortBy(res, function(item){ return -item.m; });
        }).catch(function(err){
          console.log('获取当天资产事件统计TOP10失败!')
        })
      },
      //当天威胁趋势
      getFlowDay(){
        let self = this
        this.flowDay_option={
                    chart: {
                        backgroundColor: 'none',
                        type: 'areaspline',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '当天威胁趋势',
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
                        labels: {
                          style:{
                            color:'#fff'
                          }
                        },
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
                                return '<div style="color:#fff">' + this.value/1000/1000 + 'M</div>'
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
        this.$service.twflowDay(this.params)
        .then(function(res){
          self.flowDay_option.series = res
          self.$refs.flowDay.CreateNow()
        }).catch(function(err){
          console.log('获取当天威胁趋势失败!')
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
