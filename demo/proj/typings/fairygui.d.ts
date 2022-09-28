declare namespace fgui {
    type IndexedObject = {
        [key: string]: any;
    };
    class InteractiveEvents {
        static Down: string;
        static Cancel: string;
        static Up: string;
        static Click: string;
        static UpOutside: string;
        static Move: string;
        static Over: string;
        static Out: string;
        static RightDown: string;
        static RightUp: string;
        static RightClick: string;
        static RightUpOutside: string;
    }
    const enum GearType {
        Display = 0,
        XY = 1,
        Size = 2,
        Look = 3,
        Color = 4,
        Animation = 5,
        Text = 6,
        Icon = 7,
        Count = 8
    }
    type GearNameMap = {
        [key: string]: number;
    };
    let GearXMLNodeNameMap: GearNameMap;
    let BlendModeMap: string[];
    const enum ScrollPaneFlags {
        DisplayOnLeft = 1,
        SnapToItem = 2,
        DisplayOnDemand = 4,
        PageMode = 8,
        TouchEffect = 16,
        DisableTouchEffect = 32,
        BounceEffect = 64,
        DisableBounceEffect = 128,
        DisableInertia = 256,
        DisableScissorRect = 512
    }
    const enum PopupDirection {
        Auto = 0,
        Down = 1,
        Up = 2
    }
    const enum ScrollBarDisplayType {
        Default = 0,
        Visible = 1,
        Auto = 2,
        Hidden = 3
    }
    const enum OverflowType {
        Visible = 0,
        Hidden = 1,
        Scroll = 2,
        Scale = 3,
        ScaleFree = 4
    }
    const enum ScrollType {
        Horizontal = 0,
        Vertical = 1,
        Both = 2
    }
    const enum ButtonMode {
        Common = 0,
        Check = 1,
        Radio = 2
    }
    const enum AutoSizeType {
        None = 0,
        Both = 1,
        Height = 2,
        Shrink = 3
    }
    const enum AlignType {
        Left = "left",
        Center = "center",
        Right = "right"
    }
    const enum VertAlignType {
        Top = 0,
        Middle = 1,
        Bottom = 2
    }
    const enum LoaderFillType {
        None = 0,
        Scale = 1,
        ScaleMatchHeight = 2,
        ScaleMatchWidth = 3,
        ScaleFree = 4,
        ScaleNoBorder = 5
    }
    const enum ListLayoutType {
        SingleColumn = 0,
        SingleRow = 1,
        FlowHorizontal = 2,
        FlowVertical = 3,
        Pagination = 4
    }
    const enum ListSelectionMode {
        Single = 0,
        Multiple = 1,
        Multiple_SingleClick = 2,
        None = 3
    }
    const enum PackageItemType {
        Image = 0,
        Swf = 1,
        MovieClip = 2,
        Sound = 3,
        Component = 4,
        Misc = 5,
        Font = 6,
        Atlas = 7
    }
    const enum ProgressTitleType {
        Percent = 0,
        ValueAndMax = 1,
        Value = 2,
        Max = 3
    }
    const enum Keys {
        Up = 38,
        Down = 40,
        Left = 37,
        Right = 39,
        Shift = 16,
        Alt = 18,
        Ctrl = 17
    }
    const enum FlipType {
        None = 0,
        Horizontal = 1,
        Vertical = 2,
        Both = 3
    }
    const enum TextureFillMode {
        NONE = 0,
        HORZ = 1,
        VERT = 2,
        DEG90 = 3,
        DEG180 = 4,
        DEG360 = 5
    }
    const enum TextureFillBegin {
        L = 0,
        R = 1,
        T = 2,
        B = 3,
        LT = 4,
        RT = 5,
        LB = 6,
        RB = 7
    }
    const enum TextureFillDirection {
        CW = 0,
        CCW = 1
    }
    const enum RelationType {
        Left_Left = 0,
        Left_Center = 1,
        Left_Right = 2,
        Center_Center = 3,
        Right_Left = 4,
        Right_Center = 5,
        Right_Right = 6,
        Top_Top = 7,
        Top_Middle = 8,
        Top_Bottom = 9,
        Middle_Middle = 10,
        Bottom_Top = 11,
        Bottom_Middle = 12,
        Bottom_Bottom = 13,
        Width = 14,
        Height = 15,
        LeftExt_Left = 16,
        LeftExt_Right = 17,
        RightExt_Left = 18,
        RightExt_Right = 19,
        TopExt_Top = 20,
        TopExt_Bottom = 21,
        BottomExt_Top = 22,
        BottomExt_Bottom = 23,
        Size = 24
    }
    const enum ListChildrenRenderOrder {
        Ascent = 0,
        Descent = 1,
        Arch = 2
    }
    function ParseOverflowType(value: string): OverflowType;
    function ParseScrollType(value: string): ScrollType;
    function ParseLoaderFillType(value: string): LoaderFillType;
    function ParseListLayoutType(value: string): ListLayoutType;
    function ParseListSelectionMode(value: string): ListSelectionMode;
    function ParsePackageItemType(value: string): PackageItemType;
    function ParseProgressTitleType(value: string): ProgressTitleType;
    function ParseScrollBarDisplayType(value: string): ScrollBarDisplayType;
    function ParseFlipType(value: string): FlipType;
    function ParseButtonMode(value: string): ButtonMode;
    function ParseAutoSizeType(value: string): AutoSizeType;
    function ParseAlignType(value: string): AlignType;
    function ParseVertAlignType(value: string): VertAlignType;
    function ParseListChildrenRenderOrder(value: string): ListChildrenRenderOrder;
    function ParseEaseType(name: string): (t: number) => number;
}
declare namespace fgui {
    class GObject {
        customData: any;
        data: any;
        protected $x: number;
        protected $y: number;
        protected $width: number;
        protected $height: number;
        protected $alpha: number;
        protected $rotation: number;
        protected $visible: boolean;
        protected $touchable: boolean;
        protected $grayed: boolean;
        protected $draggable: boolean;
        protected $scaleX: number;
        protected $scaleY: number;
        protected $skewX: number;
        protected $skewY: number;
        protected $pivot: PIXI.Point;
        protected $pivotAsAnchor: boolean;
        protected $pivotOffset: PIXI.Point;
        protected $sortingOrder: number;
        protected $internalVisible: boolean;
        protected $focusable: boolean;
        protected $tooltips: string;
        protected $pixelSnapping: boolean;
        protected $relations: Relations;
        protected $group: GGroup;
        protected $gears: GearBase<GObject>[];
        protected $displayObject: PIXI.DisplayObject;
        protected $dragBounds: PIXI.Rectangle;
        protected $handlingController: boolean;
        private static $colorHelper;
        protected $colorFilter: PIXI.filters.ColorMatrixFilter;
        protected $lastColorComponents: number[];
        protected $parent: GComponent;
        $inProgressBuilding: boolean;
        $rawWidth: number;
        $rawHeight: number;
        $gearLocked: boolean;
        $initWidth: number;
        $initHeight: number;
        protected $sourceWidth: number;
        protected $sourceHeight: number;
        protected $id: string;
        protected $name: string;
        packageItem: PackageItem;
        private static gInstanceCounter;
        constructor();
        readonly id: string;
        name: string;
        x: number;
        y: number;
        setXY(xv: number, yv: number): void;
        pixelSnapping: boolean;
        center(restraint?: boolean): void;
        width: number;
        height: number;
        setSize(wv: number, hv: number, ignorePivot?: boolean): void;
        ensureSizeCorrect(): void;
        readonly sourceHeight: number;
        readonly sourceWidth: number;
        readonly initHeight: number;
        readonly initWidth: number;
        readonly actualWidth: number;
        readonly actualHeight: number;
        scaleX: number;
        scaleY: number;
        setScale(sx: number, sy: number): void;
        skewX: number;
        skewY: number;
        setSkew(xv: number, yv: number): void;
        protected mapPivotWidth(scale: number): number;
        protected mapPivotHeight(scale: number): number;
        pivotX: number;
        pivotY: number;
        setPivot(xv: number, yv: number, asAnchor?: boolean): void;
        protected internalSetPivot(xv: number, yv: number, asAnchor: boolean): void;
        private updatePivotOffset;
        private applyPivot;
        touchable: boolean;
        grayed: boolean;
        enabled: boolean;
        rotation: number;
        readonly normalizeRotation: number;
        alpha: number;
        protected updateAlpha(): void;
        visible: boolean;
        internalVisible: boolean;
        readonly finalVisible: boolean;
        sortingOrder: number;
        focusable: boolean;
        readonly focused: boolean;
        requestFocus(): void;
        tooltips: string;
        blendMode: string;
        filters: PIXI.Filter[];
        readonly inContainer: boolean;
        static isDisplayObjectOnStage(display: PIXI.DisplayObject): boolean;
        readonly onStage: boolean;
        readonly resourceURL: string;
        group: GGroup;
        getGear(index: number | GearType): GearBase<GObject>;
        protected updateGear(index: GearType): void;
        updateGearFromRelations(index: GearType, dx: number, dy: number): void;
        hasGearController(index: number, c: controller.Controller): boolean;
        lockGearDisplay(): number;
        releaseGearDisplay(token: number): void;
        private checkGearVisible;
        readonly gearXY: GearXY;
        readonly gearSize: GearSize;
        readonly gearLook: GearLook;
        readonly relations: Relations;
        addRelation(target: GObject, relationType: number, usePercent?: boolean): void;
        removeRelation(target: GObject, relationType?: number): void;
        readonly displayObject: PIXI.DisplayObject;
        protected createDisplayObject(): void;
        protected setDisplayObject(value: PIXI.DisplayObject): void;
        parent: GComponent;
        removeFromParent(): void;
        readonly root: GRoot;
        text: string;
        icon: string;
        dispose(): void;
        click(listener: PIXI.utils.EventEmitter.ListenerFn, thisObj?: any): this;
        removeClick(listener: PIXI.utils.EventEmitter.ListenerFn, thisObj?: any): this;
        hasClick(fn?: PIXI.utils.EventEmitter.ListenerFn): boolean;
        on(type: string, listener: PIXI.utils.EventEmitter.ListenerFn, thisObject?: any): this;
        off(type: string, listener: PIXI.utils.EventEmitter.ListenerFn, thisObject?: any): this;
        once(type: string, listener: PIXI.utils.EventEmitter.ListenerFn, thisObject?: any): this;
        hasListener(event: string, handler?: PIXI.utils.EventEmitter.ListenerFn): boolean;
        emit(event: string, ...args: any[]): boolean;
        removeAllListeners(type?: string): void;
        draggable: boolean;
        dragBounds: PIXI.Rectangle;
        startDrag(touchPointID?: number): void;
        stopDrag(): void;
        readonly dragging: boolean;
        localToGlobal(ax?: number, ay?: number, resultPoint?: PIXI.Point): PIXI.Point;
        globalToLocal(ax?: number, ay?: number, resultPoint?: PIXI.Point): PIXI.Point;
        localToRoot(ax?: number, ay?: number, resultPoint?: PIXI.Point): PIXI.Point;
        rootToLocal(ax?: number, ay?: number, resultPoint?: PIXI.Point): PIXI.Point;
        localToGlobalRect(ax?: number, ay?: number, aWidth?: number, aHeight?: number, resultRect?: PIXI.Rectangle): PIXI.Rectangle;
        globalToLocalRect(ax?: number, ay?: number, aWidth?: number, aHeight?: number, resultRect?: PIXI.Rectangle): PIXI.Rectangle;
        handleControllerChanged(c: controller.Controller): void;
        protected switchDisplayObject(newObj: PIXI.DisplayObject): void;
        protected handleXYChanged(): void;
        protected handleSizeChanged(): void;
        protected handleScaleChanged(): void;
        protected readonly colorFilter: PIXI.filters.ColorMatrixFilter;
        updateColorComponents(brightness: number, contrast: number, saturate: number, hue: number): void;
        protected handleGrayedChanged(): void;
        constructFromResource(): void;
        setupBeforeAdd(xml: utils.XmlNode): void;
        setupAfterAdd(xml: utils.XmlNode): void;
        static castFromNativeObject(disp: PIXI.DisplayObject): GObject;
        protected static sGlobalDragStart: PIXI.Point;
        protected static sGlobalRect: PIXI.Rectangle;
        protected static sHelperPoint: PIXI.Point;
        protected static sDragHelperRect: PIXI.Rectangle;
        protected static sUpdatingWhileDragging: boolean;
        private static $dragBeginCancelled;
        protected $touchDownPoint: PIXI.Point;
        static draggingObject: GObject;
        private initDrag;
        private dragBegin;
        private dragEnd;
        private reset;
        private $touchBegin;
        private $end;
        private $moving;
        private $moving2;
        private $end2;
    }
}
declare namespace fgui {
    class GComponent extends GObject {
        protected $sortingChildCount: number;
        protected $opaque: boolean;
        protected $margin: utils.Margin;
        protected $trackBounds: boolean;
        protected $boundsChanged: boolean;
        protected $children: GObject[];
        protected $applyingController: controller.Controller;
        $buildingDisplayList: boolean;
        $controllers: controller.Controller[];
        $transitions: Transition[];
        $rootContainer: UIContainer;
        $container: PIXI.Container;
        $scrollPane: ScrollPane;
        $alignOffset: PIXI.Point;
        constructor();
        protected createDisplayObject(): void;
        dispose(): void;
        readonly displayListContainer: PIXI.Container;
        addChild(child: GObject): GObject;
        addChildAt(child: GObject, index?: number): GObject;
        private getInsertPosForSortingChild;
        removeChild(child: GObject, dispose?: boolean): GObject;
        removeChildAt(index: number, dispose?: boolean): GObject;
        removeChildren(beginIndex?: number, endIndex?: number, dispose?: boolean): void;
        getChildAt(index?: number): GObject;
        getChild(name: string): GObject;
        getChildInGroup(name: string, group: GGroup): GObject;
        getChildById(id: string): GObject;
        getChildIndex(child: GObject): number;
        setChildIndex(child: GObject, index?: number): void;
        setChildIndexBefore(child: GObject, index: number): number;
        protected $setChildIndex(child: GObject, oldIndex: number, index?: number): number;
        swapChildren(child1: GObject, child2: GObject): void;
        swapChildrenAt(index1: number, index2?: number): void;
        readonly numChildren: number;
        isAncestorOf(child: GObject): boolean;
        addController(controller: controller.Controller): void;
        getControllerAt(index: number): controller.Controller;
        getController(name: string): controller.Controller;
        removeController(c: controller.Controller): void;
        readonly controllers: controller.Controller[];
        childStateChanged(child: GObject): void;
        applyController(c: controller.Controller): void;
        applyAllControllers(): void;
        adjustRadioGroupDepth(obj: GObject, c: controller.Controller): void;
        getTransitionAt(index: number): Transition;
        getTransition(transName: string): Transition;
        isChildInView(child: GObject): boolean;
        getFirstChildInView(): number;
        readonly scrollPane: ScrollPane;
        opaque: boolean;
        margin: utils.Margin;
        mask: PIXI.Container | PIXI.MaskData;
        protected updateOpaque(): void;
        protected updateScrollRect(): void;
        protected setupScroll(scrollBarMargin: utils.Margin, scroll: ScrollType, scrollBarDisplay: ScrollBarDisplayType, flags: number, vtScrollBarRes: string, hzScrollBarRes: string, headerRes: string, footerRes: string): void;
        protected setupOverflow(overflow: OverflowType): void;
        protected handleSizeChanged(): void;
        protected handleGrayedChanged(): void;
        setBoundsChangedFlag(): void;
        private $validate;
        ensureBoundsCorrect(): void;
        protected updateBounds(): void;
        setBounds(ax: number, ay: number, aw: number, ah?: number): void;
        viewWidth: number;
        viewHeight: number;
        getSnappingPosition(xValue: number, yValue: number, resultPoint?: PIXI.Point): PIXI.Point;
        childSortingOrderChanged(child: GObject, oldValue: number, newValue?: number): void;
        constructFromResource(): void;
        private constructInternal;
        protected appendChildrenList(): void;
        protected constructFromXML(xml: utils.XmlNode): void;
        private $added;
        private $removed;
    }
}
declare namespace fgui {
    class GButton extends GComponent implements IColorableTitle {
        protected $titleObject: GObject;
        protected $iconObject: GObject;
        protected $relatedController: controller.Controller;
        private $mode;
        private $selected;
        private $title;
        private $selectedTitle;
        private $icon;
        private $selectedIcon;
        private $pageOption;
        private $buttonController;
        private $changeStateOnClick;
        private $linkedPopup;
        private $downEffect;
        private $downEffectValue;
        private $down;
        private $over;
        private $clicksound;
        static UP: string;
        static DOWN: string;
        static OVER: string;
        static SELECTED_OVER: string;
        static DISABLED: string;
        static SELECTED_DISABLED: string;
        constructor();
        protected setDisplayObject(value: PIXI.DisplayObject): void;
        icon: string;
        selectedIcon: string;
        title: string;
        text: string;
        selectedTitle: string;
        titleColor: number;
        fontSize: number;
        selected: boolean;
        mode: ButtonMode;
        relatedController: controller.Controller;
        readonly pageOption: controller.PageOption;
        changeStateOnClick: boolean;
        linkedPopup: GObject;
        addStateListener(listener: PIXI.utils.EventEmitter.ListenerFn, thisObj?: any): void;
        removeStateListener(listener: PIXI.utils.EventEmitter.ListenerFn, thisObj?: any): void;
        fireClick(downEffect?: boolean): void;
        protected setState(val: string): void;
        handleControllerChanged(c: controller.Controller): void;
        protected handleGrayedChanged(): void;
        protected constructFromXML(xml: utils.XmlNode): void;
        setupAfterAdd(xml: utils.XmlNode): void;
        private $rollover;
        private $rollout;
        private $mousedown;
        private $mouseup;
        private $click;
        private playSound;
        dispose(): void;
    }
}
declare namespace fgui {
    class GComboBox extends GComponent {
        protected $dropdown: GComponent;
        protected $titleObject: GObject;
        protected $iconObject: GObject;
        protected $list: GList;
        private $items;
        private $values;
        private $icons;
        private $visibleItemCount;
        private $itemsUpdated;
        private $selectedIndex;
        private $buttonController;
        private $popupDir;
        private $over;
        private $down;
        constructor();
        text: string;
        icon: string;
        titleColor: number;
        visibleItemCount: number;
        popupDirection: PopupDirection;
        items: Array<string>;
        icons: string[];
        values: string[];
        selectedIndex: number;
        value: string;
        protected setState(val: string): void;
        protected constructFromXML(xml: utils.XmlNode): void;
        dispose(): void;
        setupAfterAdd(xml: utils.XmlNode): void;
        protected showDropdown(): void;
        private $popupWinClosed;
        private $clickItem;
        private delayedClickItem;
        private $rollover;
        private $rollout;
        private $mousedown;
        private $mouseup;
    }
}
declare namespace fgui {
    class GGraph extends GObject implements IColorGear {
        private $type;
        private $lineSize;
        private $lineColor;
        private $lineAlpha;
        private $fillColor;
        private $fillAlpha;
        private $corner;
        constructor();
        drawRect(lineSize: number, lineColor: number, lineAlpha: number, fillColor: number, fillAlpha: number, corner?: number[]): void;
        drawEllipse(lineSize: number, lineColor: number, lineAlpha: number, fillColor: number, fillAlpha: number): void;
        color: number;
        private drawGraph;
        replaceMe(target: GObject): void;
        addBeforeMe(target: GObject): void;
        addAfterMe(target: GObject): void;
        setNativeObject(obj: PIXI.DisplayObject): void;
        protected createDisplayObject(): void;
        protected handleSizeChanged(): void;
        setupBeforeAdd(xml: utils.XmlNode): void;
    }
}
declare namespace fgui {
    class GGroup extends GObject {
        protected $empty: boolean;
        $updating: boolean;
        protected createDisplayObject(): void;
        updateBounds(): void;
        setXY(xv: number, yv: number): void;
        moveChildren(dx: number, dy: number): void;
        protected updateAlpha(): void;
    }
}
declare namespace fgui {
    class GImage extends GObject implements IColorGear {
        private $content;
        private $flip;
        constructor();
        touchable: boolean;
        color: number;
        flip: FlipType;
        texture: PIXI.Texture;
        protected createDisplayObject(): void;
        dispose(): void;
        constructFromResource(): void;
        protected handleXYChanged(): void;
        protected handleSizeChanged(): void;
        setupBeforeAdd(xml: utils.XmlNode): void;
    }
}
declare namespace fgui {
    class GLabel extends GComponent implements IColorableTitle {
        protected $titleObject: GObject;
        protected $iconObject: GObject;
        constructor();
        icon: string;
        title: string;
        text: string;
        titleColor: number;
        fontSize: number;
        editable: boolean;
        protected constructFromXML(xml: utils.XmlNode): void;
        setupAfterAdd(xml: utils.XmlNode): void;
    }
}
declare namespace fgui {
    type GListRenderer = (index: number, item: GObject) => void;
    type GListItemProvider = (index: number) => string;
    class GList extends GComponent {
        itemRenderer: GListRenderer;
        itemProvider: GListItemProvider;
        scrollItemToViewOnClick: boolean;
        foldInvisibleItems: boolean;
        private $layout;
        private $lineCount;
        private $columnCount;
        private $lineGap;
        private $columnGap;
        private $defaultItem;
        private $autoResizeItem;
        private $selectionMode;
        private $align;
        private $verticalAlign;
        private $selectionController;
        private $lastSelectedIndex;
        private $pool;
        private $virtual;
        private $loop;
        private $numItems;
        private $realNumItems;
        private $firstIndex;
        private $curLineItemCount;
        private $curLineItemCount2;
        private $itemSize;
        private $virtualListChanged;
        private $virtualItems;
        private $eventLocked;
        protected $apexIndex: number;
        private $childrenRenderOrder;
        private $itemInfoVer;
        private $enterCounter;
        private static $lastPosHelper;
        constructor();
        childrenRenderOrder: ListChildrenRenderOrder;
        apexIndex: number;
        protected appendChildrenList(): void;
        setXY(xv: number, yv: number): void;
        protected $setChildIndex(child: GObject, oldIndex: number, index?: number): number;
        childStateChanged(child: GObject): void;
        dispose(): void;
        layout: ListLayoutType;
        lineCount: number;
        columnCount: number;
        lineGap: number;
        columnGap: number;
        align: AlignType;
        verticalAlign: VertAlignType;
        virtualItemSize: PIXI.Point;
        defaultItem: string;
        autoResizeItem: boolean;
        selectionMode: ListSelectionMode;
        selectionController: controller.Controller;
        readonly itemPool: utils.GObjectRecycler;
        getFromPool(url?: string): GObject;
        returnToPool(obj: GObject): void;
        addChildAt(child: GObject, index?: number): GObject;
        addItem(url?: string): GObject;
        addItemFromPool(url?: string): GObject;
        removeChildAt(index: number, dispose?: boolean): GObject;
        removeChildToPoolAt(index: number): void;
        removeChildToPool(child: GObject): void;
        removeChildrenToPool(beginIndex?: number, endIndex?: number): void;
        selectedIndex: number;
        getSelection(): number[];
        addSelection(index: number, scrollIntoView?: boolean): void;
        removeSelection(index: number): void;
        clearSelection(): void;
        private clearSelectionExcept;
        selectAll(): void;
        selectNone(): void;
        selectReverse(): void;
        handleArrowKey(key: Keys): void;
        private $clickItem;
        private setSelectionOnEvent;
        resizeToFit(itemCount?: number, minSize?: number): void;
        getMaxItemWidth(): number;
        protected handleSizeChanged(): void;
        handleControllerChanged(c: controller.Controller): void;
        private updateSelectionController;
        getSnappingPosition(xValue: number, yValue: number, resultPoint?: PIXI.Point): PIXI.Point;
        scrollToView(index: number, ani?: boolean, snapToFirst?: boolean): void;
        getFirstChildInView(): number;
        childIndexToItemIndex(index: number): number;
        itemIndexToChildIndex(index: number): number;
        setVirtual(): void;
        setVirtualAndLoop(): void;
        private $setVirtual;
        numItems: number;
        refreshVirtualList(): void;
        private checkVirtualList;
        private setVirtualListChangedFlag;
        private $refreshVirtualList;
        private $scrolled;
        private getIndexOnPos1;
        private getIndexOnPos2;
        private getIndexOnPos3;
        private handleScroll;
        private handleScroll1;
        private handleScroll2;
        private handleScroll3;
        private handleArchOrder1;
        private handleArchOrder2;
        private handleAlign;
        protected updateBounds(): void;
        setupBeforeAdd(xml: utils.XmlNode): void;
        setupAfterAdd(xml: utils.XmlNode): void;
    }
}
declare namespace fgui.utils {
    abstract class Recycler<T> {
        protected $pool: {
            [name: string]: T[];
        };
        protected $count: number;
        constructor();
        readonly count: number;
        clear(): void;
        get(id: string): T;
        protected abstract createObject(id: string): T;
        recycle(id: string, obj: T): void;
    }
}
declare namespace fgui.utils {
    class GObjectRecycler extends Recycler<GObject> {
        constructor();
        clear(): void;
        protected createObject(id: string): GObject;
    }
}
declare namespace fgui {
    class GLoader extends GObject implements IAnimationGear, IColorGear {
        protected $url: string;
        protected $align: AlignType;
        protected $verticalAlign: VertAlignType;
        protected $autoSize: boolean;
        protected $fill: LoaderFillType;
        protected $showErrorSign: boolean;
        protected $playing: boolean;
        protected $frame: number;
        protected $color: number;
        private $contentItem;
        private $contentSourceWidth;
        private $contentSourceHeight;
        private $contentWidth;
        private $contentHeight;
        protected $container: UIContainer;
        protected $content: UIImage | MovieClip;
        protected $errorSign: GObject;
        private $updatingLayout;
        private static $errorSignPool;
        constructor();
        protected createDisplayObject(): void;
        dispose(): void;
        url: string;
        icon: string;
        align: AlignType;
        verticalAlign: VertAlignType;
        fill: LoaderFillType;
        autoSize: boolean;
        playing: boolean;
        frame: number;
        color: number;
        private applyColor;
        showErrorSign: boolean;
        readonly content: UIImage | MovieClip;
        texture: PIXI.Texture;
        protected loadContent(): void;
        protected loadFromPackage(itemURL: string): void;
        private switchToMovieMode;
        private $loadingTexture;
        protected loadExternal(): void;
        protected __loadExternal(): void;
        protected freeExternal(texture: PIXI.Texture): void;
        private $loadResCompleted;
        protected onExternalLoadSuccess(texture: PIXI.Texture): void;
        protected onExternalLoadFailed(): void;
        private setErrorState;
        private clearErrorState;
        private updateLayout;
        private clearContent;
        protected handleSizeChanged(): void;
        setupBeforeAdd(xml: utils.XmlNode): void;
    }
}
declare namespace fgui {
    class GMovieClip extends GObject implements IAnimationGear, IColorGear {
        private $movieClip;
        constructor();
        protected mapPivotWidth(scale: number): number;
        protected mapPivotHeight(scale: number): number;
        protected handleSizeChanged(): void;
        handleScaleChanged(): void;
        touchable: boolean;
        color: number;
        protected createDisplayObject(): void;
        playing: boolean;
        frame: number;
        setPlaySettings(...args: any[]): void;
        constructFromResource(): void;
        setupBeforeAdd(xml: utils.XmlNode): void;
    }
}
declare namespace fgui {
    class GProgressBar extends GComponent {
        private $max;
        private $value;
        private $titleType;
        private $reverse;
        private $titleObject;
        private $aniObject;
        private $barObjectH;
        private $barObjectV;
        private $barMaxWidth;
        private $barMaxHeight;
        private $barMaxWidthDelta;
        private $barMaxHeightDelta;
        private $barStartX;
        private $barStartY;
        private $tweener;
        private $tweenValue;
        private static easeLinear;
        constructor();
        titleType: ProgressTitleType;
        max: number;
        value: number;
        tweenValue(value: number, duration: number): createjs.Tween;
        private onUpdateTween;
        update(val: number): void;
        protected constructFromXML(xml: utils.XmlNode): void;
        protected handleSizeChanged(): void;
        setupAfterAdd(xml: utils.XmlNode): void;
        dispose(): void;
    }
}
declare namespace fgui {
    class LineInfo {
        width: number;
        height: number;
        textHeight: number;
        text: string;
        y: number;
        private static pool;
        static get(): LineInfo;
        static recycle(value: LineInfo): void;
        static recycleMany(value: LineInfo[]): void;
    }
    class GTextField extends GObject implements IColorGear, IColorableTitle {
        protected $textField: UITextField;
        protected $btContainer: UIContainer;
        protected $bitmapFont: BitmapFont;
        protected $lines: LineInfo[];
        protected $bitmapPool: PIXI.Sprite[];
        protected $font: string;
        protected $style: PIXI.TextStyle;
        protected $verticalAlign: VertAlignType;
        protected $offset: PIXI.Point;
        protected $color: number | number[];
        protected $singleLine: boolean;
        protected $text: string;
        protected $fontProperties: PIXI.IFontMetrics;
        protected $autoSize: AutoSizeType;
        protected $widthAutoSize: boolean;
        protected $heightAutoSize: boolean;
        protected $requireRender: boolean;
        protected $updatingSize: boolean;
        protected $sizeDirty: boolean;
        protected $textWidth: number;
        protected $textHeight: number;
        static GUTTER_X: number;
        static GUTTER_Y: number;
        constructor();
        protected createDisplayObject(): void;
        private switchBitmapMode;
        dispose(): void;
        text: string;
        protected setText(value: string): void;
        protected getText(): string;
        color: number;
        colors: number[];
        protected getColor(): number | number[];
        protected setColor(value: number | number[]): void;
        titleColor: number;
        lineHeight: number;
        font: string;
        fontSize: number;
        align: AlignType;
        verticalAlign: VertAlignType;
        leading: number;
        letterSpacing: number;
        underline: boolean;
        bold: boolean;
        weight: PIXI.TextStyleFontWeight;
        variant: PIXI.TextStyleFontVariant;
        italic: boolean;
        multipleLine: boolean;
        stroke: number;
        strokeColor: number | string;
        autoSize: AutoSizeType;
        readonly textWidth: number;
        readonly textHeight: number;
        private $cacheAsBitmap;
        cacheAsBitmap: boolean;
        ensureSizeCorrect(): void;
        protected render(): void;
        private applyStyle;
        private $render;
        protected renderNow(updateBounds?: boolean): void;
        private renderWithBitmapFont;
        localToGlobal(ax?: number, ay?: number, resultPoint?: PIXI.Point): PIXI.Point;
        globalToLocal(ax?: number, ay?: number, resultPoint?: PIXI.Point): PIXI.Point;
        protected handleSizeChanged(): void;
        protected shrinkTextField(): void;
        protected layoutAlign(): void;
        private updatePosition;
        protected handleXYChanged(): void;
        setupBeforeAdd(xml: utils.XmlNode): void;
        setupAfterAdd(xml: utils.XmlNode): void;
    }
}
declare namespace fgui {
    class TextBlock {
        text: string;
        style: PIXI.TextStyle;
    }
    class GRichTextField extends GTextField {
        protected $ubbEnabled: boolean;
        protected $textFlow: TextBlock;
        ubbEnabled: boolean;
        setupBeforeAdd(xml: utils.XmlNode): void;
        constructor();
        textFlow: TextBlock;
        text: string;
        private $clickLink;
        dispose(): void;
    }
}
declare namespace fgui {
    class GRootMouseStatus {
        touchDown: boolean;
        mouseX: number;
        mouseY: number;
    }
    class GRoot extends GComponent {
        private static uniqueID;
        private $uiStage;
        private $modalLayer;
        private $popupStack;
        private $justClosedPopups;
        private $modalWaitPane;
        private $focusedObject;
        private $tooltipWin;
        private $defaultTooltipWin;
        private $checkingPopups;
        private $uid;
        private static $inst;
        private static $gmStatus;
        static readonly inst: GRoot;
        static readonly globalMouseStatus: GRootMouseStatus;
        attachTo(app: PIXI.Application, stageOptions?: UIStageOptions): void;
        constructor();
        readonly uniqueID: number;
        readonly stageWidth: number;
        readonly stageHeight: number;
        readonly contentScaleFactor: number;
        readonly applicationContext: PIXI.Application;
        readonly nativeStage: PIXI.Container;
        readonly orientation: StageOrientation;
        readonly stageWrapper: UIStage;
        protected dispatchMouseWheel(evt: any): void;
        getObjectUnderPoint(globalX: number, globalY: number): GObject;
        showWindow(win: Window): void;
        hideWindow(win: Window): void;
        hideWindowImmediately(win: Window): void;
        bringToFront(win: Window): void;
        showModalWait(msg?: string): void;
        closeModalWait(): void;
        closeAllExceptModals(): void;
        closeAllWindows(): void;
        getTopWindow(): Window;
        readonly hasModalWindow: boolean;
        readonly modalWaiting: boolean;
        showPopup(popup: GObject, target?: GObject, dir?: PopupDirection): void;
        togglePopup(popup: GObject, target?: GObject, dir?: PopupDirection): void;
        hidePopup(popup?: GObject): void;
        readonly hasAnyPopup: boolean;
        private closePopup;
        showTooltips(msg: string): void;
        showTooltipsWin(tooltipWin: GObject, position?: PIXI.Point): void;
        hideTooltips(): void;
        focus: GObject;
        private setFocus;
        private adjustModalLayer;
        private $stageDown;
        checkPopups(target: PIXI.DisplayObject): void;
        private $stageMove;
        private $stageUp;
        private $winResize;
    }
}
declare namespace fgui {
    class GScrollBar extends GComponent {
        private $grip;
        private $arrowButton1;
        private $arrowButton2;
        private $bar;
        private $target;
        private $vertical;
        private $scrollPerc;
        private $fixedGripSize;
        private $dragOffset;
        constructor();
        setScrollPane(target: ScrollPane, vertical: boolean): void;
        displayPerc: number;
        scrollPerc: number;
        readonly minSize: number;
        protected constructFromXML(xml: utils.XmlNode): void;
        private $gripMouseDown;
        private static sScrollbarHelperPoint;
        private $gripDragging;
        private $gripDraggingEnd;
        private $arrowButton1Click;
        private $arrowButton2Click;
        private $barMouseDown;
        dispose(): void;
    }
}
declare namespace fgui {
    class GSlider extends GComponent {
        protected $max: number;
        protected $value: number;
        protected $titleType: ProgressTitleType;
        protected $titleObject: GTextField;
        protected $aniObject: GObject;
        protected $barObjectH: GObject;
        protected $barObjectV: GObject;
        protected $barMaxWidth: number;
        protected $barMaxHeight: number;
        protected $barMaxWidthDelta: number;
        protected $barMaxHeightDelta: number;
        protected $gripObject: GObject;
        private $clickPos;
        private $clickPercent;
        constructor();
        titleType: ProgressTitleType;
        max: number;
        value: number;
        update(): void;
        private updateWidthPercent;
        protected handleSizeChanged(): void;
        setupAfterAdd(xml: utils.XmlNode): void;
        protected constructFromXML(xml: utils.XmlNode): void;
        private $gripMouseDown;
        private static sSilderHelperPoint;
        private $gripMouseMove;
        private $gripMouseUp;
        dispose(): void;
    }
}
declare namespace fgui.utils {
    class InputDelegate {
        protected $inited: boolean;
        protected $textField: GTextInput;
        protected $input: InputElement;
        protected $restrictString: string;
        protected $restrictRegex: RegExp;
        protected $type: InputType;
        private $focused;
        constructor(tf: GTextInput);
        initialize(): void;
        private textFieldDownHandler;
        destroy(): void;
        text: string;
        setColor(v: number): void;
        private updateText;
        private onStageDown;
        private focusHandler;
        readonly isFocused: boolean;
        $getProperty(name: string): string;
        $setProperty(name: string, value: string): void;
        $restrict: string;
        type: InputType;
        private tryHideInput;
        $updateProperties(): void;
        $onFocus(): void;
    }
}
declare namespace fgui {
    const enum InputType {
        TEXT = "text",
        PASSWORD = "password",
        NUMBER = "number",
        EMAIL = "email",
        TEL = "tel",
        URL = "url"
    }
    class GTextInput extends GTextField {
        protected $editable: boolean;
        protected $util: utils.InputDelegate;
        $isTyping: boolean;
        constructor();
        protected createDisplayObject(): void;
        protected handleSizeChanged(): void;
        private removed;
        private added;
        requestFocus(): void;
        editable: boolean;
        private changeToPassText;
        protected getText(): string;
        protected setText(value: string): void;
        protected setColor(value: number): void;
        promptText: string;
        maxLength: number;
        restrict: string;
        password: boolean;
        type: InputType;
        dispose(): void;
        protected renderNow(updateBounds?: boolean): void;
        private decorateInputbox;
        setupBeforeAdd(xml: utils.XmlNode): void;
    }
}
declare namespace fgui {
    class GTimer {
        private $items;
        private $itemPool;
        private $enumIdx;
        private $enumCount;
        private $curTime;
        private $ticker;
        static inst: GTimer;
        constructor();
        private getItem;
        private findItem;
        add(delayInMs: number, repeat: number, callback: (...args: any[]) => void, thisObj: any, callbackParam?: any): void;
        addLoop(delayInMs: number, callback: (...args: any[]) => void, thisObj: any, callbackParam?: any): void;
        callLater(callback: (...args: any[]) => void, thisObj: any, callbackParam?: any): void;
        callDelay(delayInMs: number, callback: (...args: any[]) => void, thisObj: any, callbackParam?: any): void;
        exists(callback: (...args: any[]) => void, thisObj: any): boolean;
        remove(callback: (...args: any[]) => void, thisObj: any): void;
        readonly ticker: PIXI.Ticker;
        readonly curTime: number;
        advance(): void;
        tickTween(): void;
        setTicker(ticker: PIXI.Ticker): void;
    }
}
declare namespace fgui {
    class GearBase<T> {
        static disableAllTweenEffect: boolean;
        protected $tween: boolean;
        protected $easeType: (t: number) => number;
        protected $tweenTime: number;
        protected $tweenDelay: number;
        protected $lockToken: number;
        protected $owner: GObject & T;
        protected $controller: controller.Controller;
        constructor(owner: GObject & T);
        controller: controller.Controller;
        tween: boolean;
        tweenDelay: number;
        tweenTime: number;
        easeType: (t: number) => number;
        setup(xml: utils.XmlNode): void;
        updateFromRelations(dx: number, dy: number): void;
        protected addStatus(pageId: string, value: string): void;
        protected init(): void;
        apply(): void;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearAnimation extends GearBase<IAnimationGear> {
        private $storage;
        private $default;
        constructor(owner: GObject & IAnimationGear);
        protected init(): void;
        protected addStatus(pageId: string, value: string): void;
        apply(): void;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearColor extends GearBase<IColorGear> {
        private $storage;
        private $default;
        constructor(owner: GObject & IColorGear);
        protected init(): void;
        protected addStatus(pageId: string, value: string): void;
        apply(): void;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearDisplay extends GearBase<GObject> {
        private $vid;
        pages: string[];
        constructor(owner: GObject);
        protected init(): void;
        lock(): number;
        release(token: number): void;
        readonly connected: boolean;
        apply(): void;
    }
}
declare namespace fgui {
    class GearIcon extends GearBase<GObject> {
        private $storage;
        private $default;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, value: string): void;
        apply(): void;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearLook extends GearBase<GObject> {
        private $tweener;
        private $storage;
        private $default;
        private $tweenValue;
        private $tweenTarget;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, value: string): void;
        apply(): void;
        private tweenComplete;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearSize extends GearBase<GObject> {
        private $tweener;
        private $storage;
        private $default;
        private $tweenValue;
        private $tweenTarget;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, value: string): void;
        apply(): void;
        private tweenComplete;
        updateState(): void;
        updateFromRelations(dx: number, dy: number): void;
    }
}
declare namespace fgui {
    class GearText extends GearBase<GObject> {
        private $storage;
        private $default;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, value: string): void;
        apply(): void;
        updateState(): void;
    }
}
declare namespace fgui {
    class GearXY extends GearBase<GObject> {
        private $tweener;
        private $storage;
        private $default;
        private $tweenValue;
        private $tweenTarget;
        constructor(owner: GObject);
        protected init(): void;
        protected addStatus(pageId: string, value: string): void;
        apply(): void;
        private tweenComplete;
        updateState(): void;
        updateFromRelations(dx: number, dy: number): void;
    }
}
declare namespace fgui {
    interface IAnimationGear {
        playing: boolean;
        frame: number;
    }
    let isAnimationGear: (obj: any) => obj is IAnimationGear;
}
declare namespace fgui {
    interface IColorGear {
        color: number;
    }
    let isColorGear: (obj: any) => obj is IColorGear;
}
declare namespace fgui {
    interface IColorableTitle {
        titleColor: number;
        fontSize: number;
    }
    let isColorableTitle: (obj: any) => obj is IColorableTitle;
}
declare namespace fgui {
    class PopupMenu {
        protected $contentPane: GComponent;
        protected $list: GList;
        constructor(resourceURL?: string);
        dispose(): void;
        addItem(caption: string, handler?: Function): GButton;
        addItemAt(caption: string, index: number, handler?: Function): GButton;
        addSeperator(): void;
        getItemName(index: number): string;
        setItemText(name: string, caption: string): void;
        setItemVisible(name: string, visible: boolean): void;
        setItemGrayed(name: string, grayed: boolean): void;
        setItemCheckable(name: string, checkable: boolean): void;
        setItemChecked(name: string, checked: boolean): void;
        isItemChecked(name: string): boolean;
        removeItem(name: string): boolean;
        clearItems(): void;
        readonly itemCount: Number;
        readonly contentPane: GComponent;
        readonly list: GList;
        show(target?: GObject, dir?: PopupDirection): void;
        private $clickItem;
        private $delayClickItem;
        private $addedToStage;
    }
}
declare namespace fgui {
    class RelationItem {
        protected $owner: GObject;
        protected $target: GObject;
        protected $targetX: number;
        protected $targetY: number;
        protected $targetWidth: number;
        protected $targetHeight: number;
        protected $defs: RelationDef[];
        constructor(owner: GObject);
        readonly owner: GObject;
        target: GObject;
        add(relationType: number, usePercent: boolean): void;
        private internalAdd;
        remove(relationType?: number): void;
        copyFrom(source: RelationItem): void;
        dispose(): void;
        readonly isEmpty: boolean;
        applyOnSelfResized(dWidth: number, dHeight: number): void;
        private applyOnXYChanged;
        private applyOnSizeChanged;
        private addRefTarget;
        private releaseRefTarget;
        private $targetXYChanged;
        private $targetSizeChanged;
        private $targetSizeWillChange;
    }
    class RelationDef {
        percent: boolean;
        type: number;
        copyFrom(source: RelationDef): void;
    }
}
declare namespace fgui {
    class Relations {
        protected $owner: GObject;
        protected $items: RelationItem[];
        sizeDirty: boolean;
        $dealing: GObject;
        private static RELATION_NAMES;
        constructor(owner: GObject);
        add(target: GObject, relationType: number, usePercent?: boolean): void;
        addItems(target: GObject, sidePairs: string): void;
        remove(target: GObject, relationType?: number): void;
        contains(target: GObject): boolean;
        clearFor(target: GObject): void;
        clearAll(): void;
        copyFrom(source: Relations): void;
        dispose(): void;
        onOwnerSizeChanged(dWidth: number, dHeight: number): void;
        ensureRelationsSizeCorrect(): void;
        readonly empty: boolean;
        setup(xml: utils.XmlNode): void;
    }
}
declare namespace fgui {
    class ScrollPane extends PIXI.utils.EventEmitter {
        private static $easeTypeFunc;
        private $owner;
        private $maskContainer;
        private $container;
        private $alignContainer;
        private $scrollType;
        private $scrollSpeed;
        private $mouseWheelSpeed;
        private $decelerationRate;
        private $scrollBarMargin;
        private $bouncebackEffect;
        private $touchEffect;
        private $scrollBarDisplayAuto;
        private $vScrollNone;
        private $hScrollNone;
        private $needRefresh;
        private $refreshBarAxis;
        private $displayOnLeft;
        private $snapToItem;
        private $displayOnDemand;
        private $mouseWheelEnabled;
        private $pageMode;
        private $inertiaDisabled;
        private $xPos;
        private $yPos;
        private $viewSize;
        private $contentSize;
        private $overlapSize;
        private $pageSize;
        private $containerPos;
        private $beginTouchPos;
        private $lastTouchPos;
        private $lastTouchGlobalPos;
        private $velocity;
        private $velocityScale;
        private $lastMoveTime;
        private $isHoldAreaDone;
        private $aniFlag;
        private $scrollBarVisible;
        private $headerLockedSize;
        private $footerLockedSize;
        private $refreshEventDispatching;
        private $tweening;
        private $tweenTime;
        private $tweenDuration;
        private $tweenStart;
        private $tweenChange;
        private $pageController;
        private $hzScrollBar;
        private $vtScrollBar;
        private $header;
        private $footer;
        private $isDragging;
        static draggingPane: ScrollPane;
        private static $gestureFlag;
        private static sHelperPoint;
        private static sHelperRect;
        private static sEndPos;
        private static sOldChange;
        static TWEEN_DEFAULT_DURATION: number;
        static TWEEN_MANUALLY_SET_DURATION: number;
        static PULL_DIST_RATIO: number;
        $loop: number;
        constructor(owner: GComponent, scrollType: number, scrollBarMargin: utils.Margin, scrollBarDisplay: number, flags: number, vtScrollBarRes: string, hzScrollBarRes: string, headerRes: string, footerRes: string);
        dispose(): void;
        readonly owner: GComponent;
        readonly horzScrollBar: GScrollBar;
        readonly vertScrollBar: GScrollBar;
        readonly header: GComponent;
        readonly footer: GComponent;
        bouncebackEffect: boolean;
        touchEffect: boolean;
        scrollSpeed: number;
        snapToItem: boolean;
        mouseWheelEnabled: boolean;
        decelerationRate: number;
        percX: number;
        setPercX(value: number, ani?: boolean): void;
        percY: number;
        setPercY(value: number, ani?: boolean): void;
        posX: number;
        setPosX(value: number, ani?: boolean): void;
        posY: number;
        setPosY(value: number, ani?: boolean): void;
        readonly contentWidth: number;
        readonly contentHeight: number;
        viewWidth: number;
        viewHeight: number;
        currentPageX: number;
        currentPageY: number;
        readonly isBottomMost: boolean;
        readonly isRightMost: boolean;
        pageController: controller.Controller;
        readonly scrollingPosX: number;
        readonly scrollingPosY: number;
        scrollTop(ani?: boolean): void;
        scrollBottom(ani?: boolean): void;
        scrollUp(ratio?: number, ani?: boolean): void;
        scrollDown(ratio?: number, ani?: boolean): void;
        scrollLeft(ratio?: number, ani?: boolean): void;
        scrollRight(ratio?: number, ani?: boolean): void;
        scrollToView(target: Object, ani?: boolean, snapToFirst?: boolean): void;
        isChildInView(obj: GObject): boolean;
        cancelDragging(): void;
        readonly isDragging: boolean;
        lockHeader(size: number): void;
        lockFooter(size: number): void;
        onOwnerSizeChanged(): void;
        handleControllerChanged(c: controller.Controller): void;
        private updatePageController;
        adjustMaskContainer(): void;
        setSize(width: number, height: number): void;
        setContentSize(w: number, h: number): void;
        changeContentSizeOnScrolling(deltaWidth: number, deltaHeight: number, deltaPosX: number, deltaPosY: number): void;
        private handleSizeChanged;
        private posChanged;
        private refresh;
        private refresh2;
        private syncScrollBar;
        private $mouseDown;
        private $mouseMove;
        private $mouseUp;
        private $click;
        private $mouseWheel;
        private $rollOver;
        private $rollOut;
        private showScrollBar;
        private setScrollBarVisible;
        private getLoopPartSize;
        private loopCheckingCurrent;
        private loopCheckingTarget;
        private loopCheckingTarget2;
        private loopCheckingNewPos;
        private alignPosition;
        private alignByPage;
        private updateTargetAndDuration;
        private updateTargetAndDuration2;
        private fixDuration;
        private killTween;
        private checkRefreshBar;
        private tweenUpdate;
        private runTween;
    }
}
declare namespace fgui {
    const enum TransitionActionType {
        XY = 0,
        Size = 1,
        Scale = 2,
        Pivot = 3,
        Alpha = 4,
        Rotation = 5,
        Color = 6,
        Animation = 7,
        Visible = 8,
        Sound = 9,
        Transition = 10,
        Shake = 11,
        ColorFilter = 12,
        Skew = 13,
        Unknown = 14
    }
    interface TransitionPlaySetting {
        onComplete?: (...args: any[]) => void;
        onCompleteObj?: any;
        onCompleteParam?: any;
        times: number;
        delay: number;
    }
    class Transition {
        name: string;
        autoPlayRepeat: number;
        autoPlayDelay: number;
        private $owner;
        private $ownerBaseX;
        private $ownerBaseY;
        private $items;
        private $totalTimes;
        private $totalTasks;
        private $playing;
        private $onComplete;
        private $onCompleteObj;
        private $onCompleteParam;
        private $options;
        private $reversed;
        private $maxTime;
        private $autoPlay;
        static OPTION_IGNORE_DISPLAY_CONTROLLER: number;
        static OPTION_AUTO_STOP_DISABLED: number;
        static OPTION_AUTO_STOP_AT_END: number;
        private static FRAME_RATE;
        constructor(owner: GComponent);
        private $ownerVisibleChanged;
        autoPlay: boolean;
        changeRepeat(value: number): void;
        play(...args: any[]): void;
        playReverse(...args: any[]): void;
        private $play;
        stop(setToComplete?: boolean, processCallback?: boolean): void;
        private stopItem;
        dispose(): void;
        readonly playing: boolean;
        setValue(label: string, ...args: any[]): void;
        setHook(label: string, callback: () => void, thisObj?: any): void;
        clearHooks(): void;
        setTarget(label: string, newTarget: GObject): void;
        setDuration(label: string, value: number): void;
        updateFromRelations(targetId: string, dx: number, dy: number): void;
        private internalPlay;
        private prepareValue;
        private startTween;
        private $delayCall;
        private $delayCall2;
        private $tweenUpdate;
        private $tweenComplete;
        private $tweenRepeatComplete;
        private disposeTween;
        private $playTransComplete;
        private checkAllComplete;
        private applyValue;
        $shakeItem(item: TransitionItem, elapsedMS: number): void;
        setup(xml: utils.XmlNode): void;
        private decodeValue;
    }
    class TransitionItem {
        time: number;
        targetId: string;
        type: number;
        duration: number;
        value: TransitionValue;
        startValue: TransitionValue;
        endValue: TransitionValue;
        easeType: (t: number) => number;
        repeat: number;
        yoyo: boolean;
        tween: boolean;
        label: string;
        label2: string;
        hook: () => void;
        hookObj: any;
        hook2: () => void;
        hook2Obj: any;
        tweenTimes: number;
        tweener: createjs.Tween;
        completed: boolean;
        target: GObject;
        filterCreated: boolean;
        lockToken: number;
        constructor();
        $shake(trans: Transition, elapsedMS: number): void;
    }
    class TransitionValue {
        f1: number;
        f2: number;
        f3: number;
        f4: number;
        i: number;
        c: number;
        b: boolean;
        s: string;
        b1: boolean;
        b2: boolean;
    }
}
declare namespace fgui {
    class Window extends GComponent {
        private $contentPane;
        private $modalWaitPane;
        private $closeButton;
        private $dragArea;
        private $contentArea;
        private $frame;
        private $modal;
        private $uiSources;
        private $inited;
        private $loading;
        protected $requestingCmd: number;
        bringToFrontOnClick: boolean;
        constructor();
        addUISource(source: IUISource): void;
        contentPane: GComponent;
        readonly frame: GComponent;
        closeButton: GObject;
        dragArea: GObject;
        contentArea: GObject;
        show(): void;
        showOn(root: GRoot): void;
        hide(): void;
        hideImmediately(): void;
        centerOn(r: GRoot, autoUpdate?: boolean): void;
        toggleVisible(): void;
        readonly isShowing: boolean;
        readonly isTop: boolean;
        modal: boolean;
        bringToFront(): void;
        showModalWait(msg?: string, cmd?: number): void;
        protected layoutModalWaitPane(msg?: string): void;
        closeModalWait(cmd?: number): boolean;
        readonly modalWaiting: boolean;
        init(): void;
        protected onInit(): void;
        protected onShown(): void;
        protected onHide(): void;
        protected doShowAnimation(): void;
        protected doHideAnimation(): void;
        private $uiLoadComplete;
        private $init;
        dispose(): void;
        protected closeEventHandler(evt: PIXI.InteractionEvent): void;
        private $onShown;
        private $onHidden;
        private $mouseDown;
        private $dragStart;
    }
}
declare namespace PIXI.extras {
    class InteractionManager extends PIXI.InteractionManager {
        stageRotation: number;
        stageScaleX: number;
        stageScaleY: number;
        constructor(renderer: PIXI.Renderer, options?: InteractionManagerOptions);
        mapPositionToPoint(point: PIXI.Point, x: number, y: number): void;
    }
}
declare namespace PIXI.extras {
    class NineSlicePlane extends PIXI.NineSlicePlane {
        protected $flipX: boolean;
        protected $flipY: boolean;
        updateHorizontalVertices(): void;
        updateVerticalVertices(): void;
        _refresh(): void;
        flipX: boolean;
        flipY: boolean;
    }
}
declare namespace PIXI.extras {
    class Sprite extends PIXI.Sprite {
        protected $flipX: boolean;
        protected $flipY: boolean;
        protected $frameId: string;
        protected static $cachedTexturePool: {
            [key: string]: {
                refCount: number;
                texture: PIXI.Texture;
            };
        };
        constructor(frameId?: string, tex?: PIXI.Texture);
        flipX: boolean;
        flipY: boolean;
        private combineCacheId;
        private getTextureFromCache;
        private tryRemoveTextureCache;
        private createFlippedTexture;
        private updateUvs;
        destroy(options?: PIXI.IDestroyOptions | boolean): void;
    }
}
declare namespace PIXI.extras {
    class TilingSprite extends PIXI.TilingSprite {
        protected $flipX: boolean;
        protected $flipY: boolean;
        protected $frameId: string;
        protected static $cachedTexturePool: {
            [key: string]: {
                refCount: number;
                texture: PIXI.Texture;
            };
        };
        constructor(frameId?: string, tex?: PIXI.Texture);
        flipX: boolean;
        flipY: boolean;
        private combineCacheId;
        private getTextureFromCache;
        private tryRemoveTextureCache;
        private createFlippedTexture;
        private updateUvs;
        destroy(options?: PIXI.IDestroyOptions | boolean): void;
    }
}
declare namespace fgui {
    class UIConfig {
        static defaultFont: string;
        static windowModalWaiting: string;
        static globalModalWaiting: string;
        static modalLayerColor: number;
        static modalLayerAlpha: number;
        static horizontalScrollBar: string;
        static verticalScrollBar: string;
        static defaultScrollSpeed: number;
        static defaultScrollBarDisplay: number;
        static defaultScrollTouchEffect: boolean;
        static defaultScrollBounceEffect: boolean;
        static defaultScrollDecelerationRate: number;
        static popupMenu: string;
        static popupMenuSeperator: string;
        static loaderErrorSign: string;
        static tooltipsWin: string;
        static defaultComboBoxVisibleItemCount: number;
        static touchScrollSensitivity: number;
        static touchDragSensitivity: number;
        static bringWindowToFrontOnClick: boolean;
    }
}
declare namespace fgui.controller {
    class Action {
        fromPage: string[];
        toPage: string[];
        static create(type: string): Action;
        execute(controller: Controller, prevPage: string, curPage: string): void;
        protected enter(controller: Controller): void;
        protected leave(controller: Controller): void;
        setup(xml: utils.XmlNode): void;
    }
}
declare namespace fgui.controller {
    class ChangePageAction extends Action {
        objectId: string;
        controllerName: string;
        targetPage: string;
        protected enter(controller: Controller): void;
        setup(xml: utils.XmlNode): void;
    }
}
declare namespace fgui {
    class StateChangeEvent {
        static CHANGED: string;
    }
}
declare namespace fgui.controller {
    class Controller extends PIXI.utils.EventEmitter {
        private $name;
        private $selectedIndex;
        private $previousIndex;
        private $pageIds;
        private $pageNames;
        private $actions;
        $parent: GComponent;
        $autoRadioGroupDepth: boolean;
        $updating: boolean;
        private static $nextPageId;
        constructor();
        name: string;
        readonly parent: GComponent;
        selectedIndex: number;
        setSelectedIndex(value?: number): void;
        readonly previsousIndex: number;
        selectedPage: string;
        setSelectedPage(value: string): void;
        readonly previousPage: string;
        readonly pageCount: number;
        getPageName(index?: number): string;
        addPage(name?: string): void;
        addPageAt(name: string, index?: number): void;
        removePage(name: string): void;
        removePageAt(index?: number): void;
        clearPages(): void;
        hasPage(aName: string): boolean;
        getPageIndexById(aId: string): number;
        getPageIdByName(aName: string): string;
        getPageNameById(aId: string): string;
        getPageId(index?: number): string;
        selectedPageId: string;
        oppositePageId: string;
        readonly previousPageId: string;
        executeActions(): void;
        setup(xml: utils.XmlNode): void;
    }
}
declare namespace fgui.controller {
    class PageOption {
        private $controller;
        private $id;
        controller: Controller;
        name: string;
        index: number;
        clear(): void;
        id: string;
    }
}
declare namespace fgui.utils {
    type AttributeDictionary = {
        [key: string]: string;
    };
    class XmlNode {
        context: Node;
        nodeName: string;
        type: number;
        text: string;
        private $children;
        private $attributes;
        constructor(ele: Node);
        readonly children: XmlNode[];
        readonly attributes: AttributeDictionary;
        getChildNodes(matchName?: string): XmlNode[];
        private __parseChildNodes;
        private __parseNodeAttributes;
    }
    class XmlParser {
        private static $parser;
        static tryParse(xmlstring: string, mimeType?: any): XmlNode;
        static getXmlRoot(xml: XmlNode): XmlNode;
    }
}
declare namespace fgui.controller {
    class PlayTransitionAction extends Action {
        transitionName: string;
        repeat: number;
        delay: number;
        stopOnExit: boolean;
        private $currentTransition;
        protected enter(controller: Controller): void;
        protected leave(controller: Controller): void;
        setup(xml: utils.XmlNode): void;
    }
}
declare namespace fgui {
    class BMGlyph {
        x: number;
        y: number;
        offsetX: number;
        offsetY: number;
        width: number;
        height: number;
        advance: number;
        lineHeight: number;
        channel: number;
        texture: PIXI.Texture;
    }
}
declare namespace fgui {
    type GlyphDictionary = {
        [key: string]: BMGlyph;
    };
    class BitmapFont {
        id: string;
        size: number;
        ttf: boolean;
        glyphs: GlyphDictionary;
        resizable: boolean;
        colorable: boolean;
        constructor();
    }
}
declare namespace fgui {
    class FillSprite extends PIXI.Sprite {
        protected _fillMode: TextureFillMode;
        protected _fillBegin: TextureFillBegin;
        protected _fillDir: TextureFillDirection;
        protected _fillAmount: number;
        protected _flip: FlipType;
        protected _percent: number;
        constructor(texture?: PIXI.Texture);
        flip: FlipType;
        fillAmount: number;
        fillBegin: TextureFillBegin;
        fillMode: TextureFillMode;
        fillDirection: TextureFillDirection;
        private checkAndFixFillBegin;
        amount: number;
    }
}
declare namespace fgui {
    class Frame {
        addDelay: number;
        texture: PIXI.Texture;
    }
}
declare namespace fgui.utils {
    class StringUtil {
        static encodeHTML(str: string): string;
        static getFileName(source: string): string;
        static startsWith(source: string, str: string, ignoreCase?: boolean): boolean;
        static endsWith(source: string, str: string, ignoreCase?: boolean): boolean;
        static trim(targetString: string): string;
        static trimLeft(targetString: string): string;
        static trimRight(targetString: string): string;
        static convertToHtmlColor(argb: number, hasAlpha?: boolean): string;
        static convertFromHtmlColor(str: string, hasAlpha?: boolean): number;
    }
}
declare namespace fgui.utils {
    class Binder {
        static create<T extends Function>(func: Function, context: any, ...args: any[]): T;
    }
}
declare namespace fgui {
    class FocusEvent {
        static CHANGED: string;
    }
}
declare namespace fgui {
    class InputElement extends PIXI.utils.EventEmitter {
        private htmlInput;
        private $requestToShow;
        private inputElement;
        private inputDiv;
        private $scaleX;
        private $scaleY;
        private textValue;
        private colorValue;
        protected $textfield: GTextInput;
        constructor(tf: GTextInput);
        $addToStage(): void;
        private initElement;
        readonly textField: GTextField;
        $show(): void;
        onBlurHandler(): void;
        $hide(): void;
        text: string;
        setColor(value: number): void;
        $onBlur(): void;
        onInputHandler(): void;
        private setAreaHeight;
        private getVAlignFactor;
        onClickHandler(e: Event): void;
        onDisconnect(): void;
        private setElementStyle;
        private $attrsCache;
        setAttribute(name: string, value: string): void;
        getAttribute(name: string): string;
        $removeFromStage(): void;
        resetInput(): void;
    }
}
declare namespace fgui {
    class HTMLInput {
        private $input;
        private $singleLine;
        private $multiLine;
        private $curEle;
        $wrapper: HTMLDivElement;
        private $delegateDiv;
        private $canvas;
        $requestToShow: boolean;
        $scaleX: number;
        $scaleY: number;
        static isTyping: boolean;
        private constructor();
        private static $instance;
        static readonly inst: HTMLInput;
        initialize(container: HTMLElement, view: HTMLCanvasElement): void;
        isInputOn(): boolean;
        private canvasClickHandler;
        isInputShown(): boolean;
        isCurrentInput(input: InputElement): boolean;
        private initDomPos;
        private setTransform;
        updateSize(sx: number, sy: number): void;
        private initInputElement;
        show(): void;
        disconnect(ele: InputElement): void;
        clearAttributes(obj: any): void;
        clearInputElement(): void;
        requestInput(ele: InputElement): HTMLInputElement | HTMLTextAreaElement;
    }
}
declare namespace fgui {
    interface IUIObject {
        UIOwner: GObject;
    }
    let isUIObject: (obj: any) => obj is IUIObject;
}
declare namespace fgui {
    interface IUISource {
        fileName: string;
        loaded: boolean;
        load(callback: () => void, thisObj: any): void;
    }
}
declare namespace fgui {
    interface MovieClipSettings {
        startFrame?: number;
        endFrame?: number;
        repeatCount?: number;
        loopEndAt?: number;
        endCallback?: (target?: MovieClip) => void;
        endCallbackContext?: any;
        [key: string]: any;
    }
    class DefaultMovieClipSettings implements MovieClipSettings {
        startFrame: number;
        endFrame: number;
        repeatCount: number;
        loopEndAt: number;
        endCallback: (target?: MovieClip) => void;
        endCallbackContext: any;
        mix(other: MovieClipSettings): MovieClipSettings;
    }
}
declare namespace fgui {
    class MovieClipData {
        reachesEnd: boolean;
        reversed: boolean;
        repeatedCount: number;
        private $curFrame;
        private $lastTime;
        private $curFrameDelay;
        constructor();
        update(mc: MovieClip): void;
        currentFrame: number;
        rewind(): void;
        reset(): void;
        copy(src: MovieClipData): void;
    }
}
declare namespace fgui.utils {
    class NumberUtil {
        static RADIAN: number;
        static clamp(value: number, min: number, max: number): number;
        static clamp01(value: number): number;
        static isNumber(n: any): n is number;
        static sign(x: number): number;
        static angleToRadian(n: number): number;
        static lerp(s: number, e: number, p: number): number;
    }
}
declare namespace fgui {
    class MovieClip extends PIXI.Sprite implements IUIObject {
        interval: number;
        swing: boolean;
        repeatDelay: number;
        private $playing;
        private $frameCount;
        private $frames;
        private $currentFrame;
        private $status;
        private $settings;
        private data;
        UIOwner: GObject;
        constructor(owner: GObject);
        frames: Frame[];
        readonly frameCount: number;
        boundsRect: PIXI.Rectangle;
        currentFrame: number;
        playing: boolean;
        setPlaySettings(...args: any[]): void;
        private update;
        private $playEnd;
        private setFrame;
        private added;
        private removed;
        destroy(): void;
    }
}
declare namespace fgui {
    class UIContainer extends PIXI.Container implements IUIObject {
        protected $scrollRect: PIXI.Rectangle;
        protected $rectMask: PIXI.Graphics;
        UIOwner: GObject;
        constructor(owner?: GObject);
        scrollRect: PIXI.Rectangle;
    }
}
declare namespace fgui {
    class UIImage extends PIXI.Container implements IUIObject {
        UIOwner: GObject;
        protected $disp: PIXI.extras.TilingSprite | PIXI.extras.NineSlicePlane | PIXI.extras.Sprite;
        constructor(owner?: GObject);
        $initDisp(item?: PackageItem): void;
        tint: number;
        height: number;
        width: number;
        texture: PIXI.Texture;
        scale9Grid: PIXI.Rectangle;
        tiledSlices: number;
        flipX: boolean;
        flipY: boolean;
        destroy(options?: PIXI.IDestroyOptions | boolean): void;
    }
}
declare namespace fgui {
    class UISprite extends PIXI.Graphics implements IUIObject {
        UIOwner: GObject;
        constructor(owner?: GObject);
    }
}
declare namespace fgui.utils {
    class DOMEventManager extends PIXI.utils.EventEmitter {
        static inst: DOMEventManager;
        constructor();
        private notifyResizeEvents;
        private onMouseWheel;
        private retEvent;
        private lowestDelta;
        private nullLowestDeltaTimeout;
        private nullLowestDelta;
        private $pressedKeys;
        private $releasedKeys;
        private $downKeys;
        isKeyDown(key: number): boolean;
        isKeyPressed(key: number): boolean;
        isKeyReleased(key: number): boolean;
        private onWindowKeyDown;
        private onWindowKeyUp;
    }
}
declare namespace fgui {
    const enum StageOrientation {
        AUTO = "auto",
        PORTRAIT = "portrait",
        LANDSCAPE = "landscape"
    }
    const enum StageScaleMode {
        NO_SCALE = "noScale",
        SHOW_ALL = "showAll",
        NO_BORDER = "noBorder",
        EXACT_FIT = "exactFit",
        FIXED_WIDTH = "fixedWidth",
        FIXED_HEIGHT = "fixedHeight",
        FIXED_AUTO = "fixedAuto"
    }
    const enum StageAlign {
        LEFT = 0,
        CENTER = 1,
        RIGHT = 2,
        TOP = 3,
        MIDDLE = 4,
        BOTTOM = 5
    }
    interface UIStageOptions {
        scaleMode?: StageScaleMode;
        orientation?: StageOrientation;
        resolution?: number;
        designWidth: number;
        designHeight: number;
        alignV?: StageAlign;
        alignH?: StageAlign;
        fallbackWidth?: number;
        fallbackHeight?: number;
        initliazeHTMLInput?: boolean;
        [key: string]: string | number | boolean;
    }
    class DefaultUIStageOptions implements UIStageOptions {
        scaleMode?: StageScaleMode;
        orientation?: StageOrientation;
        resolution?: number;
        designWidth: number;
        designHeight: number;
        alignV: StageAlign;
        alignH: StageAlign;
        fallbackWidth: number;
        fallbackHeight: number;
        initliazeHTMLInput: boolean;
        [key: string]: string | number | boolean;
    }
    class UIStage extends PIXI.utils.EventEmitter {
        protected $appContext: PIXI.Application;
        protected $appStage: PIXI.Container;
        protected $options: UIStageOptions;
        protected $width: number;
        protected $height: number;
        protected $scaleX: number;
        protected $scaleY: number;
        protected $canvasMatrix: PIXI.Matrix;
        offsetX: number;
        offsetY: number;
        private $sizeCalcer;
        constructor(app: PIXI.Application, stageOptions?: UIStageOptions);
        readonly orientation: StageOrientation;
        readonly stageWidth: number;
        readonly stageHeight: number;
        readonly applicationContext: PIXI.Application;
        readonly nativeStage: PIXI.Container;
        resolution: number;
        readonly scaleX: number;
        readonly scaleY: number;
        readonly designWidth: number;
        readonly designHeight: number;
        setDesignSize(width: number, height: number): void;
        protected calculateStageSize(scaleMode: string, screenWidth: number, screenHeight: number, contentWidth: number, contentHeight: number): {
            stageWidth: number;
            stageHeight: number;
            displayWidth: number;
            displayHeight: number;
        };
        updateScreenSize(): void;
        private formatData;
        dispose(): void;
    }
}
declare namespace fgui {
    class UITextField extends PIXI.Text implements IUIObject {
        UIOwner: GObject;
        protected $minHeight: number;
        protected $minHeightID: number;
        protected $width: number;
        protected $height: number;
        constructor(owner?: GObject);
        readonly minHeight: number;
        $updateMinHeight(): void;
        protected updateFrame(): void;
        private internalUpdateFrame;
        protected _onTextureUpdate(): void;
        width: number;
        height: number;
        textHeight: number;
        textWidth: number;
    }
}
declare namespace fgui {
    class DisplayObjectEvent {
        static XY_CHANGED: string;
        static SIZE_CHANGED: string;
        static VISIBLE_CHANGED: string;
        static SIZE_DELAY_CHANGE: string;
        static MOUSE_WHEEL: string;
    }
}
declare namespace fgui {
    class DragEvent {
        static START: string;
        static END: string;
        static MOVING: string;
        static DROP: string;
    }
}
declare namespace fgui {
    class GearEvent {
        static GEAR_STOP: string;
    }
}
declare namespace fgui {
    class ListEvent {
        static ItemClick: string;
    }
}
declare namespace fgui {
    class ScrollEvent {
        static SCROLL: string;
        static SCROLL_END: string;
        static PULL_DOWN_RELEASE: string;
        static PULL_UP_RELEASE: string;
    }
}
declare namespace fgui {
    class TextEvent {
        static LinkClick: string;
        static Change: string;
        static FocusIn: string;
        static FocusOut: string;
    }
}
declare namespace fgui {
    class DisplayListItem {
        packageItem: PackageItem;
        type: string;
        desc: utils.XmlNode;
        listItemCount: number;
        constructor(packageItem: PackageItem, type: string);
    }
}
declare namespace fgui {
    class PackageItem {
        owner: UIPackage;
        type: PackageItemType;
        id: string;
        name: string;
        width: number;
        height: number;
        file: string;
        decoded: boolean;
        scale9Grid: PIXI.Rectangle;
        scaleByTile: boolean;
        tiledSlices: number;
        texture: PIXI.Texture;
        interval: number;
        repeatDelay: number;
        swing: boolean;
        frames: Frame[];
        componentData: utils.XmlNode;
        displayList: DisplayListItem[];
        bitmapFont: BitmapFont;
        load(): AssetTypes;
        toString(): string;
    }
}
declare namespace fgui {
    class UIObjectFactory {
        private static packageItemExtensions;
        private static loaderExtension;
        static setPackageItemExtension(url: string, type: {
            new (): GComponent;
        }): void;
        static setLoaderExtension(type: {
            new (): GLoader;
        }): void;
        static newObject(pi: PackageItem): GObject;
        static newObjectDirectly(type: string): GObject;
    }
}
declare namespace fgui {
    type AssetTypes = PIXI.Texture | BitmapFont | Frame[] | utils.XmlNode | PIXI.LoaderResource;
    class UIPackage {
        private $id;
        private $name;
        private $resKey;
        private $items;
        private $itemsById;
        private $itemsByName;
        private $resData;
        private $customId;
        private $atlasConfigs;
        static $constructingObjects: number;
        private static $packageInstById;
        private static $packageInstByName;
        private static $bitmapFonts;
        private static $stringsSource;
        private static sep0;
        private static sep1;
        private static sep2;
        private static sep3;
        constructor();
        static getById(id: string): UIPackage;
        static getByName(name: string): UIPackage;
        static addPackage(resKey: string): UIPackage;
        static removePackage(packageId: string): void;
        static createObject(pkgName: string, resName: string, userClass?: {
            new (): GObject;
        }): GObject;
        static createObjectFromURL(url: string, userClass?: {
            new (): GObject;
        }): GObject;
        static getItemURL(pkgName: string, resName: string): string;
        static getItemByURL(url: string): PackageItem;
        static getBitmapFontByURL(url: string): BitmapFont;
        static setStringsSource(source: string): void;
        static normalizeURL(url: string): string;
        private create;
        private decompressPackage;
        dispose(): void;
        readonly id: string;
        readonly name: string;
        customId: string;
        createObject(resName: string, userClass?: {
            new (): GObject;
        }): GObject;
        internalCreateObject(item: PackageItem, userClass?: {
            new (): GObject;
        }): GObject;
        getItemById(itemId: string): PackageItem;
        getItemByName(resName: string): PackageItem;
        getItemAssetByName(resName: string): AssetTypes;
        private createSpriteTexture;
        getItemAsset(item: PackageItem): AssetTypes;
        private loadComponentChildren;
        private getResDescriptor;
        private loadComponentTranslation;
        private loadMovieClip;
        private loadFont;
    }
}
declare namespace fgui.utils {
    class AssetLoader extends PIXI.Loader {
        protected static $resources: any;
        constructor(baseUrl?: string, concurrency?: number);
        protected _onComplete(): void;
        static readonly resourcesPool: any;
        static destroyResource(key: string): void;
        static addResources(res: any): void;
    }
}
declare namespace fgui.utils {
    class ColorMatrix {
        protected _raw: number[];
        protected h: number;
        protected s: number;
        protected c: number;
        protected b: number;
        constructor(brightness?: number, contrast?: number, saturation?: number, hue?: number);
        static DELTA_INDEX: number[];
        static IDENTITY_MATRIX: number[];
        static LENGTH: number;
        readonly hue: number;
        readonly brightness: number;
        readonly contrast: number;
        readonly saturation: number;
        setColor(brightness: number, contrast: number, saturation: number, hue: number): ColorMatrix;
        reset(): ColorMatrix;
        adjustColor(brightness: number, contrast: number, saturation: number, hue: number): ColorMatrix;
        adjustBrightness(value: number): ColorMatrix;
        adjustContrast(value: number): ColorMatrix;
        adjustSaturation(value: number): ColorMatrix;
        adjustHue(value: number): ColorMatrix;
        concat(matrix: number[]): ColorMatrix;
        clone(): ColorMatrix;
        toArray(): number[];
        copy(matrix: number[]): ColorMatrix;
        protected _multiplyMatrix(matrix: number[]): void;
        private _cleanValue;
        private _fixMatrix;
    }
}
declare namespace fgui.utils {
    class DragIndicator {
        protected $agent: GLoader;
        protected $sourceData: any;
        protected $sourceObject: GObject;
        constructor();
        readonly dragAgent: GObject;
        readonly isDragging: boolean;
        readonly sourceObject: GObject;
        startDrag(source: GObject, icon: string, sourceData: any, touchPointID?: number): void;
        cancel(): void;
        private $dragEnd;
    }
}
declare namespace fgui.utils {
    class Margin {
        left: number;
        right: number;
        top: number;
        bottom: number;
        parse(str: string): void;
        copy(source: Margin): void;
    }
}
declare namespace fgui.utils {
    class RawByte {
        private static inRange;
        static decodeUTF8(data: Uint8Array): string;
    }
}
declare namespace fgui.utils {
    type UBBParserHandlerMap = {
        [key: string]: (tag: string, end: boolean, attr: string) => string;
    };
    class UBBParser {
        private $text;
        private $readPos;
        protected $handlers: UBBParserHandlerMap;
        smallFontSize: number;
        normalFontSize: number;
        largeFontSize: number;
        defaultImgWidth: number;
        defaultImgHeight: number;
        static inst: UBBParser;
        constructor();
        protected onTag_URL(tagName: string, end: boolean, attr: string): string;
        protected onTag_IMG(tagName: string, end: boolean, attr: string): string;
        protected onTag_Simple(tagName: string, end: boolean, attr: string): string;
        protected onTag_COLOR(tagName: string, end: boolean, attr: string): string;
        protected onTag_FONT(tagName: string, end: boolean, attr: string): string;
        protected onTag_SIZE(tagName: string, end: boolean, attr: string): string;
        protected getTagText(remove?: boolean): string;
        parseStyle(text: string): TextBlock[];
    }
}
import fairygui = fgui;