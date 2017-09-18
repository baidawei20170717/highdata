<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> 10.1.6.175  </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
      <li class=""><a href="#">告警监控</a></li>
      <li class="active">性能告警</li>
    </ol>
  </section>
  <!-- Main content -->
  <section class="content">
    <!-- search form (Optional) -->
    <div class="is-search row-base-style">
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <div class="input-group date">
            <div class="input-group-addon">
              <i class="fa fa-calendar"></i>
            </div>
            <input type="text" class="form-control pull-right" placeholder="日期" id="datepicker">
          </div>
        </div>
        <div class="col-lg-9 col-xs-12">
          <!-- search form (Optional) -->
          <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
              <input type="text" name="q" class="form-control" placeholder="Search...">
              <span class="input-group-btn"> <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i> </button> </span>
            </div>
          </form>
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
            <p class="text-size60 text-76d4f2">45678</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
              <x-chart :id="performance_chart" :option="performance_option" :css="300"></x-chart>
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
            <x-chart :id="performanceType_chart" :option="performanceType_option"></x-chart>
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
            <!-- /.box-header -->
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th>告警名称</th>
                  <th>告警类型</th>
                  <th style="width: 100px">告警数量</th>
                </tr>

                <tr>
                  <td><router-link style="color:#fff" to="/warn/monitor/1">同一服务器3分钟内平均cpu超过80％</router-link></td>
                  <td>性能告警</td>
                  <td>100</td>
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
  import XChart from '@/components/chat'
  import CChart from '@/components/cirChart'
  export default {
    name: 'monitor',
    mounted (){
      commonCtrl.init();
    },
    data() {
    let performance_option ={
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
                    name: 'links',
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#50ddbd'
                }]
            }
    let performanceType_option ={
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
                    text: '当日HTTPQ请求类型统计',
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
                            enabled: false,
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
                    data: [
                        { name: '同一服务器3分钟内平均cpu超过80％', color: '#fabd2a', y: 50},
                        { name: '同一服务器3分钟内平均内存超过80％', color: '#76d4f2', y: 15 },
                        { name: '同一服务器单个进程内存超过50％', color: '#818de8', y: 15 },
                        { name: '同一服务器磁盘使用超过80％', color: '#52dabd', y: 15 },
                        { name: 'http异常返回状态', color: '#e95658', y:5}
                    ]
                }]
            }
    return {
      performance_chart: 'monitor_performance',
      performance_option,
      performanceType_chart: 'monitor_performanceType',
      performanceType_option
    }
    },
    components: {
      XChart,
      CChart
    }
  }
</script>
