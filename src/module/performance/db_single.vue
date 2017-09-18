<template>
<div class="content-wrapper">
          <section class="content-header">
              <h1> 10.1.6.175 </h1>
              <ol class="breadcrumb">
                <li>
                  <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link>
                </li>
                <li><a href="javascript:;">性能监控</a></li>
                <li>
                  <router-link to="/">数据库监控</router-link>
                </li>
                <li class="active">10.1.6.175</li>
              </ol>
          </section>
          <section class="content">
              <div class="sidebar-form">
                  <div class="input-group">
                      <input type="text" name="q" class="form-control" placeholder="Search...">
                      <span class="input-group-btn">
                        <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i> </button>
                      </span>
                  </div>
              </div>
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
                  <div class="col-lg-12 col-xs-12">
                      <div class="row-base-style">
                          <div class="left-icon"></div>
                          <div class="right-icon"></div>
                          <div class="item ">
                            <!--当日数据库命令图表-->
                            <x-chart :id="command_chart" :option="command_option"></x-chart>
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
                            <!--当日连接数趋势-->
                            <x-chart :id="links_chart" :option="links_option"></x-chart>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-6 col-xs-12">
                      <div class="row-base-style">
                          <div class="left-icon"></div>
                          <div class="right-icon"></div>
                          <div class="item">
                            <!--当日线程数趋势-->
                            <x-chart :id="lines_chart" :option="lines_option"></x-chart>
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
                            <!--当日打开表数趋势-->
                            <x-chart :id="openTable_chart" :option="openTable_option"></x-chart>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-6 col-xs-12">
                      <div class="row-base-style">
                          <div class="left-icon"></div>
                          <div class="right-icon"></div>
                          <div class="item">
                            <!--当日打开文件数趋势-->
                            <x-chart :id="openFile_chart" :option="openFile_option"></x-chart>
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
                            <!--当日发送接收趋势-->
                            <x-chart :id="sendAccept_chart" :option="sendAccept_option"></x-chart>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
</template>

<script type="es6">
  import XChart from '@/components/chat'
  export default {
    name: 'db_single',
    mounted (){
      commonCtrl.init();
    },
    data() {
    let command_option ={
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日数据库命令执行趋势',
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
                series: [{
                    name: '查询',
                    data: [-1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 4, 2, 1, 4, 3, 5, 6, 4, 6, 8, 3],
                    color: '#53ddbf'
                }, {
                    name: '修改',
                    data: [1, 5, 7, 3, 3, 3, 6, 8, 2, 4, 5, 2, 3, 1, 4, 2, 5, 6, 2, 4, 1, 2, 3, 1],
                    color: '#56c0e8'
                }, {
                    name: '新增',
                    data: [4, 5, 9, 8, 8, 8, 9, 0, 9, 4, 5, 9, 8, 4, 4, 9, 5, 9, 9, 4, 4, 9, 8, 4],
                    color: '#facc2a'
                }, {
                    name: '删除',
                    data: [1, 5, 7, 2.4, 2.4, 2.4, 6, 0, 2, 4, 5, 2, 2.4, 1, 4, 2, 5, 6, 2, 4, 1, 2, 2.4, 1],
                    color: '#ff6163'
                }]
            }
    let links_option = {
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
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
                    name: 'memory',
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#f7e011'
                }, {
                    name: 'swap',
                    data: [50, 15, 20, 30, 38, 30, 28],
                    color: '#56c0e8'
                }]
            }
    let lines_option = {
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日线控数趋势',
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
                    name: 'memory',
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#f7e011'
                }, {
                    name: 'swap',
                    data: [50, 15, 20, 30, 38, 30, 28],
                    color: '#56c0e8'
                }]
            }
    let openTable_option = {
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日打开表格趋势',
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
                    name: 'memory',
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#f7e011'
                }, {
                    name: 'swap',
                    data: [50, 15, 20, 30, 38, 30, 28],
                    color: '#56c0e8'
                }]
            }
    let openFile_option = {
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日打开文件趋势',
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
                    name: 'memory',
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#f7e011'
                }, {
                    name: 'swap',
                    data: [50, 15, 20, 30, 38, 30, 28],
                    color: '#56c0e8'
                }]
            }
    let sendAccept_option = {
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日数据库命令执行趋势',
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
                series: [{
                    name: '发送流量',
                    data: [-1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 4, 2, 1, 4, 3, 5, 6, 4, 6, 8, 3],
                    color: '#53ddbf'
                }, {
                    name: '接受流量',
                    data: [1, 5, 7, 3, 3, 3, 6, 8, 2, 4, 5, 2, 3, 1, 4, 2, 5, 6, 2, 4, 1, 2, 3, 1],
                    color: '#56c0e8'
                }]
            }
    return {
      command_chart:'command',
      command_option,
      links_chart: 'links',
      links_option,
      lines_chart: 'lines',
      lines_option,
      openTable_chart: 'openTable',
      openTable_option,
      openFile_chart: 'openFile',
      openFile_option,
      sendAccept_chart: 'sendAccept',
      sendAccept_option,

    }
    },
    components: {
      XChart
    }
}
</script>
