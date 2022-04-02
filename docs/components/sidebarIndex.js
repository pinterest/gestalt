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
    pages: [
      'About us',
      'Component overview',
      'Design',
      'Development',
      'How to work with us',
      'Installation',
      'Roadmap',
      "What's new",
    ],
  },
  {
    sectionName: 'Foundations',
    pages: [
      'Accessibility',
      'Color palette',
      'Color usage',
      'Design tokens',
      'Elevation',
      'Iconography and SVGs',
      'Layouts',
      'Screen sizes',
    ],
  },
  {
    sectionName: 'Resources',
    pages: ['Eslint plugin', 'FAQ', 'How to hack around Gestalt', 'Tooling'],
  },
  {
    sectionName: 'Building blocks',
    pages: [
      'Box',
      'Column',
      'Container',
      'Flex',
      'Icon',
      'Layer',
      'Letterbox',
      'Mask',
      'Pog',
      'ScrollBoundaryContainer',
      'Sticky',
      'TapArea',
      'ZIndex Classes',
    ],
  },

  {
    sectionName: 'Actions',
    pages: ['Button', 'ButtonGroup', 'IconButton', 'Link'],
  },
  {
    sectionName: 'Avatars',
    pages: ['Avatar', 'AvatarGroup', 'AvatarPair'],
  },
  {
    sectionName: 'Controls',
    pages: ['Checkbox', 'RadioButton', 'Switch'],
  },
  {
    sectionName: 'Data',
    pages: ['Datapoint', 'Table', 'Tag'],
  },
  {
    sectionName: 'Fields & Forms',
    pages: [
      'ComboBox',
      'DatePicker',
      'Dropdown',
      'Fieldset',
      'Label',
      'NumberField',
      'SearchField',
      'SelectList',
      'TextArea',
      'TextField',
    ],
  },
  {
    sectionName: 'Loading',
    pages: ['Pulsar', 'Spinner'],
  },
  {
    sectionName: 'Messaging',
    pages: [
      'ActivationCard',
      'Badge',
      'Callout',
      'Modal',
      'Module',
      'Popover',
      'Sheet',
      'Status',
      'Toast',
      'Tooltip',
      'Upsell',
    ],
  },
  {
    sectionName: 'Navigation',
    pages: ['PageHeader', 'SegmentedControl', 'Tabs'],
  },
  {
    sectionName: 'Pins & Imagery',
    pages: ['Collage', 'Image', 'Masonry', 'Video'],
  },
  {
    sectionName: 'Structure',
    pages: ['Divider', 'Card'],
  },
  {
    sectionName: 'Text',
    pages: ['Heading', 'Text'],
  },
  {
    sectionName: 'Utilities',
    pages: [
      'ColorSchemeProvider',
      'OnLinkNavigationProvider',
      'useFocusVisible',
      'useReducedMotion',
    ],
  },
];

export default sidebarIndex;
