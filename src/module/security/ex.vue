<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> 外网边界监控 </h1>
    <ol class="breadcrumb">
      <li>  <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link></li>
      <li class=""><a href="javascript:;">安全监控</a></li>
      <li class="active">外网边界监控</li>
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
            <p>当天ddos事件总数</p>
            <p class="text-size60 text-76d4f2">{{ddosCount}}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item " id="links-charts">
            <x-chart :id="ddosDay_chart" :option="ddosDay_option" ref="ddosDay" :css="300"></x-chart>
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
            <c-chart :id="ddosType_chart" :option="ddosType_option" ref="ddosType"></c-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="ddosDisport_chart" :option="ddosDisport_option" ref="ddosDisport"></x-chart>
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
              <h3 class="box-title">最近DDOS事件</h3>
            </div>
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th>时间</th>
                  <th>攻击类型</th>
                  <th>攻击协议</th>
                  <th>源地址</th>
                  <th>源地址端口</th>
                  <th>目的地址</th>
                  <th>目的地址端口</th>
                </tr>
                <tr v-for="item in ddosNowByFilter">
                  <td>{{item.time | dateFormat}}</td>
                  <td>{{item['dp-attack-name']}}</td>
                  <td>{{item['dp-protocol-name']}}</td>
                  <td>{{item['dp-source-ip']}}</td>
                  <td>{{item['dp-source-port']}}</td>
                  <td>{{item['dp-destination-ip']}}</td>
                  <td>{{item['dp-destination-port']}}</td>
                </tr>
              </table>
            </div>
            <div class="text-center"><a @click="disNowCount=disNowCount+10" v-if="disNowCount < ddosNow.length" href="javascript:;" class="text-ffffff">&lt;加载更多&gt;</a></div>
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
    name: 'ex',
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
        ddosCount:0,
        ddosNow:[],
        disNowCount:10,
        ddosDay_chart: 'ex_ddosDay',
        ddosDay_option:{},
        ddosType_chart: 'ex_ddosType',
        ddosType_option:{},
        ddosDisport_chart : 'ex_ddosDisport',
        ddosDisport_option:{}
      }
    },
    methods:{
      search(){
        let date = this.startTime.time
        this.params.startTime = this.$moment(date).format('x')
        this.params.endTime =this.$moment(date).add(1, 'd').format('x')

        this.disNowCount = 10
        this.getDdosCount()
        this.getDdosDay()
        this.getDdosType()
        this.getDdosDisport()
        this.getExevent()
      },
      getDdosCount(){
        let self = this
        this.$service.exddosCount(this.params)
        .then(function(res){
          self.ddosCount = res
        }).catch(function(err){
          console.log('获取事件总量失败!')
        })
      },
      getDdosDay(){
        let self = this
        this.ddosDay_option = {
                chart: {
                    backgroundColor: 'none',
                    type: 'line',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天DDOS事件总数',
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
        this.$service.exddosDay(this.params)
        .then(function(res){
            self.ddosDay_option.series[0]=res
            self.ddosDay_option.series[0].color="#50ddbd"
            self.$refs.ddosDay.CreateNow()
        }).catch(function(err){
          console.log('获取事件趋势失败!')
        })
      },
      getDdosType(){
        let self = this
        this.ddosType_option ={
                chart: {
                    backgroundColor: 'none',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '当日DDOS攻击类型统计',
                    floating: true,
                    style: {
                        color: '#fff'
                    }

                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                legend: {
                    itemStyle: {
                        color: '#fff'
                    }
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
                        showInLegend:true,
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
        this.$service.exddosType(this.params)
        .then(function(res){
          self.ddosType_option.series[0].data=res
          self.ddosType_option.series[0].data[0].color="#51d8bc"
          self.ddosType_option.series[0].data[1].color="#00d2ff"
          self.ddosType_option.series[0].data[2].color="#90e982"
          self.ddosType_option.series[0].data[3].color="#f8a461"
          self.ddosType_option.series[0].data[4].color="#404046"
          self.ddosType_option.series[0].data[5].color="#818de8"
          self.ddosType_option.series[0].data[6].color="#e5d05c"
          self.ddosType_option.series[0].data[7].color="#51d8bc"
          self.$refs.ddosType.CreateNow()
        }).catch(function(err){
          console.log('获取类型统计失败!')
        })
      },
      getDdosDisport(){
        let self = this
        this.ddosDisport_option ={
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
        this.$service.exddosDisport(this.params)
        .then(function(res){
          self.ddosDisport_option.xAxis.categories = res.categories
          self.ddosDisport_option.series = new Array(res.series)
          self.ddosDisport_option.series[0].color = '#76d4f2'
          self.$refs.ddosDisport.CreateNow()
        }).catch(function(err){
          console.log('获取目标端口统计失败!')
        })
      },
      getExevent(){
        let self = this
        this.$service.exevent(this.params)
        .then(function(res){
          self.ddosNow = res
        }).catch(function(err){
          console.log('获取最近ddos事件失败!')
        })
      }
    },
    computed:{
      ddosNowByFilter () {
        return this.ddosNow.slice(0,this.disNowCount)
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
