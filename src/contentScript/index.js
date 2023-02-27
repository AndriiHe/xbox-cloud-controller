const { Controller, BrowserControllerEmulator } = require('../emulator');
const app = require('./app');
const { CONTENT_BLOCK_ID } = require('../constants');
const state = { active: false };
const controller = new Controller();
const emulator = new BrowserControllerEmulator(controller, {
  'Space': 0,
  'Backspace': 1,
  'KeyQ': 2,
  'KeyW': 3,
  'KeyE': 4,
  'KeyR': 5,
  'KeyT': 6,
  'KeyY': 7,
  'KeyU': 8,
  'KeyI': 9,
  'KeyO': 10,
  'KeyP': 11,
  'KeyA': 12,
  'KeyS': 13,
  'KeyD': 14,
  'KeyF': 15,
  'KeyG': 16,
});

const isControllerEnabled = () => state.active;
const setControllerEnabled = (value) => state.active = value;

const onPageOpen = () => {
  app.mount(CONTENT_BLOCK_ID);
  console.log('ON PAGE OPEN')
  if (!isControllerEnabled()) {
    setControllerEnabled(true);
    emulator.enable();
  }
};

const onGameStarted = () => {

}

const onGameEnded = () => {

}

navigator.getGamepads = new Proxy(navigator.getGamepads, {
  apply: (target, thisArg, argArray) => {
    const connectedControllers = target.apply(thisArg, argArray);
    return connectedControllers.filter(item => item).length ? connectedControllers : [controller];
  },
});
window.history.pushState = new Proxy(window.history.pushState, {
  apply: (target, thisArg, argArray) => {
    onPageOpen();
    return target.apply(thisArg, argArray);
  },
});
window.addEventListener('load', onPageOpen, false);
window.addEventListener('pageshow', onPageOpen, false);

