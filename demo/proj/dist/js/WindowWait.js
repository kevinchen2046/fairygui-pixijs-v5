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
define(["require", "exports", "./WindowA"], function (require, exports, WindowA_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WindowWait = void 0;
    var WindowWait = /** @class */ (function (_super) {
        __extends(WindowWait, _super);
        function WindowWait() {
            return _super.call(this) || this;
        }
        WindowWait.prototype.onShown = function () {
            _super.prototype.onShown.call(this);
            this.contentPane.getChild("n5").click(this.loadData, this);
        };
        WindowWait.prototype.loadData = function () {
            var _this = this;
            this.showModalWait("Loading data...");
            clearTimeout(this.delayTimer);
            this.delayTimer = setTimeout(function () {
                _this.closeModalWait();
            }, 3000);
        };
        WindowWait.prototype.onHide = function () {
            clearTimeout(this.delayTimer);
            this.closeModalWait();
            this.contentPane.getChild("n5").removeClick(this.loadData, this);
        };
        return WindowWait;
    }(WindowA_1.WindowA));
    exports.WindowWait = WindowWait;
});
//# sourceMappingURL=WindowWait.js.map