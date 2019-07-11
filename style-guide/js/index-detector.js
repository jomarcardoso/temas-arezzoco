export default function(el = document) {
  const list = [];
  const elH1List = el.querySelectorAll('h1');
  const elH2List = el.querySelectorAll('h2');
  const elH3List = el.querySelectorAll('h3');

  function layoutItem(item, index) {
    return {
      index,
      name: item.innerHTML,
      type: item.tagName,
      el: item,
      position: item.offsetTop,
      list: []
    }
  }

  function verifyPosition(item) {
    return list.reduce((previousItem, currentItem) => {
      if (item.position >= currentItem.position) {
        return currentItem;
      }

      return previousItem;
    }).index;
  }

  function createList() {
    function addToList() {

    }

    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce((previousItem, currentItem) => {
      const headings = el.querySelectorAll(item);
      if (!headings.length) return previousItem;
      headings
    }, []);
  }

  elH2List.forEach((item, index) => {
    list.push(layoutItem(item, index));
  });

  elH3List.forEach((item, index) => {
    const la = layoutItem(item, index);
    const position = verifyPosition(la);
    list[position].list.push(la);
  });

  return list;
}