define("src/pages/test/modal/main",function(require){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}var c=require("node_modules/vue/dist/vue"),v=a(c),h=require("../../components/modal/modal"),b=a(h);new v["default"]({el:"#app",components:{uiModal:b["default"]},data:{visible:!1,type:"alert",title:"title",content:"content"},methods:{alert:function(){this.type="alert",this.visible=!0},confirm:function(){this.type="confirm",this.visible=!0},onOk:function(){alert("提交成功！"),this.visible=!1},onCancel:function(){confirm("是否真的要取消")&&(this.visible=!1,this.visible=!1)}}})});