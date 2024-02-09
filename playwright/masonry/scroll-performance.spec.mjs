// @flow strict
import fs from 'fs';
import { expect, test } from '@playwright/test';
import getServerURL from './utils/getServerURL.mjs';
import {
  eventsToCsv,
  getFpsFromEvents,
  getFpsMetricsPerScroll,
  metricsToCsv,
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
    const events /*: Array<Event> */ = [];

    // Starting the CDP session only including the desired categories
    const client = await page.context().newCDPSession(page);
    await client.send('Tracing.start', {
      traceConfig: {
        includedCategories: ['benchmark', 'clock_sync'],
      },
    });

    // This will be called when tracing is complete
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
        resolve();
      });
    });

    await page.setViewportSize({ width: 1600, height: PAGE_HEIGHT });
    await page.goto(getServerURL());

    // Scroll x amount of times, we add the sync marker at the start of each scroll
    for (let i = 1; i < DEFAULT_SCROLL_COUNT; i += 1) {
      await client.send('Tracing.recordClockSyncMarker', {
        syncId: 'scrollTimingMark',
      });

      await page.evaluate(
        ({ pageHeight, index }) => {
          window.scrollTo({ top: pageHeight * index, behavior: 'smooth' });
        },
        { pageHeight: PAGE_HEIGHT, index: i }
      );
      await waitForRenderedItems(page, {
        targetItemsGTE: PINS_COUNT * (i + 1),
      });
    }

    await client.send('Tracing.end');

    // We need this to wait for the tracing data to be completed
    await tracingCompleteEvent;

    // Calculate fps per scroll and metrics
    const fpsEvents = getFpsFromEvents(events);
    const fpsMetricsPerScroll = getFpsMetricsPerScroll(fpsEvents);

    // This is temp until we understand the numbers on ci environment
    fs.writeFileSync(
      'playwright/test-results/scroll-performance-timings.csv',
      eventsToCsv(fpsEvents)
    );
    fs.writeFileSync(
      'playwright/test-results/scroll-performance-fps-metrics.csv',
      metricsToCsv(fpsMetricsPerScroll)
    );

    // This is only for testing purpouses
    expect(fpsMetricsPerScroll.every((metric) => metric.avg > 1)).toBeTruthy();
  });
});
