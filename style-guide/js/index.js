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

    arrayIndex.forEach(addClass)

    elStyleGuideNav.innerHTML = navLayout;
    bindScrollEvents();
  }

  function createNodesByCodes() {
    const iTemplates = iDocument.querySelectorAll('script[type="template"]');
    const arrayTemplates = Array.from(iTemplates);
    console.log(arrayTemplates)

    function makeCodesByTags(el) {
      const elContent = el.innerHTML;
      const text = elContent.replace(/\&/g, '$amp').replace(/\</g, '&lt').replace(/\>/g, '&gt');

      const padding = text.search(/(?!\s)/) - 1;
      const trimText = text.replace(new RegExp(`\\n(\\s{${padding}})`, 'g'), '\n').trim();
      const iPre = `<pre><code>${trimText}</code></pre>`;
      el.insertAdjacentHTML('afterend', iPre);
      el.insertAdjacentHTML('beforebegin', `<div class="sg-Example">${elContent}</div>`);

      iDocument.querySelectorAll('pre code').forEach((block) => {
        console.log(hljs.highlightBlock)
        hljs.highlightBlock(block);
      });
    }

    arrayTemplates.forEach(makeCodesByTags)
  }

  elStyleGuideWrapper.addEventListener('load', () => {
    iDocument = elStyleGuideWrapper.contentDocument;
    iBody = iDocument.querySelector('body');
    addStyleToIframe();
    createNavList();
    createNodesByCodes();
  });
});