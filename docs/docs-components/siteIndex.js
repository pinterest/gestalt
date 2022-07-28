// @flow strict

export type siteIndexType = {|
  sectionName: string,
  pages: Array<string | siteIndexType>,
|};

// sidebarIndex is the source of truth for the sidebar documentation menu.
// sidebarIndex establishes the sidebar hierarchical menu order:
// section 1
//    >>> page 1
// section 2
//    >>> page 2
//    >>> page 3
// Any new section/page must be added to sidebarIndex to be displayed.
const siteIndex: Array<siteIndexType> = [
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
          'RadioGroup',
          'SearchField',
          'SegmentedControl',
          'SideNavigation',
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
      'Elevation',
      {
        sectionName: 'Typography',
        pages: ['Guidelines'],
      },
      {
        sectionName: 'Iconography',
        pages: ['Library', 'Usage', 'Creating icons'],
      },
      'Layouts',
      'Screen sizes',
    ],
  },
  {
    sectionName: 'Roadmap',
    pages: ['Overview', "What's New"],
  },
];

export default siteIndex;
