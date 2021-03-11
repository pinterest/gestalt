// @flow strict
import type { Node } from 'react';
import { Flex, Heading, Link, Text } from 'gestalt';
import Markdown from './components/Markdown.js';
import Card from './components/Card.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Eslint Plugin"
    showSourceLink={false}
    description="Install the package eslint-plugin-gestalt to get lint rules encouraging the correct usage of gestalt components"
  />,
);

card(
  <Card name="Supported Rules">
    <Flex alignItems="start" direction="column" gap={4}>
      <Heading size="sm">gestalt/button-icon-restrictions</Heading>
      <Text>
        Require specific props when using an icon with Button. Gestalt is more permissive than PDS
        recommends in adding icons to Buttons. Buttons using iconEnd must use:
        <ul>
          <li>icon &quot;arrow-down&quot;</li>
          <li>color &quot;white&quot;</li>
          <li>size &quot;lg&quot;</li>
        </ul>
      </Text>
      <Heading size="sm">gestalt/no-box-marginleft-marginright</Heading>
      <Text>
        Disallow marginLeft/marginRight on Box. In order to have consistent usage of
        marginLeft/marginRight on Box in production, we update all of them to marginStart/marginEnd
      </Text>
      <Heading size="sm">gestalt/no-dangerous-style-duplicates</Heading>
      <Text>
        Prevent using dangerouslySetInlineStyle on Box for props that are already directly
        implemented. Box supports some props already that are not widely known and instead are being
        implemented with dangerouslySetInlineStyle. This linter checks for usage of already
        available props as dangerous styles and suggests the alternative.
      </Text>
      <Heading size="sm">gestalt/no-medium-formfields</Heading>
      <Text>
        Disallow medium form fields. In order to have consistent form fields in production, we
        update all of their sizes to large and disallow medium.
      </Text>
      <Heading size="sm">gestalt/no-role-link-components</Heading>
      <Text>
        Do not allow role=&apos;link&apos; on Button, TapArea, and IconButton in cases where an
        alternative with additional functionality must be used instead such as for use with a
        routing library
      </Text>
    </Flex>
  </Card>,
);

card(
  <Card name="Install">
    <Flex alignItems="start" direction="column" gap={4}>
      <Text>
        You&apos;ll first need to install{' '}
        <Link inline href="http://eslint.org" target="blank">
          <Text weight="bold">ESLint</Text>
        </Link>{' '}
        , then install{' '}
        <Text inline italic>
          eslint-plugin-gestalt
        </Text>
        :
      </Text>
      <Markdown
        text="
~~~bash
$ npm install eslint --save-dev
$ npm install eslint-plugin-gestalt --save-dev
~~~
or
~~~bash
$ yarn add --dev eslint
$ yarn add --dev eslint-plugin-gestalt
~~~"
      />
      <Text>
        **Note:** If you installed ESLint globally (using the{' '}
        <Text inline italic>
          -g
        </Text>{' '}
        flag) then you must also install{' '}
        <Text inline italic>
          eslint-plugin-gestalt
        </Text>{' '}
        globally.
      </Text>
    </Flex>
  </Card>,
);

card(
  <Card name="Usage">
    <Flex alignItems="start" direction="column" gap={4}>
      <Text>
        Add gestalt to the plugins section of your .eslintrc configuration file. You can omit the
        eslint-plugin- prefix:
      </Text>
      <Markdown
        text='
~~~jsx
{ "plugins": ["gestalt"] }
~~~
'
      />
      <Text>Then configure the rules you want to use under the rules section.</Text>
      <Markdown
        text='
~~~jsx
{ "rules": {
    "gestalt/rule-name": 2
  } }
~~~
'
      />
    </Flex>
  </Card>,
);

card(
  <Card name="Development">
    <Flex alignItems="start" direction="column" gap={4}>
      <Text>
        New rules should be developed TDD-style by testing against simplified test cases first. See
        the \*.test.js files and fixtures for examples. You can test locally by running:
      </Text>
      <Markdown
        text="
~~~bash
yarn jest --watch eslint-plugin-gestalt/src/[name-of-test-file]
~~~
"
      />
      <Text>
        Once tests pass, you can check the rules against a project using gestalt through yarn link.
        For example:
      </Text>
      <Markdown
        text="
~~~bash
cd ~/code/gestalt/packages/gestalt-eslint
yarn link
cd ~/code/project-using-gestalt
yarn link eslint-plugin-gestalt
~~~
"
      />
      <Text>
        You can now add any new rules to the project&apos;s eslint config and run eslint against the
        project to test your changes. Remember to unlink when you&apos;re done!
      </Text>
      <Markdown
        text="
~~~bash
cd ~/code/project-using-gestalt
yarn unlink eslint-plugin-gestalt
~~~
"
      />
    </Flex>
  </Card>,
);

card(
  <Card name="Releasing">
    <Flex alignItems="start" direction="column" gap={4}>
      <Text>
        Every commit to master performs a release. See the main docs{' '}
        <Link inline href="/Installation#Releasing">
          <Text weight="bold">releasing information</Text>
        </Link>{' '}
        for more details.
      </Text>
    </Flex>
  </Card>,
);

export default cards;
