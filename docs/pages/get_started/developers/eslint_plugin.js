// @flow strict
import { type Node } from 'react';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function EslintPluginPage(): Node {
  return (
    <Page title="ESLint plugin">
      <PageHeader
        name="ESLint plugin"
        description="Install the package eslint-plugin-gestalt to get lint rules encouraging the correct usage of Gestalt components"
        type="guidelines"
      />
      <MainSection
        name="Gestalt alternatives"
        description="The following ESLint rules provide guidance on how to replace native HTML elements and attributes with available Gestalt equivalents"
      >
        <MainSection.Subsection
          title="gestalt/prefer-box-inline-style"
          description={`
        Prevent using \`<div>\` inline styling for attributes that are already implemented in Box.

        [Learn more about Box](/web/box).
      `}
        />
        <MainSection.Subsection
          title="gestalt/prefer-box-no-disallowed"
          description={`Prevent \`<div>\` tags that don't contain disallowed attributes in Box: className, onClick, and any attribute not included in Box's allowed-attribute [list](https://github.com/pinterest/gestalt/blob/68d5d550a7358fcb1e104b27865a14c74d5ac01f/packages/eslint-plugin-gestalt/src/no-box-disallowed-props.js#L8). Use Gestalt Box, instead. Other attributes are disallowed as well so this ESLint rule doesn't conflict with [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y).

[Read more about Box](/web/box).

It also prevents \`<div>\` tags used to only contain a \`ref\` attribute. \`ref\` is supported in Box and other elements such as Button or TextField.

[Read more about the ref prop in Box](/web/box#Using-as-a-ref).

With AUTOFIX!
      `}
        />
        <MainSection.Subsection
          title="gestalt/prefer-box-as-tag"
          description={`
        Prefer Box: prevent HTML tags supported in Box through the \`as\` prop.

        Supported tags:

        \`article\`,
        \`aside\`,
        \`caption\`,
        \`details\`,
        \`figcaption\`,
        \`figure\`,
        \`footer\`,
        \`header\`,
        \`main\`,
        \`nav\`,
        \`section\`,
        \`summary\`.

        With AUTOFIX!

        [Read more about the as prop in Box](/web/box#Using-'as'-property).
      `}
        />
        <MainSection.Subsection
          title="gestalt/prefer-link"
          description={`Prevent anchor tags that only contain attributes matching supported props in Gestalt Link.

[Read more about Link](/web/link).

With AUTOFIX!
      `}
        />
        <MainSection.Subsection
          title="gestalt/prefer-list"
          description={`Prevent ul or ol list tags for basic use cases. Suggests using Gestalt List instead.

[Read more about List](/web/list).
      `}
        />
        <MainSection.Subsection
          title="gestalt/prefer-heading"
          description={`Prevent heading tags (h1 ... h6) using Gestalt Heading with the corresponding accessibilityLevel, instead.

[Read more about Heading](/web/heading).

With AUTOFIX!
      `}
        />
      </MainSection>
      <MainSection
        name="Gestalt restrictions"
        description="The following ESLint rules restrict the usage of Gestalt component props to enforce design consistency, code safety and best practices."
      >
        <MainSection.Subsection
          title="gestalt/button-icon-restrictions"
          description={`
        Require a specific value when using an icon with [Button](/web/button). Gestalt is more permissive than we recommend internally for adding icons to Buttons, so Buttons using \`iconEnd\` must use the &quot;arrow-down&quot; icon and Buttons with link role using \`iconEnd\` must use the &quot;visit&quot; icon.

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
          title="gestalt/no-box-dangerous-style-duplicates"
          description={`
        Prevent using \`dangerouslySetInlineStyle\` on Box for props that are already directly implemented.

        Box supports some props already that are not widely known and instead are being implemented with \`dangerouslySetInlineStyle\`.

        This linter checks for usage of already available props as dangerous styles and suggests the alternative.

        With AUTOFIX!

        [Learn more about Box](/web/box).
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
          title="gestalt/no-spread-props"
          description={`
        Prevent spreading props in Gestalt components to enable AST codemods and usage-metrics scripts.

        Instead, write the component's props out.

        With AUTOFIX!
      `}
        />
        <MainSection.Subsection
          title="gestalt/no-workflow-status-icon"
          description="Prevent the usage of 'workflow-status-[...]' icons on Icon component when the style matches one of the [Status](/web/status) types."
        />
        <MainSection.Subsection
          title="gestalt/prefer-flex"
          description={`Prevent \`Box\` usages in those cases where they can be replaced with \`Flex\`.

[Read more about Flex](/web/flex).

With AUTOFIX!
      `}
        />
        <MainSection.Subsection
          title="gestalt/no-medium-formfields"
          description={`
        Disallow medium form fields. In order to have consistent form fields in production, we update all of their sizes to large and disallow medium.
      `}
        />
      </MainSection>
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
      />
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
      />
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
      />
      <MainSection
        name="Releasing"
        description={`
    Every commit to master performs a release. See the main docs [releasing information](/get_started/developers/installation#Releasing) for more details.
  `}
      />
      <MainSection
        name="Deprecated ESlint rules"
        description="The following ESLint rules are no longer needed."
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

        Deprecation due to: [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) enables external link navigation in Gestalt components.
      `}
        />
      </MainSection>
    </Page>
  );
}
