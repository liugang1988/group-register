define("src/pages/test/form/main",function(require){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}var c=require("node_modules/vue/dist/vue"),v=a(c),h=require("node_modules/vuelidate/lib/validators/index"),b=require("src/components/button/index"),g=a(b),B=require("src/components/checkbox/index"),C=a(B),A=require("src/components/radio/index"),_=a(A),k=require("src/components/form/index"),y=a(k),F=require("src/components/form-item/index"),I=a(F),M=require("src/components/form-upload-img/index"),U=a(M),w=require("src/utils/validatorMixin"),O=a(w),R=function(a){return a.indexOf("ABC")>=0};new v["default"]({el:"#app",mixins:[O["default"]],components:{uiButton:g["default"],uiCheckbox:C["default"],uiRadio:_["default"],uiForm:y["default"],uiFormItem:I["default"],uiFormUploadImg:U["default"]},data:{checkbox:[],radio:"",email:{v:"",messages:[{type:"required",text:"必须写"},{type:"hasABC",text:"hasABC"},{type:"email",text:"email"}]},pics:[{imgUrl:""}]},validations:{email:{v:{required:h.required,email:h.email,hasABC:R}}},methods:{submit:function(){}}})});