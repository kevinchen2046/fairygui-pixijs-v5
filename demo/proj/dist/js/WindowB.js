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
    exports.WindowB = void 0;
    var WindowB = /** @class */ (function (_super) {
        __extends(WindowB, _super);
        function WindowB() {
            return _super.call(this) || this;
        }
        WindowB.prototype.onInit = function () {
            this.contentPane = fgui.UIPackage.createObject("test", "windowB");
            this.center();
            this.setPivot(0.5, 0.5);
        };
        WindowB.prototype.doShowAnimation = function () {
            this.setScale(0.1, 0.1);
            createjs.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadOut).call(this.onShown, null, this);
        };
        WindowB.prototype.doHideAnimation = function () {
            createjs.Tween.get(this).to({ scaleX: .1, scaleY: .1 }, 300, createjs.Ease.backIn).call(this.hideImmediately, null, this);
        };
        WindowB.prototype.onShown = function () {
            this.contentPane.getTransition("t1").play();
        };
        WindowB.prototype.onHide = function () {
            this.contentPane.getTransition("t1").stop();
        };
        return WindowB;
    }(fgui.Window));
    exports.WindowB = WindowB;
});
//# sourceMappingURL=WindowB.js.map