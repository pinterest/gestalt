# TileData

FOLLOW STEPS HERE
https://gestalt.pinterest.systems/get_started/developers/contributing/development_process#Create-a-pull-request

These are the remaining steps to configure your components:

- Add TileData into docs/docs-components/siteIndex.js

- Replace TileData.svg file SVG content in docs/graphics/general/TileData.svg

- Import TileData.svg in docs/docs-components/COMPONENT_DATA.js and paste data for component alphabetically

import TileData from '../graphics/general/TileData.svg';

{
svg: <TileData />,
name: 'TileData',
aliases: [],
previouslyNamed: [],
path: null,
hasDarkBackground: false,
description:
'TileData is description',
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

yarn playwright:update-visual-test playwright/visual-test/TileData --update-snapshots
