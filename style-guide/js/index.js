document.addEventListener('DOMContentLoaded', () => {
  let iDocument = null;
  let iBody = null;

  function addStyleToIframe() {
    const iLink = iDocument.createElement('link');
    iLink.href= './style-guide/css/main.css';
    iLink.rel = 'stylesheet';

    iDocument.querySelector('head').appendChild(iLink);
    iDocument.querySelector('body').classList.add('sg-Main-container');
  }

  function createNavList() {
    function scrollTo(scroll) {
      iBody.scrollTop = scroll;
    }

    function bindScrollEvents() {
      const anchors = document.querySelectorAll('a[href*="#"]');
      anchors.forEach((anchor) => {
        anchor.addEventListener('click', ({ currentTarget: { hash } }) => {
          // console.dir(currentTarget)
          const target = iDocument.querySelector(hash);
          scrollTo(target.offsetTop)
        });
      })
    }

    function templateNavItem({ tagName, innerHTML, id, offsetTop }) {
      return `
        <li class="sg-Nav-item sg-Nav-item--${tagName}">
          <a href="#${id || ''}" data-scroll="${offsetTop || 0}">
            ${innerHTML}
          </a>
        </li>
      `;
    }

    function addClass(el) {
      el.classList.add('sg-Heading', `sg-Heading--${el.tagName}`)
    }

    const listIndex = iDocument.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const arrayIndex = Array.from(listIndex);

    const navLayout = arrayIndex.reduce((previousValue, currentvalue) => {
      return previousValue.concat(templateNavItem(currentvalue));
    }, '');

    console.log(arrayIndex)
    arrayIndex.forEach(addClass)

    elStyleGuideNav.innerHTML = navLayout;
    bindScrollEvents();
  }

  elStyleGuideWrapper.addEventListener('load', () => {
    iDocument = elStyleGuideWrapper.contentDocument;
    iBody = iDocument.querySelector('body');
    addStyleToIframe();
    createNavList();
  });
});