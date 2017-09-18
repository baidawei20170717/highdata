<template>
<div class="content-wrapper">
    <section class="content-header">
        <h1> 主机监控</h1>
        <ol class="breadcrumb">
            <li><router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link></li>
            <li><a href="javascript:;">性能监控</a></li>
            <li class="active">主机监控</li>
        </ol>
    </section>
    <section class="content">
        <div v-show="this.$store.state.isSearch" class="is-search row-base-style">
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
                  <div class="sidebar-form">
                    <div class="input-group">
                      <input v-model="filterIp" type="text" class="form-control" placeholder="请输入筛选IP">
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-xs-6">
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
                <router-link :to="{name: 'host_single', params: {id: item.ip}}" v-for="item in ItemsByFilter" class="col-lg-3 col-xs-12">
                    <div class="box box-solid">
                        <div class="box-header text-center">
                            <h3 class="box-title text-ffffff">{{ item.ip }}</h3>
                        </div>
                        <div class="box-body">
                            <div class="is-progress">
                                <span class="label">CPU</span>
                                <div class="progress ">
                                    <div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
                                        <span class="sr-only">{{ item.cpu * 100 | number }}% </span>
                                    </div>
                                </div>
                            </div>
                            <div class="is-progress">
                                <span class="label">MEM</span>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-green " role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                                        <span class="sr-only">{{ item.memory * 100 | number }}% </span>
                                    </div>
                                </div>
                            </div>
                            <div class="is-progress">
                                <span class="label">SWAP</span>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-aqua" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
                                        <span class="sr-only">{{ item.swap * 100 | number }}% </span>
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
  name: 'host',
  created (){
    this.search()
  },
  data (){
    return {
      orderFieldSelected:'cpu',
      orderFieldOptions:{
        data:[
          {id:'cpu',text:'CPU使用率'},
          {id:'memory',text:'内存使用率'},
          {id:'swap',text:'SWAP使用率'}
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
      this.Items = [{"memory":0.9390000000000001,"swap":0.114,"ip":"10.1.33.1","cpu":2.527,"type":"linux"},{"memory":0.6085999999999999,"swap":0.37399999999999994,"ip":"10.1.5.1","cpu":0.1538,"type":"windows"},{"memory":0.24000000000000002,"swap":0.0,"ip":"10.1.5.3","cpu":0.07761538461538461,"type":"linux"},{"memory":0.99125,"swap":0.163,"ip":"10.1.5.4","cpu":1.6063749999999999,"type":"linux"},{"memory":0.9908571428571429,"swap":0.2521428571428571,"ip":"10.1.5.5","cpu":2.6867142857142854,"type":"linux"},{"memory":0.989375,"swap":0.09199999999999998,"ip":"10.1.5.6","cpu":1.561375,"type":"linux"},{"memory":0.9981333333333333,"swap":0.8581333333333333,"ip":"10.1.58.10","cpu":1.0306,"type":"windows"},{"memory":0.37707142857142856,"swap":0.191,"ip":"10.1.58.19","cpu":0.003428571428571429,"type":"windows"},{"memory":0.115,"swap":0.081,"ip":"10.1.58.20","cpu":0.0016,"type":"windows"},{"memory":0.11999999999999998,"swap":0.063,"ip":"10.1.58.21","cpu":0.0016,"type":"windows"},{"memory":0.342,"swap":0.17400000000000002,"ip":"10.1.6.111","cpu":0.14541666666666667,"type":"windows"},{"memory":0.855,"swap":0.516,"ip":"10.1.6.116","cpu":0.051133333333333336,"type":"windows"},{"memory":0.6150666666666667,"swap":0.34806666666666675,"ip":"10.1.6.117","cpu":0.0924,"type":"windows"},{"memory":0.09526666666666665,"swap":0.048799999999999996,"ip":"10.1.6.139","cpu":0.10433333333333335,"type":"windows"},{"memory":0.09499999999999999,"swap":0.09299999999999999,"ip":"10.1.6.15","cpu":0.0188,"type":"windows"},{"memory":0.5490769230769231,"swap":0.2936153846153846,"ip":"10.1.6.152","cpu":0.7573076923076923,"type":"windows"},{"memory":0.137,"swap":0.07733333333333332,"ip":"10.1.6.154","cpu":0.048266666666666666,"type":"windows"},{"memory":0.7319333333333333,"swap":0.0,"ip":"10.1.6.164","cpu":0.5462000000000001,"type":"linux"},{"memory":0.9613999999999999,"swap":0.0,"ip":"10.1.6.171","cpu":0.048100000000000004,"type":"linux"},{"memory":0.7330000000000001,"swap":0.0,"ip":"10.1.6.172","cpu":0.035,"type":"linux"},{"memory":0.5830000000000001,"swap":0.341,"ip":"10.1.6.175","cpu":0.021666666666666664,"type":"windows"},{"memory":0.8280000000000001,"swap":0.20299999999999999,"ip":"10.1.6.176","cpu":0.020466666666666668,"type":"linux"},{"memory":0.9814,"swap":0.04900000000000001,"ip":"10.1.6.177","cpu":1.0014,"type":"linux"},{"memory":0.9895333333333334,"swap":0.11200000000000002,"ip":"10.1.6.189","cpu":0.43079999999999996,"type":"linux"},{"memory":0.9940344827586205,"swap":0.106,"ip":"10.1.6.191","cpu":0.02017241379310345,"type":"linux"},{"memory":0.45333333333333337,"swap":0.0,"ip":"10.1.6.192","cpu":0.41553333333333337,"type":"linux"},{"memory":0.082,"swap":0.041,"ip":"10.1.6.2","cpu":0.0012857142857142859,"type":"windows"},{"memory":0.1560666666666667,"swap":0.098,"ip":"10.1.6.202","cpu":0.07886666666666667,"type":"windows"},{"memory":0.41500000000000004,"swap":0.0,"ip":"10.1.6.203","cpu":0.0098,"type":"linux"},{"memory":0.981,"swap":0.033,"ip":"10.1.6.204","cpu":0.013066666666666667,"type":"linux"},{"memory":0.131,"swap":0.08600000000000001,"ip":"10.1.6.206","cpu":0.004266666666666667,"type":"windows"},{"memory":0.8655999999999999,"swap":0.0,"ip":"10.1.6.208","cpu":0.014799999999999999,"type":"linux"},{"memory":0.406,"swap":0.23100000000000004,"ip":"10.1.6.209","cpu":0.010357142857142858,"type":"windows"},{"memory":0.3519333333333333,"swap":0.19826666666666667,"ip":"10.1.6.211","cpu":8.045466666666666,"type":"windows"},{"memory":0.3565,"swap":0.22492857142857142,"ip":"10.1.6.212","cpu":0.12478571428571429,"type":"windows"},{"memory":0.988,"swap":0.04700000000000001,"ip":"10.1.6.216","cpu":0.00525,"type":"linux"},{"memory":0.3903333333333333,"swap":0.2,"ip":"10.1.6.217","cpu":0.020800000000000003,"type":"windows"},{"memory":0.10800000000000001,"swap":0.0,"ip":"10.1.6.218","cpu":0.009066666666666667,"type":"linux"},{"memory":0.587,"swap":0.0,"ip":"10.1.6.221","cpu":0.006533333333333333,"type":"linux"},{"memory":0.189,"swap":0.0,"ip":"10.1.6.222","cpu":0.014400000000000001,"type":"linux"},{"memory":0.10600000000000001,"swap":0.0,"ip":"10.1.6.223","cpu":0.004533333333333334,"type":"linux"},{"memory":0.3751333333333333,"swap":0.5110666666666667,"ip":"10.1.6.229","cpu":0.004733333333333334,"type":"windows"},{"memory":0.9884000000000001,"swap":0.024,"ip":"10.1.6.230","cpu":0.09133333333333334,"type":"linux"},{"memory":0.9672666666666667,"swap":0.010000000000000002,"ip":"10.1.6.231","cpu":1.8665333333333336,"type":"linux"},{"memory":0.9618,"swap":0.002,"ip":"10.1.6.232","cpu":0.018133333333333335,"type":"linux"},{"memory":0.9689999999999999,"swap":0.001,"ip":"10.1.6.233","cpu":0.016866666666666665,"type":"linux"},{"memory":0.9869333333333332,"swap":0.1632666666666667,"ip":"10.1.6.234","cpu":0.07213333333333334,"type":"linux"},{"memory":0.35400000000000004,"swap":0.0,"ip":"10.1.6.235","cpu":0.006230769230769231,"type":"linux"},{"memory":0.9923333333333332,"swap":0.131,"ip":"10.1.6.237","cpu":0.033933333333333336,"type":"linux"},{"memory":0.368,"swap":0.0,"ip":"10.1.6.238","cpu":0.010333333333333333,"type":"linux"},{"memory":0.328,"swap":0.176,"ip":"10.1.6.240","cpu":0.014923076923076924,"type":"windows"},{"memory":0.111,"swap":0.0,"ip":"10.1.6.241","cpu":0.007333333333333333,"type":"linux"},{"memory":0.49807692307692314,"swap":0.28807692307692306,"ip":"10.1.6.242","cpu":0.005615384615384616,"type":"windows"},{"memory":0.501,"swap":0.0,"ip":"10.1.6.243","cpu":0.008428571428571428,"type":"linux"},{"memory":0.4181111111111111,"swap":0.0,"ip":"10.1.6.244","cpu":0.003222222222222222,"type":"linux"},{"memory":0.442,"swap":0.0,"ip":"10.1.6.245","cpu":0.0045,"type":"linux"},{"memory":0.9610000000000001,"swap":0.0,"ip":"10.1.6.246","cpu":0.04820000000000001,"type":"linux"},{"memory":0.981,"swap":0.0,"ip":"10.1.6.248","cpu":0.0035454545454545456,"type":"linux"},{"memory":0.367,"swap":0.21099999999999997,"ip":"10.1.6.43","cpu":0.009000000000000001,"type":"windows"},{"memory":0.5750769230769232,"swap":0.24130769230769228,"ip":"10.1.6.6","cpu":0.03776923076923077,"type":"windows"},{"memory":0.3167333333333333,"swap":0.1836,"ip":"10.1.6.80","cpu":0.002866666666666667,"type":"windows"},{"memory":0.9565333333333335,"swap":0.6335999999999999,"ip":"10.1.6.81","cpu":0.11220000000000001,"type":"windows"},{"memory":0.394,"swap":0.2032,"ip":"10.1.6.83","cpu":0.6226,"type":"windows"},{"memory":0.4720000000000001,"swap":0.257,"ip":"10.1.6.84","cpu":0.4560666666666667,"type":"windows"},{"memory":0.48146666666666665,"swap":0.265,"ip":"10.1.6.97","cpu":0.08446666666666668,"type":"windows"},{"memory":0.768,"swap":0.40299999999999997,"ip":"10.1.77.11","cpu":0.11621428571428573,"type":"windows"},{"memory":0.5710000000000001,"swap":0.32,"ip":"10.1.77.12","cpu":0.036,"type":"windows"}]
      let self = this
      this.$http.post('performance/host/monitor', {
        search:this.search
        }).then(function(res){
          self.Items = res.data
          self.selectOrder
        }).catch(function(err){
          console.log('获取主机监控列表失败!')
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
      this.selectOrder
    },
    orderBySelected : function(val,oldVal){
      this.selectOrder
    }
  }
}
</script>
