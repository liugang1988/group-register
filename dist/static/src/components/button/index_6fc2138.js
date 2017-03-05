define("src/components/button/index",function(require,exports){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(exports,"__esModule",{value:!0});var c=require("src/components/icon/index"),b=a(c);exports.default={template:'<button class="btn" :class="className"><ui-icon :name="iconName" v-if="iconName"></ui-icon><slot></slot></button>',components:{uiIcon:b.default},props:{type:{type:String,"default":""},size:{type:String,"default":""},icon:{type:String,"default":""},plain:{type:Boolean,"default":!1},loading:{type:Boolean,"default":!1},disabled:{type:Boolean,"default":!1}},computed:{iconName:function(){return this.loading?"loading":this.icon},className:function(){var a="";return a+=this.size?" btn--"+this.size:"",a+=this.type?" btn--"+this.type:"",a+=this.plain?" btn--plain":"",a+=this.loading||this.disabled?" btn--disabled":""}}}});