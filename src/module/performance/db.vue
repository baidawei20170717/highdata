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
          <select v-model="orderField" class="form-control select2">
              <option v-for="item in orderFields" :value="item.key">{{item.value}}</option>
          </select>
        </div>
        <div class="col-lg-3 col-xs-6">
          <select v-model="orderBy" class="form-control select2">
              <option v-for="item in orderBys" :value="item.key">{{item.value}}</option>
          </select>
        </div>
        <div class="col-lg-6 col-xs-12">
          <div class="sidebar-form">
            <div class="input-group">
              <input type="text" name="q" class="form-control" placeholder="请输入筛选IP" v-model="filterIp" >
              <span class="input-group-btn"> <button type="button" name="search" class="btn btn-flat"><i class="fa fa-search"></i> </button> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xn-zj-list">
      <div class="row">
        <router-link to="/performance/db/1" class="col-lg-3 col-xs-12">
          <div class="box box-solid">
            <div class="box-header text-center">
              <h3 class="box-title text-ffffff">0.0.0.0</h3>
              <div class="text-ffffff text-size12">主机：linux / 数据库：mysql <br>占用内存：9,289.34MB</div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="is-progress">
                <span class="label">CPU</span>
                <div class="progress ">
                  <div class="progress-bar progress-bar-red" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
                    <span class="sr-only">80% </span>
                  </div>
                </div>
              </div>
              <div class="is-progress">
                <span class="label">MEM</span>
                <div class="progress">
                  <div class="progress-bar progress-bar-green " role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                    <span class="sr-only">40% </span>
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
export default {
  name: 'db',
  data (){
    return {
      orderField: 'cpu',
      orderBy: 'desc',
      filterIp: '',
      orderFields :[
        {key: 'pct', value: '内存占用'},
        {key: 'cpu', value: 'CPU使用率'},
        {key: 'memory', value: '内存使用率'}
      ],
      orderBys : [
        {key: 'desc', value: '倒序'},
        {key: 'asc', value: '升序'}
      ]
    }
  },
  mounted (){
    $('.is-search').find('.select2').select2();
  }
}
</script>
