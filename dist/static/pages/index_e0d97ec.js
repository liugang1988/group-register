;/*!src/pages/index/bar/index.js*/
define("src/pages/index/bar/index",function(require,exports,module){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={template:'<div class="m-box m-step"><div class="step-item" v-for="(item,index) of items" :class="{\r\n            \'z-active\':index+1<=step\r\n        }"><div class="f-tac">{{index+1}}.{{item}}</div><div class="flag"></div></div></div>',props:{step:{type:Number},items:{type:Array}}},module.exports=exports["default"]});
;/*!src/pages/index/data/Cache.js*/
define("src/pages/index/data/Cache",function(require,exports,module){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var h=function(h){var a=h.max,v=h.load,c=h.getKey;this.load=v,this.getKey=c||function(h){return h},this.max=a||10,this.len=0,this.newest=null,this.oldest=null,this.map={},this.temp={}};h.prototype.getValue=function(h){var a=this,v=this.getKey(h),c=this.map[v];if(c)return this.sort(c),Promise.resolve({key:v,value:c.value});var t=this.temp[v];if(t)return t;var y=this.load(h).then(function(h){return a.add(v,h),{key:v,value:h}});return this.temp[v]=y,y},h.prototype.sort=function(h){this.newest&&(this.newest.next=h),this.newest=h,h.prev=this.newest,h.next=null,this.oldest&&this.oldest===h&&(this.oldest=this.oldest.next)},h.prototype.add=function(h,a){delete this.temp[h];var v=this.newest,c=this.map[h]={next:null,prev:v,value:a};v&&(v.next=c),this.newest=c,this.oldest&&(this.oldest=c),this.len<this.max?this.len+=1:this.oldest=this.oldest&&this.oldest.next},exports["default"]=h,module.exports=exports["default"]});
;/*!src/pages/index/data/getGroupDetail.js*/
define("src/pages/index/data/getGroupDetail",function(require,exports,module){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(exports,"__esModule",{value:!0});var c=require("src/utils/http"),g=a(c),_=require("src/pages/index/data/Cache"),v=a(_),h=new v["default"]({load:function(a){return g["default"].get("api/group/v3/auto/select/group/detail",{params:{groupId:a}})}});exports["default"]=h,module.exports=exports["default"]});
;/*!src/pages/index/data/getSelectGroup.js*/
define("src/pages/index/data/getSelectGroup",function(require,exports,module){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(exports,"__esModule",{value:!0});var c=require("src/utils/http"),g=a(c),_=require("src/pages/index/data/Cache"),v=a(_),h=new v["default"]({load:function(a){return g["default"].get("api/group/v3/auto/select/group",{params:{groupName:a}})}});exports["default"]=h,module.exports=exports["default"]});
;/*!src/pages/index/header/index.js*/
define("src/pages/index/header/index",function(require,exports,module){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={template:'<div class="m-box p-header" :class="\'p-header--\'+step"><h2>{{items[step-1]}}</h2><div class="detail" v-if="step===1">请认真填写机构入驻信息，确保资料真实性及可靠性，确定并提交。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a></div><div class="detail" v-if="step===2">请认真填写机构入驻信息，确保资料真实性及可靠性，确定并提交。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a></div><div class="detail" v-if="step===3">润教育将在10个工作日内完成审核，如提交信息未通过审核，请及时修改并重新提交，逾期未提交审核状态将失效。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a></div><div class="detail" v-if="step===4">双方签订联盟入驻协议，确认同意后下载签署页签字盖章，工作人员1-3个工作日上门收取。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a></div><div class="detail" v-if="step===5">线上支付或转账所需服务费用，经财务确认即可完成缴纳。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a> <a class="btn--link" href="contract-detail.html" target="_blank">《润•教育才艺教学服务平台服务协议》</a></div><div class="detail" v-if="step===6">润教育为机构开通账号并提交网店相关资料。 <a class="btn--link" href="version.html" target="_blank">《版本划分对照表》</a> <a class="btn--link" href="contract-detail.html" target="_blank">《润•教育才艺教学服务平台服务协议》</a></div></div>',props:{step:{type:Number},items:{type:Array}}},module.exports=exports["default"]});
;/*!src/pages/index/step2/index.js*/
define("src/pages/index/step2/index",function(require,exports,module){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(exports,"__esModule",{value:!0});var c=require("src/utils/validatorMixin"),h=a(c),v=require("src/pages/index/data/getGroupDetail"),g=a(v),b=require("src/pages/index/data/getSelectGroup"),$=a(b),y=require("src/utils/validators");exports["default"]={mixins:[h["default"]],template:'<div class="m-box"><ui-form type="v" v-if="!groupId"><ui-form-item label="网店名称：" :tips="getErrorText($v.groupName, msg.groupName)" :state="$v.groupName.$error" :required="true"><div class="input-search w50"><ui-autocomplete v-model="groupName" placeholder="请填写网店名称" :fetchsuggestions="_search" @select="select" @blur="$v.groupName.$touch()" @focus="$v.groupName.$reset()"></ui-autocomplete></div></ui-form-item><ui-form-item label="简介：" :tips="getErrorText($v.intro, msg.intro)" :state="$v.intro.$error"><textarea class="u-textarea w80" placeholder="请填写网店简介" v-model.trim="intro" @blur="$v.intro.$touch()" @focus="$v.intro.$reset()"></textarea><div class="m-form-item__text"><span class="f-c-red">{{intro.length || 0}}/2000</span>字</div></ui-form-item><ui-form-item label="教学科目：" :required="true" :tips="getErrorText($v.subjects, msg.subjects)" :state="$v.subjects.$error"><ui-checkbox v-for="item of subjectsItems" v-model="subjects" :label="item.id" @change="$v.subjects.$touch()">{{item.name}}</ui-checkbox></ui-form-item><ui-form-item label="特色科目：" :tips="getErrorText($v.featureSubject, msg.featureSubject)" :state="$v.featureSubject.$error"><input class="u-input-text w50" type="text" placeholder="请填写特色科目" v-model.trim="featureSubject" @blur="$v.featureSubject.$touch()" @focus="$v.featureSubject.$reset()"><div class="m-form-item__text"><span class="f-c-red">{{featureSubject.length || 0}}/20</span>字</div></ui-form-item><ui-form-item label="教学地址：" :required="true" :tips="getErrorText($v.address, msg.address)" :state="$v.address.$error"><select class="u-select w15" v-model="provinceVal" @change="getCity(provinceVal)"><option value="">请选择省</option><option :value="item.name" v-for="item in province">{{item.name}}</option></select><select class="u-select w15" v-model="cityVal" @change="getDistrict(cityVal)"><option value="">请选择市</option><option :value="item.name" v-for="item in city">{{item.name}}</option></select><select class="u-select w15" v-model="districtVal" @change="getTrade(districtVal)"><option value="">请选择区</option><option :value="item.name" v-for="item in district">{{item.name}}</option></select><select class="u-select w15" v-model="tradeVal" @change="getRegion(tradeVal)"><option value="">请选择商圈</option><option :value="item.name" v-for="item in trade">{{item.name}}</option></select><input class="u-input-text w40" type="text" placeholder="请输入详细地址" v-model.trim="address" @blur="$v.address.$touch()" @focus="$v.address.$reset()"><div class="m-form-item__text"><span class="f-c-red">{{address.length || 0}}/40</span>字</div></ui-form-item><ui-form-item label="E-mail：" :tips="getErrorText($v.contactMail, msg.contactMail)" :state="$v.contactMail.$error"><input class="u-input-text w50" type="text" placeholder="请填写email" v-model="contactMail" @blur="$v.contactMail.$touch()" @focus="$v.contactMail.$reset()"></ui-form-item><ui-form-item label="联系电话：" :tips="getErrorText($v.telephone, msg.telephone)" :state="$v.telephone.$error"><input class="u-input-text w50" type="text" placeholder="座机请填写区号，如：0755-14852120" v-model="telephone" @blur="$v.telephone.$touch()" @focus="$v.telephone.$reset()"></ui-form-item><ui-form-item label="机构图片："><ui-form-upload-img :items="pics" @remove="removeImg" @upload="isShowImageCropper=true"></ui-form-upload-img></ui-form-item><ui-form-item label="负责人：" :required="true" :tips="getErrorText($v.contactName, msg.contactName)" :state="$v.contactName.$error"><input class="u-input-text w50" type="text" placeholder="请填写负责人" v-model="contactName" @blur="$v.contactName.$touch()" @focus="$v.contactName.$reset()"></ui-form-item><ui-form-item label="负责人电话：" :required="true" :tips="getErrorText($v.contactPhone, msg.contactPhone)" :state="$v.contactPhone.$error"><input class="u-input-text w50" type="text" placeholder="请填写负责人电话" v-model="contactPhone" @blur="$v.contactPhone.$touch()" @focus="$v.contactPhone.$reset()"></ui-form-item><ui-form-item><ui-button type="primary" @click.native="submit">提交</ui-button></ui-form-item></ui-form><ui-form type="v" v-else><ui-form-item label="网店名称：" :required="true">{{groupName}}<ui-button type="primary" @click.native="reSelect">换一个网店</ui-button></ui-form-item><template v-if="info"><ui-form-item label="简介：">{{info.intro}}</ui-form-item><ui-form-item label="教学科目：">{{info.subjects}}</ui-form-item><ui-form-item label="特色科目：">{{info.featureSubject}}</ui-form-item><ui-form-item label="教学地址：">{{info.address}}</ui-form-item><ui-form-item label="Email：">{{info.contactMail}}</ui-form-item><ui-form-item label="联系电话：">{{info.telephone}}</ui-form-item><ui-form-item label="机构图片："><div class="m-form-upload-img"><div class="img" v-for="(item,index) of info.pics"><img :src="item.uri"></div></div></ui-form-item><ui-form-item label="负责人：">{{info.contactName}}</ui-form-item><ui-form-item label="负责人电话：">{{info.contactPhone}}</ui-form-item></template><div v-else>正在加载信息...</div><ui-form-item><ui-button type="primary" @click.native="submit">提交</ui-button></ui-form-item></ui-form><div style="display:none"><ui-dialog title="上传图片" :visible="isShowImageCropper" @close="isShowImageCropper=false"><ui-image-cropper @on-error="uploadError" @on-success="uploadSuccess"></ui-image-cropper></ui-dialog></div></div>',data:function(){return{groupId:"",groupName:"",intro:"",subjects:[],featureSubject:"",address:"",regionId:"",contactMail:"",telephone:"",contactName:"",contactPhone:"",pics:[],subjectsItems:[],areaData:[],province:[],city:[],district:[],trade:[],provinceVal:"",cityVal:"",districtVal:"",tradeVal:"",provinceIndex:null,cityIndex:null,districtIndex:null,tradeIndex:null,fullAddress:"",info:{},isSubmit:!1,isShowImageCropper:!1,uploader:{},msg:{groupName:[{type:"required",text:"网店名称不能为空！"}],intro:[{type:"maxLength",text:"网店介绍不能超过2000字！"}],subjects:[{type:"required",text:"请选择教学科目！"}],featureSubject:[{type:"maxLength",text:"特色科目不能超过20字！"}],address:[{type:"required",text:"机构地址不能为空！"},{type:"maxLength",text:"机构地址不能超过40字！"}],regionId:[{type:"required",text:"区域编号不能为空！"}],contactMail:[{type:"email",text:"请填写正确的邮箱！"}],telephone:[{type:"isLandlines",text:"请填写正确的联系电话！"}],contactName:[{type:"required",text:"负责人不能为空！"},{type:"maxLength",text:"负责人不能超过15字！"}],contactPhone:[{type:"required",text:"负责人电话不能为空！"},{type:"isMobile",text:"请正确填写负责人电话！"}]}}},validations:{groupName:{required:y.required},intro:{maxLength:function(a){return!y.required(a)||y.maxLength(2e3)(a)}},subjects:{required:y.required},featureSubject:{maxLength:function(a){return!y.required(a)||y.maxLength(20)(a)}},address:{required:y.required,maxLength:y.maxLength(40)},regionId:{},contactMail:{isEmail:function(a){return!y.required(a)||y.isEmail(a)}},telephone:{isLandlines:function(a){return!y.required(a)||y.isLandlines(a)}},contactName:{required:y.required,maxLength:y.maxLength(15)},contactPhone:{required:y.required,isMobile:y.isMobile},all:["groupName","intro","subjects","featureSubject","address","regionId","contactMail","telephone","contactName","contactPhone"]},methods:{reSelect:function(){this.groupId="",this.groupName=""},select:function(a){var c=this,h=this.groupId=a.groupId;g["default"].getValue(h).then(function(d){d.key===h&&(c.info=d.value.data)})},_search:function(){var a=this;return $["default"].getValue(this.groupName).then(function(d){return d.key===a.groupName?d.value.data.map(function(a){return a.value=a.groupName,a}):null})},uploadSuccess:function(a,c){this.pics.push({key:c,url:a}),this.isShowImageCropper=!1},uploadError:function(a){this.toast({content:a,type:"warn"})},removeImg:function(a){this.pics.splice(a,1)},getSubject:function(){var a=this;this.$http.get("/api/cbs/v3/course/category/list").then(function(c){a.subjectsItems=c.data},function(c){a.toast({content:c.statusText,type:"warn"})})},getAreaData:function(){var a=this;this.$http.get("/api/cbs/v3/area/all").then(function(c){a.areaData=c.data,a.getProvince()},function(c){a.toast({content:c.statusText,type:"warn"})})},getProvince:function(){var a=this;this.areaData.map(function(c){return a.province.push({id:c.id,name:c.name}),a.province})},getCity:function(a){if(""!==a){if(this.provinceVal){for(var c=this.areaData,h=c.length,i=0;h>i;i++)c[i].name===a&&(this.provinceIndex=i);this.city=this.areaData[this.provinceIndex].areas}}else this.city=[],this.district=[],this.trade=[],this.cityVal="",this.districtVal="",this.tradeVal=""},getDistrict:function(a){if(""!==a){if(this.provinceVal&&this.cityVal){for(var c=this.areaData[this.provinceIndex].areas,h=c.length,i=0;h>i;i++)c[i].name===a&&(this.cityIndex=i);this.district=this.areaData[this.provinceIndex].areas[this.cityIndex].areas}}else this.district=[],this.trade=[],this.districtVal="",this.tradeVal=""},getTrade:function(a){if(this.provinceVal&&this.cityVal&&this.districtVal){this.trade=[],this.tradeVal="";for(var c=this.areaData[this.provinceIndex].areas[this.cityIndex].areas,h=c.length,i=0;h>i;i++)c[i].name===a&&(this.districtIndex=i);this.trade=this.areaData[this.provinceIndex].areas[this.cityIndex].areas[this.districtIndex].areas}},getRegion:function(a){if(this.provinceVal&&this.cityVal&&this.districtVal&&this.tradeVal){for(var c=this.areaData[this.provinceIndex].areas[this.cityIndex].areas[this.districtIndex].areas,h=c.length,i=0;h>i;i++)c[i].name===a&&(this.tradeIndex=i);this.regionId=this.areaData[this.provinceIndex].areas[this.cityIndex].areas[this.districtIndex].areas[this.tradeIndex].id}},commit:function(a){var c=this;this.$http.post("/api/group/v3/auto/group/submit",a).then(function(){c.$emit("next"),c.isSubmit=!1},function(a){c.isSubmit=!1,c.toast({content:a.statusText,type:"warn"})})},submit:function(){var a="";if(this.groupId)a={groupId:this.groupId};else{if(this.$v.all.$touch(),this.$v.all.$error)return;this.fullAddress=this.provinceVal+this.cityVal+this.districtVal+this.tradeVal+this.address,a={groupName:this.groupName,intro:this.intro,subjects:this.subjects.toString(),featureSubject:this.featureSubject,address:this.fullAddress,regionId:this.regionId,contactMail:this.contactMail,telephone:this.telephone,contactName:this.contactName,contactPhone:this.contactPhone,pics:this.pics.map(function(a){return a.key}).join(",")}}this.isSubmit||(this.isSubmit=!0,this.commit(a))}},created:function(){this.getSubject(),this.getAreaData()}},module.exports=exports["default"]});
;/*!src/pages/index/step3/index.js*/
define("src/pages/index/step3/index",function(require,exports,module){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(exports,"__esModule",{value:!0});var c=require("src/utils/validatorMixin"),g=a(c),h=require("src/utils/validators");exports["default"]={mixins:[g["default"]],template:'<div class="m-box"><ui-form type="v"><ui-form-item label="入驻网店数：" :tips="getErrorText($v.chainCount, msg.chainCount)" :state="$v.chainCount.$error" :required="true"><input class="u-input-text w50" type="text" placeholder="入驻网店数" v-model="chainCount" @blur="$v.chainCount.$touch()" @focus="$v.chainCount.$reset()"></ui-form-item><ui-form-item label="公司名称：" :tips="getErrorText($v.organName, msg.organName)" :state="$v.organName.$error" :required="true"><input class="u-input-text w50" type="text" placeholder="公司名称" v-model="organName" @blur="$v.organName.$touch()" @focus="$v.organName.$reset()"></ui-form-item><ui-form-item label="法定代表人：" :tips="getErrorText($v.legalPerson, msg.legalPerson)" :state="$v.legalPerson.$error" :required="true"><input class="u-input-text w50" type="text" placeholder="法定代表人" v-model="legalPerson" @blur="$v.legalPerson.$touch()" @focus="$v.legalPerson.$reset()"></ui-form-item><ui-form-item label="法人联系电话：" :tips="getErrorText($v.legalPhone, msg.legalPhone)" :state="$v.legalPhone.$error" :required="true"><input class="u-input-text w50" type="text" placeholder="法人联系电话" v-model="legalPhone" @blur="$v.legalPhone.$touch()" @focus="$v.legalPhone.$reset()"></ui-form-item><ui-form-item label="法人身份证号码：" :tips="getErrorText($v.identityCard, msg.identityCard)" :state="$v.identityCard.$error" :required="true"><input class="u-input-text w50" type="text" placeholder="法人身份证号码" v-model="identityCard" @blur="$v.identityCard.$touch()" @focus="$v.identityCard.$reset()"></ui-form-item><ui-form-item label="上传认证资料：" :tips="getErrorText($v.pics, msg.pics)" :state="$v.pics.$error" :required="true"><div class="certificate" v-for="(item,index) of pics"><div class="certificate-uploaded" v-if="item.value" @click="showImgs(index)"><div>{{item.name}}</div></div><div class="certificate-upload" v-else @click="uploadImg(index)"><div>{{item.name}}</div></div></div></ui-form-item><ui-form-item><ui-button type="primary" @click.native="submit">提交</ui-button></ui-form-item></ui-form><div style="display:none"><ui-dialog title="上传图片" :visible="isShowImageCropper" @close="isShowImageCropper=false"><ui-image-cropper @on-error="uploadError" @on-success="uploadSuccess"></ui-image-cropper></ui-dialog></div><ui-dialog title="查看图片" :visible="isShowImage" @close="imgClose"><img :src="showImg" style="max-width:860px; max-height:600px; display:block; margin:0 auto" alt=""></ui-dialog></div>',props:{errorStep:{"default":!1},currentStep:{"default":2}},data:function(){return{chainCount:"",organName:"",legalPerson:"",legalPhone:"",identityCard:"",isShowImageCropper:!1,picIndex:"",isShowImage:!1,showImg:"",pics:[{key:"",name:"营业执照副本",value:"",img:""},{key:"",name:"法人身份证正面",value:"",img:""},{key:"",name:"法人身份证反面",value:"",img:""},{key:"",name:"负责人身份证正面",value:"",img:""},{key:"",name:"负责人身份证反面",value:"",img:""},{key:"",name:"负责人手持身份证",value:"",img:""}],msg:{chainCount:[{type:"required",text:"请填写网店数量"},{type:"isNNInt",text:"请填写数字"}],organName:[{type:"required",text:"请填写公司名称"}],legalPerson:[{type:"required",text:"请填写法定代表人"}],legalPhone:[{type:"required",text:"请填写法定代表人手机"},{type:"isMobile",text:"法定代表人手机填写错误"}],identityCard:[{type:"required",text:"请填写法定代表人身份证"},{type:"isIdCard",text:"法定代表人身份证填写错误"}],pics:[{type:"required",text:"上传图片"}]}}},validations:{chainCount:{required:h.required,isNNInt:h.isNNInt},organName:{required:h.required},legalPerson:{required:h.required},legalPhone:{required:h.required,isMobile:h.isMobile},identityCard:{required:h.required,isIdCard:h.isIdCard},pics:{required:h.required},all:["chainCount","organName","legalPerson","legalPhone","identityCard","pics"]},methods:{uploadSuccess:function(a,c){this.pics[this.picIndex].value=!0,this.pics[this.picIndex].key=c,this.pics[this.picIndex].img=a,this.picIndex="",this.isShowImageCropper=!1},uploadImg:function(a){this.picIndex=a,this.isShowImageCropper=!0},uploadError:function(a){this.toast({content:a,type:"warn"})},showImgs:function(a){this.isShowImage=!0,this.showImg=this.pics[a].img},imgClose:function(){this.isShowImage=!1,this.showImg=""},submit:function(){var a=this;this.$v.all.$touch(),this.$v.all.$error||this.isSubmit||(this.isSubmit=!0,this.$http.post("/api/group/v3/auto/organ/submit",{chainCount:this.chainCount,organName:this.organName,legalPerson:this.legalPerson,legalPhone:this.legalPhone,identityCard:this.identityCard,bizLicense:this.pics[0].key,legalCardFront:this.pics[1].key,legalCardRev:this.pics[2].key,contactCardFront:this.pics[3].key,contactCardRev:this.pics[4].key,contactCardHand:this.pics[5].key}).then(function(){a.isSubmit=!1,a.$emit("next")},function(c){a.toast({content:c.statusText,type:"warn"}),a.isSubmit=!1}))}}},module.exports=exports["default"]});
;/*!src/pages/index/step4/index.js*/
define("src/pages/index/step4/index",function(require,exports,module){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={template:'<div class="m-box"><ui-form type="v" v-if="info"><ui-form-item label="上传认证资料："><div class="certificate"><div class="certificate-uploaded" v-if="info.bizLicense"><div>营业执照副本</div></div></div><div class="certificate"><div class="certificate-uploaded" v-if="info.legalCardFront"><div>法人身份证正面</div></div></div><div class="certificate"><div class="certificate-uploaded" v-if="info.legalCardRev"><div>法人身份证正面</div></div></div><div class="certificate"><div class="certificate-uploaded" v-if="info.contactCardHand"><div>法人身份证正面</div></div></div><div class="certificate"><div class="certificate-uploaded" v-if="info.contactCardFront"><div>法人身份证正面</div></div></div><div class="certificate"><div class="certificate-uploaded" v-if="info.contactCardRev"><div>法人身份证正面</div></div></div></ui-form-item><ui-form-item label="公司名称："><div style="padding: 10px 0">{{info.organName}}</div></ui-form-item><ui-form-item label="店铺名称："><div style="padding: 10px 0">{{info.groupName}}</div></ui-form-item><ui-form-item label="简介："><div style="padding: 10px 0">{{info.intro}}</div></ui-form-item><ui-form-item label="教学科目："><div style="padding: 10px 0">{{info.subjects}}</div></ui-form-item><ui-form-item label="特色科目："><div style="padding: 10px 0">{{info.featureSubject}}</div></ui-form-item><ui-form-item label="教学地址："><div style="padding: 10px 0">{{decodeURI(info.address)}}</div></ui-form-item><ui-form-item label="E-mail："><div style="padding: 10px 0">{{info.contactMail}}</div></ui-form-item><ui-form-item label="联系电话："><div style="padding: 10px 0">{{info.telephone}}</div></ui-form-item><ui-form-item label="法定代表人："><div style="padding: 10px 0">{{info.legalPerson}}</div></ui-form-item><ui-form-item label="法人联系电话："><div style="padding: 10px 0">{{info.legalPhone}}</div></ui-form-item><ui-form-item label="入驻网店数："><div style="padding: 10px 0">{{info.chainCount}}</div></ui-form-item></ui-form><div v-else>正在加载...</div></div>',data:function(){return{info:{}}},created:function(){var a=this;this.$http.get("/api/group/v3/auto/audit/info").then(function(v){a.info=v.data},function(v){a.toast({content:v.statusText,type:"warn"})})}},module.exports=exports["default"]});
;/*!src/pages/index/step5/index.js*/
define("src/pages/index/step5/index",function(require,exports,module){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={template:'<div class="m-box p-step5"><h2>润•教育才艺教学服务平台服务协议签署页</h2><div class="f-clearfix"><div class="left"><p>甲方：深圳市指尖城市网络科技有限公司</p><p>地址：广东省深圳市南山区高新技术产业园北区清华信息港科研楼306-307</p><p>电话：0755-83592001</p></div><div class="right"><p>乙方：{{info.groupName}}</p><p>地址：{{info.address}}</p><p>电话：{{info.telephone}}</p></div></div><h3>一、协议内容简述</h3><p>甲乙双方已仔细阅读、协商《润•教育才艺教学服务平台服务协议》（以下简称服务协议）及其所有附件的相关内容，对于各条款， 尤其是加粗条款，甲乙双方相互之间已进行充分的解释和沟通，双方同意遵守服务协议的相关约定：</p><p class="pl20">1、	甲方遵照服务协议之约定，履行己方的责任并向乙方提供相应服务；<br>2、	乙方遵照服务协议之约定，履行己方的责任并接受甲方在润•教育上的管理；<br>3、	乙方向甲方支付网店注册费及技术服务费，可直接通过线上支付，或是通过银行转账的方式支付，甲方的银行账号信息：<br>开户名称：<br>开户行：<br>账号：<br>4、	乙方需按服务协议中的约定按时足额以上费用，仅当甲方确认收到以上款项后才会为乙方开通润•教育账户及提供相应服务。</p><h3>二、法律效力</h3><p class="ti2">1、服务协议是已经公示于润•教育官网及润•教育APP上，乙方在成功入驻润•教育后也可在自己的【润•教育联盟运营管理平台】中查阅到服务协议及其相关服务件的全部内容。</p><p class="ti2">2、服务协议是自乙方在润•教育上勾选【我已阅读并认可本协议的全部内容】并点击确定后即时生效，此签署页仅作为双方就服务协议签字盖章存档的补充文件，双方有无在此签署页上签字盖章都不影响双方已签署服务协议的法律效力。</p><h3>三、其它约定</h3><p class="pl20">1、本签署页壹式贰份，甲、乙双方各执壹份用于存档；</p><p class="pl20">2、甲、乙双方在下述相应位置签字盖章：</p><div class="f-clearfix"><div class="left"><p>甲方（盖章）：深圳市指尖城市网络科技有限公司</p><p>法人或授权代表人（签字）：<br></p><p>日期：年月日</p></div><div class="right"><p>乙方（盖章）：</p><p>法人或授权代表人（签字）：</p><p>日期：年月日</p></div></div><div class="f-mt20"><ui-checkbox v-model="checked">我已阅读并认可本协议的全部内容</ui-checkbox></div><div class="f-tac"><ui-button type="primary" @click.native="submit">确认</ui-button><ui-button type="primary" @click.native="download">下载</ui-button></div></div>',data:function(){return{isSubmit:!1,checked:[],info:{}}},methods:{submit:function(){var a=this;return this.checked.length?void(this.isSubmit||(this.isSubmit=!0,this.$http.get("/api/group/v3/auto/contract/agree").then(function(){a.isSubmit=!1,a.$emit("next")},function(c){a.toast({content:c.statusText,type:"warn"}),a.isSubmit=!1}))):void this.alert({title:"提示",content:"您还没有同意合同内容!",callback:function(){this.visible=!1}})},download:function(){window.open("/api/group/v10/auto/contract/download")}},created:function(){var a=this;this.$http.get("/api/group/v3/auto/contract/data").then(function(c){a.info=c.data},function(c){a.toast({content:c.statusText,type:"warn"})})}},module.exports=exports["default"]});
;/*!src/pages/index/step6/index.js*/
define("src/pages/index/step6/index",function(require,exports,module){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={template:'<div class="m-box p-step6"><div class="pay-item"><div class="f-c-black">请选择支付方式</div><div class="f-mt20"><ui-radio v-model="type" :label="1"><span class="zfb"></span></ui-radio><ui-radio v-model="type" :label="2"><span class="wx"></span></ui-radio><ui-radio v-model="type" :label="0"><span class="transfer">对公转账</span></ui-radio></div></div><div class="pay-item"><div class="f-c-black">员工工号（可选）</div><div class="f-mt20"><input v-model="staffNo" class="u-input-text" style="width: 350px" type="text" placeholder="业务员工号，联系业务员填写"></div></div><div class="pay-item"><div class="f-c-black">发票信息</div><div class="f-mt20"><ui-radio v-model="needInvoice" :label="0"><span class="transfer">不开具发票</span></ui-radio><ui-radio v-model="needInvoice" :label="1"><span class="transfer">普通发票</span></ui-radio></div></div><div class="pay-item" v-show="needInvoice"><div class="f-c-black">发票抬头</div><div class="f-mt20"><input class="u-input-text" v-model="invoiceInfo" style="width: 350px" type="text"></div></div><div class="f-clearfix"><ui-form-upload-img class="f-fl f-mt20" v-show="!type" :items="pics" @remove="removeImg" @upload="isShowImageCropper=true"></ui-form-upload-img><div class="pay-infor" v-if="info"><template v-if="!type"><div class="f-mt10"><span class="f-c-gray">开户银行：</span> <span class="f-c-black">{{info.accountBank}}</span></div><div class="f-mt10"><span class="f-c-gray">开户名称：</span> <span class="f-c-black">{{info.accountName}}</span></div><div class="f-mt10"><span class="f-c-gray">银行卡号：</span> <span class="f-c-black">{{info.bankNO}}</span></div><div class="f-mt10"><span class="f-c-red">请在备注写机构的名称，并截图给我们</span></div><hr></template><div class="f-mt20"><span class="f-c-gray">{{info.chainCount}}家网店注册费：</span> <span>￥</span> <span class="f-big">{{info.registerPrice}}</span></div><div class="f-mt20"><span class="f-c-gray">{{info.chainCount}}家网店服务费：</span> <span class="f-c-gray">￥{{info.technoPrice}}</span></div><div class="f-mt10"><span class="f-c-black">应付总额：￥</span> <span class="price">{{info.totalPrice}}</span></div><ui-button type="primary" @click.native="submit">确定</ui-button></div></div><div style="display:none"><ui-dialog title="上传图片" :visible="isShowImageCropper" @close="isShowImageCropper=false"><ui-image-cropper @on-error="uploadError" @on-success="uploadSuccess"></ui-image-cropper></ui-dialog><ui-dialog title="上传图片" :visible="isShowPay" @close="isShowPay=false"><img :src="payQRcodeUri" v-if="payQRcodeUri"><ui-button type="primary" @click.native="paySuccess">支付成功</ui-button><ui-button type="gray" @click.native="payFail">支付失败</ui-button><ui-button type="link" @click.native="payChange">其它支付方式</ui-button></ui-dialog></div></div>',data:function(){return{isSubmit:!1,info:{},type:1,staffNo:"",invoiceInfo:"",imgkey:"",pics:[],needInvoice:0,isShowImageCropper:!1,isShowPay:!1,isSearch:!1,payQRcodeUri:""}},methods:{uploadSuccess:function(a,c){this.pics=[{key:c,url:a}],this.isShowImageCropper=!1},uploadError:function(a){this.toast({content:a,type:"warn"})},removeImg:function(){this.pics=[]},submit:function(){var a=this;if(!this.isSubmit){if(this.needInvoice&&!this.invoiceInfo)return void this.alert({title:"提示",content:"请填写发票抬头"});if(this.type)this.isSubmit=!0,this.$http.post("/api/group/v10/auto/order/create",{payType:this.type,staffNo:this.staffNo,invoiceInfo:this.invoiceInfo}).then(function(c){a.isSubmit=!1;var v=c.data;a.payQRcodeUri=v.payQRcodeUri||"",a.isShowPay=!0},function(c){a.isSubmit=!1,a.toast({content:c.statusText,type:"warn"})});else{if(!this.pics.length)return void this.alert({title:"提示",content:"请填上传截图"});this.isSubmit=!0,this.$http.post("/api/group/v10/auto/order/transfer/upload",{imgkey:this.pics[0].key,staffNo:this.staffNo,invoiceInfo:this.invoiceInfo}).then(function(){a.isSubmit=!1,a.$emit("next")},function(c){a.isSubmit=!1,a.toast({content:c.statusText,type:"warn"})})}}},paySuccess:function(){var a=this;this.isSearch=!1,this.$http.get("/api/group/v10/auto/order/pay/status").then(function(c){a.isSearch=!1;var v=c.data.status;1===v&&a.$emit("next"),a.isShowPay=!1},function(c){a.isSearch=!1,a.isShowPay=!1,a.toast({content:c.statusText,type:"warn"})})},payFail:function(){this.paySuccess()},payChange:function(){this.isShowPay=!1}},created:function(){var a=this;this.$http.get("/api/group/v10/auto/order/pay/info").then(function(c){a.info=c.data},function(c){a.toast({content:c.statusText,type:"warn"})})}},module.exports=exports["default"]});
;/*!src/pages/index/step7/index.js*/
define("src/pages/index/step7/index",function(require,exports,module){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]={template:'<div class="complete-con m-box"><h3 class="f-c-black">联盟九大服务</h3><div class="f-mt20">（一）为联盟机构提供联盟品牌授权服务：<br>（二）为联盟机构提供平台展示服务：<br>（三）为联盟机构提供IT支撑服务。<br>（四）为联盟机构提供引流服务：<br>（五）为联盟机构提供增值服务：<br>（六）为联盟机构提供促销服务：<br>（七）为联盟机构提供新产品开发服务：<br>（八）为联盟机构提供营销顾问服务：<br>（九）为联盟机构提供网络结算服务。 <a class="btn--link" href="">查看联盟九大服务详情</a></div></div>'},module.exports=exports["default"]});
;/*!src/pages/index/index.js*/
define("src/pages/index/index",function(require){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}var c=require("node_modules/vue/dist/vue"),S=a(c),g=require("src/utils/global"),h=a(g),v=require("src/pages/index/header/index"),I=a(v),w=require("src/pages/index/bar/index"),R=a(w),_=require("src/pages/index/step2/index"),b=a(_),y=require("src/pages/index/step3/index"),B=a(y),C=require("src/pages/index/step4/index"),H=a(C),M=require("src/pages/index/step5/index"),T=a(M),$=require("src/pages/index/step6/index"),j=a($),k=require("src/pages/index/step7/index"),z=a(k);S["default"].use(h["default"]),new S["default"]({el:"#wrap",components:{uiStepHeader:I["default"],uiBar:R["default"],uiStep1:b["default"],uiStep2:B["default"],uiStep3:H["default"],uiStep4:T["default"],uiStep5:j["default"],uiStep6:z["default"]},data:{isInit:!0,items:["提交申请","补充资料","资质审核","签署合同","支付","完成"],isShowImageCropper:!1,errorStep:0,currentStep:0,refuseReason:""},computed:{componentId:function(){return"ui-step"+this.currentStep}},methods:{next:function(){this.currentStep++}},created:function(){var a=this;this.$http.get("/api/group/v3/auto/get/currentstep").then(function(c){a.isInit=!1;var S=c.data,g=a.errorStep=S.errorStep;g?(a.refuseReason=S.refuseReason,a.currentStep=g):a.currentStep=S.currentStep},function(c){a.isInit=!1,a.toast({content:c.statusText,type:"warn"})})}})});