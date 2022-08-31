// @flow strict

const LINKS = {
  /*
  A11Y RESOURCES
  */

  ACCESSIBLE_DESIGN_IOS:
    'https://material.io/design/usability/accessibility.html#understanding-accessibility',

  ACCESSIBLE_DEVELOPMENT_IOS: 'https://developer.android.com/guide/topics/ui/accessibility',

  ACCESSIBLE_DESIGN_ANDROID:
    'https://material.io/design/usability/accessibility.html#understanding-accessibility',

  ACCESSIBLE_DEVELOPMENT_ANDROID: 'https://developer.android.com/guide/topics/ui/accessibility',

  PLAYWRIGHT_AXE: 'https://www.npmjs.com/package/@axe-core/playwright',

  AXE_DEVTOOLS: 'https://www.deque.com/axe/devtools/',

  SECTION_508: 'https://webaim.org/standards/508/checklist',

  A11y_W3_STANDARDS: 'https://www.w3.org/TR/WCAG21/',

  A11y_W3_UNDERSTANDINGS: 'https://www.w3.org/WAI/WCAG21/Understanding',

  A11y_W3_LOW_VISION: 'https://www.w3.org/TR/low-vision-needs',

  A11y_W3_READABILITY: 'https://www.w3.org/WAI/RD/2012/text-customization/r11',

  A11y_W3_FOCUS_VISIBLE: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html/',

  A11y_W3_NON_TEXT_CONTRAST: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html',

  A11y_W3_REDUCED_MOTION: 'https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html',

  MOZILLA_ARIA: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA',

  MOZILLA_FOCUS_VISIBLE: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible',

  MOZILLA_REDUCED_MOTION:
    'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion',

  MOZILLA_SEMANTIC_HEADING:
    'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements',

  A11y_PROJECT: 'https://www.a11yproject.com/',

  A11y_PROJECT_CHECKLIST: 'https://www.a11yproject.com/checklist',

  HEYDON_PICKERING: 'https://github.com/Heydon/inclusive-design-checklist',

  AREMY_COLORS_ACCESSIBLE: 'https://www.aremycolorsaccessible.com/',

  SCREEN_READERS:
    'https://www.afb.org/blindness-and-low-vision/using-technology/assistive-technology-products/screen-readers',

  COLOR_AND_CONTRAST: 'https://accessibility.digital.gov/visual-design/color-and-contrast/',

  LINE_HEIGHT: 'https://material.io/design/typography/the-type-system.html#type-scale',

  COLOR_BLINDNESS:
    'https://www.smashingmagazine.com/2016/06/improving-color-accessibility-for-color-blind-users/https://www.smashingmagazine.com/2016/06/improving-color-accessibility-for-color-blind-users/',

  DISLEXIA: 'https://www.dyslexic.com/quick-guide-making-content-accessible/',

  DISLEXIA_WORKPLACE:
    'https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide',

  HUMAN_INTERFACE_GUIDELINES:
    'https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/',

  IRLEN_SYNDROME: 'https://irlen.com/what-is-irlen-syndrome/',

  /*
  GESTALT RESOURCES
  */

  GESTALT_CANONICAL: 'https://gestalt.pinterest.systems',

  GESTALT_ACCESSIBLE_DESIGN_DECK:
    'https://www.dropbox.com/s/m1jmveyuvv6p9pq/Pinterest%20Accessible%20Design.pdf?dl=0',

  FIGMA_WEB_LIBRARY: 'https://www.figma.com/file/vjhfBsOtHw0wVg67vqwz1v/Gestalt-for-web',

  FIGMA_IOS_LIBRARY: 'https://www.figma.com/file/AHcKJDgb7E7YswlgW1wY8E/Gestalt-for-iOS',

  FIGMA_ANDROID_LIBRARY: 'https://www.figma.com/file/REw1COFYAktmVWrUBh3Ov8/Gestalt-for-Android',

  GESTALT_GITHUB: 'https://github.com/pinterest/gestalt',

  GITHUB_RFC: 'https://github.com/pinterest/gestalt/tree/master/rfcs',

  FEEDBACK_CALLOUT_BASE_URL:
    'https://docs.google.com/forms/d/e/1FAIpQLSe7h8kVcD7QqvPvjkE8s8WvnuFfhYvAEQ6L7tZwPgHjJPAbSw/viewform?usp=pp_url&entry.847151274=',

  CODE_SANDBOX: 'https://codesandbox.io/s/gestalt-cnwugg?file=/yourCode.js',

  SLACK_DESIGN: 'http://pinch.pinadmin.com/gestalt-design-slack',

  SLACK_ENGINEERING: 'http://pinch.pinadmin.com/gestalt-web-slack',

  SLACK_ENGINEERING: 'http://pinch.pinadmin.com/gestalt-web-slack',

  WEB_A11y_WIKI: 'https://w.pinadmin.com/display/WT/Accessibility',

  WEB_A11y_INTEGRATION_TESTS:
    'https://w.pinadmin.com/display/WT/Web+Accessibility+Integration+Tests',

  WEB_A11y_WORKING_GROUP: 'http://pinch.pinadmin.com/productAccessibilityWorkingGroups',

  A11y_101_TRAINING: 'https://w.pinadmin.com/display/EPD/Accessibility+101',

  ICON_KIT: 'https://www.figma.com/file/N60WnDx9j6Moz3Dt1rNsq9/Icon-Kit',

  FIGMA_MESSAGING_DECISION_TREE_EMBEDDED:
    'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FXxaqjsGExBDWWs7HDRhaYW%2FMessaging-decision-tree-H2%3Fnode-id%3D102%253A1092',

  FIGMA_MESSAGING_DECISION_TREE:
    'https://www.figma.com/file/XxaqjsGExBDWWs7HDRhaYW/Messaging-decision-tree-H2?node-id=102%3A1092',

  /*
  EXTERNAL RESOURCES
  */

  CONTAINER_MOTION: 'https://material.io/design/motion/the-motion-system.html#container-transform',

  ANIMATION_AND_MOTION:
    'https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/animation/',

  VSCODE: 'https://code.visualstudio.com/download',

  NVM: 'https://github.com/creationix/nvm#install-script',

  NODE: 'https://github.com/nvm-sh/nvm#usage',

  YARN: 'https://classic.yarnpkg.com/en/docs/install',

  DOCKER: 'https://docs.docker.com/get-docker/',

  STYLELINT: 'https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint',

  PLAYWRIGHT_TESTS: 'https://playwright.dev/docs/test-snapshots',

  REACT_CUSTOM_HOOKS: 'https://reactjs.org/docs/hooks-custom.html',

  FOCUS_MANAGEMENT: 'https://css-tricks.com/focus-management-and-inert',

  DESIGN_TOKENS: 'https://uxdesign.cc/design-tokens-cheatsheet-927fc1404099',

  NETLIFY: 'https://www.netlify.com/',

  SVGO: 'https://github.com/svg/svgo',

  IMAGEOPTIM: 'https://imageoptim.com/mac',

  FIGMA_DOWNLOADS: 'https://www.figma.com/downloads/',

  FIGMA_COLOR_PLUGIN:
    'https://www.figma.com/community/plugin/1019681360638128106/Pinterest-Brand-color-palettes',

  FIGMA_ABLE_PLUGIN:
    'https://www.figma.com/community/plugin/734693888346260052/Able-%E2%80%93-Friction-free-accessibility',

  FIGMA_SPELLCHECKER_PLUGIN:
    'https://www.figma.com/community/plugin/738839069237725273/Spellchecker',

  FIGMA_TRANSLATOR_PLUGIN: 'https://www.figma.com/community/plugin/743218037112142643/Translator',

  FIGMA_DOCS_PLUGIN:
    'https://www.figma.com/community/plugin/977755389228415646/Gestalt-docs-for-Figma-(Beta)',

  FIGMA_ICON_EXPORTER:
    'https://www.figma.com/community/plugin/809542389605054255/Pinterest-Icon-Exporter-(beta)',

  FIGMA_PINTEREST_ASSETS:
    'https://www.figma.com/community/plugin/1001559251745003811/Pinterest-Assets',

  FIGMA_PINSERT: 'https://www.figma.com/community/plugin/763812093925718603/Pinsert',

  FONTS_IOS_WEB: 'https://developer.apple.com/fonts/',

  FONTS_ANDROID: 'https://fonts.google.com/specimen/Roboto',

  /*
  PINTEREST RESOURCES
  */

  PINTEREST_CANONICAL: 'https://www.pinterest.com',

  PINTEREST_CAREERS: 'https://www.pinterestcareers.com/job-search-results/?keyword=gestalt',

  BRAND_PINTEREST: 'https://brand.pinterest.com/',

  BRAND_PINTEREST_TYPROGRAPHY: 'https://brand.pinterest.com/',

  PINTEREST_APPROVED_SOFTWARE: 'http://w.pinadmin.com/display/SOFTWARE/Figma',
};

export default LINKS;
