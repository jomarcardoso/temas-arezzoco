document.addEventListener('DOMContentLoaded', () => {
  let iDocument = null;
  let iWindow = null;
  let iBody = null;

  function addStyleToIframe() {
    const iLink = iDocument.createElement('link');
    iLink.href= './assets/css/main.css';
    iLink.rel = 'stylesheet';

    iDocument.querySelector('head').appendChild(iLink);
    iDocument.querySelector('body').classList.add('sg-Main-container');

    Array.from(iDocument.querySelectorAll('p')).forEach((p) => {
      p.classList.add('sg-Paragraph');
    });

    Array.from(iDocument.querySelectorAll('ul, ol')).forEach((ul) => {
      ul.classList.add('sg-List');
    });
  }

  function createNavList() {
    function scrollTo(scroll) {
      iBody.scrollTop = scroll;
    }

    function bindScrollEvents() {
      const anchors = document.querySelectorAll('a[href*="#"]');
      anchors.forEach((anchor) => {
        console.log(anchor)
        anchor.addEventListener('click', ({ currentTarget: { hash } }) => {
          const target = iDocument.querySelector(hash);
          scrollTo(target.offsetTop)
        });
      })
    }

    function templateNavItem({ tagName, innerHTML, id, offsetTop }) {
      console.log(id)
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
      if (!el.id) {
        el.id = `abc${Math.random() * 100000000000000000}`;
      }
    }


    const listIndex = iDocument.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const arrayIndex = Array.from(listIndex);
    arrayIndex.forEach(addClass);

    const navLayout = arrayIndex.reduce((previousValue, currentvalue) => {
      return previousValue.concat(templateNavItem(currentvalue));
    }, '');

    elStyleGuideNav.innerHTML = navLayout;
    bindScrollEvents();
  }

  function createNodesByCodes() {
    const iTemplates = iDocument.querySelectorAll('script[type="template"], template');
    const arrayTemplates = Array.from(iTemplates);

    function makeCodesByTags(el) {
      const elContent = el.innerHTML;
      const padding = elContent.search(/(\S)/) - 1;
      const trimContent = elContent.replace(/\n\n/gm, '\nHHHHHH\n').replace(new RegExp(`\\n\\s{${padding}}`, 'gm'), '\n').trim().replace(/HHHHHH/gm, '');
      let text = trimContent;

      let preClass = el.dataset.class || '';
      let isTag = /<("[^"]*"|'[^']*'|[^'">])*>/.test(elContent);
      if (el.dataset.class === 'xml' || el.dataset.class === 'html' || isTag) {
        text = trimContent.replace(/\&/g, '$amp').replace(/\</g, '&lt').replace(/\>/g, '&gt');
        preClass = 'xml';
      }

      function renderExample() {
        if (el.dataset.render === 'code') return '';
        if (preClass !== 'xml') return '';
        return `<div class="sg-Example-content">
          ${elContent}
        </div>`;
      }


      const iPre = `<pre><code class="${preClass}">${text}</code></pre>`;
      el.insertAdjacentHTML('beforebegin', `
        <div class="sg-Example">
          ${renderExample()}
          ${iPre}
        </div>
      `);

      iDocument.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }

    arrayTemplates.forEach(makeCodesByTags)
  }

  function createColorBox() {
    const elColorBoxes = Array.from(iDocument.querySelectorAll('.sg-ColorBox'));

    elColorBoxes.forEach((colorBox) => {
      function setColor() {
        let color = colorBox.dataset.color;
        if (color.startsWith('--')) {
          color = iWindow.getComputedStyle(iDocument.documentElement).getPropertyValue(colorBox.dataset.color);
          if (!color) {
            setTimeout(setColor, 1000)
          }
        }
        colorBox.style.backgroundColor = color;
      }

      setColor();
    });
  }

  elStyleGuideWrapper.addEventListener('load', () => {
    iDocument = elStyleGuideWrapper.contentDocument;
    iWindow = elStyleGuideWrapper.contentWindow;
    iBody = iDocument.querySelector('body');
    addStyleToIframe();
    createNavList();
    createNodesByCodes();
    createColorBox();
  });
});