// @flow strict

/*::
type Event = {
  name: string,
  ts: number,
  fps?: number,
};

type Metric = { avg: number, max: number, min: number };
*/

export const eventsToCsv = (
  events /*: $ReadOnlyArray<Event> */
) /*: string */ =>
  events
    .map((e) => (e.name.includes('clock_sync') ? e.name : e.fps))
    .join('\n');

export const metricsToCsv = (
  metrics /*: $ReadOnlyArray<Metric> */
) /*: string */ => {
  let result;

  const keys = Object.keys(metrics[0]);
  result = `${keys.join(',')}\n`;

  metrics.forEach((m) => {
    result += `${keys.map((k) => m[k]).join(',')}\n`;
  });

  return result;
};

export const getFpsFromEvents = (
  events /*: $ReadOnlyArray<Event> | [] */
) /*: $ReadOnlyArray<Event> */ => {
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

export const getFpsMetricsPerScroll = (
  events /*: $ReadOnlyArray<Event> */
) /*: $ReadOnlyArray<Metric> */ => {
  const fpsMetricsPerScroll = [];
  let fpsPerScroll = [];

  for (let i = 0; i <= events.length; i += 1) {
    if (events[i]?.name.includes('clock_sync') || i === events.length) {
      fpsMetricsPerScroll.push({
        avg: fpsPerScroll.reduce((sum, x) => sum + x) / fpsPerScroll.length,
        max: fpsPerScroll.reduce((hi, x) => (x > hi ? x : hi)),
        min: fpsPerScroll.reduce((lo, x) => (x < lo ? x : lo)),
      });
      fpsPerScroll = [];
    } else if (events[i]?.fps) {
      fpsPerScroll.push(events[i]?.fps);
    }
  }

  return fpsMetricsPerScroll;
};
