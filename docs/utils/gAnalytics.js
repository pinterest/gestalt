// @flow strict

// `eventName` should be relatively generic.
// pass `value` to provide more context, such as the current component
export default function logGAEvent(event: string, value?: { [key: string]: string }) {
  if (!window.gtag) {
    return;
  }

  window.gtag('event', 'generic', {
    event_category: 'page-event',
    event_label: event,
    value: JSON.stringify(value),
  });
}
