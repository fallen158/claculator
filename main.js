{
    var Claculator = /** @class */ (function () {
        function Claculator() {
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            this.result = null;
            this.keys = [
                ["clear", "÷"],
                ["7", "8", "9", "x"],
                ["4", "5", "6", "-"],
                ["1", "2", "3", "+"],
                ["0", ".", "="]
            ];
            this.createContainer();
            this.createOutput();
            this.createButtons();
            this.bindEvents();
        }
        Claculator.prototype.createButton = function (text, container, className) {
            var button = document.createElement("button");
            button.textContent = text;
            if (className) {
                button.className = className;
            }
            container.appendChild(button);
        };
        Claculator.prototype.createContainer = function () {
            this.container = document.createElement("div");
            this.container.classList.add("calulator");
            document.body.appendChild(this.container);
        };
        Claculator.prototype.createOutput = function () {
            this.output = document.createElement("div");
            this.output.classList.add("output");
            this.container.appendChild(this.output);
            this.span = document.createElement("span");
            this.span.textContent = "0";
            this.output.appendChild(this.span);
        };
        Claculator.prototype.createButtons = function () {
            var _this = this;
            this.keys.forEach(function (item) {
                var div = document.createElement("div");
                div.classList.add("row");
                item.forEach(function (text) {
                    _this.createButton(text, div, "button text-" + text);
                });
                _this.container.appendChild(div);
            });
        };
        Claculator.prototype.bindEvents = function () {
            var _this = this;
            this.container.addEventListener("click", function (e) {
                if (e.target instanceof HTMLButtonElement) {
                    var button = e.target;
                    var text = button.textContent;
                    _this.updateNumberOrResult(text);
                }
            });
        };
        Claculator.prototype.updateNumber = function (name, text) {
            if (this[name]) {
                this[name] += text;
            }
            else {
                this[name] = parseFloat(text);
            }
            this.span.textContent = this[name].toString();
        };
        Claculator.prototype.updateNumbers = function (text) {
            if (this.operator) {
                this.updateNumber("n2", text);
            }
            else {
                this.updateNumber("n1", text);
            }
        };
        Claculator.prototype.updateResult = function () {
            var result;
            var n1 = parseFloat(this.n1);
            var n2 = parseFloat(this.n2);
            if (this.operator === "+") {
                result = n1 + n2;
            }
            else if (this.operator === "x") {
                result = n1 * n2;
            }
            else if (this.operator === "-") {
                result = n1 - n2;
            }
            else if (this.operator === "÷") {
                result = n1 / n2;
            }
            this.span.textContent = result;
            this.n1 = null;
            this.n2 = null;
            this.operator = null;
            if (n2 === 0) {
                this.span.textContent = "不是数字";
            }
            //精度12位
            this.result = result
                .toPrecision(12)
                .replace(/0+$/g, "")
                .replace(/0+e/g, "");
        };
        Claculator.prototype.updateOperator = function (text) {
            if (this.n1 === null) {
                this.n1 = this.result;
            }
            this.operator = text;
            this.span.textContent = this.operator.toString();
        };
        Claculator.prototype.updateNumberOrResult = function (text) {
            if ("0123456789.".indexOf(text) >= 0) {
                this.updateNumbers(text);
            }
            else if ("+-x÷".indexOf(text) >= 0) {
                this.updateOperator(text);
            }
            else if ("=".indexOf(text) >= 0) {
                this.updateResult();
            }
            else if ("clear".indexOf(text) >= 0) {
                this.n1 = null;
                this.n2 = null;
                this.operator = null;
                this.result = null;
                this.span.textContent = "0";
            }
        };
        return Claculator;
    }());
    new Claculator();
}
