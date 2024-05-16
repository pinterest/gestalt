// `buttonLabel` should be relatively generic.
// pass `value` to provide more context, such as the current component
export default function trackButtonClick(buttonLabel: string, value?: string) {
  // @ts-expect-error - TS2339 - Property 'gtag' does not exist on type 'Window & typeof globalThis'.
  if (!window.gtag) {
    return;
  }

  // @ts-expect-error - TS2339 - Property 'gtag' does not exist on type 'Window & typeof globalThis'.
  window.gtag('event', 'click', {
    'event_category': 'button',
    'event_label': buttonLabel,
    value,
  });
}
