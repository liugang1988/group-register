define("src/pages/index/step5/index",function(require,exports,module){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={template:'<div class="m-box p-step5"><h2>润•教育才艺教学服务平台服务协议签署页</h2><div class="f-clearfix"><div class="left"><p>甲方：深圳市指尖城市网络科技有限公司</p><p>地址：广东省深圳市南山区高新技术产业园北区清华信息港科研楼306-307</p><p>电话：0755-83592001</p></div><div class="right"><p>乙方：{{info.groupName}}</p><p>地址：<span v-text="info.address"></span></p><p>电话：{{info.telephone}}</p></div></div><h3>一、协议内容简述</h3><p>甲乙双方已仔细阅读、协商《润•教育才艺教学服务平台服务协议》（以下简称服务协议）及其所有附件的相关内容，对于各条款， 尤其是加粗条款，甲乙双方相互之间已进行充分的解释和沟通，双方同意遵守服务协议的相关约定：</p><p class="pl20">1、	甲方遵照服务协议之约定，履行己方的责任并向乙方提供相应服务；<br>2、	乙方遵照服务协议之约定，履行己方的责任并接受甲方在润•教育上的管理；<br>3、	乙方向甲方支付网店注册费及技术服务费，可直接通过线上支付，或是通过银行转账的方式支付，甲方的银行账号信息：<br>开户名称：<br>开户行：<br>账号：<br>4、	乙方需按服务协议中的约定按时足额以上费用，仅当甲方确认收到以上款项后才会为乙方开通润•教育账户及提供相应服务。</p><h3>二、法律效力</h3><p class="ti2">1、服务协议是已经公示于润•教育官网及润•教育APP上，乙方在成功入驻润•教育后也可在自己的【润•教育联盟运营管理平台】中查阅到服务协议及其相关服务件的全部内容。</p><p class="ti2">2、服务协议是自乙方在润•教育上勾选【我已阅读并认可本协议的全部内容】并点击确定后即时生效，此签署页仅作为双方就服务协议签字盖章存档的补充文件，双方有无在此签署页上签字盖章都不影响双方已签署服务协议的法律效力。</p><h3>三、其它约定</h3><p class="pl20">1、本签署页壹式贰份，甲、乙双方各执壹份用于存档；</p><p class="pl20">2、甲、乙双方在下述相应位置签字盖章：</p><div class="f-clearfix"><div class="left"><p>甲方（盖章）：深圳市指尖城市网络科技有限公司</p><p>法人或授权代表人（签字）：<br></p><p>日期：年月日</p></div><div class="right"><p>乙方（盖章）：</p><p>法人或授权代表人（签字）：</p><p>日期：年月日</p></div></div><div class="f-mt20"><ui-checkbox v-model="checked">我已阅读并认可本协议的全部内容</ui-checkbox></div><div class="f-tac"><ui-button type="primary" :disabled="checked && !checked.length" @click.native="submit">确认</ui-button><ui-button type="primary" @click.native="download">下载</ui-button></div></div>',data:function(){return{isSubmit:!1,checked:[],info:{}}},methods:{submit:function(){var a=this;return this.checked.length?void(this.isSubmit||(this.isSubmit=!0,this.$http.get("/api/group/v3/auto/contract/agree").then(function(){a.isSubmit=!1,a.$emit("next")},function(c){a.toast({content:c.statusText,type:"warn"}),a.isSubmit=!1}))):void this.alert({title:"提示",content:"您还没有同意合同内容!",callback:function(){this.visible=!1}})},download:function(){window.open("/api/group/v10/auto/contract/download")}},created:function(){var a=this;this.$http.get("/api/group/v3/auto/contract/data").then(function(c){a.info=c.data},function(c){a.toast({content:c.statusText,type:"warn"})})}},module.exports=exports["default"]});