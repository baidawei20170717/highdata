<template>
<aside class="main-sidebar">
  <section class="sidebar">
    <ul class="sidebar-menu">
      <li class="active"><router-link to="/"><i class="fa fa-home"></i><span>首页</span></router-link></li>
      <li class="treeview">
        <a href="#"><i class="fa fa-rocket"></i> <span>性能监控</span><span class="pull-right-container"><i class="fa fa-angle-right pull-right"></i></span></a>
        <ul class="treeview-menu">
          <li><router-link to="/performance/host">主机监控</router-link></li>
          <li><router-link to="/performance/db">数据库监控</router-link></li>
          <li><router-link to="/performance/ws">中间件监控</router-link></li>
          <li><router-link to="/performance/net">网络设备监控</router-link></li>
        </ul>
      </li>
      <li class="treeview">
        <a href="#"><i class="fa fa-shield"></i> <span>安全监控</span><span class="pull-right-container"><i class="fa fa-angle-right pull-right"></i></span></a>
        <ul class="treeview-menu">
          <li><router-link to="/security/ex">外网边界监控</router-link></li>
          <li><router-link to="/security/int">内网边界监控</router-link></li>
          <li><router-link to="/security/def">安全防御监控</router-link></li>
          <li><router-link to="/security/tw">安全威胁监控</router-link></li>
          <li><router-link to="/security/sys">系统安全监控</router-link></li>
          <li><router-link to="/security/user">用户访问监控</router-link></li>
        </ul>
      </li>
      <li class="treeview">
        <a href="#"><i class="fa fa-exclamation-triangle"></i> <span>告警监控</span><span class="pull-right-container"><i class="fa fa-angle-right pull-right"></i></span></a>
        <ul class="treeview-menu">
          <li><router-link to="/warn/monitor">性能告警</router-link></li>
          <li><router-link to="/warn/security">安全告警</router-link></li>
        </ul>
      </li>
      <li class=""><a href="#"><i class="fa fa-file-text"></i> <span>基本信息</span></a></li>
      <li class="treeview">
        <a href="#">
                    <i class="fa fa-pie-chart"></i> <span>资产管理</span>
                    <span class="pull-right-container"><i class="fa fa-angle-right pull-right"></i></span>
                    </a>
        <ul class="treeview-menu">
          <li><a href="#">资产管理2</a></li>
          <li><a href="#">资产管理2</a></li>
        </ul>
      </li>
      <li class=""><a href="#"><i class="fa fa-clipboard"></i> <span>日志查询</span></a></li>
      <li class="treeview">
        <a href="#">
                    <i class="fa fa-cog"></i> <span>运维管理</span>
                    <span class="pull-right-container"><i class="fa fa-angle-right pull-right"></i></span>
                    </a>
        <ul class="treeview-menu">
          <li><a href="#">运维管理2</a></li>
          <li><a href="#">运维管理2</a></li>
        </ul>
      </li>
      <li class="treeview">
        <a href="#">
                    <i class="fa fa-cube"></i> <span>系统管理</span>
                    <span class="pull-right-container"><i class="fa fa-angle-right pull-right"></i></span>
                    </a>
        <ul class="treeview-menu">
          <li><a href="#">系统管理2</a></li>
          <li><a href="#">系统管理2</a></li>
        </ul>
      </li>
    </ul>
  </section>
</aside>
</template>
<script type="es6">
export default {
  name: 'aside'
}
</script>
