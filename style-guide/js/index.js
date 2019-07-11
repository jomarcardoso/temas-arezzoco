import IndexDetector from './index-detector.js';

document.addEventListener('DOMContentLoaded', () => {
  let iDocument = null;

  function addStyleToIframe() {
    const iStyle = iDocument.createElement('style');
    iStyle.innerHTML = `
    .sg-Main-container {
      margin: 0 auto;
      max-width: 960px;
      padding: 15px;
    }`;

    iDocument.querySelector('head').appendChild(iStyle);
    iDocument.querySelector('body').classList.add('sg-Main-container');
  }

  function createNav() {
    IndexDetector(iDocument);
  }

  elStyleGuideWrapper.addEventListener('load', () => {
    iDocument = elStyleGuideWrapper.contentDocument;
    addStyleToIframe();
    createNav();
  });
});