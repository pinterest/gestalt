// @flow strict
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import looksSame from 'looks-same';
// eslint-disable-next-line import/no-relative-parent-imports
import puppeteerConfig from '../jest-puppeteer.config.js';
import 'babel-polyfill';

async function getScreenshotDimensions() {
  return page.evaluate(() => {
    const {
      offsetHeight,
      offsetWidth,
      offsetTop,
      offsetLeft,
    } = document.querySelector('.docSearch-content');
    return {
      offsetHeight,
      offsetWidth,
      offsetLeft,
      offsetTop,
    };
  });
}

describe('Visual Diff Testing', () => {
  const pages = fs
    .readdirSync(path.join(__dirname, '../docs/src/'))
    .reduce(
      (acc, filename) =>
        filename.includes('.doc.js') ? [filename.split('.')[0], ...acc] : acc,
      []
    )
    .filter(filename => filename !== 'Video' && filename !== 'Installation');

  beforeAll(() => {
    rimraf.sync(path.join(__dirname, './screenshots/'));
    fs.mkdirSync(path.join(__dirname, './screenshots/'));
    rimraf.sync(path.join(__dirname, './diffs/'));
    fs.mkdirSync(path.join(__dirname, './diffs/'));
  });

  it.each(['Button'] /* pages */)(
    '%s component',
    async (componentPage, done) => {
      const localImagePath = path.join(
        __dirname,
        `./screenshots/${componentPage}-local.png`
      );
      const prodImagePath = path.join(
        __dirname,
        `./screenshots/${componentPage}-prod.png`
      );

      // local env
      await page.goto(`http://localhost:3000/#/components/${componentPage}`, {
        waitUntil: 'networkidle0',
      });
      const contentLocationLocal = await getScreenshotDimensions();

      // make sure our screenshot captures the entire screen
      expect(
        puppeteerConfig.launch.defaultViewport.height
      ).toBeGreaterThanOrEqual(contentLocationLocal.offsetHeight);
      expect(
        puppeteerConfig.launch.defaultViewport.width
      ).toBeGreaterThanOrEqual(contentLocationLocal.offsetWidth);

      await page.screenshot({
        path: localImagePath,
        clip: {
          x: contentLocationLocal.offsetLeft,
          y: contentLocationLocal.offsetTop,
          height: contentLocationLocal.offsetHeight,
          width: contentLocationLocal.offsetWidth,
        },
      });
      // prod env
      await page.goto(
        `https://gestalt.netlify.app/#/components/${componentPage}`,
        {
          waitUntil: 'networkidle0',
        }
      );

      const contentLocationProd = await getScreenshotDimensions();

      // make sure our screenshot captures the entire screen
      expect(
        puppeteerConfig.launch.defaultViewport.height
      ).toBeGreaterThanOrEqual(contentLocationProd.offsetHeight);
      expect(
        puppeteerConfig.launch.defaultViewport.width
      ).toBeGreaterThanOrEqual(contentLocationProd.offsetWidth);

      await page.screenshot({
        path: prodImagePath,
        clip: {
          x: contentLocationProd.offsetLeft,
          y: contentLocationProd.offsetTop,
          height: contentLocationProd.offsetHeight,
          width: contentLocationProd.offsetWidth,
        },
      });

      const diffOptions = {
        strict: false, // strict comparsion
        tolerance: 0.5,
        antialiasingTolerance: 0,
        ignoreAntialiasing: true, // ignore antialising by default
        ignoreCaret: true, // ignore caret by default
      };
      const diffImageOptions = {
        reference: fs.readFileSync(prodImagePath),
        current: fs.readFileSync(localImagePath),
        diff: path.join(__dirname, `./diffs/${componentPage}.png`),
        highlightColor: '#ff00ff', // color to highlight the differences
      };
      looksSame(
        diffImageOptions.reference,
        diffImageOptions.current,
        diffOptions,
        (error, { equal }) => {
          if (error) {
            done(error);
          }
          if (!equal) {
            // write annotated image to disk
            looksSame.createDiff(
              { ...diffOptions, ...diffImageOptions },
              imageCreationError => {
                if (imageCreationError) {
                  done(imageCreationError);
                }
                expect(equal).toEqual(true);
                done();
              }
            );
          } else {
            done();
          }
        }
      );
    },
    60000
  );

  afterAll(() => {
    rimraf.sync(path.join(__dirname, './screenshots/'));
  });
});
