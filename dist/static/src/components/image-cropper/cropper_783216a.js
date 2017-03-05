define("src/components/image-cropper/cropper",function(require,exports,module){"use strict";function a(a){return a&&a.__esModule?a:{"default":a}}function h(a){var c=this;this instanceof h||(c=new h);for(var g in a)Object.prototype.hasOwnProperty.call(a,g)&&(c[g]=a[g]);return c.aspectRatio=c.targetWidth&&c.targetHeight?c.targetWidth/c.targetHeight:null,c.element&&c.render(c.element),c}Object.defineProperty(exports,"__esModule",{value:!0});var c=require("src/components/image-cropper/resizer"),g=a(c),y=require("src/components/image-cropper/build-dom"),A=a(y),v="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";h.prototype.resetResizer=function(){var a=this.resizer,h=this.cropperRect,c=this.aspectRatio,g=a.dom,y=h.width,A=h.height,v=0,w=0;c&&(A=y/c,A>h.height&&(A=h.height,y=A*c),h&&(w=(h.width-y)/2,v=(h.height-A)/2)),g.style.left=w+"px",g.style.top=v+"px",g.style.width=y+"px",g.style.height=A+"px",a.doOnStateChange(),a.doOnDragEnd()},h.prototype.setImage=function(a,h,c){if(a){var g=this.element,y=g.querySelector("img"),A=this.refs.image,v=this.dom;this.imageSize={width:h,height:c};var w=g.offsetWidth,R=g.offsetHeight,O={};h/c>w/R?(O.width=w,O.height=w*c/h,O.top=(R-O.height)/2,O.left=0):(O.height=R,O.width=R*h/c,O.top=0,O.left=(w-O.width)/2),this.cropperRect=O;for(var z in O)Object.prototype.hasOwnProperty.call(O,z)&&(v.style[z]=y.style[z]=A.style[z]=O[z]+"px");A.src=y.src=a,v.style.display="";var r=h/w;this.resizer.minWidth=(this.targetWidth||100)/r,this.resizer.minHeight=(this.targetHeight||100)/r,this.resetResizer()}},h.prototype.render=function(a){var h=this,c=new g["default"]({aspectRatio:this.aspectRatio}),y={},w=A["default"]({tag:"div",className:"cropper",content:[{tag:"div",className:"mask"}]},y),R=c.render(w),O=A["default"]({tag:"div",className:"wrapper",content:[{tag:"img",key:"image",src:v}]},y);this.refs=y,c.doOnStateChange=function(){var a=parseInt(R.style.left,10)||0,h=parseInt(R.style.top,10)||0,c=y.image;c.style.left=-a+"px",c.style.top=-h+"px"},c.doOnDragEnd=function(){var a=parseInt(R.style.left,10)||0,c=parseInt(R.style.top,10)||0,g=R.offsetWidth,y=R.offsetHeight,A=h.imageSize,v=h.cropperRect;if(v){var w=v.width/A.width;h.croppedRect={width:Math.floor(g/w),height:Math.floor(y/w),left:Math.floor(a/w),top:Math.floor(c/w)},"function"==typeof h.onCroppedRectChange&&h.onCroppedRectChange(h.croppedRect)}},this.resizer=c,this.dom=w,R.insertBefore(O,R.firstChild),a.appendChild(w),this.dom.style.display="none"},exports["default"]=h,module.exports=exports["default"]});