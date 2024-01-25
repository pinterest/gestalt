// @flow strict
// import url from 'url';
import playwright from 'playwright';
import { createWorker, PSM } from 'tesseract.js';
import waitForRenderedItems from './waitForRenderedItems.mjs';

const testURL = new URL('http://localhost:8888/integration-test/masonry');
const DEFAULT_SCROLL_COUNT = 5;
const PINS_COUNT = 5;
const PAGE_HEIGHT = 1000;

/**
 * Args:
 * --scroll-count: number
 *  Number of times to scroll the page and fetch items
 * --debug: flag
 *  Open browser with dev tools, more verbose logging, and don't close browser when done
 * --verbosity: 'silent' | 'default' | 'verbose'
 * Logging verbosity
 * --two-col-items
 * Enable two column items
 * --realistic-pin-heights
 * Enable realistic pin heights
 */
(async () => {
  // Get args
  const args = process.argv.slice(2);

  if (args.find((arg) => arg.includes('--two-col-items'))) {
    testURL.searchParams.append('twoColItems', '1');
  }
  if (args.find((arg) => arg.includes('--realistic-pin-heights'))) {
    testURL.searchParams.append('realisticPinHeights', '1');
  }

  const scrollCountArg =
    args.find((arg) => arg.startsWith('--scroll-count='))?.split('=')[1] ??
    DEFAULT_SCROLL_COUNT;
  const scrollCount = parseInt(scrollCountArg, 10);

  const debug = args.includes('--debug');

  const verbosityArg = args
    .find((arg) => arg.startsWith('--verbosity='))
    ?.split('=')[1];

  const launchOptions = debug
    ? { headless: false, devtools: false }
    : { headless: true };

  const log = (message /*: string */) =>
    ['default', 'verbose'].includes(verbosityArg)
      ? console.log(message)
      : undefined;

  // Launch browser and page
  const browser = await playwright.chromium.launch(launchOptions);
  const page = await browser.newPage();

  const client = await page.context().newCDPSession(page);
  await client.send('Overlay.setShowFPSCounter', {
    show: true,
  });
  const worker = await createWorker('eng');
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_LINE,
  });
  const rectangle = { left: 290, top: 45, width: 40, height: 40 };

  if (verbosityArg === 'verbose') {
    // Patch console output to show in node
    console.log('Verbose mode enabled, console patched through');
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  }

  // Set viewport and open the test page
  await page.setViewportSize({ width: 1600, height: PAGE_HEIGHT });
  await page.goto(testURL.toString());

  const performanceTimings = [performance.now()];
  const fpsCounts = [];

  for (let i = 0; i < scrollCount; i += 1) {
    log(`Scrolling to ${PAGE_HEIGHT * (i + 1)}`);
    await page.evaluate(
      // $FlowFixMe[incompatible-use]
      ({ pageHeight, index }) => {
        window.scrollTo({ top: pageHeight * index, behavior: 'smooth' });
      },
      { pageHeight: PAGE_HEIGHT, index: i }
    );
    log(`Waiting for ${PINS_COUNT * (i + 1)} items`);
    await waitForRenderedItems({
      page,
      args: { targetItemsGTE: PINS_COUNT * (i + 1) },
      debug: verbosityArg === 'verbose',
    });
    log(`Done waiting for ${PINS_COUNT * (i + 1)} items`);

    await page.screenshot({ path: `screenshots/fps${i}.png` });

    performanceTimings.push(performance.now());
  }

  for (let i = 0; i < scrollCount; i += 1) {
    const {
      data: { text },
    } = await worker.recognize(`screenshots/fps${i}.png`, { rectangle });
    fpsCounts.push(Number(text));
  }
  await worker.terminate();

  const deltas = performanceTimings
    .map((t, i) => {
      if (i === 0) {
        return null;
      }
      return t - performanceTimings[i - 1];
    })
    .filter(Boolean);

  const meanDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length;
  const medianDelta = deltas.sort()[Math.floor(deltas.length / 2)];
  const meanFps =
    fpsCounts
      .filter(Number)
      .map(Number)
      .reduce((a, b) => a + b, 0) / fpsCounts.length;
  console.log(`
Performance stats:
  Mean delta: ${meanDelta.toFixed(2)}ms
  Median delta: ${medianDelta.toFixed(2)}ms
  Deltas: ${deltas.map((d) => d.toFixed(2)).join(', ')}
  Mean fps: ${meanFps.toFixed(2)} fps
  Fps deltas: ${fpsCounts.join(', ')}
  `);

  if (!debug) {
    await browser.close();
  }
})();
