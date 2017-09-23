<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> 安全防御监控 </h1>
    <ol class="breadcrumb">
      <li>  <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link></li>
      <li class=""><a href="javascript:;">安全监控</a></li>
      <li class="active">安全防御监控</li>
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
            <p>当天waf事件总数</p>
            <p class="text-size60 text-76d4f2">{{wafCount}}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
              <x-chart :id="wafDay_chart" :option="wafDay_option" ref="wafDay" :css="300"></x-chart>
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
              <x-chart :id="wafAttackLevel_chart" :option="wafAttackLevel_option" ref="wafAttackLevel"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
              <x-chart :id="wafAttackType_chart" :option="wafAttackType_option" ref="wafAttackType"></x-chart>
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
              <x-chart :id="wafDisipTop_chart" :option="wafDisipTop_option" ref="wafDisipTop"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
              <x-chart :id="ibmaType_chart" :option="ibmaType_option" ref="ibmaType"></x-chart>
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
              <x-chart :id="wafSrcipTop_chart" :option="wafSrcipTop_option" ref="wafSrcipTop"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
              <x-chart :id="wafDisportTop_chart" :option="wafDisportTop_option" ref="wafDisportTop"></x-chart>
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
    name: 'def',
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
        wafCount:0,
        wafDay_chart: 'def_wafDay',
        wafDay_option:{},
        wafAttackLevel_chart: 'def_wafAttackLevel',
        wafAttackLevel_option:{},
        wafAttackType_chart: 'def_wafAttackType',
        wafAttackType_option:{},
        wafDisipTop_chart: 'def_wafDisipTop',
        wafDisipTop_option:{},
        ibmaType_chart: 'def_ibmaType',
        ibmaType_option:{},
        wafSrcipTop_chart: 'def_wafSrcipTop',
        wafSrcipTop_option:{},
        wafDisportTop_chart: 'def_wafDisportTop',
        wafDisportTop_option:{}
      }
    },
    methods:{
      search(){
        let date = this.startTime.time
        this.params.startTime = this.$moment(date).format('x')
        this.params.endTime =this.$moment(date).add(1, 'd').format('x')

        this.getWafCount()
        this.getWafDay()
        this.getWafAttackLevel()
        this.getWafAttackType()
        this.getWafSrcipTop()
        this.getWafDisipTop()
        this.getWafDisportTop()
        this.getIbmaType()
      },
      //当天WAF事件总数
      getWafCount(){
        let self = this
        this.$service.wafCount(this.params)
        .then(function(res){
          self.wafCount = res
        }).catch(function(err){
          console.log('获取事件总数失败!')
        })
      },
      //当天WAF攻击趋势
      getWafDay(){
        let self = this
        this.wafDay_option ={
                chart: {
                    backgroundColor: 'none',
                    type: 'line',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天WAF攻击趋势',
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
        this.$service.wafDay(this.params)
        .then(function(res){
          self.wafDay_option.series[0]=res
          self.wafDay_option.series[0].color="#50ddbd"
          self.$refs.wafDay.CreateNow()
        }).catch(function(err){
          console.log('获取当天攻击趋势失败!')
        })
      },
      //当天WAF攻击级别统计
      getWafAttackLevel(){
        let self = this
        this.wafAttackLevel_option ={
                chart: {
                    backgroundColor: 'none',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天WAF攻击级别统计',
                    floating: true,
                    align:'left',
                    style: {
                        color: '#fff'
                    },
                    x: 20,
                    y: 30,
                    margin: 40

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
                        showInLegend: true,
                        point: {
                            events: {
                            }
                        },
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',
                    data: [
                        { name: 'Fraggle attack', color: '#e5d05c', y: 25},
                        { name: 'Ip spoof attack', color: '#51d8bc', y: 75 }
                    ]
                }]
            }
        this.$service.wafAttackLevel(this.params)
        .then(function(res){
            self.wafAttackLevel_option.series[0].data=res
            self.wafAttackLevel_option.series[0].data[0].color="#51d8bc"
            self.wafAttackLevel_option.series[0].data[1].color="#00d2ff"
            self.wafAttackLevel_option.series[0].data[2].color="#90e982"
          self.$refs.wafAttackLevel.CreateNow()
        }).catch(function(err){
          console.log('获取当天连接状态失败!')
        })
      },
      //当天WAF攻击类型统计
      getWafAttackType(){
        let self = this
        this.wafAttackType_option ={
            chart: {
                type: 'column',
                backgroundColor: 'none',
                marginLeft: 60,
                marginRight: 20
            },
            title: {
                text: '当天WAF攻击类型统计',
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
        this.$service.wafAttackType(this.params)
        .then(function(res){
          self.wafAttackType_option.xAxis.categories = res.categories
          self.wafAttackType_option.series = new Array(res.series)
          self.wafAttackType_option.series[0].color = '#76d4f2'
          self.$refs.wafAttackType.CreateNow()
        }).catch(function(err){
          console.log('获取目标端口统计失败!')
        })
      },
      //当天WAF目标IP TOP统计
      getWafDisipTop(){
        let self = this
        this.wafDisipTop_option ={
            chart: {
                type: 'column',
                backgroundColor: 'none',
                marginLeft: 60,
                marginRight: 20
            },
            title: {
                text: '当天WAF目标IP TOP统计',
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
        this.$service.wafDisipTop(this.params)
        .then(function(res){
          self.wafDisipTop_option.xAxis.categories = res.categories
          self.wafDisipTop_option.series = new Array(res.series)
          self.wafDisipTop_option.series[0].color = '#76d4f2'
          self.$refs.wafDisipTop.CreateNow()
        }).catch(function(err){
          console.log('获取当天WAF目标IP TOP统计失败!')
        })
      },
      //当天上网行为协议类型统计
      getIbmaType(){
        let self = this
        this.ibmaType_option ={
                chart: {
                    backgroundColor: 'none',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天上网行为协议类型统计',
                    floating: true,
                    align:'left',
                    style: {
                        color: '#fff'
                    },
                    x: 20,
                    y: 30,
                    margin: 40

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
                        showInLegend: true,
                        point: {
                            events: {
                            }
                        },
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',
                    data: [
                        { name: 'Fraggle attack', color: '#e5d05c', y: 25},
                        { name: 'Ip spoof attack', color: '#51d8bc', y: 75 }
                    ]
                }]
            }
        this.$service.wafibmaType(this.params)
        .then(function(res){
            self.ibmaType_option.series[0].data=res
            self.ibmaType_option.series[0].data[0].color="#51d8bc"
          self.$refs.ibmaType.CreateNow()
        }).catch(function(err){
        console.log(err)
          console.log('获取当天上网行为协议类型统计失败!')
        })
      },
      //当天WAF源IP TOP统计
      getWafSrcipTop(){
        let self = this
        this.wafSrcipTop_option ={
            chart: {
                type: 'column',
                backgroundColor: 'none',
                marginLeft: 60,
                marginRight: 20
            },
            title: {
                text: '当天WAF源IP TOP统计',
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
        this.$service.wafSrcipTop(this.params)
        .then(function(res){
          self.wafSrcipTop_option.xAxis.categories = res.categories
          self.wafSrcipTop_option.series = new Array(res.series)
          self.wafSrcipTop_option.series[0].color = '#76d4f2'
          self.$refs.wafSrcipTop.CreateNow()
        }).catch(function(err){
          console.log('获取攻击源IP TOP统计失败!')
        })
      },
      //当天WAF攻击目标端口TOP统计
      getWafDisportTop(){
        let self = this
        this.wafDisportTop_option ={
                chart: {
                    backgroundColor: 'none',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天WAF攻击目标端口TOP统计',
                    floating: true,
                    align:'left',
                    style: {
                        color: '#fff'
                    },
                    x: 20,
                    y: 30,
                    margin: 40

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
                        showInLegend: true,
                        point: {
                            events: {
                            }
                        },
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',
                    data: [
                        { name: 'Fraggle attack', color: '#e5d05c', y: 25},
                        { name: 'Ip spoof attack', color: '#51d8bc', y: 75 }
                    ]
                }]
            }
        this.$service.wafDisportTop(this.params)
        .then(function(res){
            self.wafDisportTop_option.series[0].data=res
            self.wafDisportTop_option.series[0].data[0].color="#51d8bc"
            self.wafDisportTop_option.series[0].data[1].color="#00d2ff"
            self.wafDisportTop_option.series[0].data[2].color="#90e982"
            self.wafDisportTop_option.series[0].data[3].color="#f8a461"
          self.$refs.wafDisportTop.CreateNow()
        }).catch(function(err){
          console.log('获取当天WAF攻击目标端口TOP统计失败!')
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
