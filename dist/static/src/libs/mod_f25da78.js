var global="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},require,define;!function(a){if(!require){var c=document.getElementsByTagName("head")[0],h={},v={},y={},g={},j={},w={},C=function(a,h){for(var v=document.createDocumentFragment(),i=0,y=a.length;y>i;i++){var j=a[i].id,w=a[i].url;if(!(w in g)){g[w]=!0;var C=document.createElement("script");h&&!function(a,c){var v=setTimeout(function(){h(c)},require.timeout);a.onerror=function(){clearTimeout(v),h(c)};var y=function(){clearTimeout(v)};"onload"in a?a.onload=y:a.onreadystatechange=function(){("loaded"===this.readyState||"complete"===this.readyState)&&y()}}(C,j),C.type="text/javascript",C.src=w,v.appendChild(C)}}c.appendChild(v)},T=function(a,c,v){for(var y=[],i=0,g=a.length;g>i;i++){var T=a[i],E=h[T]||(h[T]=[]);E.push(c);var S,b=j[T]||j[T+".js"]||{},k=b.pkg;S=k?w[k].url||w[k].uri:b.url||b.uri||T,y.push({id:T,url:S})}C(y,v)};define=function(a,c){a=a.replace(/\.js$/i,""),v[a]=c;var y=h[a];if(y){for(var i=0,n=y.length;n>i;i++)y[i]();delete h[a]}},require=function(a){if(a&&a.splice)return require.async.apply(this,arguments);a=require.alias(a);var mod=y[a];if(mod)return mod.exports;var c=v[a];if(!c)throw"[ModJS] Cannot find module `"+a+"`";mod=y[a]={exports:{}};var h="function"==typeof c?c.apply(mod,[require,mod.exports,mod]):c;return h&&(mod.exports=h),mod.exports},require.async=function(c,h,y){function g(a){for(var c,i=0,n=a.length;n>i;i++){var h=require.alias(a[i]);h in C||(C[h]=!0,h in v?(c=j[h]||j[h+".js"],c&&"deps"in c&&g(c.deps)):(S.push(h),E++,c=j[h]||j[h+".js"],c&&"deps"in c&&g(c.deps)))}}function w(){if(0===E--){for(var v=[],i=0,n=c.length;n>i;i++)v[i]=require(c[i]);h&&h.apply(a,v)}}"string"==typeof c&&(c=[c]);var C={},E=0,S=[];g(c),T(S,w,y),w()},require.ensure=function(a,c){require.async(a,function(){c&&c.call(this,require)})},require.resourceMap=function(a){var c,h;h=a.res;for(c in h)h.hasOwnProperty(c)&&(j[c]=h[c]);h=a.pkg;for(c in h)h.hasOwnProperty(c)&&(w[c]=h[c])},require.loadJs=function(a){if(!(a in g)){g[a]=!0;var h=document.createElement("script");h.type="text/javascript",h.src=a,c.appendChild(h)}},require.loadCss=function(a){if(a.content){var h=document.createElement("style");h.type="text/css",h.styleSheet?h.styleSheet.cssText=a.content:h.innerHTML=a.content,c.appendChild(h)}else if(a.url){var v=document.createElement("link");v.href=a.url,v.rel="stylesheet",v.type="text/css",c.appendChild(v)}},require.alias=function(a){return a.replace(/\.js$/i,"")},require.timeout=5e3}}(this);