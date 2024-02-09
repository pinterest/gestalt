// @flow strict

/*::
export type Event = {
  name: string,
  ts: number,
  fps?: number,
};
*/

export const eventsToCsv = (events /*: $ReadOnlyArray<Event> */) =>
  events
    .map((e) => (e.name.includes('clock_sync') ? e.name : e.fps))
    .join('\n');

export const getFpsFromEvents = (events /*: $ReadOnlyArray<Event> | [] */) => {
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

export const getFpsAvgPerScroll = (events /*: $ReadOnlyArray<Event> */) => {
  const fpsAvgPerScroll = [];
  let fpsSum = 0;
  let count = 0;

  for (let i = 0; i < events.length; i += 1) {
    if (events[i]?.name.includes('clock_sync')) {
      fpsAvgPerScroll.push(fpsSum / count);
      fpsSum = 0;
      count = 0;
    } else if (events[i]?.fps) {
      fpsSum += events[i].fps;
      count += 1;
    }
  }

  return fpsAvgPerScroll;
};
