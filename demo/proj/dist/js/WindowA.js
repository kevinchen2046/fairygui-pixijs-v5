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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WindowA = void 0;
    var WindowA = /** @class */ (function (_super) {
        __extends(WindowA, _super);
        function WindowA() {
            return _super.call(this) || this;
        }
        WindowA.prototype.onInit = function () {
            this.contentPane = fgui.UIPackage.createObject("test", "windowA");
            this.center();
        };
        WindowA.prototype.onShown = function () {
            var list = this.contentPane.getChild("n6");
            list.removeChildrenToPool();
            for (var i = 0; i < 6; i++) {
                var item = list.addItemFromPool();
                item.title = i.toString();
                item.icon = fgui.UIPackage.getItemURL("test", "r4");
            }
        };
        return WindowA;
    }(fgui.Window));
    exports.WindowA = WindowA;
});
//# sourceMappingURL=WindowA.js.map