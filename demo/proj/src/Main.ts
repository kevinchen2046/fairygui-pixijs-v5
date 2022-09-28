import { LoadingView } from "./LoadingView";
import { WindowA } from "./WindowA";
import { WindowB } from "./WindowB";
import { WindowWait } from "./WindowWait";

class Main extends PIXI.Application {

    private loadingView: LoadingView;
    private contentlayer: fgui.GComponent;
    private stats: { update: () => void, dom: HTMLElement };

    public constructor() {

        super({
            view: document.querySelector("#canvasContainer canvas") as HTMLCanvasElement,
            backgroundColor: 0xb5b5b5,
            antialias: true,
            resolution: window.devicePixelRatio || 1
        });
       

        this.stats = new window["Stats"]();
        document.body.appendChild(this.stats.dom);

        /**global settings */
        fgui.UIConfig.verticalScrollBar = "ui://test/ScrollBar_VT";
        fgui.UIConfig.horizontalScrollBar = "ui://test/ScrollBar_HZ";
        fgui.UIConfig.popupMenu = "ui://test/PopupMenu";
        fgui.UIConfig.globalModalWaiting = "ui://test/GlobalModalWaiting";
        fgui.UIConfig.windowModalWaiting = "ui://test/WindowModalWaiting";

        fgui.GRoot.inst.attachTo(this, {
            designWidth: 1136,
            designHeight: 640,
            scaleMode: fgui.StageScaleMode.FIXED_WIDTH,
            orientation: fgui.StageOrientation.LANDSCAPE,
            alignV: fgui.StageAlign.TOP,
            alignH: fgui.StageAlign.LEFT
        });

        this.contentlayer = new fgui.GComponent();
        fgui.GRoot.inst.addChild(this.contentlayer);

        this.contentlayer.addChild(this.loadingView = new LoadingView());
        this.loadingView.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
        this.loadingView.addRelation(fgui.GRoot.inst, fgui.RelationType.Size);

        //test.jpg actually is a binary file but just ends with fake postfix.
        let loader = new fgui.utils.AssetLoader();
        loader.add("test", "images/test.jpg", { loadType: PIXI.LoaderResource.LOAD_TYPE.XHR, xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER })
            .add("test@atlas0", "images/test@atlas0.png")
            .add("test@atlas0_1", "images/test@atlas0_1.png")
            .add("test@atlas0_2", "images/test@atlas0_2.png")
            .add("test@atlas0_3", "images/test@atlas0_3.png")
            .add("test@atlas0_4", "images/test@atlas0_4.png");
        loader.onProgress.add(this.loadProgress, this);
        loader.onComplete.add(this.resLoaded, this);
        loader.load();

    }

    private loadProgress(loader: PIXI.Loader): void {
        let p = loader.progress;
        this.loadingView.setProgress(p);
        if (p >= 100) {
            loader.onProgress.detachAll();
            this.loadingView.dispose();
            this.loadingView = null;
        }
    }

    private resLoaded(loader: PIXI.Loader): void {

        loader.destroy();

        fgui.UIPackage.addPackage("test");

        let ins = fgui.UIPackage.createObject("test", "main") as fgui.GComponent;
        ins.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
        ins.addRelation(fgui.GRoot.inst, fgui.RelationType.Size);
        this.contentlayer.addChild(ins);
        this.initClicks(ins);
    }

    private renderFunc(index: number, item: fgui.GObject): void {
        item.text = index.toString();
    }

    private mainIns: fgui.GComponent;
    private container: fgui.GComponent;
    private currentDemo: fgui.GComponent;
    private progressDemoHandler: (deltaTime: number) => void;
    private textResizeHandler: (deltaTime: number) => void;

    private initClicks(ins: fgui.GComponent): void {

        this.mainIns = ins;
        ins.setSize(fgui.GRoot.inst.width, fgui.GRoot.inst.height);
        ins.addRelation(fgui.GRoot.inst, fgui.RelationType.Size);
        this.container = ins.getChild("container") as fgui.GComponent;

        for (let i = 0; i < ins.numChildren; i++) {
            let c = ins.getChildAt(i);
            let cname = c.name;
            if (fgui.utils.StringUtil.startsWith(cname, "btn_")) {
                if (cname == "btn_back")
                    c.click(this.backToMenu, this);
                else
                    c.click(this.runDemo, this);
            }
        }
    }

    private runDemo(e: PIXI.InteractionEvent): void {
        let name = fgui.GObject.castFromNativeObject(e.currentTarget).name.replace("btn_", "");
        if (this.currentDemo) {
            if (this.currentDemo.name == name) {
                this.mainIns.getController("c1").selectedIndex = 1;
                return;
            }
            this.currentDemo.dispose();
            this.container.removeChild(this.currentDemo);
            this.currentDemo = null;
        }
        this.currentDemo = fgui.UIPackage.createObjectFromURL(`ui://test/${name}`) as fgui.GComponent;
        this.currentDemo.name = name;
        this.currentDemo.setSize(this.container.width, this.container.height);
        this.currentDemo.addRelation(this.container, fgui.RelationType.Size);
        this.container.addChild(this.currentDemo);
        this.initDemo(name, this.currentDemo);
        this.mainIns.getController("c1").selectedIndex = 1;
    }

    private initDemo(name: string, ins: fgui.GComponent): void {
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
                let testContainer = ins.getChild("n22") as fgui.GComponent;
                let fixedObj = testContainer.getChild("n0");
                fixedObj.sortingOrder = 100;
                fixedObj.draggable = true;
                let startPos: PIXI.Point = new PIXI.Point(fixedObj.x, fixedObj.y);
                ins.getChild("btn0").click((e) => {
                    this.__click1(e, ins, startPos);
                }, this);
                ins.getChild("btn1").click((e) => {
                    this.__click2(e, ins, startPos);
                }, this);
                break;
        }
    }

    private disposeDemo(): void {
        let ins = this.currentDemo;
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
    }

    private backToMenu(e: PIXI.InteractionEvent): void {
        this.disposeDemo();
        this.mainIns.getController("c1").selectedIndex = 0;
    }

    //-----grid--------------------
    private playGrid(ins: fgui.GComponent): void {
        let list1: fgui.GList = ins.getChild("list1") as fgui.GList;
        list1.removeChildrenToPool();
        const testNames: string[] = ["iOS", "Android", "WinPhone", "PC", "Mac", "Unknown"];
        const testColors: number[] = [0xFFFF00, 0x660033, 0xFFFFFF, 0x123456];
        testNames.forEach((n, i) => {
            let item: fgui.GButton = list1.addItemFromPool() as fgui.GButton;
            item.getChild("t0").text = String(i + 1);
            item.getChild("t1").text = testNames[i];
            (item.getChild("t2") as fgui.GTextField).color = testColors[Math.floor(Math.random() * 4)];
            (item.getChild("star") as fgui.GProgressBar).value = (Math.floor(Math.random() * 3) + 1) / 3 * 100;
        });
        let list2: fgui.GList = ins.getChild("list2") as fgui.GList;
        list2.removeChildrenToPool();
        testNames.forEach((n, i) => {
            let item: fgui.GButton = list2.addItemFromPool() as fgui.GButton;
            let cb = item.getChild("cb") as fgui.GButton;
            cb.selected = false;
            (item.getChild("mc") as fgui.GMovieClip).playing = false;
            cb.on(fgui.StateChangeEvent.CHANGED, this.gridChkChanged, this);
            item.getChild("t1").text = testNames[i];
            item.getChild("t3").text = String(Math.floor(Math.random() * 10000));
        });
    }
    private gridChkChanged(target: fgui.GButton): void {
        (target.parent.getChild("mc") as fgui.GMovieClip).playing = target.selected;
    }

    //-----depth--------------------
    private __click1(e: PIXI.InteractionEvent, obj: fgui.GComponent, startPos: PIXI.Point): void {
        let graph: fgui.GGraph = new fgui.GGraph();
        startPos.x += 10;
        startPos.y += 10;
        graph.setXY(startPos.x, startPos.y);
        graph.setSize(150, 150);
        graph.drawRect(1, 0x000000, 1, 0xFF0000, 1);
        (obj.getChild("n22") as fgui.GComponent).addChild(graph);
    }

    private __click2(e: PIXI.InteractionEvent, obj: fgui.GComponent, startPos: PIXI.Point): void {
        let graph: fgui.GGraph = new fgui.GGraph();
        startPos.x += 10;
        startPos.y += 10;
        graph.setXY(startPos.x, startPos.y);
        graph.setSize(150, 150);
        graph.drawRect(1, 0x000000, 1, 0x00FF00, 1);
        graph.sortingOrder = 200;
        (obj.getChild("n22") as fgui.GComponent).addChild(graph);
    }

    //-----------progressbar-------------------------
    private __playProgress(delta: number, p: fgui.GComponent): void {
        let cnt: number = p.numChildren;
        for (let i: number = 0; i < cnt; i++) {
            let child: fgui.GProgressBar = p.getChildAt(i) as fgui.GProgressBar;
            if (child != null) {
                child.value += .5 * delta;
                if (child.value > child.max)
                    child.value = 0;
            }
        }
    }

    //-----------text-------------------------
    private textSizeWidth: number = 337;
    private textSizeDir: number = -1;
    private __playText(delta: number, p: fgui.GComponent): void {
        if (this.textSizeWidth < 80)
            this.textSizeDir = 1;
        else if (this.textSizeWidth > 337)
            this.textSizeDir = -1;
        this.textSizeWidth += this.textSizeDir;
        p.getChild("n24").width = p.getChild("n23").width = this.textSizeWidth;
        p.getChild("n22").removeClick(this.__getInputText, this);
        p.getChild("n22").click(this.__getInputText, this);
    }
    private __getInputText(e: PIXI.InteractionEvent): void {
        let p = fgui.GObject.castFromNativeObject(e.currentTarget).parent as fgui.GComponent;
        p.getChild("resulttxt").text = p.getChild("inputbox").text;
    }

    //------------drag&drop-----------------------------
    private ddi: fgui.utils.DragIndicator;

    private playDragDrop(ins: fgui.GComponent): void {
        let btnA: fgui.GObject = ins.getChild("a");
        btnA.draggable = true;

        let btnB: fgui.GButton = ins.getChild("b") as fgui.GButton;
        btnB.draggable = true;
        btnB.on(fgui.DragEvent.START, this.__onDragStart, this);

        let btnC: fgui.GButton = ins.getChild("c") as fgui.GButton;
        btnC.icon = null;
        btnC.on(fgui.DragEvent.DROP, this.__onDrop, this);

        let btnD: fgui.GObject = ins.getChild("d");
        btnD.draggable = true;
        let bounds: fgui.GObject = ins.getChild("bounds");
        let rect: PIXI.Rectangle = new PIXI.Rectangle();
        bounds.localToGlobalRect(0, 0, bounds.width, bounds.height, rect);
        fgui.GRoot.inst.globalToLocalRect(rect.x, rect.y, rect.width, rect.height, rect);
        rect.x -= ins.parent.x;   //the panel is moving, so fix it with parent.x
        btnD.dragBounds = rect;
    }

    private __onDragStart(evt: PIXI.InteractionEvent): void {
        let btn = fgui.GObject.castFromNativeObject(evt.currentTarget);
        btn.stopDrag();
        if (!this.ddi) this.ddi = new fgui.utils.DragIndicator();
        this.ddi.startDrag(btn, btn.icon, btn.icon, evt.data.pointerId);
    }

    private __onDrop(evt: PIXI.InteractionEvent, data: any): void {
        let btn: fgui.GButton = fgui.GObject.castFromNativeObject(evt.currentTarget) as fgui.GButton;
        btn.icon = data;
    }

    //-------window--------------------------------
    private _winA: fgui.Window;
    private _winB: fgui.Window;
    private _winW: fgui.Window;

    private playWindow(ins: fgui.GComponent): void {
        ins.getChild("n0").click(this.__clickWindowA, this);
        ins.getChild("n1").click(this.__clickWindowB, this);
        ins.getChild("n2").click(this.__clickWindowC, this);
        ins.getChild("n3").click(this.__clicRootWiat, this);
        ins.getChild("n4").click(this.__clickWindowWait, this);
    }

    private __clickWindowA(): void {
        if (this._winA == null)
            this._winA = new WindowA();
        this._winA.modal = false;
        this._winA.show();
    }

    private __clickWindowB(): void {
        if (this._winB == null)
            this._winB = new WindowB();
        this._winB.show();
    }

    private __clickWindowC(): void {
        if (this._winA == null)
            this._winA = new WindowA();
        this._winA.modal = true;
        this._winA.show();
    }

    private __clicRootWiat(): void {
        fgui.GRoot.inst.showModalWait("Please wait while loading...");
        setTimeout(() => {
            fgui.GRoot.inst.closeModalWait();
        }, 3000);
    }

    private __clickWindowWait(): void {
        if (this._winW == null)
            this._winW = new WindowWait();
        this._winW.show();
    }

    //-------popup: wait for the accomplishment of the event bubbling system-----------------------
    private _pm: fgui.PopupMenu;
    private _popupCom: fgui.GComponent;
    private playPopup(ins: fgui.GComponent): void {
        if (this._pm == null) {
            this._pm = new fgui.PopupMenu();
            this._pm.addItem("Item 1");
            this._pm.addItem("Item 2");
            this._pm.addItem("Item 3");
            this._pm.addItem("Item 4");

            if (this._popupCom == null) {
                this._popupCom = fgui.UIPackage.createObject("test", "PopTest1") as fgui.GComponent;
                this._popupCom.center();
            }
        }

        let btn: fgui.GObject = ins.getChild("n3");
        btn.click(this.__clickPopup1, this);

        let btn2: fgui.GObject = ins.getChild("n5");
        btn2.click(this.__clickPopup2, this);
    }

    private __clickPopup1(evt: PIXI.InteractionEvent): void {
        let btn: fgui.GObject = fgui.GObject.castFromNativeObject(evt.currentTarget);
        this._pm.show(btn, fgui.PopupDirection.Down);
    }

    private __clickPopup2(): void {
        fgui.GRoot.inst.showPopup(this._popupCom);
    }

    public render(): void {
        this.stats.update();
        super.render();
    }
}

//entry
new Main();
