define("src/utils/loginFail",function(require,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){location.href.indexOf("group.")>=0?location.href=location.origin.replace("group.","www.")+"/b/login.html":alert("请重新登录！")}});