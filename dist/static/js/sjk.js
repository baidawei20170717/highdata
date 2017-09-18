(function() {
    var pageCtrl = {
        dom: function() {
            var _this = this;
        },
        bind: function() {
            var _this = this;

            //当日数据库命令图表
            $('#data-commond-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日数据库命令执行趋势',
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
                    categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23'],
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
                    name: '查询',
                    data: [-1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 4, 2, 1, 4, 3, 5, 6, 4, 6, 8, 3],
                    color: '#53ddbf'
                }, {
                    name: '修改',
                    data: [1, 5, 7, 3, 3, 3, 6, 8, 2, 4, 5, 2, 3, 1, 4, 2, 5, 6, 2, 4, 1, 2, 3, 1],
                    color: '#56c0e8'
                }, {
                    name: '新增',
                    data: [4, 5, 9, 8, 8, 8, 9, 0, 9, 4, 5, 9, 8, 4, 4, 9, 5, 9, 9, 4, 4, 9, 8, 4],
                    color: '#facc2a'
                }, {
                    name: '删除',
                    data: [1, 5, 7, 2.4, 2.4, 2.4, 6, 0, 2, 4, 5, 2, 2.4, 1, 4, 2, 5, 6, 2, 4, 1, 2, 2.4, 1],
                    color: '#ff6163'
                }]
            });
            //当日发送接收图表
            $('#send-accept-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日数据库命令执行趋势',
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
                    categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18','19','20','21','22','23'],
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
                    data: [-1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 4, 2, 1, 4, 3, 5, 6, 4, 6, 8, 3],
                    color: '#53ddbf'
                }, {
                    name: '接受流量',
                    data: [1, 5, 7, 3, 3, 3, 6, 8, 2, 4, 5, 2, 3, 1, 4, 2, 5, 6, 2, 4, 1, 2, 3, 1],
                    color: '#56c0e8'
                }]
            });

            //连接数图表
            $('#links-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
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
                    name: 'memory',
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#f7e011'
                }, {
                    name: 'swap',
                    data: [50, 15, 20, 30, 38, 30, 28],
                    color: '#56c0e8'
                }]
            });
            //连接数图表
            $('#open-table-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日打开表格趋势',
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
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#f7e011'
                }, {
                    name: 'swap',
                    data: [50, 15, 20, 30, 38, 30, 28],
                    color: '#56c0e8'
                }]
            });            //连接数图表
            $('#open-file-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日打开文件趋势',
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
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#f7e011'
                }, {
                    name: 'swap',
                    data: [50, 15, 20, 30, 38, 30, 28],
                    color: '#56c0e8'
                }]
            });            //连接数图表
            $('#lines-charts').highcharts({
                chart: {
                    backgroundColor: 'none',
                    type: 'areaspline',
                    marginLeft: 60,
                    marginRight: 20
                },
                title: {
                    text: '当日线控数趋势',
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
                    data: [30, 30, 30, 40, 50, 60, 70],
                    color: '#f7e011'
                }, {
                    name: 'swap',
                    data: [50, 15, 20, 30, 38, 30, 28],
                    color: '#56c0e8'
                }]
            });
            //如果屏幕resize 重新适应宽度
            $('body').on('click', function() {
                setTimeout(function() {
                    $('#data-commond-charts').highcharts().reflow();
                    $('#send-accept-charts').highcharts().reflow();
                    $('#links-charts').highcharts().reflow();
                    $('#lines-charts').highcharts().reflow();
                    $('#open-table-charts').highcharts().reflow();
                    $('#open-file-charts').highcharts().reflow();
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