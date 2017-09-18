<template>
  
</template>
<script type="es6">
  import XChart from '@/components/chat'
  export default {
    name: 'tw',
    mounted (){
      commonCtrl.init();
    },
    data() {
    let week_option ={
                chart: {
                    type: 'column',
                    backgroundColor: 'none',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '本周威胁趋势',
                    y: 30,
                    margin: 40,
                    style: {
                        color: '#fff'
                    }
                },
                legend: {
                    itemStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {
                    categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    crosshair: true,
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    gridLineColor: '#333', //网格线样式
                    tickAmount: 7, //显示刻度数
                    labels: {
                        formatter: function() {
                            // return this.value;
                            return '<div style="color:#fff">' + this.value + 'k</div>'
                        }
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: '威胁ip',
                    color: '#76d4f2',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
                }, {
                    name: '协议异常',
                    color: '#51d8bc',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0]
                }, {
                    name: '心跳',
                    color: '#facc2a',
                    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0]
                }, {
                    name: '威胁dns',
                    color: '#ff6163',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4]
                }, {
                    name: '木马',
                    color: '#7d8ae3',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4]
                }]
            }
    let today_option={
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当天威胁趋势',
                    align: 'left',
                    style: {
                        color: '#fff'
                    },
                    x: 20,
                    y: 30,
                    margin: 40
                },
                legend: {
                    itemStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {
                    categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    },
                    labels: {
                        enabled: false //不显示横坐标
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function() {
                            // return this.value;
                            return '<div style="color:#fff">' + this.value + 'k</div>'
                        }
                    },
                    gridLineColor: '#333', //网格线样式
                    tickAmount: 7 //显示刻度数
                },
                tooltip: {
                    split: true,
                    valueSuffix: ''
                },
                plotOptions: {
                    area: {
                        stacking: 'normal',
                        lineColor: '#fff',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#fff'
                        }
                    }
                },
                series: [{
                    name: '发送流量',
                    data: [3, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 4, 2, 1, 4, 3, 5, 6, 4, 6, 8, 3],
                    color: '#53ddbf'
                }]
            }
    return {
      week_chart: 'tw_week',
      week_option,
      today_chart: 'tw_today',
      today_option
    }
    },
    components: {
      XChart
    }
  }
</script>
