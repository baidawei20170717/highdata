<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> 10.1.6.175 <!-- <small>Optional description</small> --> </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
      <li class=""><a href="#">性能监控</a></li>
      <li class=""><a href="#">中间件监控</a></li>
      <li class="active">10.1.6.175</li>
    </ol>
  </section>
  <section class="content">
    <form action="#" method="get" class="sidebar-form">
      <div class="input-group">
        <input type="text" name="q" class="form-control" placeholder="Search...">
        <span class="input-group-btn">
                          <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i> </button>
                        </span>
      </div>
    </form>
    <div class="row row-base-style text-center is-info-row">
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-desktop text-fa9a2a" aria-hidden="true"></i>设备ip：10.1.6.175</div>
      </div>
      <div class="col-lg-2 col-xs-6">
        <div class="item"><i class="fa fa-server text-52dabd" aria-hidden="true"></i>数据库：mysql</div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-database text-76d4f2" aria-hidden="true"></i>内存：15.82gb</div>
      </div>
      <div class="col-lg-2 col-xs-6">
        <div class="item"><i class="fa fa-dashboard text-e95658" aria-hidden="true"></i>cpu：12核</div>
      </div>
      <div class="col-lg-2 col-xs-12">
        <div class="item"><i class="fa fa-tasks text-81bd51" aria-hidden="true"></i>磁盘：929.14gb</div>
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
            <p class="text-size60 text-76d4f2">200</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <!--连接数图表 -->
            <x-chart :id="Links_chart" :option="Links_option" :css="height"></x-chart>
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
            <!--当日http请求类型统计 -->
            <c-chart :id="httpRequest_chart" :option="httpRequest_option"></c-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <!--当日http请求状态类型统计 -->
            <c-chart :id="httpRequestStatus_chart" :option="httpRequestStatus_option"></c-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item" >
            <!--当日ke客户端IP TOP统计 -->
            <x-chart :id="IP_chart" :option="IP_option"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item" >
            <!--当日流量趋势 -->
            <x-chart :id="Flow_chart" :option="Flow_option"></x-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style is-table-data">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <div class="box-header">
              <h3 class="box-title">当日url访问量top统计</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th style="width: 40px">序号</th>
                  <th>url</th>
                  <th style="width: 60px">访问量</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
              </table>
            </div>
            <div class="text-center"><a href="" class="text-ffffff">&lt;加载更多&gt;</a></div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style is-table-data">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <div class="box-header">
              <h3 class="box-title">当日最耗流量url top统计</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th style="width: 40px">序号</th>
                  <th>url</th>
                  <th style="width: 60px">访问量</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>http://www.baidu.com</td>
                  <td>100</td>
                </tr>
              </table>
            </div>
            <div class="text-center"><a href="" class="text-ffffff">&lt;加载更多&gt;</a></div>
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
    name: 'host_single',
    mounted (){
      commonCtrl.init();
    },
    data() {
    let Links_option = {
        chart: {
            backgroundColor: 'none',
            type: 'line',
            marginLeft: 60,
            marginRight: 20
        },
        title: {
            text: '当日链接数趋势',
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
        series: [{
            name: 'links',
            data: [30, 30, 30, 40, 50, 60, 70],
            color: '#50ddbd'
        }]
    }
    let httpRequest_option = {
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
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
    let httpRequestStatus_option = {
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
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
    let IP_option ={
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
            categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
        series: [{
            color: '#76d4f2',
            name: 'IP',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
        }]
    }
    let Flow_option = {
        chart: {
            backgroundColor: 'none',
            type: 'areaspline',
            marginLeft: 60,
            marginRight: 20
        },
        title: {
            text: '当日流量趋势',
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
            color: '#76d4f2'
        }]
    }
    return {
      height:"300",
      Links_chart: 'ws_Links',
      Links_option,
      httpRequest_chart: 'ws_request',
      httpRequest_option,
      httpRequestStatus_chart : 'ws_requestStatus',
      httpRequestStatus_option,
      IP_chart:'ws_Ip',
      IP_option,
      Flow_chart:'ws_flow',
      Flow_option
    }
  },
  components: {
    XChart,
    CChart
  }
  }
</script>
