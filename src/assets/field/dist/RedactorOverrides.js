(()=>{var t=$R.classes["image.resize"];t.prototype.init=function(t){var e=this;this.app=t,this.$doc=t.$doc,this.$win=t.$win,this.$body=t.$body,this.editor=t.editor,this.toolbar=t.toolbar,this.inspector=t.inspector,this.$target=this.toolbar.isTarget()?this.toolbar.getTargetElement():this.$body,r((function(){e.hide();var t=$(".lp-editor");t.length&&(e.$target=$R.dom(t[0]))}),(function(){e.hide(),e.$target=e.toolbar.isTarget()?e.toolbar.getTargetElement():e.$body})),this._init()},t.prototype._setResizerPosition=function(){if(this.$resizer){var t=this.toolbar.isTarget(),e=this.$target.offset(),i=t?7-e.top+this.$target.scrollTop():7,s=t?7-e.left:7,r=this.$resizableImage.offset(),o=this.$resizableImage.width(),a=this.$resizableImage.height(),h=this.$resizer.width(),n=this.$resizer.height();this.$resizer.css({top:Math.round(r.top+a-n+i)+"px",left:Math.round(r.left+o-h+s)+"px"})}},t.prototype._build=function(t){this.$target.find("#redactor-image-resizer").remove();var e=this.inspector.parse(t.target),i=this.editor.getElement();e.isComponentType("image")&&(this.$resizableBox=i,this.$resizableImage=$R.dom(e.getImageElement()),this.$resizer=$R.dom("<span>"),this.$resizer.attr("id","redactor-image-resizer"),this.$resizer.css({"z-index":100}),this.$target.append(this.$resizer),this._setResizerPosition(),this.$resizer.on("mousedown touchstart",this._set.bind(this)))},t.prototype.hide=function(){this.$target.find("#redactor-image-resizer").remove(),this.toolbar.isTarget()?this.$target.off("scroll.resizer",this.rebuild.bind(this)):$R.dom("#content-container").off("scroll.resizer",this.rebuild.bind(this))};var e=$R.classes["toolbar.fixed"];e.prototype.livePreview=!1,e.prototype.$previousFixedTarget=!1,e.prototype._init=function(){var t=this;this.$fixedTarget=this.toolbar.isTarget()?this.toolbar.getTargetElement():this.$win,this._doFixed(),this.toolbar.isTarget()&&(this.$win.on("scroll.redactor-toolbar-"+this.uuid,this._doFixed.bind(this)),this.$win.on("resize.redactor-toolbar-"+this.uuid,this._doFixed.bind(this))),this.$fixedTarget.on("scroll.redactor-toolbar-"+this.uuid,this._doFixed.bind(this)),this.$fixedTarget.on("resize.redactor-toolbar-"+this.uuid,this._doFixed.bind(this)),r((function(){var e=$(".lp-editor");e.length&&(t.livePreview=!0,t.$previousFixedTarget=t.$fixedTarget,(e=$R.dom(e[0])).on("scroll.redactor-toolbar-"+t.uuid,t._doFixed.bind(t)),t.$fixedTarget=e)}),(function(){t.livePreview=!1,t.$fixedTarget=t.$previousFixedTarget,t.$previousFixedTarget=null}))},e.prototype._doFixed=function(){var t=this.editor.getElement(),e=this.container.getElement(),i=this.toolbar.getElement(),s=this.toolbar.getWrapper();if(!this.editor.isSourceMode()&&0===e.parents().filter((function(t){return"none"===getComputedStyle(t,null).display&&t})).length){var r=t.height()<100,o=this.editor.isEmpty();if(r||o)this.reset();else{var a,h,n=i.height(),l=0;if(this.livePreview)var p=$(".lp-editor-container header.flex").length?$(".lp-editor-container header.flex").outerHeight():0,d=(h=t.offset().top-p)+t.height()-n;else p=$("body.fixed-header #header").length?$("body.fixed-header #header").outerHeight():0,d=(h=t.offset().top-this.$win.scrollTop()-p)+t.height()-n;if(a=h+20<0&&d>0,l=t.scrollTop()+p,a){var c=this.detector.isDesktop()?"fixed":"absolute";l=this.detector.isDesktop()?l:scrollOffset-boxOffset+this.opts.toolbarFixedTopOffset,this.detector.isMobile()&&(this.fixedScrollTimeout&&clearTimeout(this.fixedScrollTimeout),i.hide(),this.fixedScrollTimeout=setTimeout((function(){i.show()}),250)),s.height(n),i.addClass("redactor-toolbar-fixed"),i.css({position:c,top:l+this.opts.toolbarFixedTopOffset+"px",width:e.width()+"px"});var g=this.toolbar.getDropdown();g&&g.updatePosition(),this.app.broadcast("toolbar.fixed")}else this.reset(),this.app.broadcast("toolbar.unfixed")}}};var i=$R.services.cleaner;i.prototype.input=function(t,e,i){t=t.replace(/¤t/gi,"&current");var s=[];t=this.storeComments(t,s),t=this.encodeCode(t);var r=this.utils.buildWrapper(t);r.find("a, b, i, strong, em, img, svg, details, audio").removeAttr("onload onerror ontoggle onwheel onmouseover oncopy"),r.find("a, iframe, embed").each((function(t){var e=$R.dom(t),i=e.attr("href"),s=e.attr("src");i&&-1!==i.trim().search(/^data|javascript:/i)&&e.attr("href",""),s&&-1!==s.trim().search(/^data|javascript:/i)&&e.attr("src","")}));var o=["alt","title","src","class","width","height","srcset","usemap"];return r.find("img").each(function(t){if(t.attributes.length>0)for(var e=t.attributes,i=e.length-1;i>=0;i--){var s=-1===e[i].name.search(/^data-/)&&-1===o.indexOf(e[i].name),r="src"===e[i].name&&-1!==e[i].value.search(/^data|javascript:/i);this.opts.imageSrcData&&(r=!1),(s||r)&&t.removeAttribute(e[i].name)}}.bind(this)),t=(t=(t=this.utils.getWrapperHtml(r)).replace(/\$/g,"&#36;")).replace(/&amp;/g,"&"),t=$R.create("cleaner.figure",this.app).convert(t,this.convertRules),t=this.storeComponents(t),t=this.replaceTags(t,this.opts.replaceTags),t=this._setSpanAttr(t),t=this._setStyleCache(t),t=this.removeTags(t,this.deniedTags),t=this.opts.removeScript?this._removeScriptTag(t):this._replaceScriptTag(t),t=this.opts.removeComments?this.removeComments(t):t,t=this._isSpacedEmpty(t)?this.opts.emptyHtml:t,t=this.restoreComponents(t),t=this._cleanWrapped(t),t=this.restoreComments(t,s),e?this.paragraphize(t):t},i.prototype.output=function(t,e){return t=this.removeInvisibleSpaces(t),this.opts.breakline&&(t=(t=t.replace(/<\/(span|strong|b|i|em)><br\s?\/?><\/div>/gi,"</$1></div>")).replace(/<br\s?\/?><\/(span|strong|b|i|em)><\/div>/gi,"</$1></div>")),t=t.replace(/&#36;/g,"$"),this._isSpacedEmpty(t)||this._isParagraphEmpty(t)?"":(t=this.removeServiceTagsAndAttrs(t,e),t=this.storeComponents(t),t=this.removeSpanWithoutAttributes(t),t=this.removeFirstBlockBreaklineInHtml(t),t=this.opts.removeScript?t:this._unreplaceScriptTag(t),t=this.opts.preClass?this._setPreClass(t):t,t=this.opts.linkNofollow?this._setLinkNofollow(t):t,t=this.opts.removeNewLines?this.cleanNewLines(t):t,t=this.restoreComponents(t),t=$R.create("cleaner.figure",this.app).unconvert(t,this.unconvertRules),t=this.removeEmptyAttributes(t,["style","class","rel","title"]),t=this.cleanSpacesInPre(t),t=(t=this.tidy(t)).replace(/&amp;/g,"&"),this.opts.breakline&&(t=(t=t.replace(/<br\s?\/?>/gi,"<br>\n")).replace(/<br\s?\/?>\n+/gi,"<br>\n")),t=""===t.replace(/\n/g,"")?"":t)},$R.classes["toolbar.dropdown"].prototype.updatePosition=function(){var t=this.toolbar.isFixed(),e=this.toolbar.isTarget(),i=this.$btn.height(),s=this.$btn.width(),r=this.$btn.offset(),o="absolute",a=2;t&&(r.top=e?this.$btn.offset().top:this.$btn.position().top,o="fixed",a+=this.opts.toolbarFixedTopOffset);var h=r.left+0,n=parseFloat(this.css("width")),l=h-(this.$win.width()<h+n?n-s:0),p=r.top+i+a;if(t){var d=this.toolbar.getElement();p=d.position().top+d.height()}l=l<0?4:l,this.css({maxHeight:"",position:o,top:p+"px",left:l+"px"});var c=this.$win.height()-(p-this.$doc.scrollTop())-10;this.css("max-height",c+"px")};var s=$R.modules.contextbar;function r(t,e){Garnish.on(Craft.Preview,"open",t),Garnish.on(Craft.LivePreview,"enter",t),Garnish.on(Craft.Preview,"close",e),Garnish.on(Craft.LivePreview,"exit",e)}s.prototype.init=function(t){var e=this;this.app=t,this.opts=t.opts,this.uuid=t.uuid,this.$win=t.$win,this.$doc=t.$doc,this.$body=t.$body,this.editor=t.editor,this.toolbar=t.toolbar,this.detector=t.detector,this.livePreview=!1,this.$target=this.toolbar.isTarget()?this.toolbar.getTargetElement():this.$body,r((function(){var t=$(".lp-editor");t.length&&($(e.$contextbar.get()).appendTo(t),e.livePreview=!0)}),(function(){var t=e.toolbar.getTargetElement();t.length&&$(e.$contextbar.get(0)).appendTo(t.get(0)),e.livePreview=!1}))},s.prototype.close=function(t){if(this.$contextbar){if(t){var e=$R.dom(t.target);if(this.$el&&0!==e.closest(this.$el).length)return}this.$contextbar.hide(),this.$contextbar.removeClass("open"),this.$doc.off(".redactor.context"),this.app.broadcast("hardsync")}},$R.services.toolbar.prototype.addButton=function(t,e,i,s,r){i=i||"end";var o=$R.create("toolbar.button",this.app,t,e);if(e.observe&&(this.opts.activeButtonsObservers[t]={observe:e.observe,button:o}),this.is())if("first"===i)this.$toolbar.prepend(o);else if("after"===i)s.after(o);else if("before"===i)s.before(o);else{var a=this.opts.buttons.indexOf(t);if(!0!==r&&-1!==a)if(0===a)this.$toolbar.prepend(o);else{var h=this._findButtons();h.eq(Math.min(a,h.length)-1).after(o)}else this.$toolbar.append(o)}return o}})();
//# sourceMappingURL=RedactorOverrides.js.map