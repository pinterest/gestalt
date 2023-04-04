# DateField

FOLLOW STEPS HERE
https://gestalt.pinterest.systems/get_started/developers/contributing/development_process#Create-a-pull-request

These are the remaining steps to configure your components:

- Add DateField into docs/docs-components/siteIndex.js

- Replace DateField.svg file SVG content in docs/graphics/general/DateField.svg

- Import DateField.svg in docs/docs-components/COMPONENT_DATA.js and paste data for component alphabetically

import DateField from '../graphics/general/DateField.svg';

{
svg: <DateField />,
name: 'DateField',
aliases: [],
previouslyNamed: [],
path: null,
hasDarkBackground: false,
description:
'DateField is description',
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

yarn playwright:update-visual-test playwright/visual-test/DateField --update-snapshots
