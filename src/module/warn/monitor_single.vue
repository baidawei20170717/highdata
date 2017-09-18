<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> 10.1.6.175</h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
      <li class=""><a href="#">告警监控</a></li>
      <li class=""><a href="#">性能告警</a></li>
      <li class="active">10.1.6.175</li>
    </ol>
  </section>
  <section class="content">
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
          <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
              <input type="text" name="q" class="form-control" placeholder="Search...">
              <span class="input-group-btn"> <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i> </button> </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row-base-style text-center is-info-row is-info-row2">
      <div class="title">当日关注</div>
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="row">
        <div class="col-lg-6 col-xs-12">
          <div class="item">规则标示： 84848 </div>
        </div>
        <div class="col-lg-6 col-xs-12">
          <div class="item">规则名称： 93939 </div>
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
            <p>当天告警总数</p>
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
      <div class="col-lg-12 col-xs-12">
        <div class="row-base-style is-table-data">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <div class="box-header">
              <h3 class="box-title">当天告警明细列表</h3>
            </div>
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th width="20%">告警时间</th>
                  <th width="20%">告警名称</th>
                  <th width="20%">告警IP</th>
                  <th>告警信息</th>
                </tr>
                <tr>
                  <td>2017-09-06 12:23：59 000</td>
                  <td>http异常返回状态</td>
                  <td>10.1.5.6</td>
                  <td>10.1.234.645 －－ jrogwughdfvwortruwp［834509384hihvbdhvoshdfvglfbhlv］</td>
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
                    text: '当天告警趋势',
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
    return {
      performance_chart: 'monitorSingle_performance',
      performance_option
    }
    },
    components: {
      XChart
    }
  }
</script>
