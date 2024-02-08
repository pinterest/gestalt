// @flow strict
import fs from 'fs';
import { expect, test } from '@playwright/test';
import getServerURL from './utils/getServerURL.mjs';
import waitForRenderedItems from './utils/waitForRenderedItems.mjs';

const DEFAULT_SCROLL_COUNT = 5;
const PINS_COUNT = 20;
const PAGE_HEIGHT = 1000;

const eventsToCsv = (
  events /*: $ReadOnlyArray<{ name: string, fps?: number, ts: number }> */
) =>
  events
    .map((e) => (e.name.includes('clock_sync') ? e.name : e.fps))
    .join('\n');

const getFpsFromEvents = (events) => {
  const fpsTimings = [];

  const drawFrameEvents = events
    .filter((e) => e.name.includes('DrawFrame'))
    .sort((a, b) => a.ts - b.ts);
  const clockSyncEvents = events.filter((e) => e.name.includes('clock_sync'));

  for (let i = 0; i < drawFrameEvents.length - 1; i += 1) {
    const delta = (drawFrameEvents[i + 1].ts - drawFrameEvents[i].ts) / 10e5;
    fpsTimings.push({
      name: 'fps',
      fps: 1 / delta,
      ts: drawFrameEvents[i + 1].ts,
    });
  }

  return [...fpsTimings, ...clockSyncEvents].sort((a, b) => a.ts - b.ts);
};

const getFpsAvgPerScroll = (events) => {
  const fpsAvgPerScroll = [];
  let fpsSum = 0;
  let count = 0;

  for (let i = 0; i < events.length; i += 1) {
    if (events[i].name.includes('clock_sync')) {
      fpsAvgPerScroll.push(fpsSum / count);
      fpsSum = 0;
      count = 0;
    } else {
      fpsSum += events[i].fps;
      count += 1;
    }
  }

  return fpsAvgPerScroll;
};

const createDataCollectedHandler = (events) => (data) => {
  const event = data.value
    .filter(
      (e) => e.name.includes('DrawFrame') || e.name.includes('clock_sync')
    )
    .map((e) => ({ name: e.name, ts: e.ts }));

  events.push(...event);
};

test.describe('Masonry: scrolls', () => {
  test('scroll test', async ({ page }) => {
    const performanceTimings = [performance.now()];
    const events /*: Array<{ name: string, ts: number }> */ = [];
    let fpsEvents = [];
    let fpsAvgPerScroll = [];

    const scrollCount = DEFAULT_SCROLL_COUNT;

    const client = await page.context().newCDPSession(page);
    await client.send('Tracing.start');

    client.on('Tracing.dataCollected', createDataCollectedHandler(events));

    client.on('Tracing.tracingComplete', () => {
      fpsEvents = getFpsFromEvents(events);
      fpsAvgPerScroll = getFpsAvgPerScroll(fpsEvents);

      fs.writeFileSync(
        'playwright/test-results/scroll-performance-timings.csv',
        eventsToCsv(fpsEvents)
      );
    });

    await page.setViewportSize({ width: 1600, height: PAGE_HEIGHT });
    await page.goto(getServerURL());

    for (let i = 1; i < scrollCount; i += 1) {
      // await page.waitForTimeout(300);
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

    await page.waitForTimeout(2000);

    expect(fpsAvgPerScroll.every((fps) => fps > 5)).toBeTruthy();
  });
});
