# eslint-plugin-gestalt

## Installation

You'll first need to install [ESLint](http://eslint.org), then install `eslint-plugin-gestalt`:

```bash
$ npm install eslint --save-dev
$ npm install eslint-plugin-gestalt --save-dev
```

OR

```bash
$ yarn add --dev eslint
$ yarn add --dev eslint-plugin-gestalt
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-gestalt` globally.

## Usage

Add `gestalt` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["gestalt"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "gestalt/rule-name": 2
  }
}
```

## Supported Rules

### gestalt/button-icon-restrictions

Require a specific value when using an icon with Button. Gestalt is more permissive than we recommend internally for adding icons to Buttons, so Buttons using iconEnd must use icon "arrow-down".

### gestalt/no-box-marginleft-marginright

Disallow marginLeft/marginRight on Box. In order to have consistent usage of marginLeft/marginRight on Box in production, we update all of them to marginStart/marginEnd.

### gestalt/no-box-dangerous-style-duplicates

Prevent using dangerouslySetInlineStyle on Box for props that are already directly implemented. Box supports some props already that are not widely known and instead are being implemented with dangerouslySetInlineStyle. This linter checks for usage of already available props as dangerous styles and suggests the alternative.

### gestalt/no-medium-formfields

Disallow medium form fields. In order to have consistent form fields in production, we update all of their sizes to large and disallow medium.

### gestalt/no-role-link-components

Do not allow `role='link'` on `Button`, `TapArea`, and `IconButton` in cases where an alternative with additional functionality must be used instead such as for use with a routing library

### gestalt/prefer-box

Prevent using inline styles on divs that could be gestalt Box props. We prefer using gestalt Box over divs with inline styling to get styling consistency across the app and shared css classes. This linter checks for usage of inline styling that is available as Box props.

### gestalt/prefer-list

Disallow use of `<ol>` or `<ul>` elements in favor of our [List](https://gestalt.pinterest.systems/web/list) component.

## Development

New rules should be developed TDD-style by testing against simplified test cases first. See the \*.test.js files and fixtures for examples. Once tests pass, you can check the rules against a project using gestalt through yarn link. For example:

```bash
cd ~/code/gestalt/packages/gestalt-eslint
yarn link
cd ~/code/project-using-gestalt
yarn link eslint-plugin-gestalt
```

You can now add any new rules to the project's eslint config and run eslint against the project to test your changes.

Remember to unlink when you're done!

```bash
cd ~/code/project-using-gestalt
yarn unlink eslint-plugin-gestalt
```
