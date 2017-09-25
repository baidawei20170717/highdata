<template>
<div class="modal-dialog in index-dialog" id="detail" style='display:none'>
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title">{{node.name}}</h4>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th>设备IP</th>
                            <th>数据接入状态</th>
                            <th>告警数量</th>
                            <th>CPU使用率</th>
                            <th>内存使用率</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><div>{{node.ip}}</div></td>
                            <td><div>{{node.noData ? '最近15分钟无数据' : '正常'}}</div></td>
                            <td><div>{{node.warn}}</div></td>
                            <td><div ng-if="node.cpu">{{node.cpu * 100 | number(2)}}%</div></td>
                            <td><div ng-if="node.memory">{{node.memory * 100 | number(2)}}%</div></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <br>
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="goDetail()">查看明细</button>
            <button type="button" class="btn btn-default" @click="close" data-dismiss="modal">关闭</button>
        </div>
    </div>
</div>
</template>
<script type="es6">
  export default {
    name: 'dialog',
    props:{
      node: {
        type: Object
      }
    },
    methods:{
      goDetail(){
        if(this.node.type == 'host') {
          this.$router.push({ name: 'db_single', params: {id: this.node.ip} })
        }else if(this.node.type == 'network') {
          this.$router.push({ name: 'net_single', params: {id: this.node.ip} })
        }
      },
      close(){
        $("#detail").hide()
      }
    },
    watch:{
      'node.name':function(val,oldVal){
        $('.index-dialog').show();
      }
    }
  }
</script>
<style>
.index-dialog{position:fixed;z-index: 1050;left:50%;top:50%;width:600px;height:300px;margin:-150px 0 0 -300px;}
.index-dialog .modal-content{position:relative;z-index: 1050;}
.index-dialog:after{content:'';position:fixed;z-index: 1040;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);}
</style>
