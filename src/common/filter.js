import Vue from 'vue'

Vue.filter('number',function(value,num) {
  if(num != undefined){
    return value.toFixed(num)
  }else{
    return value.toFixed(1)
  }
});
