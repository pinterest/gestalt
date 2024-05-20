import selectors from './selectors';

// Count the number of columns of items in the grid by iterating over all items
// and counting the number of unique x-offsets.
export default async function countColumns(page /*: Object */) /*: Promise<any> */ {
  return await page.evaluate((gridItemsSelector) => {
    const itemLeftMap: Record<string, any> /*: {
      [number]: $ReadOnlyArray<ClientRect>,
    } */ = {};
    const gridItems = document.querySelectorAll(gridItemsSelector);

    for (let i = 0; i < gridItems.length; i += 1) {
      const itemRect = gridItems[i].getBoundingClientRect();

      itemLeftMap[itemRect.x] = itemLeftMap[itemRect.x] || [];

      itemLeftMap[itemRect.x] = [...itemLeftMap[itemRect.x], itemRect];
    }

    return Object.keys(itemLeftMap).length;
  }, selectors.gridItem);
}
