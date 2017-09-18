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
                    <select v-model="orderField.selected" v-select2='orderField.options' class="form-control select2">
                    </select>
                </div>
                <div class="col-lg-3 col-xs-6">
                    <select v-model="orderBy.selected" v-select2='orderBy.options' class="form-control select2">
                    </select>
                </div>
                <div class="col-lg-3 col-xs-6">
<<<<<<< HEAD
                  <div class="form-group" style="margin-bottom: 0;">
                    <input type="text" class="form-control" placeholder="Enter ...">
                  </div>
                </div>
                <div class="col-lg-3 col-xs-12">
                    <div class="sidebar-form">
                        <div class="input-group">
                            <input v-model="filterIp" type="text" name="q" class="form-control" placeholder="请输入筛选IP">
=======
                  <div class="sidebar-form">
                    <div class="input-group">
                      <input v-model="filterIp" type="text" class="form-control" placeholder="请输入筛选IP">
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-xs-6">
                    <div class="sidebar-form">
                        <div class="input-group">
                            <input type="text" name="q" class="form-control" placeholder="*">
>>>>>>> b0f111ee8e27401cd5bdd3ad4b8ecea71a1485b4
                            <span class="input-group-btn"> <button @click='search' type="button" name="search" class="btn btn-flat"><i class="fa fa-search"></i> </button> </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="xn-zj-list">
            <div class="row">
                <router-link :to="{name: 'host_single', params: {id: item.ip}}" v-for="item in ItemsByOrder" class="col-lg-3 col-xs-12">
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
    this.Items = [{"memory":0.9881666666666667,"swap":0.123,"ip":"10.1.33.1","cpu":2.19,"type":"linux"},{"memory":0.5508000000000001,"swap":0.3420666666666667,"ip":"10.1.5.1","cpu":0.2742666666666667,"type":"windows"},{"memory":0.2383076923076923,"swap":0.0,"ip":"10.1.5.3","cpu":0.078,"type":"linux"},{"memory":0.990375,"swap":0.083,"ip":"10.1.5.4","cpu":0.7483749999999999,"type":"linux"},{"memory":0.9904285714285714,"swap":0.09,"ip":"10.1.5.5","cpu":0.7864285714285714,"type":"linux"},{"memory":0.99025,"swap":0.11800000000000001,"ip":"10.1.5.6","cpu":1.4957500000000001,"type":"linux"},{"memory":0.9470000000000002,"swap":0.481,"ip":"10.1.58.10","cpu":1.0352,"type":"windows"},{"memory":0.36593333333333333,"swap":0.185,"ip":"10.1.58.19","cpu":0.0033333333333333335,"type":"windows"},{"memory":0.19,"swap":0.096,"ip":"10.1.58.20","cpu":0.002,"type":"windows"},{"memory":0.19746666666666668,"swap":0.09346666666666664,"ip":"10.1.58.21","cpu":0.0020666666666666667,"type":"windows"},{"memory":0.339,"swap":0.17300000000000001,"ip":"10.1.6.111","cpu":0.12783333333333333,"type":"windows"},{"memory":0.8520000000000001,"swap":0.516,"ip":"10.1.6.116","cpu":0.05153333333333333,"type":"windows"},{"memory":0.5834666666666666,"swap":0.3363333333333334,"ip":"10.1.6.117","cpu":0.0814,"type":"windows"},{"memory":0.1392666666666667,"swap":0.07913333333333333,"ip":"10.1.6.139","cpu":0.10226666666666666,"type":"windows"},{"memory":0.098,"swap":0.09446666666666666,"ip":"10.1.6.15","cpu":0.05686666666666666,"type":"windows"},{"memory":0.5173846153846153,"swap":0.29307692307692307,"ip":"10.1.6.152","cpu":0.6288461538461539,"type":"windows"},{"memory":0.20299999999999999,"swap":0.11400000000000003,"ip":"10.1.6.154","cpu":0.0594,"type":"windows"},{"memory":0.8909333333333334,"swap":0.0,"ip":"10.1.6.164","cpu":0.5725333333333334,"type":"linux"},{"memory":0.962,"swap":0.0,"ip":"10.1.6.171","cpu":0.0483,"type":"linux"},{"memory":0.732,"swap":0.0,"ip":"10.1.6.172","cpu":0.03809090909090909,"type":"linux"},{"memory":0.5002,"swap":0.2861333333333333,"ip":"10.1.6.175","cpu":0.0274,"type":"windows"},{"memory":0.795,"swap":0.20099999999999998,"ip":"10.1.6.176","cpu":0.02393333333333333,"type":"linux"},{"memory":0.984,"swap":0.048,"ip":"10.1.6.177","cpu":0.9924666666666667,"type":"linux"},{"memory":0.45213333333333333,"swap":0.06099999999999999,"ip":"10.1.6.189","cpu":0.41159999999999997,"type":"linux"},{"memory":0.995,"swap":0.082,"ip":"10.1.6.191","cpu":0.02006896551724138,"type":"linux"},{"memory":0.4356666666666667,"swap":0.0,"ip":"10.1.6.192","cpu":0.38433333333333336,"type":"linux"},{"memory":0.08200000000000002,"swap":0.04100000000000001,"ip":"10.1.6.2","cpu":0.001666666666666667,"type":"windows"},{"memory":0.15399999999999997,"swap":0.08719999999999999,"ip":"10.1.6.202","cpu":0.02026666666666667,"type":"windows"},{"memory":0.2998,"swap":0.0,"ip":"10.1.6.203","cpu":0.010133333333333333,"type":"linux"},{"memory":0.9626,"swap":0.033,"ip":"10.1.6.204","cpu":0.012733333333333334,"type":"linux"},{"memory":0.15313333333333334,"swap":0.09013333333333333,"ip":"10.1.6.206","cpu":0.004066666666666666,"type":"windows"},{"memory":0.8547999999999999,"swap":0.0,"ip":"10.1.6.208","cpu":0.013733333333333335,"type":"linux"},{"memory":0.39764285714285713,"swap":0.22435714285714287,"ip":"10.1.6.209","cpu":0.013571428571428571,"type":"windows"},{"memory":0.3321333333333333,"swap":0.18000000000000002,"ip":"10.1.6.211","cpu":8.009866666666667,"type":"windows"},{"memory":0.3449285714285715,"swap":0.21300000000000002,"ip":"10.1.6.212","cpu":0.10364285714285715,"type":"windows"},{"memory":0.9841666666666665,"swap":0.04900000000000001,"ip":"10.1.6.216","cpu":0.004916666666666667,"type":"linux"},{"memory":0.15073333333333333,"swap":0.084,"ip":"10.1.6.217","cpu":0.014733333333333333,"type":"windows"},{"memory":0.106,"swap":0.0,"ip":"10.1.6.218","cpu":0.0032000000000000006,"type":"linux"},{"memory":0.586,"swap":0.0,"ip":"10.1.6.221","cpu":0.006800000000000001,"type":"linux"},{"memory":0.16,"swap":0.0,"ip":"10.1.6.222","cpu":0.013666666666666667,"type":"linux"},{"memory":0.101,"swap":0.0,"ip":"10.1.6.223","cpu":0.004333333333333333,"type":"linux"},{"memory":0.32599999999999996,"swap":0.4968666666666666,"ip":"10.1.6.229","cpu":0.0022,"type":"windows"},{"memory":0.7171333333333333,"swap":0.02,"ip":"10.1.6.230","cpu":0.04986666666666668,"type":"linux"},{"memory":0.9770000000000001,"swap":0.006,"ip":"10.1.6.231","cpu":0.8840666666666668,"type":"linux"},{"memory":0.946,"swap":0.001,"ip":"10.1.6.232","cpu":0.005533333333333334,"type":"linux"},{"memory":0.9599999999999999,"swap":0.001,"ip":"10.1.6.233","cpu":0.005866666666666667,"type":"linux"},{"memory":0.9918,"swap":0.12399999999999999,"ip":"10.1.6.234","cpu":0.03686666666666667,"type":"linux"},{"memory":0.35500000000000004,"swap":0.0,"ip":"10.1.6.235","cpu":0.004153846153846154,"type":"linux"},{"memory":0.8530000000000001,"swap":0.133,"ip":"10.1.6.237","cpu":0.0336,"type":"linux"},{"memory":0.36299999999999993,"swap":0.0,"ip":"10.1.6.238","cpu":0.025,"type":"linux"},{"memory":0.32,"swap":0.17200000000000001,"ip":"10.1.6.240","cpu":0.020384615384615386,"type":"windows"},{"memory":0.111,"swap":0.0,"ip":"10.1.6.241","cpu":0.007133333333333334,"type":"linux"},{"memory":0.49,"swap":0.28400000000000003,"ip":"10.1.6.242","cpu":0.004153846153846155,"type":"windows"},{"memory":0.513,"swap":0.0,"ip":"10.1.6.243","cpu":0.008571428571428572,"type":"linux"},{"memory":0.418,"swap":0.0,"ip":"10.1.6.244","cpu":0.0030000000000000005,"type":"linux"},{"memory":0.442,"swap":0.0,"ip":"10.1.6.245","cpu":0.00375,"type":"linux"},{"memory":0.9620000000000001,"swap":0.0,"ip":"10.1.6.246","cpu":0.048299999999999996,"type":"linux"},{"memory":0.9800000000000001,"swap":0.0,"ip":"10.1.6.248","cpu":0.0035454545454545456,"type":"linux"},{"memory":0.353,"swap":0.20299999999999999,"ip":"10.1.6.43","cpu":0.009466666666666668,"type":"windows"},{"memory":0.5658461538461539,"swap":0.23984615384615388,"ip":"10.1.6.6","cpu":0.03969230769230769,"type":"windows"},{"memory":0.292,"swap":0.16999999999999998,"ip":"10.1.6.80","cpu":0.0032,"type":"windows"},{"memory":0.8951333333333334,"swap":0.5605333333333334,"ip":"10.1.6.81","cpu":0.0511,"type":"windows"},{"memory":0.384,"swap":0.19713333333333338,"ip":"10.1.6.83","cpu":0.16553333333333334,"type":"windows"},{"memory":0.47100000000000003,"swap":0.255,"ip":"10.1.6.84","cpu":0.4782666666666666,"type":"windows"},{"memory":0.4812666666666666,"swap":0.268,"ip":"10.1.6.97","cpu":0.0406,"type":"windows"},{"memory":0.7661428571428571,"swap":0.4100000000000001,"ip":"10.1.77.11","cpu":0.0952142857142857,"type":"windows"},{"memory":0.508,"swap":0.289,"ip":"10.1.77.12","cpu":0.0916153846153846,"type":"windows"}]
    this.$http.get('performance/host/monitor', {
					username: this.username,
					email: this.email,
					password: this.password,
					reference: this.reference
				}).then(function(data){

        })
  },
  mounted (){
  },
  data (){
    return {
      orderField:{
        selected:'cpu',
        options:{
          data:[
            {id:'cpu',text:'CPU使用率'},
            {id:'memory',text:'内存使用率'},
            {id:'swap',text:'SWAP使用率'}
          ]
        }
      },
      orderBy:{
        selected:'desc',
        options:{
          data:[
            {id:'desc',text:'倒序'},
            {id:'asc',text:'升序'}
          ]
        }
      },
      filterIp: '',
      Items: null
    }
  },
  methods:{
    search (){
      this.Items = this.Items = [{"memory":0.9881666666666667,"swap":0.123,"ip":"10.1.33.1","cpu":2.19,"type":"linux"}]
      this.$http.get('performance/host/monitor', {
  					username: this.username,
  					email: this.email,
  					password: this.password,
  					reference: this.reference
  				}).then(function(data){

          })
    }
  },
  computed:{
    ItemsByOrder () {
      let self = this
      return _.sortBy(this.Items,function(item){
        if(self.orderBy.selected == 'desc'){
          return -item[self.orderField.selected]
        }else{
          return item[self.orderField.selected]
        }
      })
    }
  },
  watch:{
    filterIp : function(val,oldVal){
      let ip = this.filterIp
      return _.filter(this.Items, function(item){
        console.log(item)
            return item.ip.indexOf('10.1.6.211') >= 0;
      })
    }
  }
}
</script>
