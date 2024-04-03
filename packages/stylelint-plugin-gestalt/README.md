# stylelint-plugin-gestalt

## Installation

You'll first need to install [StyleSLint](https://stylelint.io), then install `stylelint-plugin-gestalt`:

```bash
$ npm install stylelint --save-dev
$ npm install stylelint-plugin-gestalt --save-dev
```

OR

```bash
$ yarn add --dev stylelint
$ yarn add --dev stylelint-plugin-gestalt
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `stylelint-plugin-gestalt` globally.

## Usage

Add `gestalt` to the plugins section of your `.eslintrc` configuration file. You can omit the `stylelint-plugin-` prefix:

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

Visit [our ESLint rules documentation page](https://gestalt.pinterest.systems/get_started/developers/eslint_plugin)

## Development

New rules should be developed TDD-style by testing against simplified test cases first. See the \*.test.js files and fixtures for examples. Once tests pass, you can check the rules against a project using gestalt through yarn link. For example:

```bash
cd ~/code/gestalt/packages/gestalt-stylelint
yarn link
cd ~/code/project-using-gestalt
yarn link stylelint-plugin-gestalt
```

You can now add any new rules to the project's stylelint config and run stylelint against the project to test your changes.

Remember to unlink when you're done!

```bash
cd ~/code/project-using-gestalt
yarn unlink stylelint-plugin-gestalt
```
