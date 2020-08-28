// @flow strict

export type sidebarIndexType = {|
  sectionName: string,
  pages: Array<string>,
|};

// sidebarIndex is the source of truth for the sidebar documentation menu.
// sidebarIndex establishes the sidebar hierarchical menu order:
// section 1
//    >>> page 1
// section 2
//    >>> page 2
//    >>> page 3
// Any new section/page must be added to sidebarIndex to be displayed.
const sidebarIndex: Array<sidebarIndexType> = [
  {
    sectionName: 'Getting Started',
    pages: ['Installation', 'Development', 'Faq'],
  },
  {
    sectionName: 'Foundation',
    pages: ['Heading', 'Icon', 'Text'],
  },

  {
    sectionName: 'Configuration',
    pages: ['Provider'],
  },
  {
    sectionName: 'Accessibility',
    pages: ['useReducedMotion'],
  },
  {
    sectionName: 'Data Display',
    pages: ['Avatar', 'AvatarPair', 'Badge', 'GroupAvatar', 'Table'],
  },
  {
    sectionName: 'Feedback',
    pages: ['Callout', 'Modal', 'Pulsar', 'Spinner', 'Toast', 'Tooltip'],
  },

  {
    sectionName: 'Forms',
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
    pages: [
      'Box',
      'Card',
      'Collage',
      'Column',
      'Container',
      'Divider',
      'ExpandableModule',
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
    pages: ['Image', 'Letterbox', 'Mask', 'Video'],
  },
  {
    sectionName: 'Navigation',
    pages: ['Link', 'SegmentedControl', 'Tabs'],
  },
];

export default sidebarIndex;
