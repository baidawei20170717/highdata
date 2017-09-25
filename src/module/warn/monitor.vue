<template>
<div class="content-wrapper">
<section class="content-header">
  <h1> 性能告警 </h1>
  <ol class="breadcrumb">
    <li>
      <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link>
    </li>
    <li class=""><a href="javascript:;">告警监控</a></li>
    <li class="active">性能告警</li>
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
            <p>当天性能告警总数</p>
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
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="type_chart" :option="type_option" ref="type"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style is-table-data">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <div class="box-header">
              <h3 class="box-title">当天性能告警列表</h3>
            </div>
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th>告警名称</th>
                  <th>告警类型</th>
                  <th style="width: 100px">告警数量</th>
                </tr>

                <tr v-for="item in events">
                  <td><router-link style="color:#fff" :to="{name: 'warn_monitor_single', params: {id: item.ruleId}}">{{item.name}}</router-link></td>
                  <td>{{item.type == 'performance' ? '性能告警': '非性能告警'}}</td>
                  <td>{{item.count}}</td>
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
    name: 'monitor',
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
        count:0,
        type: 'performance',
        events:[],
        day_chart: 'monitor_day',
        day_option:{},
        type_chart: 'monitor_type',
        type_option:{}
      }
    },
    methods:{
      search(){
        let date = this.startTime.time
        this.params.startTime = this.$moment(date).format('x')
        this.params.endTime =this.$moment(date).add(1, 'd').format('x')

        this.getCount()
        this.getDay()
        this.getType()
        this.getEvent()
      },
      getCount(){
        let self = this
        this.$service.warncount(this.type,this.params)
        .then(function(res){
          self.count = res
        }).catch(function(err){
          console.log('获取数量统计数据失败!')
        })
      },
      getDay(){
        let self = this
        this.day_option = {
                    chart: {
                        backgroundColor: 'none',
                        type: 'line',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '当天性能告警趋势',
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
                    series: []
                },
        this.$service.warnday(this.type,this.params)
        .then(function(res){
            self.day_option.series=res
            self.day_option.series[0].color="#50ddbd"
            self.$refs.day.CreateNow()
        }).catch(function(err){
          console.log('获取性能告警趋势失败!')
        })
      },
      getType(){
        let self = this
        this.type_option ={
                    chart: {
                        backgroundColor: 'none',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        marginLeft: 0,
                        marginRight: 20,
                        marginTop:40
                    },
                title: {
                    text: '当天性能告警类型统计',
                    floating: true,
                    style: {
                        color: '#fff'
                    },
                    align:'left',
                    x: 20,
                    y: 30,
                    margin: 40

                },
                legend: {
                  enabled:false,
                    layout:'vertical',
                    // align:'right',
                    // verticalAlign:'middle',
                    itemStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        borderColor: 'none',
                        allowPointSelect: true,
                        cursor: 'pointer',
                        showInLegend: true,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: '#ffffff' || 'black'
                            }
                        },
                        point: {
                            events: {
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
        this.$service.warntype(this.type,this.params)
        .then(function(res){
            self.type_option.series[0].data=res
            self.type_option.series[0].data[0].color="#fabd2a"
            self.type_option.series[0].data[1].color="#76d4f2"
            self.type_option.series[0].data[2].color="#818de8"
            self.type_option.series[0].data[3].color="#52dabd"
            self.type_option.series[0].data[4].color="#e95658"
          self.$refs.type.CreateNow()
        }).catch(function(err){
          console.log('获取性能告警类型统计失败!')
        })
      },
      getEvent(){
        let self = this
        this.$service.warnevent(this.type,this.params)
        .then(function(res){
          self.events=res
        }).catch(function(err){
          console.log('获取性能告警列表失败!')
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
