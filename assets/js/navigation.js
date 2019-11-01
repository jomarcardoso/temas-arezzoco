export function Navigation({
  iDocument,
  iWindow,
  iBody
}) {
  const elLinks = iDocument.querySelectorAll('a[href^="./"], a[href^="/"]');

  function handleClick(e) {
    // e.preventDefault();

    // window.location.hash = 'arezzo-amp';
    // iWindow.location.href = e.currentTarget.href;
    // iWindow.location.replace(e.currentTarget.href);

    // window.history.pushState(
    //   {},
    //   e.currentTarget.href,
    //   e.currentTarget.href
    // );

    // console.log(e)
    // iWindow.replace(`${window.location.origin}/${e.currentTarget.href}`);
  }

  function bindEvents() {
    elLinks.forEach((el) => {
      console.log(el)
      el.addEventListener('click', handleClick);
    });
  }

  bindEvents();
}
