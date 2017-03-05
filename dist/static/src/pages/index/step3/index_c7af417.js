define("src/pages/index/step3/index",function(require,exports,module){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(exports,"__esModule",{value:!0});var c=require("src/utils/validatorMixin"),g=a(c),h=require("src/utils/validators");exports["default"]={mixins:[g["default"]],template:'<div class="m-box"><ui-form type="v"><ui-form-item label="入驻网店数：" :tips="getErrorText($v.chainCount, msg.chainCount)" :state="$v.chainCount.$error" :required="true"><input class="u-input-text w50" type="text" placeholder="入驻网店数" v-model="chainCount" @blur="$v.chainCount.$touch()" @focus="$v.chainCount.$reset()"></ui-form-item><ui-form-item label="公司名称：" :tips="getErrorText($v.organName, msg.organName)" :state="$v.organName.$error" :required="true"><input class="u-input-text w50" type="text" placeholder="公司名称" v-model="organName" @blur="$v.organName.$touch()" @focus="$v.organName.$reset()"></ui-form-item><ui-form-item label="法定代表人：" :tips="getErrorText($v.legalPerson, msg.legalPerson)" :state="$v.legalPerson.$error" :required="true"><input class="u-input-text w50" type="text" placeholder="法定代表人" v-model="legalPerson" @blur="$v.legalPerson.$touch()" @focus="$v.legalPerson.$reset()"></ui-form-item><ui-form-item label="法人联系电话：" :tips="getErrorText($v.legalPhone, msg.legalPhone)" :state="$v.legalPhone.$error" :required="true"><input class="u-input-text w50" type="text" placeholder="法人联系电话" v-model="legalPhone" @blur="$v.legalPhone.$touch()" @focus="$v.legalPhone.$reset()"></ui-form-item><ui-form-item label="法人身份证号码：" :tips="getErrorText($v.identityCard, msg.identityCard)" :state="$v.identityCard.$error" :required="true"><input class="u-input-text w50" type="text" placeholder="法人身份证号码" v-model="identityCard" @blur="$v.identityCard.$touch()" @focus="$v.identityCard.$reset()"></ui-form-item><ui-form-item label="上传认证资料：" :tips="getErrorText($v.pics, msg.pics)" :state="$v.pics.$error" :required="true"><div class="certificate" v-for="(item,index) of pics"><div class="certificate-uploaded" v-if="item.value" @click="showImgs(index)"><div>{{item.name}}</div></div><div class="certificate-upload" v-else @click="uploadImg(index)"><div>{{item.name}}</div></div></div></ui-form-item><ui-form-item><ui-button type="primary" @click.native="submit">提交</ui-button></ui-form-item></ui-form><div style="display:none"><ui-dialog title="上传图片" :visible="isShowImageCropper" @close="isShowImageCropper=false"><ui-image-cropper @on-error="uploadError" @on-success="uploadSuccess"></ui-image-cropper></ui-dialog></div><ui-dialog title="查看图片" :visible="isShowImage" @close="imgClose"><img :src="showImg" style="max-width:860px; max-height:600px; display:block; margin:0 auto" alt=""></ui-dialog></div>',props:{errorStep:{"default":!1},currentStep:{"default":2}},data:function(){return{chainCount:"",organName:"",legalPerson:"",legalPhone:"",identityCard:"",isShowImageCropper:!1,picIndex:"",isShowImage:!1,showImg:"",pics:[{key:"",name:"营业执照副本",value:"",img:""},{key:"",name:"法人身份证正面",value:"",img:""},{key:"",name:"法人身份证反面",value:"",img:""},{key:"",name:"负责人身份证正面",value:"",img:""},{key:"",name:"负责人身份证反面",value:"",img:""},{key:"",name:"负责人手持身份证",value:"",img:""}],msg:{chainCount:[{type:"required",text:"请填写网店数量"},{type:"isNNInt",text:"请填写数字"}],organName:[{type:"required",text:"请填写公司名称"}],legalPerson:[{type:"required",text:"请填写法定代表人"}],legalPhone:[{type:"required",text:"请填写法定代表人手机"},{type:"isMobile",text:"法定代表人手机填写错误"}],identityCard:[{type:"required",text:"请填写法定代表人身份证"},{type:"isIdCard",text:"法定代表人身份证填写错误"}],pics:[{type:"required",text:"上传图片"}]}}},validations:{chainCount:{required:h.required,isNNInt:h.isNNInt},organName:{required:h.required},legalPerson:{required:h.required},legalPhone:{required:h.required,isMobile:h.isMobile},identityCard:{required:h.required,isIdCard:h.isIdCard},pics:{required:h.required},all:["chainCount","organName","legalPerson","legalPhone","identityCard","pics"]},methods:{uploadSuccess:function(a,c){this.pics[this.picIndex].value=!0,this.pics[this.picIndex].key=c,this.pics[this.picIndex].img=a,this.picIndex="",this.isShowImageCropper=!1},uploadImg:function(a){this.picIndex=a,this.isShowImageCropper=!0},uploadError:function(a){this.toast({content:a,type:"warn"})},showImgs:function(a){this.isShowImage=!0,this.showImg=this.pics[a].img},imgClose:function(){this.isShowImage=!1,this.showImg=""},submit:function(){var a=this;this.$v.all.$touch(),this.$v.all.$error||this.isSubmit||(this.isSubmit=!0,this.$http.post("/api/group/v3/auto/organ/submit",{chainCount:this.chainCount,organName:this.organName,legalPerson:this.legalPerson,legalPhone:this.legalPhone,identityCard:this.identityCard,bizLicense:this.pics[0].key,legalCardFront:this.pics[1].key,legalCardRev:this.pics[2].key,contactCardFront:this.pics[3].key,contactCardRev:this.pics[4].key,contactCardHand:this.pics[5].key}).then(function(){a.isSubmit=!1,a.$emit("next")},function(c){a.toast({content:c.statusText,type:"warn"}),a.isSubmit=!1}))}}},module.exports=exports["default"]});