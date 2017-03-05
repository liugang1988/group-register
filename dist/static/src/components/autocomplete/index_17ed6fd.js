define("src/components/autocomplete/index",function(require,exports){"use strict";function g(g){return g&&g.__esModule?g:{"default":g}}Object.defineProperty(exports,"__esModule",{value:!0});var h=require("src/utils/clickoutside"),c=g(h);exports.default={template:'<div class="m-autocomplete" v-clickoutside="outside"><input class="u-input-text" type="text" :placeholder="placeholder" :value="value" :disabled="disabled" @input="change" @blur="blur" @focus="focus" @keydown.up="highlight(highlightedIndex - 1)" @keydown.down="highlight(highlightedIndex + 1)" @keydown.enter.stop="select(highlightedIndex)"><div class="m-autocomplete__items" ref="suggestions" v-if="suggestionVisible"><div v-if="loading">loading...</div><template v-for="(item,index) of suggestions"><div class="m-autocomplete__item" v-if="!customItem" :class="{\'z-active\': highlightedIndex === index}" @click="select(index)">{{item.value}}</div><component v-else :class="{\'z-active\': highlightedIndex === index}" @click.native="select(index)" :is="customItem" :item="item" :index="index"></component></template></div></div>',directives:{clickoutside:c.default},props:{placeholder:String,disabled:Boolean,value:String,triggerOnFocus:{type:Boolean,"default":!0},customItem:String,fetchSuggestions:Function},data:function(){return{timer:null,suggestions:[],suggestionVisible:!1,loading:!1,highlightedIndex:-1}},mounted:function(){this.$parent.popperElm=this.popperElm=this.$el},methods:{change:function(e){var g=e.target.value;this.$emit("input",g),this.showSuggestions(g)},focus:function(){this.triggerOnFocus&&this.value&&(this.showSuggestions(this.value),this.$emit("focus"))},blur:function(){this.$emit("blur")},outside:function(){this.hideSuggestions()},select:function(g){var h=this;this.suggestions&&this.suggestions[g]&&(this.$emit("input",this.suggestions[g].value),this.$emit("select",this.suggestions[g]),this.$nextTick(function(){h.hideSuggestions()}))},hideSuggestions:function(){this.suggestionVisible=!1,this.suggestions=[],this.loading=!1,clearTimeout(this.timer),this.timer=null},_showSuggestions:function(g){var h=this;this.fetchSuggestions(g).then(function(g){h.loading=!1,Array.isArray(g)&&g.length>0?h.suggestions=g:h.hideSuggestions()},function(){h.loading=!1,h.hideSuggestions()})},showSuggestions:function(g){var h=this;"function"==typeof this.fetchSuggestions&&(this.suggestionVisible=!0,this.loading=!0,clearTimeout(this.timer),this.timer=setTimeout(function(){h._showSuggestions(g)},300))},highlight:function(g){if(this.suggestionVisible&&!this.loading){0>g?g=0:g>=this.suggestions.length&&(g=this.suggestions.length-1);var h=this.$refs.suggestions,c=h.children[g],a=h.scrollTop,v=c.offsetTop;v+c.scrollHeight>a+h.clientHeight&&(h.scrollTop+=c.scrollHeight),a>v&&(h.scrollTop-=c.scrollHeight),this.highlightedIndex=g}}}}});