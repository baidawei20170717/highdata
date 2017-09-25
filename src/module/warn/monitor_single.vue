<template>
<div class="content-wrapper">
<section class="content-header">
  <h1> {{ id }} </h1>
  <ol class="breadcrumb">
    <li>
      <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link>
    </li>
    <li><a href="javascript:;">告警监控</a></li>
    <li>
      <router-link to="/">性能告警</router-link>
    </li>
    <li class="active"> {{ id }} </li>
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
      <div class="title">当日关注</div>
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="row">
        <div class="col-lg-6 col-xs-12">
          <div class="item">规则标识： {{basic.id}} </div>
        </div>
        <div class="col-lg-6 col-xs-12">
          <div class="item">规则名称： {{basic.name}} </div>
        </div>
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
            <p>当天告警总数</p>
            <p class="text-size60 text-76d4f2">{{count}}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="day_chart" :option="day_option" ref="day" :css="300"></x-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-xs-12">
        <div class="row-base-style is-table-data">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <div class="box-header">
              <h3 class="box-title">当天告警明细列表</h3>
            </div>
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th width="20%">告警时间</th>
                  <th width="20%">告警名称</th>
                  <th width="20%">告警IP</th>
                  <th>告警信息</th>
                </tr>
                <tr v-for="item in events">
                  <td>{{item['@timestamp'] | dateFormat}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.host}}</td>
                  <td>{{item.message}}</td>
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
    name: 'monitor_single',
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
        type:'performance',
        id:this.$route.params.id,
        basic:{},
        count:0,
        events:{},
        day_chart: 'monitorSingle_performance',
        day_option:{}
      }
    },
    methods:{
      search(){
        let date = this.startTime.time
        this.params.startTime = this.$moment(date).format('x')
        this.params.endTime =this.$moment(date).add(1, 'd').format('x')

        this.getBasic()
        this.getCount()
        this.getDay()
        this.getEvent()
      },
      getBasic(){
        let self = this
        this.$service.warnsingleBasic(this.type,this.id,this.params)
        .then(function(res){
          self.basic = res
        }).catch(function(err){
          console.log('获取基本信息失败!')
        })
      },
      getCount(){
        let self = this
        this.$service.warnsingleCount(this.type,this.id,this.params)
        .then(function(res){
          self.count = res
        }).catch(function(err){
          console.log('获取当日告警数量失败!')
        })
      },
      getDay(){
        let self = this
        this.day_option ={
                    chart: {
                        backgroundColor: 'none',
                        type: 'line',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '当天告警趋势',
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
                      labels: {
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
                        name: 'links',
                        data: [30, 30, 30, 40, 50, 60, 70],
                        color: '#50ddbd'
                    }]
                }
        this.$service.warnsingleDay(this.type,this.id,this.params)
        .then(function(res){
          self.day_option.series=res
          self.day_option.series[0].color="#50ddbd"
          self.$refs.day.CreateNow()
        }).catch(function(err){
          console.log('获取当日告警趋势失败!')
        })
      },
      getEvent(){
        let self = this
        this.$service.warnsingleEvent(this.type,this.id,this.params)
        .then(function(res){
          self.events=res
        }).catch(function(err){
          console.log('获取当日告警列表失败!')
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
