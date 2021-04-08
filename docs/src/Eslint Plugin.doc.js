// @flow strict
import React, { type Node } from 'react';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

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
  <MainSection name="Supported Rules">
    <MainSection.Subsection
      title="gestalt/button-icon-restrictions"
      description={`
        Require specific props when using an icon with Button. Gestalt recommends in adding icons to Buttons. Buttons using \`iconEnd\` must use:
        * icon &quot;arrow-down&quot;
        * color &quot;white&quot;
        * size &quot;lg&quot;
      `}
    />
    <MainSection.Subsection
      title="gestalt/no-box-marginleft-marginright"
      description={`
        Disallow marginLeft/marginRight on Box. In order to have consistent usage of marginLeft/marginRight on Box in production, we update all of them to marginStart/marginEnd.
      `}
    />
    <MainSection.Subsection
      title="gestalt/no-dangerous-style-duplicates"
      description={`
        Prevent using dangerouslySetInlineStyle on Box for props that are already directly implemented. Box supports some props already that are not widely known and instead are being implemented with dangerouslySetInlineStyle. This linter checks for usage of already available props as dangerous styles and suggests the alternative.
      `}
    />
    <MainSection.Subsection
      title="gestalt/no-medium-formfields"
      description={`
        Disallow medium form fields. In order to have consistent form fields in production, we update all of their sizes to large and disallow medium.
      `}
    />
    <MainSection.Subsection
      title="gestalt/no-role-link-components"
      description={`
        Do not allow role=&apos;link&apos; on Button, TapArea, and IconButton in cases where an alternative with additional functionality must be used instead such as for use with a routing library
      `}
    />
  </MainSection>,
);

card(
  <MainSection
    name="Install"
    description={`
You&apos;ll first need to install [ESLint](https://eslint.org), then install *eslint-plugin-gestalt*.
~~~bash
$ npm install eslint --save-dev
$ npm install eslint-plugin-gestalt --save-dev
~~~
or
~~~bash
$ yarn add --dev eslint
$ yarn add --dev eslint-plugin-gestalt
~~~

**Note:** If you installed ESLint globally (using the \`-g\` flag) then you must also install \`eslint-plugin-gestalt\` globally.
`}
  />,
);

card(
  <MainSection
    name="Usage"
    description={`
  Add gestalt to the plugins section of your .eslintrc configuration file. You can omit the eslint-plugin- prefix:

~~~jsx
{ "plugins": ["gestalt"] }
~~~

Then configure the rules you want to use under the rules section.

~~~jsx
{
  "rules": {
    "gestalt/rule-name": "error"
  }
}
~~~
`}
  />,
);

card(
  <MainSection
    name="Development"
    description={`
New rules should be developed TDD-style by testing against simplified test cases first. See the *.test.js files and fixtures for examples. You can test locally by running:
~~~bash
yarn jest --watch eslint-plugin-gestalt/src/[name-of-test-file]
~~~

Once tests pass, you can check the rules against a project using gestalt through yarn link. For example:

~~~bash
cd ~/code/gestalt/packages/gestalt-eslint
yarn link
cd ~/code/project-using-gestalt
yarn link eslint-plugin-gestalt
~~~

You can now add any new rules to the project's eslint config and run eslint against the project to test your changes. Remember to unlink when you're done!

~~~bash
cd ~/code/project-using-gestalt
yarn unlink eslint-plugin-gestalt
~~~
  `}
  />,
);

card(
  <MainSection
    name="Releasing"
    description={`
    Every commit to master performs a release. See the main docs [releasing information](/Installation#Releasing) for more details.
  `}
  />,
);

export default cards;
