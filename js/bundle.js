!function t(e,r,i){function s(o,a){if(!r[o]){if(!e[o]){var l="function"==typeof require&&require;if(!a&&l)return l(o,!0);if(n)return n(o,!0);throw new Error("Cannot find module '"+o+"'")}var c=r[o]={exports:{}};e[o][0].call(c.exports,function(t){var r=e[o][1][t];return s(r?r:t)},c,c.exports,t,e,r,i)}return r[o].exports}for(var n="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}({1:[function(t,e,r){"use strict";var i=t("./controllers/filters-controller").FiltersController,s=t("./data/filters-data").filtersData,n=t("./components/scheme-changer").SchemeChanger,o=t("./components/iframe").Iframe,a=t("./components/supported-browser").SupportedBrowser,l=function(){this.supportedBrowser=new a,this.supportedBrowser.isBrowserSupported&&(this.filtersController=new i({viewWrapper:".css-filters",filtersData:s}),this.iframe=new o({iframeWrapper:".iframe-wrapper",iframeBoxTmlpEl:".iframe-box-tmpl",src:"http://gospodarets.com/developments/paint-board/",srcForm:".src-form",srcInput:".src-input"}),this.schemeChanger=new n({filtersModelData:this.filtersController.getFiltersModelData()}),this.bindEvents())};l.prototype.bindEvents=function(){this.filtersController.on("filtersChanged",this.schemeChanger.setScheme,this.schemeChanger)},r.App=l},{"./components/iframe":2,"./components/scheme-changer":3,"./components/supported-browser":4,"./controllers/filters-controller":5,"./data/filters-data":6}],2:[function(t,e,r){"use strict";var i=function(t){this.options=t,this.iframeWrapper=document.querySelector(this.options.iframeWrapper),this.iframeBoxTmlpEl=document.querySelector(this.options.iframeBoxTmlpEl),this.src=this.options.src,this.appendIframe(),this.srcForm=this.iframeWrapper.querySelector(this.options.srcForm),this.srcInput=this.iframeWrapper.querySelector(this.options.srcInput),this.iframe=this.iframeWrapper.querySelector("iframe"),this.setInputSrcValue(this.src),this.setIframeSrc(this.src),this.bindEvents()};i.prototype.appendIframe=function(){this.iframeWrapper.innerHTML=this.iframeBoxTmlpEl.textContent},i.prototype.bindEvents=function(){this.srcForm.addEventListener("submit",this.onSubmit.bind(this),!1)},i.prototype.setIframeSrc=function(){this.iframe.setAttribute("src",this.src)},i.prototype.setInputSrcValue=function(t){this.srcInput.value=t},i.prototype.onSubmit=function(t){var e=this.srcInput.value;e!==this.src&&(this.src=e,this.setIframeSrc(e)),t.preventDefault()},r.Iframe=i},{}],3:[function(t,e,r){"use strict";var i=t("../utils/utils"),s=i.filterProperty,n=i.getCssDeclaration,o=function(t){this.options=t,this.demoEls=document.querySelectorAll(".apply-filters"),this.appliedFilterText=document.querySelector(".applied-filter"),this.setScheme(t.filtersModelData)};o.prototype.setScheme=function(t){var e=i.cloneObj(t),r=this.generateFilterCss(e);this.setFilterCss(r)},o.prototype.generateFilterCss=function(t){var e,r,i,s=this.getEnabledFilters(t),n="",o="",a="";for(e in s)i=s[e],r=i.current,n=i.postfix||"",o=i.filterCss||"",a+=this.generateCssValue(e,r,n,o);return a},o.prototype.generateCssValue=function(t,e,r,i){var s="";return s=i?i.replace(/\%CURRENT\%/gi,e+r):e+r," "+t+"("+s+")"},o.prototype.getEnabledFilters=function(t){var e,r,i={};for(e in t)r=t[e],0!==r.current&&(i[e]=r);return i},o.prototype.setFilterCss=function(t){t||(t=" none");for(var e=this.demoEls.length;e--;)this.demoEls[e].style[s]=t;this.appliedFilterText.textContent=n(s,t)},r.SchemeChanger=o},{"../utils/utils":11}],4:[function(t,e,r){"use strict";function i(t,e){return typeof t===e}function s(t,e){return!!~(""+t).indexOf(e)}function n(t,e){for(var r in t){var i=t[r];if(!s(i,"-")&&void 0!==f[i])return"pfx"==e?i:!0}return!1}function o(t,e,r){for(var s in t){var n=e[t[s]];if(void 0!==n)return r===!1?t[s]:i(n,"function")?n.bind(r||e):n}return!1}function a(t,e,r){var s=t.charAt(0).toUpperCase()+t.slice(1),a=(t+" "+d.join(s+" ")+s).split(" ");return i(e,"string")||i(e,"undefined")?n(a,e):(a=(t+" "+v.join(s+" ")+s).split(" "),o(a,e,r))}var l=["flexbox","cssColumns","cssFilters","inputRange","classList","arrayForEach","bind","objectKeys","objectCreate"],c=function(){this.isBrowserSupported=this.checkFeatures(),this.isBrowserSupported||this.showUnsupportedMsg()};c.prototype.showUnsupportedMsg=function(){document.body.className+=" not-supported-browser"},c.prototype.checkFeatures=function(){var t,e,r;for(e=l.length;e--;)if(t=l[e],r=this[t](),!r)return!1;return!0},c.prototype.objectCreate=function(){return"function"==typeof Object.create},c.prototype.objectKeys=function(){return"function"==typeof Object.keys},c.prototype.bind=function(){return"function"==typeof Function.prototype.bind},c.prototype.arrayForEach=function(){return"function"==typeof Array.prototype.forEach},c.prototype.classList=function(){return"classList"in document.createElement("_")},c.prototype.inputRange=function(){var t=document.createElement("input");try{return t.type="range","range"==t.type?!0:!1}catch(e){return!1}},c.prototype.cssFilters=function(){var t=document.createElement("div");return t.style.cssText=h.join("filter:blur(2px); "),!!t.style.length&&(void 0===document.documentMode||document.documentMode>9)},c.prototype.cssColumns=function(){return a("columnCount")},c.prototype.flexbox=function(){return a("flexWrap")};var p="modernizr",u=document.createElement(p),f=u.style,h=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",d=m.split(" "),v=m.toLowerCase().split(" ");r.SupportedBrowser=c},{}],5:[function(t,e,r){"use strict";var i=t("../utils/utils"),s=t("../utils/events-system").EventsSystem,n=t("../models/filters-model").FiltersModel,o=t("../views/filters-view").FiltersView,a=function(t){this.options=t,this.filtersModel=new n({filtersData:t.filtersData}),this.filtersView=new o({viewWrapper:t.viewWrapper,filtersModelData:this.filtersModel.getFiltersData()}),this.bindEvents()};i.inherit(a,s),a.prototype.bindEvents=function(){this.filtersView.on("filterChanged",this.onFilterViewChanged,this)},a.prototype.onFilterViewChanged=function(t){this.filtersModel.onFilterViewChanged(t),this.trigger("filtersChanged",this.getFiltersModelData())},a.prototype.getFiltersModelData=function(){return this.filtersModel.getFiltersData()},r.FiltersController=a},{"../models/filters-model":9,"../utils/events-system":10,"../utils/utils":11,"../views/filters-view":13}],6:[function(t,e,r){"use strict";var i={blur:{max:10,postfix:"px"},brightness:{max:10},contrast:{max:10},grayscale:{max:1},"drop-shadow":{max:50,postfix:"px",filterCss:"%CURRENT% %CURRENT% 10px black"},"hue-rotate":{max:360,postfix:"deg"},invert:{max:1},opacity:{max:1},saturate:{max:10},sepia:{max:1}};r.filtersData=i},{}],7:[function(t){"use strict";!function(){var e=t("./app").App;window.App=new e}()},{"./app":1}],8:[function(t,e,r){"use strict";var i=function(t){this.options=t,this.setData(this.options.filterData)};i.prototype.getData=function(){var t={max:this.max,current:this.current,name:this.name};return this.postfix&&(t.postfix=this.postfix),this.filterCss&&(t.filterCss=this.filterCss),t},i.prototype.setData=function(t){var e;for(e in t)this[e]=t[e]},i.prototype.setValue=function(t){this.current=t},r.FilterModel=i},{}],9:[function(t,e,r){"use strict";var i=t("../utils/utils"),s=t("./filter-model").FilterModel,n=function(t){this.options=t,this.initFiltersData=this.options.filtersData,this.filtersModels={},this.filtersData={},this.createFilters(this.initFiltersData)};n.prototype.createFilters=function(t){var e;for(e in t)this.createFilter(e,t[e])},n.prototype.createFilter=function(t,e){var r=i.cloneObj(e);r.current=0,r.name=t;var n=new s({filterData:r});this.filtersModels[t]=n,this.filtersData[t]=n.getData()},n.prototype.getFiltersData=function(){return this.filtersData},n.prototype.getFilterModel=function(t){return this.filtersModels[t]},n.prototype.updateFilterData=function(t){var e=this.filtersModels[t];this.filtersData[t]=e.getData()},n.prototype.onFilterViewChanged=function(t){var e=this.getFilterModel(t.name);e.setValue(t.value),this.updateFilterData(t.name)},r.FiltersModel=n},{"../utils/utils":11,"./filter-model":8}],10:[function(t,e,r){"use strict";var i=Array.prototype.slice,s=function(t){var e,r=!1;return function(){return r?e:(r=!0,e=t.apply(this,arguments),t=null,e)}},n=function(){this._events=void 0};n.prototype.on=function(t,e,r){if(!a(this,"on",t,[e,r])||!e)return this;this._events||(this._events={});var i=this._events[t]||(this._events[t]=[]);return i.push({callback:e,context:r,ctx:r||this}),this},n.prototype.once=function(t,e,r){if(!a(this,"once",t,[e,r])||!e)return this;var i=this,n=s(function(){i.off(t,n),e.apply(this,arguments)});return n._callback=e,this.on(t,n,r)},n.prototype.off=function(t,e,r){if(!this._events||!a(this,"off",t,[e,r]))return this;if(!t&&!e&&!r)return this._events=void 0,this;var i;if(!t)throw new Error('Argument "name" hasnt passed');i=[t];for(var s=0,n=i.length;n>s;s++){t=i[s];var o=this._events[t];if(o)if(e||r){for(var l=[],c=0,p=o.length;p>c;c++){var u=o[c];(e&&e!==u.callback&&e!==u.callback._callback||r&&r!==u.context)&&l.push(u)}l.length?this._events[t]=l:delete this._events[t]}else delete this._events[t]}return this},n.prototype.trigger=function(t){if(!this._events)return this;var e=i.call(arguments,1);if(!a(this,"trigger",t,e))return this;var r=this._events[t],s=this._events.all;return r&&this.triggerEvents(r,e),s&&this.triggerEvents(s,arguments),this},n.prototype.triggerEvents=function(t,e){var r,i=-1,s=t.length,n=e[0],o=e[1],a=e[2];switch(e.length){case 0:for(;++i<s;)(r=t[i]).callback.call(r.ctx);return;case 1:for(;++i<s;)(r=t[i]).callback.call(r.ctx,n);return;case 2:for(;++i<s;)(r=t[i]).callback.call(r.ctx,n,o);return;case 3:for(;++i<s;)(r=t[i]).callback.call(r.ctx,n,o,a);return;default:for(;++i<s;)(r=t[i]).callback.apply(r.ctx,e);return}};var o=/\s+/,a=function(t,e,r,i){if(!r)return!0;if("object"==typeof r){for(var s in r)t[e].apply(t,[s,r[s]].concat(i));return!1}if(o.test(r)){for(var n=r.split(o),a=0,l=n.length;l>a;a++)t[e].apply(t,[n[a]].concat(i));return!1}return!0};r.EventsSystem=n},{}],11:[function(t,e,r){"use strict";r.inherit=function(t,e){var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t,t.superclass_=e.prototype},r.cloneObj=function(t){var e={};return Object.keys(t).forEach(function(r){e[r]=t[r]}),e},r.getCssDeclaration=function(t,e){return t+":"+e+";"},r.filterProperty=function(){var t,e,i,s,n=document.createElement("div"),o=["-moz-filter","-webkit-filter","-ms-filter"],a="invert(0.1)";for(t=0,e=o.length;e>t;t++)if(i=o[t],n.style.cssText=r.getCssDeclaration(i,a),n.style.length){s=i;break}return s||(s="filter"),s}()},{}],12:[function(t,e,r){"use strict";var i=t("../utils/utils"),s=t("../utils/events-system").EventsSystem,n=function(t){this.options=t,this.name=this.options.filterData.name,this.container=document.createDocumentFragment(),this.createDom(this.options.filterData),this.inputEl=this.container.querySelector(".range"),this.bindEvents()};i.inherit(n,s),n.prototype.createDom=function(t){var e=document.createElement("div"),r='<div class="filter-box">                    <span class="filter-text">                        '+this.name+'                    </span>                    <div class="input-wrapper">                        <input class="range" type="range"                            min="0"                            max="'+t.max+'"                            step="'+t.max/10+'"                            value="0"                        />                    <div>                </div>';e.classList.add("filter"),e.innerHTML=r,this.container.appendChild(e)},n.prototype.bindEvents=function(){this.inputEl.addEventListener("input",this.onFilterValueChange.bind(this))},n.prototype.onFilterValueChange=function(){this.trigger("filterChanged",{name:this.name,value:Number(this.inputEl.value)})},r.FilterView=n},{"../utils/events-system":10,"../utils/utils":11}],13:[function(t,e,r){"use strict";var i=t("../utils/utils"),s=t("../utils/events-system").EventsSystem,n=t("./filter-view").FilterView,o=function(t){this.options=t,this.filtersViews={},this.initFiltersModelData=this.options.filtersModelData,this.viewWrapperEl=document.querySelector(this.options.viewWrapper),this.createFilters(this.initFiltersModelData)};i.inherit(o,s),o.prototype.createFilters=function(t){var e;for(e in t)this.createFilter(e,t[e])},o.prototype.createFilter=function(t,e){var r=i.cloneObj(e),s=new n({filterData:r});this.filtersViews[t]=s,s.on("filterChanged",this.onFilterChange,this),this.appendFilter(s)},o.prototype.appendFilter=function(t){return this.viewWrapperEl.appendChild(t.container)},o.prototype.onFilterChange=function(t){this.trigger("filterChanged",t)},r.FiltersView=o},{"../utils/events-system":10,"../utils/utils":11,"./filter-view":12}]},{},[7]);