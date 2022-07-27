// @flow strict

export type sidebarIndexType = {|
  sectionName: string,
  pages: Array<string | sidebarIndexType>,
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
    sectionName: 'Get started',
    pages: [
      'About Us',
      'Design',
      {
        sectionName: 'Developers',
        pages: [
          'Installation',
          'Eslint plugin',
          {
            sectionName: 'Tooling',
            pages: ['Web', 'iOS', 'Android'],
          },
          'Hacking Gestalt',
        ],
      },
      'How to work with us',
      'FAQ',
    ],
  },
  {
    sectionName: 'Components',
    pages: [
      {
        sectionName: 'Android',
        pages: ['Overview'],
      },
      {
        sectionName: 'iOS',
        pages: ['Overview'],
      },
      {
        sectionName: 'Web',
        pages: [
          'Overview',
          'Component status',
          'ActivationCard',
          'Avatar',
          'AvatarGroup',
          'Badge',

          {
            sectionName: 'Buttons',
            pages: ['Button', 'ButtonGroup', 'IconButton', 'Pog'],
          },
          'Callout',
          'Card',
          'Checkbox',
          'Collage',
          'Datapoint',
          'DatePicker',
          'Divider',
          'Dropdown',
          'Flex',
          {
            sectionName: 'Form fields',
            pages: [
              'ComboBox',
              'Fieldset',
              'Label',
              'NumberField',
              'SelectList',
              'TextArea',
              'TextField',
            ],
          },
          'Icon',
          'Image',
          'Heading',
          'Layer',
          'Letterbox',
          'Link',
          'Mask',
          'Masonry',
          'Modal',
          'Module',
          'PageHeader',
          'Popover',
          'Pulsar',
          'RadioButton',
          'SearchField',
          'SegmentedControl',
          {
            sectionName: 'SideNavigation',
            pages: ['TopItem', 'Section', 'NestedItem', 'Group', 'NestedGroup'],
          },
          'Sheet',
          'Spinner',
          'Status',
          'Switch',
          'Table',
          'Tabs',
          'Tag',
          'Text',
          'Toast',
          'Tooltip',
          'Upsell',
          {
            sectionName: 'Utilities',
            pages: [
              'Container',
              'Box',
              'ColorSchemeProvider',
              'OnLinkNavigationProvider',
              'ScrollBoundaryContainer',
              'Sticky',
              'TapArea',
              'useFocusVisible',
              'useReducedMotion',
              'ZIndex classes',
            ],
          },
          'Video',
        ],
      },
    ],
  },
  {
    sectionName: 'Foundations',
    pages: [
      'Overview',
      'Accessibility',
      'Design tokens',
      {
        sectionName: 'Color',
        pages: ['Palette', 'Usage', 'Examples'],
      },
      {
        sectionName: 'Data Visualization',
        pages: ['Palette', 'Usage'],
      },
      {
        sectionName: 'Typography',
        pages: ['Guidelines', 'Usage', 'Examples'],
      },
      {
        sectionName: 'Iconography',
        pages: ['Library', 'Usage', 'Creating icons'],
      },
      'Layout',
      'Screen sizes',
    ],
  },
  {
    sectionName: 'Roadmap',
    pages: ['Overview', "What's New"],
  },
];

export default sidebarIndex;
