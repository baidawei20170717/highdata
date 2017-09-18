<template>
  <div class="content-wrapper">
              <!-- Content Header (Page header) -->
              <section class="content-header">
                  <h1> 10.1.6.175 <!-- <small>Optional description</small> --> </h1>
                  <ol class="breadcrumb">
                      <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
                      <li class=""><a href="#">性能监控</a></li>
                      <li class=""><a href="#">网络设备监控</a></li>
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
                              <select class="form-control select2">
                                  <option selected="selected">Alabama</option>
                                  <option>Alaska</option>
                                  <option>California</option>
                                  <option>Delaware</option>
                                  <option>Tennessee</option>
                                  <option>Texas</option>
                                  <option>Washington</option>
                              </select>
                          </div>
                          <div class="col-lg-3 col-xs-6">
                              <select class="form-control select2">
                                  <option selected="selected">Alabama</option>
                                  <option>Alaska</option>
                                  <option>California</option>
                                  <option>Delaware</option>
                                  <option>Tennessee</option>
                                  <option>Texas</option>
                                  <option>Washington</option>
                              </select>
                          </div>
                          <div class="col-lg-6 col-xs-12">
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
                  <div class="row row-base-style text-center is-info-row">
                      <div class="left-icon"></div>
                      <div class="right-icon"></div>
                      <div class="col-lg-4 col-xs-6">
                          <div class="item"><i class="fa fa-desktop text-fa9a2a" aria-hidden="true"></i>设备ip：10.1.6.175</div>
                      </div>
                      <div class="col-lg-4 col-xs-6">
                          <div class="item"><i class="fa fa-server text-52dabd" aria-hidden="true"></i>设备名称：三合一（ips／waf／uag）</div>
                      </div>
                      <div class="col-lg-4 col-xs-6">
                          <div class="item"><i class="fa fa-database text-76d4f2" aria-hidden="true"></i>dpx 8000-a5</div>
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
                                  <x-chart :id="links_chart" :option="links_option" :css="300"></x-chart>
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
                                      <h3 class="box-title">当天最后事件</h3>
                                  </div>
                                  <!-- /.box-header -->
                                  <div class="box-body no-padding layer-mb20">
                                      <table class="table table-condensed">
                                          <tr>
                                              <th style="width: 20%">时间</th>
                                              <th>事件</th>
                                          </tr>
                                          <tr>
                                              <td>2017-09-06   12:23：59 000</td>
                                              <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                                          </tr>
                                          <tr>
                                              <td>2017-09-06   12:23：59 000</td>
                                              <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                                          </tr>
                                          <tr>
                                              <td>2017-09-06   12:23：59 000</td>
                                              <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                                          </tr>
                                          <tr>
                                              <td>2017-09-06   12:23：59 000</td>
                                              <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                                          </tr>
                                          <tr>
                                              <td>2017-09-06   12:23：59 000</td>
                                              <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                                          </tr>
                                          <tr>
                                              <td>2017-09-06   12:23：59 000</td>
                                              <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                                          </tr>
                                          <tr>
                                              <td>2017-09-06   12:23：59 000</td>
                                              <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                                          </tr>
                                          <tr>
                                              <td>2017-09-06   12:23：59 000</td>
                                              <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                                          </tr>
                                          <tr>
                                              <td>2017-09-06   12:23：59 000</td>
                                              <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                                          </tr>
                                          <tr>
                                              <td>2017-09-06   12:23：59 000</td>
                                              <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                                          </tr>
                                          <tr>
                                              <td>2017-09-06   12:23：59 000</td>
                                              <td>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</td>
                                          </tr>

                                      </table>
                                  </div>
                                  <div class="text-center"><a href="" class="text-ffffff">&lt;加载更多&gt;</a></div>
                                  <!-- /.box-body -->
                              </div>
                              <!-- /.box -->
                          </div>
                      </div>
                  </div>
              </section>
  </div>
</template>

<script type="es6">
  import XChart from '@/components/chat'
  export default {
    name: 'net_single',
    mounted (){
      commonCtrl.init();
    },
    data() {
    let links_option = {
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
    return {
      links_chart: 'net_links',
      links_option,
    }
  },
  components: {
    XChart
  }
  }
</script>
