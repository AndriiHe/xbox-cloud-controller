document.documentElement.appendChild(Object.assign(document.createElement('script'), {
  src: chrome.runtime.getURL('/contentScript.js'),
  async: false,
  type: 'text/javascript'
}));
