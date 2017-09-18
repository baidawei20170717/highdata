<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> {{ ip }} </h1>
    <ol class="breadcrumb">
      <li>
        <router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link>
      </li>
      <li><a href="javascript:;">性能监控</a></li>
      <li>
        <router-link to="/">主机监控</router-link>
      </li>
      <li class="active">{{ ip }}</li>
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
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-database text-76d4f2" aria-hidden="true"></i>内存：15.82gb</div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-dashboard text-e95658" aria-hidden="true"></i>cpu：12核</div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-tasks text-81bd51" aria-hidden="true"></i>磁盘：929.14gb</div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item" >
            <x-chart :id="cpu_chart" :option="cpu_option"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item" >
            <x-chart :id="memory_chart" :option="memory_option"></x-chart>
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
              <h3 class="box-title">当前进程列表</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th style="">进程名称</th>
                  <th>物理内存</th>
                  <th>共享内存</th>
                  <th style="">内存使用率</th>
                  <th style="">CPU使用率</th>
                </tr>
                <tr>
                  <td>main－server.exe</td>
                  <td>393.58mb</td>
                  <td>0.00mb</td>
                  <td>0.20%</td>
                  <td>0.20%</td>
                </tr>
                <tr>
                  <td>main－server.exe</td>
                  <td>393.58mb</td>
                  <td>0.00mb</td>
                  <td>0.20%</td>
                  <td>0.20%</td>
                </tr>
                <tr>
                  <td>main－server.exe</td>
                  <td>393.58mb</td>
                  <td>0.00mb</td>
                  <td>0.20%</td>
                  <td>0.20%</td>
                </tr>
                <tr>
                  <td>main－server.exe</td>
                  <td>393.58mb</td>
                  <td>0.00mb</td>
                  <td>0.20%</td>
                  <td>0.20%</td>
                </tr>
                <tr>
                  <td>main－server.exe</td>
                  <td>393.58mb</td>
                  <td>0.00mb</td>
                  <td>0.20%</td>
                  <td>0.20%</td>
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
              <h3 class="box-title">当前进程列表</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th style="">进程名称</th>
                  <th>物理内存</th>
                  <th>共享内存</th>
                  <th style="">内存使用率</th>
                  <th style="">CPU使用率</th>
                </tr>
                <tr>
                  <td>main－server.exe</td>
                  <td>393.58mb</td>
                  <td>0.00mb</td>
                  <td>0.20%</td>
                  <td>0.20%</td>
                </tr>
                <tr>
                  <td>main－server.exe</td>
                  <td>393.58mb</td>
                  <td>0.00mb</td>
                  <td>0.20%</td>
                  <td>0.20%</td>
                </tr>
                <tr>
                  <td>main－server.exe</td>
                  <td>393.58mb</td>
                  <td>0.00mb</td>
                  <td>0.20%</td>
                  <td>0.20%</td>
                </tr>
                <tr>
                  <td>main－server.exe</td>
                  <td>393.58mb</td>
                  <td>0.00mb</td>
                  <td>0.20%</td>
                  <td>0.20%</td>
                </tr>
                <tr>
                  <td>main－server.exe</td>
                  <td>393.58mb</td>
                  <td>0.00mb</td>
                  <td>0.20%</td>
                  <td>0.20%</td>
                </tr>
              </table>
            </div>
            <div class="text-center"><a class="text-ffffff">&nbsp;</a></div>
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
    name: 'host_single',
    data() {
    let cpu_option = {
    chart: {
              backgroundColor: 'none',
              type: 'areaspline',
              marginLeft: 60,
              marginRight: 20
          },
          title: {
              text: '当日CPU使用率趋势',
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
              valueSuffix: ' 百万'
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
                                        name: 'cpu',
                                        data: [2000, 3000, 4000, 3500, 2000, 2800, 5268],
                                        color: '#53ddbf'
                                    }, {
                                        name: 'kernil',
                                        data: [1000, 2000, 1400, 2400, 3000, 4900, 3000],
                                        color: '#56c0e8'
                                    }]
              }
    let memory_option = {
        chart: {
            backgroundColor: 'none',
            type: 'areaspline',
            marginLeft: 60,
            marginRight: 20
        },
        title: {
            text: '当日内存使用率趋势',
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
            data: [3000, 3000, 3000, 4000, 5000, 6000, 7000],
            color: '#f7e011'
        }, {
            name: 'swap',
            data: [500, 1500, 2000, 3000, 3890, 3000, 2800],
            color: '#56c0e8'
        }]
    }
    return {
      ip : this.$route.params.id,
      cpu_chart: 'cpu',
      cpu_option: cpu_option,
      memory_chart: 'memory',
      memory_option: memory_option,
    }
  },
  components: {
    XChart
  }
  }
</script>
