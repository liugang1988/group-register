define("src/pages/test/image-cropper/image-cropper",function(require){"use strict";function c(c){return c&&c.__esModule?c:{"default":c}}var a=require("node_modules/vue/dist/vue"),g=c(a),w=require("../../../components/image-cropper/image-cropper"),h=c(w);new g["default"]({el:"#wrap",components:{"ui-image-cropper":h["default"]},data:{isSet:!0,types:"jpg  png  jpeg",maxSize:2097152,compressSize:102400,width:"",height:""},methods:{error:function(c,a){alert(c)},success:function(c,a){window.open(c)}}})});