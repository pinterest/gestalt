const webComponents = [
  'activationcard',
  'avatar',
  'avatargroup',
  'badge',
  'bannerslim',
  'bannercallout',
  'bannerupsell',
  'box',
  'button',
  'buttongroup',
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
  'numberfield',
  'overlaypanel',
  'overview',
  'pageheader',
  'pog',
  'popover',
  'pulsar',
  'radiogroup',
  'searchfield',
  'segmentedcontrol',
  'selectlist',
  'sheet',
  'sidenavigation',
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

const foundations = [
  'accessibility',
  'animation',
  'motion',
  'design_tokens',
  'elevation',
  'layouts',
  'screen_sizes',
].map((item) => ({
  source: `/${item}`,
  destination: `/foundations/${item}`,
  permanent: true,
}));

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
    source: '/foundations/animation/guidelines',
    destination: '/foundations/motion/guidelines',
    permanent: true,
  },
  {
    source: '/foundations/animation/principles',
    destination: '/foundations/motion/principles',
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
    source: '/foundations/data_visualization/charts_and_graphs',
    destination: '/foundations/data_visualization/charts_and_graphs/general_guidelines',
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
    source: '/foundations/layouts',
    destination: '/foundations/layout',
    permanent: true,
  },
  {
    source: '/foundations/design_tokens',
    destination: '/foundations/design_tokens/overview',
    permanent: true,
  },
  {
    source: '/foundations/rtl_guidelines/about_international_design',
    destination: '/foundations/international_design/about_international_design',
    permanent: true,
  },
  {
    source: '/foundations/rtl_guidelines/rtl_overview',
    destination: '/foundations/international_design/rtl_guidelines/rtl_overview',
    permanent: true,
  },
  {
    source: '/foundations/rtl_guidelines/layout_and_text_direction',
    destination: '/foundations/international_design/rtl_guidelines/layout_and_text_direction',
    permanent: true,
  },
  {
    source: '/foundations/rtl_guidelines/icons',
    destination: '/foundations/international_design/rtl_guidelines/iconography',
    permanent: true,
  },
  {
    source: '/foundations/rtl_guidelines/typography',
    destination: '/foundations/international_design/rtl_guidelines/typography',
    permanent: true,
  },
  {
    source: '/foundations/typography/guidelines',
    destination: '/foundations/typography',
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
    source: '/team_support/contributions',
    destination: '/team_support/design_contributions/design_contributions_overview',
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
    source: '/roadmap',
    destination: '/home',
    permanent: true,
  },
  {
    source: '/whats_new',
    destination: '/home',
    permanent: true,
  },
  {
    source: '/tooling',
    destination: '/get_started/developers/tooling/web',
    permanent: true,
  },
  {
    source: '/typography',
    destination: '/foundations/typography',
    permanent: true,
  },
  {
    source: '/web/module',
    destination: '/web/accordion',
    permanent: true,
  },
  {
    source: '/web/radiobutton',
    destination: '/web/radiogroup',
    permanent: true,
  },
  {
    source: '/web/popovereducational',
    destination: '/web/popovermessage',
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
  {
    source: '/web/upsell',
    destination: '/web/bannerupsell',
    permanent: true,
  },
  {
    source: '/web/slimbanner',
    destination: '/web/bannerslim',
    permanent: true,
  },
  {
    source: '/web/callout',
    destination: '/web/bannercallout',
    permanent: true,
  },
  {
    source: '/ios/card/card',
    destination: '/ios/module/module',
    permanent: true,
  },
  {
    source: '/ios/card/card.header',
    destination: '/ios/module/module.header',
    permanent: true,
  },
  {
    source: '/ios/card/card.boards',
    destination: '/ios/module/module.boards',
    permanent: true,
  },
  {
    source: '/ios/card/card.pins',
    destination: '/ios/module/module.pins',
    permanent: true,
  },
];

const redirects = [
  ...color,
  ...foundations,
  ...getStarted,
  ...getStartedDevelopers,
  ...misc,
  ...webComponents,
  ...webUtilities,
];

module.exports = redirects;
