// @flow strict
import React, { type Node } from 'react';
import { Heading, Link, Row, Stack, Text } from 'gestalt';
import Markdown from './components/Markdown.js';
import Card from './components/Card.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(<PageHeader name="Installation" showSourceLink={false} />);

card(
  <Stack gap={4}>
    <Row gap={4}>
      <Link inline target="blank" href="https://npmjs.org/package/gestalt">
        <img
          src="https://img.shields.io/npm/v/gestalt.svg?label=gestalt"
          alt="Gestalt's NPM package version badge"
        />
      </Link>

      <Link
        inline
        target="blank"
        href="https://npmjs.org/package/gestalt-datepicker"
      >
        <img
          src="https://img.shields.io/npm/v/gestalt-datepicker.svg?label=gestalt-datepicker"
          alt="Gestalt's NPM package version badge"
        />
      </Link>
    </Row>
    <Text>
      Gestalt is a set of React UI components that enforces Pinterest’s design
      language. We use it to streamline communication between designers and
      developers by enforcing a bunch of fundamental UI components. This common
      set of components helps raise the bar for UX & accessibility across
      Pinterest.
    </Text>
  </Stack>
);

card(
  <Card name="Install">
    <Stack gap={4}>
      <Markdown
        text="
~~~jsx
npm i gestalt --save
~~~
or
~~~jsx
yarn add gestalt
~~~"
      />
    </Stack>
  </Card>
);

card(
  <Card name="Usage">
    <Stack gap={4}>
      <Text>
        Gestalt exports each component as ES6 modules and a single, precompiled
        CSS file:
      </Text>
      <Markdown
        text="
~~~jsx
import { Text } from 'gestalt';
import 'gestalt/dist/gestalt.css';
~~~
"
      />
      <Text>
        That syntax is Webpack specific (and will work with Create React App),
        but you can use Gestalt anywhere that supports ES6 module bundling and
        global CSS.
      </Text>
    </Stack>
  </Card>
);

card(
  <Card name="Development">
    <Stack gap={4}>
      <Text>
        Gestalt is a{' '}
        <Link
          inline
          href="https://yarnpkg.com/lang/en/docs/workspaces/"
          target="blank"
        >
          <Text weight="bold"> multi-project monorepo.</Text>
        </Link>
        The docs and components are all organized as separate packages that
        share similar tooling.
      </Text>
      <Text>Install project dependencies and run tests:</Text>

      <Markdown
        text="
~~~jsx
yarn
yarn test
~~~
"
      />
      <Text>Build and watch Gestalt &amp; run the docs server:</Text>
      <Markdown
        text="
~~~jsx
yarn start
~~~
"
      />
      <Text>
        Visit{' '}
        <Link inline href="http://localhost:8888/" target="blank">
          <Text weight="bold">http://localhost:8888</Text>
        </Link>{' '}
        and click on a component to view the docs.
      </Text>
    </Stack>
  </Card>
);

card(
  <Card name="Codemods">
    <Stack gap={4}>
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
        codemod(s) in the relevant directory of your repo (not the Gestalt
        repo): anywhere the component to be updated is used. Example usage for a
        codebase using Flow:
      </Text>
      <Markdown
        text="
~~~jsx
yarn codemod --parser=flow -t={relative/path/to/codemod} relative/path/to/your/code
~~~
"
      />
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
  </Card>
);

card(
  <Card name="Releasing">
    <Stack gap={4}>
      <Text>
        Every commit to master performs a release. As a reviewer, ensure the
        correct label is attached to every PR. Please follow{' '}
        <Link inline href="https://semver.org/" target="blank">
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
            : documentation updates / spelling mistakes in code / internal
            scripts
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
  </Card>
);

card(
  <Card name="Typescript Support">
    <Stack gap={4}>
      <Text>
        Install the{' '}
        <Link
          inline
          href="https://www.npmjs.com/package/@types/gestalt"
          target="blank"
        >
          <Text weight="bold">DefinitelyTyped</Text>
        </Link>{' '}
        definitions.
      </Text>
      <Heading size="sm">Usage</Heading>
      <Markdown
        text="
~~~jsx
npm i --save @types/gestalt
~~~
or
~~~jsx
yarn add @types/gestalt
~~~"
      />
    </Stack>
  </Card>
);

export default cards;
