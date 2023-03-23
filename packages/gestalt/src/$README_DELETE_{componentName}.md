# SheetMobile

FOLLOW STEPS HERE
https://gestalt.pinterest.systems/get_started/developers/contributing/development_process#Create-a-pull-request

These are the remaining steps to configure your components:

- Replace SheetMobile.svg file SVG content in docs/graphics/general/SheetMobile.svg

- Import SheetMobile.svg in docs/docs-components/COMPONENT_DATA.js and paste data for component alphabetically

import SheetMobile from '../graphics/general/SheetMobile.svg';

{
svg: <SheetMobile />,
name: 'SheetMobile',
aliases: [],
previouslyNamed: [],
path: null,
hasDarkBackground: false,
description:
'SheetMobile is description',
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
responsive: 'reanotAvailabledy',
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

yarn playwright:update-visual-test playwright/visual-test/SheetMobile --update-snapshots
