// @flow strict

export type sidebarIndexType = Array<{|
  sectionPathname: string,
  displayName: string,
  pages: Array<string>,
|}>;

// sidebarIndex is the source of truth for the sidebar documentation menu.
// sidebarIndex establishes the sidebar hierarchical menu order:
// section 1
//    >>> page 1
// section 2
//    >>> page 2
//    >>> page 3
// Any new section/page must be added to sidebarIndex to be displayed.
const sidebarIndex: sidebarIndexType = [
  {
    sectionPathname: 'getting-started',
    sectionName: 'Getting Started',
    pages: ['Installation'],
  },
  {
    sectionPathname: 'foundation',
    sectionName: 'Foundation',
    pages: ['Heading', 'Icon', 'Text'],
  },

  {
    sectionName: 'Configuration',
    sectionPathname: 'configuration',
    pages: ['Provider'],
  },
  {
    sectionName: 'Accessibility',
    sectionPathname: 'accessibility',
    pages: ['useReducedMotion'],
  },
  {
    sectionName: 'Data Display',
    sectionPathname: 'data-display',
    pages: ['Avatar', 'AvatarPair', 'Badge', 'GroupAvatar', 'Table'],
  },
  {
    sectionName: 'Feedback',
    sectionPathname: 'feedback',
    pages: ['Callout', 'Modal', 'Pulsar', 'Spinner', 'Toast', 'Tooltip'],
  },

  {
    sectionName: 'Forms',
    sectionPathname: 'forms',
    pages: [
      'Button',
      'Checkbox',
      'DatePicker',
      'Flyout',
      'IconButton',
      'Label',
      'Pog',
      'RadioButton',
      'SearchField',
      'SelectList',
      'Switch',
      'TapArea',
      'TextArea',
      'TextField',
      'Tooltip',
      'Typeahead',
    ],
  },
  {
    sectionName: 'Layout',
    sectionPathname: 'layout',
    pages: [
      'Box',
      'Card',
      'Collage',
      'Column',
      'Container',
      'Divider',
      'Layer',
      'Masonry',
      'Row',
      'Stack',
      'Sticky',
      'ZIndexClasses',
    ],
  },
  {
    sectionName: 'Media',
    sectionPathname: 'media',
    pages: ['Image', 'Letterbox', 'Mask', 'Video'],
  },
  {
    sectionName: 'Navigation',
    sectionPathname: 'navigation',
    pages: ['Link', 'SegmentedControl', 'Tabs'],
  },
];

export default sidebarIndex;
