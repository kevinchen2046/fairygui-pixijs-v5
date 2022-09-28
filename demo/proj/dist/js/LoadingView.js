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
    exports.LoadingView = void 0;
    var LoadingView = /** @class */ (function (_super) {
        __extends(LoadingView, _super);
        function LoadingView() {
            var _this = _super.call(this) || this;
            _this.createView();
            return _this;
        }
        LoadingView.prototype.createView = function () {
            this.textField = new fgui.GTextField();
            this.textField.width = 500;
            this.textField.fontSize = 26;
            this.textField.x = this.textField.width * .5;
            this.textField.y = this.textField.height * .5 - 40;
            this.addChild(this.textField);
            this.textField.addRelation(this, 3 /* fgui.RelationType.Center_Center */);
            this.textField.addRelation(this, 10 /* fgui.RelationType.Middle_Middle */);
        };
        LoadingView.prototype.setProgress = function (p) {
            this.textField.text = "Loading...".concat(Math.round(p), "%");
        };
        return LoadingView;
    }(fgui.GComponent));
    exports.LoadingView = LoadingView;
});
//# sourceMappingURL=LoadingView.js.map