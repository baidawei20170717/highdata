<template>
  <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <h1> 10.1.6.175 <!-- <small>Optional description</small> --> </h1>
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
                    <li class=""><a href="#">性能监控</a></li>
                    <li class=""><a href="#">系统安全监控</a></li>
                    <li class="active">10.1.6.175</li>
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
                                <p>当天请求总数</p>
                                <p class="text-size60 text-76d4f2">45678</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9 col-xs-12">
                        <div class="row-base-style">
                            <div class="left-icon"></div>
                            <div class="right-icon"></div>
                            <div class="item ">
                              <x-chart :id="windowsLog_chart" :option="windowsLog_option" :css="300"></x-chart>
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
                                <p class="text-size60 text-00b8ec">45678</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9 col-xs-12">
                        <div class="row-base-style">
                            <div class="left-icon"></div>
                            <div class="right-icon"></div>
                            <div class="item " id="linux-log-charts" >
                              <x-chart :id="linuxLog_chart" :option="linuxLog_option" :css="300"></x-chart>
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
                              <c-chart :id="windows_chart" :option="windows_option"></c-chart>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xs-12">
                        <div class="row-base-style">
                            <div class="left-icon"></div>
                            <div class="right-icon"></div>
                            <div class="item">
                              <c-chart :id="linux_chart" :option="linux_option"></c-chart>
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
    name: 'sys',
    mounted (){
      commonCtrl.init();
    },
    data() {
    let windowsLog_option ={
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
                series: [{
                    name: 'links',
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#50ddbd'
                }]
            }
    let linuxLog_option={
                chart: {
                    backgroundColor: 'none',
                    type: 'line',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天linux事件量',
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
                    color: '#00b8ec'
                }]
            }
    let windows_option ={
                chart: {
                    backgroundColor: 'none',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '当日HTTPQ请求类型统计',
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
                    data: [
                        { name: 'cpu', color: '#fabd2a', y: 25, url: 'http://bbs.hcharts.cn' },
                        { name: 'kernel', color: '#76d4f2', y: 75 }
                    ]
                }]
            }
    let linux_option={
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

                    data: [
                        { name: '401', color: '#fabd2a', y: 5 },
                        { name: '404', color: '#76d4f2', y: 5 },
                        { name: '500', color: '#818de8', y: 5 },
                        { name: '304', color: '#52dabd', y: 5 },
                        { name: '200', color: '#e95658', y: 80 }
                    ]
                }]
            }
    return {
      windowsLog_chart: 'sys_windowsLog',
      windowsLog_option,
      linuxLog_chart: 'sys_linuxLog',
      linuxLog_option,
      windows_chart: 'sys_windows',
      windows_option,
      linux_chart: 'sys_linux',
      linux_option
    }
    },
    components: {
      XChart,
      CChart
    }
  }
</script>
