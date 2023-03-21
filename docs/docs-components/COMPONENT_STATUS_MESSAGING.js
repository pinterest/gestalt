// @flow strict

export const STATUS_EQUIVALENCY_MAP = Object.freeze({
  'ready': 'ok',
  'notAvailable': 'notAvailable',
  'partial': 'inProgress',
  'planned': 'unstarted',
  'deprecated': 'canceled',
});

export const STATUS_DESCRIPTION = Object.freeze({
  ready: { title: 'Ready', description: "Available for use. Has been reviewed and QA'd." },
  partial: {
    title: 'Partially ready',
    description: 'Ready, but may not be available for all platforms.',
  },
  notAvailable: { title: 'Not available', description: 'Not currently available or planned.' },
  planned: {
    title: 'Planned',
    description:
      'Slotted for an upcoming sprint or in the process of being updated. For details on planned work, visit the Roadmap page.',
  },
  deprecated: { title: 'Deprecated', description: 'No longer supported by Gestalt.' },
});

export const COMPONENT_STATUS_MESSAGING = Object.freeze({
  accessible: { shortTitle: 'A11y', title: 'Accessibility' },
  figma: {
    shortTitle: 'Figma',
    title: 'Figma Library',
    ready: 'Component is available in Figma across all platforms.',
    partial: 'Component is live in Figma, however may not be available for all platforms.',
    notAvailable: 'Component is not currently available in Figma.',
    planned: 'Component is slotted to be added to Figma.',
  },
  android: {
    title: 'Android',
    ready: 'Component is available in code for Android.',
    partial: '',
    notAvailable: 'Component is not currently available in code for Android.',
    planned: 'Component is slotted to be built for Android.',
  },
  iOS: {
    title: 'iOS',
    ready: 'Component is available in code for iOS.',
    partial: '',
    notAvailable: 'Component is not currently available in code for iOS.',
    planned: 'Component is slotted to be built for iOS.',
  },
  responsive: {
    shortTitle: 'Web',
    title: 'Responsive Web',
    ready: 'Component is available in code for web and mobile web.',
    partial: '',
    notAvailable: 'Component is not currently available in code for web and mobile web.',
    planned: 'Component is slotted to be built for web and mobile web.',
  },
  documentation: {
    title: 'Documentation',
    ready: 'Component has been documented across all platforms.',
    partial:
      'Component has been documented, however some content may be missing or documentation may not be available for all platforms.',
    notAvailable: 'Component does not include Gestalt documentation.',
    planned: 'Component is slotted to be documented across all platforms.',
  },
});

export const COMPONENT_A11Y_STATUS_MESSAGING = Object.freeze({
  a11yVisual: {
    title: 'Visually accessible',
    ready: 'Component has been checked for appropriate color contrast, color use and readability.',
    partial:
      'Component has been reviewed, however it may not meet criteria for color contrast, color use and readability.',
    notAvailable:
      'Component has not been checked for appropriate color contrast, color use and readability.',
    planned: 'Component is slotted for accessibility improvements.',
  },
  a11yNavigation: {
    title: 'Navigable and operable',
    ready:
      'Component includes focus states and an intuitive structure that can be navigated using a keyboard or other input modalities.',
    partial:
      'Component has been reviewed, however it may not meet criteria for appropriate structure and navigation.',
    notAvailable: 'Component has not been checked for appropriate structure and navigation.',
    planned: 'Component is slotted for accessibility improvements.',
  },
  a11yScreenreader: {
    title: 'Screen reader compatible',
    ready:
      'Component has appropriate headings, labels, and alternative text that allows it to be verbally described by a screen reader.',
    partial:
      'Component has been reviewed, however it may not meet  criteria regarding headings, labels, and alternative text.',
    notAvailable:
      'Component has not been checked for appropriate headings, labels, and alternative text.',
    planned: 'Component is slotted for accessibility improvements.',
  },
  a11yComprehension: {
    title: 'Understandable',
    ready:
      'Component contains content that is understandable by most users, operates in predictable ways and provides intuitive error handling.',
    partial:
      'Component has been reviewed, however it may not meet  criteria for understandability and error handling. ',
    notAvailable: 'Component content has not been checked for understandability or error handling.',
    planned: 'Component is slotted for accessibility improvements.',
  },
});
