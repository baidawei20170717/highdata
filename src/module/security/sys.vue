<template>
  <div class="content-wrapper">
  <section class="content-header">
    <h1> 系统安全监控 </h1>
    <ol class="breadcrumb">
      <li>
        <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link>
      </li>
      <li class=""><a href="javascript:;">安全监控</a></li>
      <li class="active">系统安全监控</li>
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
            <p>当天请求总数</p>
            <p class="text-size60 text-76d4f2">{{winCount}}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <x-chart :id="winDay_chart" :option="winDay_option" ref="winDay" :css="300"></x-chart>
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
            <p>当天linux事件量</p>
            <p class="text-size60 text-00b8ec">{{linuxCount}}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <x-chart :id="linuxDay_chart" :option="linuxDay_option" ref="linuxDay" :css="300"></x-chart>
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
            <c-chart :id="winLevel_chart" :option="winLevel_option" ref="winLevel"></c-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <c-chart :id="linuxLevel_chart" :option="linuxLevel_option" ref="linuxLevel"></c-chart>
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
    name: 'sys',
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
        winCount:0,
        linuxCount:0,
        winDay_chart: 'sys_winDay',
        winDay_option:{},
        linuxDay_chart: 'sys_linuxDay',
        linuxDay_option:{},
        winLevel_chart: 'sys_winLevel',
        winLevel_option:{},
        linuxLevel_chart: 'sys_linuxLevel',
        linuxLevel_option:{},
      }
    },
    methods:{
      search(){
        let date = this.startTime.time
        this.params.startTime = this.$moment(date).format('x')
        this.params.endTime =this.$moment(date).add(1, 'd').format('x')

        this.getWinCount()
        this.getLinuxCount()
        this.getWinDay()
        this.getLinuxDay()
        this.getWinLevel()
        this.getLinuxLevel()
      },
      getWinCount(){
        let self = this
        this.$service.syswinCount(this.params)
        .then(function(res){
          self.winCount = res
        }).catch(function(err){
          console.log('获取windows事件数量失败!')
        })
      },
      getLinuxCount(){
        let self = this
        this.$service.syslinuxCount(this.params)
        .then(function(res){
          self.linuxCount = res
        }).catch(function(err){
          console.log('获取linux事件数量失败!')
        })
      },
      getWinDay(){
        let self = this
        this.winDay_option = {
                    chart: {
                        backgroundColor: 'none',
                        type: 'line',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '当天windows日志趋势',
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
                },
        this.$service.syswinDay(this.params)
        .then(function(res){
            self.winDay_option.series[0]=res
            self.winDay_option.series[0].color="#50ddbd"
            self.$refs.winDay.CreateNow()
        }).catch(function(err){
          console.log('获取windows事件数量失败!')
        })
      },
      getLinuxDay(){
        let self = this
        this.linuxDay_option = {
                    chart: {
                        backgroundColor: 'none',
                        type: 'line',
                        marginLeft: 60,
                        marginRight: 20
                    },
                    title: {
                        text: '当天linux日志趋势',
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
                },
        this.$service.syslinuxDay(this.params)
        .then(function(res){
            self.linuxDay_option.series[0]=res
            self.linuxDay_option.series[0].color="#00b8ec"
            self.$refs.linuxDay.CreateNow()
        }).catch(function(err){
          console.log('获取linux事件数量失败!')
        })
      },
      //当天windows事件级别统计 双柄图
      getWinLevel(){
        let self = this
        this.winLevel_option ={
                        chart: {
                            type: 'pie',
                            backgroundColor: 'none',
                            marginLeft: 60,
                            marginRight: 20

                        },
                        title: {
                            text: '当天windows事件级别统计',
                            align: 'left',
                            style: {
                                color: '#fff'
                            },
                            x: 20,
                            y: 30,
                            margin: 40
                        },
                        subtitle: {
                            text: ''
                        },
                        yAxis: {
                            title: {
                                text: '总百分比市场份额'
                            }
                        },
                        plotOptions: {
                            pie: {
                                showInLegend: true,
                                shadow: false,
                                center: ['50%', '50%'],
                                dataLabels: {
                                    color: '#fff'
                                }
                            }
                        },
                        legend: {
                            enabled: true,
                            itemStyle: {
                                color: '#fff'
                            }
                        },
                        tooltip: {
                            valueSuffix: '%'
                        },
                        series: [{
                            name: 'http请求',
                            data: [],
                            size: '60%',
                            dataLabels: {
                                formatter: function() {
                                    return this.y > 5 ? this.point.name : null;
                                },
                                color: 'white',
                                distance: -30
                            }
                        }, {
                            name: '版本',
                            data: [],
                            size: '80%',
                            innerSize: '60%',
                            dataLabels: {
                                formatter: function() {
                                    // 大于1则显示
                                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                                }
                            }
                        }]
                    },
        this.$service.syswinLevel(this.params)
        .then(function(res){
          self.winLevel_option.series[0].data=res.log_name
          self.winLevel_option.series[1].data=res.level
          self.winLevel_option.series[0].data[0].color="#fabd2a"
          self.winLevel_option.series[0].data[1].color="#76d4f2"
          self.winLevel_option.series[0].data[2].color="#51d8bc"
          self.winLevel_option.series[1].data[0].color="rgb(255,240,93)"
          self.winLevel_option.series[1].data[1].color="rgb(255,223,76)"
          self.winLevel_option.series[1].data[2].color="rgb(255,206,59)"
          self.winLevel_option.series[1].data[3].color="rgb(169,255,255)"
          self.winLevel_option.series[1].data[4].color="rgb(152,246,255)"
          self.winLevel_option.series[1].data[5].color="rgb(135,229,255)"
          self.winLevel_option.series[1].data[6].color="rgb(132,255,239)"
          self.$refs.winLevel.CreateNow()
        }).catch(function(err){
          console.log('获取windows级别统计失败!')
        })
      },
      //当天linux事件级别统计
      getLinuxLevel(){
        let self = this
        this.linuxLevel_option ={
                    chart: {
                        backgroundColor: 'none',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: '当天Linux事件级别统计',
                        floating: true,
                        style: {
                            color: '#fff'
                        }

                    },
                    legend: {
                        // layout:'vertical',
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
                },
        this.$service.syslinuxLevel(this.params)
        .then(function(res){
          self.linuxLevel_option.series[0].data=res
          self.linuxLevel_option.series[0].data[0].color="#fabd2a"
          self.linuxLevel_option.series[0].data[1].color="#76d4f2"
          self.linuxLevel_option.series[0].data[2].color="#90e982"
          self.linuxLevel_option.series[0].data[3].color="#f8a461"
          self.linuxLevel_option.series[0].data[4].color="#404046"
          self.$refs.linuxLevel.CreateNow()
        }).catch(function(err){
          console.log('当天linux事件级别统计!')
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
