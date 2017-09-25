<template>
  <div class="x-bar">
    <p :id="id" :option="option" :css="css" :style="{ height:  css + 'px' }"></p>
  </div>
</template>
<script>
import HighCharts from 'highcharts'
export default {
  // 验证类型
  props: {
    id: {
      type: String
    },
    option: {
      type: Object
    },
    css: {
      css: String
    }
  },
  mounted() {
     HighCharts.setOptions({
                   global: {
                       useUTC: false
                   }
            });
    HighCharts.chart(this.id,this.option)
  },
  methods:{
    CreateNow(){
     HighCharts.setOptions({
                   global: {
                       useUTC: false
                   }
            });
      HighCharts.chart(this.id,this.option)
    }
  }
}
</script>
