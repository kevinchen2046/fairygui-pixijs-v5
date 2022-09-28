var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./LoadingView", "./WindowA", "./WindowB", "./WindowWait"], function (require, exports, LoadingView_1, WindowA_1, WindowB_1, WindowWait_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main = /** @class */ (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super.call(this, {
                view: document.querySelector("#canvasContainer canvas"),
                backgroundColor: 0xb5b5b5,
                antialias: true,
                resolution: window.devicePixelRatio || 1
            }) || this;
            //-----------text-------------------------
            _this.textSizeWidth = 337;
            _this.textSizeDir = -1;
            _this.stats = new window["Stats"]();
            document.body.appendChild(_this.stats.dom);
            /**global settings */
            fgui.UIConfig.verticalScrollBar = "ui://test/ScrollBar_VT";
            fgui.UIConfig.horizontalScrollBar = "ui://test/ScrollBar_HZ";
            fgui.UIConfig.popupMenu = "ui://test/PopupMenu";
            fgui.UIConfig.globalModalWaiting = "ui://test/GlobalModalWaiting";
            fgui.UIConfig.windowModalWaiting = "ui://test/WindowModalWaiting";
            fgui.GRoot.inst.attachTo(_this, {
                designWidth: 1136,
                designHeight: 640,
                scaleMode: "fixedWidth" /* fgui.StageScaleMode.FIXED_WIDTH */,
                orientation: "landscape" /* fgui.StageOrientation.LANDSCAPE */,
                alignV: 3 /* fgui.StageAlign.TOP */,
                alignH: 0 /* fgui.StageAlign.LEFT */
            });
            _this.contentlayer = new fgui.GComponent();
            fgui.GRoot.inst.addChild(_this.contentlayer);
            _this.contentlayer.addChild(_this.loadingView = new LoadingView_1.LoadingView());
            _this.loadingView.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
            _this.loadingView.addRelation(fgui.GRoot.inst, 24 /* fgui.RelationType.Size */);
            //test.jpg actually is a binary file but just ends with fake postfix.
            var loader = new fgui.utils.AssetLoader();
            loader.add("test", "images/test.jpg", { loadType: PIXI.LoaderResource.LOAD_TYPE.XHR, xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER })
                .add("test@atlas0", "images/test@atlas0.png")
                .add("test@atlas0_1", "images/test@atlas0_1.png")
                .add("test@atlas0_2", "images/test@atlas0_2.png")
                .add("test@atlas0_3", "images/test@atlas0_3.png")
                .add("test@atlas0_4", "images/test@atlas0_4.png");
            loader.onProgress.add(_this.loadProgress, _this);
            loader.onComplete.add(_this.resLoaded, _this);
            loader.load();
            return _this;
        }
        Main.prototype.loadProgress = function (loader) {
            var p = loader.progress;
            this.loadingView.setProgress(p);
            if (p >= 100) {
                loader.onProgress.detachAll();
                this.loadingView.dispose();
                this.loadingView = null;
            }
        };
        Main.prototype.resLoaded = function (loader) {
            loader.destroy();
            fgui.UIPackage.addPackage("test");
            var ins = fgui.UIPackage.createObject("test", "main");
            ins.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
            ins.addRelation(fgui.GRoot.inst, 24 /* fgui.RelationType.Size */);
            this.contentlayer.addChild(ins);
            this.initClicks(ins);
        };
        Main.prototype.renderFunc = function (index, item) {
            item.text = index.toString();
        };
        Main.prototype.initClicks = function (ins) {
            this.mainIns = ins;
            ins.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
            ins.addRelation(fgui.GRoot.inst, 24 /* fgui.RelationType.Size */);
            this.container = ins.getChild("container");
            for (var i = 0; i < ins.numChildren; i++) {
                var c = ins.getChildAt(i);
                var cname = c.name;
                if (fgui.utils.StringUtil.startsWith(cname, "btn_")) {
                    if (cname == "btn_back")
                        c.click(this.backToMenu, this);
                    else
                        c.click(this.runDemo, this);
                }
            }
        };
        Main.prototype.runDemo = function (e) {
            var name = fgui.GObject.castFromNativeObject(e.currentTarget).name.replace("btn_", "");
            if (this.currentDemo) {
                if (this.currentDemo.name == name) {
                    this.mainIns.getController("c1").selectedIndex = 1;
                    return;
                }
                this.currentDemo.dispose();
                this.container.removeChild(this.currentDemo);
                this.currentDemo = null;
            }
            this.currentDemo = fgui.UIPackage.createObjectFromURL("ui://test/".concat(name));
            this.currentDemo.name = name;
            this.currentDemo.setSize(this.container.width, this.container.height);
            this.currentDemo.addRelation(this.container, 24 /* fgui.RelationType.Size */);
            this.container.addChild(this.currentDemo);
            this.initDemo(name, this.currentDemo);
            this.mainIns.getController("c1").selectedIndex = 1;
        };
        Main.prototype.initDemo = function (name, ins) {
            var _this = this;
            switch (name) {
                case "text":
                    this.textResizeHandler = fgui.utils.Binder.create(this.__playText, this, ins);
                    PIXI.Ticker.shared.add(this.textResizeHandler, this);
                    break;
                case "window":
                    this.playWindow(ins);
                    break;
                case "popup":
                    this.playPopup(ins);
                    break;
                case "grid":
                    this.playGrid(ins);
                    break;
                case "drag_drop":
                    this.playDragDrop(ins);
                    break;
                case "progressbar":
                    this.progressDemoHandler = fgui.utils.Binder.create(this.__playProgress, this, ins);
                    PIXI.Ticker.shared.add(this.progressDemoHandler, this);
                    break;
                case "depth":
                    var testContainer = ins.getChild("n22");
                    var fixedObj = testContainer.getChild("n0");
                    fixedObj.sortingOrder = 100;
                    fixedObj.draggable = true;
                    var startPos_1 = new PIXI.Point(fixedObj.x, fixedObj.y);
                    ins.getChild("btn0").click(function (e) {
                        _this.__click1(e, ins, startPos_1);
                    }, this);
                    ins.getChild("btn1").click(function (e) {
                        _this.__click2(e, ins, startPos_1);
                    }, this);
                    break;
            }
        };
        Main.prototype.disposeDemo = function () {
            var ins = this.currentDemo;
            switch (ins.name) {
                case "progressbar":
                    PIXI.Ticker.shared.remove(this.progressDemoHandler, this);
                    this.progressDemoHandler = null;
                    break;
                case "text":
                    PIXI.Ticker.shared.remove(this.textResizeHandler, this);
                    this.textResizeHandler = null;
                    break;
            }
        };
        Main.prototype.backToMenu = function (e) {
            this.disposeDemo();
            this.mainIns.getController("c1").selectedIndex = 0;
        };
        //-----grid--------------------
        Main.prototype.playGrid = function (ins) {
            var _this = this;
            var list1 = ins.getChild("list1");
            list1.removeChildrenToPool();
            var testNames = ["iOS", "Android", "WinPhone", "PC", "Mac", "Unknown"];
            var testColors = [0xFFFF00, 0x660033, 0xFFFFFF, 0x123456];
            testNames.forEach(function (n, i) {
                var item = list1.addItemFromPool();
                item.getChild("t0").text = String(i + 1);
                item.getChild("t1").text = testNames[i];
                item.getChild("t2").color = testColors[Math.floor(Math.random() * 4)];
                item.getChild("star").value = (Math.floor(Math.random() * 3) + 1) / 3 * 100;
            });
            var list2 = ins.getChild("list2");
            list2.removeChildrenToPool();
            testNames.forEach(function (n, i) {
                var item = list2.addItemFromPool();
                var cb = item.getChild("cb");
                cb.selected = false;
                item.getChild("mc").playing = false;
                cb.on(fgui.StateChangeEvent.CHANGED, _this.gridChkChanged, _this);
                item.getChild("t1").text = testNames[i];
                item.getChild("t3").text = String(Math.floor(Math.random() * 10000));
            });
        };
        Main.prototype.gridChkChanged = function (target) {
            target.parent.getChild("mc").playing = target.selected;
        };
        //-----depth--------------------
        Main.prototype.__click1 = function (e, obj, startPos) {
            var graph = new fgui.GGraph();
            startPos.x += 10;
            startPos.y += 10;
            graph.setXY(startPos.x, startPos.y);
            graph.setSize(150, 150);
            graph.drawRect(1, 0x000000, 1, 0xFF0000, 1);
            obj.getChild("n22").addChild(graph);
        };
        Main.prototype.__click2 = function (e, obj, startPos) {
            var graph = new fgui.GGraph();
            startPos.x += 10;
            startPos.y += 10;
            graph.setXY(startPos.x, startPos.y);
            graph.setSize(150, 150);
            graph.drawRect(1, 0x000000, 1, 0x00FF00, 1);
            graph.sortingOrder = 200;
            obj.getChild("n22").addChild(graph);
        };
        //-----------progressbar-------------------------
        Main.prototype.__playProgress = function (delta, p) {
            var cnt = p.numChildren;
            for (var i = 0; i < cnt; i++) {
                var child = p.getChildAt(i);
                if (child != null) {
                    child.value += .5 * delta;
                    if (child.value > child.max)
                        child.value = 0;
                }
            }
        };
        Main.prototype.__playText = function (delta, p) {
            if (this.textSizeWidth < 80)
                this.textSizeDir = 1;
            else if (this.textSizeWidth > 337)
                this.textSizeDir = -1;
            this.textSizeWidth += this.textSizeDir;
            p.getChild("n24").width = p.getChild("n23").width = this.textSizeWidth;
            p.getChild("n22").removeClick(this.__getInputText, this);
            p.getChild("n22").click(this.__getInputText, this);
        };
        Main.prototype.__getInputText = function (e) {
            var p = fgui.GObject.castFromNativeObject(e.currentTarget).parent;
            p.getChild("resulttxt").text = p.getChild("inputbox").text;
        };
        Main.prototype.playDragDrop = function (ins) {
            var btnA = ins.getChild("a");
            btnA.draggable = true;
            var btnB = ins.getChild("b");
            btnB.draggable = true;
            btnB.on(fgui.DragEvent.START, this.__onDragStart, this);
            var btnC = ins.getChild("c");
            btnC.icon = null;
            btnC.on(fgui.DragEvent.DROP, this.__onDrop, this);
            var btnD = ins.getChild("d");
            btnD.draggable = true;
            var bounds = ins.getChild("bounds");
            var rect = new PIXI.Rectangle();
            bounds.localToGlobalRect(0, 0, bounds.width, bounds.height, rect);
            fgui.GRoot.inst.globalToLocalRect(rect.x, rect.y, rect.width, rect.height, rect);
            rect.x -= ins.parent.x; //the panel is moving, so fix it with parent.x
            btnD.dragBounds = rect;
        };
        Main.prototype.__onDragStart = function (evt) {
            var btn = fgui.GObject.castFromNativeObject(evt.currentTarget);
            btn.stopDrag();
            if (!this.ddi)
                this.ddi = new fgui.utils.DragIndicator();
            this.ddi.startDrag(btn, btn.icon, btn.icon, evt.data.pointerId);
        };
        Main.prototype.__onDrop = function (evt, data) {
            var btn = fgui.GObject.castFromNativeObject(evt.currentTarget);
            btn.icon = data;
        };
        Main.prototype.playWindow = function (ins) {
            ins.getChild("n0").click(this.__clickWindowA, this);
            ins.getChild("n1").click(this.__clickWindowB, this);
            ins.getChild("n2").click(this.__clickWindowC, this);
            ins.getChild("n3").click(this.__clicRootWiat, this);
            ins.getChild("n4").click(this.__clickWindowWait, this);
        };
        Main.prototype.__clickWindowA = function () {
            if (this._winA == null)
                this._winA = new WindowA_1.WindowA();
            this._winA.modal = false;
            this._winA.show();
        };
        Main.prototype.__clickWindowB = function () {
            if (this._winB == null)
                this._winB = new WindowB_1.WindowB();
            this._winB.show();
        };
        Main.prototype.__clickWindowC = function () {
            if (this._winA == null)
                this._winA = new WindowA_1.WindowA();
            this._winA.modal = true;
            this._winA.show();
        };
        Main.prototype.__clicRootWiat = function () {
            fgui.GRoot.inst.showModalWait("Please wait while loading...");
            setTimeout(function () {
                fgui.GRoot.inst.closeModalWait();
            }, 3000);
        };
        Main.prototype.__clickWindowWait = function () {
            if (this._winW == null)
                this._winW = new WindowWait_1.WindowWait();
            this._winW.show();
        };
        Main.prototype.playPopup = function (ins) {
            if (this._pm == null) {
                this._pm = new fgui.PopupMenu();
                this._pm.addItem("Item 1");
                this._pm.addItem("Item 2");
                this._pm.addItem("Item 3");
                this._pm.addItem("Item 4");
                if (this._popupCom == null) {
                    this._popupCom = fgui.UIPackage.createObject("test", "PopTest1");
                    this._popupCom.center();
                }
            }
            var btn = ins.getChild("n3");
            btn.click(this.__clickPopup1, this);
            var btn2 = ins.getChild("n5");
            btn2.click(this.__clickPopup2, this);
        };
        Main.prototype.__clickPopup1 = function (evt) {
            var btn = fgui.GObject.castFromNativeObject(evt.currentTarget);
            this._pm.show(btn, 1 /* fgui.PopupDirection.Down */);
        };
        Main.prototype.__clickPopup2 = function () {
            fgui.GRoot.inst.showPopup(this._popupCom);
        };
        Main.prototype.render = function () {
            this.stats.update();
            _super.prototype.render.call(this);
        };
        return Main;
    }(PIXI.Application));
    //entry
    new Main();
});
//# sourceMappingURL=Main.js.map