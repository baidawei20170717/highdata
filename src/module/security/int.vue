<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> 内网边界监控 </h1>
    <ol class="breadcrumb">
      <li>  <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link></li>
      <li class=""><a href="javascript:;">安全监控</a></li>
      <li class="active">内网边界监控</li>
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
            <p>当天攻击总量</p>
            <p class="text-size60 text-76d4f2">{{attackCount}}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <x-chart :id="attackDayRand_chart" :option="attackDayRand_option" ref="attackDayRand" :css="300"></x-chart>
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
            <x-chart :id="connStatus_chart" :option="connStatus_option" ref="connStatus"></x-chart>
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
              <c-chart :id="attackTypeTop_chart" :option="attackTypeTop_option" ref="attackTypeTop"></c-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="srcipTop_chart" :option="srcipTop_option" ref="srcipTop"></x-chart>
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
            <x-chart :id="disipTop_chart" :option="disipTop_option" ref="disipTop"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
              <c-chart :id="disportTop_chart" :option="disportTop_option" ref="disportTop"></c-chart>
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
    name: 'int',
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
        attackCount:0,
        attackDayRand_chart: 'int_attackDay',
        attackDayRand_option:{},
        connStatus_chart: 'int_connStatus',
        connStatus_option:{},
        attackTypeTop_chart : 'int_attackTypeTop',
        attackTypeTop_option:{},
        srcipTop_chart:'int_srcipTop',
        srcipTop_option:{},
        disipTop_chart:'int_disipTop',
        disipTop_option:{},
        disportTop_chart:'int_disportTop',
        disportTop_option:{}
      }
    },
    methods:{
      search(){
        let date = this.startTime.time
        this.params.startTime = this.$moment(date).format('x')
        this.params.endTime =this.$moment(date).add(1, 'd').format('x')

        this.getAttackCount()
        this.getAttackDay()
        this.getConnStatus()
        this.getAttackTypeTop()
        this.getSrcipTop()
        this.getDisipTop()
        this.getDisportTop()
      },
      getAttackCount(){
        let self = this
        this.$service.inattackCount(this.params)
        .then(function(res){
          self.attackCount = res
        }).catch(function(err){
          console.log('获取攻击总量失败!')
        })
      },
      getAttackDay(){
        let self = this
        this.attackDayRand_option = {
                chart: {
                    backgroundColor: 'none',
                    type: 'line',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天攻击趋势',
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
        this.$service.inattackDay(this.params)
        .then(function(res){
          self.attackDayRand_option.series[0]=res
          self.attackDayRand_option.series[0].color="#50ddbd"
          self.$refs.attackDayRand.CreateNow()
        }).catch(function(err){
          console.log('获取当天攻击趋势失败!')
        })
      },
      getConnStatus(){
        let self = this
        this.connStatus_option ={
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天连接状态趋势',
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
                    categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23'],
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
                            return '<div style="color:#fff">' + this.value + 'k</div>'
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
        this.$service.inconnStatus(this.params)
        .then(function(res){
          self.connStatus_option.series=res
          self.ddosType_option.series[0].color="#53ddbf"
          self.ddosType_option.series[1].color="#56c0e8"
          self.ddosType_option.series[2].color="#90e982"
          self.$refs.connStatus.CreateNow()
        }).catch(function(err){
          console.log('获取当天连接状态失败!')
          self.$refs.connStatus.CreateNow()
        })
      },
      getAttackTypeTop(){
        let self = this
        this.attackTypeTop_option={
                chart: {
                    backgroundColor: 'none',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '当天攻击类型TOP统计',
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
        this.$service.inattackTypeTop(this.params)
        .then(function(res){
          self.attackTypeTop_option.series[0].data=res
          self.attackTypeTop_option.series[0].data[0].color="#51d8bc"
          self.attackTypeTop_option.series[0].data[1].color="#818de8"
          self.attackTypeTop_option.series[0].data[2].color="#f8a461"
          self.$refs.attackTypeTop.CreateNow()
        }).catch(function(err){
          console.log('获取当天攻击类型TOP统计失败!')
        })
      },
      getSrcipTop(){
        let self = this
        this.srcipTop_option={
                chart: {
                    type: 'column',
                    backgroundColor: 'none',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天攻击源IP TOP统计',
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
        this.$service.insrcipTop(this.params)
        .then(function(res){
            self.srcipTop_option.xAxis.categories = res.categories
            self.srcipTop_option.series = new Array(res.series)
            self.srcipTop_option.series[0].color = '#76d4f2'
            self.$refs.srcipTop.CreateNow()
        }).catch(function(err){
          console.log('获取攻击源IP TOP统计失败!')
        })
      },
      getDisipTop(){
        let self = this
        this.disipTop_option={
                chart: {
                    type: 'column',
                    backgroundColor: 'none',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天受攻击IP TOP统计',
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
        this.$service.indisipTop(this.params)
        .then(function(res){
            self.disipTop_option.xAxis.categories = res.categories
            self.disipTop_option.series = new Array(res.series)
            self.disipTop_option.series[0].color = '#76d4f2'
            self.$refs.disipTop.CreateNow()
        }).catch(function(err){
          console.log('获取受攻击IP TOP统计失败!')
        })
      },
      getDisportTop(){
        let self = this
        this.disportTop_option={
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
                    // layout:'vertical',
                    // align:'right',
                    // verticalAlign:'middle',
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
                                // mouseOver: function(e) { // 鼠标滑过时动态更新标题
                                //     // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                                //     chart.setTitle({
                                //         text: e.target.name + '\t' + e.target.y + ' %'
                                //     });
                                // }
                                //,
                                // click: function(e) { // 同样的可以在点击事件里处理
                                //     chart.setTitle({
                                //         text: e.point.name+ '\t'+ e.point.y + ' %'
                                //     });
                                // }
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
        this.$service.indisportTop(this.params)
        .then(function(res){
          self.disportTop_option.series[0].data=res
          self.disportTop_option.series[0].data[0].color="#51d8bc"
          self.disportTop_option.series[0].data[1].color="#00d2ff"
          self.disportTop_option.series[0].data[2].color="#90e982"
          self.disportTop_option.series[0].data[3].color="#f8a461"
          self.disportTop_option.series[0].data[4].color="#404046"
          self.disportTop_option.series[0].data[5].color="#818de8"
          self.$refs.disportTop.CreateNow()
        }).catch(function(err){
          console.log('当天受攻击端口TOP统计!')
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
