(function() {

    var commonCtrl = {
        dom: function() {
            var _this = this;
            _this.searchLayerSwitch = $("[name='search-layer-checkbox']");
            _this.isSearch = $('.is-search');
        },
        bind: function() {
            var _this = this;
            //头部搜索框 开关事件
            _this.topSearchSwitchInit();

            _this.isSearch.find('.select2').select2();

        },
        topSearchSwitchInit: function() {
            var _this = this;
            _this.searchLayerSwitch.bootstrapSwitch();
            _this.searchLayerSwitch.on('switchChange.bootstrapSwitch', function(e, data) {
                console.log(this); // DOM element
                console.log(event); // jQuery event
                console.log(data); // true | false
                if (data) {
                    alert('打开');
                } else {
                    alert('关闭');
                }
            });

        },
        init: function() {
            var _this = this;
            _this.dom();
            _this.bind();

        }
    }
    commonCtrl.init();

})();