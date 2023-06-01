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
      'Designers',
      {
        sectionName: 'Developers',
        pages: [
          {
            sectionName: 'Contributing',
            pages: ['Creating and updating pages', 'Development process'],
          },
          'ESLint plugin',
          'Hacking Gestalt',
          'Installation',
          'Releases',
          {
            sectionName: 'Tooling',
            pages: ['Web'],
          },
        ],
      },
      'FAQ',
    ],
  },
  {
    sectionName: 'Android',
    pages: [
      'Overview',
      'Avatar',
      'Button',
      'ButtonGroup',
      'Checkbox',
      'Icon',
      'IconButton',
      'Sheet',
      'Switch',
      'Tabs',
      'Text',
      'TextArea',
      'TextField',
      'SearchField',
      'Toast',
    ],
  },
  {
    sectionName: 'iOS',
    pages: [
      'Overview',
      'Avatar',
      'Button',
      'Checkbox',
      'Icon',
      'IconButton',
      'Sheet',
      'Switch',
      'Tabs',
      'Text',
      'TextField',
      'Toast',
    ],
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
          'DefaultLabelProvider',
          'DeviceTypeProvider',
          'GlobalEventsHandlerProvider',
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
      'Checkbox',
      'Collage',
      'Column',
      'ComboBox',
      'Container',
      'Datapoint',
      'DateField',
      'DatePicker',
      'Divider',
      'Dropdown',
      'Fieldset',
      'Flex',
      'Heading',
      'HelpButton',
      'Icon',
      'IconButton',
      'IconButtonFloating',
      'Image',
      'Label',
      'Layer',
      'Letterbox',
      'Link',
      'List',
      'Mask',
      'Masonry',
      'Modal',
      'ModalAlert',
      'Module',
      'NumberField',
      'OverlayPanel',
      'PageHeader',
      'Pog',
      'Popover',
      'PopoverEducational',
      'Pulsar',
      'RadioButton',
      'RadioGroup',
      'SearchField',
      'SegmentedControl',
      'SelectList',
      'SheetMobile',
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
      'TileData',
      'Toast',
      'Tooltip',
      'Upsell',
      'Video',
      'WashAnimated',
      'ZIndex classes',
    ],
  },
  {
    sectionName: 'Foundations',
    pages: [
      'Overview',
      'Accessibility',
      {
        sectionName: 'Animation',
        pages: ['Principles', 'Guidelines', 'Implementation'],
      },
      {
        sectionName: 'Brand expression',
        pages: ['Guidelines', 'Color fills'],
      },
      {
        sectionName: 'Color',
        pages: ['Palette', 'Usage', 'Examples'],
      },
      {
        sectionName: 'Content standards',
        pages: [
          'Voice',
          'Formatting',
          'Grammar',
          'Inclusive language',
          'UI elements',
          'Syntax and structure',
          'Resources',
        ],
      },
      {
        sectionName: 'Data visualization',
        pages: ['Palette', 'Usage'],
      },
      'Design tokens',
      'Elevation',
      {
        sectionName: 'Forms',
        pages: ['Overview', 'Structure and behavior', 'Available components'],
      },
      {
        sectionName: 'Iconography',
        pages: ['Library', 'Custom and brand icons', 'Usage', 'Creating icons'],
      },
      'Illustration',
      'Layouts',
      {
        sectionName: 'Messaging',
        pages: ['Overview', 'Priority and placement', 'Available components'],
      },
      'Screen sizes',

      {
        sectionName: 'Typography',
        pages: ['Guidelines'],
      },
    ],
  },
  {
    sectionName: 'Blog',
    pages: ['2023 Q1 Newsletter'],
  },
  {
    sectionName: 'Team support',
    pages: [
      'Overview',
      'Be a Gestalt advocate',
      'Component request',
      'Contributions',
      {
        sectionName: 'Design file hygiene',
        pages: ['Naming convention', 'Organizing layout', 'Figma branches', 'Design handoff'],
      },
      'Get help',
      'Training',
    ],
  },
];

export default siteIndex;
