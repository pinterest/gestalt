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
    pages: ["What's New", 'Installation', 'Development', 'Layouts', 'Faq'],
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
    pages: ['useFocusVisible', 'useReducedMotion'],
  },
  {
    sectionName: 'Data Display',
    pages: ['Avatar', 'AvatarPair', 'Badge', 'GroupAvatar', 'Table'],
  },
  {
    sectionName: 'Feedback',
    pages: [
      'ActivationCard',
      'Callout',
      'Modal',
      'Pulsar',
      'Spinner',
      'Toast',
      'Tooltip',
      'Upsell',
    ],
  },

  {
    sectionName: 'Forms',
    pages: [
      'Button',
      'ButtonGroup',
      'Checkbox',
      'DatePicker',
      'Dropdown',
      'Flyout',
      'IconButton',
      'Label',
      'Pog',
      'RadioButton',
      'SearchField',
      'SelectList',
      'Switch',
      'Tag',
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
      'Flex',
      'Module',
      'Layer',
      'Masonry',
      'ScrollBox',
      'Sheet',
      'Sticky',
      'ZIndex Classes',
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
