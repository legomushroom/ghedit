/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var s in t)t.hasOwnProperty(s)&&(e[s]=t[s]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},__decorate=this&&this.__decorate||function(e,t,n,s){var o,i=arguments.length,r=i<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,n,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(i<3?o(r):i>3?o(t,n,r):o(t,n))||r);return i>3&&r&&Object.defineProperty(t,n,r),r},__param=this&&this.__param||function(e,t){return function(n,s){t(n,s,e)}};define(["require","exports","vs/nls","vs/base/common/async","vs/base/common/winjs.base","vs/base/common/lifecycle","vs/base/common/errors","vs/base/common/event","vs/base/browser/event","vs/base/browser/keyboardEvent","vs/base/common/keyCodes","vs/workbench/browser/viewlet","vs/base/browser/dom","vs/base/common/paging","vs/platform/telemetry/common/telemetry","vs/base/browser/ui/list/listPaging","vs/platform/instantiation/common/instantiation","./extensionsList","./extensions","./extensionsActions","vs/platform/extensionManagement/common/extensionManagement","./extensionsInput","vs/platform/progress/common/progress","vs/workbench/services/editor/common/editorService","vs/css!./media/extensionsViewlet"],function(e,t,n,s,o,i,r,a,c,h,l,p,u,d,v,f,y,m,x,S,g,E,w,b){"use strict";var A=function(e){function t(t,n,o,i,r,c,h){e.call(this,x.VIEWLET_ID,t),this.galleryService=n,this.extensionService=o,this.progressService=i,this.instantiationService=r,this.editorService=c,this.extensionsWorkbenchService=h,this._onSearchChange=new a.Emitter,this.onSearchChange=this._onSearchChange.event,this.disposables=[],this.searchDelayer=new s.ThrottledDelayer(500)}return __extends(t,e),t.prototype.create=function(t){var s=this;e.prototype.create.call(this,t),t.addClass("extensions-viewlet"),this.root=t.getHTMLElement();var i=u.append(this.root,u.emmet(".header"));this.searchBox=u.append(i,u.emmet("input.search-box")),this.searchBox.placeholder=n.localize("searchExtensions","Search Extensions in Marketplace"),this.disposables.push(u.addStandardDisposableListener(this.searchBox,u.EventType.FOCUS,function(){return u.addClass(s.searchBox,"synthetic-focus")})),this.disposables.push(u.addStandardDisposableListener(this.searchBox,u.EventType.BLUR,function(){return u.removeClass(s.searchBox,"synthetic-focus")})),this.extensionsBox=u.append(this.root,u.emmet(".extensions"));var r=new m.Delegate,p=this.instantiationService.createInstance(m.Renderer);this.list=new f.PagedList(this.extensionsBox,r,[p]);var d=c.domEvent(this.searchBox,"keydown"),v=a.mapEvent(d,function(e){return new h.StandardKeyboardEvent(e)}),y=a.filterEvent(v,function(e){return e.keyCode===l.KeyCode.Enter}),x=a.filterEvent(v,function(e){return e.keyCode===l.KeyCode.Escape}),S=a.filterEvent(v,function(e){return e.keyCode===l.KeyCode.UpArrow}),g=a.filterEvent(v,function(e){return e.keyCode===l.KeyCode.DownArrow}),E=a.filterEvent(v,function(e){return e.keyCode===l.KeyCode.PageUp}),w=a.filterEvent(v,function(e){return e.keyCode===l.KeyCode.PageDown});y(this.onEnter,this,this.disposables),x(this.onEscape,this,this.disposables),S(this.onUpArrow,this,this.disposables),g(this.onDownArrow,this,this.disposables),E(this.onPageUpArrow,this,this.disposables),w(this.onPageDownArrow,this,this.disposables);var b=c.domEvent(this.searchBox,"input");b(function(){return s.triggerSearch()},null,this.disposables);var A=a.filterEvent(a.mapEvent(this.list.onSelectionChange,function(e){return e.elements[0]}),function(e){return!!e});return A(this.onExtensionSelected,this,this.disposables),o.TPromise.as(null)},t.prototype.setVisible=function(t){var n=this;return e.prototype.setVisible.call(this,t).then(function(){t?(n.searchBox.focus(),n.searchBox.setSelectionRange(0,n.searchBox.value.length),n.triggerSearch(!0,!0)):n.list.model=new d.PagedModel([])})},t.prototype.focus=function(){this.searchBox.focus()},t.prototype.layout=function(e){var t=e.height,n=e.width;this.list.layout(t-38),u.toggleClass(this.root,"narrow",n<=300)},t.prototype.getOptimalWidth=function(){return 400},t.prototype.getActions=function(){return this.primaryActions||(this.primaryActions=[this.instantiationService.createInstance(S.ClearExtensionsInputAction,S.ClearExtensionsInputAction.ID,S.ClearExtensionsInputAction.LABEL,this.onSearchChange)]),this.primaryActions},t.prototype.getSecondaryActions=function(){return this.secondaryActions||(this.secondaryActions=[this.instantiationService.createInstance(S.ShowInstalledExtensionsAction,S.ShowInstalledExtensionsAction.ID,S.ShowInstalledExtensionsAction.LABEL),this.instantiationService.createInstance(S.ShowOutdatedExtensionsAction,S.ShowOutdatedExtensionsAction.ID,S.ShowOutdatedExtensionsAction.LABEL),this.instantiationService.createInstance(S.ShowRecommendedExtensionsAction,S.ShowRecommendedExtensionsAction.ID,S.ShowRecommendedExtensionsAction.LABEL),this.instantiationService.createInstance(S.ShowPopularExtensionsAction,S.ShowPopularExtensionsAction.ID,S.ShowPopularExtensionsAction.LABEL)]),this.secondaryActions},t.prototype.search=function(e,t){void 0===t&&(t=!1),this.searchBox.value=e,this.triggerSearch(t)},t.prototype.triggerSearch=function(e,t){var n=this;void 0===e&&(e=!1),void 0===t&&(t=!1);var s=this.searchBox.value;this._onSearchChange.fire(s),this.searchDelayer.trigger(function(){return n.doSearch(s,t)},e||!s?0:500)},t.prototype.doSearch=function(e,t){var n=this;void 0===e&&(e=""),void 0===t&&(t=!1);var o,i=this.progressService.show(!0);return o=e?/@outdated/i.test(e)?this.extensionsWorkbenchService.queryLocal().then(function(e){return e.filter(function(e){return e.outdated})}):/@popular/i.test(e)?this.extensionsWorkbenchService.queryGallery({sortBy:g.SortBy.InstallCount}):/@recommended/i.test(e)?this.extensionsWorkbenchService.getRecommendations():this.extensionsWorkbenchService.queryGallery({text:e}):this.extensionsWorkbenchService.queryLocal().then(function(e){return 0===e.length&&t&&n.search("@popular",!0),e}),s.always(o,function(){return i.done()}).then(function(e){return new d.PagedModel(e)}).then(function(e){n.list.model=e,n.list.scrollTop=0})},t.prototype.onExtensionSelected=function(e){this.editorService.openEditor(this.instantiationService.createInstance(E.ExtensionsInput,e)).done(null,r.onUnexpectedError)},t.prototype.onEnter=function(){(e=this.list).setSelection.apply(e,this.list.getFocus());var e},t.prototype.onEscape=function(){this.searchBox.value="",this.triggerSearch(!0)},t.prototype.onUpArrow=function(){this.list.focusPrevious(),this.list.reveal(this.list.getFocus()[0])},t.prototype.onDownArrow=function(){this.list.focusNext(),this.list.reveal(this.list.getFocus()[0])},t.prototype.onPageUpArrow=function(){this.list.focusPreviousPage(),this.list.reveal(this.list.getFocus()[0])},t.prototype.onPageDownArrow=function(){this.list.focusNextPage(),this.list.reveal(this.list.getFocus()[0])},t.prototype.dispose=function(){this.disposables=i.dispose(this.disposables),e.prototype.dispose.call(this)},t=__decorate([__param(0,v.ITelemetryService),__param(1,g.IExtensionGalleryService),__param(2,g.IExtensionManagementService),__param(3,w.IProgressService),__param(4,y.IInstantiationService),__param(5,b.IWorkbenchEditorService),__param(6,x.IExtensionsWorkbenchService)],t)}(p.Viewlet);t.ExtensionsViewlet=A});