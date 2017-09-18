<template>
<div class="content-wrapper">
  <section class="content-header">
    <h1>首页</h1>
    <ol class="breadcrumb">
      <li><router-link to="/"><i class="fa fa-dashboard"></i>首页</router-link></li>
      <li class="active">首页</li>
    </ol>
  </section>
  <section class="content">
    <div style="min-height:700px;">
    </div>
  </section>
</div>
</template>
<script type="es6">
  export default {
    name: 'home',
    beforeCreate (){
      document.body.setAttribute("class","hold-transition skin-blue sidebar-mini");
    }
  }
</script>
