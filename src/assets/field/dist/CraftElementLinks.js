(()=>{var e;function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}var i=$.extend({},Craft.Redactor.PluginBase,(t(e={linkOptions:[],existingText:"",hack:null,allSites:{},modalState:{selectedLink:{text:null,url:null}},start:function(){},showModal:function(e,t){var n=e.refHandle;e.callback,this.saveSelection(this.app),Craft.createElementSelectorModal(e.elementType,{storageKey:"RedactorInput.LinkTo."+e.elementType,sources:e.sources,criteria:e.criteria,defaultSiteId:this.elementSiteId,autoFocusSearchBox:!1,onSelect:$.proxy((function(e){if(e.length){this.restoreSelection(this.app);var t=e[0],i=this.app.selection.getText();this.modalState.selectedLink={url:t.url+"#"+n+":"+t.id+"@"+t.siteId,text:i.length>0?i:t.label},this.app.api("module.link.open")}}),this),closeOtherModals:!1})},setLinkOptions:function(e){this.linkOptions=e},onmodal:{link:{open:function(e,t){this.hack=e.app.editor.focus,e.app.editor.focus=function(){return null},$form=$(t.nodes),this.modalState.selectedLink.url&&$form.find("input[name=url]").val(this.modalState.selectedLink.url),this.modalState.selectedLink.text&&$form.find("input[name=text]").val(this.modalState.selectedLink.text),this.modalState.selectedLink={text:null,url:null};var i,r,l=$form.find("input[name=url]").val();if(l.match(/#(category|entry|product):\d+/)){var a=this.allSites,o=0;l.split("@").length>1&&(o=parseInt(l.split("@").pop(),10));var s=$('<select id="modal-site-selector"></select>').on("change",function(e){var t=$form.find("input[name=url]").val(),n=parseInt($(e.currentTarget).val(),10);if(t.match(/.*(@\d+)$/)){var i=t.split("@");i.pop(),t=i.join("@")}n&&(t+="@"+n),$form.find("input[name=url]").val(t)}.bind(this)),c=0===o?' selected="selected"':"";s.append('<option value="0"'.concat(c,">Multisite</option>"));for(var u=0,d=Object.entries(a);u<d.length;u++){var p=(i=d[u],r=2,function(e){if(Array.isArray(e))return e}(i)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var i,r,l=[],a=!0,o=!1;try{for(n=n.call(e);!(a=(i=n.next()).done)&&(l.push(i.value),!t||l.length!==t);a=!0);}catch(e){o=!0,r=e}finally{try{a||null==n.return||n.return()}finally{if(o)throw r}}return l}}(i,r)||function(e,t){if(e){if("string"==typeof e)return n(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?n(e,t):void 0}}(i,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}());siteId=p[0],siteName=p[1];var f=o===parseInt(siteId,10)?' selected="selected"':"";s.append('<option value="'.concat(siteId,'"').concat(f,">").concat(siteName,"</option>"))}var m=$('<div class="form-item form-item-site"><label for="modal-site-selector">Site</label></div>').append(s);$(t.nodes[0]).append(m)}},close:function(e){e.app.editor.focus=this.hack,this.hack=null}}}},"setLinkOptions",(function(e){var t=this.app.toolbar.getButton("link"),n=t.getDropdown().items,i={},r=0;for(var l in e)l=e[l],i["custom"+ ++r]={title:l.optionTitle,api:"plugin.craftElementLinks.showModal",args:{elementType:l.elementType,refHandle:l.refHandle,sources:l.sources,criteria:l.criteria}};t.setDropdown($.extend(i,n))})),t(e,"setAllSites",(function(e){this.allSites=e})),e));Redactor.add("plugin","craftElementLinks",i)})();
//# sourceMappingURL=CraftElementLinks.js.map