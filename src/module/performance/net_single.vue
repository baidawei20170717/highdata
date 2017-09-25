<template>
  <div class="content-wrapper">
  <section class="content-header">
    <h1> {{ ip }} </h1>
    <ol class="breadcrumb">
      <li><router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link></li>
      <li><a href="javascript:;">性能监控</a></li>
      <li class=""><a href="javascript:;">网络设备监控</a></li>
      <li class="active"> {{ ip }} </li>
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
      <div class="col-lg-4 col-xs-6">
        <div class="item"><i class="fa fa-desktop text-fa9a2a" aria-hidden="true"></i>设备ip：{{ ip }}</div>
      </div>
      <div class="col-lg-4 col-xs-6">
        <div class="item"><i class="fa fa-server text-52dabd" aria-hidden="true"></i>设备名称：{{basic.name}}</div>
      </div>
      <div class="col-lg-4 col-xs-6">
        <div class="item"><i class="fa fa-database text-76d4f2" aria-hidden="true"></i>设备类型：{{basic.type}}</div>
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
            <p>当天事件数</p>
            <p class="text-size60 text-76d4f2">{{count}}</p>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-xs-12">
        <div class="row-base-style">
          <div class="left-icon"></div>
          <div class="right-icon"></div>
          <div class="item ">
            <x-chart :id="countDay_chart" :option="countDay_option" ref="countDay" :css="300"></x-chart>
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
            <div class="box-body no-padding layer-mb20">
              <table class="table table-condensed">
                <tr>
                  <th style="width: 180px">时间</th>
                  <th>事件</th>
                </tr>
                <tr v-for="item in lastEventByFilter">
                  <td>{{item['@timestamp'] | dateFormat}}</td>
                  <td>{{item.message}}</td>
                </tr>
              </table>
            </div>
            <div class="text-center"><a @click="disEventCount=disEventCount+10" v-if="disEventCount < lastEvent.length" href="javascript:;" class="text-ffffff">&lt;加载更多&gt;</a></div>
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
    name: 'net_single',
    created (){
      this.search()
    },
    data() {
      return {
        ip : this.$route.params.id,
        startTime: {
          time: this.$moment().format('YYYY-MM-DD')
        },
        limit:[],
        params : {
          startTime: '',
          endTime: '',
          search: '*'
        },
        basic:{
          memory: 0, cpu: 0, disk: 0
        },
        disEventCount:10,
        countDay_chart: 'net_links',
        countDay_option:{},
        count:0,
        lastEvent:[]
      }
    },
    methods:{
      search(){
        let date = this.startTime.time
        this.params.startTime = this.$moment(date).format('x')
        this.params.endTime =this.$moment(date).add(1, 'd').format('x')

        this.disEventCount = 10
        this.getBasic()
        this.getCount()
        this.getCountDay()
        this.getLastEvent()
      },
      getBasic(){
        let self = this
        this.$service.netBasic(this.ip,this.params)
        .then(function(res){
          self.basic = res
        }).catch(function(err){
          console.log('获取网络设备基本信息失败!')
        })
      },
      getCount(){
        let self = this
        this.$service.netCount(this.ip,this.params)
        .then(function(res){
          self.count = res
        }).catch(function(err){
          console.log('获取当天事件量失败!')
        })
      },
      getCountDay(){
        let self = this
        self.countDay_option = {
            chart: {
                backgroundColor: 'none',
                type: 'line',
                marginLeft: 60,
                marginRight: 20
            },
            title: {
                text: '当天事件趋势',
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
                labels: {
                  style:{
                    color:'#fff'
                  }
                },
              type:'category',
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
            series: []
        }
        this.$service.netCountDay(this.ip,this.params)
        .then(function(res){
          self.countDay_option.series=res
          self.countDay_option.series[0].color="#50ddbd"
          self.$refs.countDay.CreateNow()
        }).catch(function(err){
          console.log(err)
          console.log('获取当日事件趋势失败!')
        })
      },
      getLastEvent(){
        let self = this
        this.$service.netLastEvent(this.ip,this.params)
        .then(function(res){
          self.lastEvent = res
        }).catch(function(err){
          console.log('获取当日最后事件列表失败!')
        })
      },
    },
    computed:{
      lastEventByFilter () {
        return this.lastEvent.slice(0,this.disEventCount)
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
