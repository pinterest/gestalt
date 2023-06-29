// @flow strict

const webComponents = [
  'activationcard',
  'avatar',
  'avatargroup',
  'badge',
  'box',
  'button',
  'buttongroup',
  'callout',
  'card',
  'checkbox',
  'collage',
  'column',
  'combobox',
  'component_status',
  'container',
  'datapoint',
  'datepicker',
  'development',
  'divider',
  'dropdown',
  'fieldset',
  'flex',
  'heading',
  'icon',
  'iconbutton',
  'image',
  'label',
  'layer',
  'letterbox',
  'link',
  'mask',
  'masonry',
  'modal',
  'module',
  'numberfield',
  'overlaypanel',
  'overview',
  'pageheader',
  'pog',
  'popover',
  'pulsar',
  'radiobutton',
  'radiogroup',
  'searchfield',
  'segmentedcontrol',
  'selectlist',
  'sheet',
  'sidenavigation',
  'slimbanner',
  'spinner',
  'status',
  'sticky',
  'switch',
  'table',
  'tabs',
  'tag',
  'taparea',
  'text',
  'textarea',
  'textfield',
  'toast',
  'tooltip',
  'upsell',
  'video',
  'washanimated',
  'zindex_classes',
].map((item) => ({
  source: `/${item}`,
  destination: `/web/${item}`,
  permanent: true,
}));

const webUtilities = [
  'colorschemeprovider',
  'devicetypeprovider',
  'onlinknavigationprovider',
  'scrollboundarycontainer',
  'usefocusvisible',
  'usereducedmotion',
].map((item) => ({
  source: `/${item}`,
  destination: `/web/utilities/${item}`,
  permanent: true,
}));

const getStarted = ['about_us', 'design', 'how_to_work_with_us', 'faq'].map((item) => ({
  source: `/${item}`,
  destination: `/get_started/${item}`,
  permanent: true,
}));

const getStartedDevelopers = ['eslint_plugin', 'installation'].map((item) => ({
  source: `/${item}`,
  destination: `/get_started/developers/${item}`,
  permanent: true,
}));

const foundations = ['accessibility', 'design_tokens', 'elevation', 'layouts', 'screen_sizes'].map(
  (item) => ({
    source: `/${item}`,
    destination: `/foundations/${item}`,
    permanent: true,
  }),
);

const color = ['color_examples', 'color_palette', 'color_usage'].map((item) => ({
  source: `/${item}`,
  destination: `/foundations/color/${item.replace('color_', '')}`,
  permanent: true,
}));

const misc = [
  {
    source: '/',
    destination: '/home',
    permanent: false,
  },
  {
    source: '/component_overview',
    destination: '/web/overview',
    permanent: true,
  },
  {
    source: '/data_visualization_colors',
    destination: '/foundations/data_visualization/color/palette',
    permanent: true,
  },
  {
    source: '/data_visualization_guidelines',
    destination: '/foundations/data_visualization/color/usage',
    permanent: true,
  },
  {
    source: '/foundations/data_visualization/palette',
    destination: '/foundations/data_visualization/color/palette',
    permanent: true,
  },
  {
    source: '/foundations/data_visualization/usage',
    destination: '/foundations/data_visualization/color/usage',
    permanent: true,
  },
  {
    source: '/development',
    destination: '/get_started/developers/contributing/development_process',
    permanent: true,
  },
  {
    source: '/foundations/content_standards/syntax_structure',
    destination: '/foundations/content_standards/syntax_and_structure',
    permanent: true,
  },
  {
    source: '/get_started/developers/development_process',
    destination: '/get_started/developers/contributing/development_process',
    permanent: true,
  },
  {
    source: '/get_started/how_to_work_with_us',
    destination: '/team_support/overview',
    permanent: true,
  },
  {
    source: '/how_to_hack_around_gestalt',
    destination: '/get_started/developers/hacking_gestalt',
    permanent: true,
  },
  {
    source: '/iconography_and_svgs',
    destination: '/foundations/iconography/library',
    permanent: true,
  },
  {
    source: '/iconography',
    destination: '/foundations/iconography/usage',
    permanent: true,
  },
  {
    source: '/roadmap/overview',
    destination: '/roadmap',
    permanent: true,
  },
  {
    source: '/roadmap/whats_new',
    destination: '/whats_new',
    permanent: true,
  },
  {
    source: '/tooling',
    destination: '/get_started/developers/tooling/web',
    permanent: true,
  },
  {
    source: '/typography',
    destination: '/foundations/typography/guidelines',
    permanent: true,
  },
  {
    source: '/web/card',
    destination: '/web/washanimated',
    permanent: true,
  },
  {
    source: '/web/sheet',
    destination: '/web/overlaypanel',
    permanent: true,
  },
  {
    source: '/web/utilities/onlinknavigationprovider',
    destination: '/web/utilities/globaleventshandlerprovider#Link-handlers',
    permanent: true,
  },
];

/*::
type Redirects = $ReadOnlyArray<{|
    source: string,
    destination: string,
    permanent: boolean,
  |}>
*/

const redirects /*: Redirects */ = [
  ...color,
  ...foundations,
  ...getStarted,
  ...getStartedDevelopers,
  ...misc,
  ...webComponents,
  ...webUtilities,
];

module.exports = redirects;
