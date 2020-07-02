// @flow strict

export type sidebarIndexType = Array<{|
  sectionPathname: string,
  displayName: string,
  pages?: Array<string>,
  subsections?: Array<{| [string]: Array<string> |}>,
|}>;

const componentSubSectionPages = {
  displayDate: ['Avatar', 'AvatarPair', 'Badge', 'GroupAvatar', 'Table'],
  feedBack: ['Modal', 'Pulsar', 'Spinner', 'Toast'],
  foundations: ['Heading', 'Icon', 'Text'],
  forms: [
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
  ],
  layout: [
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
  ],
  media: ['Image', 'Letterbox', 'Mask', 'Video'],
  navigation: ['Link', 'SegmentedControl', 'Tabs'],
};

// sidebarIndex is the source of truth for the sidebar documentation menu.
// sidebarIndex establishes the sidebar hierarchical menu order:
// section 1
//    >>> subsection 1
//           >>> page 1
//    >>> subsection 2
//           >>> page 2
//           >>> page 3
// [Documentation] pages (p.e. 'Spinner', 'Installation') get grouped in subsections (p.e. 'Feedback', 'Forms'),
// subsection get grouped in top level sections (p.e. 'getting-started', 'components').
// Any new section/subsectionName/page must be added to sidebarIndex to be displayed.
const sidebarIndex: sidebarIndexType = [
  {
    sectionPathname: 'getting-started',
    sectionName: 'Getting Started',
    pages: ['Installation'],
  },
  {
    sectionPathname: 'components',
    sectionName: 'Components',
    subsections: [
      {
        subsectionName: 'Data Display',
        pages: componentSubSectionPages.displayDate,
      },
      {
        subsectionName: 'Feedback',
        pages: componentSubSectionPages.feedBack,
      },
      {
        subsectionName: 'Foundation',
        pages: componentSubSectionPages.foundations,
      },
      {
        subsectionName: 'Forms',
        pages: componentSubSectionPages.forms,
      },
      {
        subsectionName: 'Layout',
        pages: componentSubSectionPages.layout,
      },
      {
        subsectionName: 'Media',
        pages: componentSubSectionPages.media,
      },
      {
        subsectionName: 'Navigation',
        pages: componentSubSectionPages.navigation,
      },
    ],
  },
];

export default sidebarIndex;
