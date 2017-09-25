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
        <div class="col-lg-3 col-xs-6">
          <div class="form-group" style="margin-bottom: 0;">
            <input v-model="ip" type="text" class="form-control" placeholder="请输入筛选IP">
          </div>
        </div>
        <div class="col-lg-6 col-xs-12">
          <div class="sidebar-form">
            <div class="input-group">
              <input type="text" v-model='params.search' class="form-control" placeholder="请输入搜索内容">
              <span class="input-group-btn"> <button @click='search' type="button" name="search" class="btn btn-flat"><i class="fa fa-search"></i> </button> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-base-style text-center is-info-row">
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-desktop text-fa9a2a" aria-hidden="true"></i>设备ip：{{ ip }}</div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-database text-76d4f2" aria-hidden="true"></i>内存：{{ basic.memory/1024/1024/1024 | number(2) }}GB</div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-dashboard text-e95658" aria-hidden="true"></i>cpu：{{ basic.cpu/2 }}核</div>
      </div>
      <div class="col-lg-3 col-xs-6">
        <div class="item"><i class="fa fa-tasks text-81bd51" aria-hidden="true"></i>磁盘：{{ basic.disk/1024/1024/1024 | number(2) }}GB</div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="cpu_chart" :option="cpu_option" ref="cpu_chart"></x-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item">
            <x-chart :id="memory_chart" :option="memory_option" ref="memory_chart"></x-chart>
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
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th>进程名称</th>
                  <th>物理内存</th>
                  <th>共享内存</th>
                  <th>内存使用率</th>
                  <th>CPU使用率</th>
                </tr>
                <tr v-for="item in ProcessByFilter">
                  <td>{{item.name}}</td>
                  <td>{{item.memery/1024/1024 | number(2) }}MB</td>
                  <td>{{item.share/1024/1024 | number(2) }}MB</td>
                  <td>{{item.resident * 100 | number(2) }}%</td>
                  <td>{{item.cpu * 100 | number(2) }}%</td>
                </tr>
              </table>
            </div>
            <div class="text-center"><a href="javascript:;" @click="disNowProcessCount=disNowProcessCount+10" v-if="disNowProcessCount < process.length" class="text-ffffff">&lt;加载更多&gt;</a></div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-xs-12">
        <div class="row-base-style is-table-data">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <div class="box-header">
              <h3 class="box-title">当前磁盘列表</h3>
            </div>
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th>分区</th>
                  <th>磁盘空间</th>
                  <th>可用空间</th>
                  <th>已使用空间</th>
                  <th>磁盘使用率</th>
                  <th>文件数</th>
                </tr>
                <tr v-for="item in DiskByFilter">
                  <td>{{item.name}}</td>
                  <td>{{item.total/1024/1024/1024 | number(2) }}GB</td>
                  <td>{{item.available/1024/1024/1024 | number(2) }}GB</td>
                  <td>{{item.usedbytes/1024/1024/1024 | number(2) }}GB</td>
                  <td>{{item.usedpct * 100 | number(2) }}%</td>
                  <td>{{item.files}}</td>
                </tr>
              </table>
            </div>
            <div class="text-center"><a href="javascript:;" @click="disNowDiskCount=disNowDiskCount+10" v-if="disNowDiskCount < disk.length" class="text-ffffff">&lt;加载更多&gt;</a></div>
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
  export default {
    name: 'host_single',
    created (){
      this.search()
    },
    data() {
    return {
      ip : this.$route.params.id,
      startTime: {
        time: this.$moment().format('YYYY-MM-DD')
      },
      limit: [
      // {
      //   type: 'fromto',
      //   from: this.$moment().format('YYYY-MM-DD')
      // }
      ],
      params : {
        startTime: '',
        endTime: '',
        search: '*'
      },
      basic:{
        memory: 0, cpu: 0, disk: 0
      },
      cpu_chart: 'host_cpu',
      cpu_option: {},
      memory_chart: 'host_memory',
      memory_option: {},
      process:[],
      disk:[],
      disNowDiskCount:10,
      disNowProcessCount:10
    }
  },
  methods:{
    search(){
      let date = this.startTime.time
      this.params.startTime = this.$moment(date).format('x')
      this.params.endTime =this.$moment(date).add(1, 'd').format('x')

      this.disNowDiskCount = 10
      this.disNowProcessCount = 10
      this.getBasic()
      this.getCpuDay()
      this.getMemDay()
      this.getProcess()
      this.getDisk()
    },
    getBasic(){
      let self = this
      this.$service.hostBasic(this.ip,this.params)
      .then(function(res){
        self.basic = res
      }).catch(function(err){
        console.log('获取设备基本信息失败!')
      })
    },
    getCpuDay(){
      let self = this
      self.cpu_option = {
        chart: {
          backgroundColor: 'none',
          type: 'areaspline',
          marginLeft: 60,
          marginRight: 20
        },
        title: {
          text: '当天CPU使用率趋势',
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
          type: 'datetime',
          dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%m-%d',
            week: '%m-%d',
            month: '%Y-%m',
            year: '%Y'
          },
          labels: {
            style: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
            formatter: function() {
              return '<div style="color:#fff">' + this.value + '</div>'
            }
          },
          gridLineColor: '#333', //网格线样式
          tickAmount: 7 //显示刻度数
        },
        tooltip: {
          dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%Y-%m-%d',
            week: '%m-%d',
            month: '%Y-%m',
            year: '%Y'
          }
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
      }
      this.$service.hostCpuDay(this.ip,this.params)
      .then(function(res){
        self.cpu_option.series = res
        self.cpu_option.series[0].color = '#53ddbf'
        self.cpu_option.series[1].color = '#56c0e8'
        self.$refs.cpu_chart.CreateNow()
      }).catch(function(err){
        console.log('获取当天cpu趋势失败!')
      })
    },
    getMemDay(){

      this.memory_option = {
          chart: {
              backgroundColor: 'none',
              type: 'areaspline',
              marginLeft: 60,
              marginRight: 20
          },
          title: {
              text: '当天内存使用率趋势',
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
                type: 'datetime',
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%m-%d',
                    week: '%m-%d',
                    month: '%Y-%m',
                    year: '%Y'
                },
                labels: {
                  style: {
                    color: '#fff'
                  }
                }
          },
          yAxis: {
              title: {
                  text: null
              },
              labels: {
                  formatter: function() {
                      return '<div style="color:#fff">' + (this.value/1024/1024/1024).toFixed(2) + 'GB</div>'
                  }
              },
              gridLineColor: '#333', //网格线样式
              tickAmount: 7 //显示刻度数
          },
          tooltip: {
                dateTimeLabelFormats: {
                    millisecond: '%H:%M:%S.%L',
                    second: '%H:%M:%S',
                    minute: '%H:%M',
                    hour: '%H:%M',
                    day: '%Y-%m-%d',
                    week: '%m-%d',
                    month: '%Y-%m',
                    year: '%Y'
                }
          },
          plotOptions: {
              area: {
                  marker: {
                      radius: 2
                  },
                  lineWidth: 2,
                  states: {
                      hover: {
                          lineWidth: 1
                      }
                  },
                  threshold: null,
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
      };
      let self = this
      this.$service.hostMemDay(this.ip,this.params)
      .then(function(res){
        self.memory_option.series = res
        self.memory_option.series[0].color = '#f7e011'
        self.memory_option.series[1].color = '#56c0e8'
        self.$refs.memory_chart.CreateNow()
      }).catch(function(err){
        console.log('获取当天内存趋势失败!')
      })
    },
    getProcess(){
      let self = this
      this.$service.hostProcess(this.ip,this.params)
      .then(function(res){
        self.process = res
      }).catch(function(err){
        console.log('获取当前进程列表失败!')
      })
    },
    getDisk(){
      let self = this
      this.$service.hostDisk(this.ip,this.params)
      .then(function(res){
        self.disk = res
      }).catch(function(err){
        console.log('获取当前磁盘列表失败!')
      })
    }
  },
  computed:{
    ProcessByFilter () {
      return this.process.slice(0,this.disNowProcessCount)
    },
    DiskByFilter(){
      return this.disk.slice(0,this.disNowDiskCount)
    }
  },
  watch:{
    'startTime.time':function(val,oldVal){
      this.search()
    }
  },
  components: {
    XChart,
    'date-picker': myDatepicker
  }
}
</script>
