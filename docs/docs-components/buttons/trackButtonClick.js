// @flow strict

// `buttonLabel` should be relatively generic.
// pass `value` to provide more context, such as the current component
export default function trackButtonClick(buttonLabel: string, value?: string) {
  if (!window.gtag) {
    return;
  }

  window.gtag('event', 'click', {
    'event_category': 'button',
    'event_label': buttonLabel,
    value,
  });
}
