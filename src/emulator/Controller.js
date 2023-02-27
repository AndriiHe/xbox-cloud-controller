module.exports = class {
  constructor() {
    this.connected = false;
    this.id = 'Xbox Series S Controller';
    this.index = 0;
    this.axes = Array(4).fill(null).map(() => 0);
    this.buttons = Array(17).fill(null).map(() => ({ pressed: false, touched: true, value: 0 }));
    this.timestamp = Date.now();
    this.hapticActuators = [];
    this.mapping = 'standard';
  }

  connect(onConnect) {
    this.connected = true;
    this.timestamp = Date.now();
    onConnect && onConnect(this);
  }

  disconnect(onDisconnect) {
    this.connected = false;
    this.timestamp = Date.now();
    onDisconnect && onDisconnect(this);
  }

  moveAxe(axe, x, y) {
    this.axes[axe * 2] = x;
    this.axes[axe * 2 + 1] = y;
    this.timestamp = Date.now();
  }

  buttonDown(button) {
    this.buttons[button].pressed = true;
    this.buttons[button].value = 1;
    this.timestamp = Date.now();
  }

  buttonUp(button) {
    this.buttons[button].touched = false;
    this.buttons[button].pressed = false;
    this.buttons[button].value = 0;
    this.timestamp = Date.now();
  }
}
