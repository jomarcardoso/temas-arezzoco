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
      // console.log(item.position, previousItem.position)
      if (item.position >= previousItem.position) {
        return currentItem;
      }

      return previousItem;
    }).index;
  }

  elH2List.forEach((item, index) => {
    list.push(layoutItem(item, index));
    // console.dir(item.offsetTop)
  });

  elH3List.forEach((item, index) => {
    const la = layoutItem(item, index);
    const position = verifyPosition(la);
    console.log(position)
    list[position - 1].list.push(la)
    // list.push(layoutItem(item, index));
    // console.dir(item.offsetTop)
  });

  console.log(list)
}