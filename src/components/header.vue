<template>
<header class="main-header">
  <router-link to="/" class="logo">
    <span class="logo-mini"><b>监</b>控</span>
    <span class="logo-lg"><b>综合信息安全</b>监控平台</span>
  </router-link>
  <nav class="navbar navbar-static-top" role="navigation">
    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"> <span class="sr-only">Toggle navigation</span> </a>
    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">
        <li class="dropdown user user-menu">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <span class="">{{ this.$store.state.UserName }}</span>
          </a>
          <ul class="dropdown-menu">
            <li class="user-header">
              <p>
                {{ this.$store.state.UserName }} - {{ this.$store.state.UserRole }}
              </p>
            </li>
            <li class="user-footer">
              <div class="pull-right">
                <a href="javascript:;" onclick="logout" class="btn btn-default btn-flat">退出</a>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <div class="top-search-switch-btn">
          <input v-model='this.$store.state.isSearch' id="switch-size" type="checkbox" data-size="mini">
          </div>
        </li>
      </ul>
    </div>
  </nav>
</header>
</template>
<script type="es6">
  export default { name: 'header',
    methods:{
      logout(){
        this.$http.get('logout',{})
        .then(function (data) {
          this.$router.push({ path: '/login' })
        })
        .catch(function(error){
          alert("退出失败");
        })
      }
    },
    mounted (){
      let self = this
      $("#switch-size").bootstrapSwitch().on('switchChange.bootstrapSwitch', function(e, data) {
        self.$store.commit('ChangeSearch')
      })
    }
  }
</script>
