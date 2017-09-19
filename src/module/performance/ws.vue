<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> 中间件监控  </h1>
    <ol class="breadcrumb">
          <li><router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link></li>
          <li><a href="javascript:;">性能监控</a></li>
          <li class="active">中间件监控</li>
    </ol>
  </section>
  <section class="content">
    <div class="is-search row-base-style" v-show="this.$store.state.isSearch" >
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <select v-model="orderFieldSelected" v-select2='orderFieldOptions' class="form-control select2">
          </select>
        </div>
        <div class="col-lg-3 col-xs-6">
          <select v-model="orderBySelected" v-select2='orderBySptions' class="form-control select2">
          </select>
        </div>
        <div class="col-lg-3 col-xs-6">
          <div class="form-group" style="margin-bottom: 0;">
            <input v-model="filterIp" type="text" class="form-control" placeholder="请输入筛选IP">
          </div>
        </div>
        <div class="col-lg-3 col-xs-12">
            <div class="sidebar-form">
                <div class="input-group">
                  <input type="text" v-model='params.search' class="form-control" placeholder="请输入搜索内容">
                  <span class="input-group-btn"> <button @click='search' type="button" name="search" class="btn btn-flat"><i class="fa fa-search"></i> </button> </span>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div class="xn-zj-list">
      <div class="row">

        <router-link :to="{name: 'ws_single', params: {id: item.ip}}" v-for="item in ItemsByFilter" class="col-lg-3 col-xs-12">
          <div class="box box-solid">
            <div class="box-header text-center">
              <h3 class="box-title text-ffffff">{{item.ip}}</h3>
              <div class="text-ffffff text-size12">主机类型：{{item.type}} <br>占用内存：{{item.memory/1024/1024 | number(2)}}MB</div>
            </div>
            <div class="box-body">
              <div class="is-progress">
                <span class="label">CPU</span>
                <div class="progress ">
                  <div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
                    <span class="sr-only">{{item.cpu * 100 | number }}% </span>
                  </div>
                </div>
              </div>
              <div class="is-progress">
                <span class="label">MEM</span>
                <div class="progress">
                  <div class="progress-bar progress-bar-green " role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                    <span class="sr-only">{{item.pct * 100 | number }}% </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</div>
</template>

<script type="es6">
import _ from 'lodash'
export default {
  name: 'ws',
  created (){
    this.search()
  },
  data (){
    return {
      orderFieldSelected:'pct',
      orderFieldOptions:{
        data:[
          {id:'pct',text:'内存占用'},
          {id:'cpu',text:'CPU使用率'},
          {id:'memory',text:'内存使用率'}
        ]
      },
      orderBySelected:'desc',
      orderBySptions:{
        data:[
          {id:'desc',text:'倒序'},
          {id:'asc',text:'升序'}
        ]
      },
      filterIp: '',
      params:{search:'*'},
      Items: []
    }
  },
  methods:{
    selectOrder(){
      let self = this
      this.Items =  _.sortBy(this.Items,function(item){
        if(self.orderBySelected == 'desc'){
          return -item[self.orderFieldSelected]
        }else{
          return item[self.orderFieldSelected]
        }
      })
    },
    search (){
      this.Items =[{"pct":0.009000000000000001,"memory":1.53337856E8,"ip":"10.1.33.1","cpu":0.0,"wsType":"tomcat","type":"linux"},{"pct":0.0345,"memory":5.722477714285715E8,"ip":"10.1.5.3","cpu":7.142857142857143E-4,"wsType":"tomcat","type":"linux"},{"pct":0.136,"memory":4.560778386285714E9,"ip":"10.1.5.6","cpu":0.009428571428571429,"wsType":"tomcat","type":"linux"},{"pct":0.006,"memory":4.30395392E8,"ip":"10.1.6.164","cpu":6.666666666666666E-4,"wsType":"tomcat","type":"linux"},{"pct":0.11024444444444445,"memory":3.0071490332444444E9,"ip":"10.1.6.203","cpu":0.006577777777777779,"wsType":"tomcat","type":"linux"},{"pct":0.005000000000000001,"memory":3.63360256E8,"ip":"10.1.6.222","cpu":2.666666666666667E-4,"wsType":"tomcat","type":"linux"},{"pct":0.30100000000000005,"memory":5.020777403733334E9,"ip":"10.1.6.230","cpu":0.023600000000000006,"wsType":"tomcat","type":"linux"},{"pct":0.042,"memory":7.010436827428571E8,"ip":"10.1.6.232","cpu":0.001342857142857143,"wsType":"tomcat","type":"linux"},{"pct":0.08600000000000001,"memory":2.902616064E9,"ip":"10.1.6.235","cpu":0.001,"wsType":"tomcat","type":"linux"},{"pct":0.02,"memory":6.75180544E8,"ip":"10.1.6.238","cpu":0.0019333333333333333,"wsType":"tomcat","type":"linux"},{"pct":0.021,"memory":1.03755776E9,"ip":"10.1.6.241","cpu":9.333333333333334E-4,"wsType":"tomcat","type":"linux"},{"pct":0.057,"memory":1.910714368E9,"ip":"10.1.6.243","cpu":0.002,"wsType":"tomcat","type":"linux"},{"pct":0.036000000000000004,"memory":5.95996672E8,"ip":"10.1.6.244","cpu":0.001,"wsType":"tomcat","type":"linux"},{"pct":0.036000000000000004,"memory":6.049661672727273E8,"ip":"10.1.6.245","cpu":0.0011818181818181819,"wsType":"tomcat","type":"linux"},{"pct":0.027000000000000003,"memory":4.4189696E8,"ip":"10.1.6.248","cpu":0.0010000000000000002,"wsType":"tomcat","type":"linux"}]
      let self = this
      this.$http.post('performance/ws/monitor', {
        search:this.search
        }).then(function(res){
          self.Items = res.data
          self.selectOrder
        }).catch(function(err){
          console.log('获取中间件监控列表失败!')
        })
    }
  },
  computed:{
    ItemsByFilter () {
      let ip = this.filterIp
      return _.filter(this.Items, function(item){
        return item.ip.indexOf(ip) >= 0;
      })
    }
  },
  watch:{
    orderFieldSelected : function(val,oldVal){
      this.selectOrder()
    },
    orderBySelected : function(val,oldVal){
      this.selectOrder()
    }
  }
}
</script>
