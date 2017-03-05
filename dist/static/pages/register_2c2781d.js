;/*!src/pages/register/register.js*/
define("src/pages/register/register",function(require){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}var c=require("node_modules/vue/dist/vue"),h=a(c),b=require("src/utils/validatorMixin"),v=a(b),w=require("src/utils/validators"),$=require("src/utils/global"),g=a($);h["default"].use(g["default"]),new h["default"]({el:"#wrap",template:'<div class="g-in"><header class="p-index__hd"><img src="/src/pages/register/images/logo_1895c1c.png"><h1>专业的才艺教学服务平台</h1></header><ui-form class="p-index__bd" type="v"><ui-form-item label="手机号码：" :tips="getErrorText($v.mobile, msg.mobile) ||　checkMobileText" :state="$v.mobile.$error || !!checkMobileText"><input class="u-input-text w100" type="text" placeholder="可用于登录和找回密码" @blur="checkPhone(mobile)" @focus="changePhone" v-model="mobile"></ui-form-item><ui-form-item label="验证码：" :tips="getErrorText($v.code, msg.code)" :state="$v.code.$error"><input class="u-input-text w60" type="text" placeholder="请输入验证码" @blur="$v.code.$touch()" @focus="$v.code.$reset()" v-model="code"><ui-button type="primary" class="w40" @click.native="getCode" :disabled="isGetCode">{{isGetCode || times?\'倒计时\'+times+\'秒\':\'获取验证码\'}}</ui-button></ui-form-item><ui-form-item label="密码：" :tips="getErrorText($v.password, msg.password)" :state="$v.password.$error"><input class="u-input-text w100" type="password" placeholder="请设置登录密码" @blur="$v.password.$touch()" @focus="$v.password.$reset()" v-model="password"></ui-form-item><ui-form-item label="再次输入：" :tips="getErrorText($v.repeatPassword, msg.repeatPassword)" :state="$v.repeatPassword.$error"><input class="u-input-text w100" type="password" placeholder="请再次输入登录密码" @blur="$v.repeatPassword.$touch()" @focus="$v.repeatPassword.$reset()" v-model="repeatPassword"></ui-form-item><ui-form-item><ui-button type="primary" class="btn--block" @click.native="submit">确定</ui-button><div class="f-tar f-mt20"><a href="login.html" class="btn btn--link">登录</a></div></ui-form-item></ui-form></div>',mixins:[v["default"]],data:{isGetCode:!1,isSubmit:!1,timer:0,times:0,mobile:"",code:"",password:"",repeatPassword:"",msg:{mobile:[{type:"required",text:"手机号码不能为空"},{type:"isMobile",text:"手机号码错误"}],code:[{type:"required",text:"请输入验证码"},{type:"length",text:"验证码错误"}],password:[{type:"required",text:"密码不能为空"},{type:"password",text:"密码必须是字母、数字的组合，长度6-28位"}],repeatPassword:[{type:"required",text:"请再次输入密码"},{type:"sameAs",text:"两次密码不一致"}]},checkMobileText:""},validations:{mobile:{required:w.required,isMobile:w.isMobile},code:{required:w.required,length:w.length(4)},password:{required:w.required,password:w.password},repeatPassword:{required:w.required,sameAs:function(a){return this.password===a}},all:["mobile","code","password","repeatPassword"]},methods:{checkPhone:function(a){var c=this;this.$v.mobile.$touch(),this.$v.mobile.$error||this.checkMobileText||this.$http.get("/api/group/v3/auto/register/isexist",{params:{mobile:a}}).then(function(a){var h=a.data.flag;c.checkMobileText=1===h?"该手机号已经注册！":""},function(a){c.toast({content:a.statusText,type:"warn"})})},changePhone:function(){return this.checkMobileText="",this.$v.mobile.$error},getCode:function(){var a=this;this.isGetCode||this.times||(this.$v.mobile.$touch(),this.$v.mobile.$error||this.checkMobileText||(this.isGetCode=!0,this.$http.post("/api/group/v3/sms/getcode",{mobile:this.mobile,type:5,smsType:1},{hash:!0}).then(function(){a.times=100,a.countdown()},function(c){a.toast({content:c.statusText,type:"warn"})})))},countdown:function(){var a=this;this.timer=setTimeout(function(){a.countdown()},1e3),0===this.times?(this.isGetCode=!1,clearTimeout(this.timer)):this.times--},submit:function(){var a=this;this.$v.all.$touch(),this.$v.all.$error||this.isSubmit||(this.isSubmit=!0,this.$http.post("/api/group/v3/auto/register",{mobile:this.mobile,code:this.code,password:this.password}).then(function(){a.isSubmit=!1,location.href="index.html"},function(c){a.isSubmit=!1,a.toast({content:c.statusText,type:"warn"})}))}},created:function(){}})});