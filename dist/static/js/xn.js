(function() {
    var pageCtrl = {
        dom: function() {
            var _this = this;
        },
        bind: function() {
            var _this = this;

            //cpu图表
            $('#cpu-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日CPU使用率趋势',
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
                    categories: ['0', '4', '8', '12', '16', '20', '24'],
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
                            return '<div style="color:#fff">' + this.value + '</div>'
                        }
                    },
                    gridLineColor: '#333', //网格线样式
                    tickAmount: 7 //显示刻度数
                },
                tooltip: {
                    split: true,
                    valueSuffix: ' 百万'
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
                    name: 'cpu',
                    data: [2000, 3000, 4000, 3500, 2000, 2800, 5268],
                    color: '#53ddbf'
                }, {
                    name: 'kernil',
                    data: [1000, 2000, 1400, 2400, 3000, 4900, 3000],
                    color: '#56c0e8'
                }]
            });

            //内存图表
            $('#memory-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日内存使用率趋势',
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
                    categories: ['0', '4', '8', '12', '16', '20', '24'],
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
                            return '<div style="color:#fff">' + this.value + '</div>'
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
                    name: 'memory',
                    data: [3000, 3000, 3000, 4000, 5000, 6000, 7000],
                    color: '#f7e011'
                }, {
                    name: 'swap',
                    data: [500, 1500, 2000, 3000, 3890, 3000, 2800],
                    color: '#56c0e8'
                }]
            });

            //如果屏幕resize 重新适应宽度
            $('body').on('click',function(){
                console.log('body');
                setTimeout(function(){
                    $('#cpu-charts').highcharts().reflow();
                    $('#memory-charts').highcharts().reflow();
                },500)
            });
            
        },
        init: function() {
            var _this = this;
            _this.dom();
            _this.bind();
        }
    };
    pageCtrl.init();
})();