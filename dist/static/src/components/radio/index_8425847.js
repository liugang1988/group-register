define("src/components/radio/index",function(require,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={template:'<label class="u-radio" :class="{\r\n        \'z-disabled\': disabled,\r\n        \'z-checked\': label === model\r\n    }"><i class="icon-right"></i> <input type="radio" v-model="model" :value="label" :disabled="disabled"><slot></slot></label>',props:{value:[String,Number],disabled:Boolean,label:{type:[String,Number],required:!0}},computed:{model:{get:function(){return this.value},set:function(a){this.$emit("input",a)}}}}});