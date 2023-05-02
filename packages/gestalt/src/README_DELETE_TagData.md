# TagData

FOLLOW STEPS HERE
https://gestalt.pinterest.systems/get_started/developers/contributing/development_process#Create-a-pull-request

These are the remaining steps to configure your components:

- Add TagData into docs/docs-components/siteIndex.js

- Replace TagData.svg file SVG content in docs/graphics/general/TagData.svg

- Import TagData.svg in docs/docs-components/COMPONENT_DATA.js and paste data for component alphabetically

import TagData from '../graphics/general/TagData.svg';

{
svg: <TagData />,
name: 'TagData',
aliases: [],
previouslyNamed: [],
path: null,
hasDarkBackground: false,
description:
'TagData is description',
category: 'PENDING',
status: {
accessible: {
summary: null,
a11yVisual: null,
a11yScreenreader: null,
a11yNavigation: null,
a11yComprehension: null,
},
badge: null,
android: 'notAvailable',
deprecated: false,
documentation: 'notAvailable',
iOS: 'notAvailable',
figma: 'notAvailable',
responsive: 'notAvailable',
},
android: {
accessible: {
summary: null,
a11yVisual: null,
a11yScreenreader: null,
a11yNavigation: null,
a11yComprehension: null,
},
badge: null,
deprecated: false,
documentation: 'notAvailable',
figma: null,
},
iOS: {
accessible: {
summary: null,
a11yVisual: null,
a11yScreenreader: null,
a11yNavigation: null,
a11yComprehension: null,
},
badge: null,
deprecated: false,
documentation: 'notAvailable',
figma: null,
},
},

Before merging

## Update Flow CSS coverage

yarn run flow-generate:css

## Update all Gestalt packages builds running rollup

yarn build

## Update a specific visual test snapshots with the latest builds

yarn playwright:update-visual-test playwright/visual-test/TagData --update-snapshots

## Add new component name to PR Title Checker

`.github/pr-title-checker-config.json`
Add your new component name to the regex (alphabetize please!). If you're renaming, replacing, or removing a component, — _and the component also doesn't exist on any other platforms_ — remove that component name from the regex.
