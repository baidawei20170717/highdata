(function() {
    var pageCtrl = {
        dom: function() {
            var _this = this;
        },
        bind: function() {
            var _this = this;


            //连接数图表
            $('#links-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    type: 'line',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日链接数趋势',
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
                    name: 'links',
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#50ddbd'
                }]
            });
            //http q请求图表
            $('#http-q-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '当日HTTPQ请求类型统计',
                    floating: true,
                    style: {
                        color: '#fff'
                    }

                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        borderColor: 'none',
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: '#ffffff' || 'black'
                            }
                        },
                        point: {
                            events: {
                                // mouseOver: function(e) { // 鼠标滑过时动态更新标题
                                //     // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                                //     chart.setTitle({
                                //         text: e.target.name + '\t' + e.target.y + ' %'
                                //     });
                                // }
                                //, 
                                // click: function(e) { // 同样的可以在点击事件里处理
                                //     chart.setTitle({
                                //         text: e.point.name+ '\t'+ e.point.y + ' %'
                                //     });
                                // }
                            }
                        },
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',
                    data: [
                        { name: 'cpu', color: '#fabd2a', y: 25, url: 'http://bbs.hcharts.cn' },
                        { name: 'kernel', color: '#76d4f2', y: 75 }
                    ]
                }]
            }, function(c) {
                // 环形图圆心
                var centerY = c.series[0].center[1],
                    titleHeight = parseInt(c.title.styles.fontSize);
                c.setTitle({
                    y: centerY + titleHeight / 2
                });
                chart = c;
            });
            //http 请求状态图表
            $('#http-qStatus-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '当日HTTP请求状态类型统计',
                    floating: true,
                    style: {
                        color: '#fff'
                    }

                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        borderColor: 'none',
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: '#ffffff' || 'black'
                            }
                        },
                        point: {
                            events: {
                                // mouseOver: function(e) { // 鼠标滑过时动态更新标题
                                //     // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                                //     chart.setTitle({
                                //         text: e.target.name + '\t' + e.target.y + ' %'
                                //     });
                                // }
                                //, 
                                // click: function(e) { // 同样的可以在点击事件里处理
                                //     chart.setTitle({
                                //         text: e.point.name+ '\t'+ e.point.y + ' %'
                                //     });
                                // }
                            }
                        },
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',

                    data: [
                        { name: '401', color: '#fabd2a', y: 5 },
                        { name: '404', color: '#76d4f2', y: 5 },
                        { name: '500', color: '#818de8', y: 5 },
                        { name: '304', color: '#52dabd', y: 5 },
                        { name: '200', color: '#e95658', y: 80 }
                    ]
                }]
            }, function(c) {
                // 环形图圆心
                var centerY = c.series[0].center[1],
                    titleHeight = parseInt(c.title.styles.fontSize);
                c.setTitle({
                    y: centerY + titleHeight / 2
                });
                chart = c;
            });
            //客户端ip图表
            $('#ip-charts').highcharts({
                chart: {
                    type: 'column',
                    backgroundColor: 'none',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日客户端IP TOP统计',
                    align: 'left',
                    x: 20,
                    y: 30,
                    margin: 40,
                    style: {
                        color: '#fff'
                    }
                },
                subtitle: {
                    text: ''
                },
                legend: {
                    enabled: false,
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
                    min: 0,
                    title: {
                        text: '',
                        style: {
                            color: '#fff'
                        }
                    },
                    labels: {
                        formatter: function() {
                            // return this.value;
                            return '<div style="color:#fff">' + this.value + 'k</div>'
                        }
                    },
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    },
                    series: {
                        pointWidth: 30,
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: '#fff'
                            }
                        }
                    }

                },
                series: [{
                    color: '#76d4f2',
                    name: 'IP',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
                }]
            });
            //当日流量图表
            $('#flow-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日流量趋势',
                    align: 'left',
                    style: {
                        color: '#fff'
                    },
                    x: 20,
                    y: 30,
                    margin: 40
                },
                legend: {
                    enabled: false,
                    itemStyle: {
                        color: '#fff'
                    }
                },
                xAxis: {
                    categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
                    },
                    series: {
                        pointWidth: 50,
                        dataLabels: {
                            enabled: true,
                            style: {
                                color: '#fff'
                            }
                        }
                    }
                },
                series: [{
                    name: '流量',
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#76d4f2'
                }]
            });
            //如果屏幕resize 重新适应宽度
            $('body').on('click', function() {
                setTimeout(function() {
                    $('#links-charts').highcharts().reflow();
                    $('#http-q-charts').highcharts().reflow();
                    $('#http-qStatus-charts').highcharts().reflow();
                    $('#ip-charts').highcharts().reflow();
                    $('#flow-charts').highcharts().reflow();
                }, 500)
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