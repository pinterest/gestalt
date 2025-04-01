import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems';
import getServerURL from './utils/getServerURL';

test.describe('Masonry: Multicolumn items positioning with different algoritms', () => {
  test(`With the multicolumn test page try the different algorithms`, async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 900 });

    await page.goto(
      getServerURL({
        multiColTest: true,
        multiColPositionAlgoV2: false,
      }),
    );

    const gridItems = await getGridItems(page);

    const moduleItem = await gridItems[4];
    const boundingBoxModuleItem = await moduleItem.boundingBox();
    const innerTextModuleItem = await moduleItem.innerText();

    const itemOnFirstColumn = await gridItems[0];
    const boundingBoxItemOnFirstColumn = await itemOnFirstColumn.boundingBox();
    const innerTextItemOnFirstColumn = await itemOnFirstColumn.innerText();
    const bottomBoundItemOnFirstColumn =
      (boundingBoxItemOnFirstColumn?.y as number) +
      (boundingBoxItemOnFirstColumn?.height as number);

    expect(innerTextItemOnFirstColumn).toMatch('MultiColTest 0');
    expect(innerTextModuleItem).toMatch('MultiColTest 4');
    expect(boundingBoxModuleItem?.x).toBe(boundingBoxItemOnFirstColumn?.x);
    expect(boundingBoxModuleItem?.y).toBeGreaterThanOrEqual(bottomBoundItemOnFirstColumn);

    await page.goto(
      getServerURL({
        multiColTest: true,
        multiColPositionAlgoV2: true,
      }),
    );

    const gridItemsAlgoV2 = await getGridItems(page);

    const moduleItemAlgoV2 = await gridItemsAlgoV2[4];
    const boundingBoxModuleItemAlgoV2 = await moduleItemAlgoV2.boundingBox();
    const innerTextModuleItemAlgoV2 = await moduleItemAlgoV2.innerText();

    // const itemOnFirstColumn = await gridItems[0];
    // const boundingBoxItemOnFirstColumn = await itemOnFirstColumn.boundingBox();
    // const innerTextItemOnFirstColumn = await itemOnFirstColumn.innerText();
    const itemOnSecondColumn = await gridItemsAlgoV2[1];
    const boundingBoxItemOnSecondColumn = await itemOnSecondColumn.boundingBox();
    const innerTextItemOnSecondColumn = await itemOnSecondColumn.innerText();
    const bottomBoundItemOnSecondColumn =
      (boundingBoxItemOnSecondColumn?.y as number) +
      (boundingBoxItemOnSecondColumn?.height as number);

    expect(innerTextItemOnSecondColumn).toMatch('MultiColTest 1');
    expect(innerTextModuleItemAlgoV2).toMatch('MultiColTest 4');
    expect(boundingBoxModuleItemAlgoV2?.x).toBe(boundingBoxItemOnSecondColumn?.x);
    expect(boundingBoxModuleItemAlgoV2?.y).toBeGreaterThanOrEqual(bottomBoundItemOnSecondColumn);
  });
});
