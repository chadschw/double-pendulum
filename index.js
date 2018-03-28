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
        this.a2 = Math.PI / 2;
        this.a1Vel = 0;
        this.a2Vel = 0;
        this.a1Acc = 0;
        this.a2Acc = 0;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.mouseDown = false;
        this.Render = function () {
            if (!_this.mouseDown) {
                _this.CalcAccAndVel();
            }
            _this.RenderPendulum();
            // damping if you want.
            // this.a1Vel *= 0.9;
            // this.a2Vel *= 0.9;
            _this.x1 = _this.r1 * Math.sin(_this.a1);
            _this.y1 = _this.r1 * Math.cos(_this.a1);
            _this.x2 = _this.x1 + _this.r2 * Math.sin(_this.a2);
            _this.y2 = _this.y1 + _this.r2 * Math.cos(_this.a2);
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
        window.addEventListener("mousedown", function () {
            _this.mouseDown = true;
        });
        window.addEventListener("mouseup", function () {
            _this.mouseDown = false;
        });
        window.addEventListener("mousemove", function (e) {
            if (_this.mouseDown) {
                _this.a1 += e.movementX / 100;
                _this.a2 += e.movementY / 100;
                _this.a1Vel = 0;
                _this.a2Vel = 0;
                _this.a1Acc = 0;
                _this.a2Acc = 0;
            }
        });
        this.Ctx.translate(this.Container.width / 2, this.Container.height / 2);
        this.Ctx.font = "10px consolas";
        this.Render();
    }
    DoublePendulumApp.prototype.CalcAccAndVel = function () {
        var num1 = -this.g * (2 * this.m1 + this.m2) * Math.sin(this.a1);
        var num2 = -this.m2 * this.g * Math.sin(this.a1 - 2 * this.a2);
        var num3 = -2 * Math.sin(this.a1 - this.a2) * this.m2;
        var num4 = this.a2Vel * this.a2Vel * this.r2 + this.a1Vel * this.a1Vel * this.r1 * Math.cos(this.a1 - this.a2);
        var den = this.r1 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2));
        this.a1Acc = (num1 + num2 + num3 * num4) / den;
        num1 = 2 * Math.sin(this.a1 - this.a2);
        num2 = this.a1Vel * this.a1Vel * this.r1 * (this.m1 + this.m2) + this.g * (this.m1 + this.m2) * Math.cos(this.a1) + this.a2Vel * this.a2Vel * this.r2 * this.m2 * Math.cos(this.a1 - this.a2);
        den = this.r2 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2));
        this.a2Acc = (num1 * num2) / den;
        this.a1Vel += this.a1Acc;
        this.a2Vel += this.a2Acc;
        this.a1 += this.a1Vel;
        this.a2 += this.a2Vel;
    };
    DoublePendulumApp.prototype.RenderPendulum = function () {
        if (this.Ctx === null) {
            window.alert("failed to create canvas and context!");
            return;
        }
        this.Ctx.fillStyle = "#666666";
        this.Ctx.fillRect(-this.Container.width / 2, -this.Container.height / 2, this.Container.width, this.Container.height);
        this.Ctx.strokeStyle = "black";
        this.Ctx.fillStyle = "black";
        this.Ctx.beginPath();
        this.Ctx.moveTo(0, 0);
        this.Ctx.lineTo(this.x1, this.y1);
        this.Ctx.closePath();
        this.Ctx.stroke();
        this.Ctx.beginPath();
        this.Ctx.arc(this.x1, this.y1, this.m1, 0, 2 * Math.PI);
        this.Ctx.fill();
        this.Ctx.closePath();
        this.Ctx.stroke();
        this.Ctx.beginPath();
        this.Ctx.moveTo(this.x1, this.y1);
        this.Ctx.lineTo(this.x2, this.y2);
        this.Ctx.closePath();
        this.Ctx.stroke();
        this.Ctx.beginPath();
        this.Ctx.arc(this.x2, this.y2, this.m2, 0, 2 * Math.PI);
        this.Ctx.fill();
        this.Ctx.closePath();
        this.Ctx.fillText(this.Pad(this.x1.toFixed(0), 10) + " " +
            this.Pad(this.y1.toFixed(0), 10) + " " +
            this.Pad(this.x2.toFixed(0), 10) + " " +
            this.Pad(this.y2.toFixed(0), 10) + " " +
            this.Pad(this.ToDegrees(this.a1).toFixed(2), 10) + " " +
            this.Pad(this.ToDegrees(this.a2).toFixed(2), 10) + " " +
            this.Pad(this.ToDegrees(this.a1Vel).toFixed(2), 10) + " " +
            this.Pad(this.ToDegrees(this.a2Vel).toFixed(2), 10) + " " +
            this.Pad(this.ToDegrees(this.a1Acc).toFixed(2), 10) + " " +
            this.Pad(this.ToDegrees(this.a2Acc).toFixed(2), 10) + " ", -this.Container.width / 2, this.Container.height / 2 - 20);
    };
    DoublePendulumApp.prototype.ToDegrees = function (n) {
        return n * 57.2958;
    };
    DoublePendulumApp.prototype.Pad = function (str, digits) {
        while (str.length < digits) {
            str = " " + str;
        }
        return str;
    };
    return DoublePendulumApp;
}());
window.onload = function () {
    var header = document.createElement('div');
    header.style.backgroundColor = "black";
    header.style.boxShadow = "0 0 4px black";
    header.style.display = "flex";
    header.style.height = "50px";
    header.style.justifyContent = "center";
    header.style.marginBottom = "4px";
    document.body.appendChild(header);
    var div = document.createElement('div');
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.appendChild(new DoublePendulumApp().Container);
    document.body.appendChild(div);
};
