!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e,n){},function(t,e,n){t.exports=n.p+"favicon.ico"},function(t,e){!function(t,e){"use strict";if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)"isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var n=[];i.prototype.THROTTLE_TIMEOUT=100,i.prototype.POLL_INTERVAL=null,i.prototype.USE_MUTATION_OBSERVER=!0,i.prototype.observe=function(t){if(!this._observationTargets.some(function(e){return e.element==t})){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},i.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},i.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},i.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},i.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},i.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},i.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(r(t,"resize",this._checkForIntersections,!0),r(e,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},i.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},i.prototype._checkForIntersections=function(){var e=this._rootIsInDom(),n=e?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach(function(i){var r=i.element,s=a(r),c=this._rootContainsTarget(r),l=i.entry,u=e&&c&&this._computeTargetAndRootIntersection(r,n),d=i.entry=new o({time:t.performance&&performance.now&&performance.now(),target:r,boundingClientRect:s,rootBounds:n,intersectionRect:u});l?e&&c?this._hasCrossedThreshold(l,d)&&this._queuedEntries.push(d):l&&l.isIntersecting&&this._queuedEntries.push(d):this._queuedEntries.push(d)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},i.prototype._computeTargetAndRootIntersection=function(n,o){if("none"!=t.getComputedStyle(n).display){for(var i,r,s,c,u,d,h,f,m=a(n),p=l(n),v=!1;!v;){var g=null,y=1==p.nodeType?t.getComputedStyle(p):{};if("none"==y.display)return;if(p==this.root||p==e?(v=!0,g=o):p!=e.body&&p!=e.documentElement&&"visible"!=y.overflow&&(g=a(p)),g&&(i=g,r=m,s=void 0,c=void 0,u=void 0,d=void 0,h=void 0,f=void 0,s=Math.max(i.top,r.top),c=Math.min(i.bottom,r.bottom),u=Math.max(i.left,r.left),d=Math.min(i.right,r.right),f=c-s,!(m=(h=d-u)>=0&&f>=0&&{top:s,bottom:c,left:u,right:d,width:h,height:f})))break;p=l(p)}return m}},i.prototype._getRootRect=function(){var t;if(this.root)t=a(this.root);else{var n=e.documentElement,o=e.body;t={top:0,left:0,right:n.clientWidth||o.clientWidth,width:n.clientWidth||o.clientWidth,bottom:n.clientHeight||o.clientHeight,height:n.clientHeight||o.clientHeight}}return this._expandRectByRootMargin(t)},i.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},i.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,o=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==o)for(var i=0;i<this.thresholds.length;i++){var r=this.thresholds[i];if(r==n||r==o||r<n!=r<o)return!0}},i.prototype._rootIsInDom=function(){return!this.root||c(e,this.root)},i.prototype._rootContainsTarget=function(t){return c(this.root||e,t)},i.prototype._registerInstance=function(){n.indexOf(this)<0&&n.push(this)},i.prototype._unregisterInstance=function(){var t=n.indexOf(this);-1!=t&&n.splice(t,1)},t.IntersectionObserver=i,t.IntersectionObserverEntry=o}function o(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,o=this.intersectionRect,i=o.width*o.height;this.intersectionRatio=n?Number((i/n).toFixed(4)):this.isIntersecting?1:0}function i(t,e){var n,o,i,r=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(r.root&&1!=r.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(n=this._checkForIntersections.bind(this),o=this.THROTTLE_TIMEOUT,i=null,function(){i||(i=setTimeout(function(){n(),i=null},o))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(r.rootMargin),this.thresholds=this._initThresholds(r.threshold),this.root=r.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function r(t,e,n,o){"function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function s(t,e,n,o){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function a(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function c(t,e){for(var n=e;n;){if(n==t)return!0;n=l(n)}return!1}function l(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}}(window,document)},function(t,e,n){"use strict";n.r(e);n(0),n(1);function o(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},r=o([{firstname:"camila",lastname:"lamarca",backgroundPosition:"center",desktopSize:"55%"},{firstname:"carolina",lastname:"zancolli",backgroundPosition:"50% 30%",desktopSize:"50%"},{firstname:"claudia",lastname:"cortinez",backgroundPosition:"center",desktopSize:"50%"},{firstname:"florencia",lastname:"walter",backgroundPosition:"center",desktopSize:"60%"},{firstname:"samuel",lastname:"lasso",backgroundPosition:"60% 70%",desktopSize:"60%"},{firstname:"sol",lastname:"pochat",backgroundPosition:"center",desktopSize:"60%"}]).sort(function(){return Math.random()-.5});var s=window,a=4,c=.001,l=1e-7,u=10,d=11,h=1/(d-1),f="Float32Array"in s;function m(t,e){return 1-3*e+3*t}function p(t,e){return 3*e-6*t}function v(t){return 3*t}function g(t,e,n){return((m(e,n)*t+p(e,n))*t+v(e))*t}function y(t,e,n){return 3*m(e,n)*t*t+2*p(e,n)*t+v(e)}function _(t,e,n){var o,i,r=0;do{(o=g(i=e+(n-e)/2,mX1,mX2)-t)>0?n=i:e=i}while(Math.abs(o)>l&&++r<u);return i}function w(t,e,n,o){if(4!==arguments.length)throw new Error("BezierEasing requires 4 arguments.");for(var i=0;i<4;++i)if("number"!=typeof arguments[i]||isNaN(arguments[i])||!isFinite(arguments[i]))throw new Error("BezierEasing arguments should be integers.");if(t<0||t>1||n<0||n>1)throw new Error("BezierEasing x values must be in [0, 1] range.");var r=f?new Float32Array(d):new Array(d);function s(e){for(var o=0,i=1,s=d-1;i!=s&&r[i]<=e;++i)o+=h;var l=o+(e-r[--i])/(r[i+1]-r[i])*h,u=y(l,t,n);return u>=c?function(e,o){for(var i=0;i<a;++i){var r=y(o,t,n);if(0===r)return o;o-=(g(o,t,n)-e)/r}return o}(e,l):0===u?l:_(e,o,o+h)}var l=!1;function u(){l=!0,t==e&&n==o||function(){for(var e=0;e<d;++e)r[e]=g(e*h,t,n)}()}var m=function(i){return l||u(),t===e&&n===o?i:0===i?0:1===i?1:g(s(i),e,o)};m.getControlPoints=function(){return[{x:t,y:e},{x:n,y:o}]};var p=[t,e,n,o],v="BezierEasing("+p+")";m.toString=function(){return v};var w="cubic-bezier("+p+")";return m.toCSS=function(){return w},m}w.css={ease:w(.25,.1,.25,1),linear:w(0,0,1,1),"ease-in":w(.42,0,1,1),"ease-out":w(0,0,.58,1),"ease-in-out":w(.42,0,.58,1)};var b,E,I,T,L,k,S,R,x=w;if(n(2),window.matchMedia("(display-mode: standalone)").matches||!0===window.navigator.standalone){var O=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(O,"px"))}else{var q=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(q,"px")),window.addEventListener("resize",function(){var t=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(t,"px"))})}b="",E="",I="",T="",L=document.querySelector(".slider__content"),k=document.querySelector(".artist"),S=document.querySelector(".nav"),R=document.querySelector(".info__artists"),r.forEach(function(t,e){b+='<div id="slide'.concat(e,'" data-id="').concat(e,'" class="slide ').concat(0==e?"show-slide":"",'">\n                    <div class="slide__img" style="background-image:url(\'../img/').concat(t.firstname," ").concat(t.lastname,'.png\');">\n                        <div class="slide__img slide__img--desktop" style="background-image:url(\'../img/').concat(t.firstname," ").concat(t.lastname,".png') !important;width:").concat(t.desktopSize,';">\n                        </div>\n                    </div>\n                    <a href="../assets/').concat(i(t.firstname)," ").concat(i(t.lastname),'.pdf" class="slide__artist slide__artist--mobile" download>\n                        ').concat(t.firstname.toUpperCase()," ").concat(t.lastname.toUpperCase(),'\n                    </a>\n                    <a href="../assets/').concat(i(t.firstname)," ").concat(i(t.lastname),'.pdf" class="slide__portfolio slide__portfolio--mobile" download>\n                        Portfolio\n                    </a>\n                </div > '),E+="<div class='artist__item' id='artist".concat(e,"'>\n                        <a href=\"../assets/").concat(i(t.firstname)," ").concat(i(t.lastname),'.pdf" class="artist__name" download>\n                        ').concat(t.firstname.toUpperCase()," ").concat(t.lastname.toUpperCase(),'\n                        </a>\n                        <a href="../assets/').concat(i(t.firstname)," ").concat(i(t.lastname),'.pdf" class="artist__portfolio" download>\n                            Portfolio\n                        </a>\n                    </div>'),I+="<a href='#slide".concat(e,"' class='nav__item'>\n                        ").concat(i(t.lastname),"\n                   </a>"),T+='<a href="../assets/'.concat(i(t.firstname)," ").concat(i(t.lastname),'.pdf" class="info__second-page-text" download>\n                        ').concat(i(t.firstname)," ").concat(i(t.lastname),"\n                    </a>")}),L.innerHTML=b,k.innerHTML=E,S.innerHTML=I,R.innerHTML='<h2 class="info__header">\n                            Artists\n                        </h2>\n                        '.concat(T),window.addEventListener("load",function(){var t,e,n=document.querySelectorAll(".logo__wrapper"),o=document.querySelector(".container"),i=document.querySelector(".slider__content"),s=document.querySelector(".slider"),a=document.querySelectorAll(".slide"),c=0,l=0,u=document.querySelector(".d__cube"),d=document.querySelector(".d__cube-face--back"),h=document.querySelector(".slider__wrapper"),f=document.querySelector(".container__background--1"),m=document.querySelector(".container__background--2"),p=document.querySelector(".container__background--3"),v=document.querySelector(".intro"),g=document.querySelectorAll(".nav__item"),y=!0,_=document.querySelectorAll(".artist__item"),w=!1,b=(window.matchMedia("(orientation: landscape)"),window.matchMedia("(orientation: portrait)"),window.matchMedia("(max-width: 1024px),(min-device-width: 1024px) and (max-device-width: 1024px)\n    ,(device-width: 1366px) and (device-height: 1024px) "));function E(){v.style.animation="initial",document.documentElement.style.setProperty("--edge-width","5px"),v.removeEventListener("animationend",E)}function I(){clearInterval(t),i.classList.add("slider--slides-visible"),window.removeEventListener("click",I),window.removeEventListener("touchstart",I),i.removeEventListener("wheel",I)}function T(t){g.forEach(function(t){return t.classList.remove("scrolled")}),t.classList.add("scrolled")}function L(t){var n=_[c];n.style.zIndex="-1",S({draw:function(t){n.style.opacity=1-t}}),_.forEach(function(t){t.style.opacity="0",t.style.zIndex="-1"});var o=_[t];o.style.zIndex="1",clearTimeout(e),e=setTimeout(function(){S({draw:function(t){o.style.opacity=t}})},850)}!function(){if(b.matches)document.querySelector(".show-slide").style.animation="initial",v.style.animation="initial",p.style.animation="initial",document.documentElement.style.setProperty("--edge-width","5px"),P();else{v.addEventListener("animationend",E);var t=document.querySelector(".show-slide");t.addEventListener("animationstart",function(){M(0)}),t.addEventListener("animationend",function(){t.style.animation="initial",t.style.opacity="1",P(),setTimeout(function(){s.classList.add("slider--big"),u.classList.add("d__cube--big")},1850)})}window.addEventListener("click",I),window.addEventListener("touchstart",I),i.addEventListener("wheel",I)}(),n.forEach(function(t){return t.addEventListener("click",function(t){o.classList.toggle("show-info")})}),window.addEventListener("orientationchange",function(){l=Number.parseFloat(i.scrollTop/i.scrollHeight).toFixed(2),i.style.opacity="0",setTimeout(function(){switch(window.orientation){case 90:case-90:case 0:t=i.scrollHeight*parseFloat(l),TweenLite.to(i,0,{scrollTo:t}),i.style.opacity="1"}var t},200)}),g.forEach(function(t){t.addEventListener("click",function(e){if(TweenLite){e.preventDefault(),I();var n=parseInt(t.href.split("#slide")[1]);w=!0,TweenLite.to(i,1,{scrollTo:n*i.clientHeight,onComplete:function(){return w=!1}}),T(t),q(n),L(n)}})});var k=new IntersectionObserver(function(t,e){t.forEach(function(t){var e=document.querySelector(".show-slide");if(t.intersectionRatio>=.6){var n=parseInt(t.target.dataset.id),o=a[n];if(o.classList.contains("show-slide")||(e.classList.remove("show-slide"),o.classList.add("show-slide"),q(n)),!w)T(document.querySelector("[href='#slide".concat(n,"']"))),L(n);c=n}})},{threshold:.6});function S(t){var e=performance.now(),n=x(.455,.03,.515,.955);requestAnimationFrame(function o(i){var r=(i-e)/850;r>1&&(r=1);var s=function(t){return n(t)}(r);t.draw(s),r<1&&requestAnimationFrame(o)})}function R(t){var e=document.querySelector(".show-slide"),n=parseInt(e.dataset.id);if(e){var o=n>0?n-1:a.length-1,r=a[o];e.classList.remove("show-slide"),S({draw:function(t){e.style.opacity=1-t}}),TweenLite&&setTimeout(function(){TweenLite.to(i,0,{scrollTo:i.clientHeight*o}),S({draw:function(t){r.style.opacity=t}})},850),r.classList.add("show-slide"),q(o)}}function O(t){var e=document.querySelector(".show-slide"),n=parseInt(e.dataset.id);if(e){var o=n<a.length-1?n+1:0,r=a[o];e.classList.remove("show-slide"),S({draw:function(t){e.style.opacity=1-t}}),TweenLite&&setTimeout(function(){TweenLite.to(i,0,{scrollTo:i.clientHeight*o}),S({draw:function(t){r.style.opacity=t}})},850),r.classList.add("show-slide"),q(o)}}function q(t){u.classList.contains("d__cube--big")||document.documentElement.clientWidth==d.clientWidth||setTimeout(M,850,t)}function M(t){var e=r[t],n="url('../img/".concat(e.firstname," ").concat(e.lastname,".png')");y?(m.style.backgroundImage=n,m.style.backgroundPosition=e.backgroundPosition,f.style.opacity="0",m.style.opacity="1"):(f.style.backgroundImage=n,f.style.backgroundPosition=e.backgroundPosition,f.style.opacity="1",m.style.opacity="0"),y=!y}function P(){t=setInterval(function(){O()},4e3)}function A(){clearInterval(t)}function z(){if(s.classList.toggle("slider--big"),u.classList.toggle("d__cube--big"),!u.classList.contains("d__cube--big")&&document.documentElement.clientWidth!=d.clientWidth){var t=document.querySelector(".show-slide");M(parseInt(t.dataset.id))}}a.forEach(function(t){return k.observe(t)}),h.addEventListener("click",z),window.addEventListener("keydown",function(t){if(!t.defaultPrevented){switch(t.key){case"Up":R(),A();case"ArrowUp":R(),A();break;case"Down":O(),A();case"ArrowDown":O(),A();break;case" ":z(),A();break;case"Esc":A(),z();case"Escape":A(),z();break;default:return}event.preventDefault()}},!0)})}]);
//# sourceMappingURL=script.js.map