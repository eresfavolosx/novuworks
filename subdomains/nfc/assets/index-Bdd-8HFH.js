(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const Gi=()=>{};var un={};const Xn=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},qi=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],a=t[n++],o=t[n++],l=((s&7)<<18|(r&63)<<12|(a&63)<<6|o&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],a=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|a&63)}}return e.join("")},Qn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],a=s+1<t.length,o=a?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,p=r>>2,h=(r&3)<<4|o>>4;let f=(o&15)<<2|c>>6,w=c&63;l||(w=64,a||(f=64)),i.push(n[p],n[h],n[f],n[w])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Xn(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):qi(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],o=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||o==null||c==null||h==null)throw new Ki;const f=r<<2|o>>4;if(i.push(f),c!==64){const w=o<<4&240|c>>2;if(i.push(w),h!==64){const E=c<<6&192|h;i.push(E)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Ki extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ji=function(t){const e=Xn(t);return Qn.encodeByteArray(e,!0)},Zn=function(t){return Ji(t).replace(/\./g,"")},ei=function(t){try{return Qn.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Yi(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}const Xi=()=>Yi().__FIREBASE_DEFAULTS__,Qi=()=>{if(typeof process>"u"||typeof un>"u")return;const t=un.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Zi=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ei(t[1]);return e&&JSON.parse(e)},Vt=()=>{try{return Gi()||Xi()||Qi()||Zi()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},es=t=>Vt()?.emulatorHosts?.[t],ti=()=>Vt()?.config,ni=t=>Vt()?.[`_${t}`];class ts{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}function R(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ns(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(R())}function is(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ss(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function rs(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function as(){const t=R();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function os(){try{return typeof indexedDB=="object"}catch{return!1}}function cs(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}const ls="FirebaseError";class de extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=ls,Object.setPrototypeOf(this,de.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,We.prototype.create)}}class We{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],a=r?ds(r,i):"Error",o=`${this.serviceName}: ${a} (${s}).`;return new de(s,o,i)}}function ds(t,e){return t.replace(us,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const us=/\{\$([^}]+)}/g;function hs(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Ce(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],a=e[s];if(hn(r)&&hn(a)){if(!Ce(r,a))return!1}else if(r!==a)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function hn(t){return t!==null&&typeof t=="object"}function ze(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function ps(t,e){const n=new fs(t,e);return n.subscribe.bind(n)}class fs{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let s;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");gs(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:i},s.next===void 0&&(s.next=Et),s.error===void 0&&(s.error=Et),s.complete===void 0&&(s.complete=Et);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function gs(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Et(){}function ue(t){return t&&t._delegate?t._delegate:t}function jt(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ms(t){return(await fetch(t,{credentials:"include"})).ok}class Le{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}const pe="[DEFAULT]";class vs{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new ts;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ys(e))try{this.getOrInitializeService({instanceIdentifier:pe})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=pe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=pe){return this.instances.has(e)}getOptions(e=pe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,a]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(r);i===o&&a.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:bs(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=pe){return this.component?this.component.multipleInstances?e:pe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function bs(t){return t===pe?void 0:t}function ys(t){return t.instantiationMode==="EAGER"}class ws{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new vs(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}var y;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(y||(y={}));const _s={debug:y.DEBUG,verbose:y.VERBOSE,info:y.INFO,warn:y.WARN,error:y.ERROR,silent:y.SILENT},Es=y.INFO,Is={[y.DEBUG]:"log",[y.VERBOSE]:"log",[y.INFO]:"info",[y.WARN]:"warn",[y.ERROR]:"error"},ks=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=Is[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ii{constructor(e){this.name=e,this._logLevel=Es,this._logHandler=ks,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?_s[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,y.DEBUG,...e),this._logHandler(this,y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,y.VERBOSE,...e),this._logHandler(this,y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,y.INFO,...e),this._logHandler(this,y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,y.WARN,...e),this._logHandler(this,y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,y.ERROR,...e),this._logHandler(this,y.ERROR,...e)}}const Ts=(t,e)=>e.some(n=>t instanceof n);let pn,fn;function Ss(){return pn||(pn=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Cs(){return fn||(fn=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const si=new WeakMap,Nt=new WeakMap,ri=new WeakMap,It=new WeakMap,Gt=new WeakMap;function Ls(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",a)},r=()=>{n(oe(t.result)),s()},a=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&si.set(n,t)}).catch(()=>{}),Gt.set(e,t),e}function As(t){if(Nt.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",a),t.removeEventListener("abort",a)},r=()=>{n(),s()},a=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",a),t.addEventListener("abort",a)});Nt.set(t,e)}let $t={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Nt.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ri.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return oe(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Ps(t){$t=t($t)}function Rs(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(kt(this),e,...n);return ri.set(i,e.sort?e.sort():[e]),oe(i)}:Cs().includes(t)?function(...e){return t.apply(kt(this),e),oe(si.get(this))}:function(...e){return oe(t.apply(kt(this),e))}}function Ns(t){return typeof t=="function"?Rs(t):(t instanceof IDBTransaction&&As(t),Ts(t,Ss())?new Proxy(t,$t):t)}function oe(t){if(t instanceof IDBRequest)return Ls(t);if(It.has(t))return It.get(t);const e=Ns(t);return e!==t&&(It.set(t,e),Gt.set(e,t)),e}const kt=t=>Gt.get(t);function $s(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const a=indexedDB.open(t,e),o=oe(a);return i&&a.addEventListener("upgradeneeded",l=>{i(oe(a.result),l.oldVersion,l.newVersion,oe(a.transaction),l)}),n&&a.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),o.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),o}const Os=["get","getKey","getAll","getAllKeys","count"],Ds=["put","add","delete","clear"],Tt=new Map;function gn(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Tt.get(e))return Tt.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=Ds.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Os.includes(n)))return;const r=async function(a,...o){const l=this.transaction(a,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(o.shift())),(await Promise.all([c[n](...o),s&&l.done]))[0]};return Tt.set(e,r),r}Ps(t=>({...t,get:(e,n,i)=>gn(e,n)||t.get(e,n,i),has:(e,n)=>!!gn(e,n)||t.has(e,n)}));class xs{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Ms(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Ms(t){return t.getComponent()?.type==="VERSION"}const Ot="@firebase/app",mn="0.14.10";const Q=new ii("@firebase/app"),Us="@firebase/app-compat",Bs="@firebase/analytics-compat",Fs="@firebase/analytics",Hs="@firebase/app-check-compat",Ws="@firebase/app-check",zs="@firebase/auth",Vs="@firebase/auth-compat",js="@firebase/database",Gs="@firebase/data-connect",qs="@firebase/database-compat",Ks="@firebase/functions",Js="@firebase/functions-compat",Ys="@firebase/installations",Xs="@firebase/installations-compat",Qs="@firebase/messaging",Zs="@firebase/messaging-compat",er="@firebase/performance",tr="@firebase/performance-compat",nr="@firebase/remote-config",ir="@firebase/remote-config-compat",sr="@firebase/storage",rr="@firebase/storage-compat",ar="@firebase/firestore",or="@firebase/ai",cr="@firebase/firestore-compat",lr="firebase",dr="12.11.0";const Dt="[DEFAULT]",ur={[Ot]:"fire-core",[Us]:"fire-core-compat",[Fs]:"fire-analytics",[Bs]:"fire-analytics-compat",[Ws]:"fire-app-check",[Hs]:"fire-app-check-compat",[zs]:"fire-auth",[Vs]:"fire-auth-compat",[js]:"fire-rtdb",[Gs]:"fire-data-connect",[qs]:"fire-rtdb-compat",[Ks]:"fire-fn",[Js]:"fire-fn-compat",[Ys]:"fire-iid",[Xs]:"fire-iid-compat",[Qs]:"fire-fcm",[Zs]:"fire-fcm-compat",[er]:"fire-perf",[tr]:"fire-perf-compat",[nr]:"fire-rc",[ir]:"fire-rc-compat",[sr]:"fire-gcs",[rr]:"fire-gcs-compat",[ar]:"fire-fst",[cr]:"fire-fst-compat",[or]:"fire-vertex","fire-js":"fire-js",[lr]:"fire-js-all"};const rt=new Map,hr=new Map,xt=new Map;function vn(t,e){try{t.container.addComponent(e)}catch(n){Q.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Be(t){const e=t.name;if(xt.has(e))return Q.debug(`There were multiple attempts to register component ${e}.`),!1;xt.set(e,t);for(const n of rt.values())vn(n,t);for(const n of hr.values())vn(n,t);return!0}function ai(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function j(t){return t==null?!1:t.settings!==void 0}const pr={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ce=new We("app","Firebase",pr);class fr{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Le("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ce.create("app-deleted",{appName:this._name})}}const Ve=dr;function oi(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Dt,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw ce.create("bad-app-name",{appName:String(s)});if(n||(n=ti()),!n)throw ce.create("no-options");const r=rt.get(s);if(r){if(Ce(n,r.options)&&Ce(i,r.config))return r;throw ce.create("duplicate-app",{appName:s})}const a=new ws(s);for(const l of xt.values())a.addComponent(l);const o=new fr(n,i,a);return rt.set(s,o),o}function gr(t=Dt){const e=rt.get(t);if(!e&&t===Dt&&ti())return oi();if(!e)throw ce.create("no-app",{appName:t});return e}function Ie(t,e,n){let i=ur[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&a.push("and"),r&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Q.warn(a.join(" "));return}Be(new Le(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}const mr="firebase-heartbeat-database",vr=1,Fe="firebase-heartbeat-store";let St=null;function ci(){return St||(St=$s(mr,vr,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Fe)}catch(n){console.warn(n)}}}}).catch(t=>{throw ce.create("idb-open",{originalErrorMessage:t.message})})),St}async function br(t){try{const n=(await ci()).transaction(Fe),i=await n.objectStore(Fe).get(li(t));return await n.done,i}catch(e){if(e instanceof de)Q.warn(e.message);else{const n=ce.create("idb-get",{originalErrorMessage:e?.message});Q.warn(n.message)}}}async function bn(t,e){try{const i=(await ci()).transaction(Fe,"readwrite");await i.objectStore(Fe).put(e,li(t)),await i.done}catch(n){if(n instanceof de)Q.warn(n.message);else{const i=ce.create("idb-set",{originalErrorMessage:n?.message});Q.warn(i.message)}}}function li(t){return`${t.name}!${t.options.appId}`}const yr=1024,wr=30;class _r{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ir(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=yn();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>wr){const s=kr(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Q.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=yn(),{heartbeatsToSend:n,unsentEntries:i}=Er(this._heartbeatsCache.heartbeats),s=Zn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Q.warn(e),""}}}function yn(){return new Date().toISOString().substring(0,10)}function Er(t,e=yr){const n=[];let i=t.slice();for(const s of t){const r=n.find(a=>a.agent===s.agent);if(r){if(r.dates.push(s.date),wn(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),wn(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Ir{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return os()?cs().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await br(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return bn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return bn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function wn(t){return Zn(JSON.stringify({version:2,heartbeats:t})).length}function kr(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}function Tr(t){Be(new Le("platform-logger",e=>new xs(e),"PRIVATE")),Be(new Le("heartbeat",e=>new _r(e),"PRIVATE")),Ie(Ot,mn,t),Ie(Ot,mn,"esm2020"),Ie("fire-js","")}Tr("");var Sr="firebase",Cr="12.11.0";Ie(Sr,Cr,"app");function di(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Lr=di,ui=new We("auth","Firebase",di());const at=new ii("@firebase/auth");function Ar(t,...e){at.logLevel<=y.WARN&&at.warn(`Auth (${Ve}): ${t}`,...e)}function Ze(t,...e){at.logLevel<=y.ERROR&&at.error(`Auth (${Ve}): ${t}`,...e)}function K(t,...e){throw Kt(t,...e)}function z(t,...e){return Kt(t,...e)}function qt(t,e,n){const i={...Lr(),[e]:n};return new We("auth","Firebase",i).create(e,{appName:t.name})}function ve(t){return qt(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Pr(t,e,n){const i=n;if(!(e instanceof i))throw i.name!==e.constructor.name&&K(t,"argument-error"),qt(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Kt(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return ui.create(t,...e)}function m(t,e,...n){if(!t)throw Kt(e,...n)}function Y(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ze(e),new Error(e)}function Z(t,e){t||Y(e)}function Mt(){return typeof self<"u"&&self.location?.href||""}function Rr(){return _n()==="http:"||_n()==="https:"}function _n(){return typeof self<"u"&&self.location?.protocol||null}function Nr(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Rr()||ss()||"connection"in navigator)?navigator.onLine:!0}function $r(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}class je{constructor(e,n){this.shortDelay=e,this.longDelay=n,Z(n>e,"Short delay should be less than long delay!"),this.isMobile=ns()||rs()}get(){return Nr()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}function Jt(t,e){Z(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}class hi{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Y("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Y("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Y("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}const Or={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};const Dr=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],xr=new je(3e4,6e4);function Yt(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Ne(t,e,n,i,s={}){return pi(t,s,async()=>{let r={},a={};i&&(e==="GET"?a=i:r={body:JSON.stringify(i)});const o=ze({key:t.config.apiKey,...a}).slice(1),l=await t._getAdditionalHeaders();l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode);const c={method:e,headers:l,...r};return is()||(c.referrerPolicy="no-referrer"),t.emulatorConfig&&jt(t.emulatorConfig.host)&&(c.credentials="include"),hi.fetch()(await fi(t,t.config.apiHost,n,o),c)})}async function pi(t,e,n){t._canInitEmulator=!1;const i={...Or,...e};try{const s=new Ur(t),r=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const a=await r.json();if("needConfirmation"in a)throw Xe(t,"account-exists-with-different-credential",a);if(r.ok&&!("errorMessage"in a))return a;{const o=r.ok?a.errorMessage:a.error.message,[l,c]=o.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Xe(t,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Xe(t,"email-already-in-use",a);if(l==="USER_DISABLED")throw Xe(t,"user-disabled",a);const p=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw qt(t,p,c);K(t,p)}}catch(s){if(s instanceof de)throw s;K(t,"network-request-failed",{message:String(s)})}}async function Mr(t,e,n,i,s={}){const r=await Ne(t,e,n,i,s);return"mfaPendingCredential"in r&&K(t,"multi-factor-auth-required",{_serverResponse:r}),r}async function fi(t,e,n,i){const s=`${e}${n}?${i}`,r=t,a=r.config.emulator?Jt(t.config,s):`${t.config.apiScheme}://${s}`;return Dr.includes(n)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(a).toString():a}class Ur{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(z(this.auth,"network-request-failed")),xr.get())})}}function Xe(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=z(t,e,i);return s.customData._tokenResponse=n,s}async function Br(t,e){return Ne(t,"POST","/v1/accounts:delete",e)}async function ot(t,e){return Ne(t,"POST","/v1/accounts:lookup",e)}function Ue(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Fr(t,e=!1){const n=ue(t),i=await n.getIdToken(e),s=Xt(i);m(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,a=r?.sign_in_provider;return{claims:s,token:i,authTime:Ue(Ct(s.auth_time)),issuedAtTime:Ue(Ct(s.iat)),expirationTime:Ue(Ct(s.exp)),signInProvider:a||null,signInSecondFactor:r?.sign_in_second_factor||null}}function Ct(t){return Number(t)*1e3}function Xt(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return Ze("JWT malformed, contained fewer than 3 sections"),null;try{const s=ei(n);return s?JSON.parse(s):(Ze("Failed to decode base64 JWT payload"),null)}catch(s){return Ze("Caught error parsing JWT payload as JSON",s?.toString()),null}}function En(t){const e=Xt(t);return m(e,"internal-error"),m(typeof e.exp<"u","internal-error"),m(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function He(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof de&&Hr(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function Hr({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}class Wr{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}class Ut{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ue(this.lastLoginAt),this.creationTime=Ue(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}async function ct(t){const e=t.auth,n=await t.getIdToken(),i=await He(t,ot(e,{idToken:n}));m(i?.users.length,e,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const r=s.providerUserInfo?.length?gi(s.providerUserInfo):[],a=Vr(t.providerData,r),o=t.isAnonymous,l=!(t.email&&s.passwordHash)&&!a?.length,c=o?l:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ut(s.createdAt,s.lastLoginAt),isAnonymous:c};Object.assign(t,p)}async function zr(t){const e=ue(t);await ct(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Vr(t,e){return[...t.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function gi(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}async function jr(t,e){const n=await pi(t,{},async()=>{const i=ze({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,a=await fi(t,s,"/v1/token",`key=${r}`),o=await t._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:o,body:i};return t.emulatorConfig&&jt(t.emulatorConfig.host)&&(l.credentials="include"),hi.fetch()(a,l)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Gr(t,e){return Ne(t,"POST","/v2/accounts:revokeToken",Yt(t,e))}class ke{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){m(e.idToken,"internal-error"),m(typeof e.idToken<"u","internal-error"),m(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):En(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){m(e.length!==0,"internal-error");const n=En(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(m(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:s,expiresIn:r}=await jr(e,n);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:s,expirationTime:r}=n,a=new ke;return i&&(m(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),s&&(m(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),r&&(m(typeof r=="number","internal-error",{appName:e}),a.expirationTime=r),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ke,this.toJSON())}_performRefresh(){return Y("not implemented")}}function ie(t,e){m(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class W{constructor({uid:e,auth:n,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new Wr(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ut(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await He(this,this.stsTokenManager.getToken(this.auth,e));return m(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Fr(this,e)}reload(){return zr(this)}_assign(e){this!==e&&(m(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new W({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){m(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await ct(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(j(this.auth.app))return Promise.reject(ve(this.auth));const e=await this.getIdToken();return await He(this,Br(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,s=n.email??void 0,r=n.phoneNumber??void 0,a=n.photoURL??void 0,o=n.tenantId??void 0,l=n._redirectEventId??void 0,c=n.createdAt??void 0,p=n.lastLoginAt??void 0,{uid:h,emailVerified:f,isAnonymous:w,providerData:E,stsTokenManager:A}=n;m(h&&A,e,"internal-error");const $=ke.fromJSON(this.name,A);m(typeof h=="string",e,"internal-error"),ie(i,e.name),ie(s,e.name),m(typeof f=="boolean",e,"internal-error"),m(typeof w=="boolean",e,"internal-error"),ie(r,e.name),ie(a,e.name),ie(o,e.name),ie(l,e.name),ie(c,e.name),ie(p,e.name);const U=new W({uid:h,auth:e,email:s,emailVerified:f,displayName:i,isAnonymous:w,photoURL:a,phoneNumber:r,tenantId:o,stsTokenManager:$,createdAt:c,lastLoginAt:p});return E&&Array.isArray(E)&&(U.providerData=E.map(he=>({...he}))),l&&(U._redirectEventId=l),U}static async _fromIdTokenResponse(e,n,i=!1){const s=new ke;s.updateFromServerResponse(n);const r=new W({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await ct(r),r}static async _fromGetAccountInfoResponse(e,n,i){const s=n.users[0];m(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?gi(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!r?.length,o=new ke;o.updateFromIdToken(i);const l=new W({uid:s.localId,auth:e,stsTokenManager:o,isAnonymous:a}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Ut(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(l,c),l}}const In=new Map;function X(t){Z(t instanceof Function,"Expected a class definition");let e=In.get(t);return e?(Z(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,In.set(t,e),e)}class mi{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}mi.type="NONE";const kn=mi;function et(t,e,n){return`firebase:${t}:${e}:${n}`}class Te{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=et(this.userKey,s.apiKey,r),this.fullPersistenceKey=et("persistence",s.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await ot(this.auth,{idToken:e}).catch(()=>{});return n?W._fromGetAccountInfoResponse(this.auth,n,e):null}return W._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new Te(X(kn),e,i);const s=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||X(kn);const a=et(i,e.config.apiKey,e.name);let o=null;for(const c of n)try{const p=await c._get(a);if(p){let h;if(typeof p=="string"){const f=await ot(e,{idToken:p}).catch(()=>{});if(!f)break;h=await W._fromGetAccountInfoResponse(e,f,p)}else h=W._fromJSON(e,p);c!==r&&(o=h),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new Te(r,e,i):(r=l[0],o&&await r._set(a,o.toJSON()),await Promise.all(n.map(async c=>{if(c!==r)try{await c._remove(a)}catch{}})),new Te(r,e,i))}}function Tn(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(wi(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(vi(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ei(e))return"Blackberry";if(Ii(e))return"Webos";if(bi(e))return"Safari";if((e.includes("chrome/")||yi(e))&&!e.includes("edge/"))return"Chrome";if(_i(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if(i?.length===2)return i[1]}return"Other"}function vi(t=R()){return/firefox\//i.test(t)}function bi(t=R()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function yi(t=R()){return/crios\//i.test(t)}function wi(t=R()){return/iemobile/i.test(t)}function _i(t=R()){return/android/i.test(t)}function Ei(t=R()){return/blackberry/i.test(t)}function Ii(t=R()){return/webos/i.test(t)}function Qt(t=R()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function qr(t=R()){return Qt(t)&&!!window.navigator?.standalone}function Kr(){return as()&&document.documentMode===10}function ki(t=R()){return Qt(t)||_i(t)||Ii(t)||Ei(t)||/windows phone/i.test(t)||wi(t)}function Ti(t,e=[]){let n;switch(t){case"Browser":n=Tn(R());break;case"Worker":n=`${Tn(R())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ve}/${i}`}class Jr{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=r=>new Promise((a,o)=>{try{const l=e(r);a(l)}catch(l){o(l)}});i.onAbort=n,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}async function Yr(t,e={}){return Ne(t,"GET","/v2/passwordPolicy",Yt(t,e))}const Xr=6;class Qr{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??Xr,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}class Zr{constructor(e,n,i,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Sn(this),this.idTokenSubscription=new Sn(this),this.beforeStateQueue=new Jr(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ui,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=X(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Te.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await ot(this,{idToken:e}),i=await W._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(j(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(a,a))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,a=i?._redirectEventId,o=await this.tryRedirectSignIn(e);(!r||r===a)&&o?.user&&(i=o.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return m(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ct(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=$r()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(j(this.app))return Promise.reject(ve(this));const n=e?ue(e):null;return n&&m(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&m(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return j(this.app)?Promise.reject(ve(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return j(this.app)?Promise.reject(ve(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(X(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Yr(this),n=new Qr(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new We("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await Gr(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&X(e)||this._popupRedirectResolver;m(n,this,"argument-error"),this.redirectPersistenceManager=await Te.create(this,[X(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,s){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let a=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(m(o,this,"internal-error"),o.then(()=>{a||r(this.currentUser)}),typeof n=="function"){const l=e.addObserver(n,i,s);return()=>{a=!0,l()}}else{const l=e.addObserver(n);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return m(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ti(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(j(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Ar(`Error while retrieving App Check token: ${e.error}`),e?.token}}function gt(t){return ue(t)}class Sn{constructor(e){this.auth=e,this.observer=null,this.addObserver=ps(n=>this.observer=n)}get next(){return m(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}let Zt={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ea(t){Zt=t}function ta(t){return Zt.loadJS(t)}function na(){return Zt.gapiScript}function ia(t){return`__${t}${Math.floor(Math.random()*1e6)}`}function sa(t,e){const n=ai(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(Ce(r,e??{}))return s;K(s,"already-initialized")}return n.initialize({options:e})}function ra(t,e){const n=e?.persistence||[],i=(Array.isArray(n)?n:[n]).map(X);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e?.popupRedirectResolver)}function aa(t,e,n){const i=gt(t);m(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Si(e),{host:a,port:o}=oa(e),l=o===null?"":`:${o}`,c={url:`${r}//${a}${l}/`},p=Object.freeze({host:a,port:o,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){m(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),m(Ce(c,i.config.emulator)&&Ce(p,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=c,i.emulatorConfig=p,i.settings.appVerificationDisabledForTesting=!0,jt(a)?ms(`${r}//${a}${l}`):ca()}function Si(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function oa(t){const e=Si(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Cn(i.substr(r.length+1))}}else{const[r,a]=i.split(":");return{host:r,port:Cn(a)}}}function Cn(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function ca(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}class Ci{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Y("not implemented")}_getIdTokenResponse(e){return Y("not implemented")}_linkToIdToken(e,n){return Y("not implemented")}_getReauthenticationResolver(e){return Y("not implemented")}}async function Se(t,e){return Mr(t,"POST","/v1/accounts:signInWithIdp",Yt(t,e))}const la="http://localhost";class be extends Ci{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new be(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):K("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=n;if(!i||!s)return null;const a=new be(i,s);return a.idToken=r.idToken||void 0,a.accessToken=r.accessToken||void 0,a.secret=r.secret,a.nonce=r.nonce,a.pendingToken=r.pendingToken||null,a}_getIdTokenResponse(e){const n=this.buildRequest();return Se(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,Se(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Se(e,n)}buildRequest(){const e={requestUri:la,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ze(n)}return e}}class en{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}class Ge extends en{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class se extends Ge{constructor(){super("facebook.com")}static credential(e){return be._fromParams({providerId:se.PROVIDER_ID,signInMethod:se.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return se.credentialFromTaggedObject(e)}static credentialFromError(e){return se.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return se.credential(e.oauthAccessToken)}catch{return null}}}se.FACEBOOK_SIGN_IN_METHOD="facebook.com";se.PROVIDER_ID="facebook.com";class J extends Ge{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return be._fromParams({providerId:J.PROVIDER_ID,signInMethod:J.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return J.credentialFromTaggedObject(e)}static credentialFromError(e){return J.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return J.credential(n,i)}catch{return null}}}J.GOOGLE_SIGN_IN_METHOD="google.com";J.PROVIDER_ID="google.com";class re extends Ge{constructor(){super("github.com")}static credential(e){return be._fromParams({providerId:re.PROVIDER_ID,signInMethod:re.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return re.credentialFromTaggedObject(e)}static credentialFromError(e){return re.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return re.credential(e.oauthAccessToken)}catch{return null}}}re.GITHUB_SIGN_IN_METHOD="github.com";re.PROVIDER_ID="github.com";class ae extends Ge{constructor(){super("twitter.com")}static credential(e,n){return be._fromParams({providerId:ae.PROVIDER_ID,signInMethod:ae.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ae.credentialFromTaggedObject(e)}static credentialFromError(e){return ae.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return ae.credential(n,i)}catch{return null}}}ae.TWITTER_SIGN_IN_METHOD="twitter.com";ae.PROVIDER_ID="twitter.com";class Ae{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,s=!1){const r=await W._fromIdTokenResponse(e,i,s),a=Ln(i);return new Ae({user:r,providerId:a,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const s=Ln(i);return new Ae({user:e,providerId:s,_tokenResponse:i,operationType:n})}}function Ln(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}class lt extends de{constructor(e,n,i,s){super(n.code,n.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,lt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,s){return new lt(e,n,i,s)}}function Li(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?lt._fromErrorAndOperation(t,r,e,i):r})}async function da(t,e,n=!1){const i=await He(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Ae._forOperation(t,"link",i)}async function ua(t,e,n=!1){const{auth:i}=t;if(j(i.app))return Promise.reject(ve(i));const s="reauthenticate";try{const r=await He(t,Li(i,s,e,t),n);m(r.idToken,i,"internal-error");const a=Xt(r.idToken);m(a,i,"internal-error");const{sub:o}=a;return m(t.uid===o,i,"user-mismatch"),Ae._forOperation(t,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&K(i,"user-mismatch"),r}}async function ha(t,e,n=!1){if(j(t.app))return Promise.reject(ve(t));const i="signIn",s=await Li(t,i,e),r=await Ae._fromIdTokenResponse(t,i,s);return n||await t._updateCurrentUser(r.user),r}function pa(t,e,n,i){return ue(t).onIdTokenChanged(e,n,i)}function fa(t,e,n){return ue(t).beforeAuthStateChanged(e,n)}function ga(t,e,n,i){return ue(t).onAuthStateChanged(e,n,i)}function ma(t){return ue(t).signOut()}const dt="__sak";class Ai{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(dt,"1"),this.storage.removeItem(dt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}const va=1e3,ba=10;class Pi extends Ai{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ki(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),s=this.localCache[n];i!==s&&e(n,s,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((a,o,l)=>{this.notifyListeners(a,l)});return}const i=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(i);!n&&this.localCache[i]===a||this.notifyListeners(i,a)},r=this.storage.getItem(i);Kr()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ba):s()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},va)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Pi.type="LOCAL";const ya=Pi;class Ri extends Ai{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Ri.type="SESSION";const Ni=Ri;function wa(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}class mt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const i=new mt(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:s,data:r}=n.data,a=this.handlersMap[s];if(!a?.size)return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const o=Array.from(a).map(async c=>c(n.origin,r)),l=await wa(o);n.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}mt.receivers=[];function tn(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}class _a{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,a;return new Promise((o,l)=>{const c=tn("",20);s.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},i);a={messageChannel:s,onMessage(h){const f=h;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(p),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),o(f.data.response);break;default:clearTimeout(p),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}function G(){return window}function Ea(t){G().location.href=t}function $i(){return typeof G().WorkerGlobalScope<"u"&&typeof G().importScripts=="function"}async function Ia(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ka(){return navigator?.serviceWorker?.controller||null}function Ta(){return $i()?self:null}const Oi="firebaseLocalStorageDb",Sa=1,ut="firebaseLocalStorage",Di="fbase_key";class qe{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function vt(t,e){return t.transaction([ut],e?"readwrite":"readonly").objectStore(ut)}function Ca(){const t=indexedDB.deleteDatabase(Oi);return new qe(t).toPromise()}function Bt(){const t=indexedDB.open(Oi,Sa);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(ut,{keyPath:Di})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(ut)?e(i):(i.close(),await Ca(),e(await Bt()))})})}async function An(t,e,n){const i=vt(t,!0).put({[Di]:e,value:n});return new qe(i).toPromise()}async function La(t,e){const n=vt(t,!1).get(e),i=await new qe(n).toPromise();return i===void 0?null:i.value}function Pn(t,e){const n=vt(t,!0).delete(e);return new qe(n).toPromise()}const Aa=800,Pa=3;class xi{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Bt(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>Pa)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return $i()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=mt._getInstance(Ta()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Ia(),!this.activeServiceWorker)return;this.sender=new _a(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ka()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Bt();return await An(e,dt,"1"),await Pn(e,dt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>An(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>La(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Pn(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=vt(s,!1).getAll();return new qe(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Aa)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}xi.type="LOCAL";const Ra=xi;new je(3e4,6e4);function Mi(t,e){return e?X(e):(m(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}class nn extends Ci{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Se(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Se(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Se(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Na(t){return ha(t.auth,new nn(t),t.bypassAuthState)}function $a(t){const{auth:e,user:n}=t;return m(n,e,"internal-error"),ua(n,new nn(t),t.bypassAuthState)}async function Oa(t){const{auth:e,user:n}=t;return m(n,e,"internal-error"),da(n,new nn(t),t.bypassAuthState)}class Ui{constructor(e,n,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:s,tenantId:r,error:a,type:o}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:n,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Na;case"linkViaPopup":case"linkViaRedirect":return Oa;case"reauthViaPopup":case"reauthViaRedirect":return $a;default:K(this.auth,"internal-error")}}resolve(e){Z(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Z(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}const Da=new je(2e3,1e4);async function xa(t,e,n){if(j(t.app))return Promise.reject(z(t,"operation-not-supported-in-this-environment"));const i=gt(t);Pr(t,e,en);const s=Mi(i,n);return new ge(i,"signInViaPopup",e,s).executeNotNull()}class ge extends Ui{constructor(e,n,i,s,r){super(e,n,s,r),this.provider=i,this.authWindow=null,this.pollId=null,ge.currentPopupAction&&ge.currentPopupAction.cancel(),ge.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return m(e,this.auth,"internal-error"),e}async onExecution(){Z(this.filter.length===1,"Popup operations only handle one event");const e=tn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(z(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(z(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ge.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(z(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Da.get())};e()}}ge.currentPopupAction=null;const Ma="pendingRedirect",tt=new Map;class Ua extends Ui{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=tt.get(this.auth._key());if(!e){try{const i=await Ba(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}tt.set(this.auth._key(),e)}return this.bypassAuthState||tt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ba(t,e){const n=Wa(e),i=Ha(t);if(!await i._isAvailable())return!1;const s=await i._get(n)==="true";return await i._remove(n),s}function Fa(t,e){tt.set(t._key(),e)}function Ha(t){return X(t._redirectPersistence)}function Wa(t){return et(Ma,t.config.apiKey,t.name)}async function za(t,e,n=!1){if(j(t.app))return Promise.reject(ve(t));const i=gt(t),s=Mi(i,e),a=await new Ua(i,s,n).execute();return a&&!n&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}const Va=600*1e3;class ja{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Ga(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!Bi(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";n.onError(z(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Va&&this.cachedEventUids.clear(),this.cachedEventUids.has(Rn(e))}saveEventToCache(e){this.cachedEventUids.add(Rn(e)),this.lastProcessedEventTime=Date.now()}}function Rn(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Bi({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function Ga(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Bi(t);default:return!1}}async function qa(t,e={}){return Ne(t,"GET","/v1/projects",e)}const Ka=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ja=/^https?/;async function Ya(t){if(t.config.emulator)return;const{authorizedDomains:e}=await qa(t);for(const n of e)try{if(Xa(n))return}catch{}K(t,"unauthorized-domain")}function Xa(t){const e=Mt(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const a=new URL(t);return a.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&a.hostname===i}if(!Ja.test(n))return!1;if(Ka.test(t))return i===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}const Qa=new je(3e4,6e4);function Nn(){const t=G().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Za(t){return new Promise((e,n)=>{function i(){Nn(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Nn(),n(z(t,"network-request-failed"))},timeout:Qa.get()})}if(G().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(G().gapi?.load)i();else{const s=ia("iframefcb");return G()[s]=()=>{gapi.load?i():n(z(t,"network-request-failed"))},ta(`${na()}?onload=${s}`).catch(r=>n(r))}}).catch(e=>{throw nt=null,e})}let nt=null;function eo(t){return nt=nt||Za(t),nt}const to=new je(5e3,15e3),no="__/auth/iframe",io="emulator/auth/iframe",so={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ro=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ao(t){const e=t.config;m(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Jt(e,io):`https://${t.config.authDomain}/${no}`,i={apiKey:e.apiKey,appName:t.name,v:Ve},s=ro.get(t.config.apiHost);s&&(i.eid=s);const r=t._getFrameworks();return r.length&&(i.fw=r.join(",")),`${n}?${ze(i).slice(1)}`}async function oo(t){const e=await eo(t),n=G().gapi;return m(n,t,"internal-error"),e.open({where:document.body,url:ao(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:so,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const a=z(t,"network-request-failed"),o=G().setTimeout(()=>{r(a)},to.get());function l(){G().clearTimeout(o),s(i)}i.ping(l).then(l,()=>{r(a)})}))}const co={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},lo=500,uo=600,ho="_blank",po="http://localhost";class $n{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function fo(t,e,n,i=lo,s=uo){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let o="";const l={...co,width:i.toString(),height:s.toString(),top:r,left:a},c=R().toLowerCase();n&&(o=yi(c)?ho:n),vi(c)&&(e=e||po,l.scrollbars="yes");const p=Object.entries(l).reduce((f,[w,E])=>`${f}${w}=${E},`,"");if(qr(c)&&o!=="_self")return go(e||"",o),new $n(null);const h=window.open(e||"",o,p);m(h,t,"popup-blocked");try{h.focus()}catch{}return new $n(h)}function go(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}const mo="__/auth/handler",vo="emulator/auth/handler",bo=encodeURIComponent("fac");async function On(t,e,n,i,s,r){m(t.config.authDomain,t,"auth-domain-config-required"),m(t.config.apiKey,t,"invalid-api-key");const a={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:Ve,eventId:s};if(e instanceof en){e.setDefaultLanguage(t.languageCode),a.providerId=e.providerId||"",hs(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,h]of Object.entries({}))a[p]=h}if(e instanceof Ge){const p=e.getScopes().filter(h=>h!=="");p.length>0&&(a.scopes=p.join(","))}t.tenantId&&(a.tid=t.tenantId);const o=a;for(const p of Object.keys(o))o[p]===void 0&&delete o[p];const l=await t._getAppCheckToken(),c=l?`#${bo}=${encodeURIComponent(l)}`:"";return`${yo(t)}?${ze(o).slice(1)}${c}`}function yo({config:t}){return t.emulator?Jt(t,vo):`https://${t.authDomain}/${mo}`}const Lt="webStorageSupport";class wo{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ni,this._completeRedirectFn=za,this._overrideRedirectResult=Fa}async _openPopup(e,n,i,s){Z(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await On(e,n,i,Mt(),s);return fo(e,r,tn())}async _openRedirect(e,n,i,s){await this._originValidation(e);const r=await On(e,n,i,Mt(),s);return Ea(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:r}=this.eventManagers[n];return s?Promise.resolve(s):(Z(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await oo(e),i=new ja(e);return n.register("authEvent",s=>(m(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Lt,{type:Lt},s=>{const r=s?.[0]?.[Lt];r!==void 0&&n(!!r),K(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Ya(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return ki()||bi()||Qt()}}const _o=wo;var Dn="@firebase/auth",xn="1.12.2";class Eo{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){m(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}function Io(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ko(t){Be(new Le("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:a,authDomain:o}=i.options;m(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:a,authDomain:o,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ti(t)},c=new Zr(i,s,r,l);return ra(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),Be(new Le("auth-internal",e=>{const n=gt(e.getProvider("auth").getImmediate());return(i=>new Eo(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ie(Dn,xn,Io(t)),Ie(Dn,xn,"esm2020")}const To=300,So=ni("authIdTokenMaxAge")||To;let Mn=null;const Co=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>So)return;const s=n?.token;Mn!==s&&(Mn=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Lo(t=gr()){const e=ai(t,"auth");if(e.isInitialized())return e.getImmediate();const n=sa(t,{popupRedirectResolver:_o,persistence:[Ra,ya,Ni]}),i=ni("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const a=Co(r.toString());fa(n,a,()=>a(n.currentUser)),pa(n,o=>a(o))}}const s=es("auth");return s&&aa(n,`http://${s}`),n}function Ao(){return document.getElementsByTagName("head")?.[0]??document}ea({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=s=>{const r=z("internal-error");r.customData=s,n(r)},i.type="text/javascript",i.charset="UTF-8",Ao().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ko("Browser");const Po=String.fromCharCode(65,73,122,97,83,121,66,117,89,116,119,121,97,105,79,48,73,74,52,50,71,90,56,68,54,66,100,78,57,75,101,53,69,45,68,99,98,76,111),Ro={projectId:"nfc-manager-fv96",appId:"1:369384689589:web:2a98456e0b9e38db1913fc",storageBucket:"nfc-manager-fv96.firebasestorage.app",apiKey:Po,authDomain:"nfc-manager-fv96.firebaseapp.com",messagingSenderId:"369384689589"},No=oi(Ro),Ft=Lo(No),$o=new J;var Pe;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(Pe||(Pe={}));let At=class extends Error{constructor(e,n,i){super(e),this.message=e,this.code=n,this.data=i}};const Oo=t=>{var e,n;return t?.androidBridge?"android":!((n=(e=t?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},Do=t=>{const e=t.CapacitorCustomPlatform||null,n=t.Capacitor||{},i=n.Plugins=n.Plugins||{},s=()=>e!==null?e.name:Oo(t),r=()=>s()!=="web",a=h=>{const f=c.get(h);return!!(f?.platforms.has(s())||o(h))},o=h=>{var f;return(f=n.PluginHeaders)===null||f===void 0?void 0:f.find(w=>w.name===h)},l=h=>t.console.error(h),c=new Map,p=(h,f={})=>{const w=c.get(h);if(w)return console.warn(`Capacitor plugin "${h}" already registered. Cannot register plugins twice.`),w.proxy;const E=s(),A=o(h);let $;const U=async()=>(!$&&E in f?$=typeof f[E]=="function"?$=await f[E]():$=f[E]:e!==null&&!$&&"web"in f&&($=typeof f.web=="function"?$=await f.web():$=f.web),$),he=(v,I)=>{var k,P;if(A){const T=A?.methods.find(x=>I===x.name);if(T)return T.rtype==="promise"?x=>n.nativePromise(h,I.toString(),x):(x,we)=>n.nativeCallback(h,I.toString(),x,we);if(v)return(k=v[I])===null||k===void 0?void 0:k.bind(v)}else{if(v)return(P=v[I])===null||P===void 0?void 0:P.bind(v);throw new At(`"${h}" plugin is not implemented on ${E}`,Pe.Unimplemented)}},xe=v=>{let I;const k=(...P)=>{const T=U().then(x=>{const we=he(x,v);if(we){const ee=we(...P);return I=ee?.remove,ee}else throw new At(`"${h}.${v}()" is not implemented on ${E}`,Pe.Unimplemented)});return v==="addListener"&&(T.remove=async()=>I()),T};return k.toString=()=>`${v.toString()}() { [capacitor code] }`,Object.defineProperty(k,"name",{value:v,writable:!1,configurable:!1}),k},ye=xe("addListener"),Ke=xe("removeListener"),wt=(v,I)=>{const k=ye({eventName:v},I),P=async()=>{const x=await k;Ke({eventName:v,callbackId:x},I)},T=new Promise(x=>k.then(()=>x({remove:P})));return T.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await P()},T},_=new Proxy({},{get(v,I){switch(I){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return A?wt:ye;case"removeListener":return Ke;default:return xe(I)}}});return i[h]=_,c.set(h,{name:h,proxy:_,platforms:new Set([...Object.keys(f),...A?[E]:[]])}),_};return n.convertFileSrc||(n.convertFileSrc=h=>h),n.getPlatform=s,n.handleError=l,n.isNativePlatform=r,n.isPluginAvailable=a,n.registerPlugin=p,n.Exception=At,n.DEBUG=!!n.DEBUG,n.isLoggingEnabled=!!n.isLoggingEnabled,n},xo=t=>t.Capacitor=Do(t),me=xo(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),$e=me.registerPlugin;let sn=class{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,n){let i=!1;this.listeners[e]||(this.listeners[e]=[],i=!0),this.listeners[e].push(n);const r=this.windowListeners[e];r&&!r.registered&&this.addWindowListener(r),i&&this.sendRetainedArgumentsForEvent(e);const a=async()=>this.removeListener(e,n);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,n,i){const s=this.listeners[e];if(!s){if(i){let r=this.retainedEventArguments[e];r||(r=[]),r.push(n),this.retainedEventArguments[e]=r}return}s.forEach(r=>r(n))}hasListeners(e){var n;return!!(!((n=this.listeners[e])===null||n===void 0)&&n.length)}registerWindowListener(e,n){this.windowListeners[n]={registered:!1,windowEventName:e,pluginEventName:n,handler:i=>{this.notifyListeners(n,i)}}}unimplemented(e="not implemented"){return new me.Exception(e,Pe.Unimplemented)}unavailable(e="not available"){return new me.Exception(e,Pe.Unavailable)}async removeListener(e,n){const i=this.listeners[e];if(!i)return;const s=i.indexOf(n);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const n=this.retainedEventArguments[e];n&&(delete this.retainedEventArguments[e],n.forEach(i=>{this.notifyListeners(e,i)}))}};const Un=t=>encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Bn=t=>t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Mo extends sn{async getCookies(){const e=document.cookie,n={};return e.split(";").forEach(i=>{if(i.length<=0)return;let[s,r]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=Bn(s).trim(),r=Bn(r).trim(),n[s]=r}),n}async setCookie(e){try{const n=Un(e.key),i=Un(e.value),s=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",r=(e.path||"/").replace("path=",""),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${n}=${i||""}${s}; path=${r}; ${a};`}catch(n){return Promise.reject(n)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(n){return Promise.reject(n)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const n of e)document.cookie=n.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}$e("CapacitorCookies",{web:()=>new Mo});const Uo=async t=>new Promise((e,n)=>{const i=new FileReader;i.onload=()=>{const s=i.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},i.onerror=s=>n(s),i.readAsDataURL(t)}),Bo=(t={})=>{const e=Object.keys(t);return Object.keys(t).map(s=>s.toLocaleLowerCase()).reduce((s,r,a)=>(s[r]=t[e[a]],s),{})},Fo=(t,e=!0)=>t?Object.entries(t).reduce((i,s)=>{const[r,a]=s;let o,l;return Array.isArray(a)?(l="",a.forEach(c=>{o=e?encodeURIComponent(c):c,l+=`${r}=${o}&`}),l.slice(0,-1)):(o=e?encodeURIComponent(a):a,l=`${r}=${o}`),`${i}&${l}`},"").substr(1):null,Ho=(t,e={})=>{const n=Object.assign({method:t.method||"GET",headers:t.headers},e),s=Bo(t.headers)["content-type"]||"";if(typeof t.data=="string")n.body=t.data;else if(s.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[a,o]of Object.entries(t.data||{}))r.set(a,o);n.body=r.toString()}else if(s.includes("multipart/form-data")||t.data instanceof FormData){const r=new FormData;if(t.data instanceof FormData)t.data.forEach((o,l)=>{r.append(l,o)});else for(const o of Object.keys(t.data))r.append(o,t.data[o]);n.body=r;const a=new Headers(n.headers);a.delete("content-type"),n.headers=a}else(s.includes("application/json")||typeof t.data=="object")&&(n.body=JSON.stringify(t.data));return n};class Wo extends sn{async request(e){const n=Ho(e,e.webFetchExtra),i=Fo(e.params,e.shouldEncodeUrlParams),s=i?`${e.url}?${i}`:e.url,r=await fetch(s,n),a=r.headers.get("content-type")||"";let{responseType:o="text"}=r.ok?e:{};a.includes("application/json")&&(o="json");let l,c;switch(o){case"arraybuffer":case"blob":c=await r.blob(),l=await Uo(c);break;case"json":l=await r.json();break;default:l=await r.text()}const p={};return r.headers.forEach((h,f)=>{p[f]=h}),{data:l,headers:p,status:r.status,url:r.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}$e("CapacitorHttp",{web:()=>new Wo});var Fn;(function(t){t.Dark="DARK",t.Light="LIGHT",t.Default="DEFAULT"})(Fn||(Fn={}));var Hn;(function(t){t.StatusBar="StatusBar",t.NavigationBar="NavigationBar"})(Hn||(Hn={}));class zo extends sn{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}$e("SystemBars",{web:()=>new zo});const Vo="modulepreload",jo=function(t){return"/"+t},Wn={},bt=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){let l=function(c){return Promise.all(c.map(p=>Promise.resolve(p).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");s=l(n.map(c=>{if(c=jo(c),c in Wn)return;Wn[c]=!0;const p=c.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const f=document.createElement("link");if(f.rel=p?"stylesheet":Vo,p||(f.as="script"),f.crossOrigin="",f.href=c,o&&f.setAttribute("nonce",o),document.head.appendChild(f),p)return new Promise((w,E)=>{f.addEventListener("load",w),f.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})},B=$e("CapacitorNfc",{web:()=>bt(()=>import("./web-UaV0J3mj.js"),[]).then(t=>new t.CapacitorNfcWeb)});var zn;(function(t){t.Heavy="HEAVY",t.Medium="MEDIUM",t.Light="LIGHT"})(zn||(zn={}));var ht;(function(t){t.Success="SUCCESS",t.Warning="WARNING",t.Error="ERROR"})(ht||(ht={}));const Vn=$e("Haptics",{web:()=>bt(()=>import("./web-BcUpsgs5.js"),[]).then(t=>new t.HapticsWeb)});function Go(t){t.CapacitorUtils.Synapse=new Proxy({},{get(e,n){return new Proxy({},{get(i,s){return(r,a,o)=>{const l=t.Capacitor.Plugins[n];if(l===void 0){o(new Error(`Capacitor plugin ${n} not found`));return}if(typeof l[s]!="function"){o(new Error(`Method ${s} not found in Capacitor plugin ${n}`));return}(async()=>{try{const c=await l[s](r);a(c)}catch(c){o(c)}})()}}})}})}function qo(t){t.CapacitorUtils.Synapse=new Proxy({},{get(e,n){return t.cordova.plugins[n]}})}function Ko(t=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!t?Go(window):window.cordova!==void 0&&qo(window))}$e("Geolocation",{web:()=>bt(()=>import("./web-Dvoum2eH.js"),[]).then(t=>new t.GeolocationWeb)});Ko();const Jo=t=>{const e=new Map;e.set("web",{name:"web"});const n=t.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:e},i=(r,a)=>{n.platforms.set(r,a)},s=r=>{n.platforms.has(r)&&(n.currentPlatform=n.platforms.get(r))};return n.addPlatform=i,n.setPlatform=s,n},Yo=t=>t.CapacitorPlatforms=Jo(t),Fi=Yo(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});Fi.addPlatform;Fi.setPlatform;var Re;(function(t){t.Unimplemented="UNIMPLEMENTED",t.Unavailable="UNAVAILABLE"})(Re||(Re={}));class Pt extends Error{constructor(e,n){super(e),this.message=e,this.code=n}}const Xo=t=>{var e,n;return t?.androidBridge?"android":!((n=(e=t?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||n===void 0)&&n.bridge?"ios":"web"},Qo=t=>{var e,n,i,s,r;const a=t.CapacitorCustomPlatform||null,o=t.Capacitor||{},l=o.Plugins=o.Plugins||{},c=t.CapacitorPlatforms,p=()=>a!==null?a.name:Xo(t),h=((e=c?.currentPlatform)===null||e===void 0?void 0:e.getPlatform)||p,f=()=>h()!=="web",w=((n=c?.currentPlatform)===null||n===void 0?void 0:n.isNativePlatform)||f,E=_=>{const v=ye.get(_);return!!(v?.platforms.has(h())||U(_))},A=((i=c?.currentPlatform)===null||i===void 0?void 0:i.isPluginAvailable)||E,$=_=>{var v;return(v=o.PluginHeaders)===null||v===void 0?void 0:v.find(I=>I.name===_)},U=((s=c?.currentPlatform)===null||s===void 0?void 0:s.getPluginHeader)||$,he=_=>t.console.error(_),xe=(_,v,I)=>Promise.reject(`${I} does not have an implementation of "${v}".`),ye=new Map,Ke=(_,v={})=>{const I=ye.get(_);if(I)return console.warn(`Capacitor plugin "${_}" already registered. Cannot register plugins twice.`),I.proxy;const k=h(),P=U(_);let T;const x=async()=>(!T&&k in v?T=typeof v[k]=="function"?T=await v[k]():T=v[k]:a!==null&&!T&&"web"in v&&(T=typeof v.web=="function"?T=await v.web():T=v.web),T),we=(C,O)=>{var V,te;if(P){const ne=P?.methods.find(H=>O===H.name);if(ne)return ne.rtype==="promise"?H=>o.nativePromise(_,O.toString(),H):(H,Je)=>o.nativeCallback(_,O.toString(),H,Je);if(C)return(V=C[O])===null||V===void 0?void 0:V.bind(C)}else{if(C)return(te=C[O])===null||te===void 0?void 0:te.bind(C);throw new Pt(`"${_}" plugin is not implemented on ${k}`,Re.Unimplemented)}},ee=C=>{let O;const V=(...te)=>{const ne=x().then(H=>{const Je=we(H,C);if(Je){const Ye=Je(...te);return O=Ye?.remove,Ye}else throw new Pt(`"${_}.${C}()" is not implemented on ${k}`,Re.Unimplemented)});return C==="addListener"&&(ne.remove=async()=>O()),ne};return V.toString=()=>`${C.toString()}() { [capacitor code] }`,Object.defineProperty(V,"name",{value:C,writable:!1,configurable:!1}),V},ln=ee("addListener"),dn=ee("removeListener"),ji=(C,O)=>{const V=ln({eventName:C},O),te=async()=>{const H=await V;dn({eventName:C,callbackId:H},O)},ne=new Promise(H=>V.then(()=>H({remove:te})));return ne.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await te()},ne},_t=new Proxy({},{get(C,O){switch(O){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return P?ji:ln;case"removeListener":return dn;default:return ee(O)}}});return l[_]=_t,ye.set(_,{name:_,proxy:_t,platforms:new Set([...Object.keys(v),...P?[k]:[]])}),_t},wt=((r=c?.currentPlatform)===null||r===void 0?void 0:r.registerPlugin)||Ke;return o.convertFileSrc||(o.convertFileSrc=_=>_),o.getPlatform=h,o.handleError=he,o.isNativePlatform=w,o.isPluginAvailable=A,o.pluginMethodNoop=xe,o.registerPlugin=wt,o.Exception=Pt,o.DEBUG=!!o.DEBUG,o.isLoggingEnabled=!!o.isLoggingEnabled,o.platform=o.getPlatform(),o.isNative=o.isNativePlatform(),o},Zo=t=>t.Capacitor=Qo(t),pt=Zo(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),ec=pt.registerPlugin;pt.Plugins;class Bc{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,n){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(n);const s=this.windowListeners[e];s&&!s.registered&&this.addWindowListener(s);const r=async()=>this.removeListener(e,n),a=Promise.resolve({remove:r});return Object.defineProperty(a,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await r()}}),a}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,n){const i=this.listeners[e];i&&i.forEach(s=>s(n))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,n){this.windowListeners[n]={registered:!1,windowEventName:e,pluginEventName:n,handler:i=>{this.notifyListeners(n,i)}}}unimplemented(e="not implemented"){return new pt.Exception(e,Re.Unimplemented)}unavailable(e="not available"){return new pt.Exception(e,Re.Unavailable)}async removeListener(e,n){const i=this.listeners[e];if(!i)return;const s=i.indexOf(n);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}var jn;(function(t){t[t.NONE=0]="NONE",t[t.TOUCH_ID=1]="TOUCH_ID",t[t.FACE_ID=2]="FACE_ID",t[t.FINGERPRINT=3]="FINGERPRINT",t[t.FACE_AUTHENTICATION=4]="FACE_AUTHENTICATION",t[t.IRIS_AUTHENTICATION=5]="IRIS_AUTHENTICATION",t[t.MULTIPLE=6]="MULTIPLE"})(jn||(jn={}));var Gn;(function(t){t[t.UNKNOWN_ERROR=0]="UNKNOWN_ERROR",t[t.BIOMETRICS_UNAVAILABLE=1]="BIOMETRICS_UNAVAILABLE",t[t.USER_LOCKOUT=2]="USER_LOCKOUT",t[t.BIOMETRICS_NOT_ENROLLED=3]="BIOMETRICS_NOT_ENROLLED",t[t.USER_TEMPORARY_LOCKOUT=4]="USER_TEMPORARY_LOCKOUT",t[t.AUTHENTICATION_FAILED=10]="AUTHENTICATION_FAILED",t[t.APP_CANCEL=11]="APP_CANCEL",t[t.INVALID_CONTEXT=12]="INVALID_CONTEXT",t[t.NOT_INTERACTIVE=13]="NOT_INTERACTIVE",t[t.PASSCODE_NOT_SET=14]="PASSCODE_NOT_SET",t[t.SYSTEM_CANCEL=15]="SYSTEM_CANCEL",t[t.USER_CANCEL=16]="USER_CANCEL",t[t.USER_FALLBACK=17]="USER_FALLBACK"})(Gn||(Gn={}));const qn=ec("NativeBiometric",{web:()=>bt(()=>import("./web-DSk_cWUk.js"),[]).then(t=>new t.NativeBiometricWeb)}),le={isNative(){return me.isNativePlatform()},async isSupported(){if(this.isNative())try{const{supported:t}=await B.isSupported();return t}catch{return!1}return"NDEFReader"in window},isIOS(){return this.isNative()?me.getPlatform()==="ios":/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream},async writeTag(t,e={}){if(this.isNative())return this._writeTagNative(t,e);if(!("NDEFReader"in window))throw new Error("Web NFC is not supported in this browser. Please use Chrome on Android.");try{return await new NDEFReader().write({records:[{recordType:"url",data:t}]}),{success:!0,url:t}}catch(n){throw n.name==="NotAllowedError"?new Error("NFC permission was denied. Please allow NFC access."):n.name==="NotReadableError"?new Error("Could not read the NFC tag. Make sure the tag is close enough."):new Error(`Failed to write NFC tag: ${n.message}`)}},async _writeTagNative(t){try{return await B.startScanning({alertMessage:"Hold your NFC tag near the phone to write.",invalidateAfterFirstRead:!0}),new Promise((e,n)=>{const i=B.addListener("nfcEvent",async s=>{try{const r=this._createUrlRecord(t);await B.write({records:[r]}),options.lock&&await B.makeReadOnly(),me.isNativePlatform()&&await Vn.notification({type:ht.Success}),i.remove(),await B.stopScanning(),e({success:!0,url:t})}catch(r){me.isNativePlatform()&&await Vn.notification({type:ht.Error}),i.remove(),await B.stopScanning(),n(r)}});setTimeout(async()=>{i.remove(),await B.stopScanning(),n(new Error("NFC write timed out."))},3e4)})}catch(e){throw new Error(`Native NFC write failed: ${e.message}`)}},_createUrlRecord(t){const e=["","http://www.","https://www.","http://","https://","tel:","mailto:","ftp://anonymous:anonymous@","ftp://ftp.","ftps://","sftp://","smb://","nfs://","ftp://","dav://","news:","telnet://","imap:","rtsp://","urn:","pop:","sip:","sips:","tftp:","btspp://","btl2cap://","btgoep://","tcpobex://","irdaobex://","file://","urn:epc:id:","urn:epc:tag:","urn:epc:pat:","urn:epc:raw:","urn:nfc:wkt:","urn:nfc:ext:"];let n=0,i=t;for(let o=1;o<e.length;o++)if(t.startsWith(e[o])){n=o,i=t.substring(e[o].length);break}const r=new TextEncoder().encode(i),a=[n,...r];return{tnf:1,type:[85],id:[],payload:a}},async readTag(){if(this.isNative())return this._readTagNative();if(!("NDEFReader"in window))throw new Error("Web NFC is not supported in this browser. Please use Chrome on Android.");return new Promise((t,e)=>{const n=new NDEFReader,i=new AbortController,s=setTimeout(()=>{i.abort(),e(new Error("NFC scan timed out. Please try again."))},3e4);n.scan({signal:i.signal}).then(()=>{n.addEventListener("reading",({serialNumber:r,message:a})=>{clearTimeout(s),i.abort();let o=null;for(const l of a.records)if(l.recordType==="url"){o=new TextDecoder().decode(l.data);break}t({serialNumber:r,url:o,records:a.records})}),n.addEventListener("readingerror",()=>{clearTimeout(s),i.abort(),e(new Error("Error reading NFC tag. Please try again."))})}).catch(r=>{clearTimeout(s),e(r)})})},async _readTagNative(){try{return await B.startScanning({alertMessage:"Hold your NFC tag near the phone to read.",invalidateAfterFirstRead:!0}),new Promise((t,e)=>{const n=B.addListener("nfcEvent",async i=>{n.remove(),await B.stopScanning();const s=i.tag;let r=null;if(s.ndefMessage){for(const a of s.ndefMessage)if(a.type.length===1&&a.type[0]===85){const o=a.payload[0],c=["","http://www.","https://www.","http://","https://","tel:","mailto:","ftp://anonymous:anonymous@","ftp://ftp.","ftps://","sftp://","smb://","nfs://","ftp://","dav://","news:","telnet://","imap:","rtsp://","urn:","pop:","sip:","sips:","tftp:","btspp://","btl2cap://","btgoep://","tcpobex://","irdaobex://","file://","urn:epc:id:","urn:epc:tag:","urn:epc:pat:","urn:epc:raw:","urn:nfc:wkt:","urn:nfc:ext:"][o]||"",p=a.payload.slice(1),h=new TextDecoder;r=c+h.decode(new Uint8Array(p));break}}t({serialNumber:s.id?s.id.map(a=>a.toString(16).padStart(2,"0")).join(":"):null,url:r,records:s.ndefMessage})});setTimeout(async()=>{n.remove(),await B.stopScanning(),e(new Error("NFC read timed out."))},3e4)})}catch(t){throw new Error(`Native NFC read failed: ${t.message}`)}},async getCompatibilityInfo(){const t=await this.isSupported(),e=this.isNative();if(t)return{supported:!0,message:null,platform:e?"native":"web",canWriteOnIOS:e&&this.isIOS()};if(this.isIOS()&&!e)return{supported:!1,platform:"ios-web",canRead:!0,message:"iPhones can read NFC tags natively. To write tags, use Chrome on Android or the native app.",readNote:"Your iPhone reads NDEF tags automatically. To enable writing, run this app as a native iOS application."};const n=navigator.userAgent.toLowerCase();return/firefox|safari/.test(n)&&!/chrome/.test(n)?{supported:!1,platform:"unsupported-browser",canRead:!1,message:"Web NFC is only supported in Chrome on Android. Please switch to Chrome."}:/android/.test(n)?{supported:!1,platform:"android-other",canRead:!1,message:"Please make sure you are using Chrome 89+ and NFC is enabled on your device."}:{supported:!1,platform:"desktop",canRead:!1,message:"Web NFC requires Chrome on an Android device. The admin console works on any browser."}},getCompatibilityMessage(){return this.getCompatibilityInfo().message},async isBiometricAvailable(){if(!this.isNative())return!1;try{return(await qn.isAvailable()).isAvailable}catch{return!1}},async authenticateWithBiometrics(){if(!this.isNative())return!1;try{return await qn.verifyIdentity({reason:"Unlock NFC Tag Manager",title:"Authentication Required",subtitle:"Use FaceID/TouchID to access admin settings",description:"This ensures only you can manage tags."}),!0}catch(t){return console.error("Biometric Auth failed:",t),!1}}},tc={es:{dashboard:"Inicio",tags:"Tags",links:"Links",analytics:"Stats",templates:"Docs",profile:"Perfil",admin:"Admin",logout:"Salir",welcome_back:"Bienvenido de nuevo",active_links:"Enlaces Activos",registered_tags:"Etiquetas Registradas",total_taps:"Escaneos Totales",recent_activity:"Actividad Reciente",no_activity:"No hay actividad reciente en tu cuenta.",admin_console:"Consola de Administrador",manage_global:"Gestionar Sistema Global de Etiquetas",global_tags:"Etiquetas Globales",global_links:"Enlaces Globales",assign_to_client:"Asignar a Cliente",select_client:"Seleccionar un cliente existente",new_client_email:"O registrar un nuevo email de cliente:",assign_and_provision:"Asignar y Provisionar",new_tag_detected:"Nueva Etiqueta Tocaito",unclaimed_desc:"Esta etiqueta aún no ha sido reclamada. Haz clic abajo para asociarla a tu cuenta.",login_to_activate:"Iniciar Sesión para Activar",claim_tag:"Reclamar y Activar Etiqueta",provisioned_welcome:"Etiqueta Provisionada Encontrada",provisioned_desc:"Hemos detectado que esta etiqueta te pertenece. Actívala ahora o hazlo más tarde en el panel.",activate_tag:"Activar Etiqueta",cancel:"Cancelar",tag_registered:"Etiqueta registrada con éxito",link_assigned:"Enlace asignado",links:"Tus Enlaces",confirm:"Confirmar Asignación",success:"¡Éxito!",error:"Error de operación. Inténtalo de nuevo.",settings:"Ajustes",tag_id:"ID de Etiqueta",access_denied:"Acceso Denegado",already_provisioned:"Esta etiqueta ya está asignada a otro cliente.",redirecting:"Redirigiendo...",returning_in:"Redirigiendo a tu destino en",go_now:"🚀 Ir Ahora",edit_destination:"✏️ Editar Destino",login_subtitle:"Gestión Profesional de Etiquetas NFC",sign_in_google:"Iniciar sesión con Google",login_hint:"Gestión Segura en la Nube para Restaurantes",manage_tags:"Gestiona tus etiquetas NFC",search_tags:"Buscar etiquetas...",register_tag:"Registrar Etiqueta",no_tags:"No hay etiquetas registradas",no_tags_desc:"Registra una etiqueta NFC para empezar a asignar enlaces.",sn:"SN",no_link_assigned:"Sin enlace asignado",locked:"Bloqueada",geo_tagged:"Geo-etiquetada",reassign:"Reasignar",assign_link:"Asignar Enlace",my_links:"Mis Enlaces",manage_links:"Gestiona los enlaces de tus etiquetas",create_link:"Crear Enlace",no_links:"No has creado enlaces",no_links_desc:"Crea un enlace para dirigir tus etiquetas NFC a cualquier URL.",delete:"Eliminar",edit:"Editar",profile_sub:"Gestiona tu cuenta y plan",user_account:"Cuenta de Usuario",current_plan:"Plan Actual",pro_trial:"Prueba Pro",free_tier:"Plan Gratuito",free_desc:"Actualmente estás en el plan gratuito limitado.",pro_desc:"Tienes acceso a todas las funciones premium.",upgrade_pro:"Actualizar a Pro ($9.99/mes)",start_trial:"Comenzar Prueba Gratuita de 14 días",refer_friend:"Recomendar a un Amigo",refer_desc:"¡Comparte NFC Manager! Cuando se registren usando tu enlace, extenderemos tu prueba premium.",copy_link:"Copiar Enlace",plan_comparison:"Comparación de Planes"},en:{dashboard:"Home",tags:"Tags",links:"Links",analytics:"Stats",templates:"Docs",profile:"Profile",admin:"Admin",logout:"Sign Out",welcome_back:"Welcome back",active_links:"Active Links",registered_tags:"Registered Tags",total_taps:"Total Scans/Taps",recent_activity:"Recent Activity",no_activity:"No recent activity on your account.",admin_console:"Super Admin Console",manage_global:"Manage Global Tag System",global_tags:"Global Tags",global_links:"Global Links",assign_to_client:"Assign to Client",select_client:"Select existing client",new_client_email:"Or register new client email:",assign_and_provision:"Assign & Provision",new_tag_detected:"New Tocaito Tag Detected",unclaimed_desc:"This tag has not been claimed yet. Click below to add it to your account.",login_to_activate:"Login to Activate",claim_tag:"Claim and Activate Tag",provisioned_welcome:"Provisioned Tag Found",provisioned_desc:"We detected this tag belongs to you. Activate it now or do it later from your dashboard.",activate_tag:"Activate Tag",cancel:"Cancel",tag_registered:"Tag registered successfully",link_assigned:"Link assigned",links:"Your Links",confirm:"Confirm Assignment",success:"Success!",error:"Operation failed. Please try again.",settings:"Settings",tag_id:"Tag ID",access_denied:"Access Denied",already_provisioned:"This tag is already provisioned to another client.",redirecting:"Redirecting...",returning_in:"Returning to your destination in",go_now:"🚀 Go Now",edit_destination:"✏️ Edit Destination",write_nfc:"Write NFC Tag",tap_phone:"Hold Tag Against Phone",keep_holding:"Keep it there until done",tag_written:"Tag Written Successfully!",success:"Success",error:"Error",warning:"Warning",tag_registered:"Tag registered to your account!",link_assigned:"Link assigned successfully!"}};function g(t){return t?String(t).replace(/[&<>"']/g,function(e){switch(e){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#39;";default:return e}}):""}function q(t){if(!t)return!1;try{const e=new URL(t);return e.protocol==="http:"||e.protocol==="https:"}catch{return!1}}const Hi="nfc_tag_manager",nc="fabian.velez1996@gmail.com",ic=Object.freeze([]);class sc extends Map{get(e){return super.get(e)||ic}}const Ht={settings:{brandName:"Tocaito",restaurantMode:!0,restaurantName:"",isAuthenticated:!1,user:null,nfcCompat:{supported:!1,platform:"loading"},useBiometrics:!1,dynamicRedirection:!0,theme:"system",language:"es"},subscription:{tier:"free",trialStartedAt:null,trialEndsAt:null,status:"active"},links:[],tags:[],activity:[],analytics:[],clients:[]};function rc(){try{const t=localStorage.getItem(Hi);if(t){const e=JSON.parse(t);return{...Ht,...e}}}catch(t){console.warn("Failed to load store data:",t)}return{...Ht}}function Wi(t){try{localStorage.setItem(Hi,JSON.stringify(t))}catch(e){console.error("Failed to save store data:",e)}}let u=rc();const Rt=new Set;let Ee;const ac=500;function oc(t){Ee&&clearTimeout(Ee),Ee=setTimeout(()=>{Wi(t),Ee=null},ac)}typeof window<"u"&&window.addEventListener("beforeunload",()=>{Ee&&clearTimeout(Ee),Wi(u)});const d={_cache:{},subscribe(t){return Rt.add(t),()=>Rt.delete(t)},_notify(){this._cache={},oc(u),Rt.forEach(t=>t(u))},get isAuthenticated(){return!!u.settings.user},async loginWithGoogle(){try{const t=await xa(Ft,$o);return u.settings.isAuthenticated=!0,u.settings.user={id:t.user.uid,email:t.user.email,displayName:t.user.displayName,photoURL:t.user.photoURL},this._notify(),!0}catch(t){throw console.error("Google Sign-In Error:",t),t}},async logout(){try{await ma(Ft),u.settings.isAuthenticated=!1,u.settings.user=null,this._notify()}catch(t){console.error("Logout Error:",t)}},get user(){return u.settings.user},get nfcCompat(){return u.settings.nfcCompat},async refreshNfcCompat(){u.settings.nfcCompat=await le.getCompatibilityInfo(),this._notify()},isSuperAdmin(){return u.settings.user?.email?.toLowerCase()===nc.toLowerCase()},setLanguage(t){["es","en"].includes(t)&&(u.settings.language=t,this._notify())},t(t){const e=u.settings.language||"es";return tc[e][t]||t},async init(){u.settings.adminPin&&delete u.settings.adminPin;try{await this.refreshNfcCompat()}catch(t){console.error("Store init: failed to refresh nfcCompat",t),u.settings.nfcCompat={supported:!1,platform:"error",message:"NFC support check failed"}}this._notify()},get settings(){return{...u.settings}},updateSettings(t){u.settings={...u.settings,...t},this._notify()},get linksById(){return this._cache.linksById||(this._cache.linksById=new Map(u.links.map(t=>[t.id,t]))),this._cache.linksById},get tagsById(){return this._cache.tagsById||(this._cache.tagsById=new Map(u.tags.map(t=>[t.id,t]))),this._cache.tagsById},get tagsByLinkId(){if(!this._cache.tagsByLinkId){const t=new sc;for(const e of u.tags)e.assignedLinkId&&(t.has(e.assignedLinkId)||t.set(e.assignedLinkId,[]),t.get(e.assignedLinkId).push(e));this._cache.tagsByLinkId=t}return this._cache.tagsByLinkId},get links(){return this._cache.links||(this.isSuperAdmin()?this._cache.links=[...u.links]:this._cache.links=u.links.filter(t=>t.ownerEmail===this.user?.email||!t.ownerEmail)),this._cache.links},getLink(t){const e=this.linksById.get(t);return this.isSuperAdmin()||e&&(e.ownerEmail===this.user?.email||!e.ownerEmail)?e:null},get subscription(){return u.subscription},isPremium(){return!0},startTrial(){if(u.subscription.trialStartedAt)return;const t=new Date,e=new Date;e.setDate(t.getDate()+14),u.subscription.trialStartedAt=t.toISOString(),u.subscription.trialEndsAt=e.toISOString(),this._addActivity("trial_started","Started 14-day premium trial"),this._notify()},upgrade(){u.subscription.tier="pro",this._addActivity("subscription_upgraded","Upgraded to Professional plan"),this._notify()},canCreateTag(){return this.isPremium()?!0:u.tags.length<3},createLink({title:t,url:e,category:n="general",icon:i="🔗"}){if(e&&!q(e))throw new Error("Invalid URL protocol. Only http and https are allowed.");const s={id:crypto.randomUUID(),title:t,url:e,category:n,icon:i,clicks:0,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),ownerEmail:this.user?.email};return u.links.unshift(s),this._addActivity("link_created",`Created link "${t}"`),this._notify(),s},updateLink(t,e){if(e.url&&!q(e.url))throw new Error("Invalid URL protocol. Only http and https are allowed.");const n=u.links.findIndex(i=>i.id===t);return n===-1?null:(u.links[n]={...u.links[n],...e,updatedAt:new Date().toISOString()},this._addActivity("link_updated",`Updated link "${u.links[n].title}"`),this._notify(),u.links[n])},deleteLink(t){const e=u.links.find(n=>n.id===t);return e?(u.links=u.links.filter(n=>n.id!==t),u.tags.forEach(n=>{n.assignedLinkId===t&&(n.assignedLinkId=null)}),this._addActivity("link_deleted",`Deleted link "${e.title}"`),this._notify(),!0):!1},incrementClicks(t){const e=u.links.find(n=>n.id===t);e&&(e.clicks++,this._notify())},get tags(){if(!this._cache.tags)if(this.isSuperAdmin())this._cache.tags=[...u.tags];else{const t=this.user?.email?.toLowerCase();this._cache.tags=u.tags.filter(e=>e.ownerEmail?.toLowerCase()===t||!e.ownerEmail)}return this._cache.tags},getTag(t){const e=this.tagsById.get(t);return this.isSuperAdmin()||e&&(e.ownerEmail?.toLowerCase()===this.user?.email?.toLowerCase()||!e.ownerEmail)?e:null},createTag({id:t=null,label:e,serialNumber:n=null,ownerEmail:i=null}){if(!this.isSuperAdmin()&&!this.canCreateTag())throw new Error("Tag limit reached. Upgrade to Pro for unlimited tags.");const s={id:crypto.randomUUID(),label:e,serialNumber:n,assignedLinkId:null,lastWritten:new Date().toISOString(),location:null,isLocked:!1,createdAt:new Date().toISOString(),ownerEmail:i||(this.isSuperAdmin()?null:this.user?.email),status:i?"provisioned":"active"};return u.tags.unshift(s),this._addActivity("tag_created",`Registered tag "${e}"`),this._notify(),s},assignTagToUser(t,e){if(!this.isSuperAdmin())throw new Error("Unauthorized");const n=this.getTag(t);return n?(n.ownerEmail=e,n.status="provisioned",this._notify(),!0):!1},createBulkTags(t,e,n=1){if(!this.isPremium()&&u.tags.length+e>3)throw new Error("Bulk creation exceeds limit. Upgrade to Pro for more tags.");const i=[];for(let s=0;s<e;s++){const r=n+s,a={id:crypto.randomUUID(),label:`${t} ${r}`,serialNumber:null,assignedLinkId:null,lastWritten:null,createdAt:new Date().toISOString()};u.tags.unshift(a),i.push(a)}return this._addActivity("tag_created",`Registered ${e} bulk tags starting with "${t}"`),this._notify(),i},updateTag(t,e){const n=u.tags.findIndex(i=>i.id===t);return n===-1?null:(u.tags[n]={...u.tags[n],...e},this._notify(),u.tags[n])},assignLinkToTag(t,e){const n=u.tags.find(s=>s.id===t),i=u.links.find(s=>s.id===e);if(!n)return!1;if(n.assignedLinkId=e,n.lastWritten=new Date().toISOString(),i?.url,u.settings.dynamicRedirection&&`${window.location.origin}${n.id}`,Capacitor.isNativePlatform())try{Geolocation.getCurrentPosition().then(s=>{n.location={lat:s.coords.latitude,lng:s.coords.longitude},this._notify()})}catch(s){console.warn("Geolocation failed:",s)}return this._addActivity("tag_assigned",`Assigned "${i?.title||"link"}" to tag "${n.label}"`),this._notify(),!0},deleteTag(t){const e=u.tags.find(n=>n.id===t);return e?(u.tags=u.tags.filter(n=>n.id!==t),this._addActivity("tag_deleted",`Deleted tag "${e.label}"`),this._notify(),!0):!1},getTagsForLink(t){return this.tagsByLinkId.get(t)||[]},get analytics(){return[...u.analytics]},get activity(){return[...u.activity].slice(0,50)},_addActivity(t,e){u.activity.unshift({id:crypto.randomUUID(),type:t,message:e,timestamp:new Date().toISOString()}),u.activity.length>100&&(u.activity=u.activity.slice(0,100))},get allClientEmails(){if(!this._cache.allClientEmails){const t=new Set;u.clients.forEach(e=>t.add(e.toLowerCase().trim())),u.tags.forEach(e=>{e.ownerEmail&&t.add(e.ownerEmail.toLowerCase().trim())}),u.links.forEach(e=>{e.ownerEmail&&t.add(e.ownerEmail.toLowerCase().trim())}),u.settings.user?.email&&t.add(u.settings.user.email.toLowerCase().trim()),this._cache.allClientEmails=Array.from(t).filter(Boolean).sort()}return this._cache.allClientEmails},get stats(){if(!this._cache.stats){const t=this.tags,e=this.links;this._cache.stats={totalTags:t.length,totalLinks:e.length,totalClicks:e.reduce((n,i)=>n+(i.clicks||0),0),activeTags:t.filter(n=>n.assignedLinkId).length,recentActivity:[...u.activity].slice(0,10)}}return this._cache.stats},reset(){u={...Ht,links:[],tags:[],activity:[]},this._notify()}};ga(Ft,t=>{t?(u.settings.isAuthenticated=!0,u.settings.user={id:t.uid,email:t.email,displayName:t.displayName,photoURL:t.photoURL}):(u.settings.isAuthenticated=!1,u.settings.user=null),d._notify()});function L(t){if(!t)return"";const e=document.createElement("div");return e.textContent=t,e.innerHTML}function S(t,e="info"){console.log(`[Toast] ${e}: ${t}`);const n=document.getElementById("toast-container")||cc(),i=document.createElement("div");i.className=`toast animate-fade-in ${e==="success"?"toast-success":e==="error"?"toast-error":"toast-info"}`;const s={success:"✅",error:"❌",info:"ℹ️",warning:"⚠️"};i.innerHTML=`
      <span class="toast-icon">${s[e]||"ℹ️"}</span>
      <div class="toast-message"></div>
      <button class="toast-close" aria-label="Close">✕</button>
    `,i.querySelector(".toast-message").textContent=t,n.appendChild(i);const r=i.querySelector(".toast-close");r.onclick=()=>i.remove(),setTimeout(()=>{i.parentElement&&(i.classList.add("animate-fade-out"),setTimeout(()=>i.remove(),300))},4e3)}function N(t){window.location.hash=t}function cc(){const t=document.createElement("div");return t.id="toast-container",t.className="toast-container",document.body.appendChild(t),t}function rn(t,e=""){return`
        <div class="page-header">
            <div>
                <h1 class="page-title">${L(t)}</h1>
                ${e?`<p class="page-subtitle">${L(e)}</p>`:""}
            </div>
        </div>
    `}const fe={};let Qe=null;function M(t,e){fe[t]=e}function Oe(){return window.location.hash.slice(1)}function lc(){const t=async()=>{let e=Oe();e.startsWith("/")||(e="/"+e),e.length>1&&e.endsWith("/")&&(e=e.slice(0,-1)),e===""&&(e="/"),console.log(`[Router] Navigating to: ${e}`);let n=null,i={};if(fe[e])n=fe[e];else for(const s in fe)if(s.includes(":")){const r=s.replace(/:[^\s/]+/g,"([^/]+)"),a=e.match(new RegExp(`^${r}$`));if(a){n=fe[s],i=(s.match(/:[^\s/]+/g)||[]).map(l=>l.slice(1)).reduce((l,c,p)=>({...l,[c]:a[p+1]}),{});break}}!n&&e==="/"&&(n=fe[""]),n||(console.warn(`[Router] 404 - No match for: ${e}`),n=fe["/404"]),Qe&&typeof Qe=="function"&&Qe(),n&&(Qe=await n(i))};return window.addEventListener("hashchange",t),t(),()=>window.removeEventListener("hashchange",t)}function dc(){const t=Oe(),e=s=>d.t(s),n=document.createElement("nav");n.id="bottom-nav",n.className="bottom-nav";const i=[{path:"/dashboard",icon:"📊",label:e("dashboard")},{path:"/links",icon:"🔗",label:e("links")},{path:"/tags",icon:"💳",label:e("tags")},{path:"/templates",icon:"📋",label:e("templates")},{path:"/profile",icon:"👤",label:e("profile")}];return d.isSuperAdmin()&&i.splice(3,0,{path:"/admin",icon:"🛡️",label:e("admin")}),n.innerHTML=`
        <div class="bottom-nav-container">
            ${i.map(s=>`
                <a href="#${s.path}" 
                   class="bottom-nav-item ${t===s.path?"active":""}" 
                   data-path="${s.path}">
                    <span class="bottom-nav-icon" aria-hidden="true">${s.icon}</span>
                    <span class="bottom-nav-label">${s.label}</span>
                </a>
            `).join("")}
        </div>
    `,n}function uc(){const t=Oe(),e=l=>d.t(l),n=document.createElement("aside");n.id="sidebar",n.className="sidebar";const i=d.settings,s=i.brandName||"Tocaito",r=i.language||"es",a=[{path:"/dashboard",icon:"📊",label:e("dashboard")},{path:"/links",icon:"🔗",label:e("links")},{path:"/tags",icon:"💳",label:e("tags")},{path:"/analytics",icon:"📈",label:e("analytics"),premium:!0},{path:"/templates",icon:"📋",label:e("templates"),premium:!0},{path:"/settings",icon:"⚙️",label:e("settings")},{path:"/profile",icon:"👤",label:e("profile")}];n.innerHTML=`
    <div class="sidebar-brand">
      <div class="sidebar-brand-icon">🍊</div>
      <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 2px;">
        <span class="sidebar-brand-text">${s}</span>
        ${d.isSuperAdmin()?`<span class="beta-badge-label">🛡️ ${e("admin").toUpperCase()}</span>`:""}
      </div>
      <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">
        <span class="toggle-icon">◀</span>
      </button>
    </div>

    <nav class="sidebar-nav">
      ${a.map(l=>`
        <a href="#${l.path}"
           class="sidebar-nav-item ${t===l.path?"active":""} ${l.premium&&!d.isPremium()?"nav-locked":""}"
           data-path="${l.path}"
           ${l.premium&&!d.isPremium()?'aria-disabled="true" tabindex="-1"':""}>
          <span class="nav-icon" aria-hidden="true">${l.icon}</span>
          <span class="nav-label">${l.label}</span>
        </a>
      `).join("")}
      ${d.isSuperAdmin()?`
        <div class="sidebar-divider" style="height: 1px; background: var(--border-color); margin: 0.5rem 1rem; opacity: 0.3;"></div>
        <a href="#/admin"
           class="sidebar-nav-item ${t==="/admin"?"active":""}"
           data-path="/admin">
          <span class="nav-icon">🛡️</span>
          <span class="nav-label">${e("admin_console")}</span>
        </a>
      `:""}
    </nav>

    <div class="sidebar-footer">
      <div style="padding: 0 1rem 1rem; display: flex; gap: 0.5rem;">
        <button class="btn-lang ${r==="es"?"active":""}" id="lang-es">ES</button>
        <button class="btn-lang ${r==="en"?"active":""}" id="lang-en">EN</button>
      </div>
      <button class="sidebar-nav-item" id="logoutBtn">
        <span class="nav-icon">🚪</span>
        <span class="nav-label">${e("logout")}</span>
      </button>
    </div>
  `;const o=dc();return{sidebar:n,bottomNav:o}}function hc(){const t=document.getElementById("sidebar"),e=document.getElementById("sidebarToggle"),n=document.getElementById("logoutBtn"),i=document.querySelector(".main-content"),s=document.getElementById("lang-es"),r=document.getElementById("lang-en");e&&e.addEventListener("click",()=>{t.classList.toggle("collapsed"),i&&i.classList.toggle("sidebar-collapsed")}),n&&n.addEventListener("click",async()=>{await d.logout(),N("/login")}),s&&s.addEventListener("click",()=>{d.setLanguage("es"),location.reload()}),r&&r.addEventListener("click",()=>{d.setLanguage("en"),location.reload()})}function an(t){document.querySelectorAll(".sidebar-nav-item[data-path]").forEach(e=>{e.classList.toggle("active",e.dataset.path===t)}),document.querySelectorAll(".bottom-nav-item[data-path]").forEach(e=>{e.classList.toggle("active",e.dataset.path===t)})}let _e=null;function pc(){return _e||(_e=document.createElement("div"),_e.className="toast-container",_e.id="toast-container",document.body.appendChild(_e)),_e}const fc={success:"✅",error:"❌",warning:"⚠️",info:"ℹ️"};function b(t,e="info",n=3500){const i=pc(),s=document.createElement("div");s.className=`toast toast-${e} animate-fade-up`,s.setAttribute("role",e==="error"||e==="warning"?"alert":"status"),s.setAttribute("aria-live",e==="error"||e==="warning"?"assertive":"polite"),s.innerHTML=`
    <span class="toast-icon" aria-hidden="true">${fc[e]}</span>
    <span class="toast-message">${g(t)}</span>
    <button class="toast-close" aria-label="Close">✕</button>
  `,s.querySelector(".toast-message").textContent=t,i.appendChild(s);const r=()=>{s.style.animation="fadeInUp 0.3s ease reverse",setTimeout(()=>s.remove(),280)};s.querySelector(".toast-close").addEventListener("click",r),setTimeout(r,n)}function gc(){const t=document.getElementById("app"),e=n=>d.t(n);t.innerHTML=`
    <div class="login-page">
      <div class="login-card card-glass animate-scale-in" style="max-width: 400px; padding: 3rem;">
        <div class="login-logo-wrap" style="text-align: center; margin-bottom: 2rem;">
          <img src="/logo.png" alt="NFC Tag Manager Logo" style="width: 120px; height: 120px; border-radius: 24px; box-shadow: var(--shadow-xl);">
        </div>
        
        <div style="text-align: center; margin-bottom: 2.5rem;">
          <h1 class="login-title" style="font-size: 2.5rem; margin-bottom: 0.5rem; letter-spacing: -0.04em; font-weight: 800;">Tocaito</h1>
          <p class="login-subtitle" style="opacity: 0.7; font-size: 0.95rem;">${e("login_subtitle")}</p>
        </div>

        <div class="login-actions">
            <button class="btn btn-primary btn-lg w-full" id="googleLoginBtn" style="height: 56px; display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: 600; font-size: 1.05rem; box-shadow: var(--shadow-lg);">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" width="20" height="20" style="filter: brightness(0) invert(1);">
              ${e("sign_in_google")}
            </button>
        </div>

        <div style="margin-top: 3rem; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem;">
          <p class="login-hint" style="font-size: 0.85rem; opacity: 0.5;">${e("login_hint")}</p>
        </div>
      </div>
    </div>
  `,document.getElementById("googleLoginBtn")?.addEventListener("click",async n=>{const i=n.currentTarget,s=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner" style="border-top-color: currentColor;"></span> Signing in...';try{await d.loginWithGoogle()&&(b("Welcome back!","success"),N("/dashboard"))}catch{b("Sign-In failed. Please try again.","error")}finally{i.disabled=!1,i.innerHTML=s}})}function mc(){const t=document.getElementById("page-content");if(!t)return;const e=d.stats,n=i=>d.t(i);t.innerHTML=`
      ${rn(n("dashboard"),n("welcome_back"))}
      
      <div class="stats-grid">
        <div class="stat-card card-glass animate-fade-up">
          <div class="stat-value">${e.totalLinks}</div>
          <div class="stat-label">${n("active_links")}</div>
        </div>
        <div class="stat-card card-glass animate-fade-up" style="animation-delay: 0.1s">
          <div class="stat-value">${e.activeTags}</div>
          <div class="stat-label">${n("registered_tags")}</div>
        </div>
        <div class="stat-card card-glass animate-fade-up" style="animation-delay: 0.2s">
          <div class="stat-value">${e.totalClicks}</div>
          <div class="stat-label">${n("total_taps")}</div>
        </div>
      </div>

      <div class="section-card card-glass animate-fade-in" style="margin-top: 2rem;">
        <div class="card-header">
          <h2 class="card-title">${n("recent_activity")}</h2>
        </div>
        
        <div class="activity-feed">
          ${e.recentActivity.length===0?`
            <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
              ${n("no_activity")}
            </div>
          `:e.recentActivity.map(i=>`
            <div class="activity-item">
              <div class="activity-icon">${vc(i.type)}</div>
              <div class="activity-content">
                <div class="activity-desc">${L(i.description)}</div>
                <div class="activity-time">${new Date(i.timestamp).toLocaleString()}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `}function vc(t){switch(t){case"tag_registered":return"💳";case"link_created":return"🔗";case"link_assigned":return"✨";case"visit":return"🖱️";default:return"📝"}}function yt(t,e=""){return`
    <header class="page-header">
      <div class="page-header-content">
        <h1 class="page-title">${g(t)}</h1>
        ${e?`<p class="page-subtitle">${g(e)}</p>`:""}
      </div>
    </header>
  `}let Me=null;function on(){return Me||(Me=document.createElement("div"),Me.id="modal-container",document.body.appendChild(Me)),Me}function D({title:t,content:e,onSubmit:n,submitLabel:i="Save",showCancel:s=!0}){const r=on();r.innerHTML=`
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal animate-scale-in" role="dialog" aria-labelledby="modalTitle">
        <div class="modal-header">
          <h3 id="modalTitle">${g(t)}</h3>
          <button class="btn-icon btn-ghost modal-close" id="modalClose" aria-label="Close">✕</button>
        </div>
        <form id="modalForm">
          <div class="modal-body" id="modalBody">
            ${e}
          </div>
          <div class="modal-footer">
            ${s?'<button type="button" class="btn btn-secondary" id="modalCancel">Cancel</button>':""}
            ${n?'<button type="submit" class="btn btn-primary" id="modalSubmit"></button>':""}
          </div>
        </form>
      </div>
    </div>
  `;const a=r.querySelector("#modalTitle");if(a&&(a.textContent=t),n){const c=r.querySelector("#modalSubmit");c&&(c.textContent=i)}r.style.display="block",document.body.style.overflow="hidden";const o=()=>F();document.getElementById("modalClose")?.addEventListener("click",o),document.getElementById("modalCancel")?.addEventListener("click",o),document.getElementById("modalBackdrop")?.addEventListener("click",c=>{c.target.id==="modalBackdrop"&&o()}),document.getElementById("modalForm")?.addEventListener("submit",c=>{c.preventDefault(),n&&n()}),setTimeout(()=>{r.querySelector("input, select, textarea")?.focus()},100);const l=c=>{c.key==="Escape"&&(o(),document.removeEventListener("keydown",l))};document.addEventListener("keydown",l)}function F(){const t=on(),e=t.querySelector(".modal");e?(e.style.animation="scaleIn 0.2s ease reverse",setTimeout(()=>{t.innerHTML="",t.style.display="none",document.body.style.overflow=""},180)):(t.innerHTML="",t.style.display="none",document.body.style.overflow="")}function ft(){const e=on().querySelector(".modal-body");if(!e)return{};const n={};return e.querySelectorAll("[name]").forEach(i=>{n[i.name]=i.value}),n}const Wt=[{value:"general",label:"General",icon:"🔗"},{value:"social",label:"Social Media",icon:"📱"},{value:"business",label:"Business",icon:"💼"},{value:"payment",label:"Payment",icon:"💳"},{value:"event",label:"Event",icon:"🎉"},{value:"portfolio",label:"Portfolio",icon:"🎨"},{value:"music",label:"Music",icon:"🎵"},{value:"other",label:"Other",icon:"📌"}];function bc(t){return Wt.find(e=>e.value===t)||Wt[0]}function Kn(t=null){return`
    <div class="form-group">
      <label class="form-label" for="linkTitle">Title</label>
      <input class="form-input" type="text" id="linkTitle" name="title"
        placeholder="e.g. My Instagram" value="${g(t?.title||"")}" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="linkUrl">URL</label>
      <input class="form-input" type="url" id="linkUrl" name="url"
        placeholder="https://..." value="${g(t?.url||"")}" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="linkCategory">Category</label>
      <select class="form-select" id="linkCategory" name="category">
        ${Wt.map(e=>`
          <option value="${e.value}" ${t?.category===e.value?"selected":""}>
            ${e.icon} ${e.label}
          </option>
        `).join("")}
      </select>
    </div>
  `}function it(){const t=document.getElementById("page-content"),e=d.links;d.tags;const n=s=>d.t(s),i=d.tagsByLinkId;t.innerHTML=`
    ${yt(n("my_links"),n("manage_links"))}

    <div class="page-container">
      <div class="links-toolbar">
        <div class="search-bar">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input class="form-input" type="text" id="linkSearch" placeholder="Search links..." aria-label="Search links">
        </div>
        <div class="toolbar-actions">
          <button class="btn btn-secondary" id="templateBtn">
            <span aria-hidden="true">📋</span> Templates
          </button>
          <button class="btn btn-primary" id="addLinkBtn">
            <span aria-hidden="true">➕</span> ${n("create_link")}
          </button>
        </div>
      </div>

      <div class="links-grid grid grid-3" id="linksGrid">
        ${e.length===0?`
          <div class="empty-state" style="grid-column: 1 / -1">
            <div class="empty-state-icon" aria-hidden="true">🔗</div>
            <h3 class="empty-state-title">${n("no_links")}</h3>
            <p class="empty-state-desc">${n("no_links_desc")}</p>
            <button class="btn btn-primary" id="emptyAddLink"><span aria-hidden="true">➕</span> ${n("create_link")}</button>
          </div>
        `:e.map((s,r)=>yc(s,i.get(s.id),r,n)).join("")}
      </div>
    </div>
  `,wc()}function yc(t,e,n,i){const s=bc(t.category),r=e.length,a=g((t.title+" "+t.url).toLowerCase());return`
    <div class="link-card card animate-fade-up" style="animation-delay: ${.05*n}s" data-id="${t.id}" data-search="${a}" data-category="${g(t.category)}">
      <div class="link-card-header">
        <span class="link-icon" aria-hidden="true">${s.icon}</span>
        <div class="link-card-actions">
          <button class="btn btn-ghost btn-icon copy-link" data-url="${g(t.url)}" title="${i("copy_link")}" aria-label="${i("copy_link")} ${g(t.title)}">📋</button>
          <button class="btn btn-ghost btn-icon edit-link" data-id="${t.id}" title="${i("edit")}" aria-label="${i("edit")} ${g(t.title)}">✏️</button>
          <button class="btn btn-ghost btn-icon delete-link" data-id="${t.id}" title="${i("delete")}" aria-label="${i("delete")} ${g(t.title)}">🗑️</button>
        </div>
      </div>
      <h3 class="link-title">${g(t.title)}</h3>
      <a class="link-url truncate" href="${q(t.url)?g(t.url):"#"}" ${q(t.url)?'target="_blank" rel="noopener"':'onclick="return false;"'}>${g(t.url)}</a>
      <div class="link-meta">
        <span class="badge badge-primary">${s.label}</span>
        ${r>0?`<span class="badge badge-success">🏷️ ${r} tag${r>1?"s":""}</span>`:""}
        <span class="link-clicks">👆 ${t.clicks} tap${t.clicks!==1?"s":""}</span>
      </div>
    </div>
  `}function wc(){const t=s=>d.t(s),e=()=>{D({title:t("create_link"),content:Kn(),submitLabel:"Create",onSubmit:()=>{const s=ft();if(!s.title||!s.url){b("Please fill in all fields","warning");return}if(!q(s.url)){b("Please enter a valid URL","error");return}try{d.createLink(s),F(),b(`Link "${s.title}" created!`,"success"),it()}catch(r){b(r.message,"error")}}})};document.getElementById("addLinkBtn")?.addEventListener("click",e),document.getElementById("emptyAddLink")?.addEventListener("click",e),document.getElementById("linksGrid")?.addEventListener("click",async s=>{const r=s.target.closest(".copy-link");if(r){s.stopPropagation();const l=r.dataset.url;try{await navigator.clipboard.writeText(l),b("Link copied to clipboard!","success")}catch{b("Failed to copy link","error")}return}const a=s.target.closest(".edit-link");if(a){s.stopPropagation();const l=d.getLink(a.dataset.id);if(!l)return;D({title:"Edit Link",content:Kn(l),submitLabel:"Save Changes",onSubmit:()=>{const c=ft();if(!c.title||!c.url){b("Please fill in all fields","warning");return}if(!q(c.url)){b("Please enter a valid URL","error");return}try{d.updateLink(l.id,c),F(),b("Link updated!","success"),it()}catch(p){b(p.message,"error")}}});return}const o=s.target.closest(".delete-link");if(o){s.stopPropagation();const l=d.getLink(o.dataset.id);if(!l)return;D({title:t("delete"),content:`<p>Are you sure you want to delete <strong>"${g(l.title)}"</strong>? This will also unassign it from any cards.</p>`,submitLabel:t("delete"),onSubmit:()=>{d.deleteLink(l.id),F(),b("Link deleted","info"),it()}});return}});let n;const i=()=>{_c(document.getElementById("linkSearch")?.value.toLowerCase()||"",document.getElementById("categoryFilter")?.value)};document.getElementById("linkSearch")?.addEventListener("input",()=>{n&&clearTimeout(n),n=setTimeout(i,300)}),document.getElementById("categoryFilter")?.addEventListener("change",i)}function _c(t,e){document.querySelectorAll(".link-card").forEach(i=>{const s=!t||i.dataset.search.includes(t),r=!e||i.dataset.category===e;i.style.display=s&&r?"":"none"})}function st(){const t=document.getElementById("page-content"),e=d.tags,n=d.links,i=s=>d.t(s);t.innerHTML=`
    ${yt(i("tags"),i("manage_tags"))}

    <div class="page-container">
      <div class="links-toolbar">
        <div class="search-bar">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input class="form-input" type="text" id="tagSearch" placeholder="${i("search_tags")}" aria-label="${i("search_tags")}">
        </div>
        <button class="btn btn-primary" id="addTagBtn">
          <span aria-hidden="true">➕</span> ${i("register_tag")}
        </button>
      </div>

      ${e.length===0?`
        <div class="empty-state">
          <div class="empty-state-icon" aria-hidden="true">🏷️</div>
          <h3 class="empty-state-title">${i("no_tags")}</h3>
          <p class="empty-state-desc">${i("no_tags_desc")}</p>
          <button class="btn btn-primary" id="emptyAddTag"><span aria-hidden="true">➕</span> ${i("register_tag")}</button>
        </div>
      `:`
        <div class="tags-list" id="tagsList">
          ${e.map((s,r)=>Ec(s,r,i)).join("")}
        </div>
      `}
    </div>
  `,Ic(n)}function Ec(t,e,n){const i=t.assignedLinkId?d.getLink(t.assignedLinkId):null,s=g((t.label+" "+(t.serialNumber||"")).toLowerCase());return`
    <div class="tag-row card animate-fade-up" style="animation-delay: ${.05*e}s" data-id="${t.id}" data-search="${s}">
      <div class="tag-row-main">
        <div class="tag-icon-wrap">
          <span class="tag-icon-big" aria-hidden="true">🏷️</span>
        </div>
        <div class="tag-info">
          <h3 class="tag-label">${g(t.label)}</h3>
          <div class="tag-details">
            ${t.serialNumber?`<span class="badge badge-info">${n("sn")}: ${g(t.serialNumber)}</span>`:""}
            ${i?`<span class="badge badge-success">🔗 ${g(i.title)}</span>`:`<span class="badge badge-warning">⚠️ ${n("no_link_assigned")}</span>`}
            <div class="tag-meta">
              ${t.isLocked?`<span class="tag-badge status-locked">🔒 ${n("locked")}</span>`:""}
              ${t.location?`<span class="tag-badge location-badge" title="${t.location.lat}, ${t.location.lng}">📍 ${n("geo_tagged")}</span>`:""}
              <span class="tag-date">Added ${new Date(t.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-row-actions">
        <button class="btn btn-secondary assign-link-btn" data-id="${t.id}">
          ${i?`🔄 ${n("reassign")}`:`🔗 ${n("assign_link")}`}
        </button>
        <button class="btn btn-ghost btn-icon write-tag-btn" data-id="${t.id}" title="Write to this tag" aria-label="Write to tag ${g(t.label)}">
          📡
        </button>
        <button class="btn btn-ghost btn-icon delete-tag-btn" data-id="${t.id}" title="Delete tag" aria-label="Delete tag ${g(t.label)}">
          🗑️
        </button>
      </div>
    </div>
  `}function Ic(t){const e=s=>d.t(s),n=()=>{const s=le.isSupported();D({title:e("register_tag"),content:`
        <div class="form-group">
          <label class="form-label" for="tagLabel">Tag Name</label>
          <input class="form-input" type="text" id="tagLabel" name="label"
            placeholder="e.g. Blue Bracelet #1" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="tagSerial">Serial Number (optional)</label>
          <div style="display: flex; gap: 8px;">
            <input class="form-input" type="text" id="tagSerial" name="serialNumber"
              placeholder="${s?"Tap 'Scan' to read tag":"Enter serial number manually (optional)"}" style="flex: 1;">
            ${s?'<button class="btn btn-secondary" id="scanTagBtn" type="button">Scan</button>':""}
          </div>
        </div>
      `,submitLabel:"Register",onSubmit:()=>{const r=ft();if(!r.label){b("Please enter a tag name","warning");return}d.createTag(r),F(),b(`Tag "${r.label}" registered!`,"success"),st()}}),s&&document.getElementById("scanTagBtn")?.addEventListener("click",async r=>{const a=r.target,o=document.getElementById("tagSerial");if(!o)return;a.disabled=!0;const l=a.textContent;a.innerHTML='<span class="spinner"></span> Scanning...';try{const c=await le.readTag();if(c.serialNumber)o.value=c.serialNumber,a.innerHTML="✅ Scanned",b("Tag scanned successfully!","success");else throw new Error("No serial number found on tag")}catch(c){a.innerHTML=l,b(c.message,"error")}finally{a.disabled=!1}})};document.getElementById("addTagBtn")?.addEventListener("click",n),document.getElementById("emptyAddTag")?.addEventListener("click",n),document.getElementById("tagsList")?.addEventListener("click",s=>{const r=s.target.closest(".assign-link-btn");if(r){const l=d.getTag(r.dataset.id);if(!l)return;if(t.length===0){b("No links available. Create a link first.","warning");return}D({title:`${e("assign_link")} to "${l.label}"`,content:`
          <div class="form-group">
            <label class="form-label">Select a link to assign</label>
            <select class="form-select" name="linkId">
              <option value="">— Choose a link —</option>
              ${t.map(c=>`
                <option value="${c.id}" ${l.assignedLinkId===c.id?"selected":""}>
                  ${g(c.title)} — ${g(c.url)}
                </option>
              `).join("")}
            </select>
          </div>
        `,submitLabel:"Assign",onSubmit:()=>{const c=ft();if(!c.linkId){b("Please select a link","warning");return}d.assignLinkToTag(l.id,c.linkId),F(),b(`Link assigned to "${l.label}"`,"success"),st()}});return}if(s.target.closest(".write-tag-btn")){N("/writer");return}const o=s.target.closest(".delete-tag-btn");if(o){const l=d.getTag(o.dataset.id);if(!l)return;D({title:"Delete Tag",content:`<p>Are you sure you want to delete <strong>"${g(l.label)}"</strong>?</p>`,submitLabel:"Delete",onSubmit:()=>{d.deleteTag(l.id),F(),b("Tag deleted","info"),st()}});return}});let i;document.getElementById("tagSearch")?.addEventListener("input",s=>{i&&clearTimeout(i),i=setTimeout(()=>{const r=s.target.value.toLowerCase();document.querySelectorAll(".tag-row").forEach(a=>{const o=!r||a.dataset.search.includes(r);a.style.display=o?"":"none"})},300)})}function kc(){const t=document.getElementById("page-content"),e=d.links,n=d.tags,i=d.nfcCompat;t.innerHTML=`
    ${yt("NFC Writer","Program your tags with digital menu links")}

    <div class="page-container">
      ${i.platform==="ios-web"?Tc(e):Cc(e,n,i)}
    </div>
  `,i.platform==="ios-web"?Sc():Lc()}function Tc(t){return`
    <!-- iOS Reading Info -->
    <div class="ios-hero card animate-fade-up">
      <div class="ios-hero-icon">📱</div>
      <h2>Your iPhone Reads Tags Natively</h2>
      <p class="ios-hero-desc">
        Just tap any programmed NFC tag on the top of your iPhone — it will automatically open the link in Safari. Using Cloud Links, you can update the destination URL instantly from the app without ever needing to rewrite the physical tag!
      </p>
      <div class="ios-how-it-works">
        <div class="ios-step">
          <span class="ios-step-num">1</span>
          <span>Wake your iPhone screen</span>
        </div>
        <div class="ios-step">
          <span class="ios-step-num">2</span>
          <span>Hold NFC tag near the top edge</span>
        </div>
        <div class="ios-step">
          <span class="ios-step-num">3</span>
          <span>Tap the notification to open the link</span>
        </div>
      </div>
    </div>

    <!-- Write from Android -->
    <div class="card animate-fade-up" style="animation-delay: 0.1s">
      <div class="card-header">
        <h2 class="card-title">✍️ Writing Tags</h2>
      </div>
      <div class="ios-write-info">
        <p>To <strong>write</strong> a new URL to an NFC card, you'll need <strong>Chrome on an Android device</strong>. Apple doesn't allow web apps to write to NFC tags.</p>

        <div class="ios-write-options">
          <div class="ios-option">
            <span class="ios-option-icon">🤖</span>
            <div>
              <strong>Option 1: Use an Android phone</strong>
              <p>Open this app in Chrome on any Android device and use the Writer page to program your tags.</p>
            </div>
          </div>
          <div class="ios-option">
            <span class="ios-option-icon">📋</span>
            <div>
              <strong>Option 2: Copy the link & use an NFC app</strong>
              <p>Copy the URL below and use a third-party NFC writer app (like NFC Tools) on your iPhone. (Because of Dynamic Redirection, you only have to do this once per tag!)</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Copy -->
    <div class="card animate-fade-up" style="animation-delay: 0.15s">
      <div class="card-header">
        <h2 class="card-title">📋 Quick Copy Link</h2>
      </div>
      <div class="ios-copy-section">
        ${t.length===0?`
          <div class="empty-state" style="padding: var(--space-lg) 0">
            <p class="empty-state-desc">No links available. Create a link first from the Links page.</p>
          </div>
        `:`
          <select class="form-select" id="iosCopySelect" aria-label="Select a link to copy">
            <option value="">— Choose a link —</option>
            ${t.map(e=>`<option value="${g(e.url)}" data-title="${g(e.title)}">${g(e.title)} — ${g(e.url)}</option>`).join("")}
          </select>
          <div class="ios-copy-preview" id="iosCopyPreview" style="display: none;">
            <code class="ios-copy-url" id="iosCopyUrl"></code>
            <button class="btn btn-primary" id="iosCopyBtn">
              <span aria-hidden="true">📋</span> Copy URL
            </button>
          </div>
        `}
      </div>
    </div>

    <!-- Compatible Devices -->
    <div class="card animate-fade-up" style="animation-delay: 0.2s">
      <div class="card-header">
        <h2 class="card-title">📖 iPhone NFC Compatibility</h2>
      </div>
      <div class="ios-compat-table">
        <div class="ios-compat-row">
          <span class="ios-compat-device">iPhone 7 – X</span>
          <span class="badge badge-warning">Read via app only</span>
        </div>
        <div class="ios-compat-row">
          <span class="ios-compat-device">iPhone XS / XR and later</span>
          <span class="badge badge-success">✅ Background reading</span>
        </div>
        <div class="ios-compat-row">
          <span class="ios-compat-device">iOS 13+</span>
          <span class="badge badge-info">Required for NDEF</span>
        </div>
      </div>
    </div>
  `}function Sc(t){const e=document.getElementById("iosCopySelect"),n=document.getElementById("iosCopyPreview"),i=document.getElementById("iosCopyUrl"),s=document.getElementById("iosCopyBtn");e?.addEventListener("change",()=>{const r=e.value;r&&n&&i?(i.textContent=r,n.style.display="flex"):n&&(n.style.display="none")}),s?.addEventListener("click",async()=>{const r=e?.value;if(r)try{await navigator.clipboard.writeText(r),s.innerHTML='<span aria-hidden="true">✅</span> Copied!',b("URL copied to clipboard!","success"),setTimeout(()=>{s.innerHTML='<span aria-hidden="true">📋</span> Copy URL'},2e3)}catch{const a=document.createElement("textarea");a.value=r,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),s.innerHTML='<span aria-hidden="true">✅</span> Copied!',b("URL copied to clipboard!","success"),setTimeout(()=>{s.innerHTML='<span aria-hidden="true">📋</span> Copy URL'},2e3)}})}function Cc(t,e,n){const i=n.supported;return`
      ${i?"":`
        <div class="card nfc-compat-warning animate-fade-up">
          <div class="nfc-compat-icon">⚠️</div>
          <h3>NFC Not Available</h3>
          <p>${g(n.message)}</p>
          <p class="nfc-compat-note">You can still manage links and tags — just use an Android device with Chrome to write them.</p>
        </div>
      `}

      <div class="writer-layout">
        <!-- Step 1: Select what to write -->
        <div class="writer-step card animate-fade-up" style="animation-delay: 0.1s">
          <div class="writer-step-header">
            <span class="writer-step-num">1</span>
            <h2>Select Link & Tag</h2>
          </div>

          <div class="writer-link-selector">
            ${t.length===0?`
              <div class="empty-state" style="padding: var(--space-lg) 0">
                <p class="empty-state-desc">No links available. Create a link first from the Links page.</p>
              </div>
            `:`
              <select class="form-input" id="linkSelect">
                  ${t.map(s=>`<option value="${s.id}">${s.icon} ${g(s.title)}</option>`).join("")}
              </select>
            </div>

            <div class="form-group-row" style="margin-top: var(--space-md)">
                <div class="form-info">
                    <label class="form-label">Lock Tag (Permanent)</label>
                    <div class="form-group animate-fade-up" style="animation-delay: 0.1s">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem">
                        <label class="form-label" style="margin-bottom:0">Lock Tag (Read-Only)</label>
                        <span class="badge ${d.isPremium()?"badge-info":"badge-secondary"}">${d.isPremium()?"Pro":"Pro Feature"}</span>
                    </div>
                    <label class="toggle-switch ${d.isPremium()?"":"disabled"}">
                        <input type="checkbox" id="lock-tag-toggle" ${d.isPremium()?"":"disabled"}>
                        <span class="toggle-slider"></span>
                    </label>
                    <p class="text-sm text-muted" style="margin-top: 0.5rem">Permanent. Once locked, the tag cannot be erased or rewritten.</p>
                </div>
                </div>
            </div>

            <div class="writer-actions">
                <label class="form-label">Assign to Registered Tag (Optional)</label>
                <select class="form-select" id="writerTagSelect" aria-label="Select a registered tag">
                  <option value="">— Select a tag —</option>
                  ${e.map(s=>`<option value="${s.id}">${g(s.label)} ${s.assignedLinkId?"(Assigned)":"(Unassigned)"}</option>`).join("")}
                </select>
              </div>

              <div class="form-group" style="margin-top: -var(--space-sm)">
                <label class="checkbox-container" style="display: flex; align-items: center; gap: var(--space-sm); font-size: var(--font-size-sm); cursor: pointer;">
                  <input type="checkbox" id="sequentialMode">
                  <span><strong>Sequential Mode</strong> (Auto-advance to next tag after writing)</span>
                </label>
              </div>

              <div class="writer-link-preview" id="writerLinkPreview" style="display: none;">
                <span class="preview-label">Destination URL:</span>
                <code class="preview-url" id="previewUrl"></code>
              </div>
            `}
          </div>
        </div>

        <!-- Step 2: Optional tag assignment -->
        <div class="writer-step card animate-fade-up" style="animation-delay: 0.15s">
          <div class="writer-step-header">
            <span class="writer-step-num">2</span>
            <h2>Assign to Tag (Optional)</h2>
          </div>

          <select class="form-select" id="writerTagSelect" aria-label="Assign to a tag">
            <option value="">— No specific tag —</option>
            ${e.map(s=>`<option value="${s.id}">${g(s.label)}${s.serialNumber?` (${g(s.serialNumber)})`:""}</option>`).join("")}
          </select>
        </div>

        <!-- Step 3: Write -->
        <div class="writer-step card animate-fade-up" style="animation-delay: 0.2s">
          <div class="writer-step-header">
            <span class="writer-step-num">3</span>
            <h2>Write to Tag</h2>
          </div>

          <div class="writer-action-area" id="writerActionArea">
            <div class="nfc-tap-target" id="nfcTapTarget">
              <div class="nfc-tap-icon-wrap">
                <div class="nfc-tap-icon" aria-hidden="true">📡</div>
                <div class="nfc-ring"></div>
                <div class="nfc-ring"></div>
                <div class="nfc-ring"></div>
              </div>
              <p class="nfc-tap-label">Tap your NFC tag to write</p>
            </div>

            <button class="btn btn-primary btn-lg" id="writeBtn" ${i?"":"disabled"}>
              <span aria-hidden="true">📡</span> Write to Tag
            </button>

            <div class="writer-status" id="writerStatus" style="display: none;"></div>
          </div>
        </div>
      </div>
    `}function Lc(){const t=document.getElementById("writerLinkSelect"),e=document.getElementById("writerTagSelect"),n=document.getElementById("writeBtn"),i=document.getElementById("writerLinkPreview"),s=document.getElementById("previewUrl"),r=document.getElementById("writerStatus"),a=document.getElementById("nfcTapTarget");t?.addEventListener("change",()=>{const o=d.getLink(t.value);o&&i?(i.style.display="block",s.textContent=o.url):i&&(i.style.display="none")}),n?.addEventListener("click",async()=>{const o=t?.value;if(!o){b("Please select a link first","warning");return}if(d.getLink(o)){n.disabled=!0,n.innerHTML='<span class="spinner"></span> Hold tag near device...',a.classList.add("active"),r.style.display="block",r.className="writer-status status-writing",r.innerHTML='<span class="spinner"></span> Waiting for NFC tag... Hold the tag near your device.';try{const c=e?.value,p=t?.value,h=document.getElementById("lockTagToggle")?.checked||!1,f=d.getTag(c),w=d.getLink(p);if(!w)throw new Error("Selected link not found");if(r.className="writer-status info animate-pulse",r.innerHTML=`<span>📡</span> Preparing to program <strong>${g(f?.label||"tag")}</strong>...`,c&&!d.assignLinkToTag(c,p))throw new Error("Failed to update tag in database");const E=d.settings;let A=w.url;if(E.dynamicRedirection&&c&&(A=`${window.location.origin}/#/r/${c}`),await le.writeTag(A,{lock:h}),r.className="writer-status status-success",r.innerHTML=`
        <span class="status-icon">✅</span>
        <div>
          <strong>Tag written successfully!</strong>
          <p>URL: ${g(A)}</p>
        </div>
      `,document.getElementById("sequentialMode")?.checked&&e){const U=e.selectedIndex+1;if(U<e.options.length){e.selectedIndex=U;const he=d.getTag(e.value);r.innerHTML+=`<p style="margin-top: var(--space-sm); color: var(--color-primary-light);"><strong>Ready for next: ${g(he?.label||"Next Tag")}</strong></p>`}else b("All tags in list programmed!","success")}b("NFC tag written successfully!","success")}catch(c){r.className="writer-status status-error",r.innerHTML=`
        <span class="status-icon">❌</span>
        <div>
          <strong>Write failed</strong>
          <p>${g(c.message)}</p>
        </div>
      `,b(g(c.message),"error")}finally{n.disabled=!1,n.innerHTML="<span>📡</span> Write to Tag",a.classList.remove("active")}}})}function Ac(){const t=document.getElementById("page-content"),e=d.settings;t.innerHTML=`
    ${yt("Settings","Configure your NFC management environment")}

    <div class="page-container">
      <div class="card animate-fade-up">
        <div class="card-header">
          <h2 class="card-title">General Settings</h2>
        </div>
        <div class="settings-form">
          <div class="form-group">
            <label class="form-label" for="brandName">Brand Name</label>
            <input class="form-input" type="text" id="brandName" value="${g(e.brandName||"")}" placeholder="e.g. My Awesome Brand">
          </div>
          
          <div class="form-group">
            <label class="form-label" for="themeSelect">Theme</label>
            <select class="form-select" id="themeSelect">
              <option value="system" ${e.theme==="system"?"selected":""}>System Default</option>
              <option value="light" ${e.theme==="light"?"selected":""}>Light Mode</option>
              <option value="dark" ${e.theme==="dark"?"selected":""}>Dark Mode</option>
            </select>
          </div>
          
          <div class="settings-divider"></div>

          <div>
            <div class="form-group">
              <label class="form-label" for="restaurantName">Restaurant Name</label>
              <input class="form-input" type="text" id="restaurantName" value="${g(e.restaurantName||"")}" placeholder="e.g. La Trattoria">
            </div>
          </div>

          <div class="settings-divider"></div>

          <div class="form-group-row">
            <div class="form-info">
              <label class="form-label">Biometric Authentication</label>
              <p class="form-desc">Use FaceID or TouchID to unlock administrative settings.</p>
            </div>
            <label class="switch">
              <input type="checkbox" id="useBiometrics" ${e.useBiometrics?"checked":""}>
              <span class="slider round"></span>
            </label>
          </div>



          <div class="settings-actions">
            <button class="btn btn-primary" id="saveSettingsBtn">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  `,Pc()}function Pc(){document.getElementById("restaurantSettings"),document.getElementById("saveSettingsBtn")?.addEventListener("click",()=>{const e=document.getElementById("brandName").value,n=document.getElementById("restaurantName").value,i=document.getElementById("useBiometrics").checked,s=document.getElementById("themeSelect").value;d.updateSettings({brandName:e,restaurantName:n,useBiometrics:i,theme:s}),b("Settings saved successfully!","success"),e&&(document.title=e)})}function Rc(){const t=document.getElementById("app"),e=d.getAnalytics(),n=d.data.links,i=e.length,s=e.filter(a=>a.timestamp>Date.now()-864e5).length,r=[...n].sort((a,o)=>(o.clicks||0)-(a.clicks||0)).slice(0,5);t.innerHTML=`
        <div class="page-header">
            <div>
                <h1 class="page-title">Analytics</h1>
                <p class="page-subtitle">Track engagement and customer scans</p>
            </div>
            <button class="btn btn-secondary" id="exportCsvBtn">
                <span>📊</span> Export CSV
            </button>
        </div>

        <div class="stats-grid">
            <div class="stat-card animate-fade-up">
                <div class="stat-label">Total Lifetime Scans</div>
                <div class="stat-value">${i}</div>
                <div class="stat-trend trend-up">↑ Scans from all tags</div>
            </div>
            <div class="stat-card animate-fade-up" style="animation-delay: 0.1s">
                <div class="stat-label">Last 24 Hours</div>
                <div class="stat-value">${s}</div>
                <div class="stat-trend ${s>0?"trend-up":""}">Engagement today</div>
            </div>
        </div>

        <div class="card-glass animate-fade-up" style="margin-top: var(--space-xl); animation-delay: 0.2s">
            <h2 class="section-title">Top Performing Links</h2>
            <div class="analytics-list">
                ${r.length===0?'<p class="empty-state-desc">No scan data yet.</p>':r.map(a=>`
                    <div class="analytics-item">
                        <div class="analytics-info">
                            <span class="analytics-icon">${a.icon}</span>
                            <div>
                                <div class="analytics-name">${L(a.title)}</div>
                                <div class="analytics-url">${L(a.url)}</div>
                            </div>
                        </div>
                        <div class="analytics-count">
                            <span class="count-number">${a.clicks||0}</span>
                            <span class="count-label">scans</span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>

        <div class="card-glass animate-fade-up" style="margin-top: var(--space-xl); animation-delay: 0.3s">
            <h2 class="section-title">Recent Activity</h2>
            <div class="recent-scans">
                ${e.length===0?'<p class="empty-state-desc">Waiting for first scan...</p>':e.slice(-10).reverse().map(a=>{const o=d.getLink(a.linkId),l=a.tagId?d.getTag(a.tagId):null;return`
                        <div class="scan-log-item">
                            <div class="scan-time">${new Date(a.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
                            <div class="scan-details">
                                <strong>${L(o?.title||"Unknown")}</strong> scanned via 
                                <span>${L(l?.label||"Direct Link")}</span>
                            </div>
                        </div>
                    `}).join("")}
            </div>
        </div>
    `,document.getElementById("exportCsvBtn")?.addEventListener("click",()=>{const a=d.exportToCSV();if(!a){b("No data to export yet!","warning");return}const o=new Blob([a],{type:"text/csv"}),l=window.URL.createObjectURL(o),c=document.createElement("a");c.setAttribute("hidden",""),c.setAttribute("href",l),c.setAttribute("download",`nfc_analytics_${new Date().toISOString().split("T")[0]}.csv`),document.body.appendChild(c),c.click(),document.body.removeChild(c)})}const Jn=[{id:"restaurant",name:"🍴 Restaurant & Cafe",description:"Set up digital menus and Google Reviews.",links:[{title:"Digital Menu",url:"https://example.com/menu",icon:"📜"},{title:"Google Review",url:"https://g.page/r/your-id/review",icon:"⭐"},{title:"Instagram",url:"https://instagram.com/your-restaurant",icon:"📸"}]},{id:"hospitality",name:"🏨 Hospitality & Hotels",description:"Guest services, Wi-Fi, and check-in portals.",links:[{title:"Guest Services",url:"https://example.com/services",icon:"🛎️"},{title:"Wi-Fi Portal",url:"https://example.com/wifi",icon:"📶"},{title:"Area Guide",url:"https://example.com/guide",icon:"🗺️"}]},{id:"business",name:"💼 Digital Business Card",description:"Share your LinkedIn, vCard, and Portfolio.",links:[{title:"LinkedIn Profile",url:"https://linkedin.com/in/username",icon:"🔗"},{title:"Portfolio Website",url:"https://yourportfolio.com",icon:"🌐"},{title:"Download vCard",url:"https://example.com/contact.vcf",icon:"📇"}]}];function Nc(){const t=document.getElementById("page-content");t&&(t.innerHTML="",t.innerHTML=`
        <div class="page-header">
            <div>
                <h1 class="page-title">Business Templates</h1>
                <p class="page-subtitle">Quickly set up your NFC tags with industry presets</p>
            </div>
        </div>

        <div class="templates-grid">
            ${Jn.map(e=>`
                <div class="card-glass template-card animate-fade-up">
                    <div class="template-header">
                        <h2 class="template-title">${e.name}</h2>
                        <p class="template-desc">${e.description}</p>
                    </div>
                    <div class="template-preview">
                        ${e.links.map(n=>`
                            <div class="template-link-pill">
                                <span>${n.icon}</span> ${n.title}
                            </div>
                        `).join("")}
                    </div>
                    <div class="template-footer" style="margin-top: auto;">
                        <button class="btn btn-primary template-apply-btn w-full" data-id="${e.id}">
                            Use Template
                        </button>
                    </div>
                </div>
            `).join("")}
        </div>
    `,t.querySelectorAll(".template-apply-btn").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-id"),i=Jn.find(s=>s.id===n);i&&confirm(`Apply "${i.name}" template? This will add 3 pre-configured links.`)&&(i.links.forEach(s=>{d.createLink({title:s.title,url:s.url,icon:s.icon,category:i.id})}),S(`${i.name} links added!`,"success"),N("/links"))})}))}function zt(){const t=document.getElementById("page-content");if(!t)return;const e=d.user,n=d.subscription,i=d.isPremium(),s=n.trialEndsAt?new Date(n.trialEndsAt).toLocaleDateString():null,r=a=>d.t(a);t.innerHTML=`
        ${rn(r("profile"),r("profile_sub"))}

        <div class="page-container animate-fade-in">
            <div class="grid grid-2">
                <!-- User Profile Card -->
                <div class="card-glass">
                    <div class="card-header">
                        <h3 class="card-title">${r("user_account")}</h3>
                    </div>
                    <div class="profile-info">
                        <div class="profile-avatar">
                            ${e?.photoURL&&q(e.photoURL)?`<img src="${L(e.photoURL)}" alt="Avatar">`:`<div class="avatar-placeholder">${e?.displayName?.[0]||"U"}</div>`}
                        </div>
                        <div class="profile-details">
                            <div class="profile-name">${L(e?.displayName||"Tocaito User")}</div>
                            <div class="profile-email">${L(e?.email||"authenticated via device")}</div>
                        </div>
                    </div>
                    <div class="card-actions" style="margin-top: 2rem">
                        <button class="btn btn-secondary btn-sm" id="logout-btn">${r("logout")}</button>
                    </div>
                </div>

                <!-- Subscription Status Card -->
                <div class="card-glass ${i?"card-pro":""}">
                    <div class="card-header">
                        <h3 class="card-title">${r("current_plan")}</h3>
                        <span class="badge ${i?"badge-primary":"badge-secondary"}">
                            ${n.tier==="pro"?"Professional":n.trialEndsAt&&i?r("pro_trial"):r("free_tier")}
                        </span>
                    </div>
                    
                    <div class="subscription-card-body">
                        ${i?`
                            <p class="text-secondary">${r("pro_desc")}</p>
                            <ul class="plan-features">
                                <li class="feat-enabled">Advanced Analytics</li>
                                <li class="feat-enabled">Industry Templates</li>
                                <li class="feat-enabled">Unlimited Tags</li>
                                <li class="feat-enabled">Biometric Security</li>
                            </ul>
                            <p class="text-sm text-muted" style="margin-top: 1rem">
                                ${n.tier==="pro"?"Renews on next billing cycle":`Trial ends on <strong>${s}</strong>`}
                            </p>
                            <div class="card-actions" style="margin-top: 1.5rem">
                                <button class="btn btn-secondary w-full" id="manage-sub-btn">Manage Subscription (Stripe)</button>
                            </div>
                        `:`
                            <p class="text-secondary">${r("free_desc")}</p>
                            <ul class="plan-features">
                                <li class="feat-disabled">Analytics Dashboard</li>
                                <li class="feat-disabled">Business Templates</li>
                                <li class="feat-disabled">Geo-tagging & Locking</li>
                                <li>Max 3 NFC Tags</li>
                            </ul>
                            <div class="card-actions" style="margin-top: 1.5rem">
                                <button class="btn btn-primary w-full" id="upgrade-btn">${r("upgrade_pro")}</button>
                                ${n.trialStartedAt?"":`
                                    <button class="btn btn-secondary w-full" id="start-trial-btn" style="margin-top: 0.5rem">${r("start_trial")}</button>
                                `}
                            </div>
                        `}
                    </div>
                </div>

                <!-- Refer a Friend Card -->
                <div class="card-glass" style="grid-column: 1 / -1;">
                    <div class="card-header">
                        <h3 class="card-title">🎁 ${r("refer_friend")}</h3>
                    </div>
                    <div class="subscription-card-body">
                        <p class="text-secondary" style="margin-bottom: 1rem;">
                            ${r("refer_desc")}
                        </p>
                        <div class="form-group" style="display: flex; gap: var(--space-sm);">
                            <input class="form-input" style="flex:1;" type="text" readonly id="referralLink" value="https://nfc-manager-fv96.web.app/?ref=${e?.id||"early-tester"}">
                            <button class="btn btn-primary" id="copyReferralBtn">${r("copy_link")}</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Plan Comparison Table -->
            <div class="card-glass" style="margin-top: 2rem">
                <div class="card-header">
                    <h3 class="card-title">${r("plan_comparison")}</h3>
                </div>
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Free</th>
                            <th>Pro</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NFC Tag Management</td>
                            <td>3 Tags</td>
                            <td>Unlimited</td>
                        </tr>
                        <tr>
                            <td>Dynamic Redirection</td>
                            <td>✅</td>
                            <td>✅</td>
                        </tr>
                        <tr>
                            <td>Analytics & CSV</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                        <tr>
                            <td>Business Templates</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                        <tr>
                            <td>Tag Locking (Security)</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                        <tr>
                            <td>Geo-tagging Assets</td>
                            <td>❌</td>
                            <td>✅</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,t.querySelector("#logout-btn")?.addEventListener("click",()=>{d.logout().then(()=>{window.location.hash="/login"})}),t.querySelector("#start-trial-btn")?.addEventListener("click",()=>{d.startTrial(),S("Premium trial started! Enjoy all features.","success"),zt()}),t.querySelector("#upgrade-btn")?.addEventListener("click",()=>{S("Stripe Checkout integration placeholder...","info"),setTimeout(()=>{d.upgrade(),S("Welcome to Pro! Plan activated.","success"),zt()},1500)}),t.querySelector("#copyReferralBtn")?.addEventListener("click",async()=>{const a=document.getElementById("referralLink");if(a)try{await navigator.clipboard.writeText(a.value),S("Referral link copied to clipboard!","success")}catch{a.select(),document.execCommand("copy"),S("Referral link copied to clipboard!","success")}})}function $c({id:t}){const e=document.getElementById("app"),n=h=>d.t(h),i=d.getTag(t);if(!i){e.innerHTML='<div class="p-4 text-center">Tag not found</div>';return}const s=d.isAuthenticated,r=d.user?.email?.toLowerCase().trim(),a=i.ownerEmail?.toLowerCase().trim(),o=a&&a===r,l=i.assignedLinkId,c=l?d.getLink(i.assignedLinkId):null;if(o&&l&&c&&q(c.url)){d.incrementClicks(c.id),e.innerHTML=`
            <div class="login-page">
                <div class="card-glass animate-fade-up" style="text-align:center; padding: 2.5rem; max-width: 450px">
                    <div class="stat-icon green" style="margin: 0 auto var(--space-md); font-size: 2.5rem; background: rgba(76, 175, 80, 0.1); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">🔗</div>
                    <h1 style="font-size: 1.75rem; margin-bottom: 0.5rem;" class="text-gradient">${n("redirecting")}</h1>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                        ${n("returning_in")} <span id="redirect-countdown" style="font-weight: 600; color: var(--text-primary);">3</span>s.
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: var(--space-md);">
                        <a href="${g(c.url)}" class="btn btn-primary w-full" style="height: 52px; font-weight: 600;">
                            ${n("go_now")}
                        </a>
                        <button id="edit-destination-btn" class="btn btn-outline w-full" style="border-color: var(--border-color); color: var(--text-secondary);">
                            ${n("edit_destination")}
                        </button>
                        <a href="#/dashboard" style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">${n("cancel")} & ${n("dashboard")}</a>
                    </div>
                </div>
            </div>
        `;let h=3;const f=document.getElementById("redirect-countdown"),w=setInterval(()=>{h--,f&&(f.textContent=h),h<=0&&(clearInterval(w),window.location.href=c.url)},1e3);document.getElementById("edit-destination-btn")?.addEventListener("click",()=>{clearInterval(w),Yn(i.id)});return}if(a&&a!==r&&!d.isSuperAdmin()){if(l&&c&&q(c.url)){d.incrementClicks(c.id),window.location.href=c.url;return}e.innerHTML=`
            <div class="login-page">
                <div class="card-glass animate-fade-up" style="text-align:center; padding: 2.5rem; max-width: 450px">
                    <div class="stat-icon red" style="margin: 0 auto var(--space-md);">🔒</div>
                    <h1 style="font-size: 1.75rem; margin-bottom: 0.5rem;">${n("access_denied")}</h1>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                        ${n("already_provisioned")}
                    </p>
                    <a href="#/dashboard" class="btn btn-primary w-full">${n("dashboard")}</a>
                </div>
            </div>
        `;return}e.innerHTML=`
        <div class="login-page">
            <div class="card-glass animate-fade-up" style="text-align:center; padding: 2.5rem; max-width: 450px">
                <div class="stat-icon ${o?"green":"orange"}" style="margin: 0 auto var(--space-md); font-size: 2.5rem; background: ${o?"rgba(76, 175, 80, 0.1)":"rgba(255, 126, 68, 0.1)"}; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">${o?"🎁":"📡"}</div>
                
                <h1 style="font-size: 1.75rem; margin-bottom: 0.5rem;" class="text-gradient">
                    ${n(o?"provisioned_welcome":"new_tag_detected")}
                </h1>
                <p style="color: var(--text-secondary); margin-bottom: 2rem; font-size: 0.95rem;">
                    ${n(o?"provisioned_desc":s?"unclaimed_desc":"login_to_activate")}
                </p>

                <div style="display: flex; flex-direction: column; gap: var(--space-md);">
                    ${s?`
                        <button id="activate-tag-btn" class="btn btn-primary w-full" style="height: 52px; font-weight: 600; background: ${o?"var(--color-success)":"var(--color-primary)"};">
                            ${n(o?"activate_tag":"claim_tag")}
                        </button>
                    `:`
                        <button id="login-to-claim-btn" class="btn btn-primary w-full" style="height: 52px; font-weight: 600;">
                            🔑 ${n("login_to_activate")}
                        </button>
                    `}

                    ${c&&q(c.url)?`
                        <a href="${g(c.url)}" id="skip-to-destination" class="btn btn-outline w-full" style="border-color: var(--border-color); color: var(--text-secondary);">
                            ➡️ ${n("cancel")} & ${n("dashboard")}
                        </a>
                    `:`
                        <a href="#/dashboard" style="font-size: 0.85rem; color: var(--text-muted);">${n("dashboard")}</a>
                    `}
                </div>
                
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); font-size: 0.75rem; color: var(--text-muted);">
                    ${n("tag_id")}: <span style="font-family: monospace; opacity: 0.8;">${g(t)}</span>
                </div>
            </div>
        </div>
    `,document.getElementById("activate-tag-btn")?.addEventListener("click",()=>{try{const h=d.createTag({id:t,label:o?"Provisioned Tag":"New Tocaito Tag"});S(n("tag_registered"),"success"),Yn(h.id)}catch(h){S(h.message,"error")}}),document.getElementById("login-to-claim-btn")?.addEventListener("click",()=>{sessionStorage.setItem("pending_tag_activation",t),N("/login")}),document.getElementById("skip-to-destination")?.addEventListener("click",()=>{c&&d.incrementClicks(c.id)})}function Yn(t){const e=d.links,n=i=>d.t(i);D({title:`🔗 ${n("link_assigned")}`,content:`
            <p style="margin-bottom: var(--space-md); color: var(--text-secondary); font-size: 0.9rem;">What should happen when someone taps this tag?</p>
            <div class="form-group">
                <label class="form-label">${n("links")}</label>
                <select class="form-select" id="claim-link-select">
                    <option value="">— Select a saved link —</option>
                    ${e.map(i=>`<option value="${g(i.id)}">${g(i.icon)} ${g(i.title)}</option>`).join("")}
                </select>
            </div>
        `,submitLabel:`🚀 ${n("confirm")}`,onSubmit:()=>{const i=document.getElementById("claim-link-select").value;i?(d.assignLinkToTag(t,i),S(n("link_assigned"),"success"),F(),N("/tags")):(F(),N("/tags"))}})}function zi(){const t=document.getElementById("page-content");if(!t)return;const e=d.stats,n=d.tags,i=s=>d.t(s);t.innerHTML=`
      ${rn(i("admin_console"),i("manage_global"))}
      
      <div class="stats-grid">
        <div class="stat-card card-glass">
          <div class="stat-value">${e.totalTags}</div>
          <div class="stat-label">${i("global_tags")}</div>
        </div>
        <div class="stat-card card-glass">
          <div class="stat-value">${e.totalLinks}</div>
          <div class="stat-label">${i("global_links")}</div>
        </div>
        <div class="stat-card card-glass">
          <div class="stat-value">${e.totalClicks}</div>
          <div class="stat-label">${i("total_taps")}</div>
        </div>
      </div>

      <div class="section-card card-glass animate-fade-in" style="margin-top: 2rem;">
        <div class="card-header">
          <h2 class="card-title">🛡️ ${i("global_tags")}</h2>
        </div>

        <div class="table-container animate-fade-up" style="animation-delay: 0.1s">
          <table class="data-table">
            <thead>
              <tr>
                <th>Tag Label</th>
                <th>Serial / ID</th>
                <th>Owner / Client</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${n.length===0?`
                <tr>
                  <td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    No tags registered in the system yet.
                  </td>
                </tr>
              `:n.map(s=>`
                <tr>
                  <td data-label="Tag Label">
                    <div style="font-weight: 600; color: var(--text-primary);">${L(s.label)}</div>
                    <div class="text-xs text-muted" style="font-size: 0.7rem;">ID: ${s.id.slice(0,8)}...</div>
                  </td>
                  <td data-label="Serial / ID"><code style="background: var(--bg-surface); padding: 2px 6px; border-radius: 4px;">${s.serialNumber?L(s.serialNumber):"—"}</code></td>
                  <td data-label="Owner / Client">
                    ${s.ownerEmail?`<div style="font-size: 0.85rem; color: var(--color-primary); font-weight: 500;">${L(s.ownerEmail)}</div>`:'<span class="text-muted" style="font-size: 0.8rem; font-style: italic;">Unassigned</span>'}
                  </td>
                  <td data-label="Status">
                    ${s.assignedLinkId?'<span class="badge badge-success">Active</span>':s.ownerEmail?'<span class="badge badge-warning">Provisioned</span>':'<span class="badge">Unassigned</span>'}
                  </td>
                  <td data-label="Created">${new Date(s.createdAt).toLocaleDateString()}</td>
                  <td data-label="Actions">
                    <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                      <button class="btn btn-sm btn-outline assign-btn" data-tag-id="${s.id}">${i("assign_to_client")}</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,t.querySelectorAll(".assign-btn").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.tagId,a=d.allClientEmails;D({title:`👥 ${i("assign_to_client")}`,content:`
                    <div class="form-group">
                        <label class="form-label" for="assign-email-select">${i("select_client")}</label>
                        <select class="form-select" id="assign-email-select">
                            <option value="">— Select an existing client —</option>
                            ${a.map(o=>`<option value="${o}">${o}</option>`).join("")}
                        </select>
                    </div>
                    <div style="text-align: center; margin: 1.5rem 0; position: relative;">
                        <hr style="border: none; border-top: 1px solid var(--border-color);">
                        <span style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); background: var(--bg-surface-elevated); padding: 0 10px; font-size: 0.75rem; color: var(--text-muted);">OR</span>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="assign-email-custom">${i("new_client_email")}</label>
                        <input class="form-input" id="assign-email-custom" type="email" placeholder="client@example.com">
                    </div>
                `,submitLabel:i("assign_and_provision"),onSubmit:()=>{const o=document.getElementById("assign-email-select").value,c=document.getElementById("assign-email-custom").value.trim()||o;c&&c.includes("@")?d.assignTagToUser(r,c)&&(S(`${i("success")}: Tag provisioned to ${c}`,"success"),zi()):S(i("error"),"error")}})})})}console.log("Main.js loading...");function De(t){return()=>{if(!d.isAuthenticated){N("/login");return}cn(),an(Oe()),t()}}function Vi(t){return()=>{if(!d.isAuthenticated){N("/login");return}if(!d.isPremium()){N("/profile"),S("Premium feature. Start your trial or upgrade to access!","warning");return}cn(),an(Oe()),t()}}function Oc(t){return()=>{if(!d.isAuthenticated){N("/login");return}if(!d.isSuperAdmin()){N("/dashboard"),S("Access Denied: Super Admin only.","error");return}cn(),an(Oe()),t()}}function cn(){const t=document.getElementById("app");if(!document.getElementById("sidebar")){const{sidebar:e,bottomNav:n}=uc();t.innerHTML="",t.classList.add("app-layout"),t.appendChild(e),t.appendChild(n);const i=document.createElement("main");i.className="main-content",i.id="page-content",t.appendChild(i),hc(),Dc()}}function Dc(){const t=document.getElementById("app");if(!t||document.getElementById("global-fab-root")||!d.isSuperAdmin())return;const e=document.createElement("div");e.id="global-fab-root",e.className="fab-container animate-fade-in",e.style.animationDelay="1s",e.innerHTML=`
        <span class="fab-label">Write NFC Tag</span>
        <button class="fab" id="mainWriteFab" aria-label="Write NFC Tag">
            <span class="fab-icon">📡</span>
        </button>
    `,t.appendChild(e),document.getElementById("mainWriteFab")?.addEventListener("click",()=>{xc()})}function xc(){const t=()=>{const s=d.links;D({title:"📡 Write Wizard: Step 1",content:`
                <div class="wizard-intro">
                    <p style="margin-bottom: var(--space-md); color: var(--text-secondary);">Select the content you want to program onto your NFC tag.</p>
                </div>
                <div class="form-group">
                    <label class="form-label" for="wizard-link-id">Existing Links</label>
                    <select class="form-select" id="wizard-link-id">
                        <option value="">— Select a saved link —</option>
                        ${s.map(r=>`<option value="${r.id}">${r.icon} ${L(r.title)}</option>`).join("")}
                    </select>
                </div>
                <div style="text-align: center; margin: var(--space-md) 0; position: relative;">
                    <hr style="border: none; border-top: 1px solid var(--border-color);">
                    <span style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); background: var(--bg-surface-elevated); padding: 0 10px; font-size: 0.75rem; color: var(--text-muted);">OR</span>
                </div>
                <button class="btn btn-secondary w-full" id="wiz-create-new-btn">
                    <span>➕</span> Create New External Link
                </button>
            `,submitLabel:"Next: Choose Tag",onSubmit:()=>{const r=document.getElementById("wizard-link-id").value;if(!r){S("Please select a link or create one","warning");return}n(r)}}),document.getElementById("wiz-create-new-btn")?.addEventListener("click",()=>{e()})},e=()=>{D({title:"Create Link",content:`
                <div class="form-group">
                    <label class="form-label" for="wiz-link-title">Title</label>
                    <input class="form-input" id="wiz-link-title" placeholder="e.g. My Website">
                </div>
                <div class="form-group">
                    <label class="form-label" for="wiz-link-url">Destination URL</label>
                    <input class="form-input" id="wiz-link-url" type="url" placeholder="https://...">
                </div>
            `,submitLabel:"Create & Continue",onSubmit:()=>{const s=document.getElementById("wiz-link-title").value,r=document.getElementById("wiz-link-url").value;if(!s||!r)return;const a=d.createLink({title:s,url:r,category:"general"});n(a.id)}})},n=s=>{const r=d.tags;D({title:"📡 Write Wizard: Step 2",content:`
                <p style="margin-bottom: var(--space-md); color: var(--text-secondary);">Assign this link to a registered tag for tracking, or write it directly.</p>
                <div class="form-group">
                    <label class="form-label" for="wizard-tag-id">Available Tags</label>
                    <select class="form-select" id="wizard-tag-id">
                        <option value="">— Write Generic / Guest Tag —</option>
                        ${r.map(a=>`<option value="${a.id}">${L(a.label)}</option>`).join("")}
                    </select>
                </div>
                <div class="form-group" style="margin-top: var(--space-md)">
                    <label class="checkbox-container" for="wiz-lock" style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer;">
                        <input type="checkbox" id="wiz-lock">
                        <span style="font-size: var(--font-size-sm);"><strong>Lock Tag</strong> (Anti-overwrite)</span>
                    </label>
                    <p class="text-xs text-muted">A locked tag can never be rewritten again.</p>
                </div>
            `,submitLabel:"Ready to Program",onSubmit:()=>{const a=document.getElementById("wizard-tag-id").value,o=document.getElementById("wiz-lock").checked;i(s,a,o)}})},i=(s,r,a)=>{const o=d.getLink(s),l=d.nfcCompat;let c=o.url;r&&(c=`${window.location.origin}/#/r/${r}`),l.platform==="ios-web"?D({title:"🍎 iPhone: Writing Guide",content:`
                    <div style="text-align: center; padding: var(--space-md);">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📲</div>
                        <h3>Writing to NFC on iPhone</h3>
                        <p style="color: var(--text-secondary); margin-bottom: var(--space-md); font-size: 0.9rem;">
                            Web browsers on iOS cannot write to tags directly. Follow these simple steps:
                        </p>
                        
                        <div style="text-align: left; background: var(--bg-surface-elevated); padding: var(--space-md); border-radius: var(--radius-md); margin-bottom: var(--space-lg); border: 1px solid var(--border-color);">
                            <ol style="padding-left: 1.25rem; font-size: 0.85rem; line-height: 1.6; color: var(--text-primary);">
                                <li>Copy the <strong>Target URL</strong> below.</li>
                                <li>Download/Open <a href="https://apps.apple.com/app/nfc-tools/id1252962749" target="_blank" style="color: var(--color-primary); font-weight: 600;">NFC Tools</a> from the App Store.</li>
                                <li>In NFC Tools: Tap <strong>Write</strong> → <strong>Add a record</strong> → <strong>URL/URI</strong>.</li>
                                <li><strong>Paste</strong> the URL and tap <strong>OK</strong> → <strong>Write</strong>.</li>
                            </ol>
                        </div>

                        <div class="form-group">
                            <label class="form-label" style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Target URL to Copy</label>
                            <div style="background: var(--bg-surface); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-sm); font-family: monospace; font-size: 0.8rem; word-break: break-all; border: 1px solid var(--border-color); color: var(--text-primary);">
                                ${L(c)}
                            </div>
                        </div>
                    </div>
                `,submitLabel:"📋 Copy URL & Finish",onSubmit:async()=>{try{await navigator.clipboard.writeText(c),S("URL Copied to clipboard!","success"),F()}catch{S("Failed to copy. Please manually select and copy.","error")}}}):(D({title:"📡 Write Wizard: Writing...",content:`
                    <div class="nfc-tap-target active" style="margin: var(--space-lg) 0;">
                        <div class="nfc-tap-icon-wrap">
                            <div class="nfc-tap-icon">📲</div>
                            <div class="nfc-ring"></div>
                            <div class="nfc-ring"></div>
                        </div>
                        <p class="nfc-tap-label"><strong>Hold Tag Against Phone</strong><br>Keep it there until done</p>
                    </div>
                `,submitLabel:"Cancel",onSubmit:()=>{F()}}),le.writeTag(c,{lock:a}).then(()=>{r&&d.assignLinkToTag(r,s),S("Tag Written Successfully!","success"),D({title:"✅ Success",content:`
                        <div style="text-align: center; padding: var(--space-lg);">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
                            <h3>Tag Programmed!</h3>
                            <p style="color: var(--text-secondary);">Your NFC tag is now live and ready to use.</p>
                        </div>
                    `,submitLabel:"Amazing!",onSubmit:()=>F()})}).catch(p=>{S(`Write error: ${p.message}`,"error")}))};t()}M("/login",()=>{if(d.isAuthenticated){N("/dashboard");return}return document.getElementById("app").classList.remove("app-layout"),gc()});M("",()=>{d.isAuthenticated?N("/dashboard"):N("/login")});M("/dashboard",De(mc));M("/links",De(it));M("/tags",De(st));M("/writer",De(kc));M("/settings",De(Ac));M("/analytics",Vi(Rc));M("/templates",Vi(Nc));M("/profile",De(zt));M("/admin",Oc(zi));M("/r/:id",$c);M("/404",()=>{const t=document.getElementById("app");t.innerHTML=`
    <div class="login-page">
      <div class="card-glass" style="text-align:center; padding: 3rem">
        <h1 style="font-size: 4rem; margin-bottom: 1rem;">404</h1>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Page not found</p>
        <a href="#/dashboard" class="btn btn-primary">Go to Dashboard</a>
      </div>
    </div>
  `});console.log("App initialization started...");d.init().then(async()=>{if(console.log("Store initialized. Checking nfcCompat..."),!d.nfcCompat||d.nfcCompat.platform==="loading")try{await d.refreshNfcCompat()}catch(e){console.error("Failed to get compatibility info:",e)}if(console.log("Checking biometrics..."),d.settings.useBiometrics&&le.isNative())try{await le.isBiometricAvailable()&&(await le.authenticateWithBiometrics()||console.warn("Biometric authentication failed or canceled."))}catch(e){console.error("Biometric check error:",e)}console.log("Starting router..."),document.documentElement.setAttribute("data-theme",d.settings.theme),d.subscribe(e=>{document.documentElement.setAttribute("data-theme",e.settings.theme)}),lc()}).catch(t=>{console.error("App boot failure:",t);const e=document.getElementById("app");e.innerHTML='<div style="padding: 2rem; color: white;">Critical Error: <span></span></div>',e.querySelector("span").textContent=t.message});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").catch(()=>{})});export{zn as I,ht as N,sn as W,Bc as a};
