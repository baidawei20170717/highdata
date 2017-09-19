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
                  <div class="form-group" style="margin-bottom: 0;">
                    <input v-model="filterIp" type="text" class="form-control" placeholder="请输入筛选IP">
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
                <router-link :to="{name: 'host_single', params: {id: item.ip}}" v-for="item in ItemsByFilter" :key="item.ip" class="col-lg-3 col-xs-12">
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
      let self = this
      this.$service.hostMonitor(this.params).then(function(res){
          self.Items = res
          self.selectOrder()
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
      this.selectOrder()
    },
    orderBySelected : function(val,oldVal){
      this.selectOrder()
    }
  }
}
</script>
