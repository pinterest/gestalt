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
      "What's New",
      'How to Work with Us',
      'Installation',
      'Design',
      'Development',
      'Eslint Plugin',
      'How to Hack Around Gestalt',
      'FAQ',
    ],
  },
  {
    sectionName: 'Guidelines',
    pages: [
      'Accessibility',
      'Design Tokens',
      'Color',
      'Iconography and SVGs',
      'Layouts',
      'Screen Sizes',
      'Tooling',
    ],
  },
  {
    sectionName: 'Foundation',
    pages: ['Heading', 'Icon', 'Text'],
  },
  {
    sectionName: 'Configuration',
    pages: ['ColorSchemeProvider', 'OnInteractionProvider', 'OnLinkNavigationProvider'],
  },
  {
    sectionName: 'Custom Hooks',
    pages: ['useFocusVisible', 'useReducedMotion'],
  },
  {
    sectionName: 'Data Display',
    pages: ['Avatar', 'AvatarGroup', 'AvatarPair', 'Badge', 'Datapoint', 'Status', 'Table'],
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
      'ComboBox',
      'DatePicker',
      'Dropdown',
      'Fieldset',
      'IconButton',
      'Label',
      'NumberField',
      'Pog',
      'Popover',
      'RadioButton',
      'SearchField',
      'SelectList',
      'Switch',
      'Tag',
      'TapArea',
      'TextArea',
      'TextField',
      'Tooltip',
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
      'Layer',
      'Masonry',
      'Module',
      'PageHeader',
      'ScrollBoundaryContainer',
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
    pages: ['Dropdown', 'Link', 'SegmentedControl', 'Tabs'],
  },
];

export default sidebarIndex;
