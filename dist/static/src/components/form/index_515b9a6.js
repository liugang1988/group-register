define("src/components/form/index",function(require,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={template:'<div class="m-form" :class="className"><slot></slot></div>',props:{type:String},computed:{className:function(){var c=this.type;return"v"===c?"m-form--v":""}}}});