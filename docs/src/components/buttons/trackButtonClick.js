// @flow strict

// Since some buttons have text and some only have icons, we'll use the a11yLabel for consistency
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
