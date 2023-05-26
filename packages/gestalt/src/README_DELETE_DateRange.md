# DateRange

FOLLOW STEPS HERE
https://gestalt.pinterest.systems/get_started/developers/contributing/development_process#Create-a-pull-request

These are the remaining steps to configure your components:

- Add DateRange into docs/docs-components/siteIndex.js

- Replace DateRange.svg file SVG content in docs/graphics/general/DateRange.svg

- Import DateRange.svg in docs/docs-components/COMPONENT_DATA.js and paste data for component alphabetically

import DateRange from '../graphics/general/DateRange.svg';

Before merging

## Update Flow CSS coverage

yarn run flow-generate:css

## Update the TypeScript declaration files

`packages/gestalt/dist/index.d.ts`

Add:

## Update all Gestalt packages builds running rollup

yarn build

## Update a specific visual test snapshots with the latest builds

yarn playwright:update-visual-test playwright/visual-test/DateRange --update-snapshots

## Add new component name to PR Title Checker

`.github/pr-title-checker-config.json`
Add your new component name to the regex (alphabetize please!). If you're renaming, replacing, or removing a component, — _and the component also doesn't exist on any other platforms_ — remove that component name from the regex.
