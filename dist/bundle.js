!function(e){var t={};function r(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(o,i,function(t){return e[t]}.bind(null,i));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){e.exports=function(){function e(e){var t=this._getSettings(e);if(this.notFoundHandler=t.page404,this.mode=window.history&&window.history.pushState?t.mode:"hash",this.root="/"===t.root?"/":"/"+this._trimSlashes(t.root)+"/",this.beforeHook=t.hooks.before,this.securityHook=t.hooks.secure,this.routes=[],t.routes&&t.routes.length>0){var r=this;t.routes.forEach(function(e){r.add(e.rule,e.handler,e.options)})}return this._pageState=null,this._currentPage=null,this._skipCheck=!1,this._action=null,"hash"===this.mode&&(this._historyStack=[],this._historyIdx=0,this._historyState="add"),this}return e.Page=function(e,t,r,o,i){this.uri=e||"",this.query=t||{},this.params=r||[],this.state=o||null,this.options=i||{}},e.prototype._getSettings=function(e){var t={},r={routes:[],mode:"history",root:"/",hooks:{before:function(){},secure:function(){return!0}},page404:function(e){console.error({page:e,message:"404. Page not found"})}};return e=e||{},["routes","mode","root","page404"].forEach(function(o){t[o]=e[o]||r[o]}),t.hooks=Object.assign({},r.hooks,e.hooks||{}),t},e.prototype._getHistoryFragment=function(){var e=decodeURI(window.location.pathname);return"/"!==this.root&&(e=e.replace(this.root,"")),this._trimSlashes(e)},e.prototype._getHashFragment=function(){var e=window.location.hash.substr(1).replace(/(\?.*)$/,"");return this._trimSlashes(e)},e.prototype._getFragment=function(){return"history"===this.mode?this._getHistoryFragment():this._getHashFragment()},e.prototype._trimSlashes=function(e){return"string"!=typeof e?"":e.toString().replace(/\/$/,"").replace(/^\//,"")},e.prototype._page404=function(t){this._currentPage=new e.Page(t),this.notFoundHandler(t)},e.prototype._parseRouteRule=function(e){if("string"!=typeof e)return e;var t=this._trimSlashes(e).replace(/([\\\/\-\_\.])/g,"\\$1").replace(/\{[a-zA-Z]+\}/g,"(:any)").replace(/\:any/g,"[\\w\\-\\_\\.]+").replace(/\:word/g,"[a-zA-Z]+").replace(/\:num/g,"\\d+");return new RegExp("^"+t+"$","i")},e.prototype._parseQuery=function(e){var t={};return"string"!=typeof e?t:("?"===e[0]&&(e=e.substr(1)),this._queryString=e,e.split("&").forEach(function(e){var r=e.split("=");""!==r[0]&&(void 0===r[1]&&(r[1]=!0),t[decodeURIComponent(r[0])]=r[1])}),t)},e.prototype._getHistoryQuery=function(){return this._parseQuery(window.location.search)},e.prototype._getHashQuery=function(){var e=window.location.hash.indexOf("?"),t=-1!==e?window.location.hash.substr(e):"";return this._parseQuery(t)},e.prototype._getQuery=function(){return"history"===this.mode?this._getHistoryQuery():this._getHashQuery()},e.prototype.add=function(e,t,r){return this.routes.push({rule:this._parseRouteRule(e),handler:t,options:r}),this},e.prototype.remove=function(e){var t=this;return"string"==typeof e&&(e=this._parseRouteRule(e).toString()),this.routes.some(function(r,o){return(r.handler===e||r.rule.toString()===e)&&(t.routes.splice(o,1),!0)}),this},e.prototype.reset=function(){return this.routes=[],this.mode=null,this.root="/",this._pageState={},this.removeUriListener(),this},e.prototype._pushHistory=function(){var e=this._getFragment();"hash"===this.mode&&("add"===this._historyState&&(this._historyIdx!==this._historyStack.length-1&&this._historyStack.splice(this._historyIdx+1),this._historyStack.push({path:e,state:this._pageState}),this._historyIdx=this._historyStack.length-1),this._historyState="add")},e.prototype._unloadCallback=function(e){var t;return this._skipCheck?!e||Promise.resolve(!0):this._currentPage&&this._currentPage.options&&this._currentPage.options.unloadCb?(t=this._currentPage.options.unloadCb(this._currentPage,e),!e||t instanceof Promise?t:t?Promise.resolve(t):Promise.reject(t)):!e||Promise.resolve(!0)},e.prototype._findRoute=function(){var t=this,r=this._getFragment();return this.routes.some(function(o){var i=r.match(o.rule);if(i){i.shift();var n=t._getQuery(),s=new e.Page(r,n,i,t._pageState,o.options);return!!t.securityHook(s)&&(t._currentPage=s,t._skipCheck?(t._skipCheck=!1,!0):(t.beforeHook(s),o.handler.apply(s,i),t._pageState=null,window.onbeforeunload=function(e){if(!t._unloadCallback(!1))return e.returnValue=!0,!0},!0))}return!1})},e.prototype._treatAsync=function(){var e;(e=this._currentPage.options.unloadCb(this._currentPage,!0))instanceof Promise||(e=e?Promise.resolve(e):Promise.reject(e)),e.then(this._processUri.bind(this)).catch(this._resetState.bind(this))},e.prototype._resetState=function(){this._skipCheck=!0,this.navigateTo(this._current,this._currentPage.state,!0)},e.prototype._processUri=function(){var e=this._getFragment();this._current=e,this._pushHistory(),this._findRoute.call(this)||this._page404(e)},e.prototype.check=function(){return this._skipCheck?this:(this._currentPage&&this._currentPage.options&&this._currentPage.options.unloadCb?this._treatAsync():this._processUri(),this)},e.prototype.addUriListener=function(){return"history"===this.mode?window.onpopstate=this.check.bind(this):window.onhashchange=this.check.bind(this),this},e.prototype.removeUriListener=function(){return window.onpopstate=null,window.onhashchange=null,this},e.prototype.redirectTo=function(e,t,r){return e=this._trimSlashes(e)||"",this._pageState=t||null,this._skipCheck=!!r,"history"===this.mode?(history.replaceState(t,null,this.root+this._trimSlashes(e)),this.check()):(this._historyIdx--,window.location.hash=e,this)},e.prototype.navigateTo=function(e,t,r){return e=this._trimSlashes(e)||"",this._pageState=t||null,this._skipCheck=!!r,"history"===this.mode?(history.pushState(t,null,this.root+this._trimSlashes(e)),this.check()):(window.location.hash=e,this)},e.prototype.refresh=function(){if(!this._currentPage)return this;var e=this._currentPage.uri+"?"+this._queryString;return this.navigateTo(e,this._currentPage.state)},e.prototype.back=function(){return"history"===this.mode?(window.history.back(),this):this.go(this._historyIdx-1)},e.prototype.forward=function(){return"history"===this.mode?(window.history.forward(),this):this.go(this._historyIdx+1)},e.prototype.go=function(e){if("history"===this.mode)return window.history.go(e),this;var t=this._historyStack[e];return t?(this._historyIdx=e,this._historyState="hold",this.navigateTo(t.path,t.state)):this},e}()},function(e,t,r){"use strict";r.r(t);var o=r(0);function i(e,t,r){$.ajax({url:"http://api.deezer.com/track/"+e+"&output=jsonp",dataType:"jsonp"}).done(t).fail(r)}function n(e,t){let r=document.createElement("div");r.className="container-music";let o=[],i=document.createElement("img");i.src=e.album.cover_small,i.className="right-img",o.push(i);let n=document.createElement("div");n.innerHTML=e.title.substring(0,21),n.className="title",o.push(n);let s=document.createElement("div");s.innerHTML=e.artist.name.substring(0,21),o.push(s);let a=document.createElement("div");a.innerHTML=e.album.title.substring(0,21),a.className="album",o.push(a);let u=document.createElement("div");u.innerHTML="   <audio controls='controls'><source src='"+e.preview+"' type='audio/mp3' />Votre navigateur n'est pas compatible</audio>",u.children[0].preload="none",u.children[0].addEventListener("playing",function(){let e=this;$.each($("audio"),function(){e!==this&&(this.pause(),this.currentTime=0)})}),o.push(u);let h=document.createElement("input");h.type="button",h.addEventListener("click",function(){"Ajouter aux favoris"==this.value?(t.push(e.id),localStorage.setItem("myMusicsAPIDeezer",t),this.value="Retirer des favoris"):(t.splice(t.indexOf(e.id),1),this.value="Ajouter aux favoris",0==t.length?localStorage.removeItem("myMusicsAPIDeezer"):localStorage.setItem("myMusicsAPIDeezer",t)),this.classList.toggle("favorite")}),t.includes(e.id)?(h.value="Retirer des favoris",h.className="favorite"):h.value="Ajouter aux favoris",o.push(h);for(const e in o)r.appendChild(o[e]);return r}function s(e,t,r){$(".div-error").remove();let o=document.createElement("div");switch(e){case"warning":o.className="div-warning";break;case"error":o.className="div-error"}return o.innerHTML="  <h1> "+t+" </h1><p> "+r+"</p>",o}class a{constructor(){this.view="search.html"}init(){let e=document.getElementById("api-deezer"),t=document.getElementById("searchMusicForm"),r=document.getElementById("maRecherche"),o=document.getElementById("tri"),i=[];null!==localStorage.getItem("myMusicsAPIDeezer")&&(i=localStorage.getItem("myMusicsAPIDeezer").split(",").map(Number)),$("#randomButton").remove(),t.addEventListener("submit",function(t){var a,u,h,c;t.preventDefault(),$(".container-music").remove(),a=r.value,u=o.value,h=function(t){if($("#api-deezer div").remove(),void 0!==t.data&&0==t.data.length)e.appendChild(s("warning","Introuvable","Veillez à ne pas mettre n'importe quoi. 🤢"));else for(const r in t.data)e.appendChild(n(t.data[r],i))},c=function(){$("#api-deezer div").remove(),e.appendChild(s("error","Erreur","Une erreur est survenue lors de la requête, vérifier votre connexion internet. Si le problème persiste veuillez joindre le support.</p>"))},$.ajax({url:"https://api.deezer.com/search?strict=on&q="+a+"&order="+u+"&output=jsonp",dataType:"jsonp"}).done(h).fail(c)})}}class u{constructor(){this.view="favorites.html"}init(){let e=document.getElementById("api-deezer"),t=[];if(null!==localStorage.getItem("myMusicsAPIDeezer")&&(t=localStorage.getItem("myMusicsAPIDeezer").split(",").map(Number)),$(".container-music").remove(),$("#randomButton").remove(),0==t.length){let t=document.createElement("div");t.className="noFavoritesMusics",t.innerHTML="<p>Vous n'avez pas encore ajouté de favoris.</p>",e.appendChild(t)}else for(const r in t)i(t[r],function(r){$(".div-error").remove(),e.appendChild(n(r,t))},function(){e.appendChild(s("error","Erreur","Une erreur est survenue lors de la requête, vérifier votre connexion internet. Si le problème persiste veuillez joindre le support.</p>"))})}}class h{constructor(){this.view="home.html"}init(){let e,t=document.getElementById("api-deezer"),r=[];function o(e,r){$(".container-music").remove(),$(".div-error").remove();let o=Math.floor(Math.random()*Math.floor(e.length));if(void 0!==r&&e.length>1)for(;o==r;)o=Math.floor(Math.random()*Math.floor(e.length));return i(e[o],function(r){t.appendChild(n(r,e))},function(){t.appendChild(s("error","Erreur","Une erreur est survenue lors de la requête, vérifier votre connexion internet. Si le problème persiste veuillez joindre le support.</p>"))}),o}if(null!==localStorage.getItem("myMusicsAPIDeezer")&&(r=localStorage.getItem("myMusicsAPIDeezer").split(",").map(Number)),$("#randomButton").remove(),r.length<1)$("#randomButton").remove(),0==r.length&&($("#randomButton").remove(),$(".container-music").remove());else{o(r);let i=document.createElement("input");i.type="button",i.id="randomButton",i.value="Changer de musique aléatoirement",i.addEventListener("click",function(){e=o(r,e)}),t.after(i)}}}let c=new(r.n(o).a)({mode:"hash"});c.add("/",function(e){p(new h)}),c.add("/Search",function(){p(new a)}),c.add("/Favorites",function(e){p(new u)}),c.addUriListener(),c.check();const l=document.getElementById("api-deezer");function p(e){return fetch(`../views/${e.view}`).then(e=>e.text()).then(t=>{l.innerHTML=t,e.init()})}}]);