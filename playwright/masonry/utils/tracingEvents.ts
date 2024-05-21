type Event = {
  name: string;
  ts: number;
  fps?: number;
};

type Metric = { avg: number; max: number; min: number };

// @ts-expect-error - TS7006 - Parameter 'events' implicitly has an 'any' type.
export const eventsToCsv = (events: ReaoOnlyArray<Event>): string =>
  // @ts-expect-error - TS7006 - Parameter 'e' implicitly has an 'any' type.
  events.map((e) => (e.name.includes('clock_sync') ? e.name : e.fps)).join('\n');

export const metricsToCsv = (metrics: ReadonlyArray<Metric>): string => {
  // @ts-expect-error - TS7034 - Variable 'result' implicitly has type 'any' in some locations where its type cannot be determined.
  let result;

  const keys = Object.keys(metrics[0]);
  result = `${keys.join(',')}\n`;

  metrics.forEach((m) => {
    // @ts-expect-error - TS7005 - Variable 'result' implicitly has an 'any' type.
    result += `${keys.map((k) => m[k]).join(',')}\n`;
  });

  return result;
};

export const getFpsFromEvents = (events: ReadonlyArray<Event> | []): ReadonlyArray<Event> => {
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

export const getFpsMetricsPerScroll = (events: ReadonlyArray<Event>): ReadonlyArray<Metric> => {
  const fpsMetricsPerScroll = [];
  let fpsPerScroll: number[] = [];

  for (let i = 0; i <= events.length; i += 1) {
    const event = events[i];
    if (event?.name.includes('clock_sync') || i === events.length) {
      fpsMetricsPerScroll.push({
        avg: fpsPerScroll.reduce((sum, x) => sum + x) / fpsPerScroll.length,
        max: fpsPerScroll.reduce((hi, x) => (x > hi ? x : hi)),
        min: fpsPerScroll.reduce((lo, x) => (x < lo ? x : lo)),
      });
      fpsPerScroll = [];
    } else if (event?.fps) {
      fpsPerScroll.push(event.fps);
    }
  }

  return fpsMetricsPerScroll;
};
