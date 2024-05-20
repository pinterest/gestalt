import fs from 'fs';
import { expect, test } from '@playwright/test';
import getServerURL from './utils/getServerURL';
import waitForRenderedItems from './utils/waitForRenderedItems';

const DEFAULT_SCROLL_COUNT = 5;
const PINS_COUNT = 20;
const PAGE_HEIGHT = 1000;

/*::
type Event = {
  name: string,
  ts: number,
  args?: { frameSeqId?: number },
};
*/

// @ts-expect-error - TS7006 - Parameter 'event' implicitly has an 'any' type.
function isValidEvent(event /*: Event */) {
  return event.name === 'clock_sync' || event.args?.frameSeqId;
}

// @ts-expect-error - TS7006 - Parameter 'microseconds' implicitly has an 'any' type.
function microsecondsToMilliseconds(microseconds /*: number */) {
  return microseconds / 1e3;
}

/*
  Parse out the following frame data from the collected trace events:
  - droppedFrames: These are events with the name DroppedFrame and represent frames that were either dropped or not fully rendered
  - completeFrames: These are events with the name DrawFrame and represent frames that were fully rendered
  - frameDuration: This is the duration of each frame, either complete or dropped. A frame duration is calculated as the time between the DrawFrame or DroppedFrame event and the next BeginFrame event
*/
// @ts-expect-error - TS7006 - Parameter 'events' implicitly has an 'any' type.
function parseFrameData(events /*: $ReadOnlyArray<Event> */) {
// @ts-expect-error - TS7034 - Variable 'currentFrameStartTime' implicitly has type 'any' in some locations where its type cannot be determined.
  let currentFrameStartTime;
// @ts-expect-error - TS7006 - Parameter 'e' implicitly has an 'any' type.
  const droppedFrames = events.filter((e) => e.name === 'DroppedFrame').length;
// @ts-expect-error - TS7006 - Parameter 'e' implicitly has an 'any' type.
  const completeFrames = events.filter((e) => e.name === 'DrawFrame').length;
// @ts-expect-error - TS2347 - Untyped function calls may not accept type arguments.
  const frameDuration = events.reduce<Array<any>>(
// @ts-expect-error - TS7006 - Parameter 'acc' implicitly has an 'any' type. | TS7006 - Parameter 'event' implicitly has an 'any' type.
    (acc, event) => {
      if (event.name === 'BeginFrame') {
// @ts-expect-error - TS7005 - Variable 'currentFrameStartTime' implicitly has an 'any' type.
        if (currentFrameStartTime != null) {
          // ts is stored in microseconds. See: https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/edit
// @ts-expect-error - TS7005 - Variable 'currentFrameStartTime' implicitly has an 'any' type.
          const delta = microsecondsToMilliseconds(event.ts - currentFrameStartTime);
          acc.push(delta);
        }
      }
      if (event.name === 'DrawFrame' || event.name === 'DroppedFrame') {
        currentFrameStartTime = event.ts;
      }
      return acc;
    },
    [] /*: Array<number> */,
  );

  return {
    droppedFrames,
    completeFrames,
    frameDurations: frameDuration,
  };
}

// @ts-expect-error - TS7006 - Parameter 'events' implicitly has an 'any' type.
function filterAndSortEvents(events /*: Array<Event> */) {
// @ts-expect-error - TS7006 - Parameter 'a' implicitly has an 'any' type. | TS7006 - Parameter 'b' implicitly has an 'any' type.
  const sortedEvents = events.sort((a, b) => a.ts - b.ts);
// @ts-expect-error - TS7006 - Parameter 'e' implicitly has an 'any' type.
  const firstScrollEvent = sortedEvents.find((e) => e.name === 'scrollTimingStart');
  // return all events that occur after the initial scroll
// @ts-expect-error - TS7006 - Parameter 'e' implicitly has an 'any' type.
  return sortedEvents.filter((e) => e.ts > (firstScrollEvent?.ts ?? 0));
}

test.describe('Masonry: scrolls', () => {
  test('scroll test', async ({ page }) => {
// @ts-expect-error - TS7034 - Variable 'events' implicitly has type 'any[]' in some locations where its type cannot be determined.
    const events /*: Array<Event> */ = [];

    // Starting the CDP session only including the desired categories
    const client = await page.context().newCDPSession(page);

    await page.setViewportSize({ width: 1600, height: PAGE_HEIGHT });
// @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
    await page.goto(getServerURL());

    // wait for initial paint before we start scrolling to flush out paints
    await waitForRenderedItems(page, {
      targetItemsGTE: PINS_COUNT,
    });

    const traceCompleteEvent = new Promise((resolve) => {
      client.on('Tracing.tracingComplete', () => {
// @ts-expect-error - TS2794 - Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?
        resolve();
      });
    });
    // This will be called when tracing is complete
    client.on('Tracing.dataCollected', (data) => {
      events.push(...data.value.filter(isValidEvent));
    });

    await client.send('Tracing.start', {
      traceConfig: {
        includedCategories: [
          'benchmark',
          'clock_sync',
          // add these categories to ensure we get frame data
          'disabled-by-default-devtools.timeline',
          'disabled-by-default-devtools.timeline.frame',
        ],
      },
    });

    // Scroll x amount of times, we add the sync marker at the start of each scroll
    for (let i = 1; i < DEFAULT_SCROLL_COUNT; i += 1) {
      await client.send('Tracing.recordClockSyncMarker', {
        syncId: 'scrollTimingStart',
      });

      await page.evaluate(
        ({ pageHeight, index }) => {
          window.scrollTo({
            top: pageHeight * (index + 1),
            behavior: 'smooth',
          });
        },
        { pageHeight: PAGE_HEIGHT, index: i },
      );
      await waitForRenderedItems(page, {
        targetItemsGTE: PINS_COUNT * (i + 1),
      });
    }

    await client.send('Tracing.end');

    // We need this to wait for the tracing data to be completed
    await traceCompleteEvent;

// @ts-expect-error - TS7005 - Variable 'events' implicitly has an 'any[]' type.
    const sortedEvents = filterAndSortEvents(events);
    const totalTime = microsecondsToMilliseconds(
      sortedEvents[sortedEvents.length - 1].ts - sortedEvents[0].ts,
    );

    const { droppedFrames, completeFrames, frameDurations } = parseFrameData(sortedEvents);

    const results = {
      totalTime,
      droppedFrames,
      completeFrames,
      frameDurations,
// @ts-expect-error - TS7006 - Parameter 'a' implicitly has an 'any' type. | TS7006 - Parameter 'b' implicitly has an 'any' type.
      meanFrameDuration: frameDurations.reduce((a, b) => a + b, 0) / frameDurations.length,
      maxFrameDuration: Math.max(...frameDurations),
      // define FPS as the number of complete frames / total time (in seconds)
      fps: completeFrames / (totalTime / 1000),
    } as const;

    // eslint-disable-next-line no-console
    console.log('Test results', results);

    // This is temp until we understand the numbers on ci environment
    fs.writeFileSync(
      'playwright/test-results/scroll-performance-results.json',
      JSON.stringify(results, null, 2),
    );

    // just setting some initial assertion until we gather more data
    expect(results.fps).toBeGreaterThan(0);
    expect(results.completeFrames).toBeGreaterThan(0);
  });
});
