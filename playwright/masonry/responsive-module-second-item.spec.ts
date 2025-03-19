import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems';
import getServerURL from './utils/getServerURL';

test.describe('Masonry: Responsive Module For SecondItem layout', () => {
  test(`When there are 3 columns on the grid, and a multi-column item is on the first position, the responsive module should expand 2 columns`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 800, height: 900 });

    await page.goto(
      getServerURL({
        responsiveModuleSecondItem: true,
        responsiveModuleInsertIntermediate: false,
        responsiveModuleRemoveMulticolumn: false,
      }),
    );

    const gridItems = await getGridItems(page);

    const moduleItem = await gridItems[0];
    const boundingBoxModuleItem = await moduleItem.boundingBox();
    const innerTextModuleItem = await moduleItem.innerText();
    const responsiveModuleItem = await gridItems[1];
    const boundingBoxResponsiveModuleItem = await responsiveModuleItem.boundingBox();
    const innerTextResponsiveModuleItem = await responsiveModuleItem.innerText();

    const widthAndGutter = 240;
    const expectedWidth = widthAndGutter * 2;
    const expectedYPosition =
      (boundingBoxModuleItem?.y as number) + (boundingBoxModuleItem?.height as number);

    expect(innerTextModuleItem).toMatch('ResponsiveModuleItems 0');
    expect(innerTextResponsiveModuleItem).toMatch('ResponsiveModuleItems 1');
    expect(boundingBoxResponsiveModuleItem?.x).toBe(boundingBoxModuleItem?.x as number);
    expect(boundingBoxResponsiveModuleItem?.y).toBe(expectedYPosition);
    expect(boundingBoxResponsiveModuleItem?.width).toBe(expectedWidth);
  });

  [
    {
      windowWidth: 1000,
      columns: 4,
      expansion: 2,
    },
    {
      windowWidth: 1200,
      columns: 5,
      expansion: 2,
    },
    {
      windowWidth: 1500,
      columns: 6,
      expansion: 3,
    },
    {
      windowWidth: 1800,
      columns: 7,
      expansion: 3,
    },
    {
      windowWidth: 2000,
      columns: 8,
      expansion: 4,
    },
    {
      windowWidth: 2200,
      columns: 9,
      expansion: 4,
    },
    {
      windowWidth: 2500,
      columns: 10,
      expansion: 5,
    },
    {
      windowWidth: 2700,
      columns: 11,
      expansion: 6,
    },
    {
      windowWidth: 3000,
      columns: 12,
      expansion: 7,
    },
    {
      windowWidth: 3200,
      columns: 13,
      expansion: 7,
    },
  ].forEach(({ columns, windowWidth, expansion }) => {
    test(`When there are ${columns} columns on the grid, and a multi-column item is on the first position, the responsive module should expand ${expansion} columns`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: windowWidth, height: 900 });

      await page.goto(
        getServerURL({
          responsiveModuleSecondItem: true,
          responsiveModuleInsertIntermediate: false,
          responsiveModuleRemoveMulticolumn: false,
        }),
      );

      const gridItems = await getGridItems(page);

      const moduleItem = await gridItems[0];
      const boundingBoxModuleItem = await moduleItem.boundingBox();
      const innerTextModuleItem = await moduleItem.innerText();
      const responsiveModuleItem = await gridItems[1];
      const boundingBoxResponsiveModuleItem = await responsiveModuleItem.boundingBox();
      const innerTextResponsiveModuleItem = await responsiveModuleItem.innerText();

      const widthAndGutter = 240;
      const expectedWidth = widthAndGutter * expansion;
      const expectedXPosition =
        (boundingBoxModuleItem?.x as number) + (boundingBoxModuleItem?.width as number);

      expect(innerTextModuleItem).toMatch('ResponsiveModuleItems 0');
      expect(innerTextResponsiveModuleItem).toMatch('ResponsiveModuleItems 1');
      expect(boundingBoxResponsiveModuleItem?.x).toBe(expectedXPosition);
      expect(boundingBoxResponsiveModuleItem?.y).toBe(boundingBoxModuleItem?.y as number);
      expect(boundingBoxResponsiveModuleItem?.width).toBe(expectedWidth);
    });
  });

  [
    {
      windowWidth: 800,
      columns: 3,
      expansion: 2,
    },
    {
      windowWidth: 1000,
      columns: 4,
      expansion: 3,
    },
    {
      windowWidth: 1500,
      columns: 6,
      expansion: 5,
    },
    {
      windowWidth: 2000,
      columns: 8,
      expansion: 7,
    },
    {
      windowWidth: 2200,
      columns: 9,
      expansion: 7,
    },
    {
      windowWidth: 3000,
      columns: 12,
      expansion: 7,
    },
  ].forEach(({ columns, windowWidth, expansion }) => {
    test(`When there are ${columns} columns on the grid, and a normal item is on the first position, the responsive module should expand ${expansion} columns`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: windowWidth, height: 900 });

      await page.goto(
        getServerURL({
          responsiveModuleSecondItem: true,
          responsiveModuleInsertIntermediate: true,
          responsiveModuleRemoveMulticolumn: true,
        }),
      );

      const gridItems = await getGridItems(page);

      const normalItem = await gridItems[0];
      const boundingBoxNormalItem = await normalItem.boundingBox();
      const innerTextNormalItem = await normalItem.innerText();
      const responsiveModuleItem = await gridItems[1];
      const boundingBoxResponsiveModuleItem = await responsiveModuleItem.boundingBox();
      const innerTextResponsiveModuleItem = await responsiveModuleItem.innerText();

      const widthAndGutter = 240;
      const expectedWidth = widthAndGutter * expansion;
      const expectedXPosition =
        (boundingBoxNormalItem?.x as number) + (boundingBoxNormalItem?.width as number);

      expect(innerTextNormalItem).toMatch('ResponsiveModuleItems 2');
      expect(innerTextResponsiveModuleItem).toMatch('ResponsiveModuleItems 1');
      expect(boundingBoxResponsiveModuleItem?.x).toBe(expectedXPosition);
      expect(boundingBoxResponsiveModuleItem?.y).toBe(boundingBoxNormalItem?.y as number);
      expect(boundingBoxResponsiveModuleItem?.width).toBe(expectedWidth);
    });
  });

  [800, 1000, 1500, 2000, 2200, 3000].forEach((windowWidth) => {
    test(`When the responsive module is on the first position it shouldnt expand, width : ${windowWidth}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: windowWidth, height: 900 });

      await page.goto(
        getServerURL({
          responsiveModuleSecondItem: true,
          responsiveModuleInsertIntermediate: false,
          responsiveModuleRemoveMulticolumn: true,
        }),
      );

      const gridItems = await getGridItems(page);
      console.log('gridItems', gridItems.length);

      const responsiveModuleItem = gridItems[0];
      const boundingBoxResponsiveModuleItem = await responsiveModuleItem.boundingBox();
      const innerTextResponsiveModuleItem = await responsiveModuleItem.innerText();
      const widthAndGutter = 240;

      expect(innerTextResponsiveModuleItem).toMatch('ResponsiveModuleItems 1');
      expect(boundingBoxResponsiveModuleItem?.width).toBe(widthAndGutter);
    });
  });

  [800, 1000, 1500, 2000, 2200, 3000].forEach((windowWidth) => {
    test(`When the responsive module is on the third position it shouldnt expand, width : ${windowWidth}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: windowWidth, height: 900 });

      await page.goto(
        getServerURL({
          responsiveModuleSecondItem: true,
          responsiveModuleInsertIntermediate: true,
          responsiveModuleRemoveMulticolumn: false,
        }),
      );

      const gridItems = await getGridItems(page);

      const responsiveModuleItem = gridItems[2];
      const boundingBoxResponsiveModuleItem = await responsiveModuleItem.boundingBox();
      const innerTextResponsiveModuleItem = await responsiveModuleItem.innerText();
      const widthAndGutter = 240;

      expect(innerTextResponsiveModuleItem).toMatch('ResponsiveModuleItems 1');
      expect(boundingBoxResponsiveModuleItem?.width).toBe(widthAndGutter);
    });
  });
});
