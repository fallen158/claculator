{
  class Claculator {
    public container: HTMLDivElement;
    private output: HTMLDivElement;
    private span: HTMLSpanElement;
    public n1: string = null;
    public n2: string = null;
    public operator: string = null;
    public result: string = null;
    public keys: Array<Array<string>> = [
      ["clear", "÷"],
      ["7", "8", "9", "x"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "+"],
      ["0", ".", "="]
    ];
    constructor() {
      this.createContainer();
      this.createOutput();
      this.createButtons();
      this.bindEvents();
    }
    createButton(text: string, container: HTMLElement, className: string) {
      let button: HTMLButtonElement = document.createElement("button");
      button.textContent = text;
      if (className) {
        button.className = className;
      }
      container.appendChild(button);
    }
    createContainer() {
      this.container = document.createElement("div");
      this.container.classList.add("calulator");
      document.body.appendChild(this.container);
    }
    createOutput() {
      this.output = document.createElement("div");
      this.output.classList.add("output");
      this.container.appendChild(this.output);
      this.span = document.createElement("span");
      this.span.textContent = "0";
      this.output.appendChild(this.span);
    }
    createButtons() {
      this.keys.forEach((item: Array<string>) => {
        let div: HTMLDivElement = document.createElement("div");
        div.classList.add("row");
        item.forEach(text => {
          this.createButton(text, div, `button text-${text}`);
        });
        this.container.appendChild(div);
      });
    }
    bindEvents() {
      this.container.addEventListener("click", e => {
        if (e.target instanceof HTMLButtonElement) {
          let button: HTMLButtonElement = e.target;
          let text = button.textContent;
          this.updateNumberOrResult(text);
        }
      });
    }
    updateNumber(name: string, text: string): void {
      if (this[name]) {
        this[name] += text;
      } else {
        this[name] = parseFloat(text);
      }
      this.span.textContent = this[name].toString();
    }
    updateNumbers(text: string): void {
      if (this.operator) {
        this.updateNumber("n2", text);
      } else {
        this.updateNumber("n1", text);
      }
    }
    updateResult(): void {
      let result;
      let n1: number = parseFloat(this.n1);
      let n2: number = parseFloat(this.n2);
      if (this.operator === "+") {
        result = n1 + n2;
      } else if (this.operator === "x") {
        result = n1 * n2;
      } else if (this.operator === "-") {
        result = n1 - n2;
      } else if (this.operator === "÷") {
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
    }
    updateOperator(text: string): void {
      if (this.n1 === null) {
        this.n1 = this.result;
      }
      this.operator = text;
      this.span.textContent = this.operator.toString();
    }
    updateNumberOrResult(text) {
      if ("0123456789.".indexOf(text) >= 0) {
        this.updateNumbers(text);
      } else if ("+-x÷".indexOf(text) >= 0) {
        this.updateOperator(text);
      } else if ("=".indexOf(text) >= 0) {
        this.updateResult();
      } else if ("clear".indexOf(text) >= 0) {
        this.n1 = null;
        this.n2 = null;
        this.operator = null;
        this.result = null;
        this.span.textContent = "0";
      }
    }
  }
  new Claculator();
}
