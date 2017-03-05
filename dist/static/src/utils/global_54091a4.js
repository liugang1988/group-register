define("src/utils/global",function(require,exports){"use strict";function c(c){return c&&c.__esModule?c:{"default":c}}Object.defineProperty(exports,"__esModule",{value:!0});var a=require("src/utils/toast"),g=c(a),b=require("src/utils/modal"),h=c(b),y=require("src/utils/http"),F=c(y),I=require("src/components/header/index"),_=c(I),k=require("src/components/icon/index"),v=c(k),M=require("src/components/button/index"),U=c(M),j=require("src/components/dialog/index"),A=c(j),B=require("src/components/form/index"),C=c(B),D=require("src/components/form-item/index"),H=c(D),O=require("src/components/form-upload-img/index"),P=c(O),R=require("src/components/form-upload-imgs/index"),$=c(R),w=require("src/components/checkbox/index"),z=c(w),E=require("src/components/radio/index"),G=c(E),J=require("src/components/autocomplete/index"),K=c(J),L={};L.install=function(c){c.component("uiAutocomplete",K.default),c.component("uiHeader",_.default),c.component("uiIcon",v.default),c.component("uiButton",U.default),c.component("uiDialog",A.default),c.component("uiForm",C.default),c.component("uiFormItem",H.default),c.component("uiFormUploadImg",P.default),c.component("uiFormUploadImgs",$.default),c.component("uiCheckbox",z.default),c.component("uiRadio",G.default),c.prototype.$http=F.default,c.prototype.toast=g.default,c.prototype.alert=h.default.alert,c.prototype.confirm=h.default.confirm},exports.default=L});