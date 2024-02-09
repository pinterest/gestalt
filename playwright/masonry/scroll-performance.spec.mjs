// @flow strict
import fs from 'fs';
import { expect, test } from '@playwright/test';
import getServerURL from './utils/getServerURL.mjs';
import {
  eventsToCsv,
  getFpsAvgPerScroll,
  getFpsFromEvents,
} from './utils/tracingEvents.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

/*::
type Event = {
  name: string,
  ts: number,
  fps?: number,
};
*/

const DEFAULT_SCROLL_COUNT = 5;
const PINS_COUNT = 20;
const PAGE_HEIGHT = 1000;

test.describe('Masonry: scrolls', () => {
  test('scroll test', async ({ page }) => {
    const performanceTimings = [performance.now()];
    const events /*: Array<Event> */ = [];
    let fpsEvents /*: Array<Event> */ = [];
    let fpsAvgPerScroll /*: Array<number> */ = [];

    const scrollCount = DEFAULT_SCROLL_COUNT;

    const client = await page.context().newCDPSession(page);
    // await client.send('Tracing.start');
    await client.send('Tracing.start', {
      traceConfig: {
        includedCategories: ['benchmark', 'clock_sync'],
      },
    });

    client.on('Tracing.dataCollected', (data) => {
      events.push(
        ...data.value
          .filter((e) =>
            ['DirectRenderer::DrawFrame', 'clock_sync'].includes(e.name)
          )
          .map((e) => ({ name: e.name, ts: e.ts }))
      );
    });

    const tracingCompleteEvent = new Promise((resolve) => {
      client.on('Tracing.tracingComplete', () => {
        fpsEvents = getFpsFromEvents(events);
        fpsAvgPerScroll = getFpsAvgPerScroll(fpsEvents);

        fs.writeFileSync(
          'playwright/test-results/scroll-performance-timings.csv',
          eventsToCsv(fpsEvents)
        );

        resolve();
      });
    });

    await page.setViewportSize({ width: 1600, height: PAGE_HEIGHT });
    await page.goto(getServerURL());

    for (let i = 1; i < scrollCount; i += 1) {
      await client.send('Tracing.recordClockSyncMarker', {
        syncId: 'scrollTimingMark',
      });

      await page.evaluate(
        // $FlowFixMe[incompatible-use]
        ({ pageHeight, index }) => {
          window.scrollTo({ top: pageHeight * index, behavior: 'smooth' });
        },
        { pageHeight: PAGE_HEIGHT, index: i }
      );
      await waitForRenderedItems(page, {
        targetItemsGTE: PINS_COUNT * (i + 1),
      });

      performanceTimings.push(performance.now());
    }

    await client.send('Tracing.end');

    // We need this to wait for the tracing data to be completed
    await tracingCompleteEvent;

    // This is only for testing purpouses
    expect(fpsAvgPerScroll.every((fps) => fps > 5)).toBeTruthy();
  });
});
