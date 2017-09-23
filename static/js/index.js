// import html from './network_topo.html';

// import go from 'GoJs';

// import imgCloud from '../../../../assets/image/financ/cloud.svg';
// import imgDdos from '../../../../assets/image/financ/ddos.svg';
// import imgFirewall from '../../../../assets/image/financ/firewall.svg';
// import imgLoadBalance from '../../../../assets/image/financ/load_balance.svg';
// import imgServer from '../../../../assets/image/financ/server.svg';
// import imgSwitch from '../../../../assets/image/financ/switch.svg';
// import imgSwitchThree from '../../../../assets/image/financ/switch_three.svg';
// import imgSwitchVlan from '../../../../assets/image/financ/switch_vlan.svg';
// import imgTriangle from '../../../../assets/image/financ/triangle.svg';
// import imgHighdataA from '../../../../assets/image/financ/highdata_a.svg';
// import imgHighdataB from '../../../../assets/image/financ/highdata_b.svg';

var html = `<div>
    <div id="myDiagramDiv" style="height: 100%;"></div>

    <!--<div id="infoBoxHolder" class="btn btn-primary" data-toggle="modal" data-target="#network-tsingletail"></div>-->

    <div id="network-topo-single" class="modal fade" tabindex="-1" style="display: none;">
        <network-topo-detail node="selectNode"></network-topo-detail>
    </div>
</div>`;
// var imgCloud = './dist/css/svg/fhq.svg',
//     imgDdos = '',
//     imgFirewall = '#icon-yingpa',
//     imgLoadBalance = '',
//     imgServer = '',
//     imgSwitch = '',
//     imgSwitchThree = '',
//     imgSwitchVlan = '',
//     imgTriangle = '',
//     imgHighdataA = '',
//     imgHighdataB = '';

var imgCloud = './dist/css/svg/cloud.svg',
imgDdos = './dist/css/svg/ddos.svg',
imgFirewall = './dist/css/svg/firewall.svg',
imgLoadBalance = './dist/css/svg/load_balance.svg',
imgServer = './dist/css/svg/server.svg',
imgSwitch = './dist/css/svg/switch.svg',
imgSwitchThree = './dist/css/svg/switch_three.svg',
imgSwitchVlan = './dist/css/svg/switch_vlan.svg',
imgTriangle = './dist/css/svg/triangle.svg',
imgHighdataA = './dist/css/svg/highdata_a.svg',
imgHighdataB = './dist/css/svg/highdata_b.svg';

var indexCtrl = {
    restrict: 'AE',
    scope: {},
    template: html,
    link: function(scope, element, attr) {

        scope.images = {
            'cloud': imgCloud,
            'ddos': imgDdos,
            'firewall': imgFirewall,
            'loadBalance': imgLoadBalance,
            'server': imgServer,
            'switch': imgSwitch,
            'switchThree': imgSwitchThree,
            'switchVlan': imgSwitchVlan,
            'triangle': imgTriangle,
            'highdataA': imgHighdataA,
            'highdataB': imgHighdataB
        };

        scope.selectNode = {};


        let network = go.GraphObject.make;

        scope.doMouseOver = function(e) {

            // document.getElementById('infoBoxHolder').innerHTML = '';
        };

        scope.myDiagram = network(go.Diagram, 'myDiagramDiv', {
            initialContentAlignment: go.Spot.Center,
            'undoManager.isEnabled': true,
            'toolManager.hoverDelay': 100,
            allowMove: true,
            allowDelete: false,
            allowCopy: false,
            allowVerticalScroll: false,
            allowHorizontalScroll: true,
            scale: 1,
            mouseOver: scope.doMouseOver,
            click: scope.doMouseOver
        });

        scope.nodeTypeImage = function(type) {
            if (scope.images[type]) {
                return scope.images[type];
            } else {
                return scope.images.server;
            }

        };

        scope.nodeIconWidth = function(width) {
            return width ? width : 40;
        };

        scope.nodeIconHeight = function(height) {
            return height ? height : 40;
        };

        scope.showDetail = function(nodeObj) {
            scope.selectNode = {};
            let node = nodeObj.part.data;

            // if (_.isUndefined(node.ip)) {
            //     return;
            // }

            ContentService.topoSingle(node)
                .then((res) => {
                    scope.selectNode = _.defaults(res.data, node);
                    $('#network-topo-single').modal();
                })
                .catch((err) => {
                    toastr.error('获取设备数据失败!');
                });
        };

        //默认节点模板
        scope.myDiagram.nodeTemplate =
            network(go.Node, 'Auto', {
                    locationSpot: go.Spot.Center,
                    toolTip: network(go.HTMLInfo, { show: scope.showDetail })
                },
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                network(go.Panel, 'Table', { padding: 0.5, background: 'rgba(0,0,0,0)'	 },
                    network(go.Picture, { row: 0, margin: -1, width: 40, height: 40 },
                        new go.Binding('source', 'source', scope.nodeTypeImage),
                        new go.Binding('width', 'width', scope.nodeIconWidth),
                        new go.Binding('height', 'height', scope.nodeIconHeight)
                    ),
                    network(go.Shape, 'Circle', { row: 0, desiredSize: new go.Size(6, 6), fill: '#FFD700', alignment: new go.Spot(0, 0, 2, 2), opacity: 0.0 },
                        new go.Binding('opacity', 'noData', function(noData) { return _.isBoolean(noData) && noData ? 1.0 : 0.0; })
                    ),
                    network(go.Shape, 'BpmnEventError', { row: 0, desiredSize: new go.Size(8, 8), fill: '#FF0000', alignment: new go.Spot(1, 0, 2, 2), opacity: 0.0 },
                        new go.Binding('opacity', 'noWarn', function(noWarn) { return _.isBoolean(noWarn) && !noWarn ? 1.0 : 0.0; })),

                    network(go.TextBlock, new go.Binding('text', 'name', function(name, node) {
                        if (node.part.data.showIp) { 
                        	return node.part.data.ip; } else { return name; }
                    }), { name: 'text', row: 1, margin: -1, stroke: "white", textAlign: 'center', font: '8pt sans-serif' })
                )
            );

        scope.myDiagram.nodeTemplateMap.add('BAR',
            network(go.Node,
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), {
                    layerName: 'Background',
                    resizable: true,
                    resizeObjectName: 'SHAPE',
                    resizeAdornmentTemplate: network(go.Adornment, 'Spot',
                        network(go.Placeholder),
                        network(go.Shape, // left resize handle
                            {
                                alignment: go.Spot.Left,
                                cursor: 'col-resize',
                                desiredSize: new go.Size(6, 6),
                                fill: 'lightblue',
                                fill: 'white',
                                stroke: 'dodgerblue',
                                stroke: 'white'
                            }),
                        network(go.Shape, // right resize handle
                            {
                                alignment: go.Spot.Right,
                                cursor: 'col-resize',
                                desiredSize: new go.Size(6, 6),
                                fill: 'lightblue',
                                fill: 'white',
                                stroke: 'dodgerblue',
                                stroke: 'white'
                            }))
                },
                network(go.Shape, 'Rectangle', {
                        name: 'SHAPE',
                        fill: 'black',
                        fill: 'white',
                        stroke: null,
                        strokeWidth: 0,
                        width: 1000,
                        height: 4,
                        minSize: new go.Size(100, 4),
                        maxSize: new go.Size(Infinity, 4)
                    },
                    new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
                    new go.Binding('fill', 'color'), { portId: '', toLinkable: true })
            ));

        //默认连线模板
        scope.myDiagram.linkTemplate =
            network(go.Link, { toShortLength: -30, fromShortLength: -30, layerName: 'Background' }, new go.Binding('toShortLength', 'toLength'), new go.Binding('fromShortLength', 'fromLength'),
                new go.Binding('points').makeTwoWay(),
                network(go.Shape, { isPanelMain: true, stroke: 'white', strokeWidth: 1 },
                    new go.Binding('stroke', 'color')),
                network(go.Shape, { isPanelMain: true, stroke: 'white', strokeWidth: 1, name: 'PIPE', strokeDashArray: [10, 20] })
            );

        //负载均衡
        scope.myDiagram.linkTemplateMap.add('LB',
            network(go.Link, { toShortLength: -5, fromShortLength: -5 }, new go.Binding('toShortLength', 'toLength'), new go.Binding('fromShortLength', 'fromLength'),
                network(go.Shape, { isPanelMain: true, stroke: '#41BFEC',stroke: 'white', strokeWidth: 1, name: 'LB', strokeDashArray: [5, 0] }),
                network(go.TextBlock, {
                        stroke: 'black',
                        stroke: 'white',
                        segmentIndex: 2,
                        font: '8pt sans-serif',
                        segmentFraction: 0.5,
                        segmentOrientation: go.Link.OrientUpright,
                        alignmentFocus: go.Spot.Bottom
                    },
                    new go.Binding('text', 'text')
                )
            )
        );
        //HA
        scope.myDiagram.linkTemplateMap.add('HA',
            network(go.Link, { toShortLength: -10, fromShortLength: -10 },
                network(go.Shape, { isPanelMain: true, stroke: '#41BFEC', stroke: 'white', strokeWidth: 1, name: 'HA', strokeDashArray: [5, 6] }),
                network(go.TextBlock, {
                        stroke: 'black',
                        stroke: 'white',
                        segmentIndex: 2,
                        font: '8pt sans-serif',
                        segmentFraction: 0.5,
                        segmentOrientation: go.Link.OrientUpright,
                        alignmentFocus: go.Spot.Bottom
                    },
                    new go.Binding('text', 'text')
                )
            )
        );

        //*************************************************

        function BarLink() {
            go.Link.call(this);
        }

        go.Diagram.inherit(BarLink, go.Link);

        /** @override */
        BarLink.prototype.getLinkPoint = function(node, port, spot, from, ortho, othernode, otherport) {

            if (node.category == 'BAR') {
                let op = go.Link.prototype.getLinkPoint.call(this, othernode, otherport, this.computeSpot(!from), !from, ortho, node, port);
                let r = new go.Rect(port.getDocumentPoint(go.Spot.TopLeft), port.getDocumentPoint(go.Spot.BottomRight));
                let y = (op.y > r.centerY) ? r.bottom : r.top;
                let centerPoint = (r.left + r.right) / 2;
                let nodePoint = othernode.findObject('text').getDocumentPoint(go.Spot.Center).x;

                if (op.x < centerPoint && op.x > r.left) {
                    return new go.Point(nodePoint, y);
                } else if (op.x > centerPoint && op.x < r.right) {
                    return new go.Point(nodePoint, y);
                } else if (op.x < r.left) {
                    return new go.Point(r.left, y);
                } else if (op.x > r.right) { return new go.Point(r.right, y); }

                return new go.Point(op.x, y);
            } else {
                let x = node.findObject('text').getDocumentPoint(go.Spot.Center).x;
                let y = node.findObject('text').getDocumentPoint(go.Spot.Center).y;
                return new go.Point(x, y);
                // return go.Link.prototype.getLinkPoint.call(this, node, port, spot, from, ortho, othernode, otherport);
            }
        };

        /** @override */
        BarLink.prototype.getLinkDirection = function(node, port, linkpoint, spot, from, ortho, othernode, otherport) {
            let p = port.getDocumentPoint(go.Spot.Center);
            let op = otherport.getDocumentPoint(go.Spot.Center);
            let below = op.y > p.y;
            return below ? 90 : 270;
        };


        scope.myDiagram.linkTemplateMap.add('BARLINK',
            network(BarLink, {
                    routing: go.Link.Orthogonal,
                    relinkableFrom: true,
                    relinkableTo: true,
                    toPortChanged: function(link, oldport, newport) {
                        if (newport instanceof go.Shape) { link.path.stroke = newport.fill; }
                    }
                },
                network(go.Shape, {strokeWidth: 1 })
            )
        );

        //*************************************************

        //默认组别模板
        scope.myDiagram.groupTemplate =
            network(go.Group, 'Vertical', { selectionObjectName: 'PANEL', ungroupable: true },
                network(go.TextBlock, { font: 'bold 11px sans-serif', stroke: 'white', isMultiline: true, textAlign: 'center' },
                    new go.Binding('text', 'name').makeTwoWay(),
                    new go.Binding('stroke', 'color')),
                network(go.Panel, 'Auto', { name: 'PANEL' },
                    network(go.Shape, 'Rectangle', { fill: 'rgba(128,128,128,0.2)', stroke: '#96D6D9', strokeWidth: 1, cursor: 'pointer' },
                        new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)
                    ),
                    network(go.Placeholder, { margin: 10, background: 'transparent' })
                )
            );


        let model = network(go.GraphLinksModel);
        model.nodeDataArray = [
            { key: 1, name: 'Internet/vpn', loc: '0 -20', source: 'cloud', height: 40, width: 50 },
            { key: 2, name: '互联网接入区', isGroup: true, color: '#31fce1' },
            { key: 3, name: '核心交换区', isGroup: true, color: '#31fce1' },
            // { key: 4, name: '防火墙', isGroup: true, color: '#31fce1'},
            { key: 5, name: '安全管理区', isGroup: true, color: '#31fce1' },
            { key: 6, name: 'DMZ', isGroup: true, color: '#31fce1' },
            // { key: 7, name: '二级交换区', isGroup: true, color: '#31fce1'},
            { key: 8, name: '二级业务区', isGroup: true, color: '#31fce1' },
            { key: 9, name: 'BAR', color: '#fff', category: 'BAR', loc: '-400 900', size: '1200 4' },

            { key: 201, type: 'network', ip: '172.16.0.101', name: '上联交换机', loc: '0 80', group: 2, source: 'switch' },
            { key: 202, type: 'network', ip: '172.16.0.11', name: '负载均衡-A', loc: '-100 160', group: 2, source: 'switchVlan' },
            { key: 203, type: 'network', ip: '172.16.0.12', name: '负载均衡-B', loc: '100 160', group: 2, source: 'switchVlan' },
            { key: 204, type: 'network', ip: '172.16.0.102', name: '下联交换机', loc: '0 240', group: 2, source: 'switch' },
            { key: 205, type: 'network', ip: '172.16.0.103', name: '抗DDOS设备', loc: '0 320', group: 2, source: 'ddos' },
            { key: 206, type: 'network', ip: '172.17.0.11', name: '防火墙-A', loc: '-100 400', group: 2, source: 'firewall' },
            { key: 207, type: 'network', ip: '172.17.0.12', name: '防火墙-B', loc: '100 400', group: 2, source: 'firewall' },
            { key: 208, type: 'network', ip: '172.17.0.31', name: 'IPS/WAF/上网行为管理', loc: '0 550', group: 2, source: 'triangle' },

            { key: 301, type: 'network', ip: '10.1.1.1', name: '交换机-A', loc: '-100 700', group: 3, source: 'switchThree', height: 50, width: 50 },
            { key: 302, type: 'network', ip: '10.1.1.2', name: '交换机-B', loc: '100 700', group: 3, source: 'switchThree', height: 50, width: 50 },

            { key: 401, type: 'network', ip: '10.1.5.254', name: '安全区防火墙', loc: '-350 760', source: 'firewall', width: 40 },
            { key: 402, type: 'network', ip: '10.1.17.2', name: '防火墙-A', loc: '550 820', source: 'firewall', width: 40 },
            { key: 403, type: 'network', ip: '10.1.6.254', name: '防火墙-B', loc: '750 820', source: 'firewall', width: 40 },

            { key: 501, type: 'host', ip: '10.1.5.3', name: '安全配置\n核查系统', loc: '-420 360', group: 5, source: 'server' },
            { key: 502, type: 'host', ip: '10.1.5.2', name: '堡垒机', loc: '-420 480', group: 5, source: 'server' },
            { key: 503, type: 'host', ip: '10.1.5.1', name: 'UMC', loc: '-420 600', group: 5, source: 'server' },
            { key: 504, type: 'host', ip: '10.1.5.4', name: '综合信息安全\n监控平台-A', loc: '-300 360', group: 5, source: 'highdataA' },
            { key: 505, type: 'host', ip: '10.1.5.5', name: '综合信息安全\n监控平台-B', loc: '-300 480', group: 5, source: 'highdataA' },
            { key: 506, type: 'host', ip: '10.1.5.6', name: '综合信息安全\n监控平台-C', loc: '-300 600', group: 5, source: 'highdataB' },

            { key: 601, type: 'network', ip: '127.0.0.1', name: 'DMZ交换机', loc: '-300 210', group: 6, source: 'switch' },
            { key: 602, type: 'host', ip: '127.0.0.1', name: 'DNS服务器-A', loc: '-300 80', group: 6, source: 'server' },
            { key: 603, type: 'host', ip: '127.0.0.1', name: 'DNS服务器-B', loc: '-400 80', group: 6, source: 'server' },
            { key: 604, type: 'host', ip: '127.0.0.1', name: 'SSL-VPN', loc: '-400 210', group: 6, source: 'server' },

            { key: 701, type: 'network', ip: '10.1.6.249', name: '10.1.6.249', loc: '390 720', group: 8, source: 'switch' },
            { key: 702, type: 'network', ip: '10.1.6.250', name: '10.1.6.250', loc: '490 720', group: 8, source: 'switch' },
            { key: 703, type: 'network', ip: '10.1.6.247', name: '10.1.6.247', loc: '590 720', group: 8, source: 'switch' },
            { key: 704, type: 'network', name: 'H3CS5800-A', loc: '780 720', group: 8, source: 'switch' },
            { key: 705, type: 'network', name: 'H3CS5800-B', loc: '880 720', group: 8, source: 'switch' },

            { key: 801, type: 'host', ip: '10.1.58.10', loc: '240 80', showIp: true, name: 'NC-A', group: 8, source: 'server' },
            { key: 802, type: 'host', ip: '10.1.58.11', loc: '340 80', showIp: true, name: 'NC-B', group: 8, source: 'server' },
            { key: 803, type: 'host', ip: '10.1.58.12', loc: '440 80', showIp: true, name: 'NC-DB', group: 8, source: 'server' },
            { key: 804, type: 'host', ip: '10.1.58.14', loc: '540 80', showIp: true, name: '用友FTP-NC\n数据中转服务器', group: 8, source: 'server' },
            { key: 805, type: 'host', ip: '10.1.58.19', loc: '640 80', showIp: true, name: 'NC测试财务系统', group: 8, source: 'server' },
            { key: 806, type: 'host', ip: '10.1.58.21', loc: '740 80', showIp: true, name: '管理服务器', group: 8, source: 'server' },
            { key: 807, type: 'host', ip: '10.1.58.20', loc: '840 80', showIp: true, name: '财务历史数据\n查询终端', group: 8, source: 'server' },
            { key: 808, type: 'host', ip: '10.1.6.2', loc: '940 80', showIp: true, name: '信息中心\nDNS服务器', group: 8, source: 'server' },
            { key: 809, type: 'host', ip: '10.1.6.218', loc: '1040 80', showIp: true, name: '业务应用\n管理平台PM', group: 8, source: 'server' },

            { key: 811, type: 'host', ip: '10.1.6.117', loc: '240 160', showIp: true, name: 'PM', group: 8, source: 'server' },
            { key: 812, type: 'host', ip: '10.1.6.116', loc: '340 160', showIp: true, name: '信息中心IMC', group: 8, source: 'server' },
            { key: 813, type: 'host', ip: '10.1.6.111', loc: '440 160', showIp: true, name: '汇信志勤统一支持', group: 8, source: 'server' },
            { key: 814, type: 'host', ip: '10.1.6.118', loc: '540 160', showIp: true, name: '杀毒软件', group: 8, source: 'server' },
            { key: 815, type: 'host', ip: '10.1.6.139', loc: '640 160', showIp: true, name: '建筑应用平台PM', group: 8, source: 'server' },
            { key: 816, type: 'host', ip: '10.1.6.143', loc: '740 160', showIp: true, name: '隐患排查系统\n集群同96', group: 8, source: 'server' },
            { key: 817, type: 'host', ip: '10.1.6.15', loc: '840 160', showIp: true, name: 'HR人力资源\n数据库集成', group: 8, source: 'server' },
            { key: 818, type: 'host', ip: '10.1.6.152', loc: '940 160', showIp: true, name: '网站服务器', group: 8, source: 'server' },
            { key: 819, type: 'host', ip: '10.1.6.221', loc: '1040 160', showIp: true, name: '隐患平台抽样系统\n隐患租用服务器', group: 8, source: 'server' },

            { key: 821, type: 'host', ip: '10.1.6.154', loc: '240 240', showIp: true, name: '项目信息\n综合管理平台PM', group: 8, source: 'server' },
            { key: 822, type: 'host', ip: '10.1.6.164', loc: '340 240', showIp: true, name: '隐患排查系统\n应用服务器', group: 8, source: 'server' },
            { key: 823, type: 'host', ip: '10.1.6.169', loc: '440 240', showIp: true, name: '审计测试\n服务器', group: 8, source: 'server' },
            { key: 824, type: 'host', ip: '10.1.6.171', loc: '540 240', showIp: true, name: '电子商务\n数据库服务器2', group: 8, source: 'server' },
            { key: 825, type: 'host', ip: '10.1.6.172', loc: '640 240', showIp: true, name: '电子商务\n数据库服务器1', group: 8, source: 'server' },
            { key: 826, type: 'host', ip: '10.1.6.175', loc: '740 240', showIp: true, name: '铁建家园和生产\n计划共用服务器3', group: 8, source: 'server' },
            { key: 827, type: 'host', ip: '10.1.6.176', loc: '840 240', showIp: true, name: '铁建家园和生产\n计划共用服务器2', group: 8, source: 'server' },
            { key: 828, type: 'host', ip: '10.1.6.177', loc: '940 240', showIp: true, name: '铁建家园和生产\n计划共用服务器1', group: 8, source: 'server' },
            { key: 829, type: 'host', ip: '10.1.6.222', loc: '1040 240', showIp: true, name: '隐患平台抽样系统\n隐患租用服务器2', group: 8, source: 'server' },

            { key: 831, type: 'host', ip: '10.1.6.212', loc: '240 320', showIp: true, name: 'COM资本运营\n信息管理系统-测试', group: 8, source: 'server' },
            { key: 832, type: 'host', ip: '10.1.6.43', loc: '340 320', showIp: true, name: 'COM资本运营\n信息管理系统', group: 8, source: 'server' },
            { key: 833, type: 'host', ip: '10.1.6.80', loc: '440 320', showIp: true, name: 'COM资本运营\n信息管理系统-文档', group: 8, source: 'server' },
            { key: 834, type: 'host', ip: '10.1.6.234', loc: '540 320', showIp: true, name: 'MAIL邮箱系统', group: 8, source: 'server' },
            { key: 835, type: 'host', ip: '10.1.6.241', loc: '640 320', showIp: true, name: 'OA测试-A', group: 8, source: 'server' },
            { key: 836, type: 'host', ip: '10.1.6.243', loc: '740 320', showIp: true, name: 'OA测试-B', group: 8, source: 'server' },
            { key: 837, type: 'host', ip: '10.1.6.217', loc: '840 320', showIp: true, name: 'PM使用虚拟机', group: 8, source: 'server' },
            { key: 838, type: 'host', ip: '10.1.6.208', loc: '940 320', showIp: true, name: '标准文档服务器', group: 8, source: 'server' },

            { key: 841, type: 'host', ip: '10.1.6.248', loc: '240 400', showIp: true, name: '电子商务\n备份服务器', group: 8, source: 'server' },
            { key: 842, type: 'host', ip: '10.1.6.216', loc: '340 400', showIp: true, name: '电子商务\n服务器', group: 8, source: 'server' },
            { key: 843, type: 'host', ip: '10.1.6.245', loc: '440 400', showIp: true, name: '电子商务\n应用服务器1', group: 8, source: 'server' },
            { key: 844, type: 'host', ip: '10.1.6.244', loc: '540 400', showIp: true, name: '电子商务\n应用服务器2', group: 8, source: 'server' },
            { key: 845, type: 'host', ip: '10.1.6.240', loc: '640 400', showIp: true, name: '短信服务平台\n服务器', group: 8, source: 'server' },
            { key: 846, type: 'host', ip: '10.1.6.81', loc: '740 400', showIp: true, name: '汇信志勤测试', group: 8, source: 'server' },
            { key: 847, type: 'host', ip: '10.1.6.6', loc: '840 400', showIp: true, name: '浪潮管理系统', group: 8, source: 'server' },
            { key: 848, type: 'host', ip: '10.1.6.219', loc: '940 400', showIp: true, name: '企业决策平台PM', group: 8, source: 'server' },

            { key: 851, type: 'host', ip: '10.1.6.235', loc: '240 480', showIp: true, name: '软件资产管理系统', group: 8, source: 'server' },
            { key: 852, type: 'host', ip: '10.1.6.97', loc: '340 480', showIp: true, name: '设备管理系统', group: 8, source: 'server' },
            { key: 853, type: 'host', ip: '10.1.6.203', loc: '440 480', showIp: true, name: '审计-服务器1', group: 8, source: 'server' },
            { key: 854, type: 'host', ip: '10.1.6.204', loc: '540 480', showIp: true, name: '审计-服务器2', group: 8, source: 'server' },
            { key: 855, type: 'host', ip: '10.1.6.202', loc: '640 480', showIp: true, name: '审计-服务器3', group: 8, source: 'server' },
            { key: 856, type: 'host', ip: '10.1.6.58', loc: '740 480', showIp: true, name: '施工调度\n工管系统', group: 8, source: 'server' },
            { key: 857, type: 'host', ip: '10.1.6.237', loc: '840 480', showIp: true, name: '施工调度\n工管系统数据库', group: 8, source: 'server' },
            { key: 858, type: 'host', ip: '10.1.6.77', loc: '940 480', showIp: true, name: '协同管理系统', group: 8, source: 'server' },

            { key: 851, type: 'host', ip: '10.1.6.210', loc: '240 560', showIp: true, name: '外事系统三期\n数据库服务器', group: 8, source: 'server' },
            { key: 852, type: 'host', ip: '10.1.6.211', loc: '340 560', showIp: true, name: '外事系统三期\n应用服务器', group: 8, source: 'server' },
            { key: 853, type: 'host', ip: '10.1.6.206', loc: '440 560', showIp: true, name: '外事系统服务器', group: 8, source: 'server' },
            { key: 854, type: 'host', ip: '10.1.6.83', loc: '540 560', showIp: true, name: '外事系统\n服务器1', group: 8, source: 'server' },
            { key: 855, type: 'host', ip: '10.1.6.84', loc: '640 560', showIp: true, name: '外事系统\n服务器2', group: 8, source: 'server' },
            { key: 856, type: 'host', ip: '10.1.6.209', loc: '740 560', showIp: true, name: '信息化管理\n服务器', group: 8, source: 'server' },
            { key: 857, type: 'host', ip: '10.1.6.238', loc: '840 560', showIp: true, name: '信息化业务\n管理系统\n二期服务器1', group: 8, source: 'server' },
            { key: 858, type: 'host', ip: '10.1.6.242', loc: '940 560', showIp: true, name: '信息化业务\n管理系统\n二期服务器2', group: 8, source: 'server' },

            { key: 861, type: 'host', ip: '10.1.6.230', loc: '240 640', showIp: true, name: '新OA-A', group: 8, source: 'server' },
            { key: 862, type: 'host', ip: '10.1.6.232', loc: '340 640', showIp: true, name: '新OA-B', group: 8, source: 'server' },
            { key: 863, type: 'host', ip: '10.1.6.233', loc: '440 640', showIp: true, name: '新OA-C', group: 8, source: 'server' },
            { key: 864, type: 'host', ip: '10.1.6.231', loc: '540 640', showIp: true, name: '新OA-D', group: 8, source: 'server' },
            { key: 865, type: 'host', ip: '10.1.6.229', loc: '640 640', showIp: true, name: '新闻系统-服务器', group: 8, source: 'server' },
            { key: 866, type: 'host', ip: '10.1.6.223', loc: '740 640', showIp: true, name: '信息管理平台PM', group: 8, source: 'server' },
            { key: 867, type: 'host', ip: '10.1.6.96', loc: '840 640', showIp: true, name: '隐患排查系统\n集群同96-2', group: 8, source: 'server' },
            { key: 868, type: 'host', ip: '10.1.6.191', loc: '940 640', showIp: true, name: '隐患排查系统\n数据库服务器1', group: 8, source: 'server' }

        ];

        model.linkDataArray = [
            { from: 1, to: 201 },

            { from: 201, to: 202 },
            { from: 201, to: 203 },
            { from: 202, to: 204 },
            { from: 203, to: 204 },
            { from: 204, to: 205 },
            { from: 205, to: 206 },
            { from: 205, to: 207 },
            { from: 206, to: 208, toLength: -5, fromLength: -5 },
            { from: 207, to: 208, toLength: -5, fromLength: -5 },

            { from: 202, to: 203, category: 'HA', text: '主/备' },
            { from: 206, to: 207, category: 'HA', text: '主/备' },
            { from: 208, to: 301, toLength: -5, fromLength: -5 },
            { from: 208, to: 302, toLength: -5, fromLength: -5 },
            { from: 301, to: 302, category: 'LB', text: '负载' },

            { from: 301, to: 9, category: 'BARLINK' },
            { from: 302, to: 9, category: 'BARLINK' },
            { from: 401, to: 9, category: 'BARLINK' },
            { from: 402, to: 9, category: 'BARLINK' },
            { from: 403, to: 9, category: 'BARLINK' },

            { from: 402, to: 403, category: 'LB', text: '负载' },

            { from: 402, to: 702 },
            { from: 402, to: 704 },
            { from: 403, to: 703 },
            { from: 403, to: 705 },
            { from: 401, to: 5, toLength: 0, fromLength: 0 },

            { from: 206, to: 601 },
            { from: 207, to: 601 },

            { from: 601, to: 602 },
            { from: 601, to: 603 },
            { from: 601, to: 604 },

            { from: 701, to: 702, category: 'LB', toLength: -15, fromLength: -15 },

            { from: 402, to: 7 },
            { from: 403, to: 7 },

            { from: 7, to: 8 }

        ];



        scope.myDiagram.model = model;

        let opacity = 1;
        let down = true;
        scope.loop = function() {
            setTimeout(function() {
                let oldskips = scope.myDiagram.skipsUndoManager;
                scope.myDiagram.skipsUndoManager = true;
                scope.myDiagram.links.each(function(link) {
                    let shape = link.findObject('PIPE');
                    if (!shape) {
                        return;
                    }
                    let off = shape.strokeDashOffset - 3;

                    shape.strokeDashOffset = (off <= 0) ? 60 : off;
                    // animte (strobe) the opacity:
                    //if (down) opacity = opacity - 0.01;
                    //else opacity = opacity + 0.003;
                    if (opacity <= 0) {
                        down = !down;
                        opacity = 0;
                    }
                    if (opacity > 1) {
                        down = !down;
                        opacity = 1;
                    }
                    shape.opacity = opacity;
                });
                scope.myDiagram.skipsUndoManager = oldskips;
                scope.loop();
            }, 60);
        };


        scope.refurbishNode = function(item) {

            // let firstNode = scope.myDiagram.findNodesByExample({ip: '10.1.5.6'}).iterator.first().part.data;

            let findNode = scope.myDiagram.findNodeForKey(item.key);

            if (_.isObject(findNode)) {
                let nodeData = findNode.part.data;

                nodeData.noData = item.noData;
                nodeData.noWarn = item.noWarn;

                scope.myDiagram.model.setKeyForNodeData(nodeData, nodeData.key);

            }

        };


        scope.getTopo = function() {

            let list = _.filter(scope.myDiagram.model.nodeDataArray, function(item) {
                return !_.isUndefined(item.ip);
            });

            ContentService.topo(list)
                .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        scope.refurbishNode(res.data[i]);
                    }
                    scope.myDiagram.rebuildParts();
                })
                .catch((err) => {
                    toastr.error('获取拓扑数据失败!');
                });
        };

        // scope.getTopo();
        scope.loop();

        // scope.$on('$destroy', function() {
        //     scope.myDiagram.clear();
        // });

    }
};
var GO = {};
indexCtrl.link(GO)