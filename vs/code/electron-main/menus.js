/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate=this&&this.__decorate||function(e,n,t,o){var i,c=arguments.length,a=c<3?n:null===o?o=Object.getOwnPropertyDescriptor(n,t):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,n,t,o);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(a=(c<3?i(a):c>3?i(n,t,a):i(n,t))||a);return c>3&&a&&Object.defineProperty(n,t,a),a},__param=this&&this.__param||function(e,n){return function(t,o){n(t,o,e)}};define(["require","exports","vs/nls","os","vs/base/common/platform","vs/base/common/arrays","vs/code/electron-main/env","electron","vs/code/electron-main/windows","vs/code/electron-main/storage","vs/code/electron-main/update-manager","vs/base/common/keyCodes","vs/platform/product","vs/platform/package"],function(e,n,t,o,i,c,a,r,l,s,m,u,d,p){"use strict";function h(e,n,t,i,c){var a=o.type()+" "+o.arch()+" "+o.release(),r=e.indexOf("?")===-1?"?":"&",l=encodeURIComponent("- VSCode Version: "+n+" "+t+" ("+(d["default"].commit||"Commit unknown")+", "+(d["default"].date||"Date unknown")+")\n- OS Version: "+a+"\n\nSteps to Reproduce:\n\n1.\n2.");return""+e+r+"body="+l}function w(){return new r.MenuItem({type:"separator"})}function v(e){return i.isMacintosh?e.replace(/\(&&\w\)|&&/g,""):e.replace(/&&/g,"&")}n.generateNewIssueUrl=h;var g=function(){function e(n,t,o,i){this.storageService=n,this.updateService=t,this.windowsService=o,this.envService=i,this.actionIdKeybindingRequests=[],this.mapResolvedKeybindingToActionId=Object.create(null),this.mapLastKnownKeybindingToActionId=this.storageService.getItem(e.lastKnownKeybindingsMapStorageKey)||Object.create(null)}return e.prototype.ready=function(){this.registerListeners(),this.install()},e.prototype.registerListeners=function(){var n=this;r.app.on("will-quit",function(){n.isQuitting=!0}),this.windowsService.onOpen(function(e){return n.onOpen(e)}),this.windowsService.onClose(function(e){return n.onClose(n.windowsService.getWindowCount())}),this.windowsService.onReady(function(e){return n.resolveKeybindings(e)}),r.ipcMain.on("vscode:keybindingsResolved",function(t,o){var i=[];try{i=JSON.parse(o)}catch(c){}var a=!1;i.forEach(function(e){var t=new u.Keybinding(e.binding)._toElectronAccelerator();t&&(n.mapResolvedKeybindingToActionId[e.id]=t,n.mapLastKnownKeybindingToActionId[e.id]!==t&&(a=!0))}),Object.keys(n.mapLastKnownKeybindingToActionId).length!==Object.keys(n.mapResolvedKeybindingToActionId).length&&(a=!0),a&&(n.storageService.setItem(e.lastKnownKeybindingsMapStorageKey,n.mapResolvedKeybindingToActionId),n.mapLastKnownKeybindingToActionId=n.mapResolvedKeybindingToActionId,n.updateMenu())}),this.updateService.on("change",function(){return n.updateMenu()})},e.prototype.resolveKeybindings=function(e){this.keybindingsResolved||(this.keybindingsResolved=!0,this.actionIdKeybindingRequests.length&&e.send("vscode:resolveKeybindings",JSON.stringify(this.actionIdKeybindingRequests)))},e.prototype.updateMenu=function(){var e=this;this.isQuitting||setTimeout(function(){e.isQuitting||e.install()},10)},e.prototype.onOpen=function(e){this.addToOpenedPathsList(e.filePath||e.workspacePath,!!e.filePath),this.updateMenu()},e.prototype.onClose=function(e){0===e&&i.isMacintosh&&this.updateMenu()},e.prototype.install=function(){var e,n=this,o=new r.Menu;if(i.isMacintosh){var c=new r.Menu;e=new r.MenuItem({label:this.envService.product.nameShort,submenu:c}),this.setMacApplicationMenu(c)}var a=new r.Menu,l=new r.MenuItem({label:v(t.localize({key:"mFile",comment:["&& denotes a mnemonic"]},"&&File")),submenu:a});this.setFileMenu(a);var s=new r.Menu,m=new r.MenuItem({label:v(t.localize({key:"mEdit",comment:["&& denotes a mnemonic"]},"&&Edit")),submenu:s});this.setEditMenu(s);var u=new r.Menu,d=new r.MenuItem({label:v(t.localize({key:"mView",comment:["&& denotes a mnemonic"]},"&&View")),submenu:u});this.setViewMenu(u);var p=new r.Menu,h=new r.MenuItem({label:v(t.localize({key:"mGoto",comment:["&& denotes a mnemonic"]},"&&Go")),submenu:p});this.setGotoMenu(p);var w;if(i.isMacintosh){var g=new r.Menu;w=new r.MenuItem({label:v(t.localize("mWindow","Window")),submenu:g,role:"window"}),this.setMacWindowMenu(g)}var b=new r.Menu,M=new r.MenuItem({label:v(t.localize({key:"mHelp",comment:["&& denotes a mnemonic"]},"&&Help")),submenu:b,role:"help"});if(this.setHelpMenu(b),e&&o.append(e),o.append(l),o.append(m),o.append(d),o.append(h),w&&o.append(w),o.append(M),r.Menu.setApplicationMenu(o),i.isMacintosh&&!this.appMenuInstalled){this.appMenuInstalled=!0;var k=new r.Menu;k.append(new r.MenuItem({label:v(t.localize({key:"miNewWindow",comment:["&& denotes a mnemonic"]},"&&New Window")),click:function(){return n.windowsService.openNewWindow()}})),r.app.dock.setMenu(k)}},e.prototype.addToOpenedPathsList=function(n,t){if(n){var o=this.getOpenedPathsList();t?(o.files.unshift(n),o.files=c.distinct(o.files,function(e){return i.isLinux?e:e.toLowerCase()})):(o.folders.unshift(n),o.folders=c.distinct(o.folders,function(e){return i.isLinux?e:e.toLowerCase()})),o.folders=o.folders.slice(0,e.MAX_RECENT_ENTRIES),o.files=o.files.slice(0,e.MAX_RECENT_ENTRIES),this.storageService.setItem(l.WindowsManager.openedPathsListStorageKey,o)}},e.prototype.removeFromOpenedPathsList=function(e){var n=this.getOpenedPathsList(),t=n.files.indexOf(e);t>=0&&n.files.splice(t,1),t=n.folders.indexOf(e),t>=0&&n.folders.splice(t,1),this.storageService.setItem(l.WindowsManager.openedPathsListStorageKey,n)},e.prototype.clearOpenedPathsList=function(){this.storageService.setItem(l.WindowsManager.openedPathsListStorageKey,{folders:[],files:[]}),r.app.clearRecentDocuments(),this.updateMenu()},e.prototype.getOpenedPathsList=function(){var e=this.storageService.getItem(l.WindowsManager.openedPathsListStorageKey);return e||(e={folders:[],files:[]}),e},e.prototype.setMacApplicationMenu=function(e){var n=this,o=new r.MenuItem({label:t.localize("mAbout","About {0}",this.envService.product.nameLong),role:"about"}),i=this.getUpdateMenuItems(),c=this.getPreferencesMenu(),a=new r.MenuItem({label:t.localize("mHide","Hide {0}",this.envService.product.nameLong),role:"hide",accelerator:"Command+H"}),l=new r.MenuItem({label:t.localize("mHideOthers","Hide Others"),role:"hideothers",accelerator:"Command+Alt+H"}),s=new r.MenuItem({label:t.localize("mShowAll","Show All"),role:"unhide"}),m=new r.MenuItem({label:t.localize("miQuit","Quit {0}",this.envService.product.nameLong),click:function(){return n.quit()},accelerator:"Command+Q"}),u=[o];u.push.apply(u,i),u.push.apply(u,[w(),c,w(),a,l,s,w(),m]),u.forEach(function(n){return e.append(n)})},e.prototype.setFileMenu=function(e){var n,o=this,a=0===this.windowsService.getWindowCount();n=a?new r.MenuItem({label:v(t.localize({key:"miNewFile",comment:["&& denotes a mnemonic"]},"&&New File")),accelerator:this.getAccelerator("workbench.action.files.newUntitledFile"),click:function(){return o.windowsService.openNewWindow()}}):this.createMenuItem(t.localize({key:"miNewFile",comment:["&& denotes a mnemonic"]},"&&New File"),"workbench.action.files.newUntitledFile");var l,s=new r.MenuItem({label:v(t.localize({key:"miOpen",comment:["&& denotes a mnemonic"]},"&&Open...")),accelerator:this.getAccelerator("workbench.action.files.openFileFolder"),click:function(){return o.windowsService.openFileFolderPicker()}}),m=new r.MenuItem({label:v(t.localize({key:"miOpenFolder",comment:["&& denotes a mnemonic"]},"Open &&Folder...")),accelerator:this.getAccelerator("workbench.action.files.openFolder"),click:function(){return o.windowsService.openFolderPicker()}});l=a?new r.MenuItem({label:v(t.localize({key:"miOpenFile",comment:["&& denotes a mnemonic"]},"&&Open File...")),accelerator:this.getAccelerator("workbench.action.files.openFile"),click:function(){return o.windowsService.openFilePicker()}}):this.createMenuItem(t.localize({key:"miOpenFile",comment:["&& denotes a mnemonic"]},"&&Open File..."),"workbench.action.files.openFile");var u=new r.Menu;this.setOpenRecentMenu(u);var d=new r.MenuItem({label:v(t.localize({key:"miOpenRecent",comment:["&& denotes a mnemonic"]},"Open &&Recent")),submenu:u,enabled:u.items.length>0}),p=this.createMenuItem(t.localize({key:"miSave",comment:["&& denotes a mnemonic"]},"&&Save"),"workbench.action.files.save",this.windowsService.getWindowCount()>0),h=this.createMenuItem(t.localize({key:"miSaveAs",comment:["&& denotes a mnemonic"]},"Save &&As..."),"workbench.action.files.saveAs",this.windowsService.getWindowCount()>0),g=this.createMenuItem(t.localize({key:"miSaveAll",comment:["&& denotes a mnemonic"]},"Save A&&ll"),"workbench.action.files.saveAll",this.windowsService.getWindowCount()>0),b=this.getPreferencesMenu(),M=new r.MenuItem({label:v(t.localize({key:"miNewWindow",comment:["&& denotes a mnemonic"]},"&&New Window")),accelerator:this.getAccelerator("workbench.action.newWindow"),click:function(){return o.windowsService.openNewWindow()}}),k=this.createMenuItem(t.localize({key:"miRevert",comment:["&& denotes a mnemonic"]},"Revert F&&ile"),"workbench.action.files.revert",this.windowsService.getWindowCount()>0),y=new r.MenuItem({label:v(t.localize({key:"miCloseWindow",comment:["&& denotes a mnemonic"]},"Close &&Window")),accelerator:this.getAccelerator("workbench.action.closeWindow"),click:function(){return o.windowsService.getLastActiveWindow().win.close()},enabled:this.windowsService.getWindowCount()>0}),f=this.createMenuItem(t.localize({key:"miCloseFolder",comment:["&& denotes a mnemonic"]},"Close &&Folder"),"workbench.action.closeFolder"),I=this.createMenuItem(t.localize({key:"miCloseEditor",comment:["&& denotes a mnemonic"]},"Close &&Editor"),"workbench.action.closeActiveEditor"),S=this.createMenuItem(t.localize({key:"miExit",comment:["&& denotes a mnemonic"]},"E&&xit"),function(){return o.quit()});c.coalesce([n,M,w(),i.isMacintosh?s:null,i.isMacintosh?null:l,i.isMacintosh?null:m,d,w(),p,h,g,w(),i.isMacintosh?null:b,i.isMacintosh?null:w(),k,I,f,i.isMacintosh?null:y,i.isMacintosh?null:w(),i.isMacintosh?null:S]).forEach(function(n){return e.append(n)})},e.prototype.getPreferencesMenu=function(){var e=this.createMenuItem(t.localize({key:"miOpenSettings",comment:["&& denotes a mnemonic"]},"&&User Settings"),"workbench.action.openGlobalSettings"),n=this.createMenuItem(t.localize({key:"miOpenWorkspaceSettings",comment:["&& denotes a mnemonic"]},"&&Workspace Settings"),"workbench.action.openWorkspaceSettings"),o=this.createMenuItem(t.localize({key:"miOpenKeymap",comment:["&& denotes a mnemonic"]},"&&Keyboard Shortcuts"),"workbench.action.openGlobalKeybindings"),i=this.createMenuItem(t.localize({key:"miOpenSnippets",comment:["&& denotes a mnemonic"]},"User &&Snippets"),"workbench.action.openSnippets"),c=this.createMenuItem(t.localize({key:"miSelectTheme",comment:["&& denotes a mnemonic"]},"&&Color Theme"),"workbench.action.selectTheme"),a=new r.Menu;return a.append(e),a.append(n),a.append(w()),a.append(o),a.append(w()),a.append(i),a.append(w()),a.append(c),new r.MenuItem({label:v(t.localize({key:"miPreferences",comment:["&& denotes a mnemonic"]},"&&Preferences")),submenu:a})},e.prototype.quit=function(){var e=this,n=this.windowsService.getFocusedWindow();n&&n.isPluginDevelopmentHost&&this.windowsService.getWindowCount()>1?n.win.close():setTimeout(function(){e.isQuitting=!0,r.app.quit()},10)},e.prototype.setOpenRecentMenu=function(n){var o=this;n.append(this.createMenuItem(t.localize({key:"miReopenClosedEditor",comment:["&& denotes a mnemonic"]},"&&Reopen Closed Editor"),"workbench.action.reopenClosedEditor"));var i=this.getOpenedPathsList();i.folders.length>0&&(n.append(w()),i.folders.forEach(function(t,i){i<e.MAX_RECENT_ENTRIES&&n.append(o.createOpenRecentMenuItem(t))}));var c=i.files;c.length>0&&(n.append(w()),c.forEach(function(t,i){i<e.MAX_RECENT_ENTRIES&&n.append(o.createOpenRecentMenuItem(t))})),(i.folders.length||c.length)&&(n.append(w()),n.append(new r.MenuItem({label:v(t.localize({key:"miClearItems",comment:["&& denotes a mnemonic"]},"&&Clear Items")),click:function(){return o.clearOpenedPathsList()}})))},e.prototype.createOpenRecentMenuItem=function(e){var n=this;return new r.MenuItem({label:e,click:function(){var t=!!n.windowsService.open({cli:n.envService.cliArgs,pathsToOpen:[e]});t||(n.removeFromOpenedPathsList(e),n.updateMenu())}})},e.prototype.createRoleMenuItem=function(e,n,t){var o={label:v(e),accelerator:this.getAccelerator(n),role:t,enabled:!0};return new r.MenuItem(o)},e.prototype.setEditMenu=function(e){var n,o,c,a,r,l;i.isMacintosh?(n=this.createDevToolsAwareMenuItem(t.localize({key:"miUndo",comment:["&& denotes a mnemonic"]},"&&Undo"),"undo",function(e){return e.undo()}),o=this.createDevToolsAwareMenuItem(t.localize({key:"miRedo",comment:["&& denotes a mnemonic"]},"&&Redo"),"redo",function(e){return e.redo()}),c=this.createRoleMenuItem(t.localize({key:"miCut",comment:["&& denotes a mnemonic"]},"&&Cut"),"editor.action.clipboardCutAction","cut"),a=this.createRoleMenuItem(t.localize({key:"miCopy",comment:["&& denotes a mnemonic"]},"C&&opy"),"editor.action.clipboardCopyAction","copy"),r=this.createRoleMenuItem(t.localize({key:"miPaste",comment:["&& denotes a mnemonic"]},"&&Paste"),"editor.action.clipboardPasteAction","paste"),l=this.createDevToolsAwareMenuItem(t.localize({key:"miSelectAll",comment:["&& denotes a mnemonic"]},"&&Select All"),"editor.action.selectAll",function(e){return e.selectAll()})):(n=this.createMenuItem(t.localize({key:"miUndo",comment:["&& denotes a mnemonic"]},"&&Undo"),"undo"),o=this.createMenuItem(t.localize({key:"miRedo",comment:["&& denotes a mnemonic"]},"&&Redo"),"redo"),c=this.createMenuItem(t.localize({key:"miCut",comment:["&& denotes a mnemonic"]},"&&Cut"),"editor.action.clipboardCutAction"),a=this.createMenuItem(t.localize({key:"miCopy",comment:["&& denotes a mnemonic"]},"C&&opy"),"editor.action.clipboardCopyAction"),r=this.createMenuItem(t.localize({key:"miPaste",comment:["&& denotes a mnemonic"]},"&&Paste"),"editor.action.clipboardPasteAction"),l=this.createMenuItem(t.localize({key:"miSelectAll",comment:["&& denotes a mnemonic"]},"&&Select All"),"editor.action.selectAll"));var s=this.createMenuItem(t.localize({key:"miFind",comment:["&& denotes a mnemonic"]},"&&Find"),"actions.find"),m=this.createMenuItem(t.localize({key:"miReplace",comment:["&& denotes a mnemonic"]},"&&Replace"),"editor.action.startFindReplaceAction"),u=this.createMenuItem(t.localize({key:"miFindInFiles",comment:["&& denotes a mnemonic"]},"Find &&in Files"),"workbench.view.search"),d=this.createMenuItem(t.localize({key:"miReplaceInFiles",comment:["&& denotes a mnemonic"]},"Replace &&in Files"),"workbench.action.replaceInFiles");[n,o,w(),c,a,r,l,w(),s,m,w(),u,d].forEach(function(n){return e.append(n)})},e.prototype.setViewMenu=function(e){var n=this,o=this.createMenuItem(t.localize({key:"miViewExplorer",comment:["&& denotes a mnemonic"]},"&&Explorer"),"workbench.view.explorer"),a=this.createMenuItem(t.localize({key:"miViewSearch",comment:["&& denotes a mnemonic"]},"&&Search"),"workbench.view.search"),l=this.createMenuItem(t.localize({key:"miViewGit",comment:["&& denotes a mnemonic"]},"&&Git"),"workbench.view.git"),s=this.createMenuItem(t.localize({key:"miViewDebug",comment:["&& denotes a mnemonic"]},"&&Debug"),"workbench.view.debug"),m=this.createMenuItem(t.localize({key:"miViewExtensions",comment:["&& denotes a mnemonic"]},"E&&xtensions"),"workbench.view.extensions"),u=this.createMenuItem(t.localize({key:"miToggleOutput",comment:["&& denotes a mnemonic"]},"&&Output"),"workbench.action.output.toggleOutput"),d=this.createMenuItem(t.localize({key:"miToggleDebugConsole",comment:["&& denotes a mnemonic"]},"De&&bug Console"),"workbench.debug.action.toggleRepl"),p=this.createMenuItem(t.localize({key:"miToggleIntegratedTerminal",comment:["&& denotes a mnemonic"]},"&&Integrated Terminal"),"workbench.action.terminal.toggleTerminal"),h=this.createMenuItem(t.localize({key:"miMarker",comment:["&& denotes a mnemonic"]},"&&Problems"),"workbench.actions.view.problems"),g=this.createMenuItem(t.localize({key:"miCommandPalette",comment:["&& denotes a mnemonic"]},"&&Command Palette..."),"workbench.action.showCommands"),b=new r.MenuItem({label:v(t.localize({key:"miToggleFullScreen",comment:["&& denotes a mnemonic"]},"Toggle &&Full Screen")),accelerator:this.getAccelerator("workbench.action.toggleFullScreen"),click:function(){return n.windowsService.getLastActiveWindow().toggleFullScreen()},enabled:this.windowsService.getWindowCount()>0}),M=this.createMenuItem(t.localize({key:"miToggleMenuBar",comment:["&& denotes a mnemonic"]},"Toggle Menu &&Bar"),"workbench.action.toggleMenuBar"),k=this.createMenuItem(t.localize({key:"miSplitEditor",comment:["&& denotes a mnemonic"]},"Split &&Editor"),"workbench.action.splitEditor"),y=this.createMenuItem(t.localize({key:"miToggleSidebar",comment:["&& denotes a mnemonic"]},"&&Toggle Side Bar"),"workbench.action.toggleSidebarVisibility"),f=this.createMenuItem(t.localize({key:"miMoveSidebar",comment:["&& denotes a mnemonic"]},"&&Move Side Bar"),"workbench.action.toggleSidebarPosition"),I=this.createMenuItem(t.localize({key:"miTogglePanel",comment:["&& denotes a mnemonic"]},"Toggle &&Panel"),"workbench.action.togglePanel"),S=this.createMenuItem(t.localize({key:"miToggleStatusbar",comment:["&& denotes a mnemonic"]},"&&Toggle Status Bar"),"workbench.action.toggleStatusbarVisibility"),z=this.createMenuItem(t.localize({key:"miToggleWordWrap",comment:["&& denotes a mnemonic"]},"Toggle &&Word Wrap"),"editor.action.toggleWordWrap"),U=this.createMenuItem(t.localize({key:"miToggleRenderWhitespace",comment:["&& denotes a mnemonic"]},"Toggle &&Render Whitespace"),"editor.action.toggleRenderWhitespace"),A=this.createMenuItem(t.localize({key:"miToggleRenderControlCharacters",comment:["&& denotes a mnemonic"]},"Toggle &&Control Characters"),"editor.action.toggleRenderControlCharacter"),T=this.createMenuItem(t.localize({key:"miZoomIn",comment:["&& denotes a mnemonic"]},"&&Zoom In"),"workbench.action.zoomIn"),C=this.createMenuItem(t.localize({key:"miZoomOut",comment:["&& denotes a mnemonic"]},"Zoom O&&ut"),"workbench.action.zoomOut"),R=this.createMenuItem(t.localize({key:"miZoomReset",comment:["&& denotes a mnemonic"]},"&&Reset Zoom"),"workbench.action.zoomReset");c.coalesce([o,a,l,s,m,w(),u,h,d,p,w(),g,w(),b,i.isWindows||i.isLinux?M:void 0,w(),k,f,y,I,S,w(),z,U,A,w(),T,C,R]).forEach(function(n){return e.append(n)})},e.prototype.setGotoMenu=function(e){var n=this.createMenuItem(t.localize({key:"miBack",comment:["&& denotes a mnemonic"]},"&&Back"),"workbench.action.navigateBack"),o=this.createMenuItem(t.localize({key:"miForward",comment:["&& denotes a mnemonic"]},"&&Forward"),"workbench.action.navigateForward"),i=new r.Menu,c=this.createMenuItem(t.localize({key:"miNextEditor",comment:["&& denotes a mnemonic"]},"&&Next Editor"),"workbench.action.nextEditor"),a=this.createMenuItem(t.localize({key:"miPreviousEditor",comment:["&& denotes a mnemonic"]},"&&Previous Editor"),"workbench.action.previousEditor"),l=this.createMenuItem(t.localize({key:"miNextEditorInGroup",comment:["&& denotes a mnemonic"]},"&&Next Used Editor in Group"),"workbench.action.openNextRecentlyUsedEditorInGroup"),s=this.createMenuItem(t.localize({key:"miPreviousEditorInGroup",comment:["&& denotes a mnemonic"]},"&&Previous Used Editor in Group"),"workbench.action.openPreviousRecentlyUsedEditorInGroup");[c,a,w(),l,s].forEach(function(e){return i.append(e)});var m=new r.MenuItem({label:v(t.localize({key:"miSwitchEditor",comment:["&& denotes a mnemonic"]},"Switch &&Editor")),submenu:i,enabled:!0}),u=new r.Menu,d=this.createMenuItem(t.localize({key:"miFocusFirstGroup",comment:["&& denotes a mnemonic"]},"&&Left Group"),"workbench.action.focusFirstEditorGroup"),p=this.createMenuItem(t.localize({key:"miFocusSecondGroup",comment:["&& denotes a mnemonic"]},"&&Side Group"),"workbench.action.focusSecondEditorGroup"),h=this.createMenuItem(t.localize({key:"miFocusThirdGroup",comment:["&& denotes a mnemonic"]},"&&Right Group"),"workbench.action.focusThirdEditorGroup"),g=this.createMenuItem(t.localize({key:"miNextGroup",comment:["&& denotes a mnemonic"]},"&&Next Group"),"workbench.action.focusNextGroup"),b=this.createMenuItem(t.localize({key:"miPreviousGroup",comment:["&& denotes a mnemonic"]},"&&Previous Group"),"workbench.action.focusPreviousGroup");[d,p,h,w(),g,b].forEach(function(e){return u.append(e)});var M=new r.MenuItem({label:v(t.localize({key:"miSwitchGroup",comment:["&& denotes a mnemonic"]},"Switch &&Group")),submenu:u,enabled:!0}),k=this.createMenuItem(t.localize({key:"miGotoFile",comment:["&& denotes a mnemonic"]},"Go to &&File..."),"workbench.action.quickOpen"),y=this.createMenuItem(t.localize({key:"miGotoSymbol",comment:["&& denotes a mnemonic"]},"Go to &&Symbol..."),"workbench.action.gotoSymbol"),f=this.createMenuItem(t.localize({key:"miGotoDefinition",comment:["&& denotes a mnemonic"]},"Go to &&Definition"),"editor.action.goToDeclaration"),I=this.createMenuItem(t.localize({key:"miGotoLine",comment:["&& denotes a mnemonic"]},"Go to &&Line..."),"workbench.action.gotoLine");[n,o,w(),m,M,w(),k,y,f,I].forEach(function(n){return e.append(n)})},e.prototype.setMacWindowMenu=function(e){var n=new r.MenuItem({label:t.localize("mMinimize","Minimize"),role:"minimize",accelerator:"Command+M",enabled:this.windowsService.getWindowCount()>0}),o=new r.MenuItem({label:t.localize("mClose","Close"),role:"close",accelerator:"Command+W",enabled:this.windowsService.getWindowCount()>0}),i=new r.MenuItem({label:t.localize("mBringToFront","Bring All to Front"),role:"front",enabled:this.windowsService.getWindowCount()>0});[n,o,w(),i].forEach(function(n){return e.append(n)})},e.prototype.toggleDevTools=function(){var e=this.windowsService.getFocusedWindow();e&&e.win&&e.win.webContents.toggleDevTools()},e.prototype.setHelpMenu=function(e){var n=this,o=new r.MenuItem({label:v(t.localize({key:"miToggleDevTools",comment:["&& denotes a mnemonic"]},"&&Toggle Developer Tools")),accelerator:this.getAccelerator("workbench.action.toggleDevTools"),click:function(){return n.toggleDevTools()},enabled:this.windowsService.getWindowCount()>0}),a=h(d["default"].reportIssueUrl,p["default"].name,p["default"].version,d["default"].commit,d["default"].date);if(c.coalesce([this.envService.product.documentationUrl?new r.MenuItem({label:v(t.localize({key:"miDocumentation",comment:["&& denotes a mnemonic"]},"&&Documentation")),click:function(){return n.openUrl(n.envService.product.documentationUrl,"openDocumentationUrl")}}):null,this.envService.product.releaseNotesUrl?new r.MenuItem({label:v(t.localize({key:"miReleaseNotes",comment:["&& denotes a mnemonic"]},"&&Release Notes")),click:function(){return n.openUrl(n.envService.product.releaseNotesUrl,"openReleaseNotesUrl")}}):null,this.envService.product.documentationUrl||this.envService.product.releaseNotesUrl?w():null,this.envService.product.twitterUrl?new r.MenuItem({label:v(t.localize({key:"miTwitter",comment:["&& denotes a mnemonic"]},"&&Join us on Twitter")),click:function(){return n.openUrl(n.envService.product.twitterUrl,"openTwitterUrl")}}):null,this.envService.product.requestFeatureUrl?new r.MenuItem({label:v(t.localize({key:"miUserVoice",comment:["&& denotes a mnemonic"]},"&&Request Features")),click:function(){return n.openUrl(n.envService.product.requestFeatureUrl,"openUserVoiceUrl")}}):null,this.envService.product.reportIssueUrl?new r.MenuItem({label:v(t.localize({key:"miReportIssues",comment:["&& denotes a mnemonic"]},"Report &&Issues")),click:function(){return n.openUrl(a,"openReportIssues")}}):null,this.envService.product.twitterUrl||this.envService.product.requestFeatureUrl||this.envService.product.reportIssueUrl?w():null,this.envService.product.licenseUrl?new r.MenuItem({label:v(t.localize({key:"miLicense",comment:["&& denotes a mnemonic"]},"&&View License")),click:function(){if(i.language){var e=n.envService.product.licenseUrl.indexOf("?")>0?"&":"?";n.openUrl(""+n.envService.product.licenseUrl+e+"lang="+i.language,"openLicenseUrl")}else n.openUrl(n.envService.product.licenseUrl,"openLicenseUrl")}}):null,this.envService.product.privacyStatementUrl?new r.MenuItem({label:v(t.localize({key:"miPrivacyStatement",comment:["&& denotes a mnemonic"]},"&&Privacy Statement")),click:function(){if(i.language){var e=n.envService.product.licenseUrl.indexOf("?")>0?"&":"?";n.openUrl(""+n.envService.product.privacyStatementUrl+e+"lang="+i.language,"openPrivacyStatement")}else n.openUrl(n.envService.product.privacyStatementUrl,"openPrivacyStatement")}}):null,this.envService.product.licenseUrl||this.envService.product.privacyStatementUrl?w():null,o]).forEach(function(n){return e.append(n)}),!i.isMacintosh){var l=this.getUpdateMenuItems();l.length&&(e.append(w()),l.forEach(function(n){return e.append(n)})),e.append(w()),e.append(new r.MenuItem({label:v(t.localize({key:"miAbout",comment:["&& denotes a mnemonic"]},"&&About")),click:function(){return n.openAboutDialog()}}))}},e.prototype.getUpdateMenuItems=function(){var e=this;switch(this.updateService.state){case m.State.Uninitialized:return[];case m.State.UpdateDownloaded:var n=this.updateService.availableUpdate;return[new r.MenuItem({label:t.localize("miRestartToUpdate","Restart To Update..."),click:function(){e.reportMenuActionTelemetry("RestartToUpdate"),n.quitAndUpdate()}})];case m.State.CheckingForUpdate:return[new r.MenuItem({label:t.localize("miCheckingForUpdates","Checking For Updates..."),enabled:!1})];case m.State.UpdateAvailable:if(i.isLinux){var o=this.updateService.availableUpdate;return[new r.MenuItem({label:t.localize("miDownloadUpdate","Download Available Update"),click:function(){o.quitAndUpdate()}})]}var c=i.isWindows?t.localize("miDownloadingUpdate","Downloading Update..."):t.localize("miInstallingUpdate","Installing Update...");return[new r.MenuItem({label:c,enabled:!1})];default:var a=[new r.MenuItem({label:t.localize("miCheckForUpdates","Check For Updates..."),click:function(){return setTimeout(function(){e.reportMenuActionTelemetry("CheckForUpdate"),e.updateService.checkForUpdates(!0)},0)}})];return a}},e.prototype.createMenuItem=function(e,n,t){var o,i=this,c=v(e),a="function"==typeof n?n:function(){return i.windowsService.sendToFocused("vscode:runAction",n)},l="boolean"==typeof t?t:this.windowsService.getWindowCount()>0;"string"==typeof n&&(o=n);var s={label:c,accelerator:this.getAccelerator(o),click:a,enabled:l};return new r.MenuItem(s)},e.prototype.createDevToolsAwareMenuItem=function(e,n,t){var o=this;return new r.MenuItem({label:v(e),accelerator:this.getAccelerator(n),enabled:this.windowsService.getWindowCount()>0,click:function(){var e=o.windowsService.getFocusedWindow();e&&(e.win.webContents.isDevToolsFocused()?t(e.win.webContents.devToolsWebContents):o.windowsService.sendToFocused("vscode:runAction",n))}})},e.prototype.getAccelerator=function(e){if(e){var n=this.mapResolvedKeybindingToActionId[e];if(n)return n;this.keybindingsResolved||this.actionIdKeybindingRequests.push(e);var t=this.mapLastKnownKeybindingToActionId[e];return t}},e.prototype.openAboutDialog=function(){var e=this.windowsService.getFocusedWindow()||this.windowsService.getLastActiveWindow();r.dialog.showMessageBox(e&&e.win,{title:this.envService.product.nameLong,type:"info",message:this.envService.product.nameLong,detail:t.localize("aboutDetail","\nVersion {0}\nCommit {1}\nDate {2}\nShell {3}\nRenderer {4}\nNode {5}",r.app.getVersion(),this.envService.product.commit||"Unknown",this.envService.product.date||"Unknown",process.versions.electron,process.versions.chrome,process.versions.node),buttons:[t.localize("okButton","OK")],noLink:!0},function(e){return null}),this.reportMenuActionTelemetry("showAboutDialog")},e.prototype.openUrl=function(e,n){r.shell.openExternal(e),this.reportMenuActionTelemetry(n)},e.prototype.reportMenuActionTelemetry=function(e){this.windowsService.sendToFocused("vscode:telemetry",{eventName:"workbenchActionExecuted",data:{id:e,from:"menu"}})},e.lastKnownKeybindingsMapStorageKey="lastKnownKeybindings",e.MAX_RECENT_ENTRIES=10,e=__decorate([__param(0,s.IStorageService),__param(1,m.IUpdateService),__param(2,l.IWindowsService),__param(3,a.IEnvironmentService)],e)}();n.VSCodeMenu=g});