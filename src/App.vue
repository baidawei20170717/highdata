<template>
  <div id="app" class='wrapper'>
    <router-view name="header"></router-view>
    <router-view name="aside"></router-view>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'app'
  }
</script>
