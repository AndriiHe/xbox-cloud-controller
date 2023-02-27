module.exports = class {
  constructor(controller, config) {
    this.controller = controller;
    this.config = config;
    this.listeners = {};
  }

  enable() {
    this.controller.connect((gamepad) => {
      const event = new Event('gamepadconnected');
      event.gamepad = gamepad;
      window.dispatchEvent(event);
    });
    document.addEventListener('keydown', (e) => {
      const button = this.config[e.code];
      if (button) {
        e.preventDefault();
        this.controller.buttonDown(button);
      }
    });
    document.addEventListener('keyup', (e) => {
      const button = this.config[e.code];
      if (button) {
        e.preventDefault();
        this.controller.buttonUp(this.config[e.code]);
      }
    });
  }

  disable() {
    this.controller.disconnect((gamepad) => {
      const event = new Event('gamepaddisconnected');
      event.gamepad = gamepad;
      window.dispatchEvent(event);
    });
  }

  updateConfig(config) {
    this.config = config;
  }
}
