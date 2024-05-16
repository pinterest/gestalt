// `eventName` should be relatively generic.
// pass `value` to provide more context, such as the current component
export default function logGAEvent(
  event: string,
  value?: {
    [key: string]: string;
  },
) {
// @ts-expect-error - TS2339 - Property 'gtag' does not exist on type 'Window & typeof globalThis'.
  if (!window.gtag) {
    return;
  }

// @ts-expect-error - TS2339 - Property 'gtag' does not exist on type 'Window & typeof globalThis'.
  window.gtag('event', 'generic', {
    event_category: 'page-event',
    event_label: event,
    value: JSON.stringify(value),
  });
}
