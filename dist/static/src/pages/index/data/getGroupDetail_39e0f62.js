define("src/pages/index/data/getGroupDetail",function(require,exports,module){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(exports,"__esModule",{value:!0});var c=require("src/utils/http"),g=a(c),_=require("src/pages/index/data/Cache"),v=a(_),h=new v["default"]({load:function(a){return g["default"].get("api/group/v3/auto/select/group/detail",{params:{groupId:a}})}});exports["default"]=h,module.exports=exports["default"]});