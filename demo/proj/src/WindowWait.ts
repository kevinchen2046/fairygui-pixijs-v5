import { WindowA } from "./WindowA"

export class WindowWait extends WindowA {

    private delayTimer:number;

    public constructor() {
        super();
    }
    
    protected onShown():void
    {
        super.onShown();
        this.contentPane.getChild("n5").click(this.loadData, this);
    }

    private loadData():void {
        this.showModalWait("Loading data...");

        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(() => {
            this.closeModalWait();
        }, 3000);
    }

    protected onHide():void {
        clearTimeout(this.delayTimer);
        this.closeModalWait();
        this.contentPane.getChild("n5").removeClick(this.loadData, this);
    }
}