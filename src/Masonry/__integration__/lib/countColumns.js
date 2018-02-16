import ghost from 'ghostjs';
import selectors from './selectors';

const countColumns = async () => {
  const itemLeftMap = {};
  const gridItems = await ghost.findElements(selectors.gridItem);

  for (let i = 0; i < gridItems.length; i += 1) {
    const isVisible = await gridItems[i].isVisible();
    if (isVisible) {
      const itemRect = await gridItems[i].rect();
      itemLeftMap[itemRect.left] = itemLeftMap[itemRect.left] || [];
      itemLeftMap[itemRect.left].push(itemRect);
    }
  }

  return Object.keys(itemLeftMap).length;
};

export default countColumns;
