namespace fgui {

    export class GearColor extends GearBase<IColorGear> {
        private $storage: { [key: string]: number };
        private $default: number = 0;

        public constructor(owner: GObject & IColorGear) {
            super(owner);
        }

        protected init(): void {
            if ("color" in this.$owner) {
                this.$default = this.$owner.color;
            } else if ("titleColor" in this.$owner) {
                this.$default = this.$owner["titleColor"];
            }
            this.$storage = {};
        }

        protected addStatus(pageId: string, value: string): void {
            if (value == "-")
                return;

            let col: number = utils.StringUtil.convertFromHtmlColor(value);
            if (pageId == null)
                this.$default = col;
            else
                this.$storage[pageId] = col;
        }

        public apply(): void {
            this.$owner.$gearLocked = true;

            let data: number = this.$storage[this.$controller.selectedPageId];
            let color = data != undefined ? Math.floor(data) : Math.floor(this.$default);
            if ("color" in this.$owner) {
                this.$owner.color = color
            } else if ("titleColor" in this.$owner) {
                (this.$owner as any)["titleColor"] = color;
            }
            this.$owner.$gearLocked = false;
        }

        public updateState(): void {
            if (this.$controller == null || this.$owner.$gearLocked || this.$owner.$inProgressBuilding)
                return;

            if ("color" in this.$owner) {
                this.$storage[this.$controller.selectedPageId] = this.$owner.color;
            } else if ("titleColor" in this.$owner) {
                this.$storage[this.$controller.selectedPageId] = this.$owner["titleColor"];
            }
        }
    }
}