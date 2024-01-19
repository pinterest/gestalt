// @flow strict
import playwright from 'playwright';
import waitForRenderedItems from './waitForRenderedItems.mjs';

const URL = 'http://localhost:8888/integration-test/masonry';
const DEFAULT_SCROLL_COUNT = 5;
const PINS_COUNT = 20;
const PAGE_HEIGHT = 1000;

/**
 * Args:
 * --scroll-count: number
 *  Number of times to scroll the page and fetch items
 * --debug: flag
 *  Open browser with dev tools, more verbose logging, and don't close browser when done
 * --verbosity: 'silent' | 'default' | 'verbose'
 * Logging verbosity
 */
(async () => {
  // Get args
  const args = process.argv.slice(2);

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
    : { headless: 'new' };

  const log = (message /*: string */) =>
    ['default', 'verbose'].includes(verbosityArg)
      ? console.log(message)
      : undefined;

  // Launch browser and page
  const browser = await playwright.chromium.launch(launchOptions);
  const page = await browser.newPage();

  if (verbosityArg === 'verbose') {
    // Patch console output to show in node
    console.log('Verbose mode enabled, console patched through');
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  }

  // Set viewport and open the test page
  await page.setViewportSize({ width: 1600, height: PAGE_HEIGHT });
  await page.goto(URL);

  const performanceTimings = [performance.now()];

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
    performanceTimings.push(performance.now());
  }

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
  console.log(`
Performance stats:
  Mean delta: ${meanDelta.toFixed(2)}ms
  Median delta: ${medianDelta.toFixed(2)}ms
  Deltas: ${deltas.map((d) => d.toFixed(2)).join(', ')}
  `);

  if (!debug) {
    await browser.close();
  }
})();
