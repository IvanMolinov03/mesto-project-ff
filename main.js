(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e){e.querySelector(".popup__close").addEventListener("click",(function(){t(e)})),e.addEventListener("mousedown",(function(n){n.target.classList.contains("popup")&&t(e)}))}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"f1d4d7f0-801a-41e0-ae27-1e8c877cc43b","Content-Type":"application/json"}};function c(e,t,n,r,o,c,a,u,i){var s=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),l=s.querySelector(".card__delete-button"),d=s.querySelector(".card__like-button"),f=s.querySelector(".card__image"),p=s.querySelector(".card__like-count");return f.src=e,f.alt=t,s.querySelector(".card__title").textContent=t,d.addEventListener("click",(function(){return r(d,i).then((function(e){p.textContent=e.likes.length}))})),f.addEventListener("click",(function(){return o(e,t)})),a!==u?l.remove():l.addEventListener("click",(function(){n(s,i)})),c.some((function(e){return e._id===a}))&&d.classList.add("card__like-button_is-active"),p.textContent=c.length,s}function a(e,t){e.remove(),function(e){fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers})}(t)}function u(e,t){return e.classList.toggle("card__like-button_is-active"),e.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t)}var i={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},s=function(e,t){e.classList.add("".concat(t.inactiveButtonClass)),e.setAttribute("disabled","true")},l=function(e,t,n){!function(e){return e.some((function(e){return!1===e.validity.valid}))}(e)?function(e,t){e.classList.remove("".concat(t.inactiveButtonClass)),e.removeAttribute("disabled")}(t,n):s(t,n)},d=function(e,t){Array.from(e.querySelectorAll(".".concat(t.errorClass))).forEach((function(e){e.textContent=""})),Array.from(e.querySelectorAll(".".concat(t.inputErrorClass))).forEach((function(e){e.classList.remove("".concat(t.inputErrorClass))}));var n=e.querySelector("".concat(t.submitButtonSelector));s(n,t)};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p=document.querySelector(".places__list"),m=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),y=document.querySelector(".popup_type_image"),v=document.querySelector(".popup_type_avatar"),h=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),S=document.querySelector(".profile__image-img"),C=document.querySelector(".profile__image-button"),q=y.querySelector(".popup__image"),E=y.querySelector(".popup__caption"),k=document.forms.editProfile,L=document.forms.newPlace,g=document.forms.newPlace.placeName,x=document.forms.newPlace.link,A=document.forms.newAvatar,w=document.forms.newAvatar.link,P=document.querySelector(".profile__title"),j=document.querySelector(".profile__description"),U=document.querySelector(".profile__image-img"),T=document.forms.editProfile.name,O=document.forms.editProfile.description;function B(){T.value=P.textContent,O.value=j.textContent}function D(t,n){q.src=t,q.alt=n,E.textContent=n,e(y)}h.addEventListener("click",(function(){return B(),d(k,i),void e(m)})),b.addEventListener("click",(function(){return e(_)})),C.addEventListener("click",(function(){return d(A,i),void e(v)})),k.addEventListener("submit",(function(e){var n,r;e.preventDefault(),P.textContent=T.value,j.textContent=O.value,(n=P.textContent,r=j.textContent,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:n,about:r})})).then((function(e){return m.querySelector(".popup__button").textContent="Сохранение...",e})).catch((function(e){console.log(e)})).finally((function(){m.querySelector(".popup__button").textContent="Сохранить"})),t(m)})),L.addEventListener("submit",(function(e){var n,r;e.preventDefault(),(n=g.value,r=x.value,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){return _.querySelector(".popup__button").textContent="Сохранение...",e})).then((function(e){return p.prepend(c(e.link,e.name,a,u,D,e.likes,e.owner._id,e.owner._id,e._id))})).catch((function(e){console.log(e)})).finally((function(){_.querySelector(".popup__button").textContent="Сохранить"})),L.reset(),d(L,i),t(_)})),A.addEventListener("submit",(function(e){var n;e.preventDefault(),S.src=w.value,(n=w.value,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:n})})).then((function(e){return v.querySelector(".popup__button").textContent="Сохранение...",e})).catch((function(e){console.log(e)})).finally((function(){v.querySelector(".popup__button").textContent="Сохранить"})),t(v)})),r(m),r(y),r(_),r(v),B(),function(e){Array.from(document.querySelectorAll("".concat(e.formSelector))).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll("".concat(t.inputSelector))),r=e.querySelector("".concat(t.submitButtonSelector));l(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("".concat(n.inputErrorClass)),r.classList.remove("".concat(n.errorClass)),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add("".concat(r.inputErrorClass)),o.textContent=n,o.classList.add("".concat(r.errorClass))}(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))}))}(t,e)}))}(i),Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];P.textContent=o.name,j.textContent=o.about,U.src=o.avatar,i.forEach((function(e){p.append(c(e.link,e.name,a,u,D,e.likes,o._id,e.owner._id,e._id))}))})).catch((function(e){return console.log(e)}))})();