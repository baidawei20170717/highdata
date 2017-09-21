import Vue from 'vue'

Vue.filter('number', function(value, num) {
  if (num != undefined) {
    return value.toFixed(num)
  } else {
    return value.toFixed(1)
  }
});

Vue.filter('dateFormat', function(time) {
  let date = new Date(time)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hh = date.getHours()
  var mm = date.getMinutes()
  var ss = date.getSeconds()
  var sss = date.getMilliseconds()
  return year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss
})
