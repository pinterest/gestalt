// @flow strict
import * as React from 'react';
import { Box, Heading, Link, Row, Stack, Text, Tooltip } from 'gestalt';
import Markdown from './components/Markdown.js';

const cards = [];
const card = c => cards.push(c);

card(<Heading>Installation</Heading>);

card(
  <Stack gap={2}>
    <Row gap={1}>
      <Tooltip text="Gestalt package">
        <Link inline target="blank" href="https://npmjs.org/package/gestalt">
          <img
            src="https://badge.fury.io/js/gestalt.svg"
            alt="Gestalt's NPM package version badge"
          />
        </Link>
      </Tooltip>
      <Tooltip text="Gestalt DatePicker package">
        <Link
          inline
          target="blank"
          href="https://npmjs.org/package/gestalt-datepicker"
        >
          <img
            src="https://badge.fury.io/js/gestalt-datepicker.svg"
            alt="Gestalt's NPM package version badge"
          />
        </Link>
      </Tooltip>
    </Row>
    <Text>
      Gestalt is a set of React UI components that enforces Pinterest’s design
      language. We use it to streamline communication between designers and
      developers by enforcing a bunch of fundamental UI components. This common
      set of components helps raise the bar for UX & accessibility across
      Pinterest.
    </Text>{' '}
  </Stack>
);

card(
  <Stack gap={2}>
    <Heading size="md">Install</Heading>
    <Box padding={2} color="lightGray" rounding={2}>
      <Markdown
        text="
~~~jsx
npm i gestalt --save
~~~
or
~~~jsx
yarn add gestalt
~~~
  "
      />
    </Box>
  </Stack>
);

card(
  <Stack gap={2}>
    <Heading size="md">Usage</Heading>
    <Text>
      Gestalt exports each component as ES6 modules and a single, precompiled
      CSS file:
    </Text>
    <Box padding={2} color="lightGray" rounding={2}>
      <Markdown
        text="
~~~jsx
import { Text } from 'gestalt';
import 'gestalt/dist/gestalt.css';
~~~
"
      />
    </Box>
    <Text>
      That syntax is Webpack specific (and will work with Create React App), but
      you can use Gestalt anywhere that supports ES6 module bundling and global
      CSS.
    </Text>
  </Stack>
);

card(
  <Stack gap={2}>
    <Heading size="md">Development</Heading>
    <Text>
      Gestalt is a{' '}
      <Link
        tapStyl="compress"
        inline
        href="https://yarnpkg.com/lang/en/docs/workspaces/"
        target="blank"
      >
        <Text weight="bold"> multi-project monorepo.</Text>
      </Link>
      The docs and components are all organized as separate packages that share
      similar tooling.
    </Text>
    <Text>Install project dependencies and run tests:</Text>
    <Box padding={2} color="lightGray" rounding={2}>
      <Markdown
        text="
~~~jsx
yarn
yarn test
~~~
"
      />
    </Box>
    <Text>Build and watch Gestalt & run the docs server:</Text>
    <Box padding={2} color="lightGray" rounding={2}>
      <Markdown
        text="
~~~jsx
yarn start
~~~
"
      />
    </Box>
    <Text>
      Visit{' '}
      <Link
        tapStyl="compress"
        inline
        href="http://localhost:3000/"
        target="blank"
      >
        <Text weight="bold">http://localhost:3000</Text>
      </Link>{' '}
      and click on a component to view the docs.
    </Text>
  </Stack>
);

card(
  <Stack gap={2}>
    <Heading size="md">Codemods</Heading>
    <Text>
      When a release will cause breaking changes — in usage or in typing — we
      provide a codemod to ease the upgrade process. Codemods are organized by
      release in{' '}
      <Text inline italic>
        /packages/gestalt-codemods
      </Text>
    </Text>
    <Heading size="sm">Usage</Heading>
    <Text>
      Clone the Gestalt repo locally if you haven’t already. Run the relevant
      codemod(s) in the relevant directory of your repo (not the Gestalt repo):
      anywhere the component to be updated is used. Example usage for a codebase
      using Flow:
    </Text>
    <Box padding={2} color="lightGray" rounding={2}>
      <Markdown
        text="
~~~jsx
yarn codemod --parser=flow -t={relative/path/to/codemod} relative/path/to/your/code
~~~
"
      />
    </Box>
    <Text>
      For a dry run to see what the changes will be, add the{' '}
      <Text inline italic>
        -d
      </Text>{' '}
      (dry run) and{' '}
      <Text inline italic>
        -p
      </Text>{' '}
      (print output) flags (pipe stdout to a file for easier inspection if you
      like).
    </Text>
  </Stack>
);

card(
  <Stack gap={2}>
    <Heading size="md">Releasing</Heading>
    <Text>
      Every commit to master performs a release. As a reviewer, ensure the
      correct label is attached to every PR. Please follow{' '}
      <Link tapStyl="compress" inline href="https://semver.org/" target="blank">
        <Text weight="bold">semantic versioning</Text>
      </Link>
      .
    </Text>
    <ul>
      <li>
        <Text>
          <Text inline weight="bold">
            patch release
          </Text>
          : documentation updates / spelling mistakes in code / internal scripts
        </Text>
      </li>
      <li>
        <Text>
          <Text inline weight="bold">
            minor release
          </Text>
          : add component / add component props / API change with codemod
        </Text>
      </li>
      <li>
        <Text>
          <Text inline weight="bold">
            major release
          </Text>
          : backwards incompatible API change without codemod
        </Text>
      </li>
    </ul>
    <Text> Example PR title: Avatar: Add outline prop</Text>
  </Stack>
);

card(
  <Stack gap={2}>
    <Heading size="md">Typescript Support</Heading>
    <Text>
      Install the{' '}
      <Link
        tapStyl="compress"
        inline
        href="https://www.npmjs.com/package/@types/gestalt"
        target="blank"
      >
        <Text weight="bold">DefinitelyTyped</Text>
      </Link>{' '}
      definitions.
    </Text>
    <Heading size="sm">Usage</Heading>
    <Box padding={2} color="lightGray" rounding={2}>
      <Markdown
        text="
~~~jsx
npm i --save @types/gestalt
~~~
or
~~~jsx
yarn add @types/gestalt
~~~
  "
      />
    </Box>
  </Stack>
);

export default cards;

const navRoute = { section: 'getting-started', group: 'none' };
export { navRoute };
