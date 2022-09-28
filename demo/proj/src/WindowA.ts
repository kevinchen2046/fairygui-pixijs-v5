export class WindowA extends fgui.Window {
    public constructor() {
        super();
    }

    protected onInit(): void {
        this.contentPane = fgui.UIPackage.createObject("test", "windowA") as fgui.GComponent;
        this.center();
    }

    protected onShown(): void {
        let list: fgui.GList = this.contentPane.getChild("n6") as fgui.GList;
        list.removeChildrenToPool();
        for (let i: number = 0; i < 6; i++) {
            let item: fgui.GButton = list.addItemFromPool() as fgui.GButton;
            item.title = i.toString();
            item.icon = fgui.UIPackage.getItemURL("test", "r4");
        }
    }
}