define("src/components/form-upload-img/index",function(require,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var A="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";exports.default={template:'<div class="m-form-upload-img"><div class="box" ref="uploader"><div class="uploader" v-show="status===0"></div><div class="img" v-show="status!==0"><img :src="url || defaultSrc"><div class="percent" :style="{height:percent+\'%\'}" v-show="status===1"></div></div></div><div class="title">{{title}}</div></div>',props:{id:[String,Number],initFn:Function,defaultSrc:A,title:String,url:String,status:{type:Number,"default":0},percent:{type:Number,"default":0}},methods:{remove:function(){this.$emit("remove",this.id)}},mounted:function(){"function"==typeof this.initFn&&this.initFn(this.$refs.uploader,this.id)}}});