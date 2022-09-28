export class LoadingView extends fgui.GComponent {
    
    public constructor() {
        super();
        this.createView();
    }
    
    private textField:fgui.GTextField;
    
    private createView():void {
        this.textField = new fgui.GTextField();
        this.textField.width = 500;
        this.textField.fontSize = 26;
        this.textField.x = this.textField.width * .5;
        this.textField.y = this.textField.height * .5 - 40;
        this.addChild(this.textField);

        this.textField.addRelation(this, fgui.RelationType.Center_Center);
        this.textField.addRelation(this, fgui.RelationType.Middle_Middle);
    }
    
    public setProgress(p:number):void {
        this.textField.text = `Loading...${Math.round(p)}%`;
    }
}
