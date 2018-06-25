import selectors from './selectors';

const countColumns = async page => {
  const itemLeftMap = {};
  const gridItems = await page.$$(selectors.gridItem);

  for (let i = 0; i < gridItems.length; i += 1) {
    const itemRect = await gridItems[i].boundingBox();
    itemLeftMap[itemRect.x] = itemLeftMap[itemRect.x] || [];
    itemLeftMap[itemRect.x].push(itemRect);
  }
  return Object.keys(itemLeftMap).length;
};

export default countColumns;
