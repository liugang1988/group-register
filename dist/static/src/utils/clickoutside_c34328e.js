define("src/utils/clickoutside",function(require,exports,module){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var c=function(){return document.addEventListener?function(c,a,h){c&&a&&h&&c.addEventListener(a,h,!1)}:function(c,a,h){c&&a&&h&&c.attachEvent("on"+a,h)}}(),a=[],h="@@clickoutsideContext";c(document,"click",function(e){a.forEach(function(c){return c[h].documentHandler(e)})}),exports["default"]={bind:function(c,v,b){var g=a.push(c)-1,E=function(e){!b.context||c.contains(e.target)||b.context.popperElm&&b.context.popperElm.contains(e.target)||(v.expression&&c[h].methodName&&b.context[c[h].methodName]?b.context[c[h].methodName]():c[h].bindingFn&&c[h].bindingFn())};c[h]={id:g,documentHandler:E,methodName:v.expression,bindingFn:v.value}},update:function(c,a){c[h].methodName=a.expression,c[h].bindingFn=a.value},unbind:function(c){for(var v=a.length,i=0;v>i;i++)if(a[i][h].id===c[h].id){a.splice(i,1);break}}},module.exports=exports["default"]});