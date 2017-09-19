<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> 10.1.6.175 <!-- <small>Optional description</small> --> </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
      <li class=""><a href="#">性能监控</a></li>
      <li class=""><a href="#">外网边界监控</a></li>
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
            <p class="text-size60 text-76d4f2">200</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item " id="links-charts">
            <x-chart :id="Links_chart" :option="Links_option" :css="300"></x-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item" id="http-q-charts">
            <c-chart :id="ddos_chart" :option="ddos_option"></c-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="ip_chart" :option="ip_option"></x-chart>
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
            <!-- /.box-header -->
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
                <tr>
                  <td>2017-09-06 12:23：59 000</td>
                  <td>Ip address scan</td>
                  <td>icmp</td>
                  <td>10.1.234.645</td>
                  <td>53</td>
                  <td>23.25.23.453</td>
                  <td>80</td>
                </tr>
                <tr>
                  <td>2017-09-06 12:23：59 000</td>
                  <td>Ip address scan</td>
                  <td>icmp</td>
                  <td>10.1.234.645</td>
                  <td>53</td>
                  <td>23.25.23.453</td>
                  <td>80</td>
                </tr>
                <tr>
                  <td>2017-09-06 12:23：59 000</td>
                  <td>Ip address scan</td>
                  <td>icmp</td>
                  <td>10.1.234.645</td>
                  <td>53</td>
                  <td>23.25.23.453</td>
                  <td>80</td>
                </tr>
                <tr>
                  <td>2017-09-06 12:23：59 000</td>
                  <td>Ip address scan</td>
                  <td>icmp</td>
                  <td>10.1.234.645</td>
                  <td>53</td>
                  <td>23.25.23.453</td>
                  <td>80</td>
                </tr>
                <tr>
                  <td>2017-09-06 12:23：59 000</td>
                  <td>Ip address scan</td>
                  <td>icmp</td>
                  <td>10.1.234.645</td>
                  <td>53</td>
                  <td>23.25.23.453</td>
                  <td>80</td>
                </tr>
                <tr>
                  <td>2017-09-06 12:23：59 000</td>
                  <td>Ip address scan</td>
                  <td>icmp</td>
                  <td>10.1.234.645</td>
                  <td>53</td>
                  <td>23.25.23.453</td>
                  <td>80</td>
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
    name: 'ex',
    created (){
      this.ddos_option ={
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
                  series: [{
                          type: 'pie',
                          innerSize: '80%',
                          data: [
                              { name: 'Ip address scan', color: '#51d8bc', y: 5, url: 'http://bbs.hcharts.cn' },
                              { name: 'Tcpflag', color: '#00d2ff', y: 5, url: 'http://bbs.hcharts.cn' },
                              { name: 'Large icmp', color: '#90e982', y: 5, url: 'http://bbs.hcharts.cn' },
                              { name: 'Tracert', color: '#f8a461', y: 5, url: 'http://bbs.hcharts.cn' },
                              { name: 'Port scan', color: '#404046', y: 5, url: 'http://bbs.hcharts.cn' },
                              { name: 'Leak scan', color: '#818de8', y: 5, url: 'http://bbs.hcharts.cn' },
                              { name: 'Fraggle', color: '#e5d05c', y: 5, url: 'http://bbs.hcharts.cn' },
                              { name: 'Icmp unreach', color: '#51d8bc', y: 65 }
                          ]
                      }]
              }
          }
      }
      // this.ddos_option.series = $.parseJSON('[{"name":"Icmp unreach","y":166},{"name":"Port scan","y":102},{"name":"Leak scan","y":101},{"name":"Fraggle","y":68},{"name":"Tracert","y":65},{"name":"Large icmp","y":48},{"name":"Tcpflag","y":18},{"name":"Ip address scan","y":11}]')

    },
    methods: {
      initData (){

      }
    },
    data() {
    let Links_option ={
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
        series: [{
            name: 'links',
            data: [30, 30, 30, 40, 50, 60, 70],
            color: '#50ddbd'
        }]
    }
    // let ddos_option ={
    //     chart: {
    //         backgroundColor: 'none',
    //         plotBackgroundColor: null,
    //         plotBorderWidth: null,
    //         plotShadow: false
    //     },
    //     title: {
    //         text: '当日DDOS攻击类型统计',
    //         floating: true,
    //         style: {
    //             color: '#fff'
    //         }
    //
    //     },
    //     tooltip: {
    //         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    //     },
    //     legend: {
    //         // layout:'vertical',
    //         // align:'right',
    //         // verticalAlign:'middle',
    //         itemStyle: {
    //             color: '#fff'
    //         }
    //     },
    //     plotOptions: {
    //         pie: {
    //             borderColor: 'none',
    //             allowPointSelect: true,
    //             cursor: 'pointer',
    //             dataLabels: {
    //                 enabled: true,
    //                 format: '<b>{point.name}</b>: {point.percentage:.1f} %',
    //                 style: {
    //                     color: '#ffffff' || 'black'
    //                 }
    //             },
    //             showInLegend:true,
    //             point: {
    //                 events: {
    //                     // mouseOver: function(e) { // 鼠标滑过时动态更新标题
    //                     //     // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
    //                     //     chart.setTitle({
    //                     //         text: e.target.name + '\t' + e.target.y + ' %'
    //                     //     });
    //                     // }
    //                     //,
    //                     // click: function(e) { // 同样的可以在点击事件里处理
    //                     //     chart.setTitle({
    //                     //         text: e.point.name+ '\t'+ e.point.y + ' %'
    //                     //     });
    //                     // }
    //                 }
    //             },
    //         }
    //     },
    //     series: [{
    //         type: 'pie',
    //         innerSize: '80%',
    //         data: [
    //             { name: 'Ip address scan', color: '#51d8bc', y: 5, url: 'http://bbs.hcharts.cn' },
    //             { name: 'Tcpflag', color: '#00d2ff', y: 5, url: 'http://bbs.hcharts.cn' },
    //             { name: 'Large icmp', color: '#90e982', y: 5, url: 'http://bbs.hcharts.cn' },
    //             { name: 'Tracert', color: '#f8a461', y: 5, url: 'http://bbs.hcharts.cn' },
    //             { name: 'Port scan', color: '#404046', y: 5, url: 'http://bbs.hcharts.cn' },
    //             { name: 'Leak scan', color: '#818de8', y: 5, url: 'http://bbs.hcharts.cn' },
    //             { name: 'Fraggle', color: '#e5d05c', y: 5, url: 'http://bbs.hcharts.cn' },
    //             { name: 'Icmp unreach', color: '#51d8bc', y: 65 }
    //         ]
    //     }]
    // }
    let ip_option ={
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
    return {
      Links_chart: 'ws_Links',
      Links_option,
      ddos_chart: 'ws_request',
      ddos_option:null,
      ip_chart : 'ws_requestStatus',
      ip_option
    }
    },
    components: {
      XChart,
      CChart
    }
  }
</script>
