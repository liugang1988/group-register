define("src/utils/modal",function(require,exports){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(exports,"__esModule",{value:!0});var c=Object.assign||function(a){for(var i=1;i<arguments.length;i++){var c=arguments[i];for(var v in c)Object.prototype.hasOwnProperty.call(c,v)&&(a[v]=c[v])}return a},v=require("node_modules/vue/dist/vue"),g=a(v),b=require("src/components/modal/index"),y=a(b),h=void 0,O={type:"alert",title:"",content:"",okText:"确定",cancelText:"取消",callback:function(a){a.visible=!1}},_=g.default.extend(y.default),j=function(){return new _({el:document.createElement("div")})},k=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return h||(h=j(),document.body.appendChild(h.$el)),a=c({},O,a),Object.keys(a).map(function(c){return h[c]=a[c],!1}),g.default.nextTick(function(){h.visible=!0}),h};exports.default={alert:function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return k(a)},confirm:function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return a.type="confirm",k(a)}}});