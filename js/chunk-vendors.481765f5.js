"use strict";(self["webpackChunkel_patio_de_ani"]=self["webpackChunkel_patio_de_ani"]||[]).push([[504],{2455:function(e,t,n){n.d(t,{cY:function(){return w},FA:function(){return L},g:function(){return P},u:function(){return l},Uj:function(){return u},Fy:function(){return b},tD:function(){return z},bD:function(){return F},hp:function(){return q},T9:function(){return v},Tj:function(){return m},yU:function(){return y},XA:function(){return _},mS:function(){return h},Ku:function(){return W},ZQ:function(){return E},sr:function(){return C},zJ:function(){return Q},c1:function(){return S},Im:function(){return V},lT:function(){return k},zW:function(){return N},jZ:function(){return T},lV:function(){return A},nr:function(){return R},Ov:function(){return O},gE:function(){return X},Am:function(){return B},I9:function(){return $},eX:function(){return D}});n(4114),n(6573),n(8100),n(7936),n(8992),n(3949),n(1454),n(4979),n(4603),n(7566),n(8721);const r=()=>{},i=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296===(64512&i)&&r+1<e.length&&56320===(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},s=function(e){const t=[];let n=0,r=0;while(n<e.length){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&s)}else if(i>239&&i<365){const s=e[n++],o=e[n++],a=e[n++],c=((7&i)<<18|(63&s)<<12|(63&o)<<6|63&a)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(1023&c))}else{const s=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&s)<<6|63&o)}}return t.join("")},o={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const t=e[i],s=i+1<e.length,o=s?e[i+1]:0,a=i+2<e.length,c=a?e[i+2]:0,u=t>>2,l=(3&t)<<4|o>>4;let h=(15&o)<<2|c>>6,d=63&c;a||(d=64,s||(h=64)),r.push(n[u],n[l],n[h],n[d])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(i(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):s(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],s=i<e.length,o=s?n[e.charAt(i)]:0;++i;const c=i<e.length,u=c?n[e.charAt(i)]:64;++i;const l=i<e.length,h=l?n[e.charAt(i)]:64;if(++i,null==t||null==o||null==u||null==h)throw new a;const d=t<<2|o>>4;if(r.push(d),64!==u){const e=o<<4&240|u>>2;if(r.push(e),64!==h){const e=u<<6&192|h;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class a extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const c=function(e){const t=i(e);return o.encodeByteArray(t,!0)},u=function(e){return c(e).replace(/\./g,"")},l=function(e){try{return o.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function h(){if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof n.g)return n.g;throw new Error("Unable to locate global object.")}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d=()=>h().__FIREBASE_DEFAULTS__,f=()=>{if("undefined"===typeof process)return;const e={VUE_APP_FIREBASE_PROJECT_ID:"el-patio-de-ani",VUE_APP_FIREBASE_APP_ID:"1:971509876310:web:c7c033fe677a9f6c74ddf7",VUE_APP_FIREBASE_API_KEY:"AIzaSyBkzVDgX2WU382pIv2Qmoar9NnKcb9bWCA",VUE_APP_FIREBASE_MESSAGING_SENDER_ID:"971509876310",VUE_APP_FIREBASE_STORAGE_BUCKET:"el-patio-de-ani.firebasestorage.app",VUE_APP_FIREBASE_AUTH_DOMAIN:"el-patio-de-ani.firebaseapp.com",NODE_ENV:"production",BASE_URL:"/El_patio_de_Ani/"}.__FIREBASE_DEFAULTS__;return e?JSON.parse(e):void 0},p=()=>{if("undefined"===typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&l(e[1]);return t&&JSON.parse(t)},g=()=>{try{return r()||d()||f()||p()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},m=e=>g()?.emulatorHosts?.[e],y=e=>{const t=m(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]},v=()=>g()?.config,_=e=>g()?.[`_${e}`]
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */;class w{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"===typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",i=e.iat||0,s=e.sub||e.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...e},a="";return[u(JSON.stringify(n)),u(JSON.stringify(o)),a].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E(){return"undefined"!==typeof navigator&&"string"===typeof navigator["userAgent"]?navigator["userAgent"]:""}function T(){return"undefined"!==typeof window&&!!(window["cordova"]||window["phonegap"]||window["PhoneGap"])&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(E())}function I(){const e=g()?.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(n.g.process)}catch(t){return!1}}function S(){return"undefined"!==typeof navigator&&"Cloudflare-Workers"===navigator.userAgent}function C(){const e="object"===typeof chrome?chrome.runtime:"object"===typeof browser?browser.runtime:void 0;return"object"===typeof e&&void 0!==e.id}function A(){return"object"===typeof navigator&&"ReactNative"===navigator["product"]}function k(){const e=E();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function R(){return!I()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function O(){return!I()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function N(){try{return"object"===typeof indexedDB}catch(e){return!1}}function D(){return new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{t(i.error?.message||"")}}catch(n){t(n)}}))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const x="FirebaseError";class P extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=x,Object.setPrototypeOf(this,P.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,L.prototype.create)}}class L{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],s=i?M(i,n):"Error",o=`${this.serviceName}: ${s} (${r}).`,a=new P(r,o,n);return a}}function M(e,t){return e.replace(U,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}const U=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function F(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],s=t[i];if(j(n)&&j(s)){if(!F(n,s))return!1}else if(n!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function j(e){return null!==e&&"object"===typeof e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function B(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function $(e){const t={},n=e.replace(/^\?/,"").split("&");return n.forEach((e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}})),t}function q(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(e,t){const n=new H(e,t);return n.subscribe.bind(n)}class H{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((()=>{e(this)})).catch((e=>{this.error(e)}))}next(e){this.forEachObserver((t=>{t.next(e)}))}error(e){this.forEachObserver((t=>{t.error(e)})),this.close(e)}complete(){this.forEachObserver((e=>{e.complete()})),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=K(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=G),void 0===r.error&&(r.error=G),void 0===r.complete&&(r.complete=G);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}})),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then((()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!==typeof console&&console.error&&console.error(n)}}))}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((()=>{this.observers=void 0,this.onNoObservers=void 0})))}}function K(e,t){if("object"!==typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"===typeof e[n])return!0;return!1}function G(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function W(e){return e&&e._delegate?e._delegate:e}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(e){try{const t=e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e;return t.endsWith(".cloudworkstations.dev")}catch{return!1}}async function X(e){const t=await fetch(e,{credentials:"include"});return t.ok}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */},144:function(e,t,n){n.d(t,{C4:function(){return I},EW:function(){return Ue},Gc:function(){return ye},IG:function(){return Se},IJ:function(){return Oe},KR:function(){return Re},Kh:function(){return me},Pr:function(){return Le},R1:function(){return xe},X2:function(){return u},bl:function(){return S},fE:function(){return Ee},g8:function(){return we},hV:function(){return qe},hZ:function(){return M},i9:function(){return ke},ju:function(){return Te},lJ:function(){return Ce},qA:function(){return V},u4:function(){return L},ux:function(){return Ie},wB:function(){return $e},yC:function(){return o}});n(4114),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(8992),n(4520),n(3949),n(1454),n(7550);var r=n(4232);let i,s;class o{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=i,!e&&i&&(this.index=(i.scopes||(i.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){let e,t;if(this._isPaused=!0,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){let e,t;if(this._isPaused=!1,this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=i;try{return i=this,e()}finally{i=t}}else 0}on(){i=this}off(){i=this.parent}stop(e){if(this._active){let t,n;for(this._active=!1,t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}}function a(){return i}const c=new WeakSet;class u{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,i&&i.active&&i.effects.push(this)}pause(){this.flags|=64}resume(){64&this.flags&&(this.flags&=-65,c.has(this)&&(c.delete(this),this.trigger()))}notify(){2&this.flags&&!(32&this.flags)||8&this.flags||f(this)}run(){if(!(1&this.flags))return this.fn();this.flags|=2,C(this),m(this);const e=s,t=E;s=this,E=!0;try{return this.fn()}finally{0,y(this),s=e,E=t,this.flags&=-3}}stop(){if(1&this.flags){for(let e=this.deps;e;e=e.nextDep)w(e);this.deps=this.depsTail=void 0,C(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){64&this.flags?c.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){v(this)&&this.run()}get dirty(){return v(this)}}let l,h,d=0;function f(e,t=!1){if(e.flags|=8,t)return e.next=h,void(h=e);e.next=l,l=e}function p(){d++}function g(){if(--d>0)return;if(h){let e=h;h=void 0;while(e){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;while(l){let n=l;l=void 0;while(n){const r=n.next;if(n.next=void 0,n.flags&=-9,1&n.flags)try{n.trigger()}catch(t){e||(e=t)}n=r}}if(e)throw e}function m(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function y(e){let t,n=e.depsTail,r=n;while(r){const e=r.prevDep;-1===r.version?(r===n&&(n=e),w(r),b(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function v(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(_(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function _(e){if(4&e.flags&&!(16&e.flags))return;if(e.flags&=-17,e.globalVersion===A)return;e.globalVersion=A;const t=e.dep;if(e.flags|=2,t.version>0&&!e.isSSR&&e.deps&&!v(e))return void(e.flags&=-3);const n=s,i=E;s=e,E=!0;try{m(e);const n=e.fn(e._value);(0===t.version||(0,r.$H)(n,e._value))&&(e._value=n,t.version++)}catch(o){throw t.version++,o}finally{s=n,E=i,y(e),e.flags&=-3}}function w(e,t=!1){const{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)w(e,!0)}t||--n.sc||!n.map||n.map.delete(n.key)}function b(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let E=!0;const T=[];function I(){T.push(E),E=!1}function S(){const e=T.pop();E=void 0===e||e}function C(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const e=s;s=void 0;try{t()}finally{s=e}}}let A=0;class k{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class R{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(e){if(!s||!E||s===this.computed)return;let t=this.activeLink;if(void 0===t||t.sub!==s)t=this.activeLink=new k(s,this),s.deps?(t.prevDep=s.depsTail,s.depsTail.nextDep=t,s.depsTail=t):s.deps=s.depsTail=t,O(t);else if(-1===t.version&&(t.version=this.version,t.nextDep)){const e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=s.depsTail,t.nextDep=void 0,s.depsTail.nextDep=t,s.depsTail=t,s.deps===t&&(s.deps=e)}return t}trigger(e){this.version++,A++,this.notify(e)}notify(e){p();try{0;for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{g()}}}function O(e){if(e.dep.sc++,4&e.sub.flags){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)O(e)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const N=new WeakMap,D=Symbol(""),x=Symbol(""),P=Symbol("");function L(e,t,n){if(E&&s){let t=N.get(e);t||N.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new R),r.map=t,r.key=n),r.track()}}function M(e,t,n,i,s,o){const a=N.get(e);if(!a)return void A++;const c=e=>{e&&e.trigger()};if(p(),"clear"===t)a.forEach(c);else{const s=(0,r.cy)(e),o=s&&(0,r.yI)(n);if(s&&"length"===n){const e=Number(i);a.forEach(((t,n)=>{("length"===n||n===P||!(0,r.Bm)(n)&&n>=e)&&c(t)}))}else switch((void 0!==n||a.has(void 0))&&c(a.get(n)),o&&c(a.get(P)),t){case"add":s?o&&c(a.get("length")):(c(a.get(D)),(0,r.CE)(e)&&c(a.get(x)));break;case"delete":s||(c(a.get(D)),(0,r.CE)(e)&&c(a.get(x)));break;case"set":(0,r.CE)(e)&&c(a.get(D));break}}g()}function U(e){const t=Ie(e);return t===e?t:(L(t,"iterate",P),Ee(e)?t:t.map(Ce))}function V(e){return L(e=Ie(e),"iterate",P),e}const F={__proto__:null,[Symbol.iterator](){return j(this,Symbol.iterator,Ce)},concat(...e){return U(this).concat(...e.map((e=>(0,r.cy)(e)?U(e):e)))},entries(){return j(this,"entries",(e=>(e[1]=Ce(e[1]),e)))},every(e,t){return $(this,"every",e,t,void 0,arguments)},filter(e,t){return $(this,"filter",e,t,(e=>e.map(Ce)),arguments)},find(e,t){return $(this,"find",e,t,Ce,arguments)},findIndex(e,t){return $(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return $(this,"findLast",e,t,Ce,arguments)},findLastIndex(e,t){return $(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return $(this,"forEach",e,t,void 0,arguments)},includes(...e){return z(this,"includes",e)},indexOf(...e){return z(this,"indexOf",e)},join(e){return U(this).join(e)},lastIndexOf(...e){return z(this,"lastIndexOf",e)},map(e,t){return $(this,"map",e,t,void 0,arguments)},pop(){return H(this,"pop")},push(...e){return H(this,"push",e)},reduce(e,...t){return q(this,"reduce",e,t)},reduceRight(e,...t){return q(this,"reduceRight",e,t)},shift(){return H(this,"shift")},some(e,t){return $(this,"some",e,t,void 0,arguments)},splice(...e){return H(this,"splice",e)},toReversed(){return U(this).toReversed()},toSorted(e){return U(this).toSorted(e)},toSpliced(...e){return U(this).toSpliced(...e)},unshift(...e){return H(this,"unshift",e)},values(){return j(this,"values",Ce)}};function j(e,t,n){const r=V(e),i=r[t]();return r===e||Ee(e)||(i._next=i.next,i.next=()=>{const e=i._next();return e.value&&(e.value=n(e.value)),e}),i}const B=Array.prototype;function $(e,t,n,r,i,s){const o=V(e),a=o!==e&&!Ee(e),c=o[t];if(c!==B[t]){const t=c.apply(e,s);return a?Ce(t):t}let u=n;o!==e&&(a?u=function(t,r){return n.call(this,Ce(t),r,e)}:n.length>2&&(u=function(t,r){return n.call(this,t,r,e)}));const l=c.call(o,u,r);return a&&i?i(l):l}function q(e,t,n,r){const i=V(e);let s=n;return i!==e&&(Ee(e)?n.length>3&&(s=function(t,r,i){return n.call(this,t,r,i,e)}):s=function(t,r,i){return n.call(this,t,Ce(r),i,e)}),i[t](s,...r)}function z(e,t,n){const r=Ie(e);L(r,"iterate",P);const i=r[t](...n);return-1!==i&&!1!==i||!Te(n[0])?i:(n[0]=Ie(n[0]),r[t](...n))}function H(e,t,n=[]){I(),p();const r=Ie(e)[t].apply(e,n);return g(),S(),r}const K=(0,r.pD)("__proto__,__v_isRef,__isVue"),G=new Set(Object.getOwnPropertyNames(Symbol).filter((e=>"arguments"!==e&&"caller"!==e)).map((e=>Symbol[e])).filter(r.Bm));function W(e){(0,r.Bm)(e)||(e=String(e));const t=Ie(this);return L(t,"has",e),t.hasOwnProperty(e)}class Q{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if("__v_skip"===t)return e["__v_skip"];const i=this._isReadonly,s=this._isShallow;if("__v_isReactive"===t)return!i;if("__v_isReadonly"===t)return i;if("__v_isShallow"===t)return s;if("__v_raw"===t)return n===(i?s?fe:de:s?he:le).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const o=(0,r.cy)(e);if(!i){let e;if(o&&(e=F[t]))return e;if("hasOwnProperty"===t)return W}const a=Reflect.get(e,t,ke(e)?e:n);return((0,r.Bm)(t)?G.has(t):K(t))?a:(i||L(e,"get",t),s?a:ke(a)?o&&(0,r.yI)(t)?a:a.value:(0,r.Gv)(a)?i?ve(a):me(a):a)}}class X extends Q{constructor(e=!1){super(!1,e)}set(e,t,n,i){let s=e[t];if(!this._isShallow){const t=be(s);if(Ee(n)||be(n)||(s=Ie(s),n=Ie(n)),!(0,r.cy)(e)&&ke(s)&&!ke(n))return!t&&(s.value=n,!0)}const o=(0,r.cy)(e)&&(0,r.yI)(t)?Number(t)<e.length:(0,r.$3)(e,t),a=Reflect.set(e,t,n,ke(e)?e:i);return e===Ie(i)&&(o?(0,r.$H)(n,s)&&M(e,"set",t,n,s):M(e,"add",t,n)),a}deleteProperty(e,t){const n=(0,r.$3)(e,t),i=e[t],s=Reflect.deleteProperty(e,t);return s&&n&&M(e,"delete",t,void 0,i),s}has(e,t){const n=Reflect.has(e,t);return(0,r.Bm)(t)&&G.has(t)||L(e,"has",t),n}ownKeys(e){return L(e,"iterate",(0,r.cy)(e)?"length":D),Reflect.ownKeys(e)}}class J extends Q{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Y=new X,Z=new J,ee=new X(!0),te=e=>e,ne=e=>Reflect.getPrototypeOf(e);function re(e,t,n){return function(...i){const s=this["__v_raw"],o=Ie(s),a=(0,r.CE)(o),c="entries"===e||e===Symbol.iterator&&a,u="keys"===e&&a,l=s[e](...i),h=n?te:t?Ae:Ce;return!t&&L(o,"iterate",u?x:D),{next(){const{value:e,done:t}=l.next();return t?{value:e,done:t}:{value:c?[h(e[0]),h(e[1])]:h(e),done:t}},[Symbol.iterator](){return this}}}}function ie(e){return function(...t){return"delete"!==e&&("clear"===e?void 0:this)}}function se(e,t){const n={get(n){const i=this["__v_raw"],s=Ie(i),o=Ie(n);e||((0,r.$H)(n,o)&&L(s,"get",n),L(s,"get",o));const{has:a}=ne(s),c=t?te:e?Ae:Ce;return a.call(s,n)?c(i.get(n)):a.call(s,o)?c(i.get(o)):void(i!==s&&i.get(n))},get size(){const t=this["__v_raw"];return!e&&L(Ie(t),"iterate",D),Reflect.get(t,"size",t)},has(t){const n=this["__v_raw"],i=Ie(n),s=Ie(t);return e||((0,r.$H)(t,s)&&L(i,"has",t),L(i,"has",s)),t===s?n.has(t):n.has(t)||n.has(s)},forEach(n,r){const i=this,s=i["__v_raw"],o=Ie(s),a=t?te:e?Ae:Ce;return!e&&L(o,"iterate",D),s.forEach(((e,t)=>n.call(r,a(e),a(t),i)))}};(0,r.X$)(n,e?{add:ie("add"),set:ie("set"),delete:ie("delete"),clear:ie("clear")}:{add(e){t||Ee(e)||be(e)||(e=Ie(e));const n=Ie(this),r=ne(n),i=r.has.call(n,e);return i||(n.add(e),M(n,"add",e,e)),this},set(e,n){t||Ee(n)||be(n)||(n=Ie(n));const i=Ie(this),{has:s,get:o}=ne(i);let a=s.call(i,e);a||(e=Ie(e),a=s.call(i,e));const c=o.call(i,e);return i.set(e,n),a?(0,r.$H)(n,c)&&M(i,"set",e,n,c):M(i,"add",e,n),this},delete(e){const t=Ie(this),{has:n,get:r}=ne(t);let i=n.call(t,e);i||(e=Ie(e),i=n.call(t,e));const s=r?r.call(t,e):void 0,o=t.delete(e);return i&&M(t,"delete",e,void 0,s),o},clear(){const e=Ie(this),t=0!==e.size,n=void 0,r=e.clear();return t&&M(e,"clear",void 0,void 0,n),r}});const i=["keys","values","entries",Symbol.iterator];return i.forEach((r=>{n[r]=re(r,e,t)})),n}function oe(e,t){const n=se(e,t);return(t,i,s)=>"__v_isReactive"===i?!e:"__v_isReadonly"===i?e:"__v_raw"===i?t:Reflect.get((0,r.$3)(n,i)&&i in t?n:t,i,s)}const ae={get:oe(!1,!1)},ce={get:oe(!1,!0)},ue={get:oe(!0,!1)};const le=new WeakMap,he=new WeakMap,de=new WeakMap,fe=new WeakMap;function pe(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ge(e){return e["__v_skip"]||!Object.isExtensible(e)?0:pe((0,r.Zf)(e))}function me(e){return be(e)?e:_e(e,!1,Y,ae,le)}function ye(e){return _e(e,!1,ee,ce,he)}function ve(e){return _e(e,!0,Z,ue,de)}function _e(e,t,n,i,s){if(!(0,r.Gv)(e))return e;if(e["__v_raw"]&&(!t||!e["__v_isReactive"]))return e;const o=s.get(e);if(o)return o;const a=ge(e);if(0===a)return e;const c=new Proxy(e,2===a?i:n);return s.set(e,c),c}function we(e){return be(e)?we(e["__v_raw"]):!(!e||!e["__v_isReactive"])}function be(e){return!(!e||!e["__v_isReadonly"])}function Ee(e){return!(!e||!e["__v_isShallow"])}function Te(e){return!!e&&!!e["__v_raw"]}function Ie(e){const t=e&&e["__v_raw"];return t?Ie(t):e}function Se(e){return!(0,r.$3)(e,"__v_skip")&&Object.isExtensible(e)&&(0,r.yQ)(e,"__v_skip",!0),e}const Ce=e=>(0,r.Gv)(e)?me(e):e,Ae=e=>(0,r.Gv)(e)?ve(e):e;function ke(e){return!!e&&!0===e["__v_isRef"]}function Re(e){return Ne(e,!1)}function Oe(e){return Ne(e,!0)}function Ne(e,t){return ke(e)?e:new De(e,t)}class De{constructor(e,t){this.dep=new R,this["__v_isRef"]=!0,this["__v_isShallow"]=!1,this._rawValue=t?e:Ie(e),this._value=t?e:Ce(e),this["__v_isShallow"]=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,n=this["__v_isShallow"]||Ee(e)||be(e);e=n?e:Ie(e),(0,r.$H)(e,t)&&(this._rawValue=e,this._value=n?e:Ce(e),this.dep.trigger())}}function xe(e){return ke(e)?e.value:e}const Pe={get:(e,t,n)=>"__v_raw"===t?e:xe(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const i=e[t];return ke(i)&&!ke(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Le(e){return we(e)?e:new Proxy(e,Pe)}class Me{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new R(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=A-1,this.next=void 0,this.effect=this,this["__v_isReadonly"]=!t,this.isSSR=n}notify(){if(this.flags|=16,!(8&this.flags||s===this))return f(this,!0),!0}get value(){const e=this.dep.track();return _(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Ue(e,t,n=!1){let i,s;(0,r.Tn)(e)?i=e:(i=e.get,s=e.set);const o=new Me(i,s,n);return o}const Ve={},Fe=new WeakMap;let je;function Be(e,t=!1,n=je){if(n){let t=Fe.get(n);t||Fe.set(n,t=[]),t.push(e)}else 0}function $e(e,t,n=r.MZ){const{immediate:i,deep:s,once:o,scheduler:c,augmentJob:l,call:h}=n,d=e=>s?e:Ee(e)||!1===s||0===s?qe(e,1):qe(e);let f,p,g,m,y=!1,v=!1;if(ke(e)?(p=()=>e.value,y=Ee(e)):we(e)?(p=()=>d(e),y=!0):(0,r.cy)(e)?(v=!0,y=e.some((e=>we(e)||Ee(e))),p=()=>e.map((e=>ke(e)?e.value:we(e)?d(e):(0,r.Tn)(e)?h?h(e,2):e():void 0))):p=(0,r.Tn)(e)?t?h?()=>h(e,2):e:()=>{if(g){I();try{g()}finally{S()}}const t=je;je=f;try{return h?h(e,3,[m]):e(m)}finally{je=t}}:r.tE,t&&s){const e=p,t=!0===s?1/0:s;p=()=>qe(e(),t)}const _=a(),w=()=>{f.stop(),_&&_.active&&(0,r.TF)(_.effects,f)};if(o&&t){const e=t;t=(...t)=>{e(...t),w()}}let b=v?new Array(e.length).fill(Ve):Ve;const E=e=>{if(1&f.flags&&(f.dirty||e))if(t){const e=f.run();if(s||y||(v?e.some(((e,t)=>(0,r.$H)(e,b[t]))):(0,r.$H)(e,b))){g&&g();const n=je;je=f;try{const n=[e,b===Ve?void 0:v&&b[0]===Ve?[]:b,m];h?h(t,3,n):t(...n),b=e}finally{je=n}}}else f.run()};return l&&l(E),f=new u(p),f.scheduler=c?()=>c(E,!1):E,m=e=>Be(e,!1,f),g=f.onStop=()=>{const e=Fe.get(f);if(e){if(h)h(e,4);else for(const t of e)t();Fe.delete(f)}},t?i?E(!0):b=f.run():c?c(E.bind(null,!0),!0):f.run(),w.pause=f.pause.bind(f),w.resume=f.resume.bind(f),w.stop=w,w}function qe(e,t=1/0,n){if(t<=0||!(0,r.Gv)(e)||e["__v_skip"])return e;if(n=n||new Set,n.has(e))return e;if(n.add(e),t--,ke(e))qe(e.value,t,n);else if((0,r.cy)(e))for(let r=0;r<e.length;r++)qe(e[r],t,n);else if((0,r.vM)(e)||(0,r.CE)(e))e.forEach((e=>{qe(e,t,n)}));else if((0,r.Qd)(e)){for(const r in e)qe(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&qe(e[r],t,n)}return e}},6768:function(e,t,n){n.d(t,{$u:function(){return he},CE:function(){return nn},Df:function(){return G},EW:function(){return zn},FK:function(){return Ht},Fv:function(){return gn},Gt:function(){return Xe},Gy:function(){return L},K9:function(){return vt},Lk:function(){return un},MZ:function(){return K},OW:function(){return q},Q3:function(){return mn},QP:function(){return U},RG:function(){return Ie},WQ:function(){return Je},Wv:function(){return rn},bF:function(){return ln},bo:function(){return R},dY:function(){return m},eW:function(){return pn},g2:function(){return _e},h:function(){return Hn},k6:function(){return k},nI:function(){return Cn},pI:function(){return Te},pM:function(){return W},pR:function(){return B},qL:function(){return o},sV:function(){return ue},uX:function(){return Jt},wB:function(){return Rt},xo:function(){return de}});n(4114),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(8992),n(3215),n(4520),n(3949),n(1454),n(8872),n(7550);var r=n(144),i=n(4232);function s(e,t,n,r){try{return r?e(...r):e()}catch(i){a(i,t,n)}}function o(e,t,n,r){if((0,i.Tn)(e)){const o=s(e,t,n,r);return o&&(0,i.yL)(o)&&o.catch((e=>{a(e,t,n)})),o}if((0,i.cy)(e)){const i=[];for(let s=0;s<e.length;s++)i.push(o(e[s],t,n,r));return i}}function a(e,t,n,o=!0){const a=t?t.vnode:null,{errorHandler:u,throwUnhandledErrorInProduction:l}=t&&t.appContext.config||i.MZ;if(t){let i=t.parent;const o=t.proxy,a=`https://vuejs.org/error-reference/#runtime-${n}`;while(i){const t=i.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,o,a))return;i=i.parent}if(u)return(0,r.C4)(),s(u,null,10,[e,o,a]),void(0,r.bl)()}c(e,n,a,o,l)}function c(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}const u=[];let l=-1;const h=[];let d=null,f=0;const p=Promise.resolve();let g=null;function m(e){const t=g||p;return e?t.then(this?e.bind(this):e):t}function y(e){let t=l+1,n=u.length;while(t<n){const r=t+n>>>1,i=u[r],s=T(i);s<e||s===e&&2&i.flags?t=r+1:n=r}return t}function v(e){if(!(1&e.flags)){const t=T(e),n=u[u.length-1];!n||!(2&e.flags)&&t>=T(n)?u.push(e):u.splice(y(t),0,e),e.flags|=1,_()}}function _(){g||(g=p.then(I))}function w(e){(0,i.cy)(e)?h.push(...e):d&&-1===e.id?d.splice(f+1,0,e):1&e.flags||(h.push(e),e.flags|=1),_()}function b(e,t,n=l+1){for(0;n<u.length;n++){const t=u[n];if(t&&2&t.flags){if(e&&t.id!==e.uid)continue;0,u.splice(n,1),n--,4&t.flags&&(t.flags&=-2),t(),4&t.flags||(t.flags&=-2)}}}function E(e){if(h.length){const e=[...new Set(h)].sort(((e,t)=>T(e)-T(t)));if(h.length=0,d)return void d.push(...e);for(d=e,f=0;f<d.length;f++){const e=d[f];0,4&e.flags&&(e.flags&=-2),8&e.flags||e(),e.flags&=-2}d=null,f=0}}const T=e=>null==e.id?2&e.flags?-1:1/0:e.id;function I(e){i.tE;try{for(l=0;l<u.length;l++){const e=u[l];!e||8&e.flags||(4&e.flags&&(e.flags&=-2),s(e,e.i,e.i?15:14),4&e.flags||(e.flags&=-2))}}finally{for(;l<u.length;l++){const e=u[l];e&&(e.flags&=-2)}l=-1,u.length=0,E(e),g=null,(u.length||h.length)&&I(e)}}let S=null,C=null;function A(e){const t=S;return S=e,C=e&&e.type.__scopeId||null,t}function k(e,t=S,n){if(!t)return e;if(e._n)return e;const r=(...n)=>{r._d&&en(-1);const i=A(t);let s;try{s=e(...n)}finally{A(i),r._d&&en(1)}return s};return r._n=!0,r._c=!0,r._d=!0,r}function R(e,t){if(null===S)return e;const n=Bn(S),s=e.dirs||(e.dirs=[]);for(let o=0;o<t.length;o++){let[e,a,c,u=i.MZ]=t[o];e&&((0,i.Tn)(e)&&(e={mounted:e,updated:e}),e.deep&&(0,r.hV)(a),s.push({dir:e,instance:n,value:a,oldValue:void 0,arg:c,modifiers:u}))}return e}function O(e,t,n,i){const s=e.dirs,a=t&&t.dirs;for(let c=0;c<s.length;c++){const u=s[c];a&&(u.oldValue=a[c].value);let l=u.dir[i];l&&((0,r.C4)(),o(l,n,8,[e.el,u,e,t]),(0,r.bl)())}}const N=Symbol("_vte"),D=e=>e.__isTeleport;const x=Symbol("_leaveCb"),P=Symbol("_enterCb");function L(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return ue((()=>{e.isMounted=!0})),de((()=>{e.isUnmounting=!0})),e}const M=[Function,Array],U={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:M,onEnter:M,onAfterEnter:M,onEnterCancelled:M,onBeforeLeave:M,onLeave:M,onAfterLeave:M,onLeaveCancelled:M,onBeforeAppear:M,onAppear:M,onAfterAppear:M,onAppearCancelled:M},V=e=>{const t=e.subTree;return t.component?V(t.component):t},F={name:"BaseTransition",props:U,setup(e,{slots:t}){const n=Cn(),i=L();return()=>{const s=t.default&&G(t.default(),!0);if(!s||!s.length)return;const o=j(s),a=(0,r.ux)(e),{mode:c}=a;if(i.isLeaving)return z(o);const u=H(o);if(!u)return z(o);let l=q(u,a,i,n,(e=>l=e));u.type!==Gt&&K(u,l);let h=n.subTree&&H(n.subTree);if(h&&h.type!==Gt&&!on(u,h)&&V(n).type!==Gt){let e=q(h,a,i,n);if(K(h,e),"out-in"===c&&u.type!==Gt)return i.isLeaving=!0,e.afterLeave=()=>{i.isLeaving=!1,8&n.job.flags||n.update(),delete e.afterLeave,h=void 0},z(o);"in-out"===c&&u.type!==Gt?e.delayLeave=(e,t,n)=>{const r=$(i,h);r[String(h.key)]=h,e[x]=()=>{t(),e[x]=void 0,delete l.delayedLeave,h=void 0},l.delayedLeave=()=>{n(),delete l.delayedLeave,h=void 0}}:h=void 0}else h&&(h=void 0);return o}}};function j(e){let t=e[0];if(e.length>1){let n=!1;for(const r of e)if(r.type!==Gt){0,t=r,n=!0;break}}return t}const B=F;function $(e,t){const{leavingVNodes:n}=e;let r=n.get(t.type);return r||(r=Object.create(null),n.set(t.type,r)),r}function q(e,t,n,r,s){const{appear:a,mode:c,persisted:u=!1,onBeforeEnter:l,onEnter:h,onAfterEnter:d,onEnterCancelled:f,onBeforeLeave:p,onLeave:g,onAfterLeave:m,onLeaveCancelled:y,onBeforeAppear:v,onAppear:_,onAfterAppear:w,onAppearCancelled:b}=t,E=String(e.key),T=$(n,e),I=(e,t)=>{e&&o(e,r,9,t)},S=(e,t)=>{const n=t[1];I(e,t),(0,i.cy)(e)?e.every((e=>e.length<=1))&&n():e.length<=1&&n()},C={mode:c,persisted:u,beforeEnter(t){let r=l;if(!n.isMounted){if(!a)return;r=v||l}t[x]&&t[x](!0);const i=T[E];i&&on(e,i)&&i.el[x]&&i.el[x](),I(r,[t])},enter(e){let t=h,r=d,i=f;if(!n.isMounted){if(!a)return;t=_||h,r=w||d,i=b||f}let s=!1;const o=e[P]=t=>{s||(s=!0,I(t?i:r,[e]),C.delayedLeave&&C.delayedLeave(),e[P]=void 0)};t?S(t,[e,o]):o()},leave(t,r){const i=String(e.key);if(t[P]&&t[P](!0),n.isUnmounting)return r();I(p,[t]);let s=!1;const o=t[x]=n=>{s||(s=!0,r(),I(n?y:m,[t]),t[x]=void 0,T[i]===e&&delete T[i])};T[i]=e,g?S(g,[t,o]):o()},clone(e){const i=q(e,t,n,r,s);return s&&s(i),i}};return C}function z(e){if(Y(e))return e=fn(e),e.children=null,e}function H(e){if(!Y(e))return D(e.type)&&e.children?j(e.children):e;const{shapeFlag:t,children:n}=e;if(n){if(16&t)return n[0];if(32&t&&(0,i.Tn)(n.default))return n.default()}}function K(e,t){6&e.shapeFlag&&e.component?(e.transition=t,K(e.component.subTree,t)):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function G(e,t=!1,n){let r=[],i=0;for(let s=0;s<e.length;s++){let o=e[s];const a=null==n?o.key:String(n)+String(null!=o.key?o.key:s);o.type===Ht?(128&o.patchFlag&&i++,r=r.concat(G(o.children,t,a))):(t||o.type!==Gt)&&r.push(null!=a?fn(o,{key:a}):o)}if(i>1)for(let s=0;s<r.length;s++)r[s].patchFlag=-2;return r}
/*! #__NO_SIDE_EFFECTS__ */function W(e,t){return(0,i.Tn)(e)?(()=>(0,i.X$)({name:e.name},t,{setup:e}))():e}function Q(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function X(e,t,n,o,a=!1){if((0,i.cy)(e))return void e.forEach(((e,r)=>X(e,t&&((0,i.cy)(t)?t[r]:t),n,o,a)));if(J(o)&&!a)return void(512&o.shapeFlag&&o.type.__asyncResolved&&o.component.subTree.component&&X(e,t,n,o.component.subTree));const c=4&o.shapeFlag?Bn(o.component):o.el,u=a?null:c,{i:l,r:h}=e;const d=t&&t.r,f=l.refs===i.MZ?l.refs={}:l.refs,p=l.setupState,g=(0,r.ux)(p),m=p===i.MZ?()=>!1:e=>(0,i.$3)(g,e);if(null!=d&&d!==h&&((0,i.Kg)(d)?(f[d]=null,m(d)&&(p[d]=null)):(0,r.i9)(d)&&(d.value=null)),(0,i.Tn)(h))s(h,l,12,[u,f]);else{const t=(0,i.Kg)(h),s=(0,r.i9)(h);if(t||s){const r=()=>{if(e.f){const n=t?m(h)?p[h]:f[h]:h.value;a?(0,i.cy)(n)&&(0,i.TF)(n,c):(0,i.cy)(n)?n.includes(c)||n.push(c):t?(f[h]=[c],m(h)&&(p[h]=f[h])):(h.value=[c],e.k&&(f[e.k]=h.value))}else t?(f[h]=u,m(h)&&(p[h]=u)):s&&(h.value=u,e.k&&(f[e.k]=u))};u?(r.id=-1,yt(r,n)):r()}else 0}}(0,i.We)().requestIdleCallback,(0,i.We)().cancelIdleCallback;const J=e=>!!e.type.__asyncLoader
/*! #__NO_SIDE_EFFECTS__ */;const Y=e=>e.type.__isKeepAlive;RegExp,RegExp;function Z(e,t){return(0,i.cy)(e)?e.some((e=>Z(e,t))):(0,i.Kg)(e)?e.split(",").includes(t):!!(0,i.gd)(e)&&(e.lastIndex=0,e.test(t))}function ee(e,t){ne(e,"a",t)}function te(e,t){ne(e,"da",t)}function ne(e,t,n=Sn){const r=e.__wdc||(e.__wdc=()=>{let t=n;while(t){if(t.isDeactivated)return;t=t.parent}return e()});if(oe(t,r,n),n){let e=n.parent;while(e&&e.parent)Y(e.parent.vnode)&&re(r,t,n,e),e=e.parent}}function re(e,t,n,r){const s=oe(t,e,r,!0);fe((()=>{(0,i.TF)(r[t],s)}),n)}function ie(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function se(e){return 128&e.shapeFlag?e.ssContent:e}function oe(e,t,n=Sn,i=!1){if(n){const s=n[e]||(n[e]=[]),a=t.__weh||(t.__weh=(...i)=>{(0,r.C4)();const s=Rn(n),a=o(t,n,e,i);return s(),(0,r.bl)(),a});return i?s.unshift(a):s.push(a),a}}const ae=e=>(t,n=Sn)=>{Pn&&"sp"!==e||oe(e,((...e)=>t(...e)),n)},ce=ae("bm"),ue=ae("m"),le=ae("bu"),he=ae("u"),de=ae("bum"),fe=ae("um"),pe=ae("sp"),ge=ae("rtg"),me=ae("rtc");function ye(e,t=Sn){oe("ec",e,t)}const ve="components";function _e(e,t){return be(ve,e,!0,t)||e}const we=Symbol.for("v-ndc");function be(e,t,n=!0,r=!1){const s=S||Sn;if(s){const n=s.type;if(e===ve){const e=$n(n,!1);if(e&&(e===t||e===(0,i.PT)(t)||e===(0,i.ZH)((0,i.PT)(t))))return n}const o=Ee(s[e]||n[e],t)||Ee(s.appContext[e],t);return!o&&r?n:o}}function Ee(e,t){return e&&(e[t]||e[(0,i.PT)(t)]||e[(0,i.ZH)((0,i.PT)(t))])}function Te(e,t,n,s){let o;const a=n&&n[s],c=(0,i.cy)(e);if(c||(0,i.Kg)(e)){const n=c&&(0,r.g8)(e);let i=!1;n&&(i=!(0,r.fE)(e),e=(0,r.qA)(e)),o=new Array(e.length);for(let s=0,c=e.length;s<c;s++)o[s]=t(i?(0,r.lJ)(e[s]):e[s],s,void 0,a&&a[s])}else if("number"===typeof e){0,o=new Array(e);for(let n=0;n<e;n++)o[n]=t(n+1,n,void 0,a&&a[n])}else if((0,i.Gv)(e))if(e[Symbol.iterator])o=Array.from(e,((e,n)=>t(e,n,void 0,a&&a[n])));else{const n=Object.keys(e);o=new Array(n.length);for(let r=0,i=n.length;r<i;r++){const i=n[r];o[r]=t(e[i],i,r,a&&a[r])}}else o=[];return n&&(n[s]=o),o}function Ie(e,t,n={},r,s){if(S.ce||S.parent&&J(S.parent)&&S.parent.ce)return"default"!==t&&(n.name=t),Jt(),rn(Ht,null,[ln("slot",n,r&&r())],64);let o=e[t];o&&o._c&&(o._d=!1),Jt();const a=o&&Se(o(n)),c=n.key||a&&a.key,u=rn(Ht,{key:(c&&!(0,i.Bm)(c)?c:`_${t}`)+(!a&&r?"_fb":"")},a||(r?r():[]),a&&1===e._?64:-2);return!s&&u.scopeId&&(u.slotScopeIds=[u.scopeId+"-s"]),o&&o._c&&(o._d=!0),u}function Se(e){return e.some((e=>!sn(e)||e.type!==Gt&&!(e.type===Ht&&!Se(e.children))))?e:null}const Ce=e=>e?Nn(e)?Bn(e):Ce(e.parent):null,Ae=(0,i.X$)(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Ce(e.parent),$root:e=>Ce(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Me(e),$forceUpdate:e=>e.f||(e.f=()=>{v(e.update)}),$nextTick:e=>e.n||(e.n=m.bind(e.proxy)),$watch:e=>Nt.bind(e)}),ke=(e,t)=>e!==i.MZ&&!e.__isScriptSetup&&(0,i.$3)(e,t),Re={get({_:e},t){if("__v_skip"===t)return!0;const{ctx:n,setupState:s,data:o,props:a,accessCache:c,type:u,appContext:l}=e;let h;if("$"!==t[0]){const r=c[t];if(void 0!==r)switch(r){case 1:return s[t];case 2:return o[t];case 4:return n[t];case 3:return a[t]}else{if(ke(s,t))return c[t]=1,s[t];if(o!==i.MZ&&(0,i.$3)(o,t))return c[t]=2,o[t];if((h=e.propsOptions[0])&&(0,i.$3)(h,t))return c[t]=3,a[t];if(n!==i.MZ&&(0,i.$3)(n,t))return c[t]=4,n[t];Ne&&(c[t]=0)}}const d=Ae[t];let f,p;return d?("$attrs"===t&&(0,r.u4)(e.attrs,"get",""),d(e)):(f=u.__cssModules)&&(f=f[t])?f:n!==i.MZ&&(0,i.$3)(n,t)?(c[t]=4,n[t]):(p=l.config.globalProperties,(0,i.$3)(p,t)?p[t]:void 0)},set({_:e},t,n){const{data:r,setupState:s,ctx:o}=e;return ke(s,t)?(s[t]=n,!0):r!==i.MZ&&(0,i.$3)(r,t)?(r[t]=n,!0):!(0,i.$3)(e.props,t)&&(("$"!==t[0]||!(t.slice(1)in e))&&(o[t]=n,!0))},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:s,propsOptions:o}},a){let c;return!!n[a]||e!==i.MZ&&(0,i.$3)(e,a)||ke(t,a)||(c=o[0])&&(0,i.$3)(c,a)||(0,i.$3)(r,a)||(0,i.$3)(Ae,a)||(0,i.$3)(s.config.globalProperties,a)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:(0,i.$3)(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function Oe(e){return(0,i.cy)(e)?e.reduce(((e,t)=>(e[t]=null,e)),{}):e}let Ne=!0;function De(e){const t=Me(e),n=e.proxy,s=e.ctx;Ne=!1,t.beforeCreate&&Pe(t.beforeCreate,e,"bc");const{data:o,computed:a,methods:c,watch:u,provide:l,inject:h,created:d,beforeMount:f,mounted:p,beforeUpdate:g,updated:m,activated:y,deactivated:v,beforeDestroy:_,beforeUnmount:w,destroyed:b,unmounted:E,render:T,renderTracked:I,renderTriggered:S,errorCaptured:C,serverPrefetch:A,expose:k,inheritAttrs:R,components:O,directives:N,filters:D}=t,x=null;if(h&&xe(h,s,x),c)for(const r in c){const e=c[r];(0,i.Tn)(e)&&(s[r]=e.bind(n))}if(o){0;const t=o.call(n,n);0,(0,i.Gv)(t)&&(e.data=(0,r.Kh)(t))}if(Ne=!0,a)for(const r in a){const e=a[r],t=(0,i.Tn)(e)?e.bind(n,n):(0,i.Tn)(e.get)?e.get.bind(n,n):i.tE;0;const o=!(0,i.Tn)(e)&&(0,i.Tn)(e.set)?e.set.bind(n):i.tE,c=zn({get:t,set:o});Object.defineProperty(s,r,{enumerable:!0,configurable:!0,get:()=>c.value,set:e=>c.value=e})}if(u)for(const r in u)Le(u[r],s,n,r);if(l){const e=(0,i.Tn)(l)?l.call(n):l;Reflect.ownKeys(e).forEach((t=>{Xe(t,e[t])}))}function P(e,t){(0,i.cy)(t)?t.forEach((t=>e(t.bind(n)))):t&&e(t.bind(n))}if(d&&Pe(d,e,"c"),P(ce,f),P(ue,p),P(le,g),P(he,m),P(ee,y),P(te,v),P(ye,C),P(me,I),P(ge,S),P(de,w),P(fe,E),P(pe,A),(0,i.cy)(k))if(k.length){const t=e.exposed||(e.exposed={});k.forEach((e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t})}))}else e.exposed||(e.exposed={});T&&e.render===i.tE&&(e.render=T),null!=R&&(e.inheritAttrs=R),O&&(e.components=O),N&&(e.directives=N),A&&Q(e)}function xe(e,t,n=i.tE){(0,i.cy)(e)&&(e=Be(e));for(const s in e){const n=e[s];let o;o=(0,i.Gv)(n)?"default"in n?Je(n.from||s,n.default,!0):Je(n.from||s):Je(n),(0,r.i9)(o)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>o.value,set:e=>o.value=e}):t[s]=o}}function Pe(e,t,n){o((0,i.cy)(e)?e.map((e=>e.bind(t.proxy))):e.bind(t.proxy),t,n)}function Le(e,t,n,r){let s=r.includes(".")?Dt(n,r):()=>n[r];if((0,i.Kg)(e)){const n=t[e];(0,i.Tn)(n)&&Rt(s,n)}else if((0,i.Tn)(e))Rt(s,e.bind(n));else if((0,i.Gv)(e))if((0,i.cy)(e))e.forEach((e=>Le(e,t,n,r)));else{const r=(0,i.Tn)(e.handler)?e.handler.bind(n):t[e.handler];(0,i.Tn)(r)&&Rt(s,r,e)}else 0}function Me(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:s,optionsCache:o,config:{optionMergeStrategies:a}}=e.appContext,c=o.get(t);let u;return c?u=c:s.length||n||r?(u={},s.length&&s.forEach((e=>Ue(u,e,a,!0))),Ue(u,t,a)):u=t,(0,i.Gv)(t)&&o.set(t,u),u}function Ue(e,t,n,r=!1){const{mixins:i,extends:s}=t;s&&Ue(e,s,n,!0),i&&i.forEach((t=>Ue(e,t,n,!0)));for(const o in t)if(r&&"expose"===o);else{const r=Ve[o]||n&&n[o];e[o]=r?r(e[o],t[o]):t[o]}return e}const Ve={data:Fe,props:ze,emits:ze,methods:qe,computed:qe,beforeCreate:$e,created:$e,beforeMount:$e,mounted:$e,beforeUpdate:$e,updated:$e,beforeDestroy:$e,beforeUnmount:$e,destroyed:$e,unmounted:$e,activated:$e,deactivated:$e,errorCaptured:$e,serverPrefetch:$e,components:qe,directives:qe,watch:He,provide:Fe,inject:je};function Fe(e,t){return t?e?function(){return(0,i.X$)((0,i.Tn)(e)?e.call(this,this):e,(0,i.Tn)(t)?t.call(this,this):t)}:t:e}function je(e,t){return qe(Be(e),Be(t))}function Be(e){if((0,i.cy)(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function $e(e,t){return e?[...new Set([].concat(e,t))]:t}function qe(e,t){return e?(0,i.X$)(Object.create(null),e,t):t}function ze(e,t){return e?(0,i.cy)(e)&&(0,i.cy)(t)?[...new Set([...e,...t])]:(0,i.X$)(Object.create(null),Oe(e),Oe(null!=t?t:{})):t}function He(e,t){if(!e)return t;if(!t)return e;const n=(0,i.X$)(Object.create(null),e);for(const r in t)n[r]=$e(e[r],t[r]);return n}function Ke(){return{app:null,config:{isNativeTag:i.NO,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Ge=0;function We(e,t){return function(n,r=null){(0,i.Tn)(n)||(n=(0,i.X$)({},n)),null==r||(0,i.Gv)(r)||(r=null);const s=Ke(),a=new WeakSet,c=[];let u=!1;const l=s.app={_uid:Ge++,_component:n,_props:r,_container:null,_context:s,_instance:null,version:Kn,get config(){return s.config},set config(e){0},use(e,...t){return a.has(e)||(e&&(0,i.Tn)(e.install)?(a.add(e),e.install(l,...t)):(0,i.Tn)(e)&&(a.add(e),e(l,...t))),l},mixin(e){return s.mixins.includes(e)||s.mixins.push(e),l},component(e,t){return t?(s.components[e]=t,l):s.components[e]},directive(e,t){return t?(s.directives[e]=t,l):s.directives[e]},mount(i,o,a){if(!u){0;const c=l._ceVNode||ln(n,r);return c.appContext=s,!0===a?a="svg":!1===a&&(a=void 0),o&&t?t(c,i):e(c,i,a),u=!0,l._container=i,i.__vue_app__=l,Bn(c.component)}},onUnmount(e){c.push(e)},unmount(){u&&(o(c,l._instance,16),e(null,l._container),delete l._container.__vue_app__)},provide(e,t){return s.provides[e]=t,l},runWithContext(e){const t=Qe;Qe=l;try{return e()}finally{Qe=t}}};return l}}let Qe=null;function Xe(e,t){if(Sn){let n=Sn.provides;const r=Sn.parent&&Sn.parent.provides;r===n&&(n=Sn.provides=Object.create(r)),n[e]=t}else 0}function Je(e,t,n=!1){const r=Sn||S;if(r||Qe){const s=Qe?Qe._context.provides:r?null==r.parent?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&e in s)return s[e];if(arguments.length>1)return n&&(0,i.Tn)(t)?t.call(r&&r.proxy):t}else 0}const Ye={},Ze=()=>Object.create(Ye),et=e=>Object.getPrototypeOf(e)===Ye;function tt(e,t,n,i=!1){const s={},o=Ze();e.propsDefaults=Object.create(null),rt(e,t,s,o);for(const r in e.propsOptions[0])r in s||(s[r]=void 0);n?e.props=i?s:(0,r.Gc)(s):e.type.props?e.props=s:e.props=o,e.attrs=o}function nt(e,t,n,s){const{props:o,attrs:a,vnode:{patchFlag:c}}=e,u=(0,r.ux)(o),[l]=e.propsOptions;let h=!1;if(!(s||c>0)||16&c){let r;rt(e,t,o,a)&&(h=!0);for(const s in u)t&&((0,i.$3)(t,s)||(r=(0,i.Tg)(s))!==s&&(0,i.$3)(t,r))||(l?!n||void 0===n[s]&&void 0===n[r]||(o[s]=it(l,u,s,void 0,e,!0)):delete o[s]);if(a!==u)for(const e in a)t&&(0,i.$3)(t,e)||(delete a[e],h=!0)}else if(8&c){const n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let s=n[r];if(Mt(e.emitsOptions,s))continue;const c=t[s];if(l)if((0,i.$3)(a,s))c!==a[s]&&(a[s]=c,h=!0);else{const t=(0,i.PT)(s);o[t]=it(l,u,t,c,e,!1)}else c!==a[s]&&(a[s]=c,h=!0)}}h&&(0,r.hZ)(e.attrs,"set","")}function rt(e,t,n,s){const[o,a]=e.propsOptions;let c,u=!1;if(t)for(let r in t){if((0,i.SU)(r))continue;const l=t[r];let h;o&&(0,i.$3)(o,h=(0,i.PT)(r))?a&&a.includes(h)?(c||(c={}))[h]=l:n[h]=l:Mt(e.emitsOptions,r)||r in s&&l===s[r]||(s[r]=l,u=!0)}if(a){const t=(0,r.ux)(n),s=c||i.MZ;for(let r=0;r<a.length;r++){const c=a[r];n[c]=it(o,t,c,s[c],e,!(0,i.$3)(s,c))}}return u}function it(e,t,n,r,s,o){const a=e[n];if(null!=a){const e=(0,i.$3)(a,"default");if(e&&void 0===r){const e=a.default;if(a.type!==Function&&!a.skipFactory&&(0,i.Tn)(e)){const{propsDefaults:i}=s;if(n in i)r=i[n];else{const o=Rn(s);r=i[n]=e.call(null,t),o()}}else r=e;s.ce&&s.ce._setProp(n,r)}a[0]&&(o&&!e?r=!1:!a[1]||""!==r&&r!==(0,i.Tg)(n)||(r=!0))}return r}const st=new WeakMap;function ot(e,t,n=!1){const r=n?st:t.propsCache,s=r.get(e);if(s)return s;const o=e.props,a={},c=[];let u=!1;if(!(0,i.Tn)(e)){const r=e=>{u=!0;const[n,r]=ot(e,t,!0);(0,i.X$)(a,n),r&&c.push(...r)};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}if(!o&&!u)return(0,i.Gv)(e)&&r.set(e,i.Oj),i.Oj;if((0,i.cy)(o))for(let h=0;h<o.length;h++){0;const e=(0,i.PT)(o[h]);at(e)&&(a[e]=i.MZ)}else if(o){0;for(const e in o){const t=(0,i.PT)(e);if(at(t)){const n=o[e],r=a[t]=(0,i.cy)(n)||(0,i.Tn)(n)?{type:n}:(0,i.X$)({},n),s=r.type;let u=!1,l=!0;if((0,i.cy)(s))for(let e=0;e<s.length;++e){const t=s[e],n=(0,i.Tn)(t)&&t.name;if("Boolean"===n){u=!0;break}"String"===n&&(l=!1)}else u=(0,i.Tn)(s)&&"Boolean"===s.name;r[0]=u,r[1]=l,(u||(0,i.$3)(r,"default"))&&c.push(t)}}}const l=[a,c];return(0,i.Gv)(e)&&r.set(e,l),l}function at(e){return"$"!==e[0]&&!(0,i.SU)(e)}const ct=e=>"_"===e[0]||"$stable"===e,ut=e=>(0,i.cy)(e)?e.map(yn):[yn(e)],lt=(e,t,n)=>{if(t._n)return t;const r=k(((...e)=>ut(t(...e))),n);return r._c=!1,r},ht=(e,t,n)=>{const r=e._ctx;for(const s in e){if(ct(s))continue;const n=e[s];if((0,i.Tn)(n))t[s]=lt(s,n,r);else if(null!=n){0;const e=ut(n);t[s]=()=>e}}},dt=(e,t)=>{const n=ut(t);e.slots.default=()=>n},ft=(e,t,n)=>{for(const r in t)(n||"_"!==r)&&(e[r]=t[r])},pt=(e,t,n)=>{const r=e.slots=Ze();if(32&e.vnode.shapeFlag){const e=t._;e?(ft(r,t,n),n&&(0,i.yQ)(r,"_",e,!0)):ht(t,r)}else t&&dt(e,t)},gt=(e,t,n)=>{const{vnode:r,slots:s}=e;let o=!0,a=i.MZ;if(32&r.shapeFlag){const e=t._;e?n&&1===e?o=!1:ft(s,t,n):(o=!t.$stable,ht(t,s)),a=t}else t&&(dt(e,t),a={default:1});if(o)for(const i in s)ct(i)||null!=a[i]||delete s[i]};function mt(){}const yt=zt;function vt(e){return _t(e)}function _t(e,t){mt();const n=(0,i.We)();n.__VUE__=!0;const{insert:s,remove:o,patchProp:a,createElement:c,createText:u,createComment:l,setText:h,setElementText:d,parentNode:f,nextSibling:p,setScopeId:g=i.tE,insertStaticContent:m}=e,y=(e,t,n,r=null,i=null,s=null,o=void 0,a=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!on(e,t)&&(r=Z(e),H(e,i,s,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:u,ref:l,shapeFlag:h}=t;switch(u){case Kt:_(e,t,n,r);break;case Gt:w(e,t,n,r);break;case Wt:null==e&&T(t,n,r,o);break;case Ht:L(e,t,n,r,i,s,o,a,c);break;default:1&h?C(e,t,n,r,i,s,o,a,c):6&h?M(e,t,n,r,i,s,o,a,c):(64&h||128&h)&&u.process(e,t,n,r,i,s,o,a,c,ne)}null!=l&&i&&X(l,e&&e.ref,s,t||e,!t)},_=(e,t,n,r)=>{if(null==e)s(t.el=u(t.children),n,r);else{const n=t.el=e.el;t.children!==e.children&&h(n,t.children)}},w=(e,t,n,r)=>{null==e?s(t.el=l(t.children||""),n,r):t.el=e.el},T=(e,t,n,r)=>{[e.el,e.anchor]=m(e.children,t,n,r,e.el,e.anchor)},I=({el:e,anchor:t},n,r)=>{let i;while(e&&e!==t)i=p(e),s(e,n,r),e=i;s(t,n,r)},S=({el:e,anchor:t})=>{let n;while(e&&e!==t)n=p(e),o(e),e=n;o(t)},C=(e,t,n,r,i,s,o,a,c)=>{"svg"===t.type?o="svg":"math"===t.type&&(o="mathml"),null==e?A(t,n,r,i,s,o,a,c):D(e,t,i,s,o,a,c)},A=(e,t,n,r,o,u,l,h)=>{let f,p;const{props:g,shapeFlag:m,transition:y,dirs:v}=e;if(f=e.el=c(e.type,u,g&&g.is,g),8&m?d(f,e.children):16&m&&R(e.children,f,null,r,o,wt(e,u),l,h),v&&O(e,null,r,"created"),k(f,e,e.scopeId,l,r),g){for(const e in g)"value"===e||(0,i.SU)(e)||a(f,e,null,g[e],u,r);"value"in g&&a(f,"value",null,g.value,u),(p=g.onVnodeBeforeMount)&&bn(p,r,e)}v&&O(e,null,r,"beforeMount");const _=Et(o,y);_&&y.beforeEnter(f),s(f,t,n),((p=g&&g.onVnodeMounted)||_||v)&&yt((()=>{p&&bn(p,r,e),_&&y.enter(f),v&&O(e,null,r,"mounted")}),o)},k=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let s=0;s<r.length;s++)g(e,r[s]);if(i){let n=i.subTree;if(t===n||qt(n.type)&&(n.ssContent===t||n.ssFallback===t)){const t=i.vnode;k(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},R=(e,t,n,r,i,s,o,a,c=0)=>{for(let u=c;u<e.length;u++){const c=e[u]=a?vn(e[u]):yn(e[u]);y(null,c,t,n,r,i,s,o,a)}},D=(e,t,n,r,s,o,c)=>{const u=t.el=e.el;let{patchFlag:l,dynamicChildren:h,dirs:f}=t;l|=16&e.patchFlag;const p=e.props||i.MZ,g=t.props||i.MZ;let m;if(n&&bt(n,!1),(m=g.onVnodeBeforeUpdate)&&bn(m,n,t,e),f&&O(t,e,n,"beforeUpdate"),n&&bt(n,!0),(p.innerHTML&&null==g.innerHTML||p.textContent&&null==g.textContent)&&d(u,""),h?x(e.dynamicChildren,h,u,n,r,wt(t,s),o):c||B(e,t,u,null,n,r,wt(t,s),o,!1),l>0){if(16&l)P(u,p,g,n,s);else if(2&l&&p.class!==g.class&&a(u,"class",null,g.class,s),4&l&&a(u,"style",p.style,g.style,s),8&l){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const r=e[t],i=p[r],o=g[r];o===i&&"value"!==r||a(u,r,i,o,s,n)}}1&l&&e.children!==t.children&&d(u,t.children)}else c||null!=h||P(u,p,g,n,s);((m=g.onVnodeUpdated)||f)&&yt((()=>{m&&bn(m,n,t,e),f&&O(t,e,n,"updated")}),r)},x=(e,t,n,r,i,s,o)=>{for(let a=0;a<t.length;a++){const c=e[a],u=t[a],l=c.el&&(c.type===Ht||!on(c,u)||70&c.shapeFlag)?f(c.el):n;y(c,u,l,null,r,i,s,o,!0)}},P=(e,t,n,r,s)=>{if(t!==n){if(t!==i.MZ)for(const o in t)(0,i.SU)(o)||o in n||a(e,o,t[o],null,s,r);for(const o in n){if((0,i.SU)(o))continue;const c=n[o],u=t[o];c!==u&&"value"!==o&&a(e,o,u,c,s,r)}"value"in n&&a(e,"value",t.value,n.value,s)}},L=(e,t,n,r,i,o,a,c,l)=>{const h=t.el=e?e.el:u(""),d=t.anchor=e?e.anchor:u("");let{patchFlag:f,dynamicChildren:p,slotScopeIds:g}=t;g&&(c=c?c.concat(g):g),null==e?(s(h,n,r),s(d,n,r),R(t.children||[],n,d,i,o,a,c,l)):f>0&&64&f&&p&&e.dynamicChildren?(x(e.dynamicChildren,p,n,i,o,a,c),(null!=t.key||i&&t===i.subTree)&&Tt(e,t,!0)):B(e,t,n,d,i,o,a,c,l)},M=(e,t,n,r,i,s,o,a,c)=>{t.slotScopeIds=a,null==e?512&t.shapeFlag?i.ctx.activate(t,n,r,o,c):U(t,n,r,i,s,o,c):V(e,t,c)},U=(e,t,n,r,i,s,o)=>{const a=e.component=In(e,r,i);if(Y(e)&&(a.ctx.renderer=ne),Ln(a,!1,o),a.asyncDep){if(i&&i.registerDep(a,F,o),!e.el){const e=a.subTree=ln(Gt);w(null,e,t,n)}}else F(a,e,t,n,i,s,o)},V=(e,t,n)=>{const r=t.component=e.component;if(jt(e,t,n)){if(r.asyncDep&&!r.asyncResolved)return void j(r,t,n);r.next=t,r.update()}else t.el=e.el,r.vnode=t},F=(e,t,n,s,o,a,c)=>{const u=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:l}=e;{const n=St(e);if(n)return t&&(t.el=l.el,j(e,t,c)),void n.asyncDep.then((()=>{e.isUnmounted||u()}))}let h,d=t;0,bt(e,!1),t?(t.el=l.el,j(e,t,c)):t=l,n&&(0,i.DY)(n),(h=t.props&&t.props.onVnodeBeforeUpdate)&&bn(h,s,t,l),bt(e,!0);const p=Ut(e);0;const g=e.subTree;e.subTree=p,y(g,p,f(g.el),Z(g),e,o,a),t.el=p.el,null===d&&$t(e,p.el),r&&yt(r,o),(h=t.props&&t.props.onVnodeUpdated)&&yt((()=>bn(h,s,t,l)),o)}else{let r;const{el:c,props:u}=t,{bm:l,m:h,parent:d,root:f,type:p}=e,g=J(t);if(bt(e,!1),l&&(0,i.DY)(l),!g&&(r=u&&u.onVnodeBeforeMount)&&bn(r,d,t),bt(e,!0),c&&ie){const t=()=>{e.subTree=Ut(e),ie(c,e.subTree,e,o,null)};g&&p.__asyncHydrate?p.__asyncHydrate(c,e,t):t()}else{f.ce&&f.ce._injectChildStyle(p);const r=e.subTree=Ut(e);0,y(null,r,n,s,e,o,a),t.el=r.el}if(h&&yt(h,o),!g&&(r=u&&u.onVnodeMounted)){const e=t;yt((()=>bn(r,d,e)),o)}(256&t.shapeFlag||d&&J(d.vnode)&&256&d.vnode.shapeFlag)&&e.a&&yt(e.a,o),e.isMounted=!0,t=n=s=null}};e.scope.on();const l=e.effect=new r.X2(u);e.scope.off();const h=e.update=l.run.bind(l),d=e.job=l.runIfDirty.bind(l);d.i=e,d.id=e.uid,l.scheduler=()=>v(d),bt(e,!0),h()},j=(e,t,n)=>{t.component=e;const i=e.vnode.props;e.vnode=t,e.next=null,nt(e,t.props,i,n),gt(e,t.children,n),(0,r.C4)(),b(e),(0,r.bl)()},B=(e,t,n,r,i,s,o,a,c=!1)=>{const u=e&&e.children,l=e?e.shapeFlag:0,h=t.children,{patchFlag:f,shapeFlag:p}=t;if(f>0){if(128&f)return void q(u,h,n,r,i,s,o,a,c);if(256&f)return void $(u,h,n,r,i,s,o,a,c)}8&p?(16&l&&Q(u,i,s),h!==u&&d(n,h)):16&l?16&p?q(u,h,n,r,i,s,o,a,c):Q(u,i,s,!0):(8&l&&d(n,""),16&p&&R(h,n,r,i,s,o,a,c))},$=(e,t,n,r,s,o,a,c,u)=>{e=e||i.Oj,t=t||i.Oj;const l=e.length,h=t.length,d=Math.min(l,h);let f;for(f=0;f<d;f++){const r=t[f]=u?vn(t[f]):yn(t[f]);y(e[f],r,n,null,s,o,a,c,u)}l>h?Q(e,s,o,!0,!1,d):R(t,n,r,s,o,a,c,u,d)},q=(e,t,n,r,s,o,a,c,u)=>{let l=0;const h=t.length;let d=e.length-1,f=h-1;while(l<=d&&l<=f){const r=e[l],i=t[l]=u?vn(t[l]):yn(t[l]);if(!on(r,i))break;y(r,i,n,null,s,o,a,c,u),l++}while(l<=d&&l<=f){const r=e[d],i=t[f]=u?vn(t[f]):yn(t[f]);if(!on(r,i))break;y(r,i,n,null,s,o,a,c,u),d--,f--}if(l>d){if(l<=f){const e=f+1,i=e<h?t[e].el:r;while(l<=f)y(null,t[l]=u?vn(t[l]):yn(t[l]),n,i,s,o,a,c,u),l++}}else if(l>f)while(l<=d)H(e[l],s,o,!0),l++;else{const p=l,g=l,m=new Map;for(l=g;l<=f;l++){const e=t[l]=u?vn(t[l]):yn(t[l]);null!=e.key&&m.set(e.key,l)}let v,_=0;const w=f-g+1;let b=!1,E=0;const T=new Array(w);for(l=0;l<w;l++)T[l]=0;for(l=p;l<=d;l++){const r=e[l];if(_>=w){H(r,s,o,!0);continue}let i;if(null!=r.key)i=m.get(r.key);else for(v=g;v<=f;v++)if(0===T[v-g]&&on(r,t[v])){i=v;break}void 0===i?H(r,s,o,!0):(T[i-g]=l+1,i>=E?E=i:b=!0,y(r,t[i],n,null,s,o,a,c,u),_++)}const I=b?It(T):i.Oj;for(v=I.length-1,l=w-1;l>=0;l--){const e=g+l,i=t[e],d=e+1<h?t[e+1].el:r;0===T[l]?y(null,i,n,d,s,o,a,c,u):b&&(v<0||l!==I[v]?z(i,n,d,2):v--)}}},z=(e,t,n,r,i=null)=>{const{el:o,type:a,transition:c,children:u,shapeFlag:l}=e;if(6&l)return void z(e.component.subTree,t,n,r);if(128&l)return void e.suspense.move(t,n,r);if(64&l)return void a.move(e,t,n,ne);if(a===Ht){s(o,t,n);for(let e=0;e<u.length;e++)z(u[e],t,n,r);return void s(e.anchor,t,n)}if(a===Wt)return void I(e,t,n);const h=2!==r&&1&l&&c;if(h)if(0===r)c.beforeEnter(o),s(o,t,n),yt((()=>c.enter(o)),i);else{const{leave:e,delayLeave:r,afterLeave:i}=c,a=()=>s(o,t,n),u=()=>{e(o,(()=>{a(),i&&i()}))};r?r(o,a,u):u()}else s(o,t,n)},H=(e,t,n,r=!1,i=!1)=>{const{type:s,props:o,ref:a,children:c,dynamicChildren:u,shapeFlag:l,patchFlag:h,dirs:d,cacheIndex:f}=e;if(-2===h&&(i=!1),null!=a&&X(a,null,n,e,!0),null!=f&&(t.renderCache[f]=void 0),256&l)return void t.ctx.deactivate(e);const p=1&l&&d,g=!J(e);let m;if(g&&(m=o&&o.onVnodeBeforeUnmount)&&bn(m,t,e),6&l)W(e.component,n,r);else{if(128&l)return void e.suspense.unmount(n,r);p&&O(e,null,t,"beforeUnmount"),64&l?e.type.remove(e,t,n,ne,r):u&&!u.hasOnce&&(s!==Ht||h>0&&64&h)?Q(u,t,n,!1,!0):(s===Ht&&384&h||!i&&16&l)&&Q(c,t,n),r&&K(e)}(g&&(m=o&&o.onVnodeUnmounted)||p)&&yt((()=>{m&&bn(m,t,e),p&&O(e,null,t,"unmounted")}),n)},K=e=>{const{type:t,el:n,anchor:r,transition:i}=e;if(t===Ht)return void G(n,r);if(t===Wt)return void S(e);const s=()=>{o(n),i&&!i.persisted&&i.afterLeave&&i.afterLeave()};if(1&e.shapeFlag&&i&&!i.persisted){const{leave:t,delayLeave:r}=i,o=()=>t(n,s);r?r(e.el,s,o):o()}else s()},G=(e,t)=>{let n;while(e!==t)n=p(e),o(e),e=n;o(t)},W=(e,t,n)=>{const{bum:r,scope:s,job:o,subTree:a,um:c,m:u,a:l}=e;Ct(u),Ct(l),r&&(0,i.DY)(r),s.stop(),o&&(o.flags|=8,H(a,e,t,n)),c&&yt(c,t),yt((()=>{e.isUnmounted=!0}),t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve())},Q=(e,t,n,r=!1,i=!1,s=0)=>{for(let o=s;o<e.length;o++)H(e[o],t,n,r,i)},Z=e=>{if(6&e.shapeFlag)return Z(e.component.subTree);if(128&e.shapeFlag)return e.suspense.next();const t=p(e.anchor||e.el),n=t&&t[N];return n?p(n):t};let ee=!1;const te=(e,t,n)=>{null==e?t._vnode&&H(t._vnode,null,null,!0):y(t._vnode||null,e,t,null,null,null,n),t._vnode=e,ee||(ee=!0,b(),E(),ee=!1)},ne={p:y,um:H,m:z,r:K,mt:U,mc:R,pc:B,pbc:x,n:Z,o:e};let re,ie;return t&&([re,ie]=t(ne)),{render:te,hydrate:re,createApp:We(te,re)}}function wt({type:e,props:t},n){return"svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function bt({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Et(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Tt(e,t,n=!1){const r=e.children,s=t.children;if((0,i.cy)(r)&&(0,i.cy)(s))for(let i=0;i<r.length;i++){const e=r[i];let t=s[i];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=s[i]=vn(s[i]),t.el=e.el),n||-2===t.patchFlag||Tt(e,t)),t.type===Kt&&(t.el=e.el)}}function It(e){const t=e.slice(),n=[0];let r,i,s,o,a;const c=e.length;for(r=0;r<c;r++){const c=e[r];if(0!==c){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}s=0,o=n.length-1;while(s<o)a=s+o>>1,e[n[a]]<c?s=a+1:o=a;c<e[n[s]]&&(s>0&&(t[r]=n[s-1]),n[s]=r)}}s=n.length,o=n[s-1];while(s-- >0)n[s]=o,o=t[o];return n}function St(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:St(t)}function Ct(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}const At=Symbol.for("v-scx"),kt=()=>{{const e=Je(At);return e}};function Rt(e,t,n){return Ot(e,t,n)}function Ot(e,t,n=i.MZ){const{immediate:s,deep:a,flush:c,once:u}=n;const l=(0,i.X$)({},n);const h=t&&s||!t&&"post"!==c;let d;if(Pn)if("sync"===c){const e=kt();d=e.__watcherHandles||(e.__watcherHandles=[])}else if(!h){const e=()=>{};return e.stop=i.tE,e.resume=i.tE,e.pause=i.tE,e}const f=Sn;l.call=(e,t,n)=>o(e,f,t,n);let p=!1;"post"===c?l.scheduler=e=>{yt(e,f&&f.suspense)}:"sync"!==c&&(p=!0,l.scheduler=(e,t)=>{t?e():v(e)}),l.augmentJob=e=>{t&&(e.flags|=4),p&&(e.flags|=2,f&&(e.id=f.uid,e.i=f))};const g=(0,r.wB)(e,t,l);return Pn&&(d?d.push(g):h&&g()),g}function Nt(e,t,n){const r=this.proxy,s=(0,i.Kg)(e)?e.includes(".")?Dt(r,e):()=>r[e]:e.bind(r,r);let o;(0,i.Tn)(t)?o=t:(o=t.handler,n=t);const a=Rn(this),c=Ot(s,o.bind(r),n);return a(),c}function Dt(e,t){const n=t.split(".");return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}const xt=(e,t)=>"modelValue"===t||"model-value"===t?e.modelModifiers:e[`${t}Modifiers`]||e[`${(0,i.PT)(t)}Modifiers`]||e[`${(0,i.Tg)(t)}Modifiers`];function Pt(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||i.MZ;let s=n;const a=t.startsWith("update:"),c=a&&xt(r,t.slice(7));let u;c&&(c.trim&&(s=n.map((e=>(0,i.Kg)(e)?e.trim():e))),c.number&&(s=n.map(i.bB)));let l=r[u=(0,i.rU)(t)]||r[u=(0,i.rU)((0,i.PT)(t))];!l&&a&&(l=r[u=(0,i.rU)((0,i.Tg)(t))]),l&&o(l,e,6,s);const h=r[u+"Once"];if(h){if(e.emitted){if(e.emitted[u])return}else e.emitted={};e.emitted[u]=!0,o(h,e,6,s)}}function Lt(e,t,n=!1){const r=t.emitsCache,s=r.get(e);if(void 0!==s)return s;const o=e.emits;let a={},c=!1;if(!(0,i.Tn)(e)){const r=e=>{const n=Lt(e,t,!0);n&&(c=!0,(0,i.X$)(a,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return o||c?((0,i.cy)(o)?o.forEach((e=>a[e]=null)):(0,i.X$)(a,o),(0,i.Gv)(e)&&r.set(e,a),a):((0,i.Gv)(e)&&r.set(e,null),null)}function Mt(e,t){return!(!e||!(0,i.Mp)(t))&&(t=t.slice(2).replace(/Once$/,""),(0,i.$3)(e,t[0].toLowerCase()+t.slice(1))||(0,i.$3)(e,(0,i.Tg)(t))||(0,i.$3)(e,t))}function Ut(e){const{type:t,vnode:n,proxy:r,withProxy:s,propsOptions:[o],slots:c,attrs:u,emit:l,render:h,renderCache:d,props:f,data:p,setupState:g,ctx:m,inheritAttrs:y}=e,v=A(e);let _,w;try{if(4&n.shapeFlag){const e=s||r,t=e;_=yn(h.call(t,e,d,f,g,p,m)),w=u}else{const e=t;0,_=yn(e.length>1?e(f,{attrs:u,slots:c,emit:l}):e(f,null)),w=t.props?u:Vt(u)}}catch(E){Qt.length=0,a(E,e,1),_=ln(Gt)}let b=_;if(w&&!1!==y){const e=Object.keys(w),{shapeFlag:t}=b;e.length&&7&t&&(o&&e.some(i.CP)&&(w=Ft(w,o)),b=fn(b,w,!1,!0))}return n.dirs&&(b=fn(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&K(b,n.transition),_=b,A(v),_}const Vt=e=>{let t;for(const n in e)("class"===n||"style"===n||(0,i.Mp)(n))&&((t||(t={}))[n]=e[n]);return t},Ft=(e,t)=>{const n={};for(const r in e)(0,i.CP)(r)&&r.slice(9)in t||(n[r]=e[r]);return n};function jt(e,t,n){const{props:r,children:i,component:s}=e,{props:o,children:a,patchFlag:c}=t,u=s.emitsOptions;if(t.dirs||t.transition)return!0;if(!(n&&c>=0))return!(!i&&!a||a&&a.$stable)||r!==o&&(r?!o||Bt(r,o,u):!!o);if(1024&c)return!0;if(16&c)return r?Bt(r,o,u):!!o;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(o[n]!==r[n]&&!Mt(u,n))return!0}}return!1}function Bt(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(t[s]!==e[s]&&!Mt(n,s))return!0}return!1}function $t({vnode:e,parent:t},n){while(t){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r!==e)break;(e=t.vnode).el=n,t=t.parent}}const qt=e=>e.__isSuspense;function zt(e,t){t&&t.pendingBranch?(0,i.cy)(e)?t.effects.push(...e):t.effects.push(e):w(e)}const Ht=Symbol.for("v-fgt"),Kt=Symbol.for("v-txt"),Gt=Symbol.for("v-cmt"),Wt=Symbol.for("v-stc"),Qt=[];let Xt=null;function Jt(e=!1){Qt.push(Xt=e?null:[])}function Yt(){Qt.pop(),Xt=Qt[Qt.length-1]||null}let Zt=1;function en(e,t=!1){Zt+=e,e<0&&Xt&&t&&(Xt.hasOnce=!0)}function tn(e){return e.dynamicChildren=Zt>0?Xt||i.Oj:null,Yt(),Zt>0&&Xt&&Xt.push(e),e}function nn(e,t,n,r,i,s){return tn(un(e,t,n,r,i,s,!0))}function rn(e,t,n,r,i){return tn(ln(e,t,n,r,i,!0))}function sn(e){return!!e&&!0===e.__v_isVNode}function on(e,t){return e.type===t.type&&e.key===t.key}const an=({key:e})=>null!=e?e:null,cn=({ref:e,ref_key:t,ref_for:n})=>("number"===typeof e&&(e=""+e),null!=e?(0,i.Kg)(e)||(0,r.i9)(e)||(0,i.Tn)(e)?{i:S,r:e,k:t,f:!!n}:e:null);function un(e,t=null,n=null,r=0,s=null,o=(e===Ht?0:1),a=!1,c=!1){const u={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&an(t),ref:t&&cn(t),scopeId:C,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:S};return c?(_n(u,n),128&o&&e.normalize(u)):n&&(u.shapeFlag|=(0,i.Kg)(n)?8:16),Zt>0&&!a&&Xt&&(u.patchFlag>0||6&o)&&32!==u.patchFlag&&Xt.push(u),u}const ln=hn;function hn(e,t=null,n=null,s=0,o=null,a=!1){if(e&&e!==we||(e=Gt),sn(e)){const r=fn(e,t,!0);return n&&_n(r,n),Zt>0&&!a&&Xt&&(6&r.shapeFlag?Xt[Xt.indexOf(e)]=r:Xt.push(r)),r.patchFlag=-2,r}if(qn(e)&&(e=e.__vccOpts),t){t=dn(t);let{class:e,style:n}=t;e&&!(0,i.Kg)(e)&&(t.class=(0,i.C4)(e)),(0,i.Gv)(n)&&((0,r.ju)(n)&&!(0,i.cy)(n)&&(n=(0,i.X$)({},n)),t.style=(0,i.Tr)(n))}const c=(0,i.Kg)(e)?1:qt(e)?128:D(e)?64:(0,i.Gv)(e)?4:(0,i.Tn)(e)?2:0;return un(e,t,n,s,o,c,a,!0)}function dn(e){return e?(0,r.ju)(e)||et(e)?(0,i.X$)({},e):e:null}function fn(e,t,n=!1,r=!1){const{props:s,ref:o,patchFlag:a,children:c,transition:u}=e,l=t?wn(s||{},t):s,h={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&an(l),ref:t&&t.ref?n&&o?(0,i.cy)(o)?o.concat(cn(t)):[o,cn(t)]:cn(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:c,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ht?-1===a?16:16|a:a,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:u,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&fn(e.ssContent),ssFallback:e.ssFallback&&fn(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return u&&r&&K(h,u.clone(h)),h}function pn(e=" ",t=0){return ln(Kt,null,e,t)}function gn(e,t){const n=ln(Wt,null,e);return n.staticCount=t,n}function mn(e="",t=!1){return t?(Jt(),rn(Gt,null,e)):ln(Gt,null,e)}function yn(e){return null==e||"boolean"===typeof e?ln(Gt):(0,i.cy)(e)?ln(Ht,null,e.slice()):sn(e)?vn(e):ln(Kt,null,String(e))}function vn(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:fn(e)}function _n(e,t){let n=0;const{shapeFlag:r}=e;if(null==t)t=null;else if((0,i.cy)(t))n=16;else if("object"===typeof t){if(65&r){const n=t.default;return void(n&&(n._c&&(n._d=!1),_n(e,n()),n._c&&(n._d=!0)))}{n=32;const r=t._;r||et(t)?3===r&&S&&(1===S.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=S}}else(0,i.Tn)(t)?(t={default:t,_ctx:S},n=32):(t=String(t),64&r?(n=16,t=[pn(t)]):n=8);e.children=t,e.shapeFlag|=n}function wn(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const e in r)if("class"===e)t.class!==r.class&&(t.class=(0,i.C4)([t.class,r.class]));else if("style"===e)t.style=(0,i.Tr)([t.style,r.style]);else if((0,i.Mp)(e)){const n=t[e],s=r[e];!s||n===s||(0,i.cy)(n)&&n.includes(s)||(t[e]=n?[].concat(n,s):s)}else""!==e&&(t[e]=r[e])}return t}function bn(e,t,n,r=null){o(e,t,7,[n,r])}const En=Ke();let Tn=0;function In(e,t,n){const s=e.type,o=(t?t.appContext:e.appContext)||En,a={uid:Tn++,vnode:e,type:s,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new r.yC(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ot(s,o),emitsOptions:Lt(s,o),emit:null,emitted:null,propsDefaults:i.MZ,inheritAttrs:s.inheritAttrs,ctx:i.MZ,data:i.MZ,props:i.MZ,attrs:i.MZ,slots:i.MZ,refs:i.MZ,setupState:i.MZ,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=Pt.bind(null,a),e.ce&&e.ce(a),a}let Sn=null;const Cn=()=>Sn||S;let An,kn;{const e=(0,i.We)(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach((t=>t(e))):r[0](e)}};An=t("__VUE_INSTANCE_SETTERS__",(e=>Sn=e)),kn=t("__VUE_SSR_SETTERS__",(e=>Pn=e))}const Rn=e=>{const t=Sn;return An(e),e.scope.on(),()=>{e.scope.off(),An(t)}},On=()=>{Sn&&Sn.scope.off(),An(null)};function Nn(e){return 4&e.vnode.shapeFlag}let Dn,xn,Pn=!1;function Ln(e,t=!1,n=!1){t&&kn(t);const{props:r,children:i}=e.vnode,s=Nn(e);tt(e,r,s,t),pt(e,i,n);const o=s?Mn(e,t):void 0;return t&&kn(!1),o}function Mn(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Re);const{setup:o}=n;if(o){(0,r.C4)();const n=e.setupContext=o.length>1?jn(e):null,c=Rn(e),u=s(o,e,0,[e.props,n]),l=(0,i.yL)(u);if((0,r.bl)(),c(),!l&&!e.sp||J(e)||Q(e),l){if(u.then(On,On),t)return u.then((n=>{Un(e,n,t)})).catch((t=>{a(t,e,0)}));e.asyncDep=u}else Un(e,u,t)}else Vn(e,t)}function Un(e,t,n){(0,i.Tn)(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:(0,i.Gv)(t)&&(e.setupState=(0,r.Pr)(t)),Vn(e,n)}function Vn(e,t,n){const s=e.type;if(!e.render){if(!t&&Dn&&!s.render){const t=s.template||Me(e).template;if(t){0;const{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:o,compilerOptions:a}=s,c=(0,i.X$)((0,i.X$)({isCustomElement:n,delimiters:o},r),a);s.render=Dn(t,c)}}e.render=s.render||i.tE,xn&&xn(e)}{const t=Rn(e);(0,r.C4)();try{De(e)}finally{(0,r.bl)(),t()}}}const Fn={get(e,t){return(0,r.u4)(e,"get",""),e[t]}};function jn(e){const t=t=>{e.exposed=t||{}};return{attrs:new Proxy(e.attrs,Fn),slots:e.slots,emit:e.emit,expose:t}}function Bn(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy((0,r.Pr)((0,r.IG)(e.exposed)),{get(t,n){return n in t?t[n]:n in Ae?Ae[n](e):void 0},has(e,t){return t in e||t in Ae}})):e.proxy}function $n(e,t=!0){return(0,i.Tn)(e)?e.displayName||e.name:e.name||t&&e.__name}function qn(e){return(0,i.Tn)(e)&&"__vccOpts"in e}const zn=(e,t)=>{const n=(0,r.EW)(e,t,Pn);return n};function Hn(e,t,n){const r=arguments.length;return 2===r?(0,i.Gv)(t)&&!(0,i.cy)(t)?sn(t)?ln(e,null,[t]):ln(e,t):ln(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):3===r&&sn(n)&&(n=[n]),ln(e,t,n))}const Kn="3.5.13"},5130:function(e,t,n){n.d(t,{D$:function(){return Ee},Ef:function(){return ke},Jo:function(){return de},XL:function(){return ge},eB:function(){return _},jR:function(){return Ie},lH:function(){return fe},u1:function(){return me}});n(4114),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(8992),n(4520),n(3949),n(1454),n(7550);var r=n(6768),i=n(4232);n(144);
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let s;const o="undefined"!==typeof window&&window.trustedTypes;if(o)try{s=o.createPolicy("vue",{createHTML:e=>e})}catch(Ne){}const a=s?e=>s.createHTML(e):e=>e,c="http://www.w3.org/2000/svg",u="http://www.w3.org/1998/Math/MathML",l="undefined"!==typeof document?document:null,h=l&&l.createElement("template"),d={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const i="svg"===t?l.createElementNS(c,e):"mathml"===t?l.createElementNS(u,e):n?l.createElement(e,{is:n}):l.createElement(e);return"select"===e&&r&&null!=r.multiple&&i.setAttribute("multiple",r.multiple),i},createText:e=>l.createTextNode(e),createComment:e=>l.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>l.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,i,s){const o=n?n.previousSibling:t.lastChild;if(i&&(i===s||i.nextSibling)){while(1)if(t.insertBefore(i.cloneNode(!0),n),i===s||!(i=i.nextSibling))break}else{h.innerHTML=a("svg"===r?`<svg>${e}</svg>`:"mathml"===r?`<math>${e}</math>`:e);const i=h.content;if("svg"===r||"mathml"===r){const e=i.firstChild;while(e.firstChild)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},f="transition",p="animation",g=Symbol("_vtc"),m={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},y=(0,i.X$)({},r.QP,m),v=e=>(e.displayName="Transition",e.props=y,e),_=v(((e,{slots:t})=>(0,r.h)(r.pR,E(e),t))),w=(e,t=[])=>{(0,i.cy)(e)?e.forEach((e=>e(...t))):e&&e(...t)},b=e=>!!e&&((0,i.cy)(e)?e.some((e=>e.length>1)):e.length>1);function E(e){const t={};for(const i in e)i in m||(t[i]=e[i]);if(!1===e.css)return t;const{name:n="v",type:r,duration:s,enterFromClass:o=`${n}-enter-from`,enterActiveClass:a=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:u=o,appearActiveClass:l=a,appearToClass:h=c,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:p=`${n}-leave-to`}=e,g=T(s),y=g&&g[0],v=g&&g[1],{onBeforeEnter:_,onEnter:E,onEnterCancelled:I,onLeave:k,onLeaveCancelled:O,onBeforeAppear:N=_,onAppear:D=E,onAppearCancelled:P=I}=t,L=(e,t,n,r)=>{e._enterCancelled=r,C(e,t?h:c),C(e,t?l:a),n&&n()},M=(e,t)=>{e._isLeaving=!1,C(e,d),C(e,p),C(e,f),t&&t()},U=e=>(t,n)=>{const i=e?D:E,s=()=>L(t,e,n);w(i,[t,s]),A((()=>{C(t,e?u:o),S(t,e?h:c),b(i)||R(t,r,y,s)}))};return(0,i.X$)(t,{onBeforeEnter(e){w(_,[e]),S(e,o),S(e,a)},onBeforeAppear(e){w(N,[e]),S(e,u),S(e,l)},onEnter:U(!1),onAppear:U(!0),onLeave(e,t){e._isLeaving=!0;const n=()=>M(e,t);S(e,d),e._enterCancelled?(S(e,f),x()):(x(),S(e,f)),A((()=>{e._isLeaving&&(C(e,d),S(e,p),b(k)||R(e,r,v,n))})),w(k,[e,n])},onEnterCancelled(e){L(e,!1,void 0,!0),w(I,[e])},onAppearCancelled(e){L(e,!0,void 0,!0),w(P,[e])},onLeaveCancelled(e){M(e),w(O,[e])}})}function T(e){if(null==e)return null;if((0,i.Gv)(e))return[I(e.enter),I(e.leave)];{const t=I(e);return[t,t]}}function I(e){const t=(0,i.Ro)(e);return t}function S(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.add(t))),(e[g]||(e[g]=new Set)).add(t)}function C(e,t){t.split(/\s+/).forEach((t=>t&&e.classList.remove(t)));const n=e[g];n&&(n.delete(t),n.size||(e[g]=void 0))}function A(e){requestAnimationFrame((()=>{requestAnimationFrame(e)}))}let k=0;function R(e,t,n,r){const i=e._endId=++k,s=()=>{i===e._endId&&r()};if(null!=n)return setTimeout(s,n);const{type:o,timeout:a,propCount:c}=O(e,t);if(!o)return r();const u=o+"end";let l=0;const h=()=>{e.removeEventListener(u,d),s()},d=t=>{t.target===e&&++l>=c&&h()};setTimeout((()=>{l<c&&h()}),a+1),e.addEventListener(u,d)}function O(e,t){const n=window.getComputedStyle(e),r=e=>(n[e]||"").split(", "),i=r(`${f}Delay`),s=r(`${f}Duration`),o=N(i,s),a=r(`${p}Delay`),c=r(`${p}Duration`),u=N(a,c);let l=null,h=0,d=0;t===f?o>0&&(l=f,h=o,d=s.length):t===p?u>0&&(l=p,h=u,d=c.length):(h=Math.max(o,u),l=h>0?o>u?f:p:null,d=l?l===f?s.length:c.length:0);const g=l===f&&/\b(transform|all)(,|$)/.test(r(`${f}Property`).toString());return{type:l,timeout:h,propCount:d,hasTransform:g}}function N(e,t){while(e.length<t.length)e=e.concat(e);return Math.max(...t.map(((t,n)=>D(t)+D(e[n]))))}function D(e){return"auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function x(){return document.body.offsetHeight}function P(e,t,n){const r=e[g];r&&(t=(t?[t,...r]:[...r]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const L=Symbol("_vod"),M=Symbol("_vsh");const U=Symbol("");const V=/(^|;)\s*display\s*:/;function F(e,t,n){const r=e.style,s=(0,i.Kg)(n);let o=!1;if(n&&!s){if(t)if((0,i.Kg)(t))for(const e of t.split(";")){const t=e.slice(0,e.indexOf(":")).trim();null==n[t]&&B(r,t,"")}else for(const e in t)null==n[e]&&B(r,e,"");for(const e in n)"display"===e&&(o=!0),B(r,e,n[e])}else if(s){if(t!==n){const e=r[U];e&&(n+=";"+e),r.cssText=n,o=V.test(n)}}else t&&e.removeAttribute("style");L in e&&(e[L]=o?r.display:"",e[M]&&(r.display="none"))}const j=/\s*!important$/;function B(e,t,n){if((0,i.cy)(n))n.forEach((n=>B(e,t,n)));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=z(e,t);j.test(n)?e.setProperty((0,i.Tg)(r),n.replace(j,""),"important"):e[r]=n}}const $=["Webkit","Moz","ms"],q={};function z(e,t){const n=q[t];if(n)return n;let r=(0,i.PT)(t);if("filter"!==r&&r in e)return q[t]=r;r=(0,i.ZH)(r);for(let i=0;i<$.length;i++){const n=$[i]+r;if(n in e)return q[t]=n}return t}const H="http://www.w3.org/1999/xlink";function K(e,t,n,r,s,o=(0,i.J$)(t)){r&&t.startsWith("xlink:")?null==n?e.removeAttributeNS(H,t.slice(6,t.length)):e.setAttributeNS(H,t,n):null==n||o&&!(0,i.Y2)(n)?e.removeAttribute(t):e.setAttribute(t,o?"":(0,i.Bm)(n)?String(n):n)}function G(e,t,n,r,s){if("innerHTML"===t||"textContent"===t)return void(null!=n&&(e[t]="innerHTML"===t?a(n):n));const o=e.tagName;if("value"===t&&"PROGRESS"!==o&&!o.includes("-")){const r="OPTION"===o?e.getAttribute("value")||"":e.value,i=null==n?"checkbox"===e.type?"on":"":String(n);return r===i&&"_value"in e||(e.value=i),null==n&&e.removeAttribute(t),void(e._value=n)}let c=!1;if(""===n||null==n){const r=typeof e[t];"boolean"===r?n=(0,i.Y2)(n):null==n&&"string"===r?(n="",c=!0):"number"===r&&(n=0,c=!0)}try{e[t]=n}catch(Ne){0}c&&e.removeAttribute(s||t)}function W(e,t,n,r){e.addEventListener(t,n,r)}function Q(e,t,n,r){e.removeEventListener(t,n,r)}const X=Symbol("_vei");function J(e,t,n,r,i=null){const s=e[X]||(e[X]={}),o=s[t];if(r&&o)o.value=r;else{const[n,a]=Z(t);if(r){const o=s[t]=re(r,i);W(e,n,o,a)}else o&&(Q(e,n,o,a),s[t]=void 0)}}const Y=/(?:Once|Passive|Capture)$/;function Z(e){let t;if(Y.test(e)){let n;t={};while(n=e.match(Y))e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}const n=":"===e[2]?e.slice(3):(0,i.Tg)(e.slice(2));return[n,t]}let ee=0;const te=Promise.resolve(),ne=()=>ee||(te.then((()=>ee=0)),ee=Date.now());function re(e,t){const n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();(0,r.qL)(ie(e,n.value),t,5,[e])};return n.value=e,n.attached=ne(),n}function ie(e,t){if((0,i.cy)(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map((e=>t=>!t._stopped&&e&&e(t)))}return t}const se=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,oe=(e,t,n,r,s,o)=>{const a="svg"===s;"class"===t?P(e,r,a):"style"===t?F(e,n,r):(0,i.Mp)(t)?(0,i.CP)(t)||J(e,t,n,r,o):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):ae(e,t,r,a))?(G(e,t,r),e.tagName.includes("-")||"value"!==t&&"checked"!==t&&"selected"!==t||K(e,t,r,a,o,"value"!==t)):!e._isVueCE||!/[A-Z]/.test(t)&&(0,i.Kg)(r)?("true-value"===t?e._trueValue=r:"false-value"===t&&(e._falseValue=r),K(e,t,r,a)):G(e,(0,i.PT)(t),r,o,t)};function ae(e,t,n,r){if(r)return"innerHTML"===t||"textContent"===t||!!(t in e&&se(t)&&(0,i.Tn)(n));if("spellcheck"===t||"draggable"===t||"translate"===t)return!1;if("form"===t)return!1;if("list"===t&&"INPUT"===e.tagName)return!1;if("type"===t&&"TEXTAREA"===e.tagName)return!1;if("width"===t||"height"===t){const t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return!1}return(!se(t)||!(0,i.Kg)(n))&&t in e}
/*! #__NO_SIDE_EFFECTS__ */
"undefined"!==typeof HTMLElement&&HTMLElement;Symbol("_moveCb"),Symbol("_enterCb");const ce=e=>{const t=e.props["onUpdate:modelValue"]||!1;return(0,i.cy)(t)?e=>(0,i.DY)(t,e):t};function ue(e){e.target.composing=!0}function le(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const he=Symbol("_assign"),de={created(e,{modifiers:{lazy:t,trim:n,number:r}},s){e[he]=ce(s);const o=r||s.props&&"number"===s.props.type;W(e,t?"change":"input",(t=>{if(t.target.composing)return;let r=e.value;n&&(r=r.trim()),o&&(r=(0,i.bB)(r)),e[he](r)})),n&&W(e,"change",(()=>{e.value=e.value.trim()})),t||(W(e,"compositionstart",ue),W(e,"compositionend",le),W(e,"change",le))},mounted(e,{value:t}){e.value=null==t?"":t},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:s,number:o}},a){if(e[he]=ce(a),e.composing)return;const c=!o&&"number"!==e.type||/^0\d/.test(e.value)?e.value:(0,i.bB)(e.value),u=null==t?"":t;if(c!==u){if(document.activeElement===e&&"range"!==e.type){if(r&&t===n)return;if(s&&e.value.trim()===u)return}e.value=u}}},fe={deep:!0,created(e,t,n){e[he]=ce(n),W(e,"change",(()=>{const t=e._modelValue,n=ve(e),r=e.checked,s=e[he];if((0,i.cy)(t)){const e=(0,i.u3)(t,n),o=-1!==e;if(r&&!o)s(t.concat(n));else if(!r&&o){const n=[...t];n.splice(e,1),s(n)}}else if((0,i.vM)(t)){const e=new Set(t);r?e.add(n):e.delete(n),s(e)}else s(_e(e,r))}))},mounted:pe,beforeUpdate(e,t,n){e[he]=ce(n),pe(e,t,n)}};function pe(e,{value:t,oldValue:n},r){let s;if(e._modelValue=t,(0,i.cy)(t))s=(0,i.u3)(t,r.props.value)>-1;else if((0,i.vM)(t))s=t.has(r.props.value);else{if(t===n)return;s=(0,i.BX)(t,_e(e,!0))}e.checked!==s&&(e.checked=s)}const ge={created(e,{value:t},n){e.checked=(0,i.BX)(t,n.props.value),e[he]=ce(n),W(e,"change",(()=>{e[he](ve(e))}))},beforeUpdate(e,{value:t,oldValue:n},r){e[he]=ce(r),t!==n&&(e.checked=(0,i.BX)(t,r.props.value))}},me={deep:!0,created(e,{value:t,modifiers:{number:n}},s){const o=(0,i.vM)(t);W(e,"change",(()=>{const t=Array.prototype.filter.call(e.options,(e=>e.selected)).map((e=>n?(0,i.bB)(ve(e)):ve(e)));e[he](e.multiple?o?new Set(t):t:t[0]),e._assigning=!0,(0,r.dY)((()=>{e._assigning=!1}))})),e[he]=ce(s)},mounted(e,{value:t}){ye(e,t)},beforeUpdate(e,t,n){e[he]=ce(n)},updated(e,{value:t}){e._assigning||ye(e,t)}};function ye(e,t){const n=e.multiple,r=(0,i.cy)(t);if(!n||r||(0,i.vM)(t)){for(let s=0,o=e.options.length;s<o;s++){const o=e.options[s],a=ve(o);if(n)if(r){const e=typeof a;o.selected="string"===e||"number"===e?t.some((e=>String(e)===String(a))):(0,i.u3)(t,a)>-1}else o.selected=t.has(a);else if((0,i.BX)(ve(o),t))return void(e.selectedIndex!==s&&(e.selectedIndex=s))}n||-1===e.selectedIndex||(e.selectedIndex=-1)}}function ve(e){return"_value"in e?e._value:e.value}function _e(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const we=["ctrl","shift","alt","meta"],be={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>we.some((n=>e[`${n}Key`]&&!t.includes(n)))},Ee=(e,t)=>{const n=e._withMods||(e._withMods={}),r=t.join(".");return n[r]||(n[r]=(n,...r)=>{for(let e=0;e<t.length;e++){const r=be[t[e]];if(r&&r(n,t))return}return e(n,...r)})},Te={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Ie=(e,t)=>{const n=e._withKeys||(e._withKeys={}),r=t.join(".");return n[r]||(n[r]=n=>{if(!("key"in n))return;const r=(0,i.Tg)(n.key);return t.some((e=>e===r||Te[e]===r))?e(n):void 0})},Se=(0,i.X$)({patchProp:oe},d);let Ce;function Ae(){return Ce||(Ce=(0,r.K9)(Se))}const ke=(...e)=>{const t=Ae().createApp(...e);const{mount:n}=t;return t.mount=e=>{const r=Oe(e);if(!r)return;const s=t._component;(0,i.Tn)(s)||s.render||s.template||(s.template=r.innerHTML),1===r.nodeType&&(r.textContent="");const o=n(r,!1,Re(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},t};function Re(e){return e instanceof SVGElement?"svg":"function"===typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function Oe(e){if((0,i.Kg)(e)){const t=document.querySelector(e);return t}return e}},4232:function(e,t,n){n.d(t,{$3:function(){return f},$H:function(){return U},BH:function(){return H},BX:function(){return ne},Bm:function(){return b},C4:function(){return J},CE:function(){return g},CP:function(){return u},DY:function(){return V},Gv:function(){return E},J$:function(){return Z},Kg:function(){return w},MZ:function(){return i},Mp:function(){return c},NO:function(){return a},Oj:function(){return s},PT:function(){return D},Qd:function(){return A},Ro:function(){return B},SU:function(){return R},TF:function(){return h},Tg:function(){return P},Tn:function(){return _},Tr:function(){return K},We:function(){return q},X$:function(){return l},Y2:function(){return ee},ZH:function(){return L},Zf:function(){return C},bB:function(){return j},cy:function(){return p},gd:function(){return v},pD:function(){return r},rU:function(){return M},tE:function(){return o},u3:function(){return re},vM:function(){return m},v_:function(){return se},yI:function(){return k},yL:function(){return T},yQ:function(){return F}});n(4114),n(8992),n(4520),n(3949),n(1454),n(8872);
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
function r(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return e=>e in t}const i={},s=[],o=()=>{},a=()=>!1,c=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),u=e=>e.startsWith("onUpdate:"),l=Object.assign,h=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},d=Object.prototype.hasOwnProperty,f=(e,t)=>d.call(e,t),p=Array.isArray,g=e=>"[object Map]"===S(e),m=e=>"[object Set]"===S(e),y=e=>"[object Date]"===S(e),v=e=>"[object RegExp]"===S(e),_=e=>"function"===typeof e,w=e=>"string"===typeof e,b=e=>"symbol"===typeof e,E=e=>null!==e&&"object"===typeof e,T=e=>(E(e)||_(e))&&_(e.then)&&_(e.catch),I=Object.prototype.toString,S=e=>I.call(e),C=e=>S(e).slice(8,-1),A=e=>"[object Object]"===S(e),k=e=>w(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,R=r(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),O=e=>{const t=Object.create(null);return n=>{const r=t[n];return r||(t[n]=e(n))}},N=/-(\w)/g,D=O((e=>e.replace(N,((e,t)=>t?t.toUpperCase():"")))),x=/\B([A-Z])/g,P=O((e=>e.replace(x,"-$1").toLowerCase())),L=O((e=>e.charAt(0).toUpperCase()+e.slice(1))),M=O((e=>{const t=e?`on${L(e)}`:"";return t})),U=(e,t)=>!Object.is(e,t),V=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},F=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},j=e=>{const t=parseFloat(e);return isNaN(t)?e:t},B=e=>{const t=w(e)?Number(e):NaN;return isNaN(t)?e:t};let $;const q=()=>$||($="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:"undefined"!==typeof window?window:"undefined"!==typeof n.g?n.g:{});const z="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol",H=r(z);function K(e){if(p(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],i=w(r)?X(r):K(r);if(i)for(const e in i)t[e]=i[e]}return t}if(w(e)||E(e))return e}const G=/;(?![^(]*\))/g,W=/:([^]+)/,Q=/\/\*[^]*?\*\//g;function X(e){const t={};return e.replace(Q,"").split(G).forEach((e=>{if(e){const n=e.split(W);n.length>1&&(t[n[0].trim()]=n[1].trim())}})),t}function J(e){let t="";if(w(e))t=e;else if(p(e))for(let n=0;n<e.length;n++){const r=J(e[n]);r&&(t+=r+" ")}else if(E(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Y="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Z=r(Y);function ee(e){return!!e||""===e}function te(e,t){if(e.length!==t.length)return!1;let n=!0;for(let r=0;n&&r<e.length;r++)n=ne(e[r],t[r]);return n}function ne(e,t){if(e===t)return!0;let n=y(e),r=y(t);if(n||r)return!(!n||!r)&&e.getTime()===t.getTime();if(n=b(e),r=b(t),n||r)return e===t;if(n=p(e),r=p(t),n||r)return!(!n||!r)&&te(e,t);if(n=E(e),r=E(t),n||r){if(!n||!r)return!1;const i=Object.keys(e).length,s=Object.keys(t).length;if(i!==s)return!1;for(const n in e){const r=e.hasOwnProperty(n),i=t.hasOwnProperty(n);if(r&&!i||!r&&i||!ne(e[n],t[n]))return!1}}return String(e)===String(t)}function re(e,t){return e.findIndex((e=>ne(e,t)))}const ie=e=>!(!e||!0!==e["__v_isRef"]),se=e=>w(e)?e:null==e?"":p(e)||E(e)&&(e.toString===I||!_(e.toString))?ie(e)?se(e.value):JSON.stringify(e,oe,2):String(e),oe=(e,t)=>ie(t)?oe(e,t.value):g(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n],r)=>(e[ae(t,r)+" =>"]=n,e)),{})}:m(t)?{[`Set(${t.size})`]:[...t.values()].map((e=>ae(e)))}:b(t)?ae(t):!E(t)||p(t)||A(t)?t:String(t),ae=(e,t="")=>{var n;return b(e)?`Symbol(${null!=(n=e.description)?n:t})`:e}},1241:function(e,t){t.A=(e,t)=>{const n=e.__vccOpts||e;for(const[r,i]of t)n[r]=i;return n}},9306:function(e,t,n){var r=n(4901),i=n(6823),s=TypeError;e.exports=function(e){if(r(e))return e;throw new s(i(e)+" is not a function")}},3506:function(e,t,n){var r=n(3925),i=String,s=TypeError;e.exports=function(e){if(r(e))return e;throw new s("Can't set "+i(e)+" as a prototype")}},7080:function(e,t,n){var r=n(4402).has;e.exports=function(e){return r(e),e}},679:function(e,t,n){var r=n(1625),i=TypeError;e.exports=function(e,t){if(r(t,e))return e;throw new i("Incorrect invocation")}},8551:function(e,t,n){var r=n(34),i=String,s=TypeError;e.exports=function(e){if(r(e))return e;throw new s(i(e)+" is not an object")}},7811:function(e){e.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},7394:function(e,t,n){var r=n(4576),i=n(6706),s=n(2195),o=r.ArrayBuffer,a=r.TypeError;e.exports=o&&i(o.prototype,"byteLength","get")||function(e){if("ArrayBuffer"!==s(e))throw new a("ArrayBuffer expected");return e.byteLength}},3238:function(e,t,n){var r=n(4576),i=n(7811),s=n(7394),o=r.DataView;e.exports=function(e){if(!i||0!==s(e))return!1;try{return new o(e),!1}catch(t){return!0}}},5169:function(e,t,n){var r=n(3238),i=TypeError;e.exports=function(e){if(r(e))throw new i("ArrayBuffer is detached");return e}},5636:function(e,t,n){var r=n(4576),i=n(9504),s=n(6706),o=n(7696),a=n(5169),c=n(7394),u=n(4483),l=n(1548),h=r.structuredClone,d=r.ArrayBuffer,f=r.DataView,p=Math.min,g=d.prototype,m=f.prototype,y=i(g.slice),v=s(g,"resizable","get"),_=s(g,"maxByteLength","get"),w=i(m.getInt8),b=i(m.setInt8);e.exports=(l||u)&&function(e,t,n){var r,i=c(e),s=void 0===t?i:o(t),g=!v||!v(e);if(a(e),l&&(e=h(e,{transfer:[e]}),i===s&&(n||g)))return e;if(i>=s&&(!n||g))r=y(e,0,s);else{var m=n&&!g&&_?{maxByteLength:_(e)}:void 0;r=new d(s,m);for(var E=new f(e),T=new f(r),I=p(s,i),S=0;S<I;S++)b(T,S,w(E,S))}return l||u(e),r}},9617:function(e,t,n){var r=n(5397),i=n(5610),s=n(6198),o=function(e){return function(t,n,o){var a=r(t),c=s(a);if(0===c)return!e&&-1;var u,l=i(o,c);if(e&&n!==n){while(c>l)if(u=a[l++],u!==u)return!0}else for(;c>l;l++)if((e||l in a)&&a[l]===n)return e||l||0;return!e&&-1}};e.exports={includes:o(!0),indexOf:o(!1)}},4527:function(e,t,n){var r=n(3724),i=n(4376),s=TypeError,o=Object.getOwnPropertyDescriptor,a=r&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}();e.exports=a?function(e,t){if(i(e)&&!o(e,"length").writable)throw new s("Cannot set read only .length");return e.length=t}:function(e,t){return e.length=t}},6319:function(e,t,n){var r=n(8551),i=n(9539);e.exports=function(e,t,n,s){try{return s?t(r(n)[0],n[1]):t(n)}catch(o){i(e,"throw",o)}}},2195:function(e,t,n){var r=n(9504),i=r({}.toString),s=r("".slice);e.exports=function(e){return s(i(e),8,-1)}},6955:function(e,t,n){var r=n(2140),i=n(4901),s=n(2195),o=n(8227),a=o("toStringTag"),c=Object,u="Arguments"===s(function(){return arguments}()),l=function(e,t){try{return e[t]}catch(n){}};e.exports=r?s:function(e){var t,n,r;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=l(t=c(e),a))?n:u?s(t):"Object"===(r=s(t))&&i(t.callee)?"Arguments":r}},7740:function(e,t,n){var r=n(9297),i=n(5031),s=n(7347),o=n(4913);e.exports=function(e,t,n){for(var a=i(t),c=o.f,u=s.f,l=0;l<a.length;l++){var h=a[l];r(e,h)||n&&r(n,h)||c(e,h,u(t,h))}}},2211:function(e,t,n){var r=n(9039);e.exports=!r((function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype}))},2529:function(e){e.exports=function(e,t){return{value:e,done:t}}},6699:function(e,t,n){var r=n(3724),i=n(4913),s=n(6980);e.exports=r?function(e,t,n){return i.f(e,t,s(1,n))}:function(e,t,n){return e[t]=n,e}},6980:function(e){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},4659:function(e,t,n){var r=n(3724),i=n(4913),s=n(6980);e.exports=function(e,t,n){r?i.f(e,t,s(0,n)):e[t]=n}},2106:function(e,t,n){var r=n(283),i=n(4913);e.exports=function(e,t,n){return n.get&&r(n.get,t,{getter:!0}),n.set&&r(n.set,t,{setter:!0}),i.f(e,t,n)}},6840:function(e,t,n){var r=n(4901),i=n(4913),s=n(283),o=n(9433);e.exports=function(e,t,n,a){a||(a={});var c=a.enumerable,u=void 0!==a.name?a.name:t;if(r(n)&&s(n,u,a),a.global)c?e[t]=n:o(t,n);else{try{a.unsafe?e[t]&&(c=!0):delete e[t]}catch(l){}c?e[t]=n:i.f(e,t,{value:n,enumerable:!1,configurable:!a.nonConfigurable,writable:!a.nonWritable})}return e}},6279:function(e,t,n){var r=n(6840);e.exports=function(e,t,n){for(var i in t)r(e,i,t[i],n);return e}},9433:function(e,t,n){var r=n(4576),i=Object.defineProperty;e.exports=function(e,t){try{i(r,e,{value:t,configurable:!0,writable:!0})}catch(n){r[e]=t}return t}},3724:function(e,t,n){var r=n(9039);e.exports=!r((function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]}))},4483:function(e,t,n){var r,i,s,o,a=n(4576),c=n(9429),u=n(1548),l=a.structuredClone,h=a.ArrayBuffer,d=a.MessageChannel,f=!1;if(u)f=function(e){l(e,{transfer:[e]})};else if(h)try{d||(r=c("worker_threads"),r&&(d=r.MessageChannel)),d&&(i=new d,s=new h(2),o=function(e){i.port1.postMessage(null,[e])},2===s.byteLength&&(o(s),0===s.byteLength&&(f=o)))}catch(p){}e.exports=f},4055:function(e,t,n){var r=n(4576),i=n(34),s=r.document,o=i(s)&&i(s.createElement);e.exports=function(e){return o?s.createElement(e):{}}},6837:function(e){var t=TypeError,n=9007199254740991;e.exports=function(e){if(e>n)throw t("Maximum allowed index exceeded");return e}},5002:function(e){e.exports={IndexSizeError:{s:"INDEX_SIZE_ERR",c:1,m:1},DOMStringSizeError:{s:"DOMSTRING_SIZE_ERR",c:2,m:0},HierarchyRequestError:{s:"HIERARCHY_REQUEST_ERR",c:3,m:1},WrongDocumentError:{s:"WRONG_DOCUMENT_ERR",c:4,m:1},InvalidCharacterError:{s:"INVALID_CHARACTER_ERR",c:5,m:1},NoDataAllowedError:{s:"NO_DATA_ALLOWED_ERR",c:6,m:0},NoModificationAllowedError:{s:"NO_MODIFICATION_ALLOWED_ERR",c:7,m:1},NotFoundError:{s:"NOT_FOUND_ERR",c:8,m:1},NotSupportedError:{s:"NOT_SUPPORTED_ERR",c:9,m:1},InUseAttributeError:{s:"INUSE_ATTRIBUTE_ERR",c:10,m:1},InvalidStateError:{s:"INVALID_STATE_ERR",c:11,m:1},SyntaxError:{s:"SYNTAX_ERR",c:12,m:1},InvalidModificationError:{s:"INVALID_MODIFICATION_ERR",c:13,m:1},NamespaceError:{s:"NAMESPACE_ERR",c:14,m:1},InvalidAccessError:{s:"INVALID_ACCESS_ERR",c:15,m:1},ValidationError:{s:"VALIDATION_ERR",c:16,m:0},TypeMismatchError:{s:"TYPE_MISMATCH_ERR",c:17,m:1},SecurityError:{s:"SECURITY_ERR",c:18,m:1},NetworkError:{s:"NETWORK_ERR",c:19,m:1},AbortError:{s:"ABORT_ERR",c:20,m:1},URLMismatchError:{s:"URL_MISMATCH_ERR",c:21,m:1},QuotaExceededError:{s:"QUOTA_EXCEEDED_ERR",c:22,m:1},TimeoutError:{s:"TIMEOUT_ERR",c:23,m:1},InvalidNodeTypeError:{s:"INVALID_NODE_TYPE_ERR",c:24,m:1},DataCloneError:{s:"DATA_CLONE_ERR",c:25,m:1}}},8727:function(e){e.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},6193:function(e,t,n){var r=n(4215);e.exports="NODE"===r},2839:function(e,t,n){var r=n(4576),i=r.navigator,s=i&&i.userAgent;e.exports=s?String(s):""},9519:function(e,t,n){var r,i,s=n(4576),o=n(2839),a=s.process,c=s.Deno,u=a&&a.versions||c&&c.version,l=u&&u.v8;l&&(r=l.split("."),i=r[0]>0&&r[0]<4?1:+(r[0]+r[1])),!i&&o&&(r=o.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=o.match(/Chrome\/(\d+)/),r&&(i=+r[1]))),e.exports=i},4215:function(e,t,n){var r=n(4576),i=n(2839),s=n(2195),o=function(e){return i.slice(0,e.length)===e};e.exports=function(){return o("Bun/")?"BUN":o("Cloudflare-Workers")?"CLOUDFLARE":o("Deno/")?"DENO":o("Node.js/")?"NODE":r.Bun&&"string"==typeof Bun.version?"BUN":r.Deno&&"object"==typeof Deno.version?"DENO":"process"===s(r.process)?"NODE":r.window&&r.document?"BROWSER":"REST"}()},8574:function(e,t,n){var r=n(9504),i=Error,s=r("".replace),o=function(e){return String(new i(e).stack)}("zxcasd"),a=/\n\s*at [^:]*:[^\n]*/,c=a.test(o);e.exports=function(e,t){if(c&&"string"==typeof e&&!i.prepareStackTrace)while(t--)e=s(e,a,"");return e}},6518:function(e,t,n){var r=n(4576),i=n(7347).f,s=n(6699),o=n(6840),a=n(9433),c=n(7740),u=n(2796);e.exports=function(e,t){var n,l,h,d,f,p,g=e.target,m=e.global,y=e.stat;if(l=m?r:y?r[g]||a(g,{}):r[g]&&r[g].prototype,l)for(h in t){if(f=t[h],e.dontCallGetSet?(p=i(l,h),d=p&&p.value):d=l[h],n=u(m?h:g+(y?".":"#")+h,e.forced),!n&&void 0!==d){if(typeof f==typeof d)continue;c(f,d)}(e.sham||d&&d.sham)&&s(f,"sham",!0),o(l,h,f,e)}}},9039:function(e){e.exports=function(e){try{return!!e()}catch(t){return!0}}},6080:function(e,t,n){var r=n(7476),i=n(9306),s=n(616),o=r(r.bind);e.exports=function(e,t){return i(e),void 0===t?e:s?o(e,t):function(){return e.apply(t,arguments)}}},616:function(e,t,n){var r=n(9039);e.exports=!r((function(){var e=function(){}.bind();return"function"!=typeof e||e.hasOwnProperty("prototype")}))},9565:function(e,t,n){var r=n(616),i=Function.prototype.call;e.exports=r?i.bind(i):function(){return i.apply(i,arguments)}},350:function(e,t,n){var r=n(3724),i=n(9297),s=Function.prototype,o=r&&Object.getOwnPropertyDescriptor,a=i(s,"name"),c=a&&"something"===function(){}.name,u=a&&(!r||r&&o(s,"name").configurable);e.exports={EXISTS:a,PROPER:c,CONFIGURABLE:u}},6706:function(e,t,n){var r=n(9504),i=n(9306);e.exports=function(e,t,n){try{return r(i(Object.getOwnPropertyDescriptor(e,t)[n]))}catch(s){}}},7476:function(e,t,n){var r=n(2195),i=n(9504);e.exports=function(e){if("Function"===r(e))return i(e)}},9504:function(e,t,n){var r=n(616),i=Function.prototype,s=i.call,o=r&&i.bind.bind(s,s);e.exports=r?o:function(e){return function(){return s.apply(e,arguments)}}},9429:function(e,t,n){var r=n(4576),i=n(6193);e.exports=function(e){if(i){try{return r.process.getBuiltinModule(e)}catch(t){}try{return Function('return require("'+e+'")')()}catch(t){}}}},7751:function(e,t,n){var r=n(4576),i=n(4901),s=function(e){return i(e)?e:void 0};e.exports=function(e,t){return arguments.length<2?s(r[e]):r[e]&&r[e][t]}},1767:function(e){e.exports=function(e){return{iterator:e,next:e.next,done:!1}}},851:function(e,t,n){var r=n(6955),i=n(5966),s=n(4117),o=n(6269),a=n(8227),c=a("iterator");e.exports=function(e){if(!s(e))return i(e,c)||i(e,"@@iterator")||o[r(e)]}},81:function(e,t,n){var r=n(9565),i=n(9306),s=n(8551),o=n(6823),a=n(851),c=TypeError;e.exports=function(e,t){var n=arguments.length<2?a(e):t;if(i(n))return s(r(n,e));throw new c(o(e)+" is not iterable")}},5966:function(e,t,n){var r=n(9306),i=n(4117);e.exports=function(e,t){var n=e[t];return i(n)?void 0:r(n)}},3789:function(e,t,n){var r=n(9306),i=n(8551),s=n(9565),o=n(1291),a=n(1767),c="Invalid size",u=RangeError,l=TypeError,h=Math.max,d=function(e,t){this.set=e,this.size=h(t,0),this.has=r(e.has),this.keys=r(e.keys)};d.prototype={getIterator:function(){return a(i(s(this.keys,this.set)))},includes:function(e){return s(this.has,this.set,e)}},e.exports=function(e){i(e);var t=+e.size;if(t!==t)throw new l(c);var n=o(t);if(n<0)throw new u(c);return new d(e,n)}},4576:function(e,t,n){var r=function(e){return e&&e.Math===Math&&e};e.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof n.g&&n.g)||r("object"==typeof this&&this)||function(){return this}()||Function("return this")()},9297:function(e,t,n){var r=n(9504),i=n(8981),s=r({}.hasOwnProperty);e.exports=Object.hasOwn||function(e,t){return s(i(e),t)}},421:function(e){e.exports={}},397:function(e,t,n){var r=n(7751);e.exports=r("document","documentElement")},5917:function(e,t,n){var r=n(3724),i=n(9039),s=n(4055);e.exports=!r&&!i((function(){return 7!==Object.defineProperty(s("div"),"a",{get:function(){return 7}}).a}))},7055:function(e,t,n){var r=n(9504),i=n(9039),s=n(2195),o=Object,a=r("".split);e.exports=i((function(){return!o("z").propertyIsEnumerable(0)}))?function(e){return"String"===s(e)?a(e,""):o(e)}:o},3167:function(e,t,n){var r=n(4901),i=n(34),s=n(2967);e.exports=function(e,t,n){var o,a;return s&&r(o=t.constructor)&&o!==n&&i(a=o.prototype)&&a!==n.prototype&&s(e,a),e}},3706:function(e,t,n){var r=n(9504),i=n(4901),s=n(7629),o=r(Function.toString);i(s.inspectSource)||(s.inspectSource=function(e){return o(e)}),e.exports=s.inspectSource},1181:function(e,t,n){var r,i,s,o=n(8622),a=n(4576),c=n(34),u=n(6699),l=n(9297),h=n(7629),d=n(6119),f=n(421),p="Object already initialized",g=a.TypeError,m=a.WeakMap,y=function(e){return s(e)?i(e):r(e,{})},v=function(e){return function(t){var n;if(!c(t)||(n=i(t)).type!==e)throw new g("Incompatible receiver, "+e+" required");return n}};if(o||h.state){var _=h.state||(h.state=new m);_.get=_.get,_.has=_.has,_.set=_.set,r=function(e,t){if(_.has(e))throw new g(p);return t.facade=e,_.set(e,t),t},i=function(e){return _.get(e)||{}},s=function(e){return _.has(e)}}else{var w=d("state");f[w]=!0,r=function(e,t){if(l(e,w))throw new g(p);return t.facade=e,u(e,w,t),t},i=function(e){return l(e,w)?e[w]:{}},s=function(e){return l(e,w)}}e.exports={set:r,get:i,has:s,enforce:y,getterFor:v}},4209:function(e,t,n){var r=n(8227),i=n(6269),s=r("iterator"),o=Array.prototype;e.exports=function(e){return void 0!==e&&(i.Array===e||o[s]===e)}},4376:function(e,t,n){var r=n(2195);e.exports=Array.isArray||function(e){return"Array"===r(e)}},4901:function(e){var t="object"==typeof document&&document.all;e.exports="undefined"==typeof t&&void 0!==t?function(e){return"function"==typeof e||e===t}:function(e){return"function"==typeof e}},2796:function(e,t,n){var r=n(9039),i=n(4901),s=/#|\.prototype\./,o=function(e,t){var n=c[a(e)];return n===l||n!==u&&(i(t)?r(t):!!t)},a=o.normalize=function(e){return String(e).replace(s,".").toLowerCase()},c=o.data={},u=o.NATIVE="N",l=o.POLYFILL="P";e.exports=o},4117:function(e){e.exports=function(e){return null===e||void 0===e}},34:function(e,t,n){var r=n(4901);e.exports=function(e){return"object"==typeof e?null!==e:r(e)}},3925:function(e,t,n){var r=n(34);e.exports=function(e){return r(e)||null===e}},6395:function(e){e.exports=!1},757:function(e,t,n){var r=n(7751),i=n(4901),s=n(1625),o=n(7040),a=Object;e.exports=o?function(e){return"symbol"==typeof e}:function(e){var t=r("Symbol");return i(t)&&s(t.prototype,a(e))}},507:function(e,t,n){var r=n(9565);e.exports=function(e,t,n){var i,s,o=n?e:e.iterator,a=e.next;while(!(i=r(a,o)).done)if(s=t(i.value),void 0!==s)return s}},2652:function(e,t,n){var r=n(6080),i=n(9565),s=n(8551),o=n(6823),a=n(4209),c=n(6198),u=n(1625),l=n(81),h=n(851),d=n(9539),f=TypeError,p=function(e,t){this.stopped=e,this.result=t},g=p.prototype;e.exports=function(e,t,n){var m,y,v,_,w,b,E,T=n&&n.that,I=!(!n||!n.AS_ENTRIES),S=!(!n||!n.IS_RECORD),C=!(!n||!n.IS_ITERATOR),A=!(!n||!n.INTERRUPTED),k=r(t,T),R=function(e){return m&&d(m,"normal",e),new p(!0,e)},O=function(e){return I?(s(e),A?k(e[0],e[1],R):k(e[0],e[1])):A?k(e,R):k(e)};if(S)m=e.iterator;else if(C)m=e;else{if(y=h(e),!y)throw new f(o(e)+" is not iterable");if(a(y)){for(v=0,_=c(e);_>v;v++)if(w=O(e[v]),w&&u(g,w))return w;return new p(!1)}m=l(e,y)}b=S?e.next:m.next;while(!(E=i(b,m)).done){try{w=O(E.value)}catch(N){d(m,"throw",N)}if("object"==typeof w&&w&&u(g,w))return w}return new p(!1)}},9539:function(e,t,n){var r=n(9565),i=n(8551),s=n(5966);e.exports=function(e,t,n){var o,a;i(e);try{if(o=s(e,"return"),!o){if("throw"===t)throw n;return n}o=r(o,e)}catch(c){a=!0,o=c}if("throw"===t)throw n;if(a)throw o;return i(o),n}},9462:function(e,t,n){var r=n(9565),i=n(2360),s=n(6699),o=n(6279),a=n(8227),c=n(1181),u=n(5966),l=n(7657).IteratorPrototype,h=n(2529),d=n(9539),f=a("toStringTag"),p="IteratorHelper",g="WrapForValidIterator",m=c.set,y=function(e){var t=c.getterFor(e?g:p);return o(i(l),{next:function(){var n=t(this);if(e)return n.nextHandler();if(n.done)return h(void 0,!0);try{var r=n.nextHandler();return n.returnHandlerResult?r:h(r,n.done)}catch(i){throw n.done=!0,i}},return:function(){var n=t(this),i=n.iterator;if(n.done=!0,e){var s=u(i,"return");return s?r(s,i):h(void 0,!0)}if(n.inner)try{d(n.inner.iterator,"normal")}catch(o){return d(i,"throw",o)}return i&&d(i,"normal"),h(void 0,!0)}})},v=y(!0),_=y(!1);s(_,f,"Iterator Helper"),e.exports=function(e,t,n){var r=function(r,i){i?(i.iterator=r.iterator,i.next=r.next):i=r,i.type=t?g:p,i.returnHandlerResult=!!n,i.nextHandler=e,i.counter=0,i.done=!1,m(this,i)};return r.prototype=t?v:_,r}},713:function(e,t,n){var r=n(9565),i=n(9306),s=n(8551),o=n(1767),a=n(9462),c=n(6319),u=a((function(){var e=this.iterator,t=s(r(this.next,e)),n=this.done=!!t.done;if(!n)return c(e,this.mapper,[t.value,this.counter++],!0)}));e.exports=function(e){return s(this),i(e),new u(o(this),{mapper:e})}},7657:function(e,t,n){var r,i,s,o=n(9039),a=n(4901),c=n(34),u=n(2360),l=n(2787),h=n(6840),d=n(8227),f=n(6395),p=d("iterator"),g=!1;[].keys&&(s=[].keys(),"next"in s?(i=l(l(s)),i!==Object.prototype&&(r=i)):g=!0);var m=!c(r)||o((function(){var e={};return r[p].call(e)!==e}));m?r={}:f&&(r=u(r)),a(r[p])||h(r,p,(function(){return this})),e.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:g}},6269:function(e){e.exports={}},6198:function(e,t,n){var r=n(8014);e.exports=function(e){return r(e.length)}},283:function(e,t,n){var r=n(9504),i=n(9039),s=n(4901),o=n(9297),a=n(3724),c=n(350).CONFIGURABLE,u=n(3706),l=n(1181),h=l.enforce,d=l.get,f=String,p=Object.defineProperty,g=r("".slice),m=r("".replace),y=r([].join),v=a&&!i((function(){return 8!==p((function(){}),"length",{value:8}).length})),_=String(String).split("String"),w=e.exports=function(e,t,n){"Symbol("===g(f(t),0,7)&&(t="["+m(f(t),/^Symbol\(([^)]*)\).*$/,"$1")+"]"),n&&n.getter&&(t="get "+t),n&&n.setter&&(t="set "+t),(!o(e,"name")||c&&e.name!==t)&&(a?p(e,"name",{value:t,configurable:!0}):e.name=t),v&&n&&o(n,"arity")&&e.length!==n.arity&&p(e,"length",{value:n.arity});try{n&&o(n,"constructor")&&n.constructor?a&&p(e,"prototype",{writable:!1}):e.prototype&&(e.prototype=void 0)}catch(i){}var r=h(e);return o(r,"source")||(r.source=y(_,"string"==typeof t?t:"")),e};Function.prototype.toString=w((function(){return s(this)&&d(this).source||u(this)}),"toString")},741:function(e){var t=Math.ceil,n=Math.floor;e.exports=Math.trunc||function(e){var r=+e;return(r>0?n:t)(r)}},2603:function(e,t,n){var r=n(655);e.exports=function(e,t){return void 0===e?arguments.length<2?"":t:r(e)}},2360:function(e,t,n){var r,i=n(8551),s=n(6801),o=n(8727),a=n(421),c=n(397),u=n(4055),l=n(6119),h=">",d="<",f="prototype",p="script",g=l("IE_PROTO"),m=function(){},y=function(e){return d+p+h+e+d+"/"+p+h},v=function(e){e.write(y("")),e.close();var t=e.parentWindow.Object;return e=null,t},_=function(){var e,t=u("iframe"),n="java"+p+":";return t.style.display="none",c.appendChild(t),t.src=String(n),e=t.contentWindow.document,e.open(),e.write(y("document.F=Object")),e.close(),e.F},w=function(){try{r=new ActiveXObject("htmlfile")}catch(t){}w="undefined"!=typeof document?document.domain&&r?v(r):_():v(r);var e=o.length;while(e--)delete w[f][o[e]];return w()};a[g]=!0,e.exports=Object.create||function(e,t){var n;return null!==e?(m[f]=i(e),n=new m,m[f]=null,n[g]=e):n=w(),void 0===t?n:s.f(n,t)}},6801:function(e,t,n){var r=n(3724),i=n(8686),s=n(4913),o=n(8551),a=n(5397),c=n(1072);t.f=r&&!i?Object.defineProperties:function(e,t){o(e);var n,r=a(t),i=c(t),u=i.length,l=0;while(u>l)s.f(e,n=i[l++],r[n]);return e}},4913:function(e,t,n){var r=n(3724),i=n(5917),s=n(8686),o=n(8551),a=n(6969),c=TypeError,u=Object.defineProperty,l=Object.getOwnPropertyDescriptor,h="enumerable",d="configurable",f="writable";t.f=r?s?function(e,t,n){if(o(e),t=a(t),o(n),"function"===typeof e&&"prototype"===t&&"value"in n&&f in n&&!n[f]){var r=l(e,t);r&&r[f]&&(e[t]=n.value,n={configurable:d in n?n[d]:r[d],enumerable:h in n?n[h]:r[h],writable:!1})}return u(e,t,n)}:u:function(e,t,n){if(o(e),t=a(t),o(n),i)try{return u(e,t,n)}catch(r){}if("get"in n||"set"in n)throw new c("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},7347:function(e,t,n){var r=n(3724),i=n(9565),s=n(8773),o=n(6980),a=n(5397),c=n(6969),u=n(9297),l=n(5917),h=Object.getOwnPropertyDescriptor;t.f=r?h:function(e,t){if(e=a(e),t=c(t),l)try{return h(e,t)}catch(n){}if(u(e,t))return o(!i(s.f,e,t),e[t])}},8480:function(e,t,n){var r=n(1828),i=n(8727),s=i.concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,s)}},3717:function(e,t){t.f=Object.getOwnPropertySymbols},2787:function(e,t,n){var r=n(9297),i=n(4901),s=n(8981),o=n(6119),a=n(2211),c=o("IE_PROTO"),u=Object,l=u.prototype;e.exports=a?u.getPrototypeOf:function(e){var t=s(e);if(r(t,c))return t[c];var n=t.constructor;return i(n)&&t instanceof n?n.prototype:t instanceof u?l:null}},1625:function(e,t,n){var r=n(9504);e.exports=r({}.isPrototypeOf)},1828:function(e,t,n){var r=n(9504),i=n(9297),s=n(5397),o=n(9617).indexOf,a=n(421),c=r([].push);e.exports=function(e,t){var n,r=s(e),u=0,l=[];for(n in r)!i(a,n)&&i(r,n)&&c(l,n);while(t.length>u)i(r,n=t[u++])&&(~o(l,n)||c(l,n));return l}},1072:function(e,t,n){var r=n(1828),i=n(8727);e.exports=Object.keys||function(e){return r(e,i)}},8773:function(e,t){var n={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,i=r&&!n.call({1:2},1);t.f=i?function(e){var t=r(this,e);return!!t&&t.enumerable}:n},2967:function(e,t,n){var r=n(6706),i=n(34),s=n(7750),o=n(3506);e.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{e=r(Object.prototype,"__proto__","set"),e(n,[]),t=n instanceof Array}catch(a){}return function(n,r){return s(n),o(r),i(n)?(t?e(n,r):n.__proto__=r,n):n}}():void 0)},4270:function(e,t,n){var r=n(9565),i=n(4901),s=n(34),o=TypeError;e.exports=function(e,t){var n,a;if("string"===t&&i(n=e.toString)&&!s(a=r(n,e)))return a;if(i(n=e.valueOf)&&!s(a=r(n,e)))return a;if("string"!==t&&i(n=e.toString)&&!s(a=r(n,e)))return a;throw new o("Can't convert object to primitive value")}},5031:function(e,t,n){var r=n(7751),i=n(9504),s=n(8480),o=n(3717),a=n(8551),c=i([].concat);e.exports=r("Reflect","ownKeys")||function(e){var t=s.f(a(e)),n=o.f;return n?c(t,n(e)):t}},7750:function(e,t,n){var r=n(4117),i=TypeError;e.exports=function(e){if(r(e))throw new i("Can't call method on "+e);return e}},9286:function(e,t,n){var r=n(4402),i=n(8469),s=r.Set,o=r.add;e.exports=function(e){var t=new s;return i(e,(function(e){o(t,e)})),t}},3440:function(e,t,n){var r=n(7080),i=n(4402),s=n(9286),o=n(5170),a=n(3789),c=n(8469),u=n(507),l=i.has,h=i.remove;e.exports=function(e){var t=r(this),n=a(e),i=s(t);return o(t)<=n.size?c(t,(function(e){n.includes(e)&&h(i,e)})):u(n.getIterator(),(function(e){l(t,e)&&h(i,e)})),i}},4402:function(e,t,n){var r=n(9504),i=Set.prototype;e.exports={Set:Set,add:r(i.add),has:r(i.has),remove:r(i["delete"]),proto:i}},8750:function(e,t,n){var r=n(7080),i=n(4402),s=n(5170),o=n(3789),a=n(8469),c=n(507),u=i.Set,l=i.add,h=i.has;e.exports=function(e){var t=r(this),n=o(e),i=new u;return s(t)>n.size?c(n.getIterator(),(function(e){h(t,e)&&l(i,e)})):a(t,(function(e){n.includes(e)&&l(i,e)})),i}},4449:function(e,t,n){var r=n(7080),i=n(4402).has,s=n(5170),o=n(3789),a=n(8469),c=n(507),u=n(9539);e.exports=function(e){var t=r(this),n=o(e);if(s(t)<=n.size)return!1!==a(t,(function(e){if(n.includes(e))return!1}),!0);var l=n.getIterator();return!1!==c(l,(function(e){if(i(t,e))return u(l,"normal",!1)}))}},3838:function(e,t,n){var r=n(7080),i=n(5170),s=n(8469),o=n(3789);e.exports=function(e){var t=r(this),n=o(e);return!(i(t)>n.size)&&!1!==s(t,(function(e){if(!n.includes(e))return!1}),!0)}},8527:function(e,t,n){var r=n(7080),i=n(4402).has,s=n(5170),o=n(3789),a=n(507),c=n(9539);e.exports=function(e){var t=r(this),n=o(e);if(s(t)<n.size)return!1;var u=n.getIterator();return!1!==a(u,(function(e){if(!i(t,e))return c(u,"normal",!1)}))}},8469:function(e,t,n){var r=n(9504),i=n(507),s=n(4402),o=s.Set,a=s.proto,c=r(a.forEach),u=r(a.keys),l=u(new o).next;e.exports=function(e,t,n){return n?i({iterator:u(e),next:l},t):c(e,t)}},4916:function(e,t,n){var r=n(7751),i=function(e){return{size:e,has:function(){return!1},keys:function(){return{next:function(){return{done:!0}}}}}},s=function(e){return{size:e,has:function(){return!0},keys:function(){throw new Error("e")}}};e.exports=function(e,t){var n=r("Set");try{(new n)[e](i(0));try{return(new n)[e](i(-1)),!1}catch(a){if(!t)return!0;try{return(new n)[e](s(-1/0)),!1}catch(c){var o=new n;return o.add(1),o.add(2),t(o[e](s(1/0)))}}}catch(c){return!1}}},5170:function(e,t,n){var r=n(6706),i=n(4402);e.exports=r(i.proto,"size","get")||function(e){return e.size}},3650:function(e,t,n){var r=n(7080),i=n(4402),s=n(9286),o=n(3789),a=n(507),c=i.add,u=i.has,l=i.remove;e.exports=function(e){var t=r(this),n=o(e).getIterator(),i=s(t);return a(n,(function(e){u(t,e)?l(i,e):c(i,e)})),i}},4204:function(e,t,n){var r=n(7080),i=n(4402).add,s=n(9286),o=n(3789),a=n(507);e.exports=function(e){var t=r(this),n=o(e).getIterator(),c=s(t);return a(n,(function(e){i(c,e)})),c}},6119:function(e,t,n){var r=n(5745),i=n(3392),s=r("keys");e.exports=function(e){return s[e]||(s[e]=i(e))}},7629:function(e,t,n){var r=n(6395),i=n(4576),s=n(9433),o="__core-js_shared__",a=e.exports=i[o]||s(o,{});(a.versions||(a.versions=[])).push({version:"3.40.0",mode:r?"pure":"global",copyright:"© 2014-2025 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.40.0/LICENSE",source:"https://github.com/zloirock/core-js"})},5745:function(e,t,n){var r=n(7629);e.exports=function(e,t){return r[e]||(r[e]=t||{})}},1548:function(e,t,n){var r=n(4576),i=n(9039),s=n(9519),o=n(4215),a=r.structuredClone;e.exports=!!a&&!i((function(){if("DENO"===o&&s>92||"NODE"===o&&s>94||"BROWSER"===o&&s>97)return!1;var e=new ArrayBuffer(8),t=a(e,{transfer:[e]});return 0!==e.byteLength||8!==t.byteLength}))},4495:function(e,t,n){var r=n(9519),i=n(9039),s=n(4576),o=s.String;e.exports=!!Object.getOwnPropertySymbols&&!i((function(){var e=Symbol("symbol detection");return!o(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&r&&r<41}))},5610:function(e,t,n){var r=n(1291),i=Math.max,s=Math.min;e.exports=function(e,t){var n=r(e);return n<0?i(n+t,0):s(n,t)}},7696:function(e,t,n){var r=n(1291),i=n(8014),s=RangeError;e.exports=function(e){if(void 0===e)return 0;var t=r(e),n=i(t);if(t!==n)throw new s("Wrong length or index");return n}},5397:function(e,t,n){var r=n(7055),i=n(7750);e.exports=function(e){return r(i(e))}},1291:function(e,t,n){var r=n(741);e.exports=function(e){var t=+e;return t!==t||0===t?0:r(t)}},8014:function(e,t,n){var r=n(1291),i=Math.min;e.exports=function(e){var t=r(e);return t>0?i(t,9007199254740991):0}},8981:function(e,t,n){var r=n(7750),i=Object;e.exports=function(e){return i(r(e))}},2777:function(e,t,n){var r=n(9565),i=n(34),s=n(757),o=n(5966),a=n(4270),c=n(8227),u=TypeError,l=c("toPrimitive");e.exports=function(e,t){if(!i(e)||s(e))return e;var n,c=o(e,l);if(c){if(void 0===t&&(t="default"),n=r(c,e,t),!i(n)||s(n))return n;throw new u("Can't convert object to primitive value")}return void 0===t&&(t="number"),a(e,t)}},6969:function(e,t,n){var r=n(2777),i=n(757);e.exports=function(e){var t=r(e,"string");return i(t)?t:t+""}},2140:function(e,t,n){var r=n(8227),i=r("toStringTag"),s={};s[i]="z",e.exports="[object z]"===String(s)},655:function(e,t,n){var r=n(6955),i=String;e.exports=function(e){if("Symbol"===r(e))throw new TypeError("Cannot convert a Symbol value to a string");return i(e)}},6823:function(e){var t=String;e.exports=function(e){try{return t(e)}catch(n){return"Object"}}},3392:function(e,t,n){var r=n(9504),i=0,s=Math.random(),o=r(1..toString);e.exports=function(e){return"Symbol("+(void 0===e?"":e)+")_"+o(++i+s,36)}},7040:function(e,t,n){var r=n(4495);e.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},8686:function(e,t,n){var r=n(3724),i=n(9039);e.exports=r&&i((function(){return 42!==Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},2812:function(e){var t=TypeError;e.exports=function(e,n){if(e<n)throw new t("Not enough arguments");return e}},8622:function(e,t,n){var r=n(4576),i=n(4901),s=r.WeakMap;e.exports=i(s)&&/native code/.test(String(s))},8227:function(e,t,n){var r=n(4576),i=n(5745),s=n(9297),o=n(3392),a=n(4495),c=n(7040),u=r.Symbol,l=i("wks"),h=c?u["for"]||u:u&&u.withoutSetter||o;e.exports=function(e){return s(l,e)||(l[e]=a&&s(u,e)?u[e]:h("Symbol."+e)),l[e]}},6573:function(e,t,n){var r=n(3724),i=n(2106),s=n(3238),o=ArrayBuffer.prototype;r&&!("detached"in o)&&i(o,"detached",{configurable:!0,get:function(){return s(this)}})},7936:function(e,t,n){var r=n(6518),i=n(5636);i&&r({target:"ArrayBuffer",proto:!0},{transferToFixedLength:function(){return i(this,arguments.length?arguments[0]:void 0,!1)}})},8100:function(e,t,n){var r=n(6518),i=n(5636);i&&r({target:"ArrayBuffer",proto:!0},{transfer:function(){return i(this,arguments.length?arguments[0]:void 0,!0)}})},4114:function(e,t,n){var r=n(6518),i=n(8981),s=n(6198),o=n(4527),a=n(6837),c=n(9039),u=c((function(){return 4294967297!==[].push.call({length:4294967296},1)})),l=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}},h=u||!l();r({target:"Array",proto:!0,arity:1,forced:h},{push:function(e){var t=i(this),n=s(t),r=arguments.length;a(n+r);for(var c=0;c<r;c++)t[n]=arguments[c],n++;return o(t,n),n}})},8111:function(e,t,n){var r=n(6518),i=n(4576),s=n(679),o=n(8551),a=n(4901),c=n(2787),u=n(2106),l=n(4659),h=n(9039),d=n(9297),f=n(8227),p=n(7657).IteratorPrototype,g=n(3724),m=n(6395),y="constructor",v="Iterator",_=f("toStringTag"),w=TypeError,b=i[v],E=m||!a(b)||b.prototype!==p||!h((function(){b({})})),T=function(){if(s(this,p),c(this)===p)throw new w("Abstract class Iterator not directly constructable")},I=function(e,t){g?u(p,e,{configurable:!0,get:function(){return t},set:function(t){if(o(this),this===p)throw new w("You can't redefine this property");d(this,e)?this[e]=t:l(this,e,t)}}):p[e]=t};d(p,_)||I(_,v),!E&&d(p,y)&&p[y]!==Object||I(y,T),T.prototype=p,r({global:!0,constructor:!0,forced:E},{Iterator:T})},1148:function(e,t,n){var r=n(6518),i=n(2652),s=n(9306),o=n(8551),a=n(1767);r({target:"Iterator",proto:!0,real:!0},{every:function(e){o(this),s(e);var t=a(this),n=0;return!i(t,(function(t,r){if(!e(t,n++))return r()}),{IS_RECORD:!0,INTERRUPTED:!0}).stopped}})},2489:function(e,t,n){var r=n(6518),i=n(9565),s=n(9306),o=n(8551),a=n(1767),c=n(9462),u=n(6319),l=n(6395),h=c((function(){var e,t,n,r=this.iterator,s=this.predicate,a=this.next;while(1){if(e=o(i(a,r)),t=this.done=!!e.done,t)return;if(n=e.value,u(r,s,[n,this.counter++],!0))return n}}));r({target:"Iterator",proto:!0,real:!0,forced:l},{filter:function(e){return o(this),s(e),new h(a(this),{predicate:e})}})},116:function(e,t,n){var r=n(6518),i=n(2652),s=n(9306),o=n(8551),a=n(1767);r({target:"Iterator",proto:!0,real:!0},{find:function(e){o(this),s(e);var t=a(this),n=0;return i(t,(function(t,r){if(e(t,n++))return r(t)}),{IS_RECORD:!0,INTERRUPTED:!0}).result}})},7588:function(e,t,n){var r=n(6518),i=n(2652),s=n(9306),o=n(8551),a=n(1767);r({target:"Iterator",proto:!0,real:!0},{forEach:function(e){o(this),s(e);var t=a(this),n=0;i(t,(function(t){e(t,n++)}),{IS_RECORD:!0})}})},1701:function(e,t,n){var r=n(6518),i=n(713),s=n(6395);r({target:"Iterator",proto:!0,real:!0,forced:s},{map:i})},8237:function(e,t,n){var r=n(6518),i=n(2652),s=n(9306),o=n(8551),a=n(1767),c=TypeError;r({target:"Iterator",proto:!0,real:!0},{reduce:function(e){o(this),s(e);var t=a(this),n=arguments.length<2,r=n?void 0:arguments[1],u=0;if(i(t,(function(t){n?(n=!1,r=t):r=e(r,t,u),u++}),{IS_RECORD:!0}),n)throw new c("Reduce of empty iterator with no initial value");return r}})},3579:function(e,t,n){var r=n(6518),i=n(2652),s=n(9306),o=n(8551),a=n(1767);r({target:"Iterator",proto:!0,real:!0},{some:function(e){o(this),s(e);var t=a(this),n=0;return i(t,(function(t,r){if(e(t,n++))return r()}),{IS_RECORD:!0,INTERRUPTED:!0}).stopped}})},1806:function(e,t,n){var r=n(6518),i=n(8551),s=n(2652),o=n(1767),a=[].push;r({target:"Iterator",proto:!0,real:!0},{toArray:function(){var e=[];return s(o(i(this)),a,{that:e,IS_RECORD:!0}),e}})},7642:function(e,t,n){var r=n(6518),i=n(3440),s=n(4916),o=!s("difference",(function(e){return 0===e.size}));r({target:"Set",proto:!0,real:!0,forced:o},{difference:i})},8004:function(e,t,n){var r=n(6518),i=n(9039),s=n(8750),o=n(4916),a=!o("intersection",(function(e){return 2===e.size&&e.has(1)&&e.has(2)}))||i((function(){return"3,2"!==String(Array.from(new Set([1,2,3]).intersection(new Set([3,2]))))}));r({target:"Set",proto:!0,real:!0,forced:a},{intersection:s})},3853:function(e,t,n){var r=n(6518),i=n(4449),s=n(4916),o=!s("isDisjointFrom",(function(e){return!e}));r({target:"Set",proto:!0,real:!0,forced:o},{isDisjointFrom:i})},5876:function(e,t,n){var r=n(6518),i=n(3838),s=n(4916),o=!s("isSubsetOf",(function(e){return e}));r({target:"Set",proto:!0,real:!0,forced:o},{isSubsetOf:i})},2475:function(e,t,n){var r=n(6518),i=n(8527),s=n(4916),o=!s("isSupersetOf",(function(e){return!e}));r({target:"Set",proto:!0,real:!0,forced:o},{isSupersetOf:i})},5024:function(e,t,n){var r=n(6518),i=n(3650),s=n(4916);r({target:"Set",proto:!0,real:!0,forced:!s("symmetricDifference")},{symmetricDifference:i})},1698:function(e,t,n){var r=n(6518),i=n(4204),s=n(4916);r({target:"Set",proto:!0,real:!0,forced:!s("union")},{union:i})},8992:function(e,t,n){n(8111)},3215:function(e,t,n){n(1148)},4520:function(e,t,n){n(2489)},2577:function(e,t,n){n(116)},3949:function(e,t,n){n(7588)},1454:function(e,t,n){n(1701)},8872:function(e,t,n){n(8237)},7550:function(e,t,n){n(3579)},1795:function(e,t,n){n(1806)},4979:function(e,t,n){var r=n(6518),i=n(4576),s=n(7751),o=n(6980),a=n(4913).f,c=n(9297),u=n(679),l=n(3167),h=n(2603),d=n(5002),f=n(8574),p=n(3724),g=n(6395),m="DOMException",y=s("Error"),v=s(m),_=function(){u(this,w);var e=arguments.length,t=h(e<1?void 0:arguments[0]),n=h(e<2?void 0:arguments[1],"Error"),r=new v(t,n),i=new y(t);return i.name=m,a(r,"stack",o(1,f(i.stack,1))),l(r,this,_),r},w=_.prototype=v.prototype,b="stack"in new y(m),E="stack"in new v(1,2),T=v&&p&&Object.getOwnPropertyDescriptor(i,m),I=!!T&&!(T.writable&&T.configurable),S=b&&!I&&!E;r({global:!0,constructor:!0,forced:g||S},{DOMException:S?_:v});var C=s(m),A=C.prototype;if(A.constructor!==C)for(var k in g||a(A,"constructor",o(1,C)),d)if(c(d,k)){var R=d[k],O=R.s;c(C,O)||a(C,O,o(6,R.c))}},4603:function(e,t,n){var r=n(6840),i=n(9504),s=n(655),o=n(2812),a=URLSearchParams,c=a.prototype,u=i(c.append),l=i(c["delete"]),h=i(c.forEach),d=i([].push),f=new a("a=1&a=2&b=3");f["delete"]("a",1),f["delete"]("b",void 0),f+""!=="a=2"&&r(c,"delete",(function(e){var t=arguments.length,n=t<2?void 0:arguments[1];if(t&&void 0===n)return l(this,e);var r=[];h(this,(function(e,t){d(r,{key:t,value:e})})),o(t,1);var i,a=s(e),c=s(n),f=0,p=0,g=!1,m=r.length;while(f<m)i=r[f++],g||i.key===a?(g=!0,l(this,i.key)):p++;while(p<m)i=r[p++],i.key===a&&i.value===c||u(this,i.key,i.value)}),{enumerable:!0,unsafe:!0})},7566:function(e,t,n){var r=n(6840),i=n(9504),s=n(655),o=n(2812),a=URLSearchParams,c=a.prototype,u=i(c.getAll),l=i(c.has),h=new a("a=1");!h.has("a",2)&&h.has("a",void 0)||r(c,"has",(function(e){var t=arguments.length,n=t<2?void 0:arguments[1];if(t&&void 0===n)return l(this,e);var r=u(this,e);o(t,1);var i=s(n),a=0;while(a<r.length)if(r[a++]===i)return!0;return!1}),{enumerable:!0,unsafe:!0})},8721:function(e,t,n){var r=n(3724),i=n(9504),s=n(2106),o=URLSearchParams.prototype,a=i(o.forEach);r&&!("size"in o)&&s(o,"size",{get:function(){var e=0;return a(this,(function(){e++})),e},configurable:!0,enumerable:!0})},262:function(e,t,n){n.d(t,{MF:function(){return _e},j6:function(){return pe},xZ:function(){return ge},om:function(){return fe},Sx:function(){return be},Wp:function(){return we},KO:function(){return Ee}});n(4114),n(8992),n(4520),n(1454),n(8872),n(7550);var r=n(798),i=n(6189),s=n(2455);n(4979);const o=(e,t)=>t.some((t=>e instanceof t));let a,c;function u(){return a||(a=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function l(){return c||(c=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const h=new WeakMap,d=new WeakMap,f=new WeakMap,p=new WeakMap,g=new WeakMap;function m(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{t(E(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",s)}));return t.then((t=>{t instanceof IDBCursor&&h.set(t,e)})).catch((()=>{})),g.set(t,e),t}function y(e){if(d.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)}));d.set(e,t)}let v={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return d.get(e);if("objectStoreNames"===t)return e.objectStoreNames||f.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return E(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e}};function _(e){v=e(v)}function w(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?l().includes(e)?function(...t){return e.apply(T(this),t),E(h.get(this))}:function(...t){return E(e.apply(T(this),t))}:function(t,...n){const r=e.call(T(this),t,...n);return f.set(r,t.sort?t.sort():[t]),E(r)}}function b(e){return"function"===typeof e?w(e):(e instanceof IDBTransaction&&y(e),o(e,u())?new Proxy(e,v):e)}function E(e){if(e instanceof IDBRequest)return m(e);if(p.has(e))return p.get(e);const t=b(e);return t!==e&&(p.set(e,t),g.set(t,e)),t}const T=e=>g.get(e);function I(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(e,t),a=E(o);return r&&o.addEventListener("upgradeneeded",(e=>{r(E(o.result),e.oldVersion,e.newVersion,E(o.transaction),e)})),n&&o.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),a.then((e=>{s&&e.addEventListener("close",(()=>s())),i&&e.addEventListener("versionchange",(e=>i(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),a}const S=["get","getKey","getAll","getAllKeys","count"],C=["put","add","delete","clear"],A=new Map;function k(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!==typeof t)return;if(A.get(t))return A.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=C.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!S.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,i?"readwrite":"readonly");let o=s.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&s.done]))[0]};return A.set(t,s),s}_((e=>({...e,get:(t,n,r)=>k(t,n)||e.get(t,n,r),has:(t,n)=>!!k(t,n)||e.has(t,n)})));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class R{constructor(e){this.container=e}getPlatformInfoString(){const e=this.container.getProviders();return e.map((e=>{if(O(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}function O(e){const t=e.getComponent();return"VERSION"===t?.type}const N="@firebase/app",D="0.14.13",x=new i.Vy("@firebase/app"),P="@firebase/app-compat",L="@firebase/analytics-compat",M="@firebase/analytics",U="@firebase/app-check-compat",V="@firebase/app-check",F="@firebase/auth",j="@firebase/auth-compat",B="@firebase/database",$="@firebase/data-connect",q="@firebase/database-compat",z="@firebase/functions",H="@firebase/functions-compat",K="@firebase/installations",G="@firebase/installations-compat",W="@firebase/messaging",Q="@firebase/messaging-compat",X="@firebase/performance",J="@firebase/performance-compat",Y="@firebase/remote-config",Z="@firebase/remote-config-compat",ee="@firebase/storage",te="@firebase/storage-compat",ne="@firebase/firestore",re="@firebase/ai",ie="@firebase/firestore-compat",se="firebase",oe="12.14.0",ae="[DEFAULT]",ce={[N]:"fire-core",[P]:"fire-core-compat",[M]:"fire-analytics",[L]:"fire-analytics-compat",[V]:"fire-app-check",[U]:"fire-app-check-compat",[F]:"fire-auth",[j]:"fire-auth-compat",[B]:"fire-rtdb",[$]:"fire-data-connect",[q]:"fire-rtdb-compat",[z]:"fire-fn",[H]:"fire-fn-compat",[K]:"fire-iid",[G]:"fire-iid-compat",[W]:"fire-fcm",[Q]:"fire-fcm-compat",[X]:"fire-perf",[J]:"fire-perf-compat",[Y]:"fire-rc",[Z]:"fire-rc-compat",[ee]:"fire-gcs",[te]:"fire-gcs-compat",[ne]:"fire-fst",[ie]:"fire-fst-compat",[re]:"fire-vertex","fire-js":"fire-js",[se]:"fire-js-all"},ue=new Map,le=new Map,he=new Map;function de(e,t){try{e.container.addComponent(t)}catch(n){x.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function fe(e){const t=e.name;if(he.has(t))return x.debug(`There were multiple attempts to register component ${t}.`),!1;he.set(t,e);for(const n of ue.values())de(n,e);for(const n of le.values())de(n,e);return!0}function pe(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function ge(e){return null!==e&&void 0!==e&&void 0!==e.settings}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const me={["no-app"]:"No Firebase App '{$appName}' has been created - call initializeApp() first",["bad-app-name"]:"Illegal App name: '{$appName}'",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["server-app-deleted"]:"Firebase Server App has been deleted",["no-options"]:"Need to provide options, when not being deployed to hosting via source.",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["idb-open"]:"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",["idb-get"]:"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",["idb-set"]:"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",["idb-delete"]:"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",["finalization-registry-not-supported"]:"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",["invalid-server-app-environment"]:"FirebaseServerApp is not for use in browser environments."},ye=new s.FA("app","Firebase",me);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ve{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new r.uA("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ye.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _e=oe;function we(e,t={}){let n=e;if("object"!==typeof t){const e=t;t={name:e}}const i={name:ae,automaticDataCollectionEnabled:!0,...t},o=i.name;if("string"!==typeof o||!o)throw ye.create("bad-app-name",{appName:String(o)});if(n||(n=(0,s.T9)()),!n)throw ye.create("no-options");const a=ue.get(o);if(a){if((0,s.bD)(n,a.options)&&(0,s.bD)(i,a.config))return a;throw ye.create("duplicate-app",{appName:o})}const c=new r.h1(o);for(const r of he.values())c.addComponent(r);const u=new ve(n,i,c);return ue.set(o,u),u}function be(e=ae){const t=ue.get(e);if(!t&&e===ae&&(0,s.T9)())return we();if(!t)throw ye.create("no-app",{appName:e});return t}function Ee(e,t,n){let i=ce[e]??e;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const e=[`Unable to register library "${i}" with version "${t}":`];return s&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void x.warn(e.join(" "))}fe(new r.uA(`${i}-version`,(()=>({library:i,version:t})),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Te="firebase-heartbeat-database",Ie=1,Se="firebase-heartbeat-store";let Ce=null;function Ae(){return Ce||(Ce=I(Te,Ie,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(Se)}catch(n){console.warn(n)}}}}).catch((e=>{throw ye.create("idb-open",{originalErrorMessage:e.message})}))),Ce}async function ke(e){try{const t=await Ae(),n=t.transaction(Se),r=await n.objectStore(Se).get(Oe(e));return await n.done,r}catch(t){if(t instanceof s.g)x.warn(t.message);else{const e=ye.create("idb-get",{originalErrorMessage:t?.message});x.warn(e.message)}}}async function Re(e,t){try{const n=await Ae(),r=n.transaction(Se,"readwrite"),i=r.objectStore(Se);await i.put(t,Oe(e)),await r.done}catch(n){if(n instanceof s.g)x.warn(n.message);else{const e=ye.create("idb-set",{originalErrorMessage:n?.message});x.warn(e.message)}}}function Oe(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ne=1024,De=30;class xe{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Me(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}async triggerHeartbeat(){try{const e=this.container.getProvider("platform-logger").getImmediate(),t=e.getPlatformInfoString(),n=Pe();if(null==this._heartbeatsCache?.heartbeats&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats))return;if(this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some((e=>e.date===n)))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats.length>De){const e=Ve(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){x.warn(e)}}async getHeartbeatsHeader(){try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==this._heartbeatsCache?.heartbeats||0===this._heartbeatsCache.heartbeats.length)return"";const e=Pe(),{heartbeatsToSend:t,unsentEntries:n}=Le(this._heartbeatsCache.heartbeats),r=(0,s.Uj)(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return x.warn(e),""}}}function Pe(){const e=new Date;return e.toISOString().substring(0,10)}function Le(e,t=Ne){const n=[];let r=e.slice();for(const i of e){const e=n.find((e=>e.agent===i.agent));if(e){if(e.dates.push(i.date),Ue(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ue(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Me{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!(0,s.zW)()&&(0,s.eX)().then((()=>!0)).catch((()=>!1))}async read(){const e=await this._canUseIndexedDBPromise;if(e){const e=await ke(this.app);return e?.heartbeats?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){const t=await this._canUseIndexedDBPromise;if(t){const t=await this.read();return Re(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){const t=await this._canUseIndexedDBPromise;if(t){const t=await this.read();return Re(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function Ue(e){return(0,s.Uj)(JSON.stringify({version:2,heartbeats:e})).length}function Ve(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(e){fe(new r.uA("platform-logger",(e=>new R(e)),"PRIVATE")),fe(new r.uA("heartbeat",(e=>new xe(e)),"PRIVATE")),Ee(N,D,e),Ee(N,D,"esm2020"),Ee("fire-js","")}Fe("")},798:function(e,t,n){n.d(t,{h1:function(){return u},uA:function(){return i}});n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(8992),n(4520),n(1454);var r=n(2455);class i{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new r.cY;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(n)return null;throw r}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(c(e))try{this.getOrInitializeService({instanceIdentifier:s})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(e=s){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e=s){return this.instances.has(e)}getOptions(e=s){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,s]of this.instancesDeferred.entries()){const e=this.normalizeInstanceIdentifier(i);n===e&&s.resolve(r)}return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const i=this.instances.get(n);return i&&e(i,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:a(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=s){return this.component?this.component.multipleInstances?e:s:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}function a(e){return e===s?void 0:e}function c(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){const t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new o(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}},6189:function(e,t,n){n.d(t,{$b:function(){return i},Vy:function(){return u}});n(4114),n(8992),n(4520),n(1454);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const r=[];var i;(function(e){e[e["DEBUG"]=0]="DEBUG",e[e["VERBOSE"]=1]="VERBOSE",e[e["INFO"]=2]="INFO",e[e["WARN"]=3]="WARN",e[e["ERROR"]=4]="ERROR",e[e["SILENT"]=5]="SILENT"})(i||(i={}));const s={debug:i.DEBUG,verbose:i.VERBOSE,info:i.INFO,warn:i.WARN,error:i.ERROR,silent:i.SILENT},o=i.INFO,a={[i.DEBUG]:"log",[i.VERBOSE]:"log",[i.INFO]:"info",[i.WARN]:"warn",[i.ERROR]:"error"},c=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=a[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class u{constructor(e){this.name=e,this._logLevel=o,this._logHandler=c,this._userLogHandler=null,r.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in i))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"===typeof e?s[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!==typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,i.DEBUG,...e),this._logHandler(this,i.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,i.VERBOSE,...e),this._logHandler(this,i.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,i.INFO,...e),this._logHandler(this,i.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,i.WARN,...e),this._logHandler(this,i.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,i.ERROR,...e),this._logHandler(this,i.ERROR,...e)}}},6400:function(e,t,n){n.d(t,{Wp:function(){return r.Wp}});var r=n(262),i="firebase",s="12.14.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(0,r.KO)(i,s,"app")},1057:function(e,t,n){n.d(t,{eJ:function(){return Bt},Wm:function(){return zt},xI:function(){return oi},hg:function(){return Gt},J1:function(){return jt},x9:function(){return $t},CI:function(){return Wt}});n(4114),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(8992),n(4520),n(2577),n(3949),n(1454),n(8872),n(7550),n(4603),n(7566),n(8721);var r=n(262),i=n(2455),s=n(6189),o=n(798);function a(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const c=a,u=new i.FA("auth","Firebase",a()),l=new s.Vy("@firebase/auth");function h(e,...t){l.logLevel<=s.$b.WARN&&l.warn(`Auth (${r.MF}): ${e}`,...t)}function d(e,...t){l.logLevel<=s.$b.ERROR&&l.error(`Auth (${r.MF}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f(e,...t){throw y(e,...t)}function p(e,...t){return y(e,...t)}function g(e,t,n){const r={...c(),[t]:n},s=new i.FA("auth","Firebase",r);return s.create(t,{appName:e.name})}function m(e){return g(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function y(e,...t){if("string"!==typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return u.create(e,...t)}function v(e,t,...n){if(!e)throw y(t,...n)}function _(e){const t="INTERNAL ASSERTION FAILED: "+e;throw d(t),new Error(t)}function w(e,t){e||_(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(){return"undefined"!==typeof self&&self.location?.href||""}function E(){return"http:"===T()||"https:"===T()}function T(){return"undefined"!==typeof self&&self.location?.protocol||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I(){return!("undefined"!==typeof navigator&&navigator&&"onLine"in navigator&&"boolean"===typeof navigator.onLine&&(E()||(0,i.sr)()||"connection"in navigator))||navigator.onLine}function S(){if("undefined"===typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e,t){this.shortDelay=e,this.longDelay=t,w(t>e,"Short delay should be less than long delay!"),this.isMobile=(0,i.jZ)()||(0,i.lV)()}get(){return I()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A(e,t){w(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!==typeof self&&"fetch"in self?self.fetch:"undefined"!==typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!==typeof fetch?fetch:void _("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!==typeof self&&"Headers"in self?self.Headers:"undefined"!==typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!==typeof Headers?Headers:void _("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!==typeof self&&"Response"in self?self.Response:"undefined"!==typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!==typeof Response?Response:void _("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R={["CREDENTIAL_MISMATCH"]:"custom-token-mismatch",["MISSING_CUSTOM_TOKEN"]:"internal-error",["INVALID_IDENTIFIER"]:"invalid-email",["MISSING_CONTINUE_URI"]:"internal-error",["INVALID_PASSWORD"]:"wrong-password",["MISSING_PASSWORD"]:"missing-password",["INVALID_LOGIN_CREDENTIALS"]:"invalid-credential",["EMAIL_EXISTS"]:"email-already-in-use",["PASSWORD_LOGIN_DISABLED"]:"operation-not-allowed",["INVALID_IDP_RESPONSE"]:"invalid-credential",["INVALID_PENDING_TOKEN"]:"invalid-credential",["FEDERATED_USER_ID_ALREADY_LINKED"]:"credential-already-in-use",["MISSING_REQ_TYPE"]:"internal-error",["EMAIL_NOT_FOUND"]:"user-not-found",["RESET_PASSWORD_EXCEED_LIMIT"]:"too-many-requests",["EXPIRED_OOB_CODE"]:"expired-action-code",["INVALID_OOB_CODE"]:"invalid-action-code",["MISSING_OOB_CODE"]:"internal-error",["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]:"requires-recent-login",["INVALID_ID_TOKEN"]:"invalid-user-token",["TOKEN_EXPIRED"]:"user-token-expired",["USER_NOT_FOUND"]:"user-token-expired",["TOO_MANY_ATTEMPTS_TRY_LATER"]:"too-many-requests",["PASSWORD_DOES_NOT_MEET_REQUIREMENTS"]:"password-does-not-meet-requirements",["INVALID_CODE"]:"invalid-verification-code",["INVALID_SESSION_INFO"]:"invalid-verification-id",["INVALID_TEMPORARY_PROOF"]:"invalid-credential",["MISSING_SESSION_INFO"]:"missing-verification-id",["SESSION_EXPIRED"]:"code-expired",["MISSING_ANDROID_PACKAGE_NAME"]:"missing-android-pkg-name",["UNAUTHORIZED_DOMAIN"]:"unauthorized-continue-uri",["INVALID_OAUTH_CLIENT_ID"]:"invalid-oauth-client-id",["ADMIN_ONLY_OPERATION"]:"admin-restricted-operation",["INVALID_MFA_PENDING_CREDENTIAL"]:"invalid-multi-factor-session",["MFA_ENROLLMENT_NOT_FOUND"]:"multi-factor-info-not-found",["MISSING_MFA_ENROLLMENT_ID"]:"missing-multi-factor-info",["MISSING_MFA_PENDING_CREDENTIAL"]:"missing-multi-factor-session",["SECOND_FACTOR_EXISTS"]:"second-factor-already-in-use",["SECOND_FACTOR_LIMIT_EXCEEDED"]:"maximum-second-factor-count-exceeded",["BLOCKING_FUNCTION_ERROR_RESPONSE"]:"internal-error",["RECAPTCHA_NOT_ENABLED"]:"recaptcha-not-enabled",["MISSING_RECAPTCHA_TOKEN"]:"missing-recaptcha-token",["INVALID_RECAPTCHA_TOKEN"]:"invalid-recaptcha-token",["INVALID_RECAPTCHA_ACTION"]:"invalid-recaptcha-action",["MISSING_CLIENT_TYPE"]:"missing-client-type",["MISSING_RECAPTCHA_VERSION"]:"missing-recaptcha-version",["INVALID_RECAPTCHA_VERSION"]:"invalid-recaptcha-version",["INVALID_REQ_TYPE"]:"invalid-req-type"},O=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],N=new C(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function x(e,t,n,r,s={}){return P(e,s,(async()=>{let s={},o={};r&&("GET"===t?o=r:s={body:JSON.stringify(r)});const a=(0,i.Am)({key:e.config.apiKey,...o}).slice(1),c=await e._getAdditionalHeaders();c["Content-Type"]="application/json",e.languageCode&&(c["X-Firebase-Locale"]=e.languageCode);const u={method:t,headers:c,...s};return(0,i.c1)()||(u.referrerPolicy="no-referrer"),e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(u.credentials="include"),k.fetch()(await M(e,e.config.apiHost,n,a),u)}))}async function P(e,t,n){e._canInitEmulator=!1;const r={...R,...t};try{const t=new V(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw F(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const t=i.ok?s.errorMessage:s.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw F(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===n)throw F(e,"email-already-in-use",s);if("USER_DISABLED"===n)throw F(e,"user-disabled",s);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw g(e,a,o);f(e,a)}}catch(s){if(s instanceof i.g)throw s;f(e,"network-request-failed",{message:String(s)})}}async function L(e,t,n,r,i={}){const s=await x(e,t,n,r,i);return"mfaPendingCredential"in s&&f(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function M(e,t,n,r){const i=`${t}${n}?${r}`,s=e,o=s.config.emulator?A(e.config,i):`${e.config.apiScheme}://${i}`;if(O.includes(n)&&(await s._persistenceManagerAvailable,"COOKIE"===s._getPersistenceType())){const e=s._getPersistence();return e._getFinalTarget(o).toString()}return o}function U(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class V{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise(((e,t)=>{this.timer=setTimeout((()=>t(p(this.auth,"network-request-failed"))),N.get())}))}}function F(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=p(e,t,r);return i.customData._tokenResponse=n,i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(e){return void 0!==e&&void 0!==e.enterprise}class B{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return U(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $(e,t){return x(e,"GET","/v2/recaptchaConfig",D(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function q(e,t){return x(e,"POST","/v1/accounts:delete",t)}async function z(e,t){return x(e,"POST","/v1/accounts:lookup",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K(e,t=!1){const n=(0,i.Ku)(e),r=await n.getIdToken(t),s=W(r);v(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const o="object"===typeof s.firebase?s.firebase:void 0,a=o?.["sign_in_provider"];return{claims:s,token:r,authTime:H(G(s.auth_time)),issuedAtTime:H(G(s.iat)),expirationTime:H(G(s.exp)),signInProvider:a||null,signInSecondFactor:o?.["sign_in_second_factor"]||null}}function G(e){return 1e3*Number(e)}function W(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return d("JWT malformed, contained fewer than 3 sections"),null;try{const e=(0,i.u)(n);return e?JSON.parse(e):(d("Failed to decode base64 JWT payload"),null)}catch(s){return d("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Q(e){const t=W(e);return v(t,"internal-error"),v("undefined"!==typeof t.exp,"internal-error"),v("undefined"!==typeof t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof i.g&&J(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}function J({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=this.user.stsTokenManager.expirationTime??0,t=e-Date.now()-3e5;return Math.max(0,t)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout((async()=>{await this.iteration()}),t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===e?.code&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=H(this.lastLoginAt),this.creationTime=H(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ee(e){const t=e.auth,n=await e.getIdToken(),r=await X(e,z(t,{idToken:n}));v(r?.users.length,t,"internal-error");const i=r.users[0];e._notifyReloadListener(i);const s=i.providerUserInfo?.length?re(i.providerUserInfo):[],o=ne(e.providerData,s),a=e.isAnonymous,c=!(e.email&&i.passwordHash)&&!o?.length,u=!!a&&c,l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Z(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(e,l)}async function te(e){const t=(0,i.Ku)(e);await ee(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function ne(e,t){const n=e.filter((e=>!t.some((t=>t.providerId===e.providerId))));return[...n,...t]}function re(e){return e.map((({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null})))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ie(e,t){const n=await P(e,{},(async()=>{const n=(0,i.Am)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:s}=e.config,o=await M(e,r,"/v1/token",`key=${s}`),a=await e._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:n};return e.emulatorConfig&&(0,i.zJ)(e.emulatorConfig.host)&&(c.credentials="include"),k.fetch()(o,c)}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function se(e,t){return x(e,"POST","/v2/accounts:revokeToken",D(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){v(e.idToken,"internal-error"),v("undefined"!==typeof e.idToken,"internal-error"),v("undefined"!==typeof e.refreshToken,"internal-error");const t="expiresIn"in e&&"undefined"!==typeof e.expiresIn?Number(e.expiresIn):Q(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){v(0!==e.length,"internal-error");const t=Q(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(v(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:i}=await ie(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:i}=t,s=new oe;return n&&(v("string"===typeof n,"internal-error",{appName:e}),s.refreshToken=n),r&&(v("string"===typeof r,"internal-error",{appName:e}),s.accessToken=r),i&&(v("number"===typeof i,"internal-error",{appName:e}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new oe,this.toJSON())}_performRefresh(){return _("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(e,t){v("string"===typeof e||"undefined"===typeof e,"internal-error",{appName:t})}class ce{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId="firebase",this.proactiveRefresh=new Y(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Z(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await X(this,this.stsTokenManager.getToken(this.auth,e));return v(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return K(this,e)}reload(){return te(this)}_assign(e){this!==e&&(v(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map((e=>({...e}))),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ce({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){v(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await ee(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,r.xZ)(this.auth.app))return Promise.reject(m(this.auth));const e=await this.getIdToken();return await X(this,q(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((e=>({...e}))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,s=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:l,emailVerified:h,isAnonymous:d,providerData:f,stsTokenManager:p}=t;v(l&&p,e,"internal-error");const g=oe.fromJSON(this.name,p);v("string"===typeof l,e,"internal-error"),ae(n,e.name),ae(r,e.name),v("boolean"===typeof h,e,"internal-error"),v("boolean"===typeof d,e,"internal-error"),ae(i,e.name),ae(s,e.name),ae(o,e.name),ae(a,e.name),ae(c,e.name),ae(u,e.name);const m=new ce({uid:l,auth:e,email:r,emailVerified:h,displayName:n,isAnonymous:d,photoURL:s,phoneNumber:i,tenantId:o,stsTokenManager:g,createdAt:c,lastLoginAt:u});return f&&Array.isArray(f)&&(m.providerData=f.map((e=>({...e})))),a&&(m._redirectEventId=a),m}static async _fromIdTokenResponse(e,t,n=!1){const r=new oe;r.updateFromServerResponse(t);const i=new ce({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await ee(i),i}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];v(void 0!==r.localId,"internal-error");const i=void 0!==r.providerUserInfo?re(r.providerUserInfo):[],s=!(r.email&&r.passwordHash)&&!i?.length,o=new oe;o.updateFromIdToken(n);const a=new ce({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:s}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new Z(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(a,c),a}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue=new Map;function le(e){w(e instanceof Function,"Expected a class definition");let t=ue.get(e);return t?(w(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,ue.set(e,t),t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}he.type="NONE";const de=he;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(e,t,n){return`firebase:${e}:${t}:${n}`}class pe{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=fe(this.userKey,r.apiKey,i),this.fullPersistenceKey=fe("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"===typeof e){const t=await z(this.auth,{idToken:e}).catch((()=>{}));return t?ce._fromGetAccountInfoResponse(this.auth,t,e):null}return ce._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new pe(le(de),e,n);const r=(await Promise.all(t.map((async e=>{if(await e._isAvailable())return e})))).filter((e=>e));let i=r[0]||le(de);const s=fe(n,e.config.apiKey,e.name);let o=null;for(const c of t)try{const t=await c._get(s);if(t){let n;if("string"===typeof t){const r=await z(e,{idToken:t}).catch((()=>{}));if(!r)break;n=await ce._fromGetAccountInfoResponse(e,r,t)}else n=ce._fromJSON(e,t);c!==i&&(o=n),i=c;break}}catch{}const a=r.filter((e=>e._shouldAllowMigration));return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(s,o.toJSON()),await Promise.all(t.map((async e=>{if(e!==i)try{await e._remove(s)}catch{}}))),new pe(i,e,n)):new pe(i,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(_e(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(me(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(be(t))return"Blackberry";if(Ee(t))return"Webos";if(ye(t))return"Safari";if((t.includes("chrome/")||ve(t))&&!t.includes("edge/"))return"Chrome";if(we(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===n?.length)return n[1]}return"Other"}function me(e=(0,i.ZQ)()){return/firefox\//i.test(e)}function ye(e=(0,i.ZQ)()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ve(e=(0,i.ZQ)()){return/crios\//i.test(e)}function _e(e=(0,i.ZQ)()){return/iemobile/i.test(e)}function we(e=(0,i.ZQ)()){return/android/i.test(e)}function be(e=(0,i.ZQ)()){return/blackberry/i.test(e)}function Ee(e=(0,i.ZQ)()){return/webos/i.test(e)}function Te(e=(0,i.ZQ)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Ie(e=(0,i.ZQ)()){return Te(e)&&!!window.navigator?.standalone}function Se(){return(0,i.lT)()&&10===document.documentMode}function Ce(e=(0,i.ZQ)()){return Te(e)||we(e)||Ee(e)||be(e)||/windows phone/i.test(e)||_e(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(e,t=[]){let n;switch(e){case"Browser":n=ge((0,i.ZQ)());break;case"Worker":n=`${ge((0,i.ZQ)())}-${e}`;break;default:n=e}const s=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${r.MF}/${s}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise(((n,r)=>{try{const r=e(t);n(r)}catch(i){r(i)}}));n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Re(e,t={}){return x(e,"GET","/v2/passwordPolicy",D(e,t))}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oe=6;class Ne{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Oe,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),void 0!==t.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),void 0!==t.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),void 0!==t.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),void 0!==t.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Pe(this),this.idTokenSubscription=new Pe(this),this.beforeStateQueue=new ke(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=u,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise((e=>this._resolvePersistenceManagerAvailable=e))}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=le(t)),this._initializationPromise=this.queue((async()=>{if(!this._deleted&&(this.persistenceManager=await pe.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(n){}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,this._deleted||(this._isInitialized=!0)}})),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await z(this,{idToken:e}),n=await ce._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if((0,r.xZ)(this.app)){const e=this.app.settings.authIdToken;return e?new Promise((t=>{setTimeout((()=>this.initializeCurrentUserFromIdToken(e).then(t,t)))})):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const t=this.redirectUser?._redirectEventId,r=n?._redirectEventId,s=await this.tryRedirectSignIn(e);t&&t!==r||!s?.user||(n=s.user,i=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(n)}catch(s){n=t,this._popupRedirectResolver._overrideRedirectResult(this,(()=>Promise.reject(s)))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return v(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ee(e)}catch(t){if("auth/network-request-failed"!==t?.code)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=S()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,r.xZ)(this.app))return Promise.reject(m(this));const t=e?(0,i.Ku)(e):null;return t&&v(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&v(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue((async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()}))}async signOut(){return(0,r.xZ)(this.app)?Promise.reject(m(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,r.xZ)(this.app)?Promise.reject(m(this)):this.queue((async()=>{await this.assertedPersistence.setPersistence(le(e))}))}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Re(this),t=new Ne(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new i.FA("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise(((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged((()=>{n(),e()}),t)}}))}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};null!=this.tenantId&&(n.tenantId=this.tenantId),await se(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&le(e)||this._popupRedirectResolver;v(t,this,"argument-error"),this.redirectPersistenceManager=await pe.create(this,[le(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue((async()=>{})),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(e)))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const i="function"===typeof t?t:t.next.bind(t);let s=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(v(o,this,"internal-error"),o.then((()=>{s||i(this.currentUser)})),"function"===typeof t){const i=e.addObserver(t,n,r);return()=>{s=!0,i()}}{const n=e.addObserver(t);return()=>{s=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return v(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ae(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={["X-Client-Version"]:this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await(this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if((0,r.xZ)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await(this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken());return e?.error&&h(`Error while retrieving App Check token: ${e.error}`),e?.token}}function xe(e){return(0,i.Ku)(e)}class Pe{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,i.tD)((e=>this.observer=e))}get next(){return v(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Le={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Me(e){Le=e}function Ue(e){return Le.loadJS(e)}function Ve(){return Le.recaptchaEnterpriseScript}function Fe(){return Le.gapiScript}function je(e){return`__${e}${Math.floor(1e6*Math.random())}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(){this.enterprise=new $e}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class $e{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const qe="recaptcha-enterprise",ze="NO_RECAPTCHA";class He{constructor(e){this.type=qe,this.auth=xe(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise((async(t,n)=>{$(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then((r=>{if(void 0!==r.recaptchaKey){const n=new B(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))})).catch((e=>{n(e)}))}))}function r(t,n,r){const i=window.grecaptcha;j(i)?i.enterprise.ready((()=>{i.enterprise.execute(t,{action:e}).then((e=>{n(e)})).catch((()=>{n(ze)}))})):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){const e=new Be;return e.execute("siteKey",{action:"verify"})}return new Promise(((e,i)=>{n(this.auth).then((n=>{if(!t&&j(window.grecaptcha))r(n,e,i);else{if("undefined"===typeof window)return void i(new Error("RecaptchaVerifier is only supported in browser"));let t=Ve();0!==t.length&&(t+=n),Ue(t).then((()=>{r(n,e,i)})).catch((e=>{i(e)}))}})).catch((e=>{i(e)}))}))}}async function Ke(e,t,n,r=!1,i=!1){const s=new He(e);let o;if(i)o=ze;else try{o=await s.verify(n)}catch(c){o=await s.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Ge(e,t,n,r,i){if("EMAIL_PASSWORD_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Ke(e,t,n,"getOobCode"===n);return r(e,i)}return r(e,t).catch((async i=>{if("auth/missing-recaptcha-token"===i.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const i=await Ke(e,t,n,"getOobCode"===n);return r(e,i)}return Promise.reject(i)}))}if("PHONE_PROVIDER"===i){if(e._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const i=await Ke(e,t,n);return r(e,i).catch((async i=>{if("AUDIT"===e._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")&&("auth/missing-recaptcha-token"===i.code||"auth/invalid-app-credential"===i.code)){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const i=await Ke(e,t,n,!1,!0);return r(e,i)}return Promise.reject(i)}))}{const i=await Ke(e,t,n,!1,!0);return r(e,i)}}return Promise.reject(i+" provider is not supported.")}async function We(e){const t=xe(e),n=await $(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new B(n);if(null==t.tenantId?t._agentRecaptchaConfig=r:t._tenantRecaptchaConfigs[t.tenantId]=r,r.isAnyProviderEnabled()){const e=new He(t);e.verify()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(e,t){const n=(0,r.j6)(e,"auth");if(n.isInitialized()){const e=n.getImmediate(),r=n.getOptions();if((0,i.bD)(r,t??{}))return e;f(e,"already-initialized")}const s=n.initialize({options:t});return s}function Xe(e,t){const n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(le);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}function Je(e,t,n){const r=xe(e);v(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!!n?.disableWarnings,o=Ye(t),{host:a,port:c}=Ze(t),u=null===c?"":`:${c}`,l={url:`${o}//${a}${u}/`},h=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator)return v(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void v((0,i.bD)(l,r.config.emulator)&&(0,i.bD)(h,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=l,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,(0,i.zJ)(a)?(0,i.gE)(`${o}//${a}${u}`):s||tt()}function Ye(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Ze(e){const t=Ye(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const e=i[1];return{host:e,port:et(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:et(t)}}}function et(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function tt(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!==typeof console&&"function"===typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!==typeof window&&"undefined"!==typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return _("not implemented")}_getIdTokenResponse(e){return _("not implemented")}_linkToIdToken(e,t){return _("not implemented")}_getReauthenticationResolver(e){return _("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rt(e,t){return x(e,"POST","/v1/accounts:signUp",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function it(e,t){return L(e,"POST","/v1/accounts:signInWithPassword",D(e,t))}async function st(e,t){return x(e,"POST","/v1/accounts:sendOobCode",D(e,t))}async function ot(e,t){return st(e,t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function at(e,t){return L(e,"POST","/v1/accounts:signInWithEmailLink",D(e,t))}async function ct(e,t){return L(e,"POST","/v1/accounts:signInWithEmailLink",D(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut extends nt{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new ut(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new ut(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e;if(t?.email&&t?.password){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ge(e,t,"signInWithPassword",it,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return at(e,{email:this._email,oobCode:this._password});default:f(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ge(e,n,"signUpPassword",rt,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return ct(e,{idToken:t,email:this._email,oobCode:this._password});default:f(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lt(e,t){return L(e,"POST","/v1/accounts:signInWithIdp",D(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht="http://localhost";class dt extends nt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new dt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):f("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"===typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...i}=t;if(!n||!r)return null;const s=new dt(n,r);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(e){const t=this.buildRequest();return lt(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,lt(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,lt(e,t)}buildRequest(){const e={requestUri:ht,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t["id_token"]=this.idToken),this.accessToken&&(t["access_token"]=this.accessToken),this.secret&&(t["oauth_token_secret"]=this.secret),t["providerId"]=this.providerId,this.nonce&&!this.pendingToken&&(t["nonce"]=this.nonce),e.postBody=(0,i.Am)(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ft(e,t){return x(e,"POST","/v1/accounts:sendVerificationCode",D(e,t))}async function pt(e,t){return L(e,"POST","/v1/accounts:signInWithPhoneNumber",D(e,t))}async function gt(e,t){const n=await L(e,"POST","/v1/accounts:signInWithPhoneNumber",D(e,t));if(n.temporaryProof)throw F(e,"account-exists-with-different-credential",n);return n}const mt={["USER_NOT_FOUND"]:"user-not-found"};async function yt(e,t){const n={...t,operation:"REAUTH"};return L(e,"POST","/v1/accounts:signInWithPhoneNumber",D(e,n),mt)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends nt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new vt({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new vt({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return pt(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return gt(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return yt(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"===typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new vt({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function wt(e){const t=(0,i.I9)((0,i.hp)(e))["link"],n=t?(0,i.I9)((0,i.hp)(t))["deep_link_id"]:null,r=(0,i.I9)((0,i.hp)(e))["deep_link_id"],s=r?(0,i.I9)((0,i.hp)(r))["link"]:null;return s||r||n||t||e}class bt{constructor(e){const t=(0,i.I9)((0,i.hp)(e)),n=t["apiKey"]??null,r=t["oobCode"]??null,s=_t(t["mode"]??null);v(n&&r&&s,"argument-error"),this.apiKey=n,this.operation=s,this.code=r,this.continueUrl=t["continueUrl"]??null,this.languageCode=t["lang"]??null,this.tenantId=t["tenantId"]??null}static parseLink(e){const t=wt(e);try{return new bt(t)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Et{constructor(){this.providerId=Et.PROVIDER_ID}static credential(e,t){return ut._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=bt.parseLink(t);return v(n,"argument-error"),ut._fromEmailAndCode(e,n.code,n.tenantId)}}Et.PROVIDER_ID="password",Et.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Et.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tt{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It extends Tt{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class St extends It{constructor(){super("facebook.com")}static credential(e){return dt._fromParams({providerId:St.PROVIDER_ID,signInMethod:St.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return St.credentialFromTaggedObject(e)}static credentialFromError(e){return St.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return St.credential(e.oauthAccessToken)}catch{return null}}}St.FACEBOOK_SIGN_IN_METHOD="facebook.com",St.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ct extends It{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return dt._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Ct.credential(t,n)}catch{return null}}}Ct.GOOGLE_SIGN_IN_METHOD="google.com",Ct.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class At extends It{constructor(){super("github.com")}static credential(e){return dt._fromParams({providerId:At.PROVIDER_ID,signInMethod:At.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return At.credentialFromTaggedObject(e)}static credentialFromError(e){return At.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return At.credential(e.oauthAccessToken)}catch{return null}}}At.GITHUB_SIGN_IN_METHOD="github.com",At.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class kt extends It{constructor(){super("twitter.com")}static credential(e,t){return dt._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return kt.credential(t,n)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Rt(e,t){return L(e,"POST","/v1/accounts:signUp",D(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt.TWITTER_SIGN_IN_METHOD="twitter.com",kt.PROVIDER_ID="twitter.com";class Ot{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const i=await ce._fromIdTokenResponse(e,n,r),s=Nt(n),o=new Ot({user:i,providerId:s,_tokenResponse:n,operationType:t});return o}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=Nt(n);return new Ot({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function Nt(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Dt extends i.g{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,Dt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new Dt(e,t,n,r)}}function xt(e,t,n,r){const i="reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e);return i.catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw Dt._fromErrorAndOperation(e,n,t,r);throw n}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pt(e,t,n=!1){const r=await X(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Ot._forOperation(e,"link",r)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Lt(e,t,n=!1){const{auth:i}=e;if((0,r.xZ)(i.app))return Promise.reject(m(i));const s="reauthenticate";try{const r=await X(e,xt(i,s,t,e),n);v(r.idToken,i,"internal-error");const o=W(r.idToken);v(o,i,"internal-error");const{sub:a}=o;return v(e.uid===a,i,"user-mismatch"),Ot._forOperation(e,s,r)}catch(o){throw"auth/user-not-found"===o?.code&&f(i,"user-mismatch"),o}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mt(e,t,n=!1){if((0,r.xZ)(e.app))return Promise.reject(m(e));const i="signIn",s=await xt(e,i,t),o=await Ot._fromIdTokenResponse(e,i,s);return n||await e._updateCurrentUser(o.user),o}async function Ut(e,t){return Mt(xe(e),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Vt(e,t,n){v(n.url?.length>0,e,"invalid-continue-uri"),v("undefined"===typeof n.dynamicLinkDomain||n.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),v("undefined"===typeof n.linkDomain||n.linkDomain.length>0,e,"invalid-hosting-link-domain"),t.continueUrl=n.url,t.dynamicLinkDomain=n.dynamicLinkDomain,t.linkDomain=n.linkDomain,t.canHandleCodeInApp=n.handleCodeInApp,n.iOS&&(v(n.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iOSBundleId=n.iOS.bundleId),n.android&&(v(n.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=n.android.installApp,t.androidMinimumVersionCode=n.android.minimumVersion,t.androidPackageName=n.android.packageName)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ft(e){const t=xe(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function jt(e,t,n){const r=xe(e),i={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};n&&Vt(r,i,n),await Ge(r,i,"getOobCode",ot,"EMAIL_PASSWORD_PROVIDER")}async function Bt(e,t,n){if((0,r.xZ)(e.app))return Promise.reject(m(e));const i=xe(e),s={returnSecureToken:!0,email:t,password:n,clientType:"CLIENT_TYPE_WEB"},o=Ge(i,s,"signUpPassword",Rt,"EMAIL_PASSWORD_PROVIDER"),a=await o.catch((t=>{throw"auth/password-does-not-meet-requirements"===t.code&&Ft(e),t})),c=await Ot._fromIdTokenResponse(i,"signIn",a);return await i._updateCurrentUser(c.user),c}function $t(e,t,n){return(0,r.xZ)(e.app)?Promise.reject(m(e)):Ut((0,i.Ku)(e),Et.credential(t,n)).catch((async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&Ft(e),t}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function qt(e,t){return x(e,"POST","/v1/accounts:createAuthUri",D(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zt(e,t){const n=E()?b():"http://localhost",r={identifier:t,continueUri:n},{signinMethods:s}=await qt((0,i.Ku)(e),r);return s||[]}function Ht(e,t,n,r){return(0,i.Ku)(e).onIdTokenChanged(t,n,r)}function Kt(e,t,n){return(0,i.Ku)(e).beforeAuthStateChanged(t,n)}function Gt(e,t,n,r){return(0,i.Ku)(e).onAuthStateChanged(t,n,r)}function Wt(e){return(0,i.Ku)(e).signOut()}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Qt(e,t){return x(e,"POST","/v2/accounts/mfaEnrollment:start",D(e,t))}function Xt(e,t){return x(e,"POST","/v2/accounts/mfaEnrollment:finalize",D(e,t))}function Jt(e,t){return x(e,"POST","/v2/accounts/mfaEnrollment:start",D(e,t))}function Yt(e,t){return x(e,"POST","/v2/accounts/mfaEnrollment:finalize",D(e,t))}new WeakMap;const Zt="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Zt,"1"),this.storage.removeItem(Zt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn=1e3,nn=10;class rn extends en{constructor(){super((()=>window.localStorage),"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ce(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys(((e,t,n)=>{this.notifyListeners(e,n)}));const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);Se()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,nn):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)}))}),tn)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}rn.type="LOCAL";const sn=rn,on=1e3;
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function an(e){const t=e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),n=RegExp(`${t}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function cn(e){const t="http:"===window.location.protocol;return`${t?"__dev_":"__HOST-"}FIREBASE_${e.split(":")[3]}`}class un{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(void 0===typeof window)return e;const t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return!("boolean"===typeof isSecureContext&&!isSecureContext)&&("undefined"!==typeof navigator&&"undefined"!==typeof document&&(navigator.cookieEnabled??!0))}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;const t=cn(e);if(window.cookieStore){const e=await window.cookieStore.get(t);return e?.value}return an(t)}async _remove(e){if(!this._isAvailable())return;const t=await this._get(e);if(!t)return;const n=cn(e);document.cookie=`${n}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch((()=>{}))}_addListener(e,t){if(!this._isAvailable())return;const n=cn(e);if(window.cookieStore){const e=e=>{const r=e.changed.find((e=>e.name===n));r&&t(r.value);const i=e.deleted.find((e=>e.name===n));i&&t(null)},r=()=>window.cookieStore.removeEventListener("change",e);return this.listenerUnsubscribes.set(t,r),window.cookieStore.addEventListener("change",e)}let r=an(n);const i=setInterval((()=>{const e=an(n);e!==r&&(t(e),r=e)}),on),s=()=>clearInterval(i);this.listenerUnsubscribes.set(t,s)}_removeListener(e,t){const n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}}un.type="COOKIE";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ln extends en{constructor(){super((()=>window.sessionStorage),"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ln.type="SESSION";const hn=ln;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(e){return Promise.all(e.map((async e=>{try{const t=await e;return{fulfilled:!0,value:t}}catch(t){return{fulfilled:!1,reason:t}}})))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find((t=>t.isListeningto(e)));if(t)return t;const n=new fn(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:i}=t.data,s=this.handlersMap[r];if(!s?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(s).map((async e=>e(t.origin,i))),a=await dn(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function pn(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */fn.receivers=[];class gn{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!==typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,s;return new Promise(((o,a)=>{const c=pn("",20);r.port1.start();const u=setTimeout((()=>{a(new Error("unsupported_event"))}),n);s={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),i=setTimeout((()=>{a(new Error("timeout"))}),3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(s),r.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])})).finally((()=>{s&&this.removeMessageHandler(s)}))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mn(){return window}function yn(e){mn().location.href=e}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vn(){return"undefined"!==typeof mn()["WorkerGlobalScope"]&&"function"===typeof mn()["importScripts"]}async function _n(){if(!navigator?.serviceWorker)return null;try{const e=await navigator.serviceWorker.ready;return e.active}catch{return null}}function wn(){return navigator?.serviceWorker?.controller||null}function bn(){return vn()?self:null}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const En="firebaseLocalStorageDb",Tn=1,In="firebaseLocalStorage",Sn="fbase_key";class Cn{constructor(e){this.request=e}toPromise(){return new Promise(((e,t)=>{this.request.addEventListener("success",(()=>{e(this.request.result)})),this.request.addEventListener("error",(()=>{t(this.request.error)}))}))}}function An(e,t){return e.transaction([In],t?"readwrite":"readonly").objectStore(In)}function kn(){const e=indexedDB.deleteDatabase(En);return new Cn(e).toPromise()}function Rn(){const e=indexedDB.open(En,Tn);return new Promise(((t,n)=>{e.addEventListener("error",(()=>{n(e.error)})),e.addEventListener("upgradeneeded",(()=>{const t=e.result;try{t.createObjectStore(In,{keyPath:Sn})}catch(r){n(r)}})),e.addEventListener("success",(async()=>{const n=e.result;n.objectStoreNames.contains(In)?t(n):(n.close(),await kn(),t(await Rn()))}))}))}async function On(e,t,n){const r=An(e,!0).put({[Sn]:t,value:n});return new Cn(r).toPromise()}async function Nn(e,t){const n=An(e,!1).get(t),r=await new Cn(n).toPromise();return void 0===r?null:r.value}function Dn(e,t){const n=An(e,!0).delete(t);return new Cn(n).toPromise()}const xn=800,Pn=3;class Ln{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}async _openDb(){return this.dbPromise||(this.dbPromise=Rn(),this.dbPromise.catch((()=>{this.dbPromise=null}))),this.dbPromise}async _withRetries(e){let t=0;while(1)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>Pn)throw n;if(this.dbPromise){const e=await this.dbPromise;e.close(),this.dbPromise=null}}}async initializeServiceWorkerMessaging(){return vn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=fn._getInstance(bn()),this.receiver._subscribe("keyChanged",(async(e,t)=>{const n=await this._poll();return{keyProcessed:n.includes(t.key)}})),this.receiver._subscribe("ping",(async(e,t)=>["keyChanged"]))}async initializeSender(){if(this.activeServiceWorker=await _n(),!this.activeServiceWorker)return;this.sender=new gn(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(this.sender&&this.activeServiceWorker&&wn()===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return!!indexedDB&&(await this._withRetries((async e=>{await On(e,Zt,"1"),await Dn(e,Zt)})),!0)}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite((async()=>(await this._withRetries((n=>On(n,e,t))),this.localCache[e]=t,this.notifyServiceWorker(e))))}async _get(e){const t=await this._withRetries((t=>Nn(t,e)));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite((async()=>(await this._withRetries((t=>Dn(t,e))),delete this.localCache[e],this.notifyServiceWorker(e))))}async _poll(){const e=await this._withRetries((e=>{const t=An(e,!1).getAll();return new Cn(t).toPromise()}));if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),xn)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}Ln.type="LOCAL";const Mn=Ln;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Un(e,t){return x(e,"POST","/v2/accounts/mfaSignIn:start",D(e,t))}function Vn(e,t){return x(e,"POST","/v2/accounts/mfaSignIn:finalize",D(e,t))}function Fn(e,t){return x(e,"POST","/v2/accounts/mfaSignIn:finalize",D(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */je("rcb"),new C(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const jn="recaptcha";async function Bn(e,t,n){if(!e._getRecaptchaConfig())try{await We(e)}catch(r){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(r="string"===typeof t?{phoneNumber:t}:t,"session"in r){const t=r.session;if("phoneNumber"in r){v("enroll"===t.type,e,"internal-error");const i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}},s=async(e,t)=>{if(t.phoneEnrollmentInfo.captchaResponse===ze){v(n?.type===jn,e,"argument-error");const r=await $n(e,t,n);return Qt(e,r)}return Qt(e,t)},o=Ge(e,i,"mfaSmsEnrollment",s,"PHONE_PROVIDER"),a=await o.catch((e=>Promise.reject(e)));return a.phoneSessionInfo.sessionInfo}{v("signin"===t.type,e,"internal-error");const i=r.multiFactorHint?.uid||r.multiFactorUid;v(i,e,"missing-multi-factor-info");const s={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}},o=async(e,t)=>{if(t.phoneSignInInfo.captchaResponse===ze){v(n?.type===jn,e,"argument-error");const r=await $n(e,t,n);return Un(e,r)}return Un(e,t)},a=Ge(e,s,"mfaSmsSignIn",o,"PHONE_PROVIDER"),c=await a.catch((e=>Promise.reject(e)));return c.phoneResponseInfo.sessionInfo}}{const t={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"},i=async(e,t)=>{if(t.captchaResponse===ze){v(n?.type===jn,e,"argument-error");const r=await $n(e,t,n);return ft(e,r)}return ft(e,t)},s=Ge(e,t,"sendVerificationCode",i,"PHONE_PROVIDER"),o=await s.catch((e=>Promise.reject(e)));return o.sessionInfo}}finally{n?._reset()}}async function $n(e,t,n){v(n.type===jn,e,"argument-error");const r=await n.verify();v("string"===typeof r,e,"argument-error");const i={...t};if("phoneEnrollmentInfo"in i){const e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,s=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:s}}),i}if("phoneSignInInfo"in i){const e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}return Object.assign(i,{recaptchaToken:r}),i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e){this.providerId=qn.PROVIDER_ID,this.auth=xe(e)}verifyPhoneNumber(e,t){return Bn(this.auth,e,(0,i.Ku)(t))}static credential(e,t){return vt._fromVerification(e,t)}static credentialFromResult(e){const t=e;return qn.credentialFromTaggedObject(t)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?vt._fromTokenResponse(t,n):null}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function zn(e,t){return t?le(t):(v(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qn.PROVIDER_ID="phone",qn.PHONE_SIGN_IN_METHOD="phone";class Hn extends nt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return lt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return lt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return lt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Kn(e){return Mt(e.auth,new Hn(e),e.bypassAuthState)}function Gn(e){const{auth:t,user:n}=e;return v(n,t,"internal-error"),Lt(n,new Hn(e),e.bypassAuthState)}async function Wn(e){const{auth:t,user:n}=e;return v(n,t,"internal-error"),Pt(n,new Hn(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise((async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}}))}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:s,type:o}=e;if(s)return void this.reject(s);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Kn;case"linkViaPopup":case"linkViaRedirect":return Wn;case"reauthViaPopup":case"reauthViaRedirect":return Gn;default:f(this.auth,"internal-error")}}resolve(e){w(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){w(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn=new C(2e3,1e4);class Jn extends Qn{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,Jn.currentPopupAction&&Jn.currentPopupAction.cancel(),Jn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return v(e,this.auth,"internal-error"),e}async onExecution(){w(1===this.filter.length,"Popup operations only handle one event");const e=pn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch((e=>{this.reject(e)})),this.resolver._isIframeWebStorageSupported(this.auth,(e=>{e||this.reject(p(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(p(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Jn.currentPopupAction=null}pollUserCancellation(){const e=()=>{this.authWindow?.window?.closed?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(p(this.auth,"popup-closed-by-user"))}),8e3):this.pollId=window.setTimeout(e,Xn.get())};e()}}Jn.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Yn="pendingRedirect",Zn=new Map;class er extends Qn{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Zn.get(this.auth._key());if(!e){try{const t=await tr(this.resolver,this.auth),n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Zn.set(this.auth._key(),e)}return this.bypassAuthState||Zn.set(this.auth._key(),(()=>Promise.resolve(null))),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}async function tr(e,t){const n=ir(t),r=rr(e);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}function nr(e,t){Zn.set(e._key(),t)}function rr(e){return le(e._redirectPersistence)}function ir(e){return fe(Yn,e.config.apiKey,e.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sr(e,t,n=!1){if((0,r.xZ)(e.app))return Promise.reject(m(e));const i=xe(e),s=zn(i,t),o=new er(i,s,n),a=await o.execute();return a&&!n&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,t)),a}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const or=6e5;class ar{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))})),this.hasHandledPotentialRedirect||!lr(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!ur(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(p(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=or&&this.cachedEventUids.clear(),this.cachedEventUids.has(cr(e))}saveEventToCache(e){this.cachedEventUids.add(cr(e)),this.lastProcessedEventTime=Date.now()}}function cr(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter((e=>e)).join("-")}function ur({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===t?.code}function lr(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ur(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hr(e,t={}){return x(e,"GET","/v1/projects",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,fr=/^https?/;async function pr(e){if(e.config.emulator)return;const{authorizedDomains:t}=await hr(e);for(const n of t)try{if(gr(n))return}catch{}f(e,"unauthorized-domain")}function gr(e){const t=b(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!fr.test(n))return!1;if(dr.test(e))return r===e;const i=e.replace(/\./g,"\\."),s=new RegExp("^(.+\\."+i+"|"+i+")$","i");return s.test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mr=new C(3e4,6e4);function yr(){const e=mn().___jsl;if(e?.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function vr(e){return new Promise(((t,n)=>{function r(){yr(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{yr(),n(p(e,"network-request-failed"))},timeout:mr.get()})}if(mn().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else{if(!mn().gapi?.load){const t=je("iframefcb");return mn()[t]=()=>{gapi.load?r():n(p(e,"network-request-failed"))},Ue(`${Fe()}?onload=${t}`).catch((e=>n(e)))}r()}})).catch((e=>{throw _r=null,e}))}let _r=null;function wr(e){return _r=_r||vr(e),_r}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const br=new C(5e3,15e3),Er="__/auth/iframe",Tr="emulator/auth/iframe",Ir={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Sr=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Cr(e){const t=e.config;v(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?A(t,Tr):`https://${e.config.authDomain}/${Er}`,s={apiKey:t.apiKey,appName:e.name,v:r.MF},o=Sr.get(e.config.apiHost);o&&(s.eid=o);const a=e._getFrameworks();return a.length&&(s.fw=a.join(",")),`${n}?${(0,i.Am)(s).slice(1)}`}async function Ar(e){const t=await wr(e),n=mn().gapi;return v(n,e,"internal-error"),t.open({where:document.body,url:Cr(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ir,dontclear:!0},(t=>new Promise((async(n,r)=>{await t.restyle({setHideOnLeave:!1});const i=p(e,"network-request-failed"),s=mn().setTimeout((()=>{r(i)}),br.get());function o(){mn().clearTimeout(s),n(t)}t.ping(o).then(o,(()=>{r(i)}))}))))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kr={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Rr=500,Or=600,Nr="_blank",Dr="http://localhost";class xr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Pr(e,t,n,r=Rr,s=Or){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...kr,width:r.toString(),height:s.toString(),top:o,left:a},l=(0,i.ZQ)().toLowerCase();n&&(c=ve(l)?Nr:n),me(l)&&(t=t||Dr,u.scrollbars="yes");const h=Object.entries(u).reduce(((e,[t,n])=>`${e}${t}=${n},`),"");if(Ie(l)&&"_self"!==c)return Lr(t||"",c),new xr(null);const d=window.open(t||"",c,h);v(d,e,"popup-blocked");try{d.focus()}catch(f){}return new xr(d)}function Lr(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr="__/auth/handler",Ur="emulator/auth/handler",Vr=encodeURIComponent("fac");async function Fr(e,t,n,s,o,a){v(e.config.authDomain,e,"auth-domain-config-required"),v(e.config.apiKey,e,"invalid-api-key");const c={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:r.MF,eventId:o};if(t instanceof Tt){t.setDefaultLanguage(e.languageCode),c.providerId=t.providerId||"",(0,i.Im)(t.getCustomParameters())||(c.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(a||{}))c[e]=t}if(t instanceof It){const e=t.getScopes().filter((e=>""!==e));e.length>0&&(c.scopes=e.join(","))}e.tenantId&&(c.tid=e.tenantId);const u=c;for(const r of Object.keys(u))void 0===u[r]&&delete u[r];const l=await e._getAppCheckToken(),h=l?`#${Vr}=${encodeURIComponent(l)}`:"";return`${jr(e)}?${(0,i.Am)(u).slice(1)}${h}`}function jr({config:e}){return e.emulator?A(e,Ur):`https://${e.authDomain}/${Mr}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br="webStorageSupport";class $r{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=hn,this._completeRedirectFn=sr,this._overrideRedirectResult=nr}async _openPopup(e,t,n,r){w(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Fr(e,t,n,b(),r);return Pr(e,i,pn())}async _openRedirect(e,t,n,r){await this._originValidation(e);const i=await Fr(e,t,n,b(),r);return yn(i),new Promise((()=>{}))}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(w(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch((()=>{delete this.eventManagers[t]})),n}async initAndGetManager(e){const t=await Ar(e),n=new ar(e);return t.register("authEvent",(t=>{v(t?.authEvent,e,"invalid-auth-event");const r=n.onEvent(t.authEvent);return{status:r?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){const n=this.iframes[e._key()];n.send(Br,{type:Br},(n=>{const r=n?.[0]?.[Br];void 0!==r&&t(!!r),f(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=pr(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ce()||ye()||Te()}}const qr=$r;class zr{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return _("unexpected MultiFactorSessionType")}}}class Hr extends zr{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new Hr(e)}_finalizeEnroll(e,t,n){return Xt(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Vn(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class Kr{constructor(){}static assertion(e){return Hr._fromCredential(e)}}Kr.FACTOR_ID="phone";class Gr{static assertionForEnrollment(e,t){return Wr._fromSecret(e,t)}static assertionForSignIn(e,t){return Wr._fromEnrollmentId(e,t)}static async generateSecret(e){const t=e;v("undefined"!==typeof t.user?.auth,"internal-error");const n=await Jt(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return Qr._fromStartTotpMfaEnrollmentResponse(n,t.user.auth)}}Gr.FACTOR_ID="totp";class Wr extends zr{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new Wr(t,void 0,e)}static _fromEnrollmentId(e,t){return new Wr(t,e)}async _finalizeEnroll(e,t,n){return v("undefined"!==typeof this.secret,e,"argument-error"),Yt(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){v(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");const n={verificationCode:this.otp};return Fn(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}}class Qr{constructor(e,t,n,r,i,s,o){this.sessionInfo=s,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new Qr(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let n=!1;return(Xr(e)||Xr(t))&&(n=!0),n&&(Xr(e)&&(e=this.auth.currentUser?.email||"unknownuser"),Xr(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function Xr(e){return"undefined"===typeof e||0===e?.length}var Jr="@firebase/auth",Yr="1.13.2";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Zr{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;const t=await this.auth.currentUser.getIdToken(e);return{accessToken:t}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged((t=>{e(t?.stsTokenManager.accessToken||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){v(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ti(e){(0,r.om)(new o.uA("auth",((t,{options:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("heartbeat"),s=t.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;v(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ae(e)},u=new De(r,i,s,c);return Xe(u,n),u}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,n)=>{const r=e.getProvider("auth-internal");r.initialize()}))),(0,r.om)(new o.uA("auth-internal",(e=>{const t=xe(e.getProvider("auth").getImmediate());return(e=>new Zr(e))(t)}),"PRIVATE").setInstantiationMode("EXPLICIT")),(0,r.KO)(Jr,Yr,ei(e)),(0,r.KO)(Jr,Yr,"esm2020")}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ni=300,ri=(0,i.XA)("authIdTokenMaxAge")||ni;let ii=null;const si=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&((new Date).getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>ri)return;const i=n?.token;ii!==i&&(ii=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function oi(e=(0,r.Sx)()){const t=(0,r.j6)(e,"auth");if(t.isInitialized())return t.getImmediate();const n=Qe(e,{popupRedirectResolver:qr,persistence:[Mn,sn,hn]}),s=(0,i.XA)("authTokenSyncURL");if(s&&"boolean"===typeof isSecureContext&&isSecureContext){const e=new URL(s,location.origin);if(location.origin===e.origin){const t=si(e.toString());Kt(n,t,(()=>t(n.currentUser))),Ht(n,(e=>t(e)))}}const o=(0,i.Tj)("auth");return o&&Je(n,`http://${o}`),n}function ai(){return document.getElementsByTagName("head")?.[0]??document}Me({loadJS(e){return new Promise(((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=p("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",ai().appendChild(r)}))},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="}),ti("Browser")},2856:function(e,t,n){n.d(t,{gS:function(){return Mu},rJ:function(){return Sc},H9:function(){return Cc},x7:function(){return Du},GG:function(){return xu},aU:function(){return Nc},AB:function(){return Eu},My:function(){return wu},P:function(){return gu},BN:function(){return Pu},mZ:function(){return Lu},_M:function(){return yu}});n(4114),n(8992),n(4520),n(3949),n(1454);var r,i,s=n(262),o=n(798),a=(n(6573),n(8100),n(7936),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(3215),n(2577),n(8872),n(7550),n(1795),n(4979),n(4603),n(7566),n(8721),n(2455)),c="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:{},u={};(function(){var e;
/** @license
         Copyright The Closure Library Authors.
         SPDX-License-Identifier: Apache-2.0
         */function t(e,t){function n(){}n.prototype=t.prototype,e.F=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.D=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}function n(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function o(e,t,n){n||(n=0);const r=Array(16);if("string"===typeof t)for(var i=0;i<16;++i)r[i]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(i=0;i<16;++i)r[i]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],i=e.g[2];let s,o=e.g[3];s=t+(o^n&(i^o))+r[0]+3614090360&4294967295,t=n+(s<<7&4294967295|s>>>25),s=o+(i^t&(n^i))+r[1]+3905402710&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[2]+606105819&4294967295,i=o+(s<<17&4294967295|s>>>15),s=n+(t^i&(o^t))+r[3]+3250441966&4294967295,n=i+(s<<22&4294967295|s>>>10),s=t+(o^n&(i^o))+r[4]+4118548399&4294967295,t=n+(s<<7&4294967295|s>>>25),s=o+(i^t&(n^i))+r[5]+1200080426&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[6]+2821735955&4294967295,i=o+(s<<17&4294967295|s>>>15),s=n+(t^i&(o^t))+r[7]+4249261313&4294967295,n=i+(s<<22&4294967295|s>>>10),s=t+(o^n&(i^o))+r[8]+1770035416&4294967295,t=n+(s<<7&4294967295|s>>>25),s=o+(i^t&(n^i))+r[9]+2336552879&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[10]+4294925233&4294967295,i=o+(s<<17&4294967295|s>>>15),s=n+(t^i&(o^t))+r[11]+2304563134&4294967295,n=i+(s<<22&4294967295|s>>>10),s=t+(o^n&(i^o))+r[12]+1804603682&4294967295,t=n+(s<<7&4294967295|s>>>25),s=o+(i^t&(n^i))+r[13]+4254626195&4294967295,o=t+(s<<12&4294967295|s>>>20),s=i+(n^o&(t^n))+r[14]+2792965006&4294967295,i=o+(s<<17&4294967295|s>>>15),s=n+(t^i&(o^t))+r[15]+1236535329&4294967295,n=i+(s<<22&4294967295|s>>>10),s=t+(i^o&(n^i))+r[1]+4129170786&4294967295,t=n+(s<<5&4294967295|s>>>27),s=o+(n^i&(t^n))+r[6]+3225465664&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[11]+643717713&4294967295,i=o+(s<<14&4294967295|s>>>18),s=n+(o^t&(i^o))+r[0]+3921069994&4294967295,n=i+(s<<20&4294967295|s>>>12),s=t+(i^o&(n^i))+r[5]+3593408605&4294967295,t=n+(s<<5&4294967295|s>>>27),s=o+(n^i&(t^n))+r[10]+38016083&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[15]+3634488961&4294967295,i=o+(s<<14&4294967295|s>>>18),s=n+(o^t&(i^o))+r[4]+3889429448&4294967295,n=i+(s<<20&4294967295|s>>>12),s=t+(i^o&(n^i))+r[9]+568446438&4294967295,t=n+(s<<5&4294967295|s>>>27),s=o+(n^i&(t^n))+r[14]+3275163606&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[3]+4107603335&4294967295,i=o+(s<<14&4294967295|s>>>18),s=n+(o^t&(i^o))+r[8]+1163531501&4294967295,n=i+(s<<20&4294967295|s>>>12),s=t+(i^o&(n^i))+r[13]+2850285829&4294967295,t=n+(s<<5&4294967295|s>>>27),s=o+(n^i&(t^n))+r[2]+4243563512&4294967295,o=t+(s<<9&4294967295|s>>>23),s=i+(t^n&(o^t))+r[7]+1735328473&4294967295,i=o+(s<<14&4294967295|s>>>18),s=n+(o^t&(i^o))+r[12]+2368359562&4294967295,n=i+(s<<20&4294967295|s>>>12),s=t+(n^i^o)+r[5]+4294588738&4294967295,t=n+(s<<4&4294967295|s>>>28),s=o+(t^n^i)+r[8]+2272392833&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[11]+1839030562&4294967295,i=o+(s<<16&4294967295|s>>>16),s=n+(i^o^t)+r[14]+4259657740&4294967295,n=i+(s<<23&4294967295|s>>>9),s=t+(n^i^o)+r[1]+2763975236&4294967295,t=n+(s<<4&4294967295|s>>>28),s=o+(t^n^i)+r[4]+1272893353&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[7]+4139469664&4294967295,i=o+(s<<16&4294967295|s>>>16),s=n+(i^o^t)+r[10]+3200236656&4294967295,n=i+(s<<23&4294967295|s>>>9),s=t+(n^i^o)+r[13]+681279174&4294967295,t=n+(s<<4&4294967295|s>>>28),s=o+(t^n^i)+r[0]+3936430074&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[3]+3572445317&4294967295,i=o+(s<<16&4294967295|s>>>16),s=n+(i^o^t)+r[6]+76029189&4294967295,n=i+(s<<23&4294967295|s>>>9),s=t+(n^i^o)+r[9]+3654602809&4294967295,t=n+(s<<4&4294967295|s>>>28),s=o+(t^n^i)+r[12]+3873151461&4294967295,o=t+(s<<11&4294967295|s>>>21),s=i+(o^t^n)+r[15]+530742520&4294967295,i=o+(s<<16&4294967295|s>>>16),s=n+(i^o^t)+r[2]+3299628645&4294967295,n=i+(s<<23&4294967295|s>>>9),s=t+(i^(n|~o))+r[0]+4096336452&4294967295,t=n+(s<<6&4294967295|s>>>26),s=o+(n^(t|~i))+r[7]+1126891415&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[14]+2878612391&4294967295,i=o+(s<<15&4294967295|s>>>17),s=n+(o^(i|~t))+r[5]+4237533241&4294967295,n=i+(s<<21&4294967295|s>>>11),s=t+(i^(n|~o))+r[12]+1700485571&4294967295,t=n+(s<<6&4294967295|s>>>26),s=o+(n^(t|~i))+r[3]+2399980690&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[10]+4293915773&4294967295,i=o+(s<<15&4294967295|s>>>17),s=n+(o^(i|~t))+r[1]+2240044497&4294967295,n=i+(s<<21&4294967295|s>>>11),s=t+(i^(n|~o))+r[8]+1873313359&4294967295,t=n+(s<<6&4294967295|s>>>26),s=o+(n^(t|~i))+r[15]+4264355552&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[6]+2734768916&4294967295,i=o+(s<<15&4294967295|s>>>17),s=n+(o^(i|~t))+r[13]+1309151649&4294967295,n=i+(s<<21&4294967295|s>>>11),s=t+(i^(n|~o))+r[4]+4149444226&4294967295,t=n+(s<<6&4294967295|s>>>26),s=o+(n^(t|~i))+r[11]+3174756917&4294967295,o=t+(s<<10&4294967295|s>>>22),s=i+(t^(o|~n))+r[2]+718787259&4294967295,i=o+(s<<15&4294967295|s>>>17),s=n+(o^(i|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(i+(s<<21&4294967295|s>>>11))&4294967295,e.g[2]=e.g[2]+i&4294967295,e.g[3]=e.g[3]+o&4294967295}function a(e,t){var n=l;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}function c(e,t){this.h=t;const n=[];let r=!0;for(let i=e.length-1;i>=0;i--){const s=0|e[i];r&&s==t||(n[i]=s,r=!1)}this.g=n}t(s,n),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},s.prototype.v=function(e,t){void 0===t&&(t=e.length);const n=t-this.blockSize,r=this.C;let i=this.h,s=0;for(;s<t;){if(0==i)for(;s<=n;)o(this,e,s),s+=this.blockSize;if("string"===typeof e){for(;s<t;)if(r[i++]=e.charCodeAt(s++),i==this.blockSize){o(this,r),i=0;break}}else for(;s<t;)if(r[i++]=e[s++],i==this.blockSize){o(this,r),i=0;break}}this.h=i,this.o+=t},s.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=8*this.o;for(var n=e.length-8;n<e.length;++n)e[n]=255&t,t/=256;for(this.v(e),e=Array(16),t=0,n=0;n<4;++n)for(let r=0;r<32;r+=8)e[t++]=this.g[n]>>>r&255;return e};var l={};function h(e){return-128<=e&&e<128?a(e,(function(e){return new c([0|e],e<0?-1:0)})):new c([0|e],e<0?-1:0)}function d(e){if(isNaN(e)||!isFinite(e))return p;if(e<0)return _(d(-e));const t=[];let n=1;for(let r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new c(t,0)}function f(e,t){if(0==e.length)throw Error("number format error: empty string");if(t=t||10,t<2||36<t)throw Error("radix out of range: "+t);if("-"==e.charAt(0))return _(f(e.substring(1),t));if(e.indexOf("-")>=0)throw Error('number format error: interior "-" character');const n=d(Math.pow(t,8));let r=p;for(let s=0;s<e.length;s+=8){var i=Math.min(8,e.length-s);const o=parseInt(e.substring(s,s+i),t);i<8?(i=d(Math.pow(t,i)),r=r.j(i).add(d(o))):(r=r.j(n),r=r.add(d(o)))}return r}var p=h(0),g=h(1),m=h(16777216);function y(e){if(0!=e.h)return!1;for(let t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function v(e){return-1==e.h}function _(e){const t=e.g.length,n=[];for(let r=0;r<t;r++)n[r]=~e.g[r];return new c(n,~e.h).add(g)}function w(e,t){return e.add(_(t))}function b(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function E(e,t){this.g=e,this.h=t}function T(e,t){if(y(t))throw Error("division by zero");if(y(e))return new E(p,p);if(v(e))return t=T(_(e),t),new E(_(t.g),_(t.h));if(v(t))return t=T(e,_(t)),new E(_(t.g),t.h);if(e.g.length>30){if(v(e)||v(t))throw Error("slowDivide_ only works with positive integers.");for(var n=g,r=t;r.l(e)<=0;)n=I(n),r=I(r);var i=S(n,1),s=S(r,1);for(r=S(r,2),n=S(n,2);!y(r);){var o=s.add(r);o.l(e)<=0&&(i=i.add(n),s=o),r=S(r,1),n=S(n,1)}return t=w(e,i.j(t)),new E(i,t)}for(i=p;e.l(t)>=0;){for(n=Math.max(1,Math.floor(e.m()/t.m())),r=Math.ceil(Math.log(n)/Math.LN2),r=r<=48?1:Math.pow(2,r-48),s=d(n),o=s.j(t);v(o)||o.l(e)>0;)n-=r,s=d(n),o=s.j(t);y(s)&&(s=g),i=i.add(s),e=w(e,o)}return new E(i,e)}function I(e){const t=e.g.length+1,n=[];for(let r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new c(n,e.h)}function S(e,t){const n=t>>5;t%=32;const r=e.g.length-n,i=[];for(let s=0;s<r;s++)i[s]=t>0?e.i(s+n)>>>t|e.i(s+n+1)<<32-t:e.i(s+n);return new c(i,e.h)}e=c.prototype,e.m=function(){if(v(this))return-_(this).m();let e=0,t=1;for(let n=0;n<this.g.length;n++){const r=this.i(n);e+=(r>=0?r:4294967296+r)*t,t*=4294967296}return e},e.toString=function(e){if(e=e||10,e<2||36<e)throw Error("radix out of range: "+e);if(y(this))return"0";if(v(this))return"-"+_(this).toString(e);const t=d(Math.pow(e,6));var n=this;let r="";for(;;){const i=T(n,t).g;n=w(n,i.j(t));let s=((n.g.length>0?n.g[0]:n.h)>>>0).toString(e);if(n=i,y(n))return s+r;for(;s.length<6;)s="0"+s;r=s+r}},e.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return e=w(this,e),v(e)?-1:y(e)?0:1},e.abs=function(){return v(this)?_(this):this},e.add=function(e){const t=Math.max(this.g.length,e.g.length),n=[];let r=0;for(let i=0;i<=t;i++){let t=r+(65535&this.i(i))+(65535&e.i(i)),s=(t>>>16)+(this.i(i)>>>16)+(e.i(i)>>>16);r=s>>>16,t&=65535,s&=65535,n[i]=s<<16|t}return new c(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(y(this)||y(e))return p;if(v(this))return v(e)?_(this).j(_(e)):_(_(this).j(e));if(v(e))return _(this.j(_(e)));if(this.l(m)<0&&e.l(m)<0)return d(this.m()*e.m());const t=this.g.length+e.g.length,n=[];for(var r=0;r<2*t;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(let t=0;t<e.g.length;t++){const i=this.i(r)>>>16,s=65535&this.i(r),o=e.i(t)>>>16,a=65535&e.i(t);n[2*r+2*t]+=s*a,b(n,2*r+2*t),n[2*r+2*t+1]+=i*a,b(n,2*r+2*t+1),n[2*r+2*t+1]+=s*o,b(n,2*r+2*t+1),n[2*r+2*t+2]+=i*o,b(n,2*r+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new c(n,0)},e.B=function(e){return T(this,e).h},e.and=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new c(n,this.h&e.h)},e.or=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new c(n,this.h|e.h)},e.xor=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new c(n,this.h^e.h)},s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,i=u.Md5=s,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.B,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=d,c.fromString=f,r=u.Integer=c}).apply("undefined"!==typeof c?c:"undefined"!==typeof self?self:"undefined"!==typeof window?window:{});var l,h,d,f,p,g,m,y,v=n(6189),_="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:{},w={};(function(){var e,t=Object.defineProperty;function n(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof _&&_];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}var r=n(this);function i(e,n){if(n)e:{var i=r;e=e.split(".");for(var s=0;s<e.length-1;s++){var o=e[s];if(!(o in i))break e;i=i[o]}e=e[e.length-1],s=i[e],n=n(s),n!=s&&null!=n&&t(i,e,{configurable:!0,writable:!0,value:n})}}i("Symbol.dispose",(function(e){return e||Symbol("Symbol.dispose")})),i("Array.prototype.values",(function(e){return e||function(){return this[Symbol.iterator]()}})),i("Object.entries",(function(e){return e||function(e){var t,n=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.push([t,e[t]]);return n}}));
/** @license
      Copyright The Closure Library Authors.
      SPDX-License-Identifier: Apache-2.0
      */
var s=s||{},o=this||self;function a(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function c(e,t,n){return e.call.apply(e.bind,arguments)}function u(e,t,n){return u=c,u.apply(null,arguments)}function v(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function b(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Ob=function(e,n,r){for(var i=Array(arguments.length-2),s=2;s<arguments.length;s++)i[s-2]=arguments[s];return t.prototype[n].apply(e,i)}}var T="undefined"!==typeof AsyncContext&&"function"===typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function I(e){const t=e.length;if(t>0){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function S(e,t){for(let r=1;r<arguments.length;r++){const t=arguments[r];var n=typeof t;if(n="object"!=n?n:t?Array.isArray(t)?"array":n:"null","array"==n||"object"==n&&"number"==typeof t.length){n=e.length||0;const r=t.length||0;e.length=n+r;for(let i=0;i<r;i++)e[n+i]=t[i]}else e.push(t)}}class C{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function A(e){o.setTimeout((()=>{throw e}),0)}function k(){var e=P;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}class R{constructor(){this.h=this.g=null}add(e,t){const n=O.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}}var O=new C((()=>new N),(e=>e.reset()));class N{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let D,x=!1,P=new R,L=()=>{const e=Promise.resolve(void 0);D=()=>{e.then(M)}};function M(){for(var e;e=k();){try{e.h.call(e.g)}catch(n){A(n)}var t=O;t.j(e),t.h<100&&(t.h++,e.next=t.g,t.g=e)}x=!1}function U(){this.u=this.u,this.C=this.C}function V(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}U.prototype.u=!1,U.prototype.dispose=function(){this.u||(this.u=!0,this.N())},U.prototype[Symbol.dispose]=function(){this.dispose()},U.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},V.prototype.h=function(){this.defaultPrevented=!0};var F=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};o.addEventListener("test",e,t),o.removeEventListener("test",e,t)}catch(n){}return e}();function j(e){return/^[\s\xa0]*$/.test(e)}function B(e,t){V.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,t)}b(B,V),B.prototype.init=function(e,t){const n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget,t||("mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement)),this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&B.Z.h.call(this)},B.prototype.h=function(){B.Z.h.call(this);const e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var $="closure_listenable_"+(1e6*Math.random()|0),q=0;function z(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=i,this.key=++q,this.da=this.fa=!1}function H(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function K(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function G(e,t){for(const n in e)t.call(void 0,e[n],n,e)}function W(e){const t={};for(const n in e)t[n]=e[n];return t}const Q="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function X(e,t){let n,r;for(let i=1;i<arguments.length;i++){for(n in r=arguments[i],r)e[n]=r[n];for(let t=0;t<Q.length;t++)n=Q[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function J(e){this.src=e,this.g={},this.h=0}function Y(e,t){const n=t.type;if(n in e.g){var r,i=e.g[n],s=Array.prototype.indexOf.call(i,t,void 0);(r=s>=0)&&Array.prototype.splice.call(i,s,1),r&&(H(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function Z(e,t,n,r){for(let i=0;i<e.length;++i){const s=e[i];if(!s.da&&s.listener==t&&s.capture==!!n&&s.ha==r)return i}return-1}J.prototype.add=function(e,t,n,r,i){const s=e.toString();e=this.g[s],e||(e=this.g[s]=[],this.h++);const o=Z(e,t,r,i);return o>-1?(t=e[o],n||(t.fa=!1)):(t=new z(t,this.src,s,!!r,i),t.fa=n,e.push(t)),t};var ee="closure_lm_"+(1e6*Math.random()|0),te={};function re(e,t,n,r,i){if(r&&r.once)return oe(e,t,n,r,i);if(Array.isArray(t)){for(let s=0;s<t.length;s++)re(e,t[s],n,r,i);return null}return n=fe(n),e&&e[$]?e.J(t,n,a(r)?!!r.capture:!!r,i):ie(e,t,n,!1,r,i)}function ie(e,t,n,r,i,s){if(!t)throw Error("Invalid event type");const o=a(i)?!!i.capture:!!i;let c=he(e);if(c||(e[ee]=c=new J(e)),n=c.add(t,n,r,o,s),n.proxy)return n;if(r=se(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)F||(i=o),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(ue(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}function se(){function e(n){return t.call(e.src,e.listener,n)}const t=le;return e}function oe(e,t,n,r,i){if(Array.isArray(t)){for(let s=0;s<t.length;s++)oe(e,t[s],n,r,i);return null}return n=fe(n),e&&e[$]?e.K(t,n,a(r)?!!r.capture:!!r,i):ie(e,t,n,!0,r,i)}function ae(e,t,n,r,i){if(Array.isArray(t))for(var s=0;s<t.length;s++)ae(e,t[s],n,r,i);else r=a(r)?!!r.capture:!!r,n=fe(n),e&&e[$]?(e=e.i,s=String(t).toString(),s in e.g&&(t=e.g[s],n=Z(t,n,r,i),n>-1&&(H(t[n]),Array.prototype.splice.call(t,n,1),0==t.length&&(delete e.g[s],e.h--)))):e&&(e=he(e))&&(t=e.g[t.toString()],e=-1,t&&(e=Z(t,n,r,i)),(n=e>-1?t[e]:null)&&ce(n))}function ce(e){if("number"!==typeof e&&e&&!e.da){var t=e.src;if(t&&t[$])Y(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(ue(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=he(t))?(Y(n,e),0==n.h&&(n.src=null,t[ee]=null)):H(e)}}}function ue(e){return e in te?te[e]:te[e]="on"+e}function le(e,t){if(e.da)e=!0;else{t=new B(t,this);const n=e.listener,r=e.ha||e.src;e.fa&&ce(e),e=n.call(r,t)}return e}function he(e){return e=e[ee],e instanceof J?e:null}var de="__closure_events_fn_"+(1e9*Math.random()>>>0);function fe(e){return"function"===typeof e?e:(e[de]||(e[de]=function(t){return e.handleEvent(t)}),e[de])}function pe(){U.call(this),this.i=new J(this),this.M=this,this.G=null}function ge(e,t){var n,r=e.G;if(r)for(n=[];r;r=r.G)n.push(r);if(e=e.M,r=t.type||t,"string"===typeof t)t=new V(t,e);else if(t instanceof V)t.target=t.target||e;else{var i=t;t=new V(r,e),X(t,i)}let s,o;if(i=!0,n)for(o=n.length-1;o>=0;o--)s=t.g=n[o],i=me(s,r,!0,t)&&i;if(s=t.g=e,i=me(s,r,!0,t)&&i,i=me(s,r,!1,t)&&i,n)for(o=0;o<n.length;o++)s=t.g=n[o],i=me(s,r,!1,t)&&i}function me(e,t,n,r){if(t=e.i.g[String(t)],!t)return!0;t=t.concat();let i=!0;for(let s=0;s<t.length;++s){const o=t[s];if(o&&!o.da&&o.capture==n){const t=o.listener,n=o.ha||o.src;o.fa&&Y(e.i,o),i=!1!==t.call(n,r)&&i}}return i&&!r.defaultPrevented}function ye(e,t){if("function"!==typeof e){if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=u(e.handleEvent,e)}return Number(t)>2147483647?-1:o.setTimeout(e,t||0)}function ve(e){e.g=ye((()=>{e.g=null,e.i&&(e.i=!1,ve(e))}),e.l);const t=e.h;e.h=null,e.m.apply(null,t)}b(pe,U),pe.prototype[$]=!0,pe.prototype.removeEventListener=function(e,t,n,r){ae(this,e,t,n,r)},pe.prototype.N=function(){if(pe.Z.N.call(this),this.i){var e=this.i;for(const t in e.g){const n=e.g[t];for(let e=0;e<n.length;e++)H(n[e]);delete e.g[t],e.h--}}this.G=null},pe.prototype.J=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},pe.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};class _e extends U{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:ve(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function we(e){U.call(this),this.h=e,this.g={}}b(we,U);var be=[];function Ee(e){K(e.g,(function(e,t){this.g.hasOwnProperty(t)&&ce(e)}),e),e.g={}}we.prototype.N=function(){we.Z.N.call(this),Ee(this)},we.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Te=o.JSON.stringify,Ie=o.JSON.parse,Se=class{stringify(e){return o.JSON.stringify(e,void 0)}parse(e){return o.JSON.parse(e,void 0)}};function Ce(){}function Ae(){}var ke={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Re(){V.call(this,"d")}function Oe(){V.call(this,"c")}b(Re,V),b(Oe,V);var Ne={},De=null;function xe(){return De=De||new pe}function Pe(e){V.call(this,Ne.Ia,e)}function Le(e){const t=xe();ge(t,new Pe(t))}function Me(e,t){V.call(this,Ne.STAT_EVENT,e),this.stat=t}function Ue(e){const t=xe();ge(t,new Me(t,e))}function Ve(e,t){V.call(this,Ne.Ja,e),this.size=t}function Fe(e,t){if("function"!==typeof e)throw Error("Fn must not be null and must be a function");return o.setTimeout((function(){e()}),t)}function je(){this.g=!0}function Be(e,t,n,r,i,s){e.info((function(){if(e.g)if(s){var o="",a=s.split("&");for(let e=0;e<a.length;e++){var c=a[e].split("=");if(c.length>1){const e=c[0];c=c[1];const t=e.split("_");o=t.length>=2&&"type"==t[1]?o+(e+"=")+c+"&":o+(e+"=redacted&")}}}else o=null;else o=s;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o}))}function $e(e,t,n,r,i,s,o){e.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+s+" "+o}))}function qe(e,t,n,r){e.info((function(){return"XMLHTTP TEXT ("+t+"): "+He(e,n)+(r?" "+r:"")}))}function ze(e,t){e.info((function(){return"TIMEOUT: "+t}))}function He(e,t){if(!e.g)return t;if(!t)return null;try{const s=JSON.parse(t);if(s)for(e=0;e<s.length;e++)if(Array.isArray(s[e])){var n=s[e];if(!(n.length<2)){var r=n[1];if(Array.isArray(r)&&!(r.length<1)){var i=r[0];if("noop"!=i&&"stop"!=i&&"close"!=i)for(let e=1;e<r.length;e++)r[e]=""}}}return Te(s)}catch(s){return t}}Ne.Ia="serverreachability",b(Pe,V),Ne.STAT_EVENT="statevent",b(Me,V),Ne.Ja="timingevent",b(Ve,V),je.prototype.ua=function(){this.g=!1},je.prototype.info=function(){};var Ke,Ge={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},We={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function Qe(){}function Xe(e){return encodeURIComponent(String(e))}function Je(e){var t=1;e=e.split(":");const n=[];for(;t>0&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function Ye(e,t,n,r){this.j=e,this.i=t,this.l=n,this.S=r||1,this.V=new we(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ze}function Ze(){this.i=null,this.g="",this.h=!1}b(Qe,Ce),Qe.prototype.g=function(){return new XMLHttpRequest},Ke=new Qe;var et={},tt={};function nt(e,t,n){e.M=1,e.A=Rt(It(t)),e.u=n,e.R=!0,rt(e,null)}function rt(e,t){e.F=Date.now(),at(e),e.B=It(e.A);var n=e.B,r=e.S;Array.isArray(r)||(r=[String(r)]),qt(n.i,"t",r),e.C=0,n=e.j.L,e.h=new Ze,e.g=Ln(e.j,n?t:null,!e.u),e.P>0&&(e.O=new _e(u(e.Y,e,e.g),e.P)),t=e.V,n=e.g,r=e.ba;var i="readystatechange";Array.isArray(i)||(i&&(be[0]=i.toString()),i=be);for(let s=0;s<i.length;s++){const e=re(n,i[s],r||t.handleEvent,!1,t.h||t);if(!e)break;t.g[e.key]=e}t=e.J?W(e.J):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,t)):(e.v="GET",e.g.ea(e.B,e.v,null,t)),Le(),Be(e.i,e.v,e.B,e.l,e.S,e.u)}function it(e){if(!st(e))return e.g.la();const t=fn(e.g);if(""===t)return"";let n="";const r=t.length,i=4==dn(e.g);if(!e.h.i){if("undefined"===typeof TextDecoder)return ht(e),lt(e),"";e.h.i=new o.TextDecoder}for(let s=0;s<r;s++)e.h.h=!0,n+=e.h.i.decode(t[s],{stream:!(i&&s==r-1)});return t.length=0,e.h.g+=n,e.C=0,e.h.g}function st(e){return!!e.g&&("GET"==e.v&&2!=e.M&&e.j.Aa)}function ot(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?tt:(n=Number(t.substring(n,r)),isNaN(n)?et:(r+=1,r+n>t.length?tt:(t=t.slice(r,r+n),e.C=r+n,t)))}function at(e){e.T=Date.now()+e.H,ct(e,e.H)}function ct(e,t){if(null!=e.D)throw Error("WatchDog timer not null");e.D=Fe(u(e.aa,e),t)}function ut(e){e.D&&(o.clearTimeout(e.D),e.D=null)}function lt(e){0==e.j.I||e.K||On(e.j,e)}function ht(e){ut(e);var t=e.O;t&&"function"==typeof t.dispose&&t.dispose(),e.O=null,Ee(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function dt(e,t){try{var n=e.j;if(0!=n.I&&(n.g==e||yt(n.h,e)))if(!e.L&&yt(n.h,e)&&3==n.I){try{var r=n.Ba.g.parse(t)}catch(l){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.v){if(n.g){if(!(n.g.F+3e3<e.F))break e;Rn(n),vn(n)}Cn(n),Ue(18)}}else n.xa=i[1],0<n.xa-n.K&&i[2]<37500&&n.F&&0==n.A&&!n.C&&(n.C=Fe(u(n.Va,n),6e3));mt(n.h)<=1&&n.ta&&(n.ta=void 0)}else Dn(n,11)}else if((e.L||n.g==e)&&Rn(n),!j(t))for(i=n.Ba.g.parse(t),t=0;t<i.length;t++){let u=i[t];const l=u[0];if(!(l<=n.K))if(n.K=l,u=u[1],2==n.I)if("c"==u[0]){n.M=u[1],n.ba=u[2];const t=u[3];null!=t&&(n.ka=t,n.j.info("VER="+n.ka));const i=u[4];null!=i&&(n.za=i,n.j.info("SVER="+n.za));const l=u[5];null!=l&&"number"===typeof l&&l>0&&(r=1.5*l,n.O=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var s=r.h;s.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(s.j=s.l,s.g=new Set,s.h&&(vt(s,s.h),s.h=null))}if(r.G){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.wa=e,kt(r.J,r.G,e))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-e.F,n.j.info("Handshake RTT: "+n.T+"ms")),r=n;var o=e;if(r.na=Pn(r,r.L?r.ba:null,r.W),o.L){_t(r.h,o);var a=o,c=r.O;c&&(a.H=c),a.D&&(ut(a),at(a)),r.g=o}else Sn(r);n.i.length>0&&wn(n)}else"stop"!=u[0]&&"close"!=u[0]||Dn(n,7);else 3==n.I&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?Dn(n,7):yn(n):"noop"!=u[0]&&n.l&&n.l.qa(u),n.A=0)}Le(4)}catch(l){}}Ye.prototype.ba=function(e){e=e.target;const t=this.O;t&&3==dn(e)?t.j():this.Y(e)},Ye.prototype.Y=function(e){try{if(e==this.g)e:{const a=dn(this.g),c=this.g.ya(),u=this.g.ca();if(!(a<3)&&(3!=a||this.g&&(this.h.h||this.g.la()||fn(this.g)))){this.K||4!=a||7==c||Le(8==c||u<=0?3:2),ut(this);var t=this.g.ca();this.X=t;var n=it(this);if(this.o=200==t,$e(this.i,this.v,this.B,this.l,this.S,a,t),this.o){if(this.U&&!this.L){t:{if(this.g){var r,i=this.g;if((r=i.g?i.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(r)){var s=r;break t}}s=null}if(!(e=s)){this.o=!1,this.m=3,Ue(12),ht(this),lt(this);break e}qe(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,dt(this,e)}if(this.R){let t;for(e=!0;!this.K&&this.C<n.length;){if(t=ot(this,n),t==tt){4==a&&(this.m=4,Ue(14),e=!1),qe(this.i,this.l,null,"[Incomplete Response]");break}if(t==et){this.m=4,Ue(15),qe(this.i,this.l,n,"[Invalid Chunk]"),e=!1;break}qe(this.i,this.l,t,null),dt(this,t)}if(st(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=a||0!=n.length||this.h.h||(this.m=1,Ue(16),e=!1),this.o=this.o&&e,e){if(n.length>0&&!this.W){this.W=!0;var o=this.j;o.g==this&&o.aa&&!o.P&&(o.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),An(o),o.P=!0,Ue(11))}}else qe(this.i,this.l,n,"[Invalid Chunked Response]"),ht(this),lt(this)}else qe(this.i,this.l,n,null),dt(this,n);4==a&&ht(this),this.o&&!this.K&&(4==a?On(this.j,this):(this.o=!1,at(this)))}else pn(this.g),400==t&&n.indexOf("Unknown SID")>0?(this.m=3,Ue(12)):(this.m=0,Ue(13)),ht(this),lt(this)}}}catch(a){}},Ye.prototype.cancel=function(){this.K=!0,ht(this)},Ye.prototype.aa=function(){this.D=null;const e=Date.now();e-this.T>=0?(ze(this.i,this.B),2!=this.M&&(Le(),Ue(17)),ht(this),this.m=2,lt(this)):ct(this,this.T-e)};var ft=class{constructor(e,t){this.g=e,this.map=t}};function pt(e){this.l=e||10,o.PerformanceNavigationTiming?(e=o.performance.getEntriesByType("navigation"),e=e.length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol)):e=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function gt(e){return!!e.h||!!e.g&&e.g.size>=e.j}function mt(e){return e.h?1:e.g?e.g.size:0}function yt(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function vt(e,t){e.g?e.g.add(t):e.h=t}function _t(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function wt(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.G);return t}return I(e.i)}pt.prototype.cancel=function(){if(this.i=wt(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var bt=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Et(e,t){if(e){e=e.split("&");for(let n=0;n<e.length;n++){const r=e[n].indexOf("=");let i,s=null;r>=0?(i=e[n].substring(0,r),s=e[n].substring(r+1)):i=e[n],t(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function Tt(e){let t;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof Tt?(this.l=e.l,St(this,e.j),this.o=e.o,this.g=e.g,Ct(this,e.u),this.h=e.h,At(this,zt(e.i)),this.m=e.m):e&&(t=String(e).match(bt))?(this.l=!1,St(this,t[1]||"",!0),this.o=Ot(t[2]||""),this.g=Ot(t[3]||"",!0),Ct(this,t[4]),this.h=Ot(t[5]||"",!0),At(this,t[6]||"",!0),this.m=Ot(t[7]||"")):(this.l=!1,this.i=new Vt(null,this.l))}function It(e){return new Tt(e)}function St(e,t,n){e.j=n?Ot(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function Ct(e,t){if(t){if(t=Number(t),isNaN(t)||t<0)throw Error("Bad port number "+t);e.u=t}else e.u=null}function At(e,t,n){t instanceof Vt?(e.i=t,Kt(e.i,e.l)):(n||(t=Nt(t,Mt)),e.i=new Vt(t,e.l))}function kt(e,t,n){e.i.set(t,n)}function Rt(e){return kt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function Ot(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function Nt(e,t,n){return"string"===typeof e?(e=encodeURI(e).replace(t,Dt),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function Dt(e){return e=e.charCodeAt(0),"%"+(e>>4&15).toString(16)+(15&e).toString(16)}Tt.prototype.toString=function(){const e=[];var t=this.j;t&&e.push(Nt(t,xt,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(Nt(t,xt,!0),"@"),e.push(Xe(n).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.u,null!=n&&e.push(":",String(n))),(n=this.h)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(Nt(n,"/"==n.charAt(0)?Lt:Pt,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",Nt(n,Ut)),e.join("")},Tt.prototype.resolve=function(e){const t=It(this);let n=!!e.j;n?St(t,e.j):n=!!e.o,n?t.o=e.o:n=!!e.g,n?t.g=e.g:n=null!=e.u;var r=e.h;if(n)Ct(t,e.u);else if(n=!!e.h){if("/"!=r.charAt(0))if(this.g&&!this.h)r="/"+r;else{var i=t.h.lastIndexOf("/");-1!=i&&(r=t.h.slice(0,i+1)+r)}if(i=r,".."==i||"."==i)r="";else if(-1!=i.indexOf("./")||-1!=i.indexOf("/.")){r=0==i.lastIndexOf("/",0),i=i.split("/");const e=[];for(let t=0;t<i.length;){const n=i[t++];"."==n?r&&t==i.length&&e.push(""):".."==n?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),r&&t==i.length&&e.push("")):(e.push(n),r=!0)}r=e.join("/")}else r=i}return n?t.h=r:n=""!==e.i.toString(),n?At(t,zt(e.i)):n=!!e.m,n&&(t.m=e.m),t};var xt=/[#\/\?@]/g,Pt=/[#\?:]/g,Lt=/[#\?]/g,Mt=/[#\?@]/g,Ut=/#/g;function Vt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function Ft(e){e.g||(e.g=new Map,e.h=0,e.i&&Et(e.i,(function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)})))}function jt(e,t){Ft(e),t=Ht(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function Bt(e,t){return Ft(e),t=Ht(e,t),e.g.has(t)}function $t(e,t){Ft(e);let n=[];if("string"===typeof t)Bt(e,t)&&(n=n.concat(e.g.get(Ht(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)n=n.concat(e[t]);return n}function qt(e,t,n){jt(e,t),n.length>0&&(e.i=null,e.g.set(Ht(e,t),I(n)),e.h+=n.length)}function zt(e){const t=new Vt;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function Ht(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function Kt(e,t){t&&!e.j&&(Ft(e),e.i=null,e.g.forEach((function(e,t){const n=t.toLowerCase();t!=n&&(jt(this,t),qt(this,n,e))}),e)),e.j=t}function Gt(e,t){const n=new je;if(o.Image){const r=new Image;r.onload=v(Qt,n,"TestLoadImage: loaded",!0,t,r),r.onerror=v(Qt,n,"TestLoadImage: error",!1,t,r),r.onabort=v(Qt,n,"TestLoadImage: abort",!1,t,r),r.ontimeout=v(Qt,n,"TestLoadImage: timeout",!1,t,r),o.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=e}else t(!1)}function Wt(e,t){const n=new je,r=new AbortController,i=setTimeout((()=>{r.abort(),Qt(n,"TestPingServer: timeout",!1,t)}),1e4);fetch(e,{signal:r.signal}).then((e=>{clearTimeout(i),e.ok?Qt(n,"TestPingServer: ok",!0,t):Qt(n,"TestPingServer: server error",!1,t)})).catch((()=>{clearTimeout(i),Qt(n,"TestPingServer: error",!1,t)}))}function Qt(e,t,n,r,i){try{i&&(i.onload=null,i.onerror=null,i.onabort=null,i.ontimeout=null),r(n)}catch(s){}}function Xt(){this.g=new Se}function Jt(e){this.i=e.Sb||null,this.h=e.ab||!1}function Yt(e,t){pe.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function Zt(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function en(e){e.readyState=4,e.l=null,e.j=null,e.B=null,tn(e)}function tn(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function nn(e){let t="";return K(e,(function(e,n){t+=n,t+=":",t+=e,t+="\r\n"})),t}function rn(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=nn(n),"string"===typeof e?null!=n&&Xe(n):kt(e,t,n))}function sn(e){pe.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}e=Vt.prototype,e.add=function(e,t){Ft(this),this.i=null,e=Ht(this,e);let n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){Ft(this),this.g.forEach((function(n,r){n.forEach((function(n){e.call(t,n,r,this)}),this)}),this)},e.set=function(e,t){return Ft(this),this.i=null,e=Ht(this,e),Bt(this,e)&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e?(e=$t(this,e),e.length>0?String(e[0]):t):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(let r=0;r<t.length;r++){var n=t[r];const i=Xe(n);n=$t(this,n);for(let t=0;t<n.length;t++){let r=i;""!==n[t]&&(r+="="+Xe(n[t])),e.push(r)}}return this.i=e.join("&")},b(Jt,Ce),Jt.prototype.g=function(){return new Yt(this.i,this.h)},b(Yt,pe),e=Yt.prototype,e.open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=t,this.readyState=1,tn(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||o).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch((()=>{})),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,en(this)),this.readyState=0},e.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,tn(this)),this.g&&(this.readyState=3,tn(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if("undefined"!==typeof o.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Zt(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))},e.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?en(this):tn(this),3==this.readyState&&Zt(this)}},e.Oa=function(e){this.g&&(this.response=this.responseText=e,en(this))},e.Na=function(e){this.g&&(this.response=e,en(this))},e.ga=function(){this.g&&en(this)},e.setRequestHeader=function(e,t){this.A.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(Yt.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),b(sn,pe);var on=/^https?$/i,an=["POST","PUT"];function cn(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,un(e),hn(e)}function un(e){e.A||(e.A=!0,ge(e,"complete"),ge(e,"error"))}function ln(e){if(e.h&&"undefined"!=typeof s)if(e.v&&4==dn(e))setTimeout(e.Ca.bind(e),0);else if(ge(e,"readystatechange"),4==dn(e)){e.h=!1;try{const s=e.ca();e:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===s){let t=String(e.D).match(bt)[1]||null;!t&&o.self&&o.self.location&&(t=o.self.location.protocol.slice(0,-1)),r=!on.test(t?t.toLowerCase():"")}n=r}if(n)ge(e,"complete"),ge(e,"success");else{e.o=6;try{var i=dn(e)>2?e.g.statusText:""}catch(a){i=""}e.l=i+" ["+e.ca()+"]",un(e)}}finally{hn(e)}}}function hn(e,t){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);const r=e.g;e.g=null,t||ge(e,"ready");try{r.onreadystatechange=null}catch(n){}}}function dn(e){return e.g?e.g.readyState:0}function fn(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(E){return null}}function pn(e){const t={};e=(e.g&&dn(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(j(e[r]))continue;var n=Je(e[r]);const i=n[0];if(n=n[1],"string"!==typeof n)continue;n=n.trim();const s=t[i]||[];t[i]=s,s.push(n)}G(t,(function(e){return e.join(", ")}))}function gn(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function mn(e){this.za=0,this.i=[],this.j=new je,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=gn("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=gn("baseRetryDelayMs",5e3,e),this.Za=gn("retryDelaySeedMs",1e4,e),this.Ta=gn("forwardChannelMaxRetries",2,e),this.va=gn("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new pt(e&&e.concurrentRequestLimit),this.Ba=new Xt,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function yn(e){if(_n(e),3==e.I){var t=e.V++,n=It(e.J);if(kt(n,"SID",e.M),kt(n,"RID",t),kt(n,"TYPE","terminate"),Tn(e,n),t=new Ye(e,e.j,t),t.M=2,t.A=Rt(It(n)),n=!1,o.navigator&&o.navigator.sendBeacon)try{n=o.navigator.sendBeacon(t.A.toString(),"")}catch(r){}!n&&o.Image&&((new Image).src=t.A,n=!0),n||(t.g=Ln(t.j,null),t.g.ea(t.A)),t.F=Date.now(),at(t)}xn(e)}function vn(e){e.g&&(An(e),e.g.cancel(),e.g=null)}function _n(e){vn(e),e.v&&(o.clearTimeout(e.v),e.v=null),Rn(e),e.h.cancel(),e.m&&("number"===typeof e.m&&o.clearTimeout(e.m),e.m=null)}function wn(e){if(!gt(e.h)&&!e.m){e.m=!0;var t=e.Ea;D||L(),x||(D(),x=!0),P.add(t,e),e.D=0}}function bn(e,t){return!(mt(e.h)>=e.h.j-(e.m?1:0))&&(e.m?(e.i=t.G.concat(e.i),!0):!(1==e.I||2==e.I||e.D>=(e.Sa?0:e.Ta))&&(e.m=Fe(u(e.Ea,e,t),Nn(e,e.D)),e.D++,!0))}function En(e,t){var n;n=t?t.l:e.V++;const r=It(e.J);kt(r,"SID",e.M),kt(r,"RID",n),kt(r,"AID",e.K),Tn(e,r),e.u&&e.o&&rn(r,e.u,e.o),n=new Ye(e,e.j,n,e.D+1),null===e.u&&(n.J=e.o),t&&(e.i=t.G.concat(e.i)),t=In(e,n,1e3),n.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),vt(e.h,n),nt(n,r,t)}function Tn(e,t){e.H&&K(e.H,(function(e,n){kt(t,n,e)})),e.l&&K({},(function(e,n){kt(t,n,e)}))}function In(e,t,n){n=Math.min(e.i.length,n);const r=e.l?u(e.l.Ka,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?n>0?(t=i[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let c=!0;for(let u=0;u<n;u++){var s=i[u].g;const n=i[u].map;if(s-=t,s<0)t=Math.max(0,i[u].g-100),c=!1;else try{s="req"+s+"_"||0;try{var o=n instanceof Map?n:Object.entries(n);for(const[t,n]of o){let r=n;a(n)&&(r=Te(n)),e.push(s+t+"="+encodeURIComponent(r))}}catch(ne){throw e.push(s+"type="+encodeURIComponent("_badmap")),ne}}catch(ne){r&&r(n)}}if(c){o=e.join("&");break e}}o=void 0}return e=e.i.splice(0,n),t.G=e,o}function Sn(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;D||L(),x||(D(),x=!0),P.add(t,e),e.A=0}}function Cn(e){return!(e.g||e.v||e.A>=3)&&(e.Y++,e.v=Fe(u(e.Da,e),Nn(e,e.A)),e.A++,!0)}function An(e){null!=e.B&&(o.clearTimeout(e.B),e.B=null)}function kn(e){e.g=new Ye(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var t=It(e.na);kt(t,"RID","rpc"),kt(t,"SID",e.M),kt(t,"AID",e.K),kt(t,"CI",e.F?"0":"1"),!e.F&&e.ia&&kt(t,"TO",e.ia),kt(t,"TYPE","xmlhttp"),Tn(e,t),e.u&&e.o&&rn(t,e.u,e.o),e.O&&(e.g.H=e.O);var n=e.g;e=e.ba,n.M=1,n.A=Rt(It(t)),n.u=null,n.R=!0,rt(n,e)}function Rn(e){null!=e.C&&(o.clearTimeout(e.C),e.C=null)}function On(e,t){var n=null;if(e.g==t){Rn(e),An(e),e.g=null;var r=2}else{if(!yt(e.h,t))return;n=t.G,_t(e.h,t),r=1}if(0!=e.I)if(t.o)if(1==r){n=t.u?t.u.length:0,t=Date.now()-t.F;var i=e.D;r=xe(),ge(r,new Ve(r,n)),wn(e)}else Sn(e);else if(i=t.m,3==i||0==i&&t.X>0||!(1==r&&bn(e,t)||2==r&&Cn(e)))switch(n&&n.length>0&&(t=e.h,t.i=t.i.concat(n)),i){case 1:Dn(e,5);break;case 4:Dn(e,10);break;case 3:Dn(e,6);break;default:Dn(e,2)}}function Nn(e,t){let n=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(n*=2),n*t}function Dn(e,t){if(e.j.info("Error code "+t),2==t){var n=u(e.bb,e),r=e.Ua;const t=!r;r=new Tt(r||"//www.google.com/images/cleardot.gif"),o.location&&"http"==o.location.protocol||St(r,"https"),Rt(r),t?Gt(r.toString(),n):Wt(r.toString(),n)}else Ue(2);e.I=0,e.l&&e.l.pa(t),xn(e),_n(e)}function xn(e){if(e.I=0,e.ja=[],e.l){const t=wt(e.h);0==t.length&&0==e.i.length||(S(e.ja,t),S(e.ja,e.i),e.h.i.length=0,I(e.i),e.i.length=0),e.l.oa()}}function Pn(e,t,n){var r=n instanceof Tt?It(n):new Tt(n);if(""!=r.g)t&&(r.g=t+"."+r.g),Ct(r,r.u);else{var i=o.location;r=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;const e=new Tt(null);r&&St(e,r),t&&(e.g=t),i&&Ct(e,i),n&&(e.h=n),r=e}return n=e.G,t=e.wa,n&&t&&kt(r,n,t),kt(r,"VER",e.ka),Tn(e,r),r}function Ln(e,t,n){if(t&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return t=e.Aa&&!e.ma?new sn(new Jt({ab:n})):new sn(e.ma),t.Fa(e.L),t}function Mn(){}function Un(){}function Vn(e,t){pe.call(this),this.g=new mn(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e["X-WebChannel-Client-Profile"]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!j(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!j(t)&&(this.g.G=t,e=this.h,null!==e&&t in e&&(e=this.h,t in e&&delete e[t])),this.j=new Bn(this)}function Fn(e){Re.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function jn(){Oe.call(this),this.status=1}function Bn(e){this.g=e}e=sn.prototype,e.Fa=function(e){this.H=e},e.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ke.g(),this.g.onreadystatechange=T(u(this.Ca,this));try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(s){return void cn(this,s)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else{if("function"!==typeof r.keys||"function"!==typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find((e=>"content-type"==e.toLowerCase())),i=o.FormData&&e instanceof o.FormData,!(Array.prototype.indexOf.call(an,t,void 0)>=0)||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[o,a]of n)this.g.setRequestHeader(o,a);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(e),this.v=!1}catch(s){cn(this,s)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,ge(this,"complete"),ge(this,"abort"),hn(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),hn(this,!0)),sn.Z.N.call(this)},e.Ca=function(){this.u||(this.B||this.v||this.j?ln(this):this.Xa())},e.Xa=function(){ln(this)},e.isActive=function(){return!!this.g},e.ca=function(){try{return dn(this)>2?this.g.status:-1}catch(e){return-1}},e.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.La=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),Ie(t)}},e.ya=function(){return this.o},e.Ha=function(){return"string"===typeof this.l?this.l:String(this.l)},e=mn.prototype,e.ka=8,e.I=1,e.connect=function(e,t,n,r){Ue(0),this.W=e,this.H=t||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.J=Pn(this,null,this.W),wn(this)},e.Ea=function(e){if(this.m)if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const i=new Ye(this,this.j,e);let s=this.o;if(this.U&&(s?(s=W(s),X(s,this.U)):s=this.U),null!==this.u||this.R||(i.J=s,s=null),this.S)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(r="__data__"in r.map&&(r=r.map.__data__,"string"===typeof r)?r.length:void 0,void 0===r)break;if(t+=r,t>4096){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=In(this,i,t),n=It(this.J),kt(n,"RID",e),kt(n,"CVER",22),this.G&&kt(n,"X-HTTP-Session-Id",this.G),Tn(this,n),s&&(this.R?t="headers="+Xe(nn(s))+"&"+t:this.u&&rn(n,this.u,s)),vt(this.h,i),this.Ra&&kt(n,"TYPE","init"),this.S?(kt(n,"$req",t),kt(n,"SID","null"),i.U=!0,nt(i,n,null)):nt(i,n,t),this.I=2}}else 3==this.I&&(e?En(this,e):0==this.i.length||gt(this.h)||En(this))},e.Da=function(){if(this.v=null,kn(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=Fe(u(this.Wa,this),e)}},e.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ue(10),vn(this),kn(this))},e.Va=function(){null!=this.C&&(this.C=null,vn(this),Cn(this),Ue(19))},e.bb=function(e){e?(this.j.info("Successfully pinged google.com"),Ue(2)):(this.j.info("Failed to ping google.com"),Ue(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},e=Mn.prototype,e.ra=function(){},e.qa=function(){},e.pa=function(){},e.oa=function(){},e.isActive=function(){return!0},e.Ka=function(){},Un.prototype.g=function(e,t){return new Vn(e,t)},b(Vn,pe),Vn.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Vn.prototype.close=function(){yn(this.g)},Vn.prototype.o=function(e){var t=this.g;if("string"===typeof e){var n={};n.__data__=e,e=n}else this.v&&(n={},n.__data__=Te(e),e=n);t.i.push(new ft(t.Ya++,e)),3==t.I&&wn(t)},Vn.prototype.N=function(){this.g.l=null,delete this.j,yn(this.g),delete this.g,Vn.Z.N.call(this)},b(Fn,Re),b(jn,Oe),b(Bn,Mn),Bn.prototype.ra=function(){ge(this.g,"a")},Bn.prototype.qa=function(e){ge(this.g,new Fn(e))},Bn.prototype.pa=function(e){ge(this.g,new jn)},Bn.prototype.oa=function(){ge(this.g,"b")},Un.prototype.createWebChannel=Un.prototype.g,Vn.prototype.send=Vn.prototype.o,Vn.prototype.open=Vn.prototype.m,Vn.prototype.close=Vn.prototype.close,y=w.createWebChannelTransport=function(){return new Un},m=w.getStatEventTarget=function(){return xe()},g=w.Event=Ne,p=w.Stat={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ge.NO_ERROR=0,Ge.TIMEOUT=8,Ge.HTTP_ERROR=6,f=w.ErrorCode=Ge,We.COMPLETE="complete",d=w.EventType=We,Ae.EventType=ke,ke.OPEN="a",ke.CLOSE="b",ke.ERROR="c",ke.MESSAGE="d",pe.prototype.listen=pe.prototype.J,h=w.WebChannel=Ae,w.FetchXmlHttpFactory=Jt,sn.prototype.listenOnce=sn.prototype.K,sn.prototype.getLastError=sn.prototype.Ha,sn.prototype.getLastErrorCode=sn.prototype.ya,sn.prototype.getStatus=sn.prototype.ca,sn.prototype.getResponseJson=sn.prototype.La,sn.prototype.getResponseText=sn.prototype.la,sn.prototype.send=sn.prototype.ea,sn.prototype.setWithCredentials=sn.prototype.Fa,l=w.XhrIo=sn}).apply("undefined"!==typeof _?_:"undefined"!==typeof self?self:"undefined"!==typeof window?window:{});
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class b{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}b.UNAUTHENTICATED=new b(null),b.GOOGLE_CREDENTIALS=new b("google-credentials-uid"),b.FIRST_PARTY=new b("first-party-uid"),b.MOCK_USER=new b("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let E="12.14.0";function T(e){E=e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I=new v.Vy("@firebase/firestore");function S(){return I.logLevel}function C(e,...t){if(I.logLevel<=v.$b.DEBUG){const n=t.map(R);I.debug(`Firestore (${E}): ${e}`,...n)}}function A(e,...t){if(I.logLevel<=v.$b.ERROR){const n=t.map(R);I.error(`Firestore (${E}): ${e}`,...n)}}function k(e,...t){if(I.logLevel<=v.$b.WARN){const n=t.map(R);I.warn(`Firestore (${E}): ${e}`,...n)}}function R(e){if("string"==typeof e)return e;try{return function(e){return JSON.stringify(e)}(e)}catch(t){return e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,N(e,r,n)}function N(e,t,n){let r=`FIRESTORE (${E}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(e){r+=" CONTEXT: "+n}throw A(r),new Error(r)}function D(e,t,n,r){let i="Unexpected state";"string"==typeof n?i=n:r=n,e||N(t,i,r)}function x(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class L extends a.g{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class V{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(b.UNAUTHENTICATED)))}shutdown(){}}class F{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class j{constructor(e){this.t=e,this.currentUser=b.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){D(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new M;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new M,e.enqueueRetryable((()=>r(this.currentUser)))};const s=()=>{const t=i;e.enqueueRetryable((async()=>{await t.promise,await r(this.currentUser)}))},o=e=>{C("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),s())};this.t.onInit((e=>o(e))),setTimeout((()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(C("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new M)}}),0),s()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((t=>this.i!==e?(C("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(D("string"==typeof t.accessToken,31837,{l:t}),new U(t.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return D(null===e||"string"==typeof e,2055,{h:e}),new b(e)}}class B{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=b.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class ${constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new B(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(b.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class q{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class z{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,(0,s.xZ)(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){D(void 0===this.o,3512);const n=e=>{null!=e.error&&C("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,C("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable((()=>n(t)))};const r=e=>{C("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((e=>r(e))),setTimeout((()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):C("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new q(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((e=>e?(D("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new q(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function H(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(256/62);let n="";for(;n.length<20;){const r=H(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%62))}return n}}function G(e,t){return e<t?-1:e>t?1:0}function W(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),i=t.charAt(r);if(n!==i)return J(n)===J(i)?G(n,i):J(n)?1:-1}return G(e.length,t.length)}const Q=55296,X=57343;function J(e){const t=e.charCodeAt(0);return t>=Q&&t<=X}function Y(e,t,n){return e.length===t.length&&e.every(((e,r)=>n(e,t[r])))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Z="__name__";class ee{constructor(e,t,n){void 0===t?t=0:t>e.length&&O(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&O(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===ee.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ee?e.forEach((e=>{t.push(e)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=ee.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return G(e.length,t.length)}static compareSegments(e,t){const n=ee.isNumericId(e),r=ee.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?ee.extractNumericId(e).compare(ee.extractNumericId(t)):W(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return r.fromString(e.substring(4,e.length-2))}}class te extends ee{construct(e,t,n){return new te(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new L(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((e=>e.length>0)))}return new te(t)}static emptyPath(){return new te([])}}const ne=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class re extends ee{construct(e,t,n){return new re(e,t,n)}static isValidIdentifier(e){return ne.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),re.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===Z}static keyField(){return new re([Z])}static fromServerFormat(e){const t=[];let n="",r=0;const i=()=>{if(0===n.length)throw new L(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let s=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new L(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new L(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(s=!s,r++):"."!==t||s?(n+=t,r++):(i(),r++)}if(i(),s)throw new L(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new re(t)}static emptyPath(){return new re([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.path=e}static fromPath(e){return new ie(te.fromString(e))}static fromName(e){return new ie(te.fromString(e).popFirst(5))}static empty(){return new ie(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===te.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ie(new te(e.slice()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(e,t,n){if(!n)throw new L(P.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function oe(e,t,n,r){if(!0===t&&!0===r)throw new L(P.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function ae(e){if(!ie.isDocumentKey(e))throw new L(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function ce(e){if(ie.isDocumentKey(e))throw new L(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function ue(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function le(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":O(12329,{type:typeof e})}function he(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new L(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=le(e);throw new L(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}function de(e,t){if(t<=0)throw new L(P.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(e,t){const n={typeString:e};return t&&(n.value=t),n}function pe(e,t){if(!ue(e))throw new L(P.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const i=t[r].typeString,s="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const o=e[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(void 0!==s&&o!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new L(P.INVALID_ARGUMENT,n);return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge=-62135596800,me=1e6;class ye{static now(){return ye.fromMillis(Date.now())}static fromDate(e){return ye.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*me);return new ye(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new L(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new L(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ge)throw new L(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new L(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/me}_compareTo(e){return this.seconds===e.seconds?G(this.nanoseconds,e.nanoseconds):G(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ye._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(pe(e,ye._jsonSchema))return new ye(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ge;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ye._jsonSchemaVersion="firestore/timestamp/1.0",ye._jsonSchema={type:fe("string",ye._jsonSchemaVersion),seconds:fe("number"),nanoseconds:fe("number")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ve{static fromTimestamp(e){return new ve(e)}static min(){return new ve(new ye(0,0))}static max(){return new ve(new ye(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _e=-1;class we{constructor(e,t,n,r){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=r}}we.UNKNOWN_ID=-1;function be(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,i=ve.fromTimestamp(1e9===r?new ye(n+1,0):new ye(n,r));return new Te(i,ie.empty(),t)}function Ee(e){return new Te(e.readTime,e.key,_e)}class Te{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Te(ve.min(),ie.empty(),_e)}static max(){return new Te(ve.max(),ie.empty(),_e)}}function Ie(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=ie.comparator(e.documentKey,t.documentKey),0!==n?n:G(e.largestBatchId,t.largestBatchId)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)}const Se="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ce{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ae(e){if(e.code!==P.FAILED_PRECONDITION||e.message!==Se)throw e;C("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new ke(((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof ke?t:ke.resolve(t)}catch(e){return ke.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):ke.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):ke.reject(t)}static resolve(e){return new ke(((t,n)=>{t(e)}))}static reject(e){return new ke(((t,n)=>{n(e)}))}static waitFor(e){return new ke(((t,n)=>{let r=0,i=0,s=!1;e.forEach((e=>{++r,e.next((()=>{++i,s&&i===r&&t()}),(e=>n(e)))})),s=!0,i===r&&t()}))}static or(e){let t=ke.resolve(!1);for(const n of e)t=t.next((e=>e?ke.resolve(e):n()));return t}static forEach(e,t){const n=[];return e.forEach(((e,r)=>{n.push(t.call(this,e,r))})),this.waitFor(n)}static mapArray(e,t){return new ke(((n,r)=>{const i=e.length,s=new Array(i);let o=0;for(let a=0;a<i;a++){const c=a;t(e[c]).next((e=>{s[c]=e,++o,o===i&&n(s)}),(e=>r(e)))}}))}static doWhile(e,t){return new ke(((n,r)=>{const i=()=>{!0===e()?t().next((()=>{i()}),r):n()};i()}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Oe(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ne{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ne.ce=-1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De=-1;function xe(e){return null==e}function Pe(e){return 0===e&&1/e==-1/0}function Le(e){return"number"==typeof e&&Number.isInteger(e)&&!Pe(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Me="";function Ue(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=Fe(t)),t=Ve(e.get(n),t);return Fe(t)}function Ve(e,t){let n=t;const r=e.length;for(let i=0;i<r;i++){const t=e.charAt(i);switch(t){case"\0":n+="";break;case Me:n+="";break;default:n+=t}}return n}function Fe(e){return e+Me+""}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const je="remoteDocuments",Be="owner",$e="mutationQueues",qe="mutations";
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ze="documentMutations",He="remoteDocumentsV14",Ke="remoteDocumentGlobal",Ge="targets",We="targetDocuments",Qe="targetGlobal",Xe="collectionParents",Je="clientMetadata",Ye="bundles",Ze="namedQueries",et="indexConfiguration",tt="indexState",nt="indexEntries",rt="documentOverlays",it="globals",st=[$e,qe,ze,je,Ge,Be,Qe,We,Je,Ke,Xe,Ye,Ze],ot=[$e,qe,ze,He,Ge,Be,Qe,We,Je,Ke,Xe,Ye,Ze,rt],at=ot,ct=[...at,et,tt,nt];
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ut(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function lt(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function ht(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e,t){this.comparator=e,this.root=t||pt.EMPTY}insert(e,t){return new dt(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,pt.BLACK,null,null))}remove(e){return new dt(this.comparator,this.root.remove(e,this.comparator).copy(null,null,pt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ft(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ft(this.root,e,this.comparator,!1)}getReverseIterator(){return new ft(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ft(this.root,e,this.comparator,!0)}}class ft{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class pt{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:pt.RED,this.left=null!=r?r:pt.EMPTY,this.right=null!=i?i:pt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new pt(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return pt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return pt.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,pt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,pt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw O(27949);return e+(this.isRed()?0:1)}}pt.EMPTY=null,pt.RED=!0,pt.BLACK=!1,pt.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(e,t,n,r,i){return this}insert(e,t,n){return new pt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gt{constructor(e){this.comparator=e,this.data=new dt(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new mt(this.data.getIterator())}getIteratorFrom(e){return new mt(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((e=>{t=t.add(e)})),t}isEqual(e){if(!(e instanceof gt))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new gt(this.comparator);return t.data=e,t}}class mt{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yt{constructor(e){this.fields=e,e.sort(re.comparator)}static empty(){return new yt([])}unionWith(e){let t=new gt(re.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new yt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Y(this.fields,e.fields,((e,t)=>e.isEqual(t)))}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _t{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(e){throw"undefined"!=typeof DOMException&&e instanceof DOMException?new vt("Invalid base64 string: "+e):e}}(e);return new _t(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new _t(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return G(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}_t.EMPTY_BYTE_STRING=new _t("");const wt=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function bt(e){if(D(!!e,39018),"string"==typeof e){let t=0;const n=wt.exec(e);if(D(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Et(e.seconds),nanos:Et(e.nanos)}}function Et(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Tt(e){return"string"==typeof e?_t.fromBase64String(e):_t.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It="server_timestamp",St="__type__",Ct="__previous_value__",At="__local_write_time__";function kt(e){const t=(e?.mapValue?.fields||{})[St]?.stringValue;return t===It}function Rt(e){const t=e.mapValue.fields[Ct];return kt(t)?Rt(t):t}function Ot(e){const t=bt(e.mapValue.fields[At].timestampValue);return new ye(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t,n,r,i,s,o,a,c,u,l){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=u,this.apiKey=l}}const Dt="(default)";class xt{constructor(e,t){this.projectId=e,this.database=t||Dt}static empty(){return new xt("","")}get isDefaultDatabase(){return this.database===Dt}isEqual(e){return e instanceof xt&&e.projectId===this.projectId&&e.database===this.database}}function Pt(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new L(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new xt(e.options.projectId,t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt="__type__",Mt="__max__",Ut={mapValue:{fields:{__type__:{stringValue:Mt}}}},Vt="__vector__",Ft="value";function jt(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?kt(e)?4:sn(e)?9007199254740991:nn(e)?10:11:O(28295,{value:e})}function Bt(e,t){if(e===t)return!0;const n=jt(e);if(n!==jt(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Ot(e).isEqual(Ot(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=bt(e.timestampValue),r=bt(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return Tt(e.bytesValue).isEqual(Tt(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Et(e.geoPointValue.latitude)===Et(t.geoPointValue.latitude)&&Et(e.geoPointValue.longitude)===Et(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Et(e.integerValue)===Et(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Et(e.doubleValue),r=Et(t.doubleValue);return n===r?Pe(n)===Pe(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return Y(e.arrayValue.values||[],t.arrayValue.values||[],Bt);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(ut(n)!==ut(r))return!1;for(const i in n)if(n.hasOwnProperty(i)&&(void 0===r[i]||!Bt(n[i],r[i])))return!1;return!0}(e,t);default:return O(52216,{left:e})}}function $t(e,t){return void 0!==(e.values||[]).find((e=>Bt(e,t)))}function qt(e,t){if(e===t)return 0;const n=jt(e),r=jt(t);if(n!==r)return G(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return G(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Et(e.integerValue||e.doubleValue),r=Et(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return zt(e.timestampValue,t.timestampValue);case 4:return zt(Ot(e),Ot(t));case 5:return W(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Tt(e),r=Tt(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let i=0;i<n.length&&i<r.length;i++){const e=G(n[i],r[i]);if(0!==e)return e}return G(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=G(Et(e.latitude),Et(t.latitude));return 0!==n?n:G(Et(e.longitude),Et(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return Ht(e.arrayValue,t.arrayValue);case 10:return function(e,t){const n=e.fields||{},r=t.fields||{},i=n[Ft]?.arrayValue,s=r[Ft]?.arrayValue,o=G(i?.values?.length||0,s?.values?.length||0);return 0!==o?o:Ht(i,s)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===Ut.mapValue&&t===Ut.mapValue)return 0;if(e===Ut.mapValue)return 1;if(t===Ut.mapValue)return-1;const n=e.fields||{},r=Object.keys(n),i=t.fields||{},s=Object.keys(i);r.sort(),s.sort();for(let o=0;o<r.length&&o<s.length;++o){const e=W(r[o],s[o]);if(0!==e)return e;const t=qt(n[r[o]],i[s[o]]);if(0!==t)return t}return G(r.length,s.length)}(e.mapValue,t.mapValue);default:throw O(23264,{he:n})}}function zt(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return G(e,t);const n=bt(e),r=bt(t),i=G(n.seconds,r.seconds);return 0!==i?i:G(n.nanos,r.nanos)}function Ht(e,t){const n=e.values||[],r=t.values||[];for(let i=0;i<n.length&&i<r.length;++i){const e=qt(n[i],r[i]);if(e)return e}return G(n.length,r.length)}function Kt(e){return Gt(e)}function Gt(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=bt(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?function(e){return Tt(e).toBase64()}(e.bytesValue):"referenceValue"in e?function(e){return ie.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=Gt(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const i of t)r?r=!1:n+=",",n+=`${i}:${Gt(e.fields[i])}`;return n+"}"}(e.mapValue):O(61005,{value:e})}function Wt(e){switch(jt(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Rt(e);return t?16+Wt(t):16;case 5:return 2*e.stringValue.length;case 6:return Tt(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return function(e){return(e.values||[]).reduce(((e,t)=>e+Wt(t)),0)}(e.arrayValue);case 10:case 11:return function(e){let t=0;return lt(e.fields,((e,n)=>{t+=e.length+Wt(n)})),t}(e.mapValue);default:throw O(13486,{value:e})}}function Qt(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function Xt(e){return!!e&&"integerValue"in e}function Jt(e){return Xt(e)||function(e){return!!e&&"doubleValue"in e}(e)}function Yt(e){return!!e&&"arrayValue"in e}function Zt(e){return!!e&&"nullValue"in e}function en(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function tn(e){return!!e&&"mapValue"in e}function nn(e){const t=(e?.mapValue?.fields||{})[Lt]?.stringValue;return t===Vt}function rn(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return lt(e.mapValue.fields,((e,n)=>t.mapValue.fields[e]=rn(n))),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=rn(e.arrayValue.values[n]);return t}return{...e}}function sn(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===Mt}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class on{constructor(e){this.value=e}static empty(){return new on({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!tn(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=rn(t)}setAll(e){let t=re.emptyPath(),n={},r=[];e.forEach(((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=rn(e):r.push(i.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){const t=this.field(e.popLast());tn(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Bt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];tn(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){lt(t,((t,n)=>e[t]=n));for(const r of n)delete e[r]}clone(){return new on(rn(this.value))}}function an(e){const t=[];return lt(e.fields,((e,n)=>{const r=new re([e]);if(tn(n)){const e=an(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)})),new yt(t)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class cn{constructor(e,t,n,r,i,s,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=i,this.data=s,this.documentState=o}static newInvalidDocument(e){return new cn(e,0,ve.min(),ve.min(),ve.min(),on.empty(),0)}static newFoundDocument(e,t,n,r){return new cn(e,1,t,ve.min(),n,r,0)}static newNoDocument(e,t){return new cn(e,2,t,ve.min(),ve.min(),on.empty(),0)}static newUnknownDocument(e,t){return new cn(e,3,t,ve.min(),ve.min(),on.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ve.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=on.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=on.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ve.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof cn&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new cn(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e,t){this.position=e,this.inclusive=t}}function ln(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){const s=t[i],o=e.position[i];if(r=s.field.isKeyField()?ie.comparator(ie.fromName(o.referenceValue),n.key):qt(o,n.data.field(s.field)),"desc"===s.dir&&(r*=-1),0!==r)break}return r}function hn(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Bt(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn{constructor(e,t="asc"){this.field=e,this.dir=t}}function fn(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{}class gn extends pn{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new Tn(e,t,n):"array-contains"===t?new An(e,n):"in"===t?new kn(e,n):"not-in"===t?new Rn(e,n):"array-contains-any"===t?new On(e,n):new gn(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new In(e,n):new Sn(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(qt(t,this.value)):null!==t&&jt(this.value)===jt(t)&&this.matchesComparison(qt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class mn extends pn{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new mn(e,t)}matches(e){return yn(this)?void 0===this.filters.find((t=>!t.matches(e))):void 0!==this.filters.find((t=>t.matches(e)))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function yn(e){return"and"===e.op}function vn(e){return _n(e)&&yn(e)}function _n(e){for(const t of e.filters)if(t instanceof mn)return!1;return!0}function wn(e){if(e instanceof gn)return e.field.canonicalString()+e.op.toString()+Kt(e.value);if(vn(e))return e.filters.map((e=>wn(e))).join(",");{const t=e.filters.map((e=>wn(e))).join(",");return`${e.op}(${t})`}}function bn(e,t){return e instanceof gn?function(e,t){return t instanceof gn&&e.op===t.op&&e.field.isEqual(t.field)&&Bt(e.value,t.value)}(e,t):e instanceof mn?function(e,t){return t instanceof mn&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce(((e,n,r)=>e&&bn(n,t.filters[r])),!0)}(e,t):void O(19439)}function En(e){return e instanceof gn?function(e){return`${e.field.canonicalString()} ${e.op} ${Kt(e.value)}`}(e):e instanceof mn?function(e){return e.op.toString()+" {"+e.getFilters().map(En).join(" ,")+"}"}(e):"Filter"}class Tn extends gn{constructor(e,t,n){super(e,t,n),this.key=ie.fromName(n.referenceValue)}matches(e){const t=ie.comparator(e.key,this.key);return this.matchesComparison(t)}}class In extends gn{constructor(e,t){super(e,"in",t),this.keys=Cn("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Sn extends gn{constructor(e,t){super(e,"not-in",t),this.keys=Cn("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Cn(e,t){return(t.arrayValue?.values||[]).map((e=>ie.fromName(e.referenceValue)))}class An extends gn{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Yt(t)&&$t(t.arrayValue,this.value)}}class kn extends gn{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&$t(this.value.arrayValue,t)}}class Rn extends gn{constructor(e,t){super(e,"not-in",t)}matches(e){if($t(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!$t(this.value.arrayValue,t)}}class On extends gn{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Yt(t)||!t.arrayValue.values)&&t.arrayValue.values.some((e=>$t(this.value.arrayValue,e)))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e,t=null,n=[],r=[],i=null,s=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=s,this.endAt=o,this.Te=null}}function Dn(e,t=null,n=[],r=[],i=null,s=null,o=null){return new Nn(e,t,n,r,i,s,o)}function xn(e){const t=x(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((e=>wn(e))).join(","),e+="|ob:",e+=t.orderBy.map((e=>function(e){return e.field.canonicalString()+e.dir}(e))).join(","),xe(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((e=>Kt(e))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((e=>Kt(e))).join(",")),t.Te=e}return t.Te}function Pn(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!fn(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!bn(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!hn(e.startAt,t.startAt)&&hn(e.endAt,t.endAt)}function Ln(e){return ie.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Mn{constructor(e,t=null,n=[],r=[],i=null,s="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=s,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Un(e,t,n,r,i,s,o,a){return new Mn(e,t,n,r,i,s,o,a)}function Vn(e){return new Mn(e)}function Fn(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function jn(e){return ie.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}function Bn(e){return null!==e.collectionGroup}function $n(e){const t=x(e);if(null===t.Ie){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc",r=function(e){let t=new gt(re.comparator);return e.filters.forEach((e=>{e.getFlattenedFilters().forEach((e=>{e.isInequality()&&(t=t.add(e.field))}))})),t}(t);r.forEach((r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ie.push(new dn(r,n))})),e.has(re.keyField().canonicalString())||t.Ie.push(new dn(re.keyField(),n))}return t.Ie}function qn(e){const t=x(e);return t.Ee||(t.Ee=zn(t,$n(e))),t.Ee}function zn(e,t){if("F"===e.limitType)return Dn(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map((e=>{const t="desc"===e.dir?"asc":"desc";return new dn(e.field,t)}));const n=e.endAt?new un(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new un(e.startAt.position,e.startAt.inclusive):null;return Dn(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}function Hn(e,t){const n=e.filters.concat([t]);return new Mn(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function Kn(e,t){const n=e.explicitOrderBy.concat([t]);return new Mn(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}function Gn(e,t,n){return new Mn(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Wn(e,t){return Pn(qn(e),qn(t))&&e.limitType===t.limitType}function Qn(e){return`${xn(qn(e))}|lt:${e.limitType}`}function Xn(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map((e=>En(e))).join(", ")}]`),xe(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map((e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e))).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((e=>Kt(e))).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((e=>Kt(e))).join(",")),`Target(${t})`}(qn(e))}; limitType=${e.limitType})`}function Jn(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):ie.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of $n(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!function(e,t,n){const r=ln(e,t,n);return e.inclusive?r<=0:r<0}(e.startAt,$n(e),t))&&!(e.endAt&&!function(e,t,n){const r=ln(e,t,n);return e.inclusive?r>=0:r>0}(e.endAt,$n(e),t))}(e,t)}function Yn(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function Zn(e){return(t,n)=>{let r=!1;for(const i of $n(e)){const e=er(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}function er(e,t,n){const r=e.field.isKeyField()?ie.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?qt(r,i):O(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return O(19790,{direction:e.dir})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,i]of n)if(this.equalsFn(r,e))return i}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){lt(this.inner,((t,n)=>{for(const[r,i]of n)e(r,i)}))}isEmpty(){return ht(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr=new dt(ie.comparator);function rr(){return nr}const ir=new dt(ie.comparator);function sr(...e){let t=ir;for(const n of e)t=t.insert(n.key,n);return t}function or(e){let t=ir;return e.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function ar(){return ur()}function cr(){return ur()}function ur(){return new tr((e=>e.toString()),((e,t)=>e.isEqual(t)))}const lr=new dt(ie.comparator),hr=new gt(ie.comparator);function dr(...e){let t=hr;for(const n of e)t=t.add(n);return t}const fr=new gt(G);function pr(){return fr}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gr(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Pe(t)?"-0":t}}function mr(e){return{integerValue:""+e}}function yr(e,t){return Le(t)?mr(t):gr(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(){this._=void 0}}function _r(e,t,n){return e instanceof Er?function(e,t){const n={fields:{[St]:{stringValue:It},[At]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&kt(t)&&(t=Rt(t)),t&&(n.fields[Ct]=t),{mapValue:n}}(n,t):e instanceof Tr?Ir(e,t):e instanceof Sr?Cr(e,t):e instanceof kr?function(e,t){const n=br(e,t),r=Dr(n)+Dr(e.Ae);return Xt(n)&&Xt(e.Ae)?mr(r):gr(e.serializer,r)}(e,t):e instanceof Rr?function(e,t){return Nr(e,t,Math.min)}(e,t):e instanceof Or?function(e,t){return Nr(e,t,Math.max)}(e,t):void 0}function wr(e,t,n){return e instanceof Tr?Ir(e,t):e instanceof Sr?Cr(e,t):n}function br(e,t){return e instanceof kr?Jt(t)?t:{integerValue:0}:null}class Er extends vr{}class Tr extends vr{constructor(e){super(),this.elements=e}}function Ir(e,t){const n=xr(t);for(const r of e.elements)n.some((e=>Bt(e,r)))||n.push(r);return{arrayValue:{values:n}}}class Sr extends vr{constructor(e){super(),this.elements=e}}function Cr(e,t){let n=xr(t);for(const r of e.elements)n=n.filter((e=>!Bt(e,r)));return{arrayValue:{values:n}}}class Ar extends vr{constructor(e,t){super(),this.serializer=e,this.Ae=t}}class kr extends Ar{}class Rr extends Ar{}class Or extends Ar{}function Nr(e,t,n){if(!Jt(t))return e.Ae;const r=n(Dr(t),Dr(e.Ae));return Xt(t)&&Xt(e.Ae)?mr(r):gr(e.serializer,r)}function Dr(e){return Et(e.integerValue||e.doubleValue)}function xr(e){return Yt(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof Tr&&t instanceof Tr||e instanceof Sr&&t instanceof Sr?Y(e.elements,t.elements,Bt):e instanceof kr&&t instanceof kr||e instanceof Rr&&t instanceof Rr||e instanceof Or&&t instanceof Or?Bt(e.Ae,t.Ae):e instanceof Er&&t instanceof Er}(e.transform,t.transform)}class Lr{constructor(e,t){this.version=e,this.transformResults=t}}class Mr{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Mr}static exists(e){return new Mr(void 0,e)}static updateTime(e){return new Mr(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ur(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Vr{}function Fr(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new Qr(e.key,Mr.none()):new zr(e.key,e.data,Mr.none());{const n=e.data,r=on.empty();let i=new gt(re.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),i=i.add(e)}return new Hr(e.key,r,new yt(i.toArray()),Mr.none())}}function jr(e,t,n){e instanceof zr?function(e,t,n){const r=e.value.clone(),i=Gr(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof Hr?function(e,t,n){if(!Ur(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=Gr(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(Kr(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function Br(e,t,n,r){return e instanceof zr?function(e,t,n,r){if(!Ur(e.precondition,t))return n;const i=e.value.clone(),s=Wr(e.fieldTransforms,r,t);return i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,r):e instanceof Hr?function(e,t,n,r){if(!Ur(e.precondition,t))return n;const i=Wr(e.fieldTransforms,r,t),s=t.data;return s.setAll(Kr(e)),s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map((e=>e.field)))}(e,t,n,r):function(e,t,n){return Ur(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}(e,t,n)}function $r(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),i=br(r.transform,e||null);null!=i&&(null===n&&(n=on.empty()),n.set(r.field,i))}return n||null}function qr(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&Y(e,t,((e,t)=>Pr(e,t)))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class zr extends Vr{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Hr extends Vr{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Kr(e){const t=new Map;return e.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}})),t}function Gr(e,t,n){const r=new Map;D(e.length===n.length,32656,{Ve:n.length,de:e.length});for(let i=0;i<n.length;i++){const s=e[i],o=s.transform,a=t.data.field(s.field);r.set(s.field,wr(o,a,n[i]))}return r}function Wr(e,t,n){const r=new Map;for(const i of e){const e=i.transform,s=n.data.field(i.field);r.set(i.field,_r(e,s,t))}return r}class Qr extends Vr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Xr extends Vr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&jr(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Br(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Br(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=cr();return this.mutations.forEach((r=>{const i=e.get(r.key),s=i.overlayedDocument;let o=this.applyToLocalView(s,i.mutatedFields);o=t.has(r.key)?null:o;const a=Fr(s,o);null!==a&&n.set(r.key,a),s.isValidDocument()||s.convertToNoDocument(ve.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),dr())}isEqual(e){return this.batchId===e.batchId&&Y(this.mutations,e.mutations,((e,t)=>qr(e,t)))&&Y(this.baseMutations,e.baseMutations,((e,t)=>qr(e,t)))}}class Yr{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){D(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let r=function(){return lr}();const i=e.mutations;for(let s=0;s<i.length;s++)r=r.insert(i[s].key,n[s].version);return new Yr(e,t,n,r)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ei{constructor(e,t){this.count=e,this.unchangedNames=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ti,ni;function ri(e){switch(e){case P.OK:return O(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return O(15467,{code:e})}}function ii(e){if(void 0===e)return A("GRPC error has no .code"),P.UNKNOWN;switch(e){case ti.OK:return P.OK;case ti.CANCELLED:return P.CANCELLED;case ti.UNKNOWN:return P.UNKNOWN;case ti.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ti.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ti.INTERNAL:return P.INTERNAL;case ti.UNAVAILABLE:return P.UNAVAILABLE;case ti.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ti.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ti.NOT_FOUND:return P.NOT_FOUND;case ti.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ti.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ti.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ti.ABORTED:return P.ABORTED;case ti.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ti.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ti.DATA_LOSS:return P.DATA_LOSS;default:return O(39323,{code:e})}}(ni=ti||(ti={}))[ni.OK=0]="OK",ni[ni.CANCELLED=1]="CANCELLED",ni[ni.UNKNOWN=2]="UNKNOWN",ni[ni.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ni[ni.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ni[ni.NOT_FOUND=5]="NOT_FOUND",ni[ni.ALREADY_EXISTS=6]="ALREADY_EXISTS",ni[ni.PERMISSION_DENIED=7]="PERMISSION_DENIED",ni[ni.UNAUTHENTICATED=16]="UNAUTHENTICATED",ni[ni.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ni[ni.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ni[ni.ABORTED=10]="ABORTED",ni[ni.OUT_OF_RANGE=11]="OUT_OF_RANGE",ni[ni.UNIMPLEMENTED=12]="UNIMPLEMENTED",ni[ni.INTERNAL=13]="INTERNAL",ni[ni.UNAVAILABLE=14]="UNAVAILABLE",ni[ni.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let si=null;
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function oi(){return new TextEncoder}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ai=new r([4294967295,4294967295],0);function ci(e){const t=oi().encode(e),n=new i;return n.update(t),new Uint8Array(n.digest())}function ui(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),i=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new r([n,i],0),new r([s,o],0)]}class li{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new hi(`Invalid padding: ${t}`);if(n<0)throw new hi(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new hi(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new hi(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=r.fromNumber(this.ge)}ye(e,t,n){let i=e.add(t.multiply(r.fromNumber(n)));return 1===i.compare(ai)&&(i=new r([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=ci(e),[n,r]=ui(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,r,i);if(!this.we(e))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),s=new li(i,r,t);return n.forEach((e=>s.insert(e))),s}insert(e){if(0===this.ge)return;const t=ci(e),[n,r]=ui(t);for(let i=0;i<this.hashCount;i++){const e=this.ye(n,r,i);this.Se(e)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class hi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,fi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new di(ve.min(),r,new dt(G),rr(),dr())}}class fi{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new fi(n,t,dr(),dr(),dr())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pi{constructor(e,t,n,r){this.be=e,this.removedTargetIds=t,this.key=n,this.De=r}}class gi{constructor(e,t){this.targetId=e,this.Ce=t}}class mi{constructor(e,t,n=_t.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class yi{constructor(e){this.targetId=e,this.ve=0,this.Fe=bi(),this.Me=_t.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=dr(),t=dr(),n=dr();return this.Fe.forEach(((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:O(38017,{changeType:i})}})),new fi(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=bi()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,D(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const vi="WatchChangeAggregator";class _i{constructor(e){this.Ge=e,this.ze=new Map,this.je=rr(),this.Je=wi(),this.He=wi(),this.Ze=new dt(G)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const n=this.ze.get(t);if(n)switch(e.state){case 0:this.nt(t)&&n.Le(e.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(t);break;case 3:this.nt(t)&&(n.Qe(),n.Le(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),n.Le(e.resumeToken));break;default:O(56790,{state:e.state})}else C(vi,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((e,n)=>{this.nt(n)&&t(n)}))}it(e){const t=e.targetId,n=e.Ce.count,r=this.st(t);if(r){const i=r.target;if(Ln(i))if(0===n){const e=new ie(i.path);this.et(t,e,cn.newNoDocument(e,ve.min()))}else D(1===n,20013,{expectedCount:n});else{const r=this.ot(t);if(r!==n){const n=this._t(e),i=n?this.ut(n,e,r):1;if(0!==i){this.rt(t);const e=2===i?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,e)}si?.o(function(e,t,n,r,i){const s={localCacheCount:e,existenceFilterCount:t.count,databaseId:n.database,projectId:n.projectId},o=t.unchangedNames;return o&&(s.bloomFilter={applied:0===i,hashCount:o?.hashCount??0,bitmapLength:o?.bits?.bitmap?.length??0,padding:o?.bits?.padding??0,mightContain:e=>r?.mightContain(e)??!1}),s}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r,e.Ce,this.Ge.lt(),n,i))}}}}_t(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:i=0}=t;let s,o;try{s=Tt(n).toUint8Array()}catch(e){if(e instanceof vt)return k("Decoding the base64 bloom filter in existence filter failed ("+e.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw e}try{o=new li(s,r,i)}catch(e){return k(e instanceof hi?"BloomFilter error: ":"Applying bloom filter failed: ",e),null}return 0===o.ge?null:o}ut(e,t,n){return t.Ce.count===n-this.ht(e,t.targetId)?0:2}ht(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let r=0;return n.forEach((n=>{const i=this.Ge.lt(),s=`projects/${i.projectId}/databases/${i.database}/documents/${n.path.canonicalString()}`;e.mightContain(s)||(this.et(t,n,null),r++)})),r}Pt(e){const t=new Map;this.ze.forEach(((n,r)=>{const i=this.st(r);if(i){if(n.current&&Ln(i.target)){const t=new ie(i.target.path);this.Tt(t).has(r)||this.It(r,t)||this.et(r,t,cn.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.qe())}}));let n=dr();this.He.forEach(((e,t)=>{let r=!0;t.forEachWhile((e=>{const t=this.st(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)})),r&&(n=n.add(e))})),this.je.forEach(((t,n)=>n.setReadTime(e)));const r=new di(e,t,this.Ze,this.je,n);return this.je=rr(),this.Je=wi(),this.He=wi(),this.Ze=new dt(G),r}Ye(e,t){const n=this.ze.get(e);if(!n||!this.nt(e))return void C(vi,`addDocumentToTarget received document for unknown inactive target (${e})`);const r=this.It(e,t.key)?2:0;n.Ke(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Tt(t.key).add(e)),this.He=this.He.insert(t.key,this.Et(t.key).add(e))}et(e,t,n){const r=this.ze.get(e);r&&this.nt(e)?(this.It(e,t)?r.Ke(t,1):r.Ue(t),this.He=this.He.insert(t,this.Et(t).delete(e)),this.He=this.He.insert(t,this.Et(t).add(e)),n&&(this.je=this.je.insert(t,n))):C(vi,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ze.delete(e)}ot(e){const t=this.ze.get(e);if(!t)return 0;const n=t.ke();return this.Ge.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){let t=this.ze.get(e);t||(C(vi,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new yi(e),this.ze.set(e,t)),t.$e()}Et(e){let t=this.He.get(e);return t||(t=new gt(G),this.He=this.He.insert(e,t)),t}Tt(e){let t=this.Je.get(e);return t||(t=new gt(G),this.Je=this.Je.insert(e,t)),t}nt(e){const t=null!==this.st(e);return t||C(vi,"Detected inactive target",e),t}st(e){const t=this.ze.get(e);return void 0===t||t.Ne?null:this.Ge.Rt(e)}rt(e){this.ze.set(e,new yi(e)),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function wi(){return new dt(ie.comparator)}function bi(){return new dt(ie.comparator)}const Ei=(()=>{const e={asc:"ASCENDING",desc:"DESCENDING"};return e})(),Ti=(()=>{const e={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};return e})(),Ii=(()=>{const e={and:"AND",or:"OR"};return e})();class Si{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ci(e,t){return e.useProto3Json||xe(t)?t:{value:t}}function Ai(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function ki(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Ri(e,t){return Ai(e,t.toTimestamp())}function Oi(e){return D(!!e,49232),ve.fromTimestamp(function(e){const t=bt(e);return new ye(t.seconds,t.nanos)}(e))}function Ni(e,t){return Di(e,t).canonicalString()}function Di(e,t){const n=function(e){return new te(["projects",e.projectId,"databases",e.database])}(e).child("documents");return void 0===t?n:n.child(t)}function xi(e){const t=te.fromString(e);return D(ns(t),10190,{key:t.toString()}),t}function Pi(e,t){return Ni(e.databaseId,t.path)}function Li(e,t){const n=xi(t);if(n.get(1)!==e.databaseId.projectId)throw new L(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new L(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new ie(Fi(n))}function Mi(e,t){return Ni(e.databaseId,t)}function Ui(e){const t=xi(e);return 4===t.length?te.emptyPath():Fi(t)}function Vi(e){return new te(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function Fi(e){return D(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function ji(e,t,n){return{name:Pi(e,t),fields:n.value.mapValue.fields}}function Bi(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:O(39313,{state:e})}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],s=function(e,t){return e.useProto3Json?(D(void 0===t||"string"==typeof t,58123),_t.fromBase64String(t||"")):(D(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),_t.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(e){const t=void 0===e.code?P.UNKNOWN:ii(e.code);return new L(t,e.message||"")}(o);n=new mi(r,i,s,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=Li(e,r.document.name),s=Oi(r.document.updateTime),o=r.document.createTime?Oi(r.document.createTime):ve.min(),a=new on({mapValue:{fields:r.document.fields}}),c=cn.newFoundDocument(i,s,o,a),u=r.targetIds||[],l=r.removedTargetIds||[];n=new pi(u,l,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=Li(e,r.document),s=r.readTime?Oi(r.readTime):ve.min(),o=cn.newNoDocument(i,s),a=r.removedTargetIds||[];n=new pi([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=Li(e,r.document),s=r.removedTargetIds||[];n=new pi([],s,i,null)}else{if(!("filter"in t))return O(11601,{At:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:i}=e,s=new ei(r,i),o=e.targetId;n=new gi(o,s)}}return n}function $i(e,t){let n;if(t instanceof zr)n={update:ji(e,t.key,t.value)};else if(t instanceof Qr)n={delete:Pi(e,t.key)};else if(t instanceof Hr)n={update:ji(e,t.key,t.data),updateMask:ts(t.fieldMask)};else{if(!(t instanceof Xr))return O(16599,{Vt:t.type});n={verify:Pi(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map((e=>function(e,t){const n=t.transform;if(n instanceof Er)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Tr)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Sr)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof kr)return{fieldPath:t.field.canonicalString(),increment:n.Ae};if(n instanceof Rr)return{fieldPath:t.field.canonicalString(),minimum:n.Ae};if(n instanceof Or)return{fieldPath:t.field.canonicalString(),maximum:n.Ae};throw O(20930,{transform:t.transform})}(0,e)))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:Ri(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:O(27497)}(e,t.precondition)),n}function qi(e,t){return e&&e.length>0?(D(void 0!==t,14353),e.map((e=>function(e,t){let n=e.updateTime?Oi(e.updateTime):Oi(t);return n.isEqual(ve.min())&&(n=Oi(t)),new Lr(n,e.transformResults||[])}(e,t)))):[]}function zi(e,t){return{documents:[Mi(e,t.path)]}}function Hi(e,t){const n={structuredQuery:{}},r=t.path;let i;null!==t.collectionGroup?(i=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Mi(e,i);const s=function(e){if(0!==e.length)return es(mn.create(e,"and"))}(t.filters);s&&(n.structuredQuery.where=s);const o=function(e){if(0!==e.length)return e.map((e=>function(e){return{field:Yi(e.field),direction:Qi(e.dir)}}(e)))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Ci(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt=function(e){return{before:e.inclusive,values:e.position}}(t.startAt)),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{dt:n,parent:i}}function Ki(e){let t=Ui(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){D(1===r,65062);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let s=[];n.where&&(s=function(e){const t=Wi(e);return t instanceof mn&&vn(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=function(e){return e.map((e=>function(e){return new dn(Zi(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e)))}(n.orderBy));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,xe(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new un(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new un(n,t)}(n.endAt)),Un(t,i,o,s,a,"F",c,u)}function Gi(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}function Wi(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Zi(e.unaryFilter.field);return gn.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Zi(e.unaryFilter.field);return gn.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Zi(e.unaryFilter.field);return gn.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Zi(e.unaryFilter.field);return gn.create(i,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}}(e):void 0!==e.fieldFilter?function(e){return gn.create(Zi(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(e):void 0!==e.compositeFilter?function(e){return mn.create(e.compositeFilter.filters.map((e=>Wi(e))),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return O(1026)}}(e.compositeFilter.op))}(e):O(30097,{filter:e})}function Qi(e){return Ei[e]}function Xi(e){return Ti[e]}function Ji(e){return Ii[e]}function Yi(e){return{fieldPath:e.canonicalString()}}function Zi(e){return re.fromServerFormat(e.fieldPath)}function es(e){return e instanceof gn?function(e){if("=="===e.op){if(en(e.value))return{unaryFilter:{field:Yi(e.field),op:"IS_NAN"}};if(Zt(e.value))return{unaryFilter:{field:Yi(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(en(e.value))return{unaryFilter:{field:Yi(e.field),op:"IS_NOT_NAN"}};if(Zt(e.value))return{unaryFilter:{field:Yi(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Yi(e.field),op:Xi(e.op),value:e.value}}}(e):e instanceof mn?function(e){const t=e.getFilters().map((e=>es(e)));return 1===t.length?t[0]:{compositeFilter:{op:Ji(e.op),filters:t}}}(e):O(54877,{filter:e})}function ts(e){const t=[];return e.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function ns(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}function rs(e){return!!e&&"function"==typeof e._toProto&&"ProtoValue"===e._protoValueType}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class is{constructor(e,t,n,r,i=ve.min(),s=ve.min(),o=_t.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=s,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new is(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new is(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new is(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new is(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e){this.gt=e}}function os(e){const t=Ki({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Gn(t,t.limit,"L"):t}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(){}bt(e,t){this.Dt(e,t),t.Ct()}Dt(e,t){if("nullValue"in e)this.vt(t,5);else if("booleanValue"in e)this.vt(t,10),t.Ft(e.booleanValue?1:0);else if("integerValue"in e)this.vt(t,15),t.Ft(Et(e.integerValue));else if("doubleValue"in e){const n=Et(e.doubleValue);isNaN(n)?this.vt(t,13):(this.vt(t,15),Pe(n)?t.Ft(0):t.Ft(n))}else if("timestampValue"in e){let n=e.timestampValue;this.vt(t,20),"string"==typeof n&&(n=bt(n)),t.Mt(`${n.seconds||""}`),t.Ft(n.nanos||0)}else if("stringValue"in e)this.xt(e.stringValue,t),this.Ot(t);else if("bytesValue"in e)this.vt(t,30),t.Nt(Tt(e.bytesValue)),this.Ot(t);else if("referenceValue"in e)this.Bt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.vt(t,45),t.Ft(n.latitude||0),t.Ft(n.longitude||0)}else"mapValue"in e?sn(e)?this.vt(t,Number.MAX_SAFE_INTEGER):nn(e)?this.Lt(e.mapValue,t):(this.kt(e.mapValue,t),this.Ot(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Ot(t)):O(19022,{Kt:e})}xt(e,t){this.vt(t,25),this.Ut(e,t)}Ut(e,t){t.Mt(e)}kt(e,t){const n=e.fields||{};this.vt(t,55);for(const r of Object.keys(n))this.xt(r,t),this.Dt(n[r],t)}Lt(e,t){const n=e.fields||{};this.vt(t,53);const r=Ft,i=n[r].arrayValue?.values?.length||0;this.vt(t,15),t.Ft(Et(i)),this.xt(r,t),this.Dt(n[r],t)}qt(e,t){const n=e.values||[];this.vt(t,50);for(const r of n)this.Dt(r,t)}Bt(e,t){this.vt(t,37),ie.fromName(e).path.forEach((e=>{this.vt(t,60),this.Ut(e,t)}))}vt(e,t){e.Ft(t)}Ot(e){e.Ft(2)}}as.$t=new as;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class cs{constructor(){this.Sn=new us}addToCollectionParentIndex(e,t){return this.Sn.add(t),ke.resolve()}getCollectionParents(e,t){return ke.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return ke.resolve()}deleteFieldIndex(e,t){return ke.resolve()}deleteAllFieldIndexes(e){return ke.resolve()}createTargetIndexes(e,t){return ke.resolve()}getDocumentsMatchingTarget(e,t){return ke.resolve(null)}getIndexType(e,t){return ke.resolve(0)}getFieldIndexes(e,t){return ke.resolve([])}getNextCollectionGroupToUpdate(e){return ke.resolve(null)}getMinOffset(e,t){return ke.resolve(Te.min())}getMinOffsetFromCollectionGroup(e,t){return ke.resolve(Te.min())}updateCollectionGroup(e,t,n){return ke.resolve()}updateIndexEntries(e,t){return ke.resolve()}}class us{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new gt(te.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new gt(te.comparator)).toArray()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Uint8Array(0);
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ls={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},hs=41943040;class ds{static withCacheSize(e){return new ds(e,ds.DEFAULT_COLLECTION_PERCENTILE,ds.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ds.DEFAULT_COLLECTION_PERCENTILE=10,ds.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ds.DEFAULT=new ds(hs,ds.DEFAULT_COLLECTION_PERCENTILE,ds.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ds.DISABLED=new ds(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fs{constructor(e){this.ir=e}next(){return this.ir+=2,this.ir}static sr(){return new fs(0)}static _r(){return new fs(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ps="LruGarbageCollector",gs=1048576;function ms([e,t],[n,r]){const i=G(e,n);return 0===i?G(t,r):i}class ys{constructor(e){this.hr=e,this.buffer=new gt(ms),this.Pr=0}Tr(){return++this.Pr}Ir(e){const t=[e,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();ms(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class vs{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Er=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return null!==this.Er}Rr(e){C(ps,`Garbage collection scheduled in ${e}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Oe(e)?C(ps,"Ignoring IndexedDB error during garbage collection: ",e):await Ae(e)}await this.Rr(3e5)}))}}class _s{constructor(e,t){this.Ar=e,this.params=t}calculateTargetCount(e,t){return this.Ar.Vr(e).next((e=>Math.floor(t/100*e)))}nthSequenceNumber(e,t){if(0===t)return ke.resolve(Ne.ce);const n=new ys(t);return this.Ar.forEachTarget(e,(e=>n.Ir(e.sequenceNumber))).next((()=>this.Ar.dr(e,(e=>n.Ir(e))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Ar.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Ar.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector","Garbage collection skipped; disabled"),ke.resolve(ls)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ls):this.mr(e,t)))}getCacheSize(e){return this.Ar.getCacheSize(e)}mr(e,t){let n,r,i,s,o,a,c;const u=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((t=>(t>this.params.maximumSequenceNumbersToCollect?(C("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,s=Date.now(),this.nthSequenceNumber(e,r)))).next((r=>(n=r,o=Date.now(),this.removeTargets(e,n,t)))).next((t=>(i=t,a=Date.now(),this.removeOrphanedDocuments(e,n)))).next((e=>(c=Date.now(),S()<=v.$b.DEBUG&&C("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${s-u}ms\n\tDetermined least recently used ${r} in `+(o-s)+"ms\n"+`\tRemoved ${i} targets in `+(a-o)+"ms\n"+`\tRemoved ${e} documents in `+(c-a)+"ms\n"+`Total Duration: ${c-u}ms`),ke.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:e}))))}}function ws(e,t){return new _s(e,t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class bs{constructor(){this.changes=new tr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,cn.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?ke.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Es{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((r=>(n=r,this.remoteDocumentCache.getEntry(e,t)))).next((e=>(null!==n&&Br(n.mutation,e,yt.empty(),ye.now()),e)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.getLocalViewOfDocuments(e,t,dr()).next((()=>t))))}getLocalViewOfDocuments(e,t,n=dr()){const r=ar();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,n).next((e=>{let t=sr();return e.forEach(((e,n)=>{t=t.insert(e,n.overlayedDocument)})),t}))))}getOverlayedDocuments(e,t){const n=ar();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,dr())))}populateOverlays(e,t,n){const r=[];return n.forEach((e=>{t.has(e)||r.push(e)})),this.documentOverlayCache.getOverlays(e,r).next((e=>{e.forEach(((e,n)=>{t.set(e,n)}))}))}computeViews(e,t,n,r){let i=rr();const s=ur(),o=function(){return ur()}();return t.forEach(((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof Hr)?i=i.insert(t.key,t):void 0!==o?(s.set(t.key,o.mutation.getFieldMask()),Br(o.mutation,t,o.mutation.getFieldMask(),ye.now())):s.set(t.key,yt.empty())})),this.recalculateAndSaveOverlays(e,i).next((e=>(e.forEach(((e,t)=>s.set(e,t))),t.forEach(((e,t)=>o.set(e,new Es(t,s.get(e)??null)))),o)))}recalculateAndSaveOverlays(e,t){const n=ur();let r=new dt(((e,t)=>e-t)),i=dr();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((e=>{for(const i of e)i.keys().forEach((e=>{const s=t.get(e);if(null===s)return;let o=n.get(e)||yt.empty();o=i.applyToLocalView(s,o),n.set(e,o);const a=(r.get(i.batchId)||dr()).add(e);r=r.insert(i.batchId,a)}))})).next((()=>{const s=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=cr();c.forEach((e=>{if(!i.has(e)){const r=Fr(t.get(e),n.get(e));null!==r&&u.set(e,r),i=i.add(e)}})),s.push(this.documentOverlayCache.saveOverlays(e,a,u))}return ke.waitFor(s)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.recalculateAndSaveOverlays(e,t)))}getDocumentsMatchingQuery(e,t,n,r){return jn(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Bn(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r)}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next((i=>{const s=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-i.size):ke.resolve(ar());let o=_e,a=i;return s.next((t=>ke.forEach(t,((t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?ke.resolve():this.remoteDocumentCache.getEntry(e,t).next((e=>{a=a.insert(t,e)}))))).next((()=>this.populateOverlays(e,t,i))).next((()=>this.computeViews(e,a,t,dr()))).next((e=>({batchId:o,changes:or(e)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ie(t)).next((e=>{let t=sr();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const i=t.collectionGroup;let s=sr();return this.indexManager.getCollectionParents(e,i).next((o=>ke.forEach(o,(o=>{const a=function(e,t){return new Mn(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(i));return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next((e=>{e.forEach(((e,t)=>{s=s.insert(e,t)}))}))})).next((()=>s))))}getDocumentsMatchingCollectionQuery(e,t,n,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((s=>(i=s,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,r)))).next((e=>{i.forEach(((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,cn.newInvalidDocument(r)))}));let n=sr();return e.forEach(((e,r)=>{const s=i.get(e);void 0!==s&&Br(s.mutation,r,yt.empty(),ye.now()),Jn(t,r)&&(n=n.insert(e,r))})),n}))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e){this.serializer=e,this.Or=new Map,this.Nr=new Map}getBundleMetadata(e,t){return ke.resolve(this.Or.get(t))}saveBundleMetadata(e,t){return this.Or.set(t.id,function(e){return{id:e.id,version:e.version,createTime:Oi(e.createTime)}}(t)),ke.resolve()}getNamedQuery(e,t){return ke.resolve(this.Nr.get(t))}saveNamedQuery(e,t){return this.Nr.set(t.name,function(e){return{name:e.name,query:os(e.bundledQuery),readTime:Oi(e.readTime)}}(t)),ke.resolve()}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(){this.overlays=new dt(ie.comparator),this.Br=new Map}getOverlay(e,t){return ke.resolve(this.overlays.get(t))}getOverlays(e,t){const n=ar();return ke.forEach(t,(t=>this.getOverlay(e,t).next((e=>{null!==e&&n.set(t,e)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((n,r)=>{this.wt(e,t,r)})),ke.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.Br.get(n);return void 0!==r&&(r.forEach((e=>this.overlays=this.overlays.remove(e))),this.Br.delete(n)),ke.resolve()}getOverlaysForCollection(e,t,n){const r=ar(),i=t.length+1,s=new ie(t.child("")),o=this.overlays.getIteratorFrom(s);for(;o.hasNext();){const e=o.getNext().value,s=e.getKey();if(!t.isPrefixOf(s.path))break;s.path.length===i&&e.largestBatchId>n&&r.set(e.getKey(),e)}return ke.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let i=new dt(((e,t)=>e-t));const s=this.overlays.getIterator();for(;s.hasNext();){const e=s.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=ar(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=ar(),a=i.getIterator();for(;a.hasNext();)if(a.getNext().value.forEach(((e,t)=>o.set(e,t))),o.size()>=r)break;return ke.resolve(o)}wt(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.Br.get(r.largestBatchId).delete(n.key);this.Br.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new Zr(t,n));let i=this.Br.get(t);void 0===i&&(i=dr(),this.Br.set(t,i)),this.Br.set(t,i.add(n.key))}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(){this.sessionToken=_t.EMPTY_BYTE_STRING}getSessionToken(e){return ke.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,ke.resolve()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(){this.Lr=new gt(ks.kr),this.qr=new gt(ks.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(e,t){const n=new ks(e,t);this.Lr=this.Lr.add(n),this.qr=this.qr.add(n)}Ur(e,t){e.forEach((e=>this.addReference(e,t)))}removeReference(e,t){this.$r(new ks(e,t))}Wr(e,t){e.forEach((e=>this.removeReference(e,t)))}Qr(e){const t=new ie(new te([])),n=new ks(t,e),r=new ks(t,e+1),i=[];return this.qr.forEachInRange([n,r],(e=>{this.$r(e),i.push(e.key)})),i}Gr(){this.Lr.forEach((e=>this.$r(e)))}$r(e){this.Lr=this.Lr.delete(e),this.qr=this.qr.delete(e)}zr(e){const t=new ie(new te([])),n=new ks(t,e),r=new ks(t,e+1);let i=dr();return this.qr.forEachInRange([n,r],(e=>{i=i.add(e.key)})),i}containsKey(e){const t=new ks(e,0),n=this.Lr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class ks{constructor(e,t){this.key=e,this.jr=t}static kr(e,t){return ie.comparator(e.key,t.key)||G(e.jr,t.jr)}static Kr(e,t){return G(e.jr,t.jr)||ie.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Xn=1,this.Jr=new gt(ks.kr)}checkEmpty(e){return ke.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const i=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const s=new Jr(i,t,n,r);this.mutationQueue.push(s);for(const o of r)this.Jr=this.Jr.add(new ks(o.key,i)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return ke.resolve(s)}lookupMutationBatch(e,t){return ke.resolve(this.Hr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.Zr(n),i=r<0?0:r;return ke.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return ke.resolve(0===this.mutationQueue.length?De:this.Xn-1)}getAllMutationBatches(e){return ke.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new ks(t,0),r=new ks(t,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([n,r],(e=>{const t=this.Hr(e.jr);i.push(t)})),ke.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new gt(G);return t.forEach((e=>{const t=new ks(e,0),r=new ks(e,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([t,r],(e=>{n=n.add(e.jr)}))})),ke.resolve(this.Xr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let i=n;ie.isDocumentKey(i)||(i=i.child(""));const s=new ks(new ie(i),0);let o=new gt(G);return this.Jr.forEachWhile((e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.jr)),!0)}),s),ke.resolve(this.Xr(o))}Xr(e){const t=[];return e.forEach((e=>{const n=this.Hr(e);null!==n&&t.push(n)})),t}removeMutationBatch(e,t){D(0===this.Yr(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Jr;return ke.forEach(t.mutations,(r=>{const i=new ks(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)})).next((()=>{this.Jr=n}))}tr(e){}containsKey(e,t){const n=new ks(t,0),r=this.Jr.firstAfterOrEqual(n);return ke.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,ke.resolve()}Yr(e,t){return this.Zr(e)}Zr(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Hr(e){const t=this.Zr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e){this.ei=e,this.docs=function(){return new dt(ie.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),i=r?r.size:0,s=this.ei(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return ke.resolve(n?n.document.mutableCopy():cn.newInvalidDocument(t))}getEntries(e,t){let n=rr();return t.forEach((e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():cn.newInvalidDocument(e))})),ke.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let i=rr();const s=t.path,o=new ie(s.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!s.isPrefixOf(e.path))break;e.path.length>s.length+1||Ie(Ee(o),n)<=0||(r.has(o.key)||Jn(t,o))&&(i=i.insert(o.key,o.mutableCopy()))}return ke.resolve(i)}getAllFromCollectionGroup(e,t,n,r){O(9500)}ti(e,t){return ke.forEach(this.docs,(e=>t(e)))}newChangeBuffer(e){return new Ns(this)}getSize(e){return ke.resolve(this.size)}}class Ns extends bs{constructor(e){super(),this.Fr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,r)=>{r.isValidDocument()?t.push(this.Fr.addEntry(e,r)):this.Fr.removeEntry(n)})),ke.waitFor(t)}getFromCache(e,t){return this.Fr.getEntry(e,t)}getAllFromCache(e,t){return this.Fr.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e){this.persistence=e,this.ni=new tr((e=>xn(e)),Pn),this.lastRemoteSnapshotVersion=ve.min(),this.highestTargetId=0,this.ri=0,this.ii=new As,this.targetCount=0,this.si=fs.sr()}forEachTarget(e,t){return this.ni.forEach(((e,n)=>t(n))),ke.resolve()}getLastRemoteSnapshotVersion(e){return ke.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return ke.resolve(this.ri)}allocateTargetId(e){return this.highestTargetId=this.si.next(),ke.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.ri&&(this.ri=t),ke.resolve()}cr(e){this.ni.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.si=new fs(t),this.highestTargetId=t),e.sequenceNumber>this.ri&&(this.ri=e.sequenceNumber)}addTargetData(e,t){return this.cr(t),this.targetCount+=1,ke.resolve()}updateTargetData(e,t){return this.cr(t),ke.resolve()}removeTargetData(e,t){return this.ni.delete(t.target),this.ii.Qr(t.targetId),this.targetCount-=1,ke.resolve()}removeTargets(e,t,n){let r=0;const i=[];return this.ni.forEach(((s,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.ni.delete(s),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)})),ke.waitFor(i).next((()=>r))}getTargetCount(e){return ke.resolve(this.targetCount)}getTargetData(e,t){const n=this.ni.get(t)||null;return ke.resolve(n)}addMatchingKeys(e,t,n){return this.ii.Ur(t,n),ke.resolve()}removeMatchingKeys(e,t,n){this.ii.Wr(t,n);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach((t=>{i.push(r.markPotentiallyOrphaned(e,t))})),ke.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.ii.Qr(t),ke.resolve()}getMatchingKeysForTargetId(e,t){const n=this.ii.zr(t);return ke.resolve(n)}containsKey(e,t){return ke.resolve(this.ii.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e,t){this.oi={},this.overlays={},this._i=new Ne(0),this.ai=!1,this.ai=!0,this.ui=new Cs,this.referenceDelegate=e(this),this.ci=new Ds(this),this.indexManager=new cs,this.remoteDocumentCache=function(e){return new Os(e)}((e=>this.referenceDelegate.li(e))),this.serializer=new ss(t),this.hi=new Is(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Ss,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.oi[e.toKey()];return n||(n=new Rs(t,this.referenceDelegate),this.oi[e.toKey()]=n),n}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(e,t,n){C("MemoryPersistence","Starting transaction:",e);const r=new Ps(this._i.next());return this.referenceDelegate.Pi(),n(r).next((e=>this.referenceDelegate.Ti(r).next((()=>e)))).toPromise().then((e=>(r.raiseOnCommittedEvent(),e)))}Ii(e,t){return ke.or(Object.values(this.oi).map((n=>()=>n.containsKey(e,t))))}}class Ps extends Ce{constructor(e){super(),this.currentSequenceNumber=e}}class Ls{constructor(e){this.persistence=e,this.Ei=new As,this.Ri=null}static Ai(e){return new Ls(e)}get Vi(){if(this.Ri)return this.Ri;throw O(60996)}addReference(e,t,n){return this.Ei.addReference(n,t),this.Vi.delete(n.toString()),ke.resolve()}removeReference(e,t,n){return this.Ei.removeReference(n,t),this.Vi.add(n.toString()),ke.resolve()}markPotentiallyOrphaned(e,t){return this.Vi.add(t.toString()),ke.resolve()}removeTarget(e,t){this.Ei.Qr(t.targetId).forEach((e=>this.Vi.add(e.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((e=>{e.forEach((e=>this.Vi.add(e.toString())))})).next((()=>n.removeTargetData(e,t)))}Pi(){this.Ri=new Set}Ti(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return ke.forEach(this.Vi,(n=>{const r=ie.fromPath(n);return this.di(e,r).next((e=>{e||t.removeEntry(r,ve.min())}))})).next((()=>(this.Ri=null,t.apply(e))))}updateLimboDocument(e,t){return this.di(e,t).next((e=>{e?this.Vi.delete(t.toString()):this.Vi.add(t.toString())}))}li(e){return 0}di(e,t){return ke.or([()=>ke.resolve(this.Ei.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Ms{constructor(e,t){this.persistence=e,this.mi=new tr((e=>Ue(e.path)),((e,t)=>e.isEqual(t))),this.garbageCollector=ws(this,t)}static Ai(e,t){return new Ms(e,t)}Pi(){}Ti(e){return ke.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Vr(e){const t=this.gr(e);return this.persistence.getTargetCache().getTargetCount(e).next((e=>t.next((t=>e+t))))}gr(e){let t=0;return this.dr(e,(e=>{t++})).next((()=>t))}dr(e,t){return ke.forEach(this.mi,((n,r)=>this.yr(e,n,r).next((e=>e?ke.resolve():t(r)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ti(e,(r=>this.yr(e,r,t).next((e=>{e||(n++,i.removeEntry(r,ve.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.mi.set(t,e.currentSequenceNumber),ke.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.mi.set(n,e.currentSequenceNumber),ke.resolve()}removeReference(e,t,n){return this.mi.set(n,e.currentSequenceNumber),ke.resolve()}updateLimboDocument(e,t){return this.mi.set(t,e.currentSequenceNumber),ke.resolve()}li(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Wt(e.data.value)),t}yr(e,t,n){return ke.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.mi.get(t);return ke.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Us{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Ps=n,this.Ts=r}static Is(e,t){let n=dr(),r=dr();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Us(e,t.fromCache,n,r)}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=function(){return(0,a.nr)()?8:Re((0,a.ZQ)())>0?6:4}()}initialize(e,t){this.ds=e,this.indexManager=t,this.Es=!0}getDocumentsMatchingQuery(e,t,n,r){const i={result:null};return this.fs(e,t).next((e=>{i.result=e})).next((()=>{if(!i.result)return this.gs(e,t,r,n).next((e=>{i.result=e}))})).next((()=>{if(i.result)return;const n=new Vs;return this.ps(e,t,n).next((r=>{if(i.result=r,this.Rs)return this.ys(e,t,n,r.size)}))})).next((()=>i.result))}ys(e,t,n,r){return n.documentReadCount<this.As?(S()<=v.$b.DEBUG&&C("QueryEngine","SDK will not create cache indexes for query:",Xn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),ke.resolve()):(S()<=v.$b.DEBUG&&C("QueryEngine","Query:",Xn(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.Vs*r?(S()<=v.$b.DEBUG&&C("QueryEngine","The SDK decides to create cache indexes for query:",Xn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,qn(t))):ke.resolve())}fs(e,t){if(Fn(t))return ke.resolve(null);let n=qn(t);return this.indexManager.getIndexType(e,n).next((r=>0===r?null:(null!==t.limit&&1===r&&(t=Gn(t,null,"F"),n=qn(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((r=>{const i=dr(...r);return this.ds.getDocuments(e,i).next((r=>this.indexManager.getMinOffset(e,n).next((n=>{const s=this.ws(t,r);return this.Ss(t,s,i,n.readTime)?this.fs(e,Gn(t,null,"F")):this.bs(e,s,t,n)}))))})))))}gs(e,t,n,r){return Fn(t)||r.isEqual(ve.min())?ke.resolve(null):this.ds.getDocuments(e,n).next((i=>{const s=this.ws(t,i);return this.Ss(t,s,n,r)?ke.resolve(null):(S()<=v.$b.DEBUG&&C("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Xn(t)),this.bs(e,s,t,be(r,_e)).next((e=>e)))}))}ws(e,t){let n=new gt(Zn(e));return t.forEach(((t,r)=>{Jn(e,r)&&(n=n.add(r))})),n}Ss(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}ps(e,t,n){return S()<=v.$b.DEBUG&&C("QueryEngine","Using full collection scan to execute query:",Xn(t)),this.ds.getDocumentsMatchingQuery(e,t,Te.min(),n)}bs(e,t,n,r){return this.ds.getDocumentsMatchingQuery(e,n,r).next((e=>(t.forEach((t=>{e=e.insert(t.key,t)})),e)))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js="LocalStore",Bs=3e8;class $s{constructor(e,t,n,r){this.persistence=e,this.Ds=t,this.serializer=r,this.Cs=new dt(G),this.vs=new tr((e=>xn(e)),Pn),this.Fs=new Map,this.Ms=e.getRemoteDocumentCache(),this.ci=e.getTargetCache(),this.hi=e.getBundleCache(),this.xs(n)}xs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ts(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Cs)))}}function qs(e,t,n,r){return new $s(e,t,n,r)}async function zs(e,t){const n=x(e);return await n.persistence.runTransaction("Handle user change","readonly",(e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next((i=>(r=i,n.xs(t),n.mutationQueue.getAllMutationBatches(e)))).next((t=>{const i=[],s=[];let o=dr();for(const e of r){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next((e=>({Os:e,removedBatchIds:i,addedBatchIds:s})))}))}))}function Hs(e,t){const n=x(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(e=>{const r=t.batch.keys(),i=n.Ms.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const i=n.batch,s=i.keys();let o=ke.resolve();return s.forEach((e=>{o=o.next((()=>r.getEntry(t,e))).next((t=>{const s=n.docVersions.get(e);D(null!==s,48541),t.version.compareTo(s)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))}))})),o.next((()=>e.mutationQueue.removeMutationBatch(t,i)))}(n,e,t,i).next((()=>i.apply(e))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=dr();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t)))).next((()=>n.localDocuments.getDocuments(e,r)))}))}function Ks(e){const t=x(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.ci.getLastRemoteSnapshotVersion(e)))}function Gs(e,t){const n=x(e),r=t.snapshotVersion;let i=n.Cs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(e=>{const s=n.Ms.newChangeBuffer({trackRemovals:!0});i=n.Cs;const o=[];t.targetChanges.forEach(((s,a)=>{const c=i.get(a);if(!c)return;o.push(n.ci.removeMatchingKeys(e,s.removedDocuments,a).next((()=>n.ci.addMatchingKeys(e,s.addedDocuments,a))));let u=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?u=u.withResumeToken(_t.EMPTY_BYTE_STRING,ve.min()).withLastLimboFreeSnapshotVersion(ve.min()):s.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(s.resumeToken,r)),i=i.insert(a,u),function(e,t,n){if(0===e.resumeToken.approximateByteSize())return!0;const r=t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds();if(r>=Bs)return!0;const i=n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size;return i>0}(c,u,s)&&o.push(n.ci.updateTargetData(e,u))}));let a=rr(),c=dr();if(t.documentUpdates.forEach((r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))})),o.push(Ws(e,s,t.documentUpdates).next((e=>{a=e.Ns,c=e.Bs}))),!r.isEqual(ve.min())){const t=n.ci.getLastRemoteSnapshotVersion(e).next((t=>n.ci.setTargetsMetadata(e,e.currentSequenceNumber,r)));o.push(t)}return ke.waitFor(o).next((()=>s.apply(e))).next((()=>n.localDocuments.getLocalViewOfDocuments(e,a,c))).next((()=>a))})).then((e=>(n.Cs=i,e)))}function Ws(e,t,n){let r=dr(),i=dr();return n.forEach((e=>r=r.add(e))),t.getEntries(e,r).next((e=>{let r=rr();return n.forEach(((n,s)=>{const o=e.get(n);s.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),s.isNoDocument()&&s.version.isEqual(ve.min())?(t.removeEntry(n,s.readTime),r=r.insert(n,s)):!o.isValidDocument()||s.version.compareTo(o.version)>0||0===s.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(s),r=r.insert(n,s)):C(js,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",s.version)})),{Ns:r,Bs:i}}))}function Qs(e,t){const n=x(e);return n.persistence.runTransaction("Get next mutation batch","readonly",(e=>(void 0===t&&(t=De),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t))))}function Xs(e,t){const n=x(e);return n.persistence.runTransaction("Allocate target","readwrite",(e=>{let r;return n.ci.getTargetData(e,t).next((i=>i?(r=i,ke.resolve(r)):n.ci.allocateTargetId(e).next((i=>(r=new is(t,i,"TargetPurposeListen",e.currentSequenceNumber),n.ci.addTargetData(e,r).next((()=>r)))))))})).then((e=>{const r=n.Cs.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Cs=n.Cs.insert(e.targetId,e),n.vs.set(t,e.targetId)),e}))}async function Js(e,t,n){const r=x(e),i=r.Cs.get(t),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,(e=>r.persistence.referenceDelegate.removeTarget(e,i)))}catch(e){if(!Oe(e))throw e;C(js,`Failed to update sequence numbers for target ${t}: ${e}`)}r.Cs=r.Cs.remove(t),r.vs.delete(i.target)}function Ys(e,t,n){const r=x(e);let i=ve.min(),s=dr();return r.persistence.runTransaction("Execute query","readwrite",(e=>function(e,t,n){const r=x(e),i=r.vs.get(n);return void 0!==i?ke.resolve(r.Cs.get(i)):r.ci.getTargetData(t,n)}(r,e,qn(t)).next((t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.ci.getMatchingKeysForTargetId(e,t.targetId).next((e=>{s=e}))})).next((()=>r.Ds.getDocumentsMatchingQuery(e,t,n?i:ve.min(),n?s:dr()))).next((e=>(Zs(r,Yn(t),e),{documents:e,Ls:s})))))}function Zs(e,t,n){let r=e.Fs.get(t)||ve.min();n.forEach(((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)})),e.Fs.set(t,r)}class eo{constructor(){this.activeTargetIds=pr()}Ws(e){this.activeTargetIds=this.activeTargetIds.add(e)}Qs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}$s(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class to{constructor(){this.Co=new eo,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Co.Ws(e),this.vo[e]||"not-current"}updateQueryState(e,t,n){this.vo[e]=t}removeLocalQueryTarget(e){this.Co.Qs(e)}isLocalQueryTarget(e){return this.Co.activeTargetIds.has(e)}clearQueryState(e){delete this.vo[e]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(e){return this.Co.activeTargetIds.has(e)}start(){return this.Co=new eo,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{Fo(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ro="ConnectivityMonitor";class io{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(e){this.Bo.push(e)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){C(ro,"Network connectivity changed: AVAILABLE");for(const e of this.Bo)e(0)}No(){C(ro,"Network connectivity changed: UNAVAILABLE");for(const e of this.Bo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let so=null;function oo(){return null===so?so=function(){return 268435456+Math.round(2147483648*Math.random())}():so++,"0x"+so.toString(16)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const ao="RestConnection",co={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class uo{get ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Ko=`projects/${n}/databases/${r}`,this.Uo=this.databaseId.database===Dt?`project_id=${n}`:`project_id=${n}&database_id=${r}`}$o(e,t,n,r,i){const s=oo(),o=this.Wo(e,t.toUriEncodedString());C(ao,`Sending RPC '${e}' ${s}:`,o,n);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(c,r,i);const{host:u}=new URL(o),l=(0,a.zJ)(u);return this.Go(e,o,c,n,l).then((t=>(C(ao,`Received RPC '${e}' ${s}: `,t),t)),(t=>{throw k(ao,`RPC '${e}' ${s} failed with error: `,t,"url: ",o,"request:",n),t}))}zo(e,t,n,r,i,s){return this.$o(e,t,n,r,i)}Qo(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+E}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((t,n)=>e[n]=t)),n&&n.headers.forEach(((t,n)=>e[n]=t))}Wo(e,t){const n=co[e];let r=`${this.qo}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(e){this.jo=e.jo,this.Jo=e.Jo}Ho(e){this.Zo=e}Xo(e){this.Yo=e}e_(e){this.t_=e}onMessage(e){this.n_=e}close(){this.Jo()}send(e){this.jo(e)}r_(){this.Zo()}i_(){this.Yo()}s_(e){this.t_(e)}o_(e){this.n_(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ho="WebChannelConnection",fo=(e,t,n)=>{e.listen(t,(e=>{try{n(e)}catch(e){setTimeout((()=>{throw e}),0)}}))};class po extends uo{constructor(e){super(e),this.__=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static a_(){if(!po.u_){const e=m();fo(e,g.STAT_EVENT,(e=>{e.stat===p.PROXY?C(ho,"STAT_EVENT: detected buffering proxy"):e.stat===p.NOPROXY&&C(ho,"STAT_EVENT: detected no buffering proxy")})),po.u_=!0}}Go(e,t,n,r,i){const s=oo();return new Promise(((i,o)=>{const a=new l;a.setWithCredentials(!0),a.listenOnce(d.COMPLETE,(()=>{try{switch(a.getLastErrorCode()){case f.NO_ERROR:const t=a.getResponseJson();C(ho,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(t)),i(t);break;case f.TIMEOUT:C(ho,`RPC '${e}' ${s} timed out`),o(new L(P.DEADLINE_EXCEEDED,"Request time out"));break;case f.HTTP_ERROR:const n=a.getStatus();if(C(ho,`RPC '${e}' ${s} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=e?.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(t)>=0?t:P.UNKNOWN}(t.status);o(new L(e,t.message))}else o(new L(P.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new L(P.UNAVAILABLE,"Connection failed."));break;default:O(9055,{c_:e,streamId:s,l_:a.getLastErrorCode(),h_:a.getLastError()})}}finally{C(ho,`RPC '${e}' ${s} completed.`)}}));const c=JSON.stringify(r);C(ho,`RPC '${e}' ${s} sending request:`,r),a.send(t,"POST",c,n,15)}))}P_(e,t,n){const r=oo(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],s=this.createWebChannelTransport(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},a=this.longPollingOptions.timeoutSeconds;void 0!==a&&(o.longPollingTimeout=Math.round(1e3*a)),this.useFetchStreams&&(o.useFetchStreams=!0),this.Qo(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;const c=i.join("");C(ho,`Creating RPC '${e}' stream ${r}: ${c}`,o);const u=s.createWebChannel(c,o);this.T_(u);let l=!1,d=!1;const f=new lo({jo:t=>{d?C(ho,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(l||(C(ho,`Opening RPC '${e}' stream ${r} transport.`),u.open(),l=!0),C(ho,`RPC '${e}' stream ${r} sending:`,t),u.send(t))},Jo:()=>u.close()});return fo(u,h.EventType.OPEN,(()=>{d||(C(ho,`RPC '${e}' stream ${r} transport opened.`),f.r_())})),fo(u,h.EventType.CLOSE,(()=>{d||(d=!0,C(ho,`RPC '${e}' stream ${r} transport closed`),f.s_(),this.I_(u))})),fo(u,h.EventType.ERROR,(t=>{d||(d=!0,k(ho,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),f.s_(new L(P.UNAVAILABLE,"The operation could not be completed")))})),fo(u,h.EventType.MESSAGE,(t=>{if(!d){const n=t.data[0];D(!!n,16349);const i=n,s=i?.error||i[0]?.error;if(s){C(ho,`RPC '${e}' stream ${r} received error:`,s);const t=s.status;let n=function(e){const t=ti[e];if(void 0!==t)return ii(t)}(t),i=s.message;"NOT_FOUND"===t&&i.includes("database")&&i.includes("does not exist")&&i.includes(this.databaseId.database)&&k(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),void 0===n&&(n=P.INTERNAL,i="Unknown error status: "+t+" with message "+s.message),d=!0,f.s_(new L(n,i)),u.close()}else C(ho,`RPC '${e}' stream ${r} received:`,n),f.o_(n)}})),po.a_(),setTimeout((()=>{f.i_()}),0),f}terminate(){this.__.forEach((e=>e.close())),this.__=[]}T_(e){this.__.push(e)}I_(e){this.__=this.__.filter((t=>t===e))}Qo(e,t,n){super.Qo(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return y()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function go(e){return new po(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mo(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yo(e){return new Si(e,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */po.u_=!1;class vo{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Di=e,this.timerId=t,this.E_=n,this.R_=r,this.A_=i,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(e){this.cancel();const t=Math.floor(this.V_+this.p_()),n=Math.max(0,Date.now()-this.m_),r=Math.max(0,t-n);r>0&&C("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,r,(()=>(this.m_=Date.now(),e()))),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){null!==this.d_&&(this.d_.skipDelay(),this.d_=null)}cancel(){null!==this.d_&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _o="PersistentStream";class wo{constructor(e,t,n,r,i,s,o,a){this.Di=e,this.w_=n,this.S_=r,this.connection=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new vo(e,t)}M_(){return 1===this.state||5===this.state||this.x_()}x_(){return 2===this.state||3===this.state}start(){this.v_=0,4!==this.state?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&null===this.D_&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,(()=>this.L_())))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(e,t){this.q_(),this.K_(),this.F_.cancel(),this.b_++,4!==e?this.F_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(A(t.toString()),A("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===P.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.e_(t)}U_(){}auth(){this.state=1;const e=this.W_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([e,n])=>{this.b_===t&&this.Q_(e,n)}),(t=>{e((()=>{const e=new L(P.UNKNOWN,"Fetching auth token failed: "+t.message);return this.G_(e)}))}))}Q_(e,t){const n=this.W_(this.b_);this.stream=this.z_(e,t),this.stream.Ho((()=>{n((()=>this.listener.Ho()))})),this.stream.Xo((()=>{n((()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,(()=>(this.x_()&&(this.state=3),Promise.resolve()))),this.listener.Xo())))})),this.stream.e_((e=>{n((()=>this.G_(e)))})),this.stream.onMessage((e=>{n((()=>1==++this.v_?this.j_(e):this.onNext(e)))}))}O_(){this.state=5,this.F_.g_((async()=>{this.state=0,this.start()}))}G_(e){return C(_o,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Di.enqueueAndForget((()=>this.b_===e?t():(C(_o,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class bo extends wo{constructor(e,t,n,r,i,s){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=Bi(this.serializer,e),n=function(e){if(!("targetChange"in e))return ve.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?ve.min():t.readTime?Oi(t.readTime):ve.min()}(e);return this.listener.J_(t,n)}H_(e){const t={};t.database=Vi(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=Ln(r)?{documents:zi(e,r)}:{query:Hi(e,r).dt},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=ki(e,t.resumeToken);const r=Ci(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(ve.min())>0){n.readTime=Ai(e,t.snapshotVersion.toTimestamp());const r=Ci(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=Gi(this.serializer,e);n&&(t.labels=n),this.k_(t)}Z_(e){const t={};t.database=Vi(this.serializer),t.removeTarget=e,this.k_(t)}}class Eo extends wo{constructor(e,t,n,r,i,s){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,s),this.serializer=i}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return D(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,D(!e.writeResults||0===e.writeResults.length,55816),this.listener.ea()}onNext(e){D(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=qi(e.writeResults,e.commitTime),n=Oi(e.commitTime);return this.listener.ta(n,t)}na(){const e={};e.database=Vi(this.serializer),this.k_(e)}Y_(e){const t={streamToken:this.lastStreamToken,writes:e.map((e=>$i(this.serializer,e)))};this.k_(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{}class Io extends To{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ra=!1}ia(){if(this.ra)throw new L(P.FAILED_PRECONDITION,"The client has already been terminated.")}$o(e,t,n,r){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,s])=>this.connection.$o(e,Di(t,n),r,i,s))).catch((e=>{throw"FirebaseError"===e.name?(e.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new L(P.UNKNOWN,e.toString())}))}zo(e,t,n,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,o])=>this.connection.zo(e,Di(t,n),r,s,o,i))).catch((e=>{throw"FirebaseError"===e.name?(e.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new L(P.UNKNOWN,e.toString())}))}terminate(){this.ra=!0,this.connection.terminate()}}function So(e,t,n,r){return new Io(e,t,n,r)}class Co{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){0===this.sa&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve()))))}la(e){"Online"===this.state?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,"Online"===e&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(A(t),this._a=!1):C("OnlineStateTracker",t)}ha(){null!==this.oa&&(this.oa.cancel(),this.oa=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ao="RemoteStore";class ko{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new fs(1e3),this.Aa=new fs(1001),this.Va=new Set,this.da=[],this.ma=i,this.ma.Fo((e=>{n.enqueueAndForget((async()=>{Vo(this)&&(C(Ao,"Restarting streams for network reachability change."),await async function(e){const t=x(e);t.Va.add(4),await Oo(t),t.fa.set("Unknown"),t.Va.delete(4),await Ro(t)}(this))}))})),this.fa=new Co(n,r)}}async function Ro(e){if(Vo(e))for(const t of e.da)await t(!0)}async function Oo(e){for(const t of e.da)await t(!1)}function No(e,t){return e.Ia.get(t)||void 0}function Do(e,t){const n=x(e),r=No(n,t.targetId);if(void 0!==r&&n.Ta.has(r))return;const i=function(e,t){const n=No(e,t);void 0!==n&&e.Ea.delete(n);const r=function(e,t){return t%2!=0?e.Aa.next():e.Ra.next()}(e,t);return e.Ia.set(t,r),e.Ea.set(r,t),r}(n,t.targetId);C(Ao,"remoteStoreListen mapping SDK target ID to remote",t.targetId,i);const s=new is(t.target,i,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);n.Ta.set(i,s),Uo(n)?Mo(n):ra(n).x_()&&Po(n,s)}function xo(e,t){const n=x(e),r=ra(n),i=No(n,t);C(Ao,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,i),n.Ta.delete(i),n.Ia.delete(t),n.Ea.delete(i),r.x_()&&Lo(n,i),0===n.Ta.size&&(r.x_()?r.B_():Vo(n)&&n.fa.set("Unknown"))}function Po(e,t){if(e.ga.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(ve.min())>0){const n=e.Ea.get(t.targetId);if(void 0===n)return void C(Ao,"SDK target ID not found for remote ID: "+t.targetId);const r=e.remoteSyncer.getRemoteKeysForTarget(n).size;t=t.withExpectedCount(r)}ra(e).H_(t)}function Lo(e,t){e.ga.$e(t),ra(e).Z_(t)}function Mo(e){e.ga=new _i({getRemoteKeysForTarget:t=>{const n=e.Ea.get(t);return void 0!==n?e.remoteSyncer.getRemoteKeysForTarget(n):dr()},Rt:t=>e.Ta.get(t)||null,lt:()=>e.datastore.serializer.databaseId}),ra(e).start(),e.fa.aa()}function Uo(e){return Vo(e)&&!ra(e).M_()&&e.Ta.size>0}function Vo(e){return 0===x(e).Va.size}function Fo(e){e.ga=void 0}async function jo(e){e.fa.set("Online")}async function Bo(e){e.Ta.forEach(((t,n)=>{Po(e,t)}))}async function $o(e,t){Fo(e),Uo(e)?(e.fa.la(t),Mo(e)):e.fa.set("Unknown")}async function qo(e,t,n){if(e.fa.set("Online"),t instanceof mi&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds){if(e.Ta.has(r)){const t=e.Ea.get(r);void 0!==t&&(await e.remoteSyncer.rejectListen(t,n),e.Ia.delete(t),e.Ea.delete(r)),e.Ta.delete(r)}e.ga.removeTarget(r)}}(e,t)}catch(n){C(Ao,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await zo(e,n)}else if(t instanceof pi?e.ga.Xe(t):t instanceof gi?e.ga.it(t):e.ga.tt(t),!n.isEqual(ve.min()))try{const t=await Ks(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.ga.Pt(t);n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.Ta.get(r);i&&e.Ta.set(r,i.withResumeToken(n.resumeToken,t))}})),n.targetMismatches.forEach(((t,n)=>{const r=e.Ta.get(t);if(!r)return;e.Ta.set(t,r.withResumeToken(_t.EMPTY_BYTE_STRING,r.snapshotVersion)),Lo(e,t);const i=new is(r.target,t,n,r.sequenceNumber);Po(e,i)}));const r=function(e,t){const n=new Map;t.targetChanges.forEach(((t,r)=>{const i=e.Ea.get(r);void 0!==i&&n.set(i,t)}));let r=new dt(G);return t.targetMismatches.forEach(((t,n)=>{const i=e.Ea.get(t);void 0!==i&&(r=r.insert(i,n))})),new di(t.snapshotVersion,n,r,t.documentUpdates,t.resolvedLimboDocuments)}(e,n);return e.remoteSyncer.applyRemoteEvent(r)}(e,n)}catch(t){C(Ao,"Failed to raise snapshot:",t),await zo(e,t)}}async function zo(e,t,n){if(!Oe(t))throw t;e.Va.add(1),await Oo(e),e.fa.set("Offline"),n||(n=()=>Ks(e.localStore)),e.asyncQueue.enqueueRetryable((async()=>{C(Ao,"Retrying IndexedDB access"),await n(),e.Va.delete(1),await Ro(e)}))}function Ho(e,t){return t().catch((n=>zo(e,n,t)))}async function Ko(e){const t=x(e),n=ia(t);let r=t.Pa.length>0?t.Pa[t.Pa.length-1].batchId:De;for(;Go(t);)try{const e=await Qs(t.localStore,r);if(null===e){0===t.Pa.length&&n.B_();break}r=e.batchId,Wo(t,e)}catch(e){await zo(t,e)}Qo(t)&&Xo(t)}function Go(e){return Vo(e)&&e.Pa.length<10}function Wo(e,t){e.Pa.push(t);const n=ia(e);n.x_()&&n.X_&&n.Y_(t.mutations)}function Qo(e){return Vo(e)&&!ia(e).M_()&&e.Pa.length>0}function Xo(e){ia(e).start()}async function Jo(e){ia(e).na()}async function Yo(e){const t=ia(e);for(const n of e.Pa)t.Y_(n.mutations)}async function Zo(e,t,n){const r=e.Pa.shift(),i=Yr.from(r,t,n);await Ho(e,(()=>e.remoteSyncer.applySuccessfulWrite(i))),await Ko(e)}async function ea(e,t){t&&ia(e).X_&&await async function(e,t){if(function(e){return ri(e)&&e!==P.ABORTED}(t.code)){const n=e.Pa.shift();ia(e).N_(),await Ho(e,(()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t))),await Ko(e)}}(e,t),Qo(e)&&Xo(e)}async function ta(e,t){const n=x(e);n.asyncQueue.verifyOperationInProgress(),C(Ao,"RemoteStore received new credentials");const r=Vo(n);n.Va.add(3),await Oo(n),r&&n.fa.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Va.delete(3),await Ro(n)}async function na(e,t){const n=x(e);t?(n.Va.delete(2),await Ro(n)):t||(n.Va.add(2),await Oo(n),n.fa.set("Unknown"))}function ra(e){return e.pa||(e.pa=function(e,t,n){const r=x(e);return r.ia(),new bo(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}(e.datastore,e.asyncQueue,{Ho:jo.bind(null,e),Xo:Bo.bind(null,e),e_:$o.bind(null,e),J_:qo.bind(null,e)}),e.da.push((async t=>{t?(e.pa.N_(),Uo(e)?Mo(e):e.fa.set("Unknown")):(await e.pa.stop(),Fo(e))}))),e.pa}function ia(e){return e.ya||(e.ya=function(e,t,n){const r=x(e);return r.ia(),new Eo(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Ho:()=>Promise.resolve(),Xo:Jo.bind(null,e),e_:ea.bind(null,e),ea:Yo.bind(null,e),ta:Zo.bind(null,e)}),e.da.push((async t=>{t?(e.ya.N_(),await Ko(e)):(await e.ya.stop(),e.Pa.length>0&&(C(Ao,`Stopping write stream with ${e.Pa.length} pending writes`),e.Pa=[]))}))),e.ya
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class sa{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new M,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((e=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,i){const s=Date.now()+n,o=new sa(e,t,s,r,i);return o.start(n),o}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new L(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function oa(e,t){if(A("AsyncQueue",`${t}: ${e}`),Oe(e))return new L(P.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{static emptySet(e){return new aa(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||ie.comparator(t.key,n.key):(e,t)=>ie.comparator(e.key,t.key),this.keyedMap=sr(),this.sortedSet=new dt(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof aa))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new aa;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(){this.wa=new dt(ie.comparator)}track(e){const t=e.doc.key,n=this.wa.get(t);n?0!==e.type&&3===n.type?this.wa=this.wa.insert(t,e):3===e.type&&1!==n.type?this.wa=this.wa.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.wa=this.wa.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.wa=this.wa.remove(t):1===e.type&&2===n.type?this.wa=this.wa.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.wa=this.wa.insert(t,{type:2,doc:e.doc}):O(63341,{At:e,Sa:n}):this.wa=this.wa.insert(t,e)}ba(){const e=[];return this.wa.inorderTraversal(((t,n)=>{e.push(n)})),e}}class ua{constructor(e,t,n,r,i,s,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=s,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,i){const s=[];return t.forEach((e=>{s.push({type:0,doc:e})})),new ua(e,t,aa.emptySet(t),s,n,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Wn(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some((e=>e.Fa()))}}class ha{constructor(){this.queries=da(),this.onlineState="Unknown",this.Ma=new Set}terminate(){!function(e,t){const n=x(e),r=n.queries;n.queries=da(),r.forEach(((e,n)=>{for(const r of n.Ca)r.onError(t)}))}(this,new L(P.ABORTED,"Firestore shutting down"))}}function da(){return new tr((e=>Qn(e)),Wn)}async function fa(e,t){const n=x(e);let r=3;const i=t.query;let s=n.queries.get(i);s?!s.va()&&t.Fa()&&(r=2):(s=new la,r=t.Fa()?0:1);try{switch(r){case 0:s.Da=await n.onListen(i,!0);break;case 1:s.Da=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(e){const n=oa(e,`Initialization of query '${Xn(t.query)}' failed`);return void t.onError(n)}n.queries.set(i,s),s.Ca.push(t),t.xa(n.onlineState),s.Da&&t.Oa(s.Da)&&ya(n)}async function pa(e,t){const n=x(e),r=t.query;let i=3;const s=n.queries.get(r);if(s){const e=s.Ca.indexOf(t);e>=0&&(s.Ca.splice(e,1),0===s.Ca.length?i=t.Fa()?0:1:!s.va()&&t.Fa()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function ga(e,t){const n=x(e);let r=!1;for(const i of t){const e=i.query,t=n.queries.get(e);if(t){for(const e of t.Ca)e.Oa(i)&&(r=!0);t.Da=i}}r&&ya(n)}function ma(e,t,n){const r=x(e),i=r.queries.get(t);if(i)for(const s of i.Ca)s.onError(n);r.queries.delete(t)}function ya(e){e.Ma.forEach((e=>{e.next()}))}var va,_a;(_a=va||(va={})).Na="default",_a.Cache="cache";class wa{constructor(e,t,n){this.query=e,this.Ba=t,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=n||{}}Oa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new ua(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.La?this.qa(e)&&(this.Ba.next(e),t=!0):this.Ka(e,this.onlineState)&&(this.Ua(e),t=!0),this.ka=e,t}onError(e){this.Ba.error(e)}xa(e){this.onlineState=e;let t=!1;return this.ka&&!this.La&&this.Ka(this.ka,e)&&(this.Ua(this.ka),t=!0),t}Ka(e,t){if(!e.fromCache)return!0;if(!this.Fa())return!0;const n="Offline"!==t;return(!this.options.$a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}qa(e){if(e.docChanges.length>0)return!0;const t=this.ka&&this.ka.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}Ua(e){e=ua.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.La=!0,this.Ba.next(e)}Fa(){return this.options.source!==va.Cache}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ba{constructor(e){this.key=e}}class Ea{constructor(e){this.key=e}}class Ta{constructor(e,t){this.query=e,this.eu=t,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=dr(),this.mutatedKeys=dr(),this.ru=Zn(e),this.iu=new aa(this.ru)}get su(){return this.eu}ou(e,t){const n=t?t._u:new ca,r=t?t.iu:this.iu;let i=t?t.mutatedKeys:this.mutatedKeys,s=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal(((e,t)=>{const u=r.get(e),l=Jn(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),d=!!l&&(l.hasLocalMutations||this.mutatedKeys.has(l.key)&&l.hasCommittedMutations);let f=!1;u&&l?u.data.isEqual(l.data)?h!==d&&(n.track({type:3,doc:l}),f=!0):this.au(u,l)||(n.track({type:2,doc:l}),f=!0,(a&&this.ru(l,a)>0||c&&this.ru(l,c)<0)&&(o=!0)):!u&&l?(n.track({type:0,doc:l}),f=!0):u&&!l&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(l?(s=s.add(l),i=d?i.add(e):i.delete(e)):(s=s.delete(e),i=i.delete(e)))})),null!==this.query.limit)for(;s.size>this.query.limit;){const e="F"===this.query.limitType?s.last():s.first();s=s.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{iu:s,_u:n,Ss:o,mutatedKeys:i}}au(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const i=this.iu;this.iu=e.iu,this.mutatedKeys=e.mutatedKeys;const s=e._u.ba();s.sort(((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{At:e})}};return n(e)-n(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e.type,t.type)||this.ru(e.doc,t.doc))),this.uu(n),r=r??!1;const o=t&&!r?this.cu():[],a=0===this.nu.size&&this.current&&!r?1:0,c=a!==this.tu;return this.tu=a,0!==s.length||c?{snapshot:new ua(this.query,e.iu,i,s,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),lu:o}:{lu:o}}xa(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({iu:this.iu,_u:new ca,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(e){return!this.eu.has(e)&&!!this.iu.has(e)&&!this.iu.get(e).hasLocalMutations}uu(e){e&&(e.addedDocuments.forEach((e=>this.eu=this.eu.add(e))),e.modifiedDocuments.forEach((e=>{})),e.removedDocuments.forEach((e=>this.eu=this.eu.delete(e))),this.current=e.current)}cu(){if(!this.current)return[];const e=this.nu;this.nu=dr(),this.iu.forEach((e=>{this.hu(e.key)&&(this.nu=this.nu.add(e.key))}));const t=[];return e.forEach((e=>{this.nu.has(e)||t.push(new Ea(e))})),this.nu.forEach((n=>{e.has(n)||t.push(new ba(n))})),t}Pu(e){this.eu=e.Ls,this.nu=dr();const t=this.ou(e.documents);return this.applyChanges(t,!0)}Tu(){return ua.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,0===this.tu,this.hasCachedResults)}}const Ia="SyncEngine";class Sa{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Ca{constructor(e){this.key=e,this.Iu=!1}}class Aa{constructor(e,t,n,r,i,s){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Eu={},this.Ru=new tr((e=>Qn(e)),Wn),this.Au=new Map,this.Vu=new Set,this.du=new dt(ie.comparator),this.mu=new Map,this.fu=new As,this.gu={},this.pu=new Map,this.yu=fs._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return!0===this.wu}}async function ka(e,t,n=!0){const r=Xa(e);let i;const s=r.Ru.get(t);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Tu()):i=await Oa(r,t,n,!0),i}async function Ra(e,t){const n=Xa(e);await Oa(n,t,!0,!1)}async function Oa(e,t,n,r){const i=await Xs(e.localStore,qn(t)),s=i.targetId,o=e.sharedClientState.addLocalQueryTarget(s,n);let a;return r&&(a=await Na(e,t,s,"current"===o,i.resumeToken)),e.isPrimaryClient&&n&&Do(e.remoteStore,i),a}async function Na(e,t,n,r,i){e.Su=(t,n,r)=>async function(e,t,n,r){let i=t.view.ou(n);i.Ss&&(i=await Ys(e.localStore,t.query,!1).then((({documents:e})=>t.view.ou(e,i))));const s=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(i,e.isPrimaryClient,s,o);return za(e,t.targetId,a.lu),a.snapshot}(e,t,n,r);const s=await Ys(e.localStore,t,!0),o=new Ta(t,s.Ls),a=o.ou(s.documents),c=fi.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,i),u=o.applyChanges(a,e.isPrimaryClient,c);za(e,n,u.lu);const l=new Sa(t,n,o);return e.Ru.set(t,l),e.Au.has(n)?e.Au.get(n).push(t):e.Au.set(n,[t]),u.snapshot}async function Da(e,t,n){const r=x(e),i=r.Ru.get(t),s=r.Au.get(i.targetId);if(s.length>1)return r.Au.set(i.targetId,s.filter((e=>!Wn(e,t)))),void r.Ru.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Js(r.localStore,i.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(i.targetId),n&&xo(r.remoteStore,i.targetId),$a(r,i.targetId)})).catch(Ae)):($a(r,i.targetId),await Js(r.localStore,i.targetId,!0))}async function xa(e,t){const n=x(e),r=n.Ru.get(t),i=n.Au.get(r.targetId);n.isPrimaryClient&&1===i.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),xo(n.remoteStore,r.targetId))}async function Pa(e,t,n){const r=Ja(e);try{const e=await function(e,t){const n=x(e),r=ye.now(),i=t.reduce(((e,t)=>e.add(t.key)),dr());let s,o;return n.persistence.runTransaction("Locally write mutations","readwrite",(e=>{let a=rr(),c=dr();return n.Ms.getEntries(e,i).next((e=>{a=e,a.forEach(((e,t)=>{t.isValidDocument()||(c=c.add(e))}))})).next((()=>n.localDocuments.getOverlayedDocuments(e,a))).next((i=>{s=i;const o=[];for(const e of t){const t=$r(e,s.get(e.key).overlayedDocument);null!=t&&o.push(new Hr(e.key,t,an(t.value.mapValue),Mr.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)})).next((t=>{o=t;const r=t.applyToLocalDocumentSet(s,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)}))})).then((()=>({batchId:o.batchId,changes:or(s)})))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.gu[e.currentUser.toKey()];r||(r=new dt(G)),r=r.insert(t,n),e.gu[e.currentUser.toKey()]=r}(r,e.batchId,n),await Ga(r,e.changes),await Ko(r.remoteStore)}catch(e){const t=oa(e,"Failed to persist write");n.reject(t)}}async function La(e,t){const n=x(e);try{const e=await Gs(n.localStore,t);t.targetChanges.forEach(((e,t)=>{const r=n.mu.get(t);r&&(D(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.Iu=!0:e.modifiedDocuments.size>0?D(r.Iu,14607):e.removedDocuments.size>0&&(D(r.Iu,42227),r.Iu=!1))})),await Ga(n,e,t)}catch(e){await Ae(e)}}function Ma(e,t,n){const r=x(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.Ru.forEach(((n,r)=>{const i=r.view.xa(t);i.snapshot&&e.push(i.snapshot)})),function(e,t){const n=x(e);n.onlineState=t;let r=!1;n.queries.forEach(((e,n)=>{for(const i of n.Ca)i.xa(t)&&(r=!0)})),r&&ya(n)}(r.eventManager,t),e.length&&r.Eu.J_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Ua(e,t,n){const r=x(e);r.sharedClientState.updateQueryState(t,"rejected",n);const i=r.mu.get(t),s=i&&i.key;if(s){let e=new dt(ie.comparator);e=e.insert(s,cn.newNoDocument(s,ve.min()));const n=dr().add(s),i=new di(ve.min(),new Map,new dt(G),e,n);await La(r,i),r.du=r.du.remove(s),r.mu.delete(t),Ka(r)}else await Js(r.localStore,t,!1).then((()=>$a(r,t,n))).catch(Ae)}async function Va(e,t){const n=x(e),r=t.batch.batchId;try{const e=await Hs(n.localStore,t);Ba(n,r,null),ja(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Ga(n,e)}catch(e){await Ae(e)}}async function Fa(e,t,n){const r=x(e);try{const e=await function(e,t){const n=x(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",(e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next((t=>(D(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t)))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r))).next((()=>n.localDocuments.getDocuments(e,r)))}))}(r.localStore,t);Ba(r,t,n),ja(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Ga(r,e)}catch(n){await Ae(n)}}function ja(e,t){(e.pu.get(t)||[]).forEach((e=>{e.resolve()})),e.pu.delete(t)}function Ba(e,t,n){const r=x(e);let i=r.gu[r.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.gu[r.currentUser.toKey()]=i}}function $a(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Au.get(t))e.Ru.delete(r),n&&e.Eu.bu(r,n);e.Au.delete(t),e.isPrimaryClient&&e.fu.Qr(t).forEach((t=>{e.fu.containsKey(t)||qa(e,t)}))}function qa(e,t){e.Vu.delete(t.path.canonicalString());const n=e.du.get(t);null!==n&&(xo(e.remoteStore,n),e.du=e.du.remove(t),e.mu.delete(n),Ka(e))}function za(e,t,n){for(const r of n)r instanceof ba?(e.fu.addReference(r.key,t),Ha(e,r)):r instanceof Ea?(C(Ia,"Document no longer in limbo: "+r.key),e.fu.removeReference(r.key,t),e.fu.containsKey(r.key)||qa(e,r.key)):O(19791,{Du:r})}function Ha(e,t){const n=t.key,r=n.path.canonicalString();e.du.get(n)||e.Vu.has(r)||(C(Ia,"New document in limbo: "+n),e.Vu.add(r),Ka(e))}function Ka(e){for(;e.Vu.size>0&&e.du.size<e.maxConcurrentLimboResolutions;){const t=e.Vu.values().next().value;e.Vu.delete(t);const n=new ie(te.fromString(t)),r=e.yu.next();e.mu.set(r,new Ca(n)),e.du=e.du.insert(n,r),Do(e.remoteStore,new is(qn(Vn(n.path)),r,"TargetPurposeLimboResolution",Ne.ce))}}async function Ga(e,t,n){const r=x(e),i=[],s=[],o=[];r.Ru.isEmpty()||(r.Ru.forEach(((e,a)=>{o.push(r.Su(a,t,n).then((e=>{if((e||n)&&r.isPrimaryClient){const t=e?!e.fromCache:n?.targetChanges.get(a.targetId)?.current;r.sharedClientState.updateQueryState(a.targetId,t?"current":"not-current")}if(e){i.push(e);const t=Us.Is(a.targetId,e);s.push(t)}})))})),await Promise.all(o),r.Eu.J_(i),await async function(e,t){const n=x(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(e=>ke.forEach(t,(t=>ke.forEach(t.Ps,(r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r))).next((()=>ke.forEach(t.Ts,(r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))))))}catch(e){if(!Oe(e))throw e;C(js,"Failed to update sequence numbers: "+e)}for(const r of t){const e=r.targetId;if(!r.fromCache){const t=n.Cs.get(e),r=t.snapshotVersion,i=t.withLastLimboFreeSnapshotVersion(r);n.Cs=n.Cs.insert(e,i)}}}(r.localStore,s))}async function Wa(e,t){const n=x(e);if(!n.currentUser.isEqual(t)){C(Ia,"User change. New user:",t.toKey());const e=await zs(n.localStore,t);n.currentUser=t,function(e,t){e.pu.forEach((e=>{e.forEach((e=>{e.reject(new L(P.CANCELLED,t))}))})),e.pu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await Ga(n,e.Os)}}function Qa(e,t){const n=x(e),r=n.mu.get(t);if(r&&r.Iu)return dr().add(r.key);{let e=dr();const r=n.Au.get(t);if(!r)return e;for(const t of r){const r=n.Ru.get(t);e=e.unionWith(r.view.su)}return e}}function Xa(e){const t=x(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=La.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Qa.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Ua.bind(null,t),t.Eu.J_=ga.bind(null,t.eventManager),t.Eu.bu=ma.bind(null,t.eventManager),t}function Ja(e){const t=x(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Va.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Fa.bind(null,t),t}class Ya{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=yo(e.databaseInfo.databaseId),this.sharedClientState=this.Fu(e),this.persistence=this.Mu(e),await this.persistence.start(),this.localStore=this.xu(e),this.gcScheduler=this.Ou(e,this.localStore),this.indexBackfillerScheduler=this.Nu(e,this.localStore)}Ou(e,t){return null}Nu(e,t){return null}xu(e){return qs(this.persistence,new Fs,e.initialUser,this.serializer)}Mu(e){return new xs(Ls.Ai,this.serializer)}Fu(e){return new to}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ya.provider={build:()=>new Ya};class Za extends Ya{constructor(e){super(),this.cacheSizeBytes=e}Ou(e,t){D(this.persistence.referenceDelegate instanceof Ms,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new vs(n,e.asyncQueue,t)}Mu(e){const t=void 0!==this.cacheSizeBytes?ds.withCacheSize(this.cacheSizeBytes):ds.DEFAULT;return new xs((e=>Ms.Ai(e,t)),this.serializer)}}class ec{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>Ma(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=Wa.bind(null,this.syncEngine),await na(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new ha}()}createDatastore(e){const t=yo(e.databaseInfo.databaseId),n=go(e.databaseInfo);return So(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(e,t,n,r,i){return new ko(e,t,n,r,i)}(this.localStore,this.datastore,e.asyncQueue,(e=>Ma(this.syncEngine,e,0)),function(){return io.v()?new io:new no}())}createSyncEngine(e,t){return function(e,t,n,r,i,s,o){const a=new Aa(e,t,n,r,i,s);return o&&(a.wu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await async function(e){const t=x(e);C(Ao,"RemoteStore shutting down."),t.Va.add(5),await Oo(t),t.ma.shutdown(),t.fa.set("Unknown")}(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}ec.provider={build:()=>new ec};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Lu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Lu(this.observer.error,e):A("Uncaught Error in snapshot listener:",e.toString()))}ku(){this.muted=!0}Lu(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const nc="FirestoreClient";class rc{constructor(e,t,n,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=r,this.user=b.UNAUTHENTICATED,this.clientId=K.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async e=>{C(nc,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e})),this.appCheckCredentials.start(n,(e=>(C(nc,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new M;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=oa(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function ic(e,t){e.asyncQueue.verifyOperationInProgress(),C(nc,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener((async e=>{r.isEqual(e)||(await zs(t.localStore,e),r=e)})),t.persistence.setDatabaseDeletedListener((()=>e.terminate())),e._offlineComponents=t}async function sc(e,t){e.asyncQueue.verifyOperationInProgress();const n=await oc(e);C(nc,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener((e=>ta(t.remoteStore,e))),e.setAppCheckTokenChangeListener(((e,n)=>ta(t.remoteStore,n))),e._onlineComponents=t}async function oc(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){C(nc,"Using user provided OfflineComponentProvider");try{await ic(e,e._uninitializedComponentsProvider._offline)}catch(t){const n=t;if(!function(e){return"FirebaseError"===e.name?e.code===P.FAILED_PRECONDITION||e.code===P.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&e instanceof DOMException)||22===e.code||20===e.code||11===e.code}(n))throw n;k("Error using user provided cache. Falling back to memory cache: "+n),await ic(e,new Ya)}}else C(nc,"Using default OfflineComponentProvider"),await ic(e,new Za(void 0));return e._offlineComponents}async function ac(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(C(nc,"Using user provided OnlineComponentProvider"),await sc(e,e._uninitializedComponentsProvider._online)):(C(nc,"Using default OnlineComponentProvider"),await sc(e,new ec))),e._onlineComponents}function cc(e){return ac(e).then((e=>e.syncEngine))}async function uc(e){const t=await ac(e),n=t.eventManager;return n.onListen=ka.bind(null,t.syncEngine),n.onUnlisten=Da.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=Ra.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=xa.bind(null,t.syncEngine),n}function lc(e,t,n={}){const r=new M;return e.asyncQueue.enqueueAndForget((async()=>function(e,t,n,r,i){const s=new tc({next:a=>{s.ku(),t.enqueueAndForget((()=>pa(e,o)));const c=a.docs.has(n);!c&&a.fromCache?i.reject(new L(P.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&a.fromCache&&r&&"server"===r.source?i.reject(new L(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(a)},error:e=>i.reject(e)}),o=new wa(Vn(n.path),s,{includeMetadataChanges:!0,$a:!0});return fa(e,o)}(await uc(e),e.asyncQueue,t,n,r))),r.promise}function hc(e,t,n={}){const r=new M;return e.asyncQueue.enqueueAndForget((async()=>function(e,t,n,r,i){const s=new tc({next:n=>{s.ku(),t.enqueueAndForget((()=>pa(e,o))),n.fromCache&&"server"===r.source?i.reject(new L(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n)},error:e=>i.reject(e)}),o=new wa(n,s,{includeMetadataChanges:!0,$a:!0});return fa(e,o)}(await uc(e),e.asyncQueue,t,n,r))),r.promise}function dc(e,t){const n=new M;return e.asyncQueue.enqueueAndForget((async()=>Pa(await cc(e),t,n))),n.promise}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function fc(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const pc="ComponentProvider",gc=new Map;function mc(e,t,n,r,i){return new Nt(e,t,n,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,fc(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yc="firestore.googleapis.com",vc=!0;class _c{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new L(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=yc,this.ssl=vc}else this.host=e.host,this.ssl=e.ssl??vc;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=hs;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<gs)throw new L(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}oe("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=fc(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new L(P.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new L(P.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new L(P.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(e,t){return e.timeoutSeconds===t.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class wc{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new _c({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new L(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new _c(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new V;switch(e.type){case"firstParty":return new $(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new L(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=gc.get(e);t&&(C(pc,"Removing Datastore"),gc.delete(e),t.terminate())}(this),Promise.resolve()}}function bc(e,t,n,r={}){e=he(e,wc);const i=(0,a.zJ)(t),s=e._getSettings(),o={...s,emulatorOptions:e._getEmulatorOptions()},c=`${t}:${n}`;i&&(0,a.gE)(`https://${c}`),s.host!==yc&&s.host!==c&&k("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:c,ssl:i,emulatorOptions:r};if(!(0,a.bD)(u,o)&&(e._setSettings(u),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=b.MOCK_USER;else{t=(0,a.Fy)(r.mockUserToken,e._app?.options.projectId);const i=r.mockUserToken.sub||r.mockUserToken.user_id;if(!i)throw new L(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new b(i)}e._authCredentials=new F(new U(t,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ec{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Ec(this.firestore,e,this._query)}}class Tc{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ic(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Tc(this.firestore,e,this._key)}toJSON(){return{type:Tc._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(pe(t,Tc._jsonSchema))return new Tc(e,n||null,new ie(te.fromString(t.referencePath)))}}Tc._jsonSchemaVersion="firestore/documentReference/1.0",Tc._jsonSchema={type:fe("string",Tc._jsonSchemaVersion),referencePath:fe("string")};class Ic extends Ec{constructor(e,t,n){super(e,t,Vn(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Tc(this.firestore,null,new ie(e))}withConverter(e){return new Ic(this.firestore,e,this._path)}}function Sc(e,t,...n){if(e=(0,a.Ku)(e),se("collection","path",t),e instanceof wc){const r=te.fromString(t,...n);return ce(r),new Ic(e,null,r)}{if(!(e instanceof Tc||e instanceof Ic))throw new L(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(te.fromString(t,...n));return ce(r),new Ic(e.firestore,null,r)}}function Cc(e,t,...n){if(e=(0,a.Ku)(e),1===arguments.length&&(t=K.newId()),se("doc","path",t),e instanceof wc){const r=te.fromString(t,...n);return ae(r),new Tc(e,null,new ie(r))}{if(!(e instanceof Tc||e instanceof Ic))throw new L(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(te.fromString(t,...n));return ae(r),new Tc(e.firestore,e instanceof Ic?e.converter:null,new ie(r))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ac="AsyncQueue";class kc{constructor(e=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new vo(this,"async_queue_retry"),this.cc=()=>{const e=mo();e&&C(Ac,"Visibility state changed to "+e.visibilityState),this.F_.y_()},this.lc=e;const t=mo();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.hc(),this.Pc(e)}enterRestrictedMode(e){if(!this.rc){this.rc=!0,this.ac=e||!1;const t=mo();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.cc)}}enqueue(e){if(this.hc(),this.rc)return new Promise((()=>{}));const t=new M;return this.Pc((()=>this.rc&&this.ac?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.nc.push(e),this.Tc())))}async Tc(){if(0!==this.nc.length){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(e){if(!Oe(e))throw e;C(Ac,"Operation failed with retryable error: "+e)}this.nc.length>0&&this.F_.g_((()=>this.Tc()))}}Pc(e){const t=this.lc.then((()=>(this._c=!0,e().catch((e=>{throw this.oc=e,this._c=!1,A("INTERNAL UNHANDLED ERROR: ",Rc(e)),e})).then((e=>(this._c=!1,e))))));return this.lc=t,t}enqueueAfterDelay(e,t,n){this.hc(),this.uc.indexOf(e)>-1&&(t=0);const r=sa.createAndSchedule(this,e,t,n,(e=>this.Ic(e)));return this.sc.push(r),r}hc(){this.oc&&O(47125,{Ec:Rc(this.oc)})}verifyOperationInProgress(){}async Rc(){let e;do{e=this.lc,await e}while(e!==this.lc)}Ac(e){for(const t of this.sc)if(t.timerId===e)return!0;return!1}Vc(e){return this.Rc().then((()=>{this.sc.sort(((e,t)=>e.targetTimeMs-t.targetTimeMs));for(const t of this.sc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Rc()}))}dc(e){this.uc.push(e)}Ic(e){const t=this.sc.indexOf(e);this.sc.splice(t,1)}}function Rc(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Oc extends wc{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new kc,this._persistenceKey=r?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new kc(e),this._firestoreClient=void 0,await e}}}function Nc(e,t){const n="object"==typeof e?e:(0,s.Sx)(),r="string"==typeof e?e:t||Dt,i=(0,s.j6)(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const e=(0,a.yU)("firestore");e&&bc(i,...e)}return i}function Dc(e){if(e._terminated)throw new L(P.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||xc(e),e._firestoreClient}function xc(e){const t=e._freezeSettings(),n=mc(e._databaseId,e._app?.options.appId||"",e._persistenceKey,e._app?.options.apiKey,t);e._componentsProvider||t.localCache?._offlineComponentProvider&&t.localCache?._onlineComponentProvider&&(e._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),e._firestoreClient=new rc(e._authCredentials,e._appCheckCredentials,e._queue,n,e._componentsProvider&&function(e){const t=e?._online.build();return{_offline:e?._offline.build(t),_online:t}}(e._componentsProvider))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pc{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Pc(_t.fromBase64String(e))}catch(e){throw new L(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new Pc(_t.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Pc._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(pe(e,Pc._jsonSchema))return Pc.fromBase64String(e.bytes)}}Pc._jsonSchemaVersion="firestore/bytes/1.0",Pc._jsonSchema={type:fe("string",Pc._jsonSchemaVersion),bytes:fe("string")};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Lc{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new L(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new re(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Mc{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new L(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new L(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return G(this._lat,e._lat)||G(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Uc._jsonSchemaVersion}}static fromJSON(e){if(pe(e,Uc._jsonSchema))return new Uc(e.latitude,e.longitude)}}Uc._jsonSchemaVersion="firestore/geoPoint/1.0",Uc._jsonSchema={type:fe("string",Uc._jsonSchemaVersion),latitude:fe("number"),longitude:fe("number")};
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Vc{constructor(e){this._values=(e||[]).map((e=>e))}toArray(){return this._values.map((e=>e))}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Vc._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(pe(e,Vc._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((e=>"number"==typeof e)))return new Vc(e.vectorValues);throw new L(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Vc._jsonSchemaVersion="firestore/vectorValue/1.0",Vc._jsonSchema={type:fe("string",Vc._jsonSchemaVersion),vectorValues:fe("object")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Fc=/^__.*__$/;class jc{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Hr(e,this.data,this.fieldMask,t,this.fieldTransforms):new zr(e,this.data,t,this.fieldTransforms)}}class Bc{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Hr(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function $c(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{dataSource:e})}}class qc{constructor(e,t,n,r,i,s){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.mc(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new qc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(e){const t=this.path?.child(e),n=this.i({path:t,arrayElement:!1});return n.yc(e),n}wc(e){const t=this.path?.child(e),n=this.i({path:t,arrayElement:!1});return n.mc(),n}Sc(e){return this.i({path:void 0,arrayElement:!0})}bc(e){return iu(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return void 0!==this.fieldMask.find((t=>e.isPrefixOf(t)))||void 0!==this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))}mc(){if(this.path)for(let e=0;e<this.path.length;e++)this.yc(this.path.get(e))}yc(e){if(0===e.length)throw this.bc("Document fields must not be empty");if($c(this.dataSource)&&Fc.test(e))throw this.bc('Document fields cannot begin and end with "__"')}}class zc{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||yo(e)}V(e,t,n,r=!1){return new qc({dataSource:e,methodName:t,targetDoc:n,path:re.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Hc(e){const t=e._freezeSettings(),n=yo(e._databaseId);return new zc(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Kc(e,t,n,r,i,s={}){const o=e.V(s.merge||s.mergeFields?2:0,t,n,i);eu("Data must be an object, but it was:",o,r);const a=Yc(r,o);let c,u;if(s.merge)c=new yt(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const e=[];for(const r of s.mergeFields){const i=tu(t,r,n);if(!o.contains(i))throw new L(P.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);su(e,i)||e.push(i)}c=new yt(e),u=o.fieldTransforms.filter((e=>c.covers(e.field)))}else c=null,u=o.fieldTransforms;return new jc(new on(a),c,u)}class Gc extends Mc{_toFieldTransform(e){if(2!==e.dataSource)throw 1===e.dataSource?e.bc(`${this._methodName}() can only appear at the top level of your update data`):e.bc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Gc}}function Wc(e,t,n,r){const i=e.V(1,t,n);eu("Data must be an object, but it was:",i,r);const s=[],o=on.empty();lt(r,((e,r)=>{const c=ru(t,e,n);r=(0,a.Ku)(r);const u=i.wc(c);if(r instanceof Gc)s.push(c);else{const e=Jc(r,u);null!=e&&(s.push(c),o.set(c,e))}}));const c=new yt(s);return new Bc(o,c,i.fieldTransforms)}function Qc(e,t,n,r,i,s){const o=e.V(1,t,n),c=[tu(t,r,n)],u=[i];if(s.length%2!=0)throw new L(P.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let a=0;a<s.length;a+=2)c.push(tu(t,s[a])),u.push(s[a+1]);const l=[],h=on.empty();for(let f=c.length-1;f>=0;--f)if(!su(l,c[f])){const e=c[f];let t=u[f];t=(0,a.Ku)(t);const n=o.wc(e);if(t instanceof Gc)l.push(e);else{const r=Jc(t,n);null!=r&&(l.push(e),h.set(e,r))}}const d=new yt(l);return new Bc(h,d,o.fieldTransforms)}function Xc(e,t,n,r=!1){return Jc(n,e.V(r?4:3,t))}function Jc(e,t){if(Zc(e=(0,a.Ku)(e)))return eu("Unsupported field value:",t,e),Yc(e,t);if(e instanceof Mc)return function(e,t){if(!$c(t.dataSource))throw t.bc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.bc(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.arrayElement&&4!==t.dataSource)throw t.bc("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const i of e){let e=Jc(i,t.Sc(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=(0,a.Ku)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return yr(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=ye.fromDate(e);return{timestampValue:Ai(t.serializer,n)}}if(e instanceof ye){const n=new ye(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Ai(t.serializer,n)}}if(e instanceof Uc)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof Pc)return{bytesValue:ki(t.serializer,e._byteString)};if(e instanceof Tc){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.bc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Ni(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof Vc)return function(e,t){const n=e instanceof Vc?e.toArray():e,r={fields:{[Lt]:{stringValue:Vt},[Ft]:{arrayValue:{values:n.map((e=>{if("number"!=typeof e)throw t.bc("VectorValues must only contain numeric values.");return gr(t.serializer,e)}))}}}};return{mapValue:r}}(e,t);if(rs(e))return e._toProto(t.serializer);throw t.bc(`Unsupported field value: ${le(e)}`)}(e,t)}function Yc(e,t){const n={};return ht(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):lt(e,((e,r)=>{const i=Jc(r,t.gc(e));null!=i&&(n[e]=i)})),{mapValue:{fields:n}}}function Zc(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof ye||e instanceof Uc||e instanceof Pc||e instanceof Tc||e instanceof Mc||e instanceof Vc||rs(e))}function eu(e,t,n){if(!Zc(n)||!ue(n)){const r=le(n);throw"an object"===r?t.bc(e+" a custom object"):t.bc(e+" "+r)}}function tu(e,t,n){if((t=(0,a.Ku)(t))instanceof Lc)return t._internalPath;if("string"==typeof t)return ru(e,t);throw iu("Field path arguments must be of type string or ",e,!1,void 0,n)}const nu=new RegExp("[~\\*/\\[\\]]");function ru(e,t,n){if(t.search(nu)>=0)throw iu(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Lc(...t.split("."))._internalPath}catch(r){throw iu(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function iu(e,t,n,r,i){const s=r&&!r.isEmpty(),o=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new L(P.INVALID_ARGUMENT,a+e+c)}function su(e,t){return e.some((e=>e.isEqual(t)))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ou{convertValue(e,t="none"){switch(jt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Et(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Tt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw O(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return lt(e,((e,r)=>{n[e]=this.convertValue(r,t)})),n}convertVectorValue(e){const t=e.fields?.[Ft].arrayValue?.values?.map((e=>Et(e.doubleValue)));return new Vc(t)}convertGeoPoint(e){return new Uc(Et(e.latitude),Et(e.longitude))}convertArray(e,t){return(e.values||[]).map((e=>this.convertValue(e,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Rt(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Ot(e));default:return null}}convertTimestamp(e){const t=bt(e);return new ye(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=te.fromString(e);D(ns(n),9688,{name:e});const r=new xt(n.get(1),n.get(3)),i=new ie(n.popFirst(5));return r.isEqual(t)||A(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au extends ou{constructor(e){super(),this.firestore=e}convertBytes(e){return new Pc(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Tc(this.firestore,null,t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu="@firebase/firestore",uu="4.15.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class lu{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Tc(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new hu(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(tu("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class hu extends lu{data(){return super.data()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function du(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new L(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class fu{}class pu extends fu{}function gu(e,t,...n){let r=[];t instanceof fu&&r.push(t),r=r.concat(n),function(e){const t=e.filter((e=>e instanceof vu)).length,n=e.filter((e=>e instanceof mu)).length;if(t>1||t>0&&n>0)throw new L(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}
/**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */(r);for(const i of r)e=i._apply(e);return e}class mu extends pu{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new mu(e,t,n)}_apply(e){const t=this._parse(e);return Su(e._query,t),new Ec(e.firestore,e.converter,Hn(e._query,t))}_parse(e){const t=Hc(e.firestore),n=function(e,t,n,r,i,s,o){let a;if(i.isKeyField()){if("array-contains"===s||"array-contains-any"===s)throw new L(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${s}' queries on documentId().`);if("in"===s||"not-in"===s){Iu(o,s);const t=[];for(const n of o)t.push(Tu(r,e,n));a={arrayValue:{values:t}}}else a=Tu(r,e,o)}else"in"!==s&&"not-in"!==s&&"array-contains-any"!==s||Iu(o,s),a=Xc(n,t,o,"in"===s||"not-in"===s);const c=gn.create(i,s,a);return c}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}function yu(e,t,n){const r=t,i=tu("where",e);return mu._create(i,r,n)}class vu extends fu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new vu(e,t)}_parse(e){const t=this._queryConstraints.map((t=>t._parse(e))).filter((e=>e.getFilters().length>0));return 1===t.length?t[0]:mn.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const r=t.getFlattenedFilters();for(const i of r)Su(n,i),n=Hn(n,i)}(e._query,t),new Ec(e.firestore,e.converter,Hn(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class _u extends pu{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new _u(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new L(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new L(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const r=new dn(t,n);return r}(e._query,this._field,this._direction);return new Ec(e.firestore,e.converter,Kn(e._query,t))}}function wu(e,t="asc"){const n=t,r=tu("orderBy",e);return _u._create(r,n)}class bu extends pu{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new bu(e,t,n)}_apply(e){return new Ec(e.firestore,e.converter,Gn(e._query,this._limit,this._limitType))}}function Eu(e){return de("limit",e),bu._create("limit",e,"F")}function Tu(e,t,n){if("string"==typeof(n=(0,a.Ku)(n))){if(""===n)throw new L(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Bn(t)&&-1!==n.indexOf("/"))throw new L(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(te.fromString(n));if(!ie.isDocumentKey(r))throw new L(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Qt(e,new ie(r))}if(n instanceof Tc)return Qt(e,n._key);throw new L(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${le(n)}.`)}function Iu(e,t){if(!Array.isArray(e)||0===e.length)throw new L(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Su(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new L(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new L(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}function Cu(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class Au{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ku extends lu{constructor(e,t,n,r,i,s){super(e,t,n,r,s),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ru(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(tu("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new L(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ku._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}ku._jsonSchemaVersion="firestore/documentSnapshot/1.0",ku._jsonSchema={type:fe("string",ku._jsonSchemaVersion),bundleSource:fe("string","DocumentSnapshot"),bundleName:fe("string"),bundle:fe("string")};class Ru extends ku{data(e={}){return super.data(e)}}class Ou{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Au(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new Ru(this._firestore,this._userDataWriter,n.key,n,new Au(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new L(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map((n=>{const r=new Ru(e._firestore,e._userDataWriter,n.doc.key,n.doc,new Au(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}}))}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter((e=>t||3!==e.type)).map((t=>{const r=new Ru(e._firestore,e._userDataWriter,t.doc.key,t.doc,new Au(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let i=-1,s=-1;return 0!==t.type&&(i=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),s=n.indexOf(t.doc.key)),{type:Nu(t.type),doc:r,oldIndex:i,newIndex:s}}))}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new L(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Ou._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=K.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],r=[];return this.docs.forEach((e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),r.push(e.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Nu(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:e})}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Ou._jsonSchemaVersion="firestore/querySnapshot/1.0",Ou._jsonSchema={type:fe("string",Ou._jsonSchemaVersion),bundleSource:fe("string","QuerySnapshot"),bundleName:fe("string"),bundle:fe("string")};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Du(e){e=he(e,Tc);const t=he(e.firestore,Oc),n=Dc(t);return lc(n,e._key).then((n=>Vu(t,e,n)))}function xu(e){e=he(e,Ec);const t=he(e.firestore,Oc),n=Dc(t),r=new au(t);return du(e._query),hc(n,e._query).then((n=>new Ou(t,r,e,n)))}function Pu(e,t,n){e=he(e,Tc);const r=he(e.firestore,Oc),i=Cu(e.converter,t,n),s=Hc(r);return Uu(r,[Kc(s,"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,Mr.none())])}function Lu(e,t,n,...r){e=he(e,Tc);const i=he(e.firestore,Oc),s=Hc(i);let o;return o="string"==typeof(t=(0,a.Ku)(t))||t instanceof Lc?Qc(s,"updateDoc",e._key,t,n,r):Wc(s,"updateDoc",e._key,t),Uu(i,[o.toMutation(e._key,Mr.exists(!0))])}function Mu(e,t){const n=he(e.firestore,Oc),r=Cc(e),i=Cu(e.converter,t),s=Hc(e.firestore);return Uu(n,[Kc(s,"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,Mr.exists(!1))]).then((()=>r))}function Uu(e,t){const n=Dc(e);return dc(n,t)}function Vu(e,t,n){const r=n.docs.get(t._key),i=new au(e);return new ku(e,i,t._key,r,new Au(n.hasPendingWrites,n.fromCache),t.converter)}new WeakMap;
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e,t=!0){T(s.MF),(0,s.om)(new o.uA("firestore",((e,{instanceIdentifier:n,options:r})=>{const i=e.getProvider("app").getImmediate(),s=new Oc(new j(e.getProvider("auth-internal")),new z(i,e.getProvider("app-check-internal")),Pt(i,n),i);return r={useFetchStreams:t,...r},s._setSettings(r),s}),"PUBLIC").setMultipleInstances(!0)),(0,s.KO)(cu,uu,e),(0,s.KO)(cu,uu,"esm2020")}()},1924:function(e,t,n){n.d(t,{qk:function(){return vt},c7:function(){return wt},KR:function(){return _t},bp:function(){return yt}});n(4114),n(6573),n(8100),n(7936),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(8992),n(4520),n(3949),n(1454),n(4979);var r=n(262),i=n(2455),s=n(798);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const o="firebasestorage.googleapis.com",a="storageBucket",c=12e4,u=6e5,l=1e3;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class h extends i.g{constructor(e,t,n=0){super(p(e),`Firebase Storage: ${t} (${p(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,h.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return p(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var d,f;function p(e){return"storage/"+e}function g(){const e="An unknown error occurred, please check the error payload for server response.";return new h(d.UNKNOWN,e)}function m(e){return new h(d.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function y(e){return new h(d.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function v(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new h(d.UNAUTHENTICATED,e)}function _(){return new h(d.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function w(e){return new h(d.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function b(){return new h(d.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function E(){return new h(d.CANCELED,"User canceled the upload/download.")}function T(e){return new h(d.INVALID_URL,"Invalid URL '"+e+"'.")}function I(e){return new h(d.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function S(){return new h(d.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+a+"' property when initializing the app?")}function C(){return new h(d.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function A(){return new h(d.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function k(){return new h(d.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function R(e){return new h(d.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function O(e){return new h(d.INVALID_ARGUMENT,e)}function N(){return new h(d.APP_DELETED,"The Firebase app was deleted.")}function D(e){return new h(d.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function x(e,t){return new h(d.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function P(e){throw new h(d.INTERNAL_ERROR,"Internal error: "+e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(e){e["UNKNOWN"]="unknown",e["OBJECT_NOT_FOUND"]="object-not-found",e["BUCKET_NOT_FOUND"]="bucket-not-found",e["PROJECT_NOT_FOUND"]="project-not-found",e["QUOTA_EXCEEDED"]="quota-exceeded",e["UNAUTHENTICATED"]="unauthenticated",e["UNAUTHORIZED"]="unauthorized",e["UNAUTHORIZED_APP"]="unauthorized-app",e["RETRY_LIMIT_EXCEEDED"]="retry-limit-exceeded",e["INVALID_CHECKSUM"]="invalid-checksum",e["CANCELED"]="canceled",e["INVALID_EVENT_NAME"]="invalid-event-name",e["INVALID_URL"]="invalid-url",e["INVALID_DEFAULT_BUCKET"]="invalid-default-bucket",e["NO_DEFAULT_BUCKET"]="no-default-bucket",e["CANNOT_SLICE_BLOB"]="cannot-slice-blob",e["SERVER_FILE_WRONG_SIZE"]="server-file-wrong-size",e["NO_DOWNLOAD_URL"]="no-download-url",e["INVALID_ARGUMENT"]="invalid-argument",e["INVALID_ARGUMENT_COUNT"]="invalid-argument-count",e["APP_DELETED"]="app-deleted",e["INVALID_ROOT_OPERATION"]="invalid-root-operation",e["INVALID_FORMAT"]="invalid-format",e["INTERNAL_ERROR"]="internal-error",e["UNSUPPORTED_ENVIRONMENT"]="unsupported-environment"})(d||(d={}));class L{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=L.makeFromUrl(e,t)}catch(r){return new L(e,"")}if(""===n.path)return n;throw I(e)}static makeFromUrl(e,t){let n=null;const r="([A-Za-z0-9.\\-_]+)";function i(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}const s="(/(.*))?$",a=new RegExp("^gs://"+r+s,"i"),c={bucket:1,path:3};function u(e){e.path_=decodeURIComponent(e.path)}const l="v[A-Za-z0-9_]+",h=t.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",f=new RegExp(`^https?://${h}/${l}/b/${r}/o${d}`,"i"),p={bucket:1,path:3},g=t===o?"(?:storage.googleapis.com|storage.cloud.google.com)":t,m="([^?#]*)",y=new RegExp(`^https?://${g}/${r}/${m}`,"i"),v={bucket:1,path:2},_=[{regex:a,indices:c,postModify:i},{regex:f,indices:p,postModify:u},{regex:y,indices:v,postModify:u}];for(let o=0;o<_.length;o++){const t=_[o],r=t.regex.exec(e);if(r){const e=r[t.indices.bucket];let i=r[t.indices.path];i||(i=""),n=new L(e,i),t.postModify(n);break}}if(null==n)throw T(e);return n}}class M{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(e,t,n){let r=1,i=null,s=null,o=!1,a=0;function c(){return 2===a}let u=!1;function l(...e){u||(u=!0,t.apply(null,e))}function h(t){i=setTimeout((()=>{i=null,e(f,c())}),t)}function d(){s&&clearTimeout(s)}function f(e,...t){if(u)return void d();if(e)return d(),void l.call(null,e,...t);const n=c()||o;if(n)return d(),void l.call(null,e,...t);let i;r<64&&(r*=2),1===a?(a=2,i=0):i=1e3*(r+Math.random()),h(i)}let p=!1;function g(e){p||(p=!0,d(),u||(null!==i?(e||(a=2),clearTimeout(i),h(0)):e||(a=1)))}return h(0),s=setTimeout((()=>{o=!0,g(!0)}),n),g}function V(e){e(!1)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e){return void 0!==e}function j(e){return"function"===typeof e}function B(e){return"object"===typeof e&&!Array.isArray(e)}function $(e){return"string"===typeof e||e instanceof String}function q(e){return z()&&e instanceof Blob}function z(){return"undefined"!==typeof Blob}function H(e,t,n,r){if(r<t)throw O(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw O(`Invalid value for '${e}'. Expected ${n} or less.`)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(e,t,n){let r=t;return null==n&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function G(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){const i=t(r)+"="+t(e[r]);n=n+i+"&"}return n=n.slice(0,-1),n}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function W(e,t){const n=e>=500&&e<600,r=[408,429],i=-1!==r.indexOf(e),s=-1!==t.indexOf(e);return n||i||s}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(e){e[e["NO_ERROR"]=0]="NO_ERROR",e[e["NETWORK_ERROR"]=1]="NETWORK_ERROR",e[e["ABORT"]=2]="ABORT"})(f||(f={}));class Q{constructor(e,t,n,r,i,s,o,a,c,u,l,h=!0,d=!1){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=s,this.callback_=o,this.errorCallback_=a,this.timeout_=c,this.progressCallback_=u,this.connectionFactory_=l,this.retry=h,this.isUsingEmulator=d,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise(((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()}))}start_(){const e=(e,t)=>{if(t)return void e(!1,new X(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=e=>{const t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then((()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const t=n.getErrorCode()===f.NO_ERROR,i=n.getStatus();if(!t||W(i,this.additionalRetryCodes_)&&this.retry){const t=n.getErrorCode()===f.ABORT;return void e(!1,new X(!1,null,t))}const s=-1!==this.successCodes_.indexOf(i);e(!0,new X(s,n))}))},t=(e,t)=>{const n=this.resolve_,r=this.reject_,i=t.connection;if(t.wasSuccessCode)try{const e=this.callback_(i,i.getResponse());F(e)?n(e):n()}catch(s){r(s)}else if(null!==i){const e=g();e.serverResponse=i.getErrorText(),this.errorCallback_?r(this.errorCallback_(i,e)):r(e)}else if(t.canceled){const e=this.appDelete_?N():E();r(e)}else{const e=b();r(e)}};this.canceled_?t(!1,new X(!1,null,!0)):this.backoffId_=U(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&V(this.backoffId_),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class X{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function J(e,t){null!==t&&t.length>0&&(e["Authorization"]="Firebase "+t)}function Y(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Z(e,t){t&&(e["X-Firebase-GMPID"]=t)}function ee(e,t){null!==t&&(e["X-Firebase-AppCheck"]=t)}function te(e,t,n,r,i,s,o=!0,a=!1){const c=G(e.urlParams),u=e.url+c,l=Object.assign({},e.headers);return Z(l,t),J(l,n),Y(l,s),ee(l,r),new Q(u,e.method,l,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,o,a)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(){return"undefined"!==typeof BlobBuilder?BlobBuilder:"undefined"!==typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function re(...e){const t=ne();if(void 0!==t){const n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(z())return new Blob(e);throw new h(d.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}function ie(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(e){if("undefined"===typeof atob)throw R("base-64");return atob(e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oe={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class ae{constructor(e,t){this.data=e,this.contentType=t||null}}function ce(e,t){switch(e){case oe.RAW:return new ae(ue(t));case oe.BASE64:case oe.BASE64URL:return new ae(he(e,t));case oe.DATA_URL:return new ae(fe(t),pe(t))}throw g()}function ue(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|63&r);else if(55296===(64512&r)){const i=n<e.length-1&&56320===(64512&e.charCodeAt(n+1));if(i){const i=r,s=e.charCodeAt(++n);r=65536|(1023&i)<<10|1023&s,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else t.push(239,191,189)}else 56320===(64512&r)?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function le(e){let t;try{t=decodeURIComponent(e)}catch(n){throw x(oe.DATA_URL,"Malformed data URL.")}return ue(t)}function he(e,t){switch(e){case oe.BASE64:{const n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r){const t=n?"-":"_";throw x(e,"Invalid character '"+t+"' found: is it base64url encoded?")}break}case oe.BASE64URL:{const n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r){const t=n?"+":"/";throw x(e,"Invalid character '"+t+"' found: is it base64 encoded?")}t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=se(t)}catch(i){if(i.message.includes("polyfill"))throw i;throw x(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class de{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(null===t)throw x(oe.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;null!=n&&(this.base64=ge(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}function fe(e){const t=new de(e);return t.base64?he(oe.BASE64,t.rest):le(t.rest)}function pe(e){const t=new de(e);return t.contentType}function ge(e,t){const n=e.length>=t.length;return!!n&&e.substring(e.length-t.length)===t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e,t){let n=0,r="";q(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(q(this.data_)){const n=this.data_,r=ie(n,e,t);return null===r?null:new me(r)}{const n=new Uint8Array(this.data_.buffer,e,t-e);return new me(n,!0)}}static getBlob(...e){if(z()){const t=e.map((e=>e instanceof me?e.data_:e));return new me(re.apply(null,t))}{const t=e.map((e=>$(e)?ce(oe.RAW,e).data:e.data_));let n=0;t.forEach((e=>{n+=e.byteLength}));const r=new Uint8Array(n);let i=0;return t.forEach((e=>{for(let t=0;t<e.length;t++)r[i++]=e[t]})),new me(r,!0)}}uploadData(){return this.data_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(e){let t;try{t=JSON.parse(e)}catch(n){return null}return B(t)?t:null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ve(e){if(0===e.length)return null;const t=e.lastIndexOf("/");if(-1===t)return"";const n=e.slice(0,t);return n}function _e(e,t){const n=t.split("/").filter((e=>e.length>0)).join("/");return 0===e.length?n:e+"/"+n}function we(e){const t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(e,t){return t}class Ee{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||be}}let Te=null;function Ie(e){return!$(e)||e.length<2?e:we(e)}function Se(){if(Te)return Te;const e=[];function t(e,t){return Ie(t)}e.push(new Ee("bucket")),e.push(new Ee("generation")),e.push(new Ee("metageneration")),e.push(new Ee("name","fullPath",!0));const n=new Ee("name");function r(e,t){return void 0!==t?Number(t):t}n.xform=t,e.push(n);const i=new Ee("size");return i.xform=r,e.push(i),e.push(new Ee("timeCreated")),e.push(new Ee("updated")),e.push(new Ee("md5Hash",null,!0)),e.push(new Ee("cacheControl",null,!0)),e.push(new Ee("contentDisposition",null,!0)),e.push(new Ee("contentEncoding",null,!0)),e.push(new Ee("contentLanguage",null,!0)),e.push(new Ee("contentType",null,!0)),e.push(new Ee("metadata","customMetadata",!0)),Te=e,Te}function Ce(e,t){function n(){const n=e["bucket"],r=e["fullPath"],i=new L(n,r);return t._makeStorageReference(i)}Object.defineProperty(e,"ref",{get:n})}function Ae(e,t,n){const r={type:"file"},i=n.length;for(let s=0;s<i;s++){const e=n[s];r[e.local]=e.xform(r,t[e.server])}return Ce(r,e),r}function ke(e,t,n){const r=ye(t);if(null===r)return null;const i=r;return Ae(e,i,n)}function Re(e,t,n,r){const i=ye(t);if(null===i)return null;if(!$(i["downloadTokens"]))return null;const s=i["downloadTokens"];if(0===s.length)return null;const o=encodeURIComponent,a=s.split(","),c=a.map((t=>{const i=e["bucket"],s=e["fullPath"],a="/b/"+o(i)+"/o/"+o(s),c=K(a,n,r),u=G({alt:"media",token:t});return c+u}));return c[0]}function Oe(e,t){const n={},r=t.length;for(let i=0;i<r;i++){const r=t[i];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function De(e){if(!e)throw g()}function xe(e,t){function n(n,r){const i=ke(e,r,t);return De(null!==i),i}return n}function Pe(e,t){function n(n,r){const i=ke(e,r,t);return De(null!==i),Re(i,r,e.host,e._protocol)}return n}function Le(e){function t(t,n){let r;return r=401===t.getStatus()?t.getErrorText().includes("Firebase App Check token is invalid")?_():v():402===t.getStatus()?y(e.bucket):403===t.getStatus()?w(e.path):n,r.status=t.getStatus(),r.serverResponse=n.serverResponse,r}return t}function Me(e){const t=Le(e);function n(n,r){let i=t(n,r);return 404===n.getStatus()&&(i=m(e.path)),i.serverResponse=r.serverResponse,i}return n}function Ue(e,t,n){const r=t.fullServerUrl(),i=K(r,e.host,e._protocol),s="GET",o=e.maxOperationRetryTime,a=new Ne(i,s,xe(e,n),o);return a.errorHandler=Me(t),a}function Ve(e,t,n){const r=t.fullServerUrl(),i=K(r,e.host,e._protocol),s="GET",o=e.maxOperationRetryTime,a=new Ne(i,s,Pe(e,n),o);return a.errorHandler=Me(t),a}function Fe(e,t){return e&&e["contentType"]||t&&t.type()||"application/octet-stream"}function je(e,t,n){const r=Object.assign({},n);return r["fullPath"]=e.path,r["size"]=t.size(),r["contentType"]||(r["contentType"]=Fe(null,t)),r}function Be(e,t,n,r,i){const s=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}const c=a();o["Content-Type"]="multipart/related; boundary="+c;const u=je(t,r,i),l=Oe(u,n),h="--"+c+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+l+"\r\n--"+c+"\r\nContent-Type: "+u["contentType"]+"\r\n\r\n",d="\r\n--"+c+"--",f=me.getBlob(h,r,d);if(null===f)throw C();const p={name:u["fullPath"]},g=K(s,e.host,e._protocol),m="POST",y=e.maxUploadRetryTime,v=new Ne(g,m,xe(e,n),y);return v.urlParams=p,v.headers=o,v.body=f.uploadData(),v.errorHandler=Le(t),v}class $e{constructor(e,t,n,r){this.current=e,this.total=t,this.finalized=!!n,this.metadata=r||null}}function qe(e,t){let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Status")}catch(i){De(!1)}const r=t||["active"];return De(!!n&&-1!==r.indexOf(n)),n}function ze(e,t,n,r,i){const s=t.bucketOnlyServerUrl(),o=je(t,r,i),a={name:o["fullPath"]},c=K(s,e.host,e._protocol),u="POST",l={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":o["contentType"],"Content-Type":"application/json; charset=utf-8"},h=Oe(o,n),d=e.maxUploadRetryTime;function f(e){let t;qe(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(n){De(!1)}return De($(t)),t}const p=new Ne(c,u,f,d);return p.urlParams=a,p.headers=l,p.body=h,p.errorHandler=Le(t),p}function He(e,t,n,r){const i={"X-Goog-Upload-Command":"query"};function s(e){const t=qe(e,["active","final"]);let n=null;try{n=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(s){De(!1)}n||De(!1);const i=Number(n);return De(!isNaN(i)),new $e(i,r.size(),"final"===t)}const o="POST",a=e.maxUploadRetryTime,c=new Ne(n,o,s,a);return c.headers=i,c.errorHandler=Le(t),c}const Ke=262144;function Ge(e,t,n,r,i,s,o,a){const c=new $e(0,0);if(o?(c.current=o.current,c.total=o.total):(c.current=0,c.total=r.size()),r.size()!==c.total)throw A();const u=c.total-c.current;let l=u;i>0&&(l=Math.min(l,i));const h=c.current,d=h+l;let f="";f=0===l?"finalize":u===l?"upload, finalize":"upload";const p={"X-Goog-Upload-Command":f,"X-Goog-Upload-Offset":`${c.current}`},g=r.slice(h,d);if(null===g)throw C();function m(e,n){const i=qe(e,["active","final"]),o=c.current+l,a=r.size();let u;return u="final"===i?xe(t,s)(e,n):null,new $e(o,a,"final"===i,u)}const y="POST",v=t.maxUploadRetryTime,_=new Ne(n,y,m,v);return _.headers=p,_.body=g.uploadData(),_.progressCallback=a||null,_.errorHandler=Le(e),_}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const We={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function Qe(e){switch(e){case"running":case"pausing":case"canceling":return We.RUNNING;case"paused":return We.PAUSED;case"success":return We.SUCCESS;case"canceled":return We.CANCELED;case"error":return We.ERROR;default:return We.ERROR}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,t,n){const r=j(e)||null!=t||null!=n;if(r)this.next=e,this.error=t??void 0,this.complete=n??void 0;else{const t=e;this.next=t.next,this.error=t.error,this.complete=t.complete}}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(e){return(...t)=>{Promise.resolve().then((()=>e(...t)))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ye=null;class Ze{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=f.NO_ERROR,this.sendPromise_=new Promise((e=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=f.ABORT,e()})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=f.NETWORK_ERROR,e()})),this.xhr_.addEventListener("load",(()=>{e()}))}))}send(e,t,n,r,s){if(this.sent_)throw P("cannot .send() more than once");if((0,i.zJ)(e)&&n&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==s)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw P("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw P("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}}getResponse(){if(!this.sent_)throw P("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw P("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class et extends Ze{initXhr(){this.xhr_.responseType="text"}}function tt(){return Ye?Ye():new et}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nt{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t,n=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=n,this._mappings=Se(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=e=>{if(this._request=void 0,this._chunkMultiplier=1,e._codeEquals(d.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const t=this.isExponentialBackoffExpired();if(W(e.status,[])){if(!t)return this.sleepTime=Math.max(2*this.sleepTime,l),this._needToFetchStatus=!0,void this.completeTransitions_();e=b()}this._error=e,this._transition("error")}},this._metadataErrorHandler=e=>{this._request=void 0,e._codeEquals(d.CANCELED)?this.completeTransitions_():(this._error=e,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise(((e,t)=>{this._resolve=e,this._reject=t,this._start()})),this._promise.then(null,(()=>{}))}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>262144}_start(){"running"===this._state&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout((()=>{this.pendingTimeout=void 0,this._continueUpload()}),this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then((([t,n])=>{switch(this._state){case"running":e(t,n);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}}))}_createResumable(){this._resolveToken(((e,t)=>{const n=ze(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(n,tt,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._uploadUrl=e,this._needToFetchStatus=!1,this.completeTransitions_()}),this._errorHandler)}))}_fetchStatus(){const e=this._uploadUrl;this._resolveToken(((t,n)=>{const r=He(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(r,tt,t,n);this._request=i,i.getPromise().then((e=>{this._request=void 0,this._updateProgress(e.current),this._needToFetchStatus=!1,e.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()}),this._errorHandler)}))}_continueUpload(){const e=Ke*this._chunkMultiplier,t=new $e(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken(((r,i)=>{let s;try{s=Ge(this._ref._location,this._ref.storage,n,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(a){return this._error=a,void this._transition("error")}const o=this._ref.storage._makeRequest(s,tt,r,i,!1);this._request=o,o.getPromise().then((e=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(e.current),e.finalized?(this._metadata=e.metadata,this._transition("success")):this.completeTransitions_()}),this._errorHandler)}))}_increaseMultiplier(){const e=Ke*this._chunkMultiplier;2*e<33554432&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken(((e,t)=>{const n=Ue(this._ref.storage,this._ref._location,this._mappings),r=this._ref.storage._makeRequest(n,tt,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._metadata=e,this._transition("success")}),this._metadataErrorHandler)}))}_oneShotUpload(){this._resolveToken(((e,t)=>{const n=Be(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),r=this._ref.storage._makeRequest(n,tt,e,t);this._request=r,r.getPromise().then((e=>{this._request=void 0,this._metadata=e,this._updateProgress(this._blob.size()),this._transition("success")}),this._errorHandler)}))}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,void 0!==this._request?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t="paused"===this._state;this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=E(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=Qe(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,n,r){const i=new Xe(t||void 0,n||void 0,r||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise();const e=this._observers.slice();e.forEach((e=>{this._notifyObserver(e)}))}_finishPromise(){if(void 0!==this._resolve){let e=!0;switch(Qe(this._state)){case We.SUCCESS:Je(this._resolve.bind(null,this.snapshot))();break;case We.CANCELED:case We.ERROR:const t=this._reject;Je(t.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){const t=Qe(this._state);switch(t){case We.RUNNING:case We.PAUSED:e.next&&Je(e.next.bind(e,this.snapshot))();break;case We.SUCCESS:e.complete&&Je(e.complete.bind(e))();break;case We.CANCELED:case We.ERROR:e.error&&Je(e.error.bind(e,this._error))();break;default:e.error&&Je(e.error.bind(e,this._error))()}}resume(){const e="paused"===this._state||"pausing"===this._state;return e&&this._transition("running"),e}pause(){const e="running"===this._state;return e&&this._transition("pausing"),e}cancel(){const e="running"===this._state||"pausing"===this._state;return e&&this._transition("canceling"),e}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t){this._service=e,this._location=t instanceof L?t:L.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new rt(e,t)}get root(){const e=new L(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return we(this._location.path)}get storage(){return this._service}get parent(){const e=ve(this._location.path);if(null===e)return null;const t=new L(this._location.bucket,e);return new rt(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw D(e)}}function it(e,t,n){return e._throwIfRoot("uploadBytesResumable"),new nt(e,new me(t),n)}function st(e){e._throwIfRoot("getDownloadURL");const t=Ve(e.storage,e._location,Se());return e.storage.makeRequestWithTokens(t,tt).then((e=>{if(null===e)throw k();return e}))}function ot(e,t){const n=_e(e._location.path,t),r=new L(e._location.bucket,n);return new rt(e.storage,r)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(e){return/^[A-Za-z]+:\/\//.test(e)}function ct(e,t){return new rt(e,t)}function ut(e,t){if(e instanceof ft){const n=e;if(null==n._bucket)throw S();const r=new rt(n,n._bucket);return null!=t?ut(r,t):r}return void 0!==t?ot(e,t):e}function lt(e,t){if(t&&at(t)){if(e instanceof ft)return ct(e,t);throw O("To use ref(service, url), the first argument must be a Storage instance.")}return ut(e,t)}function ht(e,t){const n=t?.[a];return null==n?null:L.makeFromBucketSpec(n,e)}function dt(e,t,n,r={}){e.host=`${t}:${n}`;const s=(0,i.zJ)(t);s&&(0,i.gE)(`https://${e.host}/b`),e._isUsingEmulator=!0,e._protocol=s?"https":"http";const{mockUserToken:o}=r;o&&(e._overrideAuthToken="string"===typeof o?o:(0,i.Fy)(o,e.app.options.projectId))}class ft{constructor(e,t,n,r,i,s=!1){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._isUsingEmulator=s,this._bucket=null,this._host=o,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=c,this._maxUploadRetryTime=u,this._requests=new Set,this._bucket=null!=r?L.makeFromBucketSpec(r,this._host):ht(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=L.makeFromBucketSpec(this._url,e):this._bucket=ht(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){H("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){H("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){if((0,r.xZ)(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();return t.token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach((e=>e.cancel())),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new rt(this,e)}_makeRequest(e,t,n,r,i=!0){if(this._deleted)return new M(N());{const s=te(e,this._appId,n,r,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(s),s.getPromise().then((()=>this._requests.delete(s)),(()=>this._requests.delete(s))),s}}async makeRequestWithTokens(e,t){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}const pt="@firebase/storage",gt="0.14.3",mt="storage";function yt(e,t,n){return e=(0,i.Ku)(e),it(e,t,n)}function vt(e){return e=(0,i.Ku)(e),st(e)}function _t(e,t){return e=(0,i.Ku)(e),lt(e,t)}function wt(e=(0,r.Sx)(),t){e=(0,i.Ku)(e);const n=(0,r.j6)(e,mt),s=n.getImmediate({identifier:t}),o=(0,i.yU)("storage");return o&&bt(s,...o),s}function bt(e,t,n,r={}){dt(e,t,n,r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return new ft(n,i,s,t,r.MF)}function Tt(){(0,r.om)(new s.uA(mt,Et,"PUBLIC").setMultipleInstances(!0)),(0,r.KO)(pt,gt,""),(0,r.KO)(pt,gt,"esm2020")}Tt()},1387:function(e,t,n){n.d(t,{LA:function(){return ce},aE:function(){return it},lq:function(){return at},rd:function(){return ot}});n(4114),n(7642),n(8004),n(3853),n(5876),n(2475),n(5024),n(1698),n(8992),n(3215),n(4520),n(2577),n(3949),n(1454),n(8872),n(7550);var r=n(6768),i=n(144);
/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const s="undefined"!==typeof document;function o(e){return"object"===typeof e||"displayName"in e||"props"in e||"__vccOpts"in e}function a(e){return e.__esModule||"Module"===e[Symbol.toStringTag]||e.default&&o(e.default)}const c=Object.assign;function u(e,t){const n={};for(const r in t){const i=t[r];n[r]=h(i)?i.map(e):e(i)}return n}const l=()=>{},h=Array.isArray;const d=/#/g,f=/&/g,p=/\//g,g=/=/g,m=/\?/g,y=/\+/g,v=/%5B/g,_=/%5D/g,w=/%5E/g,b=/%60/g,E=/%7B/g,T=/%7C/g,I=/%7D/g,S=/%20/g;function C(e){return encodeURI(""+e).replace(T,"|").replace(v,"[").replace(_,"]")}function A(e){return C(e).replace(E,"{").replace(I,"}").replace(w,"^")}function k(e){return C(e).replace(y,"%2B").replace(S,"+").replace(d,"%23").replace(f,"%26").replace(b,"`").replace(E,"{").replace(I,"}").replace(w,"^")}function R(e){return k(e).replace(g,"%3D")}function O(e){return C(e).replace(d,"%23").replace(m,"%3F")}function N(e){return null==e?"":O(e).replace(p,"%2F")}function D(e){try{return decodeURIComponent(""+e)}catch(t){}return""+e}const x=/\/$/,P=e=>e.replace(x,"");function L(e,t,n="/"){let r,i={},s="",o="";const a=t.indexOf("#");let c=t.indexOf("?");return a<c&&a>=0&&(c=-1),c>-1&&(r=t.slice(0,c),s=t.slice(c+1,a>-1?a:t.length),i=e(s)),a>-1&&(r=r||t.slice(0,a),o=t.slice(a,t.length)),r=q(null!=r?r:t,n),{fullPath:r+(s&&"?")+s+o,path:r,query:i,hash:D(o)}}function M(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function U(e,t){return t&&e.toLowerCase().startsWith(t.toLowerCase())?e.slice(t.length)||"/":e}function V(e,t,n){const r=t.matched.length-1,i=n.matched.length-1;return r>-1&&r===i&&F(t.matched[r],n.matched[i])&&j(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function F(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function j(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!B(e[n],t[n]))return!1;return!0}function B(e,t){return h(e)?$(e,t):h(t)?$(t,e):e===t}function $(e,t){return h(t)?e.length===t.length&&e.every(((e,n)=>e===t[n])):1===e.length&&e[0]===t}function q(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),i=r[r.length-1];".."!==i&&"."!==i||r.push("");let s,o,a=n.length-1;for(s=0;s<r.length;s++)if(o=r[s],"."!==o){if(".."!==o)break;a>1&&a--}return n.slice(0,a).join("/")+"/"+r.slice(s).join("/")}const z={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var H,K;(function(e){e["pop"]="pop",e["push"]="push"})(H||(H={})),function(e){e["back"]="back",e["forward"]="forward",e["unknown"]=""}(K||(K={}));function G(e){if(!e)if(s){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return"/"!==e[0]&&"#"!==e[0]&&(e="/"+e),P(e)}const W=/^[^#]+#/;function Q(e,t){return e.replace(W,"#")+t}function X(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const J=()=>({left:window.scrollX,top:window.scrollY});function Y(e){let t;if("el"in e){const n=e.el,r="string"===typeof n&&n.startsWith("#");0;const i="string"===typeof n?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;t=X(i,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(null!=t.left?t.left:window.scrollX,null!=t.top?t.top:window.scrollY)}function Z(e,t){const n=history.state?history.state.position-t:-1;return n+e}const ee=new Map;function te(e,t){ee.set(e,t)}function ne(e){const t=ee.get(e);return ee.delete(e),t}let re=()=>location.protocol+"//"+location.host;function ie(e,t){const{pathname:n,search:r,hash:i}=t,s=e.indexOf("#");if(s>-1){let t=i.includes(e.slice(s))?e.slice(s).length:1,n=i.slice(t);return"/"!==n[0]&&(n="/"+n),U(n,"")}const o=U(n,e);return o+r+i}function se(e,t,n,r){let i=[],s=[],o=null;const a=({state:s})=>{const a=ie(e,location),c=n.value,u=t.value;let l=0;if(s){if(n.value=a,t.value=s,o&&o===c)return void(o=null);l=u?s.position-u.position:0}else r(a);i.forEach((e=>{e(n.value,c,{delta:l,type:H.pop,direction:l?l>0?K.forward:K.back:K.unknown})}))};function u(){o=n.value}function l(e){i.push(e);const t=()=>{const t=i.indexOf(e);t>-1&&i.splice(t,1)};return s.push(t),t}function h(){const{history:e}=window;e.state&&e.replaceState(c({},e.state,{scroll:J()}),"")}function d(){for(const e of s)e();s=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",h)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",h,{passive:!0}),{pauseListeners:u,listen:l,destroy:d}}function oe(e,t,n,r=!1,i=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:i?J():null}}function ae(e){const{history:t,location:n}=window,r={value:ie(e,n)},i={value:t.state};function s(r,s,o){const a=e.indexOf("#"),c=a>-1?(n.host&&document.querySelector("base")?e:e.slice(a))+r:re()+e+r;try{t[o?"replaceState":"pushState"](s,"",c),i.value=s}catch(u){console.error(u),n[o?"replace":"assign"](c)}}function o(e,n){const o=c({},t.state,oe(i.value.back,e,i.value.forward,!0),n,{position:i.value.position});s(e,o,!0),r.value=e}function a(e,n){const o=c({},i.value,t.state,{forward:e,scroll:J()});s(o.current,o,!0);const a=c({},oe(r.value,e,null),{position:o.position+1},n);s(e,a,!1),r.value=e}return i.value||s(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0),{location:r,state:i,push:a,replace:o}}function ce(e){e=G(e);const t=ae(e),n=se(e,t.state,t.location,t.replace);function r(e,t=!0){t||n.pauseListeners(),history.go(e)}const i=c({location:"",base:e,go:r,createHref:Q.bind(null,e)},t,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>t.state.value}),i}function ue(e){return"string"===typeof e||e&&"object"===typeof e}function le(e){return"string"===typeof e||"symbol"===typeof e}const he=Symbol("");var de;(function(e){e[e["aborted"]=4]="aborted",e[e["cancelled"]=8]="cancelled",e[e["duplicated"]=16]="duplicated"})(de||(de={}));function fe(e,t){return c(new Error,{type:e,[he]:!0},t)}function pe(e,t){return e instanceof Error&&he in e&&(null==t||!!(e.type&t))}const ge="[^/]+?",me={sensitive:!1,strict:!1,start:!0,end:!0},ye=/[.+*?^${}()[\]/\\]/g;function ve(e,t){const n=c({},me,t),r=[];let i=n.start?"^":"";const s=[];for(const c of e){const e=c.length?[]:[90];n.strict&&!c.length&&(i+="/");for(let t=0;t<c.length;t++){const r=c[t];let o=40+(n.sensitive?.25:0);if(0===r.type)t||(i+="/"),i+=r.value.replace(ye,"\\$&"),o+=40;else if(1===r.type){const{value:e,repeatable:n,optional:a,regexp:u}=r;s.push({name:e,repeatable:n,optional:a});const h=u||ge;if(h!==ge){o+=10;try{new RegExp(`(${h})`)}catch(l){throw new Error(`Invalid custom RegExp for param "${e}" (${h}): `+l.message)}}let d=n?`((?:${h})(?:/(?:${h}))*)`:`(${h})`;t||(d=a&&c.length<2?`(?:/${d})`:"/"+d),a&&(d+="?"),i+=d,o+=20,a&&(o+=-8),n&&(o+=-20),".*"===h&&(o+=-50)}e.push(o)}r.push(e)}if(n.strict&&n.end){const e=r.length-1;r[e][r[e].length-1]+=.7000000000000001}n.strict||(i+="/?"),n.end?i+="$":n.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,n.sensitive?"":"i");function a(e){const t=e.match(o),n={};if(!t)return null;for(let r=1;r<t.length;r++){const e=t[r]||"",i=s[r-1];n[i.name]=e&&i.repeatable?e.split("/"):e}return n}function u(t){let n="",r=!1;for(const i of e){r&&n.endsWith("/")||(n+="/"),r=!1;for(const e of i)if(0===e.type)n+=e.value;else if(1===e.type){const{value:s,repeatable:o,optional:a}=e,c=s in t?t[s]:"";if(h(c)&&!o)throw new Error(`Provided param "${s}" is an array but it is not repeatable (* or + modifiers)`);const u=h(c)?c.join("/"):c;if(!u){if(!a)throw new Error(`Missing required param "${s}"`);i.length<2&&(n.endsWith("/")?n=n.slice(0,-1):r=!0)}n+=u}}return n||"/"}return{re:o,score:r,keys:s,parse:a,stringify:u}}function _e(e,t){let n=0;while(n<e.length&&n<t.length){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?1===e.length&&80===e[0]?-1:1:e.length>t.length?1===t.length&&80===t[0]?1:-1:0}function we(e,t){let n=0;const r=e.score,i=t.score;while(n<r.length&&n<i.length){const e=_e(r[n],i[n]);if(e)return e;n++}if(1===Math.abs(i.length-r.length)){if(be(r))return 1;if(be(i))return-1}return i.length-r.length}function be(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Ee={type:0,value:""},Te=/[a-zA-Z0-9_]/;function Ie(e){if(!e)return[[]];if("/"===e)return[[Ee]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(e){throw new Error(`ERR (${n})/"${u}": ${e}`)}let n=0,r=n;const i=[];let s;function o(){s&&i.push(s),s=[]}let a,c=0,u="",l="";function h(){u&&(0===n?s.push({type:0,value:u}):1===n||2===n||3===n?(s.length>1&&("*"===a||"+"===a)&&t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:u,regexp:l,repeatable:"*"===a||"+"===a,optional:"*"===a||"?"===a})):t("Invalid state to consume buffer"),u="")}function d(){u+=a}while(c<e.length)if(a=e[c++],"\\"!==a||2===n)switch(n){case 0:"/"===a?(u&&h(),o()):":"===a?(h(),n=1):d();break;case 4:d(),n=r;break;case 1:"("===a?n=2:Te.test(a)?d():(h(),n=0,"*"!==a&&"?"!==a&&"+"!==a&&c--);break;case 2:")"===a?"\\"==l[l.length-1]?l=l.slice(0,-1)+a:n=3:l+=a;break;case 3:h(),n=0,"*"!==a&&"?"!==a&&"+"!==a&&c--,l="";break;default:t("Unknown state");break}else r=n,n=4;return 2===n&&t(`Unfinished custom RegExp for param "${u}"`),h(),o(),i}function Se(e,t,n){const r=ve(Ie(e.path),n);const i=c(r,{record:e,parent:t,children:[],alias:[]});return t&&!i.record.aliasOf===!t.record.aliasOf&&t.children.push(i),i}function Ce(e,t){const n=[],r=new Map;function i(e){return r.get(e)}function s(e,n,r){const i=!r,a=ke(e);a.aliasOf=r&&r.record;const h=De(t,e),d=[a];if("alias"in e){const t="string"===typeof e.alias?[e.alias]:e.alias;for(const e of t)d.push(ke(c({},a,{components:r?r.record.components:a.components,path:e,aliasOf:r?r.record:a})))}let f,p;for(const t of d){const{path:c}=t;if(n&&"/"!==c[0]){const e=n.record.path,r="/"===e[e.length-1]?"":"/";t.path=n.record.path+(c&&r+c)}if(f=Se(t,n,h),r?r.alias.push(f):(p=p||f,p!==f&&p.alias.push(f),i&&e.name&&!Oe(f)&&o(e.name)),Le(f)&&u(f),a.children){const e=a.children;for(let t=0;t<e.length;t++)s(e[t],f,r&&r.children[t])}r=r||f}return p?()=>{o(p)}:l}function o(e){if(le(e)){const t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(o),t.alias.forEach(o))}else{const t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(o),e.alias.forEach(o))}}function a(){return n}function u(e){const t=xe(e,n);n.splice(t,0,e),e.record.name&&!Oe(e)&&r.set(e.record.name,e)}function h(e,t){let i,s,o,a={};if("name"in e&&e.name){if(i=r.get(e.name),!i)throw fe(1,{location:e});0,o=i.record.name,a=c(Ae(t.params,i.keys.filter((e=>!e.optional)).concat(i.parent?i.parent.keys.filter((e=>e.optional)):[]).map((e=>e.name))),e.params&&Ae(e.params,i.keys.map((e=>e.name)))),s=i.stringify(a)}else if(null!=e.path)s=e.path,i=n.find((e=>e.re.test(s))),i&&(a=i.parse(s),o=i.record.name);else{if(i=t.name?r.get(t.name):n.find((e=>e.re.test(t.path))),!i)throw fe(1,{location:e,currentLocation:t});o=i.record.name,a=c({},t.params,e.params),s=i.stringify(a)}const u=[];let l=i;while(l)u.unshift(l.record),l=l.parent;return{name:o,path:s,params:a,matched:u,meta:Ne(u)}}function d(){n.length=0,r.clear()}return t=De({strict:!1,end:!0,sensitive:!1},t),e.forEach((e=>s(e))),{addRoute:s,resolve:h,removeRoute:o,clearRoutes:d,getRoutes:a,getRecordMatcher:i}}function Ae(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function ke(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:Re(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function Re(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]="object"===typeof n?n[r]:n;return t}function Oe(e){while(e){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Ne(e){return e.reduce(((e,t)=>c(e,t.meta)),{})}function De(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function xe(e,t){let n=0,r=t.length;while(n!==r){const i=n+r>>1,s=we(e,t[i]);s<0?r=i:n=i+1}const i=Pe(e);return i&&(r=t.lastIndexOf(i,r-1)),r}function Pe(e){let t=e;while(t=t.parent)if(Le(t)&&0===we(e,t))return t}function Le({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function Me(e){const t={};if(""===e||"?"===e)return t;const n="?"===e[0],r=(n?e.slice(1):e).split("&");for(let i=0;i<r.length;++i){const e=r[i].replace(y," "),n=e.indexOf("="),s=D(n<0?e:e.slice(0,n)),o=n<0?null:D(e.slice(n+1));if(s in t){let e=t[s];h(e)||(e=t[s]=[e]),e.push(o)}else t[s]=o}return t}function Ue(e){let t="";for(let n in e){const r=e[n];if(n=R(n),null==r){void 0!==r&&(t+=(t.length?"&":"")+n);continue}const i=h(r)?r.map((e=>e&&k(e))):[r&&k(r)];i.forEach((e=>{void 0!==e&&(t+=(t.length?"&":"")+n,null!=e&&(t+="="+e))}))}return t}function Ve(e){const t={};for(const n in e){const r=e[n];void 0!==r&&(t[n]=h(r)?r.map((e=>null==e?null:""+e)):null==r?r:""+r)}return t}const Fe=Symbol(""),je=Symbol(""),Be=Symbol(""),$e=Symbol(""),qe=Symbol("");function ze(){let e=[];function t(t){return e.push(t),()=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function He(e,t,n,r,i,s=e=>e()){const o=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise(((a,c)=>{const u=e=>{!1===e?c(fe(4,{from:n,to:t})):e instanceof Error?c(e):ue(e)?c(fe(2,{from:t,to:e})):(o&&r.enterCallbacks[i]===o&&"function"===typeof e&&o.push(e),a())},l=s((()=>e.call(r&&r.instances[i],t,n,u)));let h=Promise.resolve(l);e.length<3&&(h=h.then(u)),h.catch((e=>c(e)))}))}function Ke(e,t,n,r,i=e=>e()){const s=[];for(const c of e){0;for(const e in c.components){let u=c.components[e];if("beforeRouteEnter"===t||c.instances[e])if(o(u)){const o=u.__vccOpts||u,a=o[t];a&&s.push(He(a,n,r,c,e,i))}else{let o=u();0,s.push((()=>o.then((s=>{if(!s)throw new Error(`Couldn't resolve component "${e}" at "${c.path}"`);const o=a(s)?s.default:s;c.mods[e]=s,c.components[e]=o;const u=o.__vccOpts||o,l=u[t];return l&&He(l,n,r,c,e,i)()}))))}}}return s}function Ge(e){const t=(0,r.WQ)(Be),n=(0,r.WQ)($e);const s=(0,r.EW)((()=>{const n=(0,i.R1)(e.to);return t.resolve(n)})),o=(0,r.EW)((()=>{const{matched:e}=s.value,{length:t}=e,r=e[t-1],i=n.matched;if(!r||!i.length)return-1;const o=i.findIndex(F.bind(null,r));if(o>-1)return o;const a=Ze(e[t-2]);return t>1&&Ze(r)===a&&i[i.length-1].path!==a?i.findIndex(F.bind(null,e[t-2])):o})),a=(0,r.EW)((()=>o.value>-1&&Ye(n.params,s.value.params))),c=(0,r.EW)((()=>o.value>-1&&o.value===n.matched.length-1&&j(n.params,s.value.params)));function u(n={}){if(Je(n)){const n=t[(0,i.R1)(e.replace)?"replace":"push"]((0,i.R1)(e.to)).catch(l);return e.viewTransition&&"undefined"!==typeof document&&"startViewTransition"in document&&document.startViewTransition((()=>n)),n}return Promise.resolve()}return{route:s,href:(0,r.EW)((()=>s.value.href)),isActive:a,isExactActive:c,navigate:u}}function We(e){return 1===e.length?e[0]:e}const Qe=(0,r.pM)({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ge,setup(e,{slots:t}){const n=(0,i.Kh)(Ge(e)),{options:s}=(0,r.WQ)(Be),o=(0,r.EW)((()=>({[et(e.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[et(e.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive})));return()=>{const i=t.default&&We(t.default(n));return e.custom?i:(0,r.h)("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},i)}}}),Xe=Qe;function Je(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&(void 0===e.button||0===e.button)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function Ye(e,t){for(const n in t){const r=t[n],i=e[n];if("string"===typeof r){if(r!==i)return!1}else if(!h(i)||i.length!==r.length||r.some(((e,t)=>e!==i[t])))return!1}return!0}function Ze(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const et=(e,t,n)=>null!=e?e:null!=t?t:n,tt=(0,r.pM)({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const s=(0,r.WQ)(qe),o=(0,r.EW)((()=>e.route||s.value)),a=(0,r.WQ)(je,0),u=(0,r.EW)((()=>{let e=(0,i.R1)(a);const{matched:t}=o.value;let n;while((n=t[e])&&!n.components)e++;return e})),l=(0,r.EW)((()=>o.value.matched[u.value]));(0,r.Gt)(je,(0,r.EW)((()=>u.value+1))),(0,r.Gt)(Fe,l),(0,r.Gt)(qe,o);const h=(0,i.KR)();return(0,r.wB)((()=>[h.value,l.value,e.name]),(([e,t,n],[r,i,s])=>{t&&(t.instances[n]=e,i&&i!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=i.leaveGuards),t.updateGuards.size||(t.updateGuards=i.updateGuards))),!e||!t||i&&F(t,i)&&r||(t.enterCallbacks[n]||[]).forEach((t=>t(e)))}),{flush:"post"}),()=>{const i=o.value,s=e.name,a=l.value,u=a&&a.components[s];if(!u)return nt(n.default,{Component:u,route:i});const d=a.props[s],f=d?!0===d?i.params:"function"===typeof d?d(i):d:null,p=e=>{e.component.isUnmounted&&(a.instances[s]=null)},g=(0,r.h)(u,c({},f,t,{onVnodeUnmounted:p,ref:h}));return nt(n.default,{Component:g,route:i})||g}}});function nt(e,t){if(!e)return null;const n=e(t);return 1===n.length?n[0]:n}const rt=tt;function it(e){const t=Ce(e.routes,e),n=e.parseQuery||Me,o=e.stringifyQuery||Ue,a=e.history;const d=ze(),f=ze(),p=ze(),g=(0,i.IJ)(z);let m=z;s&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const y=u.bind(null,(e=>""+e)),v=u.bind(null,N),_=u.bind(null,D);function w(e,n){let r,i;return le(e)?(r=t.getRecordMatcher(e),i=n):i=e,t.addRoute(i,r)}function b(e){const n=t.getRecordMatcher(e);n&&t.removeRoute(n)}function E(){return t.getRoutes().map((e=>e.record))}function T(e){return!!t.getRecordMatcher(e)}function I(e,r){if(r=c({},r||g.value),"string"===typeof e){const i=L(n,e,r.path),s=t.resolve({path:i.path},r),o=a.createHref(i.fullPath);return c(i,s,{params:_(s.params),hash:D(i.hash),redirectedFrom:void 0,href:o})}let i;if(null!=e.path)i=c({},e,{path:L(n,e.path,r.path).path});else{const t=c({},e.params);for(const e in t)null==t[e]&&delete t[e];i=c({},e,{params:v(t)}),r.params=v(r.params)}const s=t.resolve(i,r),u=e.hash||"";s.params=y(_(s.params));const l=M(o,c({},e,{hash:A(u),path:s.path})),h=a.createHref(l);return c({fullPath:l,hash:u,query:o===Ue?Ve(e.query):e.query||{}},s,{redirectedFrom:void 0,href:h})}function S(e){return"string"===typeof e?L(n,e,g.value.path):c({},e)}function C(e,t){if(m!==e)return fe(8,{from:t,to:e})}function k(e){return x(e)}function R(e){return k(c(S(e),{replace:!0}))}function O(e){const t=e.matched[e.matched.length-1];if(t&&t.redirect){const{redirect:n}=t;let r="function"===typeof n?n(e):n;return"string"===typeof r&&(r=r.includes("?")||r.includes("#")?r=S(r):{path:r},r.params={}),c({query:e.query,hash:e.hash,params:null!=r.path?{}:e.params},r)}}function x(e,t){const n=m=I(e),r=g.value,i=e.state,s=e.force,a=!0===e.replace,u=O(n);if(u)return x(c(S(u),{state:"object"===typeof u?c({},i,u.state):i,force:s,replace:a}),t||n);const l=n;let h;return l.redirectedFrom=t,!s&&V(o,r,n)&&(h=fe(16,{to:l,from:r}),re(r,r,!0,!1)),(h?Promise.resolve(h):F(l,r)).catch((e=>pe(e)?pe(e,2)?e:ee(e):Q(e,l,r))).then((e=>{if(e){if(pe(e,2))return x(c({replace:a},S(e.to),{state:"object"===typeof e.to?c({},i,e.to.state):i,force:s}),t||l)}else e=B(l,r,!0,a,i);return j(l,r,e),e}))}function P(e,t){const n=C(e,t);return n?Promise.reject(n):Promise.resolve()}function U(e){const t=oe.values().next().value;return t&&"function"===typeof t.runWithContext?t.runWithContext(e):e()}function F(e,t){let n;const[r,i,s]=st(e,t);n=Ke(r.reverse(),"beforeRouteLeave",e,t);for(const a of r)a.leaveGuards.forEach((r=>{n.push(He(r,e,t))}));const o=P.bind(null,e,t);return n.push(o),ce(n).then((()=>{n=[];for(const r of d.list())n.push(He(r,e,t));return n.push(o),ce(n)})).then((()=>{n=Ke(i,"beforeRouteUpdate",e,t);for(const r of i)r.updateGuards.forEach((r=>{n.push(He(r,e,t))}));return n.push(o),ce(n)})).then((()=>{n=[];for(const r of s)if(r.beforeEnter)if(h(r.beforeEnter))for(const i of r.beforeEnter)n.push(He(i,e,t));else n.push(He(r.beforeEnter,e,t));return n.push(o),ce(n)})).then((()=>(e.matched.forEach((e=>e.enterCallbacks={})),n=Ke(s,"beforeRouteEnter",e,t,U),n.push(o),ce(n)))).then((()=>{n=[];for(const r of f.list())n.push(He(r,e,t));return n.push(o),ce(n)})).catch((e=>pe(e,8)?e:Promise.reject(e)))}function j(e,t,n){p.list().forEach((r=>U((()=>r(e,t,n)))))}function B(e,t,n,r,i){const o=C(e,t);if(o)return o;const u=t===z,l=s?history.state:{};n&&(r||u?a.replace(e.fullPath,c({scroll:u&&l&&l.scroll},i)):a.push(e.fullPath,i)),g.value=e,re(e,t,n,u),ee()}let $;function q(){$||($=a.listen(((e,t,n)=>{if(!ae.listening)return;const r=I(e),i=O(r);if(i)return void x(c(i,{replace:!0,force:!0}),r).catch(l);m=r;const o=g.value;s&&te(Z(o.fullPath,n.delta),J()),F(r,o).catch((e=>pe(e,12)?e:pe(e,2)?(x(c(S(e.to),{force:!0}),r).then((e=>{pe(e,20)&&!n.delta&&n.type===H.pop&&a.go(-1,!1)})).catch(l),Promise.reject()):(n.delta&&a.go(-n.delta,!1),Q(e,r,o)))).then((e=>{e=e||B(r,o,!1),e&&(n.delta&&!pe(e,8)?a.go(-n.delta,!1):n.type===H.pop&&pe(e,20)&&a.go(-1,!1)),j(r,o,e)})).catch(l)})))}let K,G=ze(),W=ze();function Q(e,t,n){ee(e);const r=W.list();return r.length?r.forEach((r=>r(e,t,n))):console.error(e),Promise.reject(e)}function X(){return K&&g.value!==z?Promise.resolve():new Promise(((e,t)=>{G.add([e,t])}))}function ee(e){return K||(K=!e,q(),G.list().forEach((([t,n])=>e?n(e):t())),G.reset()),e}function re(t,n,i,o){const{scrollBehavior:a}=e;if(!s||!a)return Promise.resolve();const c=!i&&ne(Z(t.fullPath,0))||(o||!i)&&history.state&&history.state.scroll||null;return(0,r.dY)().then((()=>a(t,n,c))).then((e=>e&&Y(e))).catch((e=>Q(e,t,n)))}const ie=e=>a.go(e);let se;const oe=new Set,ae={currentRoute:g,listening:!0,addRoute:w,removeRoute:b,clearRoutes:t.clearRoutes,hasRoute:T,getRoutes:E,resolve:I,options:e,push:k,replace:R,go:ie,back:()=>ie(-1),forward:()=>ie(1),beforeEach:d.add,beforeResolve:f.add,afterEach:p.add,onError:W.add,isReady:X,install(e){const t=this;e.component("RouterLink",Xe),e.component("RouterView",rt),e.config.globalProperties.$router=t,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>(0,i.R1)(g)}),s&&!se&&g.value===z&&(se=!0,k(a.location).catch((e=>{0})));const n={};for(const i in z)Object.defineProperty(n,i,{get:()=>g.value[i],enumerable:!0});e.provide(Be,t),e.provide($e,(0,i.Gc)(n)),e.provide(qe,g);const r=e.unmount;oe.add(e),e.unmount=function(){oe.delete(e),oe.size<1&&(m=z,$&&$(),$=null,g.value=z,se=!1,K=!1),r()}}};function ce(e){return e.reduce(((e,t)=>e.then((()=>U(t)))),Promise.resolve())}return ae}function st(e,t){const n=[],r=[],i=[],s=Math.max(t.matched.length,e.matched.length);for(let o=0;o<s;o++){const s=t.matched[o];s&&(e.matched.find((e=>F(e,s)))?r.push(s):n.push(s));const a=e.matched[o];a&&(t.matched.find((e=>F(e,a)))||i.push(a))}return[n,r,i]}function ot(){return(0,r.WQ)(Be)}function at(e){return(0,r.WQ)($e)}}}]);
//# sourceMappingURL=chunk-vendors.481765f5.js.map