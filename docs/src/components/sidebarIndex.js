// @flow strict

export type sidebarIndexType = Array<{|
  sectionPathname: string,
  displayName: string,
  pages?: Array<string>,
  subsections?: Array<{| [string]: Array<string> |}>,
|}>;

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
        pages: ['Avatar', 'AvatarPair', 'Badge', 'GroupAvatar', 'Table'],
      },
      {
        subsectionName: 'Feedback',
        pages: ['Modal', 'Pulsar', 'Spinner', 'Toast'],
      },
      {
        subsectionName: 'Foundation',
        pages: ['Heading', 'Icon', 'Text'],
      },
      {
        subsectionName: 'Forms',
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
        ],
      },
      {
        subsectionName: 'Layout',
        pages: [
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
      },
      {
        subsectionName: 'Media',
        pages: ['Image', 'Letterbox', 'Mask', 'Video'],
      },
      {
        subsectionName: 'Navigation',
        pages: ['Link', 'SegmentedControl', 'Tabs'],
      },
    ],
  },
];

export default sidebarIndex;
