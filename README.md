# Gestalt

[![NPM Version](https://img.shields.io/npm/v/gestalt.svg)](https://www.npmjs.com/package/gestalt)

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

Gestalt is a [multi-project monorepo](https://yarnpkg.com/lang/en/docs/workspaces/). The docs and components are all organized as separate packages that share similar tooling.

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

## Codemods

When a release will cause breaking changes — in usage or in typing — we provide a codemod to ease the upgrade process. Codemods are organized by release in `/packages/gestalt-codemods`.

### Usage:

Clone the Gestalt repo locally if you haven't already. Run the relevant codemod(s) in the relevant directory of your repo (not the Gestalt repo): anywhere the component to be updated is used. Example usage for a codebase using Flow:

```bash
yarn codemod --parser=flow -t={relative/path/to/codemod} relative/path/to/your/code
```

For a dry run to see what the changes will be, add the `-d` (dry run) and `-p` (print output) flags (pipe stdout to a file for easier inspection if you like).

## Releasing

Every commit to master performs a release. As a reviewer, ensure the correct label is attached to every PR. Please follow [semantic versioning](https://semver.org/).

- `patch release`: documentation updates / spelling mistakes in code / internal scripts
- `minor release`: add component / add component props / API change with codemod
- `major release`: backwards incompatible API change without codemod

Example PR title: `Avatar: Add outline prop`

## Typescript Support

Install the [DefinitelyTyped](https://www.npmjs.com/package/@types/gestalt) definitions.

### Install

`npm i --save @types/gestalt`

or

`yarn add @types/gestalt`
