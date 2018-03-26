"use strict";
var DoublePendulumApp = /** @class */ (function () {
    function DoublePendulumApp() {
        var _this = this;
        this.g = 0.5;
        this.r1 = 100;
        this.r2 = 100;
        this.m1 = 10;
        this.m2 = 10;
        this.a1 = Math.PI / 2;
        this.a2 = Math.PI;
        this.a1Vel = 0;
        this.a2Vel = 0;
        this.a1Acc = 0;
        this.a2Acc = 0;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.Render = function () {
            if (_this.Ctx === null) {
                window.alert("failed to create canvas and context!");
                return;
            }
            var num1 = -_this.g * (2 * _this.m1 + _this.m2) * Math.sin(_this.a1);
            var num2 = -_this.m2 * _this.g * Math.sin(_this.a1 - 2 * _this.a2);
            var num3 = -2 * Math.sin(_this.a1 - _this.a2) * _this.m2;
            var num4 = _this.a2Vel * _this.a2Vel * _this.r2 + _this.a1Vel * _this.a1Vel * _this.r1 * Math.cos(_this.a1 - _this.a2);
            var den = _this.r1 * (2 * _this.m1 + _this.m2 - _this.m2 * Math.cos(2 * _this.a1 - 2 * _this.a2));
            _this.a1Acc = (num1 + num2 + num3 * num4) / den;
            num1 = 2 * Math.sin(_this.a1 - _this.a2);
            num2 = _this.a1Vel * _this.a1Vel * _this.r1 * (_this.m1 + _this.m2) + _this.g * (_this.m1 + _this.m2) * Math.cos(_this.a1) + _this.a2Vel * _this.a2Vel * _this.r2 * _this.m2 * Math.cos(_this.a1 - _this.a2);
            den = _this.r2 * (2 * _this.m1 + _this.m2 - _this.m2 * Math.cos(2 * _this.a1 - 2 * _this.a2));
            _this.a2Acc = (num1 * num2) / den;
            _this.Ctx.fillStyle = "white";
            _this.Ctx.fillRect(-_this.Container.width / 2, -_this.Container.height / 2, _this.Container.width, _this.Container.height);
            _this.Ctx.strokeStyle = "black";
            _this.Ctx.fillStyle = "black";
            _this.x1 = _this.r1 * Math.sin(_this.a1);
            _this.y1 = _this.r1 * Math.cos(_this.a1);
            _this.Ctx.beginPath();
            _this.Ctx.moveTo(0, 0);
            _this.Ctx.lineTo(_this.x1, _this.y1);
            _this.Ctx.closePath();
            _this.Ctx.stroke();
            _this.Ctx.beginPath();
            _this.Ctx.arc(_this.x1, _this.y1, _this.m1, 0, 2 * Math.PI);
            _this.Ctx.fill();
            _this.Ctx.closePath();
            _this.Ctx.stroke();
            _this.x2 = _this.x1 + _this.r2 * Math.sin(_this.a2);
            _this.y2 = _this.y1 + _this.r2 * Math.cos(_this.a2);
            _this.Ctx.beginPath();
            _this.Ctx.moveTo(_this.x1, _this.y1);
            _this.Ctx.lineTo(_this.x2, _this.y2);
            _this.Ctx.closePath();
            _this.Ctx.stroke();
            _this.Ctx.beginPath();
            _this.Ctx.arc(_this.x2, _this.y2, _this.m2, 0, 2 * Math.PI);
            _this.Ctx.fill();
            _this.Ctx.closePath();
            _this.a1Vel += _this.a1Acc;
            _this.a2Vel += _this.a2Acc;
            // damping if you want.
            // this.a1Vel *= 0.9;
            // this.a2Vel *= 0.9;
            _this.a1 += _this.a1Vel;
            _this.a2 += _this.a2Vel;
            requestAnimationFrame(_this.Render);
        };
        this.Container = document.createElement('canvas');
        this.Ctx = this.Container.getContext("2d");
        this.Container.width = 800;
        this.Container.height = 600;
        if (this.Ctx === null) {
            window.alert("failed to create canvas and context!");
            return;
        }
        this.Ctx.translate(this.Container.width / 2, this.Container.height / 2);
        this.Render();
    }
    return DoublePendulumApp;
}());
window.onload = function () {
    document.body.appendChild(new DoublePendulumApp().Container);
};
