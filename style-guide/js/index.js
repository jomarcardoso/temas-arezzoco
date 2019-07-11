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

  function createNavList() {
    function templateNavItem({ tagName, innerHTML, id }) {
      return `
        <li class="sg-Nav-item${tagName}">
          <a href="#${id || ''}">
            ${innerHTML}
          </a>
        </li>
      `;
    }

    const listIndex = iDocument.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const arrayIndex = Array.from(listIndex);

    const navLayout = arrayIndex.reduce((previousValue, currentvalue) => {
      return previousValue.concat(templateNavItem(currentvalue));
    }, '');

    elStyleGuideNav.innerHTML = navLayout;
  }

  elStyleGuideWrapper.addEventListener('load', () => {
    iDocument = elStyleGuideWrapper.contentDocument;
    addStyleToIframe();
    createNavList();
  });
});