// @flow strict
import type { Node } from 'react';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Eslint Plugin"
    showSourceLink={false}
    description="Install the package eslint-plugin-gestalt to get lint rules encouraging the correct usage of Gestalt components"
  />,
);

card(
  <MainSection
    name="Gestalt alternatives"
    description="The following Eslint rules provide guidance on how to replace native HTML elements and attributes with available Gestalt equivalents"
  >
    <MainSection.Subsection
      title="gestalt/no-dangerous-style-duplicates"
      description={`
        Prevent using dangerouslySetInlineStyle on Box for props that are already directly implemented. Box supports some props already that are not widely known and instead are being implemented with dangerouslySetInlineStyle. This linter checks for usage of already available props as dangerous styles and suggests the alternative.
      `}
    />
    <MainSection.Subsection
      title="gestalt/prefer-box"
      description={`
        Prevent using div inline styling for attributes that are already implemented in Box.
      `}
    />
  </MainSection>,
);

card(
  <MainSection
    name="Gestalt restrictions"
    description="The following Eslint rules restrict the usage of Gestalt component props to enforce design consistency and code safety anf best practices."
  >
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
      title="gestalt/no-box-disallowed-props"
      description={`
        Prevent props different from
        * the officially-supported Box props
        * the following list of passthrough React / DOM props: \`id\`, \`key\`,\`onAnimationEnd\`, \`onAnimationIteration\`, \`onAnimationStart\`, \`onBlur\`, \`onClick\`, \`onContextMenu\`, \`onDblClick\`, \`onDoubleClick\`, \`onDrag\`, \`onDragEnd\`, \`onDragEnter\`, \`onDragExit\`, \`onDragLeave\`, \`onDragOver\`, \`onDragStart\`, \`onDrop\`, \`onFocus\`, \`onKeyDown\`, \`onKeyPress\`, \`onKeyUp\`, \`onMouseDown\`, \`onMouseEnter\`, \`onMouseLeave\`, \`onMouseMove\`, \`onMouseOut\`, \`onMouseOver\`, \`onMouseUp\`, \`onScroll\`, \`onSelect\`, \`onTouchCancel\`, \`onTouchEnd\`, \`onTouchMove\`, \`onTouchStart\`, \`onTransitionEnd\`, \`onTransitionStart\`, \`onWheel\`, \`ref\`, \`tabIndex\`.
      `}
    />
    <MainSection.Subsection
      title="gestalt/no-box-useless-props"
      description={`
        Prevent useless props combinations on Box in two categories:

        * alignContent, alignItems, direction, justifyContent, or wrap (and, if applicable, their respective responsive props) without display="flex"
        * fit and maxWidth used together, since fit sets maxWidth under the hood
      `}
    />
    <MainSection.Subsection
      title="gestalt/no-medium-formfields"
      description={`
        Disallow medium form fields. In order to have consistent form fields in production, we update all of their sizes to large and disallow medium.
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

card(
  <MainSection
    name="Deprecated ESlint rules"
    description="The following Eslint rules are no longer needed."
  >
    <MainSection.Subsection
      title="gestalt/no-box-marginleft-marginright"
      description={`
        Disallow marginLeft/marginRight on Box. In order to have consistent usage of marginLeft/marginRight on Box in production, we update all of them to marginStart/marginEnd.

        Deprecation due to: deprecated props.
      `}
    />
    <MainSection.Subsection
      title="gestalt/no-role-link-components"
      description={`
        Do not allow role=&apos;link&apos; on Button, TapArea, and IconButton in cases where an alternative with additional functionality must be used instead such as for use with a routing library.

        Deprecation due to: [OnLinkNavigationProvider](/OnLinkNavigationProvider) enables external link navigation in Gestalt components.
      `}
    />
  </MainSection>,
);

export default cards;
