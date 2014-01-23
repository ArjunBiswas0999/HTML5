/*
 * Sizzle CSS Selector Engine
 *  Copyright, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var c=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache",f=0,t=Object.prototype.toString,h=false,g=true,r=/\\/g,k=/\r\n/g,n=/\W/;[0,0].sort(function(){g=false;return 0});var S=function(a,b,j,l){j=j||[];b=b||document;var A=b;if(b.nodeType!==1&&b.nodeType!==9){return[]}if(!a||typeof a!=="string"){return j}var m,B,C,D,F,G,H,i,I=true,J=S.isXML(b),K=[],L=a;do{c.exec("");m=c.exec(L);if(m){L=m[3];K.push(m[1]);if(m[2]){D=m[3];break}}}while(m);if(K.length>1&&p.exec(a)){if(K.length===2&&E.relative[K[0]]){B=z(K[0]+K[1],b,l)}else{B=E.relative[K[0]]?[b]:S(K.shift(),b);while(K.length){a=K.shift();if(E.relative[a]){a+=K.shift()}B=z(a,B,l)}}}else{if(!l&&K.length>1&&b.nodeType===9&&!J&&E.match.ID.test(K[0])&&!E.match.ID.test(K[K.length-1])){F=S.find(K.shift(),b,J);b=F.expr?S.filter(F.expr,F.set)[0]:F.set[0]}if(b){F=l?{expr:K.pop(),set:u(l)}:S.find(K.pop(),K.length===1&&(K[0]==="~"||K[0]==="+")&&b.parentNode?b.parentNode:b,J);B=F.expr?S.filter(F.expr,F.set):F.set;if(K.length>0){C=u(B)}else{I=false}while(K.length){G=K.pop();H=G;if(!E.relative[G]){G=""}else{H=K.pop()}if(H==null){H=b}E.relative[G](C,H,J)}}else{C=K=[]}}if(!C){C=B}if(!C){S.error(G||a)}if(t.call(C)==="[object Array]"){if(!I){j.push.apply(j,C)}else if(b&&b.nodeType===1){for(i=0;C[i]!=null;i++){if(C[i]&&(C[i]===true||C[i].nodeType===1&&S.contains(b,C[i]))){j.push(B[i])}}}else{for(i=0;C[i]!=null;i++){if(C[i]&&C[i].nodeType===1){j.push(B[i])}}}}else{u(C,j)}if(D){S(D,A,j,l);S.uniqueSort(j)}return j};S.uniqueSort=function(a){if(v){h=g;a.sort(v);if(h){for(var i=1;i<a.length;i++){if(a[i]===a[i-1]){a.splice(i--,1)}}}}return a};S.matches=function(a,b){return S(a,null,null,b)};S.matchesSelector=function(a,b){return S(b,null,null,[a]).length>0};S.find=function(a,b,j){var l,i,m,A,s,B;if(!a){return[]}for(i=0,m=E.order.length;i<m;i++){s=E.order[i];if((A=E.leftMatch[s].exec(a))){B=A[1];A.splice(1,1);if(B.substr(B.length-1)!=="\\"){A[1]=(A[1]||"").replace(r,"");l=E.find[s](A,b,j);if(l!=null){a=a.replace(E.match[s],"");break}}}}if(!l){l=typeof b.getElementsByTagName!=="undefined"?b.getElementsByTagName("*"):[]}return{set:l,expr:a}};S.filter=function(a,b,j,l){var m,A,s,B,C,D,F,i,G,H=a,I=[],J=b,K=b&&b[0]&&S.isXML(b[0]);while(a&&b.length){for(s in E.filter){if((m=E.leftMatch[s].exec(a))!=null&&m[2]){D=E.filter[s];F=m[1];A=false;m.splice(1,1);if(F.substr(F.length-1)==="\\"){continue}if(J===I){I=[]}if(E.preFilter[s]){m=E.preFilter[s](m,J,j,I,l,K);if(!m){A=B=true}else if(m===true){continue}}if(m){for(i=0;(C=J[i])!=null;i++){if(C){B=D(C,m,i,J);G=l^B;if(j&&B!=null){if(G){A=true}else{J[i]=false}}else if(G){I.push(C);A=true}}}}if(B!==undefined){if(!j){J=I}a=a.replace(E.match[s],"");if(!A){return[]}break}}}if(a===H){if(A==null){S.error(a)}else{break}}H=a}return J};S.error=function(m){throw new Error("Syntax error, unrecognized expression: "+m)};var o=S.getText=function(a){var i,b,j=a.nodeType,l="";if(j){if(j===1||j===9||j===11){if(typeof a.textContent==='string'){return a.textContent}else if(typeof a.innerText==='string'){return a.innerText.replace(k,'')}else{for(a=a.firstChild;a;a=a.nextSibling){l+=o(a)}}}else if(j===3||j===4){return a.nodeValue}}else{for(i=0;(b=a[i]);i++){if(b.nodeType!==8){l+=o(b)}}}return l};var E=S.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var j=typeof b==="string",m=j&&!n.test(b),A=j&&!m;if(m){b=b.toLowerCase()}for(var i=0,l=a.length,B;i<l;i++){if((B=a[i])){while((B=B.previousSibling)&&B.nodeType!==1){}a[i]=A||B&&B.nodeName.toLowerCase()===b?B||false:B===b}}if(A){S.filter(b,a,true)}},">":function(a,b){var j,m=typeof b==="string",i=0,l=a.length;if(m&&!n.test(b)){b=b.toLowerCase();for(;i<l;i++){j=a[i];if(j){var A=j.parentNode;a[i]=A.nodeName.toLowerCase()===b?A:false}}}else{for(;i<l;i++){j=a[i];if(j){a[i]=m?j.parentNode:j.parentNode===b}}if(m){S.filter(b,a,true)}}},"":function(a,b,i){var j,l=f++,m=y;if(typeof b==="string"&&!n.test(b)){b=b.toLowerCase();j=b;m=x}m("parentNode",b,l,a,j,i)},"~":function(a,b,i){var j,l=f++,m=y;if(typeof b==="string"&&!n.test(b)){b=b.toLowerCase();j=b;m=x}m("previousSibling",b,l,a,j,i)}},find:{ID:function(a,b,i){if(typeof b.getElementById!=="undefined"&&!i){var m=b.getElementById(a[1]);return m&&m.parentNode?[m]:[]}},NAME:function(m,a){if(typeof a.getElementsByName!=="undefined"){var b=[],j=a.getElementsByName(m[1]);for(var i=0,l=j.length;i<l;i++){if(j[i].getAttribute("name")===m[1]){b.push(j[i])}}return b.length===0?null:b}},TAG:function(m,a){if(typeof a.getElementsByTagName!=="undefined"){return a.getElementsByTagName(m[1])}}},preFilter:{CLASS:function(m,a,b,j,l,A){m=" "+m[1].replace(r,"")+" ";if(A){return m}for(var i=0,B;(B=a[i])!=null;i++){if(B){if(l^(B.className&&(" "+B.className+" ").replace(/[\t\n\r]/g," ").indexOf(m)>=0)){if(!b){j.push(B)}}else if(b){a[i]=false}}}return false},ID:function(m){return m[1].replace(r,"")},TAG:function(m,a){return m[1].replace(r,"").toLowerCase()},CHILD:function(m){if(m[1]==="nth"){if(!m[2]){S.error(m[0])}m[2]=m[2].replace(/^\+|\s*/g,'');var a=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(m[2]==="even"&&"2n"||m[2]==="odd"&&"2n+1"||!/\D/.test(m[2])&&"0n+"+m[2]||m[2]);m[2]=(a[1]+(a[2]||1))-0;m[3]=a[3]-0}else if(m[2]){S.error(m[0])}m[0]=f++;return m},ATTR:function(m,a,i,b,j,l){var A=m[1]=m[1].replace(r,"");if(!l&&E.attrMap[A]){m[1]=E.attrMap[A]}m[4]=(m[4]||m[5]||"").replace(r,"");if(m[2]==="~="){m[4]=" "+m[4]+" "}return m},PSEUDO:function(m,a,i,b,j){if(m[1]==="not"){if((c.exec(m[3])||"").length>1||/^\w/.test(m[3])){m[3]=S(m[3],null,null,a)}else{var l=S.filter(m[3],a,i,true^j);if(!i){b.push.apply(b,l)}return false}}else if(E.match.POS.test(m[0])||E.match.CHILD.test(m[0])){return true}return m},POS:function(m){m.unshift(true);return m}},filters:{enabled:function(a){return a.disabled===false&&a.type!=="hidden"},disabled:function(a){return a.disabled===true},checked:function(a){return a.checked===true},selected:function(a){if(a.parentNode){a.parentNode.selectedIndex}return a.selected===true},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,i,m){return!!S(m[3],a).length},header:function(a){return(/h\d/i).test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),s=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===s&&(b===s||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return(/input|select|textarea|button/i).test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,i){return i===0},last:function(a,i,m,b){return i===b.length-1},even:function(a,i){return i%2===0},odd:function(a,i){return i%2===1},lt:function(a,i,m){return i<m[3]-0},gt:function(a,i,m){return i>m[3]-0},nth:function(a,i,m){return m[3]-0===i},eq:function(a,i,m){return m[3]-0===i}},filter:{PSEUDO:function(a,m,i,b){var A=m[1],B=E.filters[A];if(B){return B(a,i,m,b)}else if(A==="contains"){return(a.textContent||a.innerText||o([a])||"").indexOf(m[3])>=0}else if(A==="not"){var C=m[3];for(var j=0,l=C.length;j<l;j++){if(C[j]===a){return false}}return true}else{S.error(A)}},CHILD:function(a,m){var b,l,i,j,A,B,C,s=m[1],D=a;switch(s){case"only":case"first":while((D=D.previousSibling)){if(D.nodeType===1){return false}}if(s==="first"){return true}D=a;case"last":while((D=D.nextSibling)){if(D.nodeType===1){return false}}return true;case"nth":b=m[2];l=m[3];if(b===1&&l===0){return true}i=m[0];j=a.parentNode;if(j&&(j[d]!==i||!a.nodeIndex)){B=0;for(D=j.firstChild;D;D=D.nextSibling){if(D.nodeType===1){D.nodeIndex=++B}}j[d]=i}C=a.nodeIndex-l;if(b===0){return C===0}else{return(C%b===0&&C/b>=0)}}},ID:function(a,m){return a.nodeType===1&&a.getAttribute("id")===m},TAG:function(a,m){return(m==="*"&&a.nodeType===1)||!!a.nodeName&&a.nodeName.toLowerCase()===m},CLASS:function(a,m){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(m)>-1},ATTR:function(a,m){var b=m[1],i=S.attr?S.attr(a,b):E.attrHandle[b]?E.attrHandle[b](a):a[b]!=null?a[b]:a.getAttribute(b),j=i+"",s=m[2],l=m[4];return i==null?s==="!=":!s&&S.attr?i!=null:s==="="?j===l:s==="*="?j.indexOf(l)>=0:s==="~="?(" "+j+" ").indexOf(l)>=0:!l?j&&i!==false:s==="!="?j!==l:s==="^="?j.indexOf(l)===0:s==="$="?j.substr(j.length-l.length)===l:s==="|="?j===l||j.substr(0,l.length+1)===l+"-":false},POS:function(a,m,i,b){var j=m[2],l=E.setFilters[j];if(l){return l(a,i,m,b)}}}};var p=E.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var s in E.match){E.match[s]=new RegExp(E.match[s].source+(/(?![^\[]*\])(?![^\(]*\))/.source));E.leftMatch[s]=new RegExp(/(^(?:.|\r|\n)*?)/.source+E.match[s].source.replace(/\\(\d+)/g,q))}E.match.globalPOS=p;var u=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType}catch(e){u=function(a,b){var i=0,j=b||[];if(t.call(a)==="[object Array]"){Array.prototype.push.apply(j,a)}else{if(typeof a.length==="number"){for(var l=a.length;i<l;i++){j.push(a[i])}}else{for(;a[i];i++){j.push(a[i])}}}return j}}var v,w;if(document.documentElement.compareDocumentPosition){v=function(a,b){if(a===b){h=true;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1}return a.compareDocumentPosition(b)&4?-1:1}}else{v=function(a,b){if(a===b){h=true;return 0}else if(a.sourceIndex&&b.sourceIndex){return a.sourceIndex-b.sourceIndex}var j,l,m=[],A=[],B=a.parentNode,C=b.parentNode,D=B;if(B===C){return w(a,b)}else if(!B){return-1}else if(!C){return 1}while(D){m.unshift(D);D=D.parentNode}D=C;while(D){A.unshift(D);D=D.parentNode}j=m.length;l=A.length;for(var i=0;i<j&&i<l;i++){if(m[i]!==A[i]){return w(m[i],A[i])}}return i===j?w(a,A[i],-1):w(m[i],b,1)};w=function(a,b,i){if(a===b){return i}var j=a.nextSibling;while(j){if(j===b){return-1}j=j.nextSibling}return 1}}(function(){var a=document.createElement("div"),i="script"+(new Date()).getTime(),b=document.documentElement;a.innerHTML="<a name='"+i+"'/>";b.insertBefore(a,b.firstChild);if(document.getElementById(i)){E.find.ID=function(j,l,A){if(typeof l.getElementById!=="undefined"&&!A){var m=l.getElementById(j[1]);return m?m.id===j[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===j[1]?[m]:undefined:[]}};E.filter.ID=function(j,m){var l=typeof j.getAttributeNode!=="undefined"&&j.getAttributeNode("id");return j.nodeType===1&&l&&l.nodeValue===m}}b.removeChild(a);b=a=null})();(function(){var a=document.createElement("div");a.appendChild(document.createComment(""));if(a.getElementsByTagName("*").length>0){E.find.TAG=function(m,b){var j=b.getElementsByTagName(m[1]);if(m[1]==="*"){var l=[];for(var i=0;j[i];i++){if(j[i].nodeType===1){l.push(j[i])}}j=l}return j}}a.innerHTML="<a href='#'></a>";if(a.firstChild&&typeof a.firstChild.getAttribute!=="undefined"&&a.firstChild.getAttribute("href")!=="#"){E.attrHandle.href=function(b){return b.getAttribute("href",2)}}a=null})();if(document.querySelectorAll){(function(){var a=S,b=document.createElement("div"),i="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(b.querySelectorAll&&b.querySelectorAll(".TEST").length===0){return}S=function(l,m,A,B){m=m||document;if(!B&&!S.isXML(m)){var C=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(l);if(C&&(m.nodeType===1||m.nodeType===9)){if(C[1]){return u(m.getElementsByTagName(l),A)}else if(C[2]&&E.find.CLASS&&m.getElementsByClassName){return u(m.getElementsByClassName(C[2]),A)}}if(m.nodeType===9){if(l==="body"&&m.body){return u([m.body],A)}else if(C&&C[3]){var D=m.getElementById(C[3]);if(D&&D.parentNode){if(D.id===C[3]){return u([D],A)}}else{return u([],A)}}try{return u(m.querySelectorAll(l),A)}catch(F){}}else if(m.nodeType===1&&m.nodeName.toLowerCase()!=="object"){var G=m,H=m.getAttribute("id"),I=H||i,J=m.parentNode,K=/^\s*[+~]/.test(l);if(!H){m.setAttribute("id",I)}else{I=I.replace(/'/g,"\\$&")}if(K&&J){m=m.parentNode}try{if(!K||J){return u(m.querySelectorAll("[id='"+I+"'] "+l),A)}}catch(L){}finally{if(!H){G.removeAttribute("id")}}}}return a(l,m,A,B)};for(var j in a){S[j]=a[j]}b=null})()}(function(){var a=document.documentElement,m=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(m){var b=!m.call(document.createElement("div"),"div"),i=false;try{m.call(document.documentElement,"[test!='']:sizzle")}catch(j){i=true}S.matchesSelector=function(l,A){A=A.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!S.isXML(l)){try{if(i||!E.match.PSEUDO.test(A)&&!/!=/.test(A)){var B=m.call(l,A);if(B||!b||l.document&&l.document.nodeType!==11){return B}}}catch(e){}}return S(A,null,null,[l]).length>0}}})();(function(){var a=document.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!a.getElementsByClassName||a.getElementsByClassName("e").length===0){return}a.lastChild.className="e";if(a.getElementsByClassName("e").length===1){return}E.order.splice(1,0,"CLASS");E.find.CLASS=function(m,b,i){if(typeof b.getElementsByClassName!=="undefined"&&!i){return b.getElementsByClassName(m[1])}};a=null})();function x(a,b,j,m,A,B){for(var i=0,l=m.length;i<l;i++){var C=m[i];if(C){var D=false;C=C[a];while(C){if(C[d]===j){D=m[C.sizset];break}if(C.nodeType===1&&!B){C[d]=j;C.sizset=i}if(C.nodeName.toLowerCase()===b){D=C;break}C=C[a]}m[i]=D}}}function y(a,b,j,m,A,B){for(var i=0,l=m.length;i<l;i++){var C=m[i];if(C){var D=false;C=C[a];while(C){if(C[d]===j){D=m[C.sizset];break}if(C.nodeType===1){if(!B){C[d]=j;C.sizset=i}if(typeof b!=="string"){if(C===b){D=true;break}}else if(S.filter(b,[C]).length>0){D=C;break}}C=C[a]}m[i]=D}}}if(document.documentElement.contains){S.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true)}}else if(document.documentElement.compareDocumentPosition){S.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}}else{S.contains=function(){return false}}S.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":false};var z=function(a,b,j){var m,A=[],B="",C=b.nodeType?[b]:b;while((m=E.match.PSEUDO.exec(a))){B+=m[0];a=a.replace(E.match.PSEUDO,"")}a=E.relative[a]?a+"*":a;for(var i=0,l=C.length;i<l;i++){S(a,C[i],A,j)}return S.filter(B,A)};window.tinymce.dom.Sizzle=S})();