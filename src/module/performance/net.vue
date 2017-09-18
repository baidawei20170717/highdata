<template>
  <div class="content-wrapper">
  <section class="content-header">
    <h1> 网络设备监控 <!-- <small>Optional description</small> --> </h1>
    <ol class="breadcrumb">
      <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
      <li><a href="#">性能监控</a></li>
      <li class="active">网络设备监控</li>
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
          <div action="#" method="get" class="sidebar-form">
            <div class="input-group">
              <input v-model="filterIp" type="text" name="q" class="form-control" placeholder="请输入筛选IP">
              <span class="input-group-btn"> <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i> </button> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xn-wlsb-list">
      <div class="row">
        <router-link to="/performance/net/1" class="col-lg-3 col-xs-12">
          <div class="box box-solid">
            <div class="box-header text-center">
              <h3 class="box-title text-76d4f2">0.0.0.0</h3>
              <!-- /.box-header -->
              <div class="box-body">
                <p>三合一（ips/waf/uag）</p>
                <p>dpx8000-a5</p>
                <p>最近15分钟采集状态 <span class="fa fa-check-circle text-success"></span></p>
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
  name: 'net',
  data (){
    return {
      orderField: 'islastData',
      orderBy: 'desc',
      filterIp: '',
      orderFields :[
        {key: 'islastData', value: '最近15分钟采集状态'}
      ],
      orderBys : [
        {key: 'desc', value: '倒序'},
        {key: 'asc', value: '升序'}
      ]
    }
  },
  mounted (){
    commonCtrl.init();
  }
}
</script>
