# Gestalt

[![NPM Version](https://img.shields.io/npm/v/gestalt.svg)](https://www.npmjs.com/package/gestalt)
[![Coverage status](https://codecov.io/gh/pinterest/gestalt/branch/master/graph/badge.svg)](https://codecov.io/github/pinterest/gestalt)
[![Greenkeeper badge](https://badges.greenkeeper.io/pinterest/gestalt.svg)](https://greenkeeper.io/)

Gestalt is a set of React UI components that enforces Pinterest’s design language. We use it to streamline communication between designers and developers by enforcing a bunch of fundamental UI components. This common set of components helps raise the bar for UX & accessibility across Pinterest.

[View the full docs](https://pinterest.github.io/gestalt)
or
[Check out the Gestalt playground](https://codesandbox.io/s/k5plvp9v8v)

## Install

`npm i gestalt --save` or `yarn add gestalt`

## Usage

Gestalt exports each component as ES6 modules and a single, precompiled CSS file:

```js
import { Text } from 'gestalt';
import 'gestalt/dist/gestalt.css';
```

That syntax is Webpack specific (and will work with Create React App), but you can use Gestalt anywhere that supports ES6 module bundling and global CSS.

## Development

Gestalt is a [multi-project monorepo](https://yarnpkg.com/lang/en/docs/workspaces/). The docs, components and integration tests are all organized as separate packages that share similar tooling.

Install project dependencies and run tests:

```bash
yarn
yarn test
```

Build and watch Gestalt & run the docs server:

```bash
yarn start
```

Visit [http://localhost:3000/](http://localhost:3000) and click on a component to view the docs.

Using the Masonry playground:

```bash
cd test && yarn start
open "http://localhost:3001/Masonry"
```

Running Masonry's integration tests. This will leave lots of Firefox processes hanging around, so please be warned.

```bash
./run_integration_tests
```

## Codemods

When a release will cause breaking changes — in usage or in typing — we provide a codemod to ease the upgrade process. Codemods are organized by release in `/packages/gestalt-codemods`. We recommend using [jscodeshift](https://github.com/facebook/jscodeshift) to upgrade.

### Prerequisite:
Install `jscodeshift` globally if you haven't already.
```bash
yarn global add jscodeshift
```

### Usage:
Clone the Gestalt repo locally if you haven't already. Run the relevant codemod(s) in the relevant directory of your repo (not the Gestalt repo): anywhere the component to be updated is used. Example usage for a codebase using Flow:
```bash
jscodeshift --parser=flow -t={relative/path/to/codemod} relative/path/to/your/code
```
For a dry run to see what the changes will be, add the `-d` (dry run) and `-p` (print output) flags (pipe stdout to a file for easier inspection if you like).



## Releasing

If you haven’t already, you’ll first need to [create an npm account](https://www.npmjs.com/signup). Once you've done that
you can setup your username and email in Yarn using `yarn login`.

The following outlines our release process:

1.  Checkout a new branch.
2.  Bump package version in `packages/gestalt/package.json` & update `CHANGELOG.md`.
3.  Open a pull request with the new version and land that in master.
4.  Once the version is bumped in master, checkout that commit locally.
5.  Run `npm login` using your npm username and password.
6.  Run the release script from the root directory of the project `./scripts/publish.js` to publish the tag, npm package, and docs.
7.  Draft a new release from the tag at https://github.com/pinterest/gestalt/releases.

## Typescript Support

Install the [DefinitelyTyped](https://www.npmjs.com/package/@types/gestalt) definitions.

### Install

`npm i --save @types/gestalt`

or

`yarn add @types/gestalt`
