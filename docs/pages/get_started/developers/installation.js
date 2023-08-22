// @flow strict
import { type Node } from 'react';
import { Flex, Link, Text } from 'gestalt';
import Card from '../../../docs-components/Card.js';
import Markdown from '../../../docs-components/Markdown.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function DocsPage(): Node {
  return (
    <Page title="Installation Guidelines">
      <PageHeader name="Installation" type="guidelines" />
      <Card name="Install">
        <Flex
          alignItems="start"
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Markdown
            text="
~~~jsx
npm i gestalt --save
~~~
or
~~~jsx
yarn add gestalt
~~~
To install the Chart package:
~~~jsx
npm i gestalt-charts --save
~~~
or
~~~jsx
yarn add gestalt-charts
~~~

To install the DatePicker package:
~~~jsx
npm i gestalt-datepicker --save
~~~
or
~~~jsx
yarn add gestalt-datepicker
~~~
"
          />
        </Flex>
      </Card>
      <Card name="Usage">
        <Flex
          alignItems="start"
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Text>
            Gestalt exports each component as ES6 modules and a single, precompiled CSS file:
          </Text>
          <Markdown
            text="
~~~jsx
import { Text } from 'gestalt';
import 'gestalt/dist/gestalt.css';
~~~
"
          />
          <Markdown
            text="
~~~jsx
import { DatePicker } from 'gestalt-datepicker';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
~~~
"
          />
          <Markdown
            text="
~~~jsx
import { Chart } from 'gestalt-charts';
import 'gestalt-charts/dist/gestalt-charts.css';
~~~
"
          />

          <Text>
            That syntax is Webpack specific (and will work with Create React App), but you can use
            Gestalt anywhere that supports ES6 module bundling and global CSS.
          </Text>
        </Flex>
      </Card>
      <Card name="Dev">
        <Flex
          alignItems="start"
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Text>
            Gestalt is a{' '}
            <Link
              display="inlineBlock"
              href="https://yarnpkg.com/lang/en/docs/workspaces/"
              target="blank"
            >
              <Text weight="bold"> multi-project monorepo.</Text>
            </Link>
            The docs and components are all organized as separate packages that share similar
            tooling.
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
            <Link display="inlineBlock" href="http://localhost:8888/" target="blank">
              <Text weight="bold">http://localhost:8888</Text>
            </Link>{' '}
            and click on a component to view the docs.
          </Text>
        </Flex>
      </Card>
    </Page>
  );
}
