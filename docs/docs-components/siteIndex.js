// @flow strict

export type siteIndexType = {|
  sectionName: string,
  pages: $ReadOnlyArray<string | siteIndexType>,
|};

// siteIndex is the source of truth for the side navigation menu.
// siteIndex establishes the sidebar hierarchical menu order:
// section 1 (corresponds to a top tab)
//    >>> page 1
//    >>> nested section 1
//        >>> page 1
//        >>> page 2
// section 2 (corresponds to a top tab)
//    >>> page 2
//    >>> page 3
// Any new section/page must be added to siteIndex to be displayed.
const siteIndex: $ReadOnlyArray<siteIndexType> = [
  {
    sectionName: 'Get started',
    pages: [
      'About Us',
      'Design',
      {
        sectionName: 'Developers',
        pages: [
          'Development process',
          'Installation',
          'Eslint plugin',
          'Releases',
          {
            sectionName: 'Tooling',
            pages: ['Web'],
          },
          'Hacking Gestalt',
        ],
      },
      'How to work with us',
      'FAQ',
    ],
  },
  {
    sectionName: 'Android',
    pages: ['Overview', 'Avatar', 'IconButton'],
  },
  {
    sectionName: 'iOS',
    pages: ['Overview', 'Avatar', 'IconButton'],
  },
  {
    sectionName: 'Web',
    pages: [
      'Overview',
      'Component status',
      {
        sectionName: 'Utilities',
        pages: [
          'ColorSchemeProvider',
          'OnLinkNavigationProvider',
          'ScrollBoundaryContainer',
          'useFocusVisible',
          'useReducedMotion',
        ],
      },
      'ActivationCard',
      'Avatar',
      'AvatarGroup',
      'Badge',
      'Box',
      'Button',
      'ButtonGroup',
      'Callout',
      'Card',
      'Checkbox',
      'Collage',
      'Column',
      'ComboBox',
      'Container',
      'Datapoint',
      'DatePicker',
      'Divider',
      'Dropdown',
      'Fieldset',
      'Flex',
      'Heading',
      'Icon',
      'IconButton',
      'Image',
      'Label',
      'Layer',
      'Letterbox',
      'Link',
      'Mask',
      'Masonry',
      'Modal',
      'Module',
      'NumberField',
      'PageHeader',
      'Pog',
      'Popover',
      'Pulsar',
      'RadioButton',
      'RadioGroup',
      'SearchField',
      'SegmentedControl',
      'SelectList',
      'Sheet',
      'SideNavigation',
      'SlimBanner',
      'Spinner',
      'Status',
      'Sticky',
      'Switch',
      'Table',
      'Tabs',
      'Tag',
      'TapArea',
      'Text',
      'TextArea',
      'TextField',
      'Toast',
      'Tooltip',
      'Upsell',
      'Video',
      'ZIndex classes',
    ],
  },
  {
    sectionName: 'Foundations',
    pages: [
      'Overview',
      'Accessibility',
      {
        sectionName: 'Color',
        pages: ['Palette', 'Usage', 'Examples'],
      },
      {
        sectionName: 'Data Visualization',
        pages: ['Palette', 'Usage'],
      },
      'Design tokens',
      'Elevation',
      {
        sectionName: 'Iconography',
        pages: ['Library', 'Usage', 'Creating icons'],
      },
      'Layouts',
      {
        sectionName: 'Messaging',
        pages: [
          'Principles',
          'Available components',
          'Priority and placement',
          'A messaging story',
        ],
      },
      'Screen sizes',

      {
        sectionName: 'Typography',
        pages: ['Guidelines'],
      },
    ],
  },
  {
    sectionName: 'Roadmap',
    pages: ['Overview', "What's New"],
  },
];

export default siteIndex;
