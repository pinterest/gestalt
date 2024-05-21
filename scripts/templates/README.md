# ComponentName

FOLLOW STEPS HERE
https://gestalt.pinterest.systems/get_started/developers/contributing/development_process#Create-a-pull-request

These are the remaining steps to configure your components:

- Add ComponentName into docs/docs-components/siteIndex.ts

- Replace ComponentName.svg file SVG content in docs/graphics/general/ComponentName.svg

- Import ComponentName.svg in docs/docs-components/COMPONENT_DATA.tsx and paste data for component alphabetically

import ComponentName from '../graphics/general/ComponentName.svg';

{
svg: <ComponentName />,
name: 'ComponentName',
aliases: [],
previouslyNamed: [],
path: null,
hasDarkBackground: false,
description:
'ComponentName is description',
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

## Update the TypeScript declaration files

`packages/gestalt/dist/index.d.ts`

Add:

/\*\*

- https://gestalt.pinterest.systems/web/componentname
  \*/
  export interface ComponentNameProps {
  prop: value;
  prop: value;
  prop: value;
  }

export const ComponentName: React.FunctionComponent<ComponentNameProps>;

## Update all Gestalt packages builds running rollup

yarn build

## Update a specific visual test snapshots with the latest builds

yarn playwright:update-visual-test playwright/visual-test/ComponentName --update-snapshots

## Add new component name to PR Title Checker

`.github/pr-title-checker-config.json`
Add your new component name to the regex (alphabetize please!). If you're renaming, replacing, or removing a component, — _and the component also doesn't exist on any other platforms_ — remove that component name from the regex.
