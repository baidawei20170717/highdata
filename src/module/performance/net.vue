<template>
  <div class="content-wrapper">
  <section class="content-header">
    <h1> 网络设备监控 </h1>
    <ol class="breadcrumb">
      <li><router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link></li>
      <li><a href="javascript:;">性能监控</a></li>
      <li class="active">网络设备监控</li>
    </ol>
  </section>
  <section class="content">
    <div class="is-search row-base-style" v-show="this.$store.state.isSearch">
      <div class="left-icon"></div>
      <div class="right-icon"></div>
      <div class="row">
        <div class="col-lg-3 col-xs-6">
<<<<<<< HEAD
          <select v-model="orderFieldSelected" v-select2='orderFieldOptions' class="form-control select2">
=======
          <select v-model="orderField" class="form-control select2">
              <option v-for="item in orderFields" :value="item.key">{{item.value}}</option>
>>>>>>> a720f7a737d2b1503565fe5f0a752e044d0e537a
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
    <div class="xn-wlsb-list">
      <div class="row">

        <router-link :to="{name: 'net_single', params: {id: item.ip}}" v-for="item in ItemsByFilter"  class="col-lg-3 col-xs-12">
          <div class="box box-solid">
            <div class="box-header text-center">
              <h3 class="box-title text-76d4f2">{{item.ip}}</h3>
              <div class="box-body">
                <p>{{item.name}}</p>
                <p>{{item.type}}</p>
                <p>最近15分钟采集状态
                  <span v-if="item.islastData == 'TRUE'" class="fa fa-check-circle text-success"></span>
                  <span v-else="" class="fa  fa-times-circle text-danger"></span></p>
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
  name: 'net',
  created (){
    this.search()
  },
  data (){
    return {
      orderFieldSelected:'islastData',
      orderFieldOptions:{
        data:[
          {id:'islastData',text:'最近15分钟采集状态'}
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
      this.Items =[{"islastData":"TRUE","ip":"172.17.0.31","name":"三合一（IPS/WAF/UAG）","type":"DPX 8000-A5"},{"islastData":"TRUE","ip":"172.16.0.103","name":"抗DDOS","type":"Guard3000-GE"},{"islastData":"TRUE","ip":"10.1.5.254","name":"安全区防火墙","type":"H3C NS-SecPathF5020"},{"islastData":"FALSE","ip":"10.1.90.1","name":"DMZ区VPN","type":"H3C  NS-SecPathF5020"},{"islastData":"TRUE","ip":"10.1.17.2","name":"华为防火墙","type":"USG5530"},{"islastData":"TRUE","ip":"172.17.0.11","name":"网神防火墙","type":"SecGate3600"},{"islastData":"FALSE","ip":"172.17.0.12","name":"网神防火墙","type":"SecGate3600"},{"islastData":"FALSE","ip":"172.16.0.11","name":"负载均衡","type":"ADX3000-GC-1"},{"islastData":"FALSE","ip":"172.16.0.101","name":"上联交换机","type":"\tS5500-1"},{"islastData":"FALSE","ip":"172.16.0.102","name":"下联交换机","type":"\tS5500-2"},{"islastData":"FALSE","ip":"10.1.88.200","name":"DMZ区交换机","type":"S5500"},{"islastData":"FALSE","ip":"10.10.1.2","name":"核心交换机","type":"H3C S7506E-1"},{"islastData":"FALSE","ip":"10.1.6.249","name":"服务器接入交换机 1","type":"华为 S5700-1"},{"islastData":"FALSE","ip":"10.1.6.250","name":"服务器接入交换机 2","type":"H3C  S7503E-1"},{"islastData":"FALSE","ip":"10.1.6.247","name":"虚拟化接入交换机1","type":"H3C  S7503E-2"}]
      let self = this
      this.$http.post('performance/net/monitor', {
        search:this.search
        }).then(function(res){
          self.Items = res.data
          self.selectOrder
        }).catch(function(err){
          console.log('获取网络设备监控列表失败!')
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
