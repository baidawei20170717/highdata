<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1> 数据库监控  </h1>
    <ol class="breadcrumb">
          <li><router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link></li>
          <li><a href="javascript:;">性能监控</a></li>
          <li class="active">数据库监控</li>
    </ol>
  </section>
  <section class="content">
    <div class="is-search row-base-style">
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
        <div class="col-lg-6 col-xs-12">
          <div class="sidebar-form">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="请输入筛选IP" v-model="filterIp" >
              <span class="input-group-btn"> <button type="button" name="search" class="btn btn-flat"><i class="fa fa-search"></i> </button> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xn-zj-list">
      <div class="row">
        <router-link to="/performance/db/1" v-for="item in ItemsByFilter" class="col-lg-3 col-xs-12">
          <div class="box box-solid">
            <div class="box-header text-center">
              <h3 class="box-title text-ffffff">{{item.ip}}</h3>
              <div class="text-ffffff text-size12">主机：{{item.type}} / 数据库：{{item.dbType}} <br>占用内存：{{item.memory/1024/1024 | number}}MB</div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="is-progress">
                <span class="label">CPU</span>
                <div class="progress ">
                  <div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
                    <span class="sr-only">{{item.cpu * 100 | number}}% </span>
                  </div>
                </div>
              </div>
              <div class="is-progress">
                <span class="label">MEM</span>
                <div class="progress">
                  <div class="progress-bar progress-bar-green " role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                    <span class="sr-only">{{item.pct * 100 | number}}% </span>
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
      this.Items = [{"pct":0.014,"memory":2.38768128E8,"ip":"10.1.33.1","cpu":0.023333333333333334,"dbType":"mysql","type":"linux"},{"pct":0.003,"memory":4.5143906461538464E7,"ip":"10.1.5.3","cpu":2.3076923076923076E-4,"dbType":"mysql","type":"linux"},{"pct":0.0,"memory":1.081344E7,"ip":"10.1.5.4","cpu":0.001,"dbType":"mysql","type":"linux"},{"pct":0.002,"memory":8.1510912E7,"ip":"10.1.5.6","cpu":0.001,"dbType":"mysql","type":"linux"},{"pct":0.59,"memory":9.829407675733334E9,"ip":"10.1.6.176","cpu":0.0016,"dbType":"mysql","type":"linux"},{"pct":0.5340000000000001,"memory":8.896724718933332E9,"ip":"10.1.6.177","cpu":0.9834,"dbType":"mysql","type":"linux"},{"pct":0.017,"memory":5.68471552E8,"ip":"10.1.6.204","cpu":0.001,"dbType":"mysql","type":"linux"},{"pct":0.004,"memory":2.748416E8,"ip":"10.1.6.222","cpu":5.333333333333334E-4,"dbType":"mysql","type":"linux"},{"pct":0.308,"memory":1.0374518920533333E10,"ip":"10.1.6.231","cpu":0.9453333333333335,"dbType":"mysql","type":"linux"},{"pct":0.01,"memory":3.4899968E8,"ip":"10.1.6.234","cpu":0.0026,"dbType":"mysql","type":"linux"},{"pct":0.021,"memory":1.049194496E9,"ip":"10.1.6.241","cpu":0.001,"dbType":"mysql","type":"linux"},{"pct":0.09899999999999999,"memory":3.31634688E9,"ip":"10.1.6.243","cpu":0.001,"dbType":"mysql","type":"linux"},{"pct":0.015000000000000001,"memory":2.45649408E8,"ip":"10.1.6.244","cpu":0.001,"dbType":"mysql","type":"linux"},{"pct":0.014,"memory":2.379776E8,"ip":"10.1.6.245","cpu":0.001,"dbType":"mysql","type":"linux"},{"pct":0.014999999999999998,"memory":2.41680384E8,"ip":"10.1.6.248","cpu":0.001,"dbType":"mysql","type":"linux"}]
      let self = this
      this.$http.post('performance/db/monitor', {
        search:this.search
        }).then(function(res){
          self.Items = res.data
          self.selectOrder
        }).catch(function(err){
          console.log('获取数据库监控列表失败!')
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
