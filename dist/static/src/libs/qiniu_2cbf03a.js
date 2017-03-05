var global="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{};!function(global){function createCookie(a,g,exp){var c=new Date;c.setTime(c.getTime()+24*exp*60*60*1e3);var h="; expires="+c.toGMTString();document.cookie=a+"="+g+h+"; path=/"}function readCookie(a){for(var g=a+"=",c=document.cookie.split(";"),i=0,h=c.length;h>i;i++){for(var v=c[i];" "===v.charAt(0);)v=v.substring(1,v.length);if(0===v.indexOf(g))return v.substring(g.length,v.length)}return null}function QiniuJsSDK(){function log(a,g){for(var c="[qiniu-js-sdk]["+a+"]",h=c,i=0;i<g.length;i++)h+="string"==typeof g[i]?" "+g[i]:" "+that.stringifyJSON(g[i]);that.detectIEVersion()||(g.unshift(c),console.log.apply(console,g)),document.getElementById("qiniu-js-sdk-log")&&(document.getElementById("qiniu-js-sdk-log").innerHTML+="<p>"+h+"</p>")}function makeLogFunc(a){var g=a.toLowerCase();logger[g]=function(){if(window.console&&window.console.log&&logger.level>=logger[a]){var c=Array.prototype.slice.call(arguments);log(g,c)}}}var that=this;this.detectIEVersion=function(){for(var a=4,g=document.createElement("div"),c=g.getElementsByTagName("i");g.innerHTML="<!--[if gt IE "+a+"]><i></i><![endif]-->",c[0];)a++;return a>4?a:!1};var logger={MUTE:0,FATA:1,ERROR:2,WARN:3,INFO:4,DEBUG:5,TRACE:6,level:0};for(var property in logger)logger.hasOwnProperty(property)&&"number"==typeof logger[property]&&!logger.hasOwnProperty(property.toLowerCase())&&makeLogFunc(property);var qiniuUploadUrl;qiniuUploadUrl="https:"===window.location.protocol?"https://up.qbox.me":"http://upload.qiniu.com";var qiniuUploadUrls=["http://upload.qiniu.com","http://up.qiniu.com"],changeUrlTimes=0;this.resetUploadUrl=function(){if("https:"===window.location.protocol)qiniuUploadUrl="https://up.qbox.me";else{var i=changeUrlTimes%qiniuUploadUrls.length;qiniuUploadUrl=qiniuUploadUrls[i],changeUrlTimes++}logger.debug("resetUploadUrl: "+qiniuUploadUrl)},this.resetUploadUrl(),this.isImage=function(a){return a=a.split(/[?#]/)[0],/\.(png|jpg|jpeg|gif|bmp)$/i.test(a)},this.getFileExtension=function(a){var g,c=a.split(".");return g=1===c.length||""===c[0]&&2===c.length?"":c.pop().toLowerCase()},this.utf8_encode=function(a){if(null===a||"undefined"==typeof a)return"";var g,c,h=a+"",v="",k=0;g=c=0,k=h.length;for(var n=0;k>n;n++){var b=h.charCodeAt(n),_=null;if(128>b)c++;else if(b>127&&2048>b)_=String.fromCharCode(b>>6|192,63&b|128);else if(63488&b^!0)_=String.fromCharCode(b>>12|224,b>>6&63|128,63&b|128);else{if(64512&b^!0)throw new RangeError("Unmatched trail surrogate at "+n);var w=h.charCodeAt(++n);if(64512&w^!0)throw new RangeError("Unmatched lead surrogate at "+(n-1));b=((1023&b)<<10)+(1023&w)+65536,_=String.fromCharCode(b>>18|240,b>>12&63|128,b>>6&63|128,63&b|128)}null!==_&&(c>g&&(v+=h.slice(g,c)),v+=_,g=c=n+1)}return c>g&&(v+=h.slice(g,k)),v},this.base64_encode=function(a){var g,c,h,v,k,b,_,w,U="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",i=0,y=0,O="",S=[];if(!a)return a;a=this.utf8_encode(a+"");do g=a.charCodeAt(i++),c=a.charCodeAt(i++),h=a.charCodeAt(i++),w=g<<16|c<<8|h,v=w>>18&63,k=w>>12&63,b=w>>6&63,_=63&w,S[y++]=U.charAt(v)+U.charAt(k)+U.charAt(b)+U.charAt(_);while(i<a.length);switch(O=S.join(""),a.length%3){case 1:O=O.slice(0,-2)+"==";break;case 2:O=O.slice(0,-1)+"="}return O},this.URLSafeBase64Encode=function(a){return a=this.base64_encode(a),a.replace(/\//g,"_").replace(/\+/g,"-")},this.createAjax=function(){var a={};return a=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")},this.parseJSON=function(data){if(window.JSON&&window.JSON.parse)return window.JSON.parse(data);var rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,text=String(data);return rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),eval("("+text+")")},this.stringifyJSON=function(a){if(window.JSON&&window.JSON.stringify)return window.JSON.stringify(a);switch(typeof a){case"string":return'"'+a.replace(/(["\\])/g,"\\$1")+'"';case"array":return"["+a.map(that.stringifyJSON).join(",")+"]";case"object":if(a instanceof Array){for(var g=[],c=a.length,i=0;c>i;i++)g.push(that.stringifyJSON(a[i]));return"["+g.join(",")+"]"}if(null===a)return"null";var h=[];for(var v in a)a.hasOwnProperty(v)&&h.push(that.stringifyJSON(v)+":"+that.stringifyJSON(a[v]));return"{"+h.join(",")+"}";case"number":return a;case!1:return a;case"boolean":return a}},this.trim=function(a){return null===a?"":a.replace(/^\s+|\s+$/g,"")},this.uploader=function(a){var g=function(){var g,c,h,v=that.detectIEVersion(),k="Safari"===mOxie.Env.browser&&mOxie.Env.version<=5&&"Windows"===mOxie.Env.os&&"7"===mOxie.Env.osVersion||"Safari"===mOxie.Env.browser&&"iOS"===mOxie.Env.os&&"7"===mOxie.Env.osVersion;v&&9>=v&&a.chunk_size&&a.runtimes.indexOf("flash")<0?a.chunk_size=0:k?a.chunk_size=0:(g=20,c=4<<g,h=plupload.parseSize(a.chunk_size),h>c&&(a.chunk_size=c))},c=function(g){if(a.uptoken)return void(that.token=a.uptoken);{if(!a.uptoken_url)return a.uptoken_func?(logger.debug("get uptoken from uptoken_func"),that.token=a.uptoken_func(g),void logger.debug("get new uptoken: ",that.token)):void logger.error("one of [uptoken, uptoken_url, uptoken_func] settings in options is required!");logger.debug("get uptoken from: ",that.uptoken_url);var c=that.createAjax();if(c.open("GET",that.uptoken_url,!1),c.setRequestHeader("If-Modified-Since","0"),c.send(),200===c.status){var h=that.parseJSON(c.responseText);that.token=h.uptoken,logger.debug("get new uptoken: ",h.uptoken)}else logger.error("get uptoken error: ",c.responseText)}},h=function(g,c,h){var v="",k=!1;if(!a.save_key)if(k=g.getOption&&g.getOption("unique_names"),k=k||g.settings&&g.settings.unique_names){var b=that.getFileExtension(c.name);v=b?c.id+"."+b:c.id}else v="function"==typeof h?h(g,c):c.name;return v};if(a.log_level&&(logger.level=a.log_level),!a.domain)throw"domain setting in options is required!";if(!a.browse_button)throw"browse_button setting in options is required!";if(!a.uptoken&&!a.uptoken_url&&!a.uptoken_func)throw"one of [uptoken, uptoken_url, uptoken_func] settings in options is required!";logger.debug("init uploader start"),logger.debug("environment: ",mOxie.Env),logger.debug("userAgent: ",navigator.userAgent);var v={},k=a.init&&a.init.Error,b=a.init&&a.init.FileUploaded;a.init.Error=function(){},a.init.FileUploaded=function(){},that.uptoken_url=a.uptoken_url,that.token="",that.key_handler="function"==typeof a.init.Key?a.init.Key:"",this.domain=a.domain;var _="",w={isResumeUpload:!1,resumeFilesize:0,startTime:"",currentTime:""};g(),logger.debug("invoke reset_chunk_size()"),logger.debug("op.chunk_size: ",a.chunk_size),plupload.extend(v,a,{url:qiniuUploadUrl,multipart_params:{token:""}}),logger.debug("option: ",v);var U=new plupload.Uploader(v);logger.debug("new plupload.Uploader(option)"),U.bind("Init",function(){logger.debug("Init event activated"),a.get_new_uptoken||c(null)}),logger.debug("bind Init event"),U.bind("FilesAdded",function(a,g){logger.debug("FilesAdded event activated");var c=a.getOption&&a.getOption("auto_start");c=c||a.settings&&a.settings.auto_start,logger.debug("auto_start: ",c),logger.debug("files: ",g);var h=function(){return"ios"===mOxie.Env.OS.toLowerCase()?!0:!1};if(h())for(var i=0;i<g.length;i++){var v=g[i],k=that.getFileExtension(v.name);v.name=v.id+"."+k}c&&setTimeout(function(){a.start(),logger.debug("invoke up.start()")},0),a.refresh()}),logger.debug("bind FilesAdded event"),U.bind("BeforeUpload",function(g,v){logger.debug("BeforeUpload event activated"),v.speed=v.speed||0,_="",a.get_new_uptoken&&c(v);var k=function(g,c,v){w.startTime=(new Date).getTime();var k;k=a.save_key?{token:that.token}:{key:h(g,c,v),token:that.token},logger.debug("directUpload multipart_params_obj: ",k);var _=a.x_vars;if(void 0!==_&&"object"==typeof _)for(var U in _)_.hasOwnProperty(U)&&("function"==typeof _[U]?k["x:"+U]=_[U](g,c):"object"!=typeof _[U]&&(k["x:"+U]=_[U]));g.setOption({url:qiniuUploadUrl,multipart:!0,chunk_size:b()?a.max_file_size:void 0,multipart_params:k})},b=function(){var a=navigator.userAgent.toLowerCase();return(a.match(/MicroMessenger/i)||"QQBrowser"===mOxie.Env.browser||a.match(/V1_AND_SQ/i))&&"android"===mOxie.Env.OS.toLowerCase()?!0:!1},y=g.getOption&&g.getOption("chunk_size");if(y=y||g.settings&&g.settings.chunk_size,logger.debug("uploader.runtime: ",U.runtime),logger.debug("chunk_size: ",y),"html5"!==U.runtime&&"flash"!==U.runtime||!y)logger.debug("directUpload because uploader.runtime !== 'html5' || uploader.runtime !== 'flash' || !chunk_size"),k(g,v,that.key_handler);else if(v.size<y||b())logger.debug("directUpload because file.size < chunk_size || is_android_weixin_or_qq()"),k(g,v,that.key_handler);else{var O=localStorage.getItem(v.name),S=y;if(O){O=that.parseJSON(O);var E=(new Date).getTime(),R=O.time||0,T=864e5;T>E-R&&100!==O.percent&&v.size===O.total?(v.percent=O.percent,v.loaded=O.offset,_=O.ctx,w.isResumeUpload=!0,w.resumeFilesize=O.offset,O.offset+S>v.size&&(S=v.size-O.offset)):localStorage.removeItem(v.name)}w.startTime=(new Date).getTime(),g.setOption({url:qiniuUploadUrl+"/mkblk/"+S,multipart:!1,chunk_size:y,required_features:"chunks",headers:{Authorization:"UpToken "+that.token},multipart_params:{}})}}),logger.debug("bind BeforeUpload event"),U.bind("UploadProgress",function(a,g){logger.trace("UploadProgress event activated"),w.currentTime=(new Date).getTime();var c=w.currentTime-w.startTime,h=g.loaded||0;w.isResumeUpload&&(h=g.loaded-w.resumeFilesize),g.speed=(h/c*1e3).toFixed(0)||0}),logger.debug("bind UploadProgress event"),U.bind("ChunkUploaded",function(a,g,c){logger.debug("ChunkUploaded event activated"),logger.debug("file: ",g),logger.debug("info: ",c);var h=that.parseJSON(c.response);logger.debug("res: ",h),_=_?_+","+h.ctx:h.ctx;var v=c.total-c.offset,k=a.getOption&&a.getOption("chunk_size");k=k||a.settings&&a.settings.chunk_size,k>v&&(a.setOption({url:qiniuUploadUrl+"/mkblk/"+v}),logger.debug("up.setOption url: ",qiniuUploadUrl+"/mkblk/"+v)),localStorage.setItem(g.name,that.stringifyJSON({ctx:_,percent:g.percent,total:c.total,offset:c.offset,time:(new Date).getTime()}))}),logger.debug("bind ChunkUploaded event");var y=qiniuUploadUrls.length,O=function(a){return y-->0?(setTimeout(function(){that.resetUploadUrl(),a.status=plupload.QUEUED,U.stop(),U.start()},0),!0):(y=qiniuUploadUrls.length,!1)};return U.bind("Error",function(a){return function(g,c){logger.error("Error event activated"),logger.error("err: ",c);var h="",v=c.file;if(v){switch(c.code){case plupload.FAILED:h="上传失败。请稍后再试。";break;case plupload.FILE_SIZE_ERROR:var k=g.getOption&&g.getOption("max_file_size");k=k||g.settings&&g.settings.max_file_size,h="浏览器最大可上传"+k+"。更大文件请使用命令行工具。";break;case plupload.FILE_EXTENSION_ERROR:h="文件验证失败。请稍后重试。";break;case plupload.HTTP_ERROR:if(""===c.response){if(h=c.message||"未知网络错误。",!O(v))return;break}var b=that.parseJSON(c.response),_=b.error;switch(c.status){case 400:h="请求报文格式错误。";break;case 401:h="客户端认证授权失败。请重试或提交反馈。";break;case 405:h="客户端请求错误。请重试或提交反馈。";break;case 579:h="资源上传成功，但回调失败。";break;case 599:if(h="网络连接异常。请重试或提交反馈。",!O(v))return;break;case 614:h="文件已存在。";try{b=that.parseJSON(b.error),_=b.error||"file exists"}catch(e){_=b.error||"file exists"}break;case 631:h="指定空间不存在。";break;case 701:h="上传数据块校验出错。请重试或提交反馈。";break;default:if(h="未知错误。",!O(v))return}h=h+"("+c.status+"："+_+")";break;case plupload.SECURITY_ERROR:h="安全配置错误。请联系网站管理员。";break;case plupload.GENERIC_ERROR:h="上传失败。请稍后再试。";break;case plupload.IO_ERROR:h="上传失败。请稍后再试。";break;case plupload.INIT_ERROR:h="网站配置错误。请联系网站管理员。",U.destroy();break;default:if(h=c.message+c.details,!O(v))return}a&&a(g,c,h)}g.refresh()}}(k)),logger.debug("bind Error event"),U.bind("FileUploaded",function(g){return function(c,v,k){logger.debug("FileUploaded event activated"),logger.debug("file: ",v),logger.debug("info: ",k);var b=function(c,h,v){if(a.downtoken_url){var k=that.createAjax();k.open("POST",a.downtoken_url,!0),k.setRequestHeader("Content-type","application/x-www-form-urlencoded"),k.onreadystatechange=function(){if(4===k.readyState)if(200===k.status){var a;try{a=that.parseJSON(k.responseText)}catch(e){throw"invalid json format"}var b={};plupload.extend(b,that.parseJSON(v),a),g&&g(c,h,that.stringifyJSON(b))}else U.trigger("Error",{status:k.status,response:k.responseText,file:h,code:plupload.HTTP_ERROR})},k.send("key="+that.parseJSON(v).key+"&domain="+a.domain)}else g&&g(c,h,v)},w=that.parseJSON(k.response);if(_=_?_:w.ctx,logger.debug("ctx: ",_),_){var y="";logger.debug("save_key: ",a.save_key),a.save_key||(y=h(c,v,that.key_handler),y=y?"/key/"+that.URLSafeBase64Encode(y):"");var O="/fname/"+that.URLSafeBase64Encode(v.name);logger.debug("op.x_vars: ",a.x_vars);var S=a.x_vars,E="",R="";if(void 0!==S&&"object"==typeof S)for(var T in S)S.hasOwnProperty(T)&&("function"==typeof S[T]?E=that.URLSafeBase64Encode(S[T](c,v)):"object"!=typeof S[T]&&(E=that.URLSafeBase64Encode(S[T])),R+="/x:"+T+"/"+E);var I,z=qiniuUploadUrl+"/mkfile/"+v.size+y+O+R,A=that.detectIEVersion();A&&9>=A?(I=new mOxie.XMLHttpRequest,mOxie.Env.swf_url=a.flash_swf_url):I=that.createAjax(),I.open("POST",z,!0),I.setRequestHeader("Content-Type","text/plain;charset=UTF-8"),I.setRequestHeader("Authorization","UpToken "+that.token);var N=function(){if(logger.debug("ajax.readyState: ",I.readyState),4===I.readyState){localStorage.removeItem(v.name);var a;200===I.status?(a=I.responseText,logger.debug("mkfile is success: ",a),b(c,v,a)):(a={status:I.status,response:I.responseText,file:v,code:-200},logger.debug("mkfile is error: ",a),U.trigger("Error",a))}};A&&9>=A?I.bind("readystatechange",N):I.onreadystatechange=N,I.send(_),logger.debug("mkfile: ",z)}else b(c,v,k.response)}}(b)),logger.debug("bind FileUploaded event"),U.init(),logger.debug("invoke uploader.init()"),logger.debug("init uploader end"),U},this.getUrl=function(a){if(!a)return!1;a=encodeURI(a);var g=this.domain;return"/"!==g.slice(g.length-1)&&(g+="/"),g+a},this.imageView2=function(a,g){var c=a.mode||"",h=a.w||"",v=a.h||"",q=a.q||"",k=a.format||"";if(!c)return!1;if(!h&&!v)return!1;var b="imageView2/"+c;return b+=h?"/w/"+h:"",b+=v?"/h/"+v:"",b+=q?"/q/"+q:"",b+=k?"/format/"+k:"",g&&(b=this.getUrl(g)+"?"+b),b},this.imageMogr2=function(a,g){var c=a["auto-orient"]||"",h=a.thumbnail||"",v=a.strip||"",k=a.gravity||"",b=a.crop||"",_=a.quality||"",w=a.rotate||"",U=a.format||"",y=a.blur||"",O="imageMogr2";return O+=c?"/auto-orient":"",O+=h?"/thumbnail/"+h:"",O+=v?"/strip":"",O+=k?"/gravity/"+k:"",O+=_?"/quality/"+_:"",O+=b?"/crop/"+b:"",O+=w?"/rotate/"+w:"",O+=U?"/format/"+U:"",O+=y?"/blur/"+y:"",g&&(O=this.getUrl(g)+"?"+O),O},this.watermark=function(a,g){var c=a.mode;if(!c)return!1;var h="watermark/"+c;if(1===c){var v=a.image||"";if(!v)return!1;h+=v?"/image/"+this.URLSafeBase64Encode(v):""}else{if(2!==c)return!1;var k=a.text?a.text:"",b=a.font?a.font:"",_=a.fontsize?a.fontsize:"",w=a.fill?a.fill:"";if(!k)return!1;h+=k?"/text/"+this.URLSafeBase64Encode(k):"",h+=b?"/font/"+this.URLSafeBase64Encode(b):"",h+=_?"/fontsize/"+_:"",h+=w?"/fill/"+this.URLSafeBase64Encode(w):""}var U=a.dissolve||"",y=a.gravity||"",O=a.dx||"",S=a.dy||"";return h+=U?"/dissolve/"+U:"",h+=y?"/gravity/"+y:"",h+=O?"/dx/"+O:"",h+=S?"/dy/"+S:"",g&&(h=this.getUrl(g)+"?"+h),h},this.imageInfo=function(a){if(!a)return!1;var g,c=this.getUrl(a)+"?imageInfo",h=this.createAjax(),v=this;return h.open("GET",c,!1),h.onreadystatechange=function(){4===h.readyState&&200===h.status&&(g=v.parseJSON(h.responseText))},h.send(),g},this.exif=function(a){if(!a)return!1;var g,c=this.getUrl(a)+"?exif",h=this.createAjax(),v=this;return h.open("GET",c,!1),h.onreadystatechange=function(){4===h.readyState&&200===h.status&&(g=v.parseJSON(h.responseText))},h.send(),g},this.get=function(a,g){return g&&a?"exif"===a?this.exif(g):"imageInfo"===a?this.imageInfo(g):!1:!1},this.pipeline=function(a,g){var c,h,v="[object Array]"===Object.prototype.toString.call(a),k="";if(v){for(var i=0,b=a.length;b>i;i++){if(c=a[i],!c.fop)return!1;switch(c.fop){case"watermark":k+=this.watermark(c)+"|";break;case"imageView2":k+=this.imageView2(c)+"|";break;case"imageMogr2":k+=this.imageMogr2(c)+"|";break;default:h=!0}if(h)return!1}if(g){k=this.getUrl(g)+"?"+k;var _=k.length;"|"===k.slice(_-1)&&(k=k.slice(0,_-1))}return k}return!1}}window.localStorage||(window.localStorage={setItem:function(a,g){createCookie(a,g,30)},getItem:function(a){return readCookie(a)},removeItem:function(a){createCookie(a,"",-1)}});var Qiniu=new QiniuJsSDK;global.Qiniu=Qiniu,global.QiniuJsSDK=QiniuJsSDK}(window);