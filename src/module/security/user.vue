<template>
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1> 10.1.6.175 <!-- <small>Optional description</small> --> </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
      <li class=""><a href="#">性能监控</a></li>
      <li class=""><a href="#">用户访问监控</a></li>
      <li class="active">10.1.6.175</li>
    </ol>
  </section>
  <!-- Main content -->
  <section class="content">
    <div class="row-base-style text-center is-info-row is-info-row2" style="margin-top: 0;">
      <div class="title">当天登录失败统计</div>
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <div class="item">登录失败总数
            <p class="text-size20 text-76d4f2">12345</p>
          </div>
        </div>
        <div class="col-lg-3 col-xs-6">
          <div class="item">windows登录失败
            <p class="text-size20 text-52dabd">23232</p>
          </div>
        </div>
        <div class="col-lg-3 col-xs-6">
          <div class="item">linux登录失败
            <p class="text-size20 text-b288ff">84848</p>
          </div>
        </div>
        <div class="col-lg-3 col-xs-12">
          <div class="item">vpn登录失败
            <p class="text-size20 text-f8cf61">93939</p>
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
            <x-chart :id="windowsTopFail_chart" :option="windowsTopFail_option"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="linuxTopFail_chart" :option="linuxTopFail_option"></x-chart>
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
            <x-chart :id="windowsFail_chart" :option="windowsFail_option"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="linuxFail_chart" :option="linuxFail_option"></x-chart>
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
    name: 'user',
    created (){
      this.windowsTopFail_option = {
                  chart: {
                      type: 'column',
                      backgroundColor: 'none',
                      marginLeft: 60,
                      marginRight: 20
                  },
                  title: {
                      text: '当天windows登录失败目标IP top统计',
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

                  }
              }
      this.windowsTopFail_option.series = [{
          color: '#76d4f2'
          // data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
      }]
      var str = $.parseJSON('{"series":{"data":[219,218,82,12,8,7,6,6,6,5],"name":"数量"},"categories":["10.1.0.253","10.1.4.253","169.254.98.87","184.105.139.77","184.105.139.109","184.105.139.97","184.105.139.117","184.105.139.69","184.105.139.89","184.105.139.113"]}');
      this.windowsTopFail_option.xAxis.categories = str.categories
      this.windowsTopFail_option.series[0].data =str.series.data
    },
    mounted (){
      commonCtrl.init();
    },
    data() {
    // let windowsTopFail_option ={
    //             chart: {
    //                 type: 'column',
    //                 backgroundColor: 'none',
    //                 marginLeft: 60,
    //                 marginRight: 20
    //             },
    //             title: {
    //                 text: '当天windows登录失败目标IP top统计',
    //                 align: 'left',
    //                 x: 20,
    //                 y: 30,
    //                 margin: 40,
    //                 style: {
    //                     color: '#fff'
    //                 }
    //             },
    //             subtitle: {
    //                 text: ''
    //             },
    //             legend: {
    //                 enabled: false,
    //                 itemStyle: {
    //                     color: '#fff'
    //                 }
    //             },
    //             xAxis: {
    //                 categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    //                 crosshair: true,
    //                 labels: {
    //
    //                     style: {
    //                         color: '#fff'
    //                     }
    //                 }
    //             },
    //             yAxis: {
    //                 min: 0,
    //                 title: {
    //                     text: '',
    //                     style: {
    //                         color: '#fff'
    //                     }
    //                 },
    //                 labels: {
    //                     formatter: function() {
    //                         // return this.value;
    //                         return '<div style="color:#fff">' + this.value + 'k</div>'
    //                     }
    //                 },
    //             },
    //             tooltip: {
    //                 headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //                 pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //                     '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    //                 footerFormat: '</table>',
    //                 shared: true,
    //                 useHTML: true
    //             },
    //             plotOptions: {
    //                 column: {
    //                     pointPadding: 0.2,
    //                     borderWidth: 0
    //                 },
    //                 series: {
    //                     pointWidth: 30,
    //                     dataLabels: {
    //                         enabled: true,
    //                         style: {
    //                             color: '#fff'
    //                         }
    //                     }
    //                 }
    //
    //             },
    //             series: [{
    //                 color: '#76d4f2',
    //                 name: 'IP',
    //                 data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
    //             }]
    //         }
    let linuxTopFail_option ={
                chart: {
                    type: 'column',
                    backgroundColor: 'none',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天linux登录失败目标IP top统计',
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
                    color: '#2effd2',
                    name: 'IP',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
                }]
            }
    let windowsFail_option ={
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天windows登录失败趋势',
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
    let linuxFail_option={
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天linux登录失败趋势',
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
                    color: '#2effd2'
                }]
            }
    return {
      windowsTopFail_chart: 'user_windowsTopFail',
      windowsTopFail_option: null,
      linuxTopFail_chart: 'user_linuxTopFail',
      linuxTopFail_option,
      windowsFail_chart: 'user_windowsFail',
      windowsFail_option,
      linuxFail_chart: 'user_linuxFail',
      linuxFail_option
    }
    },
    components: {
      XChart,
      CChart
    }
  }
</script>
