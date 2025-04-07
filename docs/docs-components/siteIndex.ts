export type siteIndexType = {
  sectionName: string;
  pages: ReadonlyArray<string | siteIndexType>;
};

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
const siteIndex: readonly [siteIndexType, ...siteIndexType[]] = [
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
            pages: ['Creating and updating pages', 'Development process', 'Experimentation'],
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
      'Component status',
      'Avatar',
      'AvatarGroup',
      'Badge',
      'Button',
      'ButtonGroup',
      'ButtonToggle',
      'Checkbox',
      'Icon',
      'IconButton',
      'IconButtonFloating',
      'ListAction',
      'SearchField',
      'SearchGuide',
      'Sheet',
      'Switch',
      'Tabs',
      'Text',
      'TextArea',
      'TextField',
      'Toast',
    ],
  },
  {
    sectionName: 'iOS',
    pages: [
      'Overview',
      'Component status',
      'Avatar',
      'AvatarGroup',
      'Badge',
      'Button',
      'ButtonGroup',
      'ButtonToggle',
      'Checkbox',
      'Icon',
      'IconButton',
      'IconButtonFloating',
      'ListAction',
      {
        sectionName: 'Module',
        pages: ['Module', 'Module.Header', 'Module.Boards', 'Module.Pins'],
      },
      'SearchField',
      'SearchGuide',
      'Sheet',
      'Switch',
      'Tabs',
      'Text',
      'TextArea',
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
          'DesignTokensProvider',
          'DeviceTypeProvider',
          'GlobalEventsHandlerProvider',
          'useFocusVisible',
          'useReducedMotion',
        ],
      },
      'Accordion',
      'ActivationCard',
      'Avatar',
      'AvatarGroup',
      'AvatarGroupCluster',
      'Badge',
      'BannerCallout',
      'BannerOverlay',
      'BannerSlim',
      'BannerUpsell',
      'Box',
      'Button',
      'ButtonLink',
      'ButtonGroup',
      'ButtonSocial',
      'ButtonToggle',
      'ChartGraph',
      'Checkbox',
      'Collage',
      'Column',
      'ComboBox',
      'Container',
      'Datapoint',
      'DateField',
      'DatePicker',
      'DateRange',
      'Divider',
      'Dropdown',
      'Fieldset',
      'Flex',
      'Heading',
      'HelpButton',
      'Icon',
      'IconButton',
      'IconButtonLink',
      'IconButtonFloating',
      'IconCompact',
      'Image',
      'Indicator',
      'Label',
      'Layer',
      'Letterbox',
      'Link',
      'List',
      'Mask',
      'Masonry',
      'Modal',
      'ModalAlert',
      'NumberField',
      'OverlayPanel',
      'PageHeader',
      'Pog',
      'Popover',
      'PopoverMessage',
      'Pulsar',
      'RadioGroup',
      'SearchField',
      'SearchGuide',
      'SearchGuideLink',
      'SegmentedControl',
      'SelectList',
      'SheetMobile',
      'SideNavigation',
      'Spinner',
      'Status',
      'Sticky',
      'Switch',
      'Table',
      'TableOfContents',
      'Tabs',
      'Tag',
      'TagData',
      'TapArea',
      'TapAreaLink',
      'Text',
      'TextCompact',
      'TextUI',
      'TextArea',
      'TextField',
      'TileData',
      'Toast',
      'Tooltip',
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
        sectionName: 'Motion',
        pages: ['Principles', 'Guidelines'],
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
        pages: [
          'Overview',
          {
            sectionName: 'Charts and graphs',
            pages: [
              'General guidelines',
              'Bar graphs',
              'Line graphs',
              'Combo graphs',
              'Donut charts',
              'Funnel charts',
            ],
          },
          'Micro visualizations',
          'Available components',
          {
            sectionName: 'Color',
            pages: ['Palette', 'Usage'],
          },
        ],
      },
      {
        sectionName: 'Design tokens',
        pages: ['Overview', 'Component tokens'],
      },
      'Elevation',
      {
        sectionName: 'Forms',
        pages: ['Overview', 'Structure and behavior', 'Example code', 'Available components'],
      },
      {
        sectionName: 'Iconography',
        pages: ['Custom and brand icons', 'Usage', 'Creating icons'],
      },
      'Illustration',
      {
        sectionName: 'International Design',
        pages: [
          'About international design',
          'Icon localization',
          'Number localization',
          'Pluralization',
          {
            sectionName: 'RTL guidelines',
            pages: ['RTL overview', 'Layout and text direction', 'Iconography', 'Typography'],
          },
        ],
      },
      'Layout',
      {
        sectionName: 'Messaging',
        pages: ['Overview', 'Priority and placement', 'Available components'],
      },
      'Screen sizes',
      'Typography',
    ],
  },
  {
    sectionName: 'Team support',
    pages: [
      'Overview',
      {
        sectionName: 'Design contributions',
        pages: [
          'Design contributions overview',
          'Contribution types and criteria',
          'Process deep dive',
          'Process diagrams',
        ],
      },
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
