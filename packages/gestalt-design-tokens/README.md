# Gestalt Design Tokens

This package contains all of the design tokens used by the Pinterest Gestalt Design System.

To build the tokens, run:

```bash
yarn build
```

You can also build and watch the project so that the output folder automatically updates when new tokens are added, by running:

```bash
yarn watch
```

You should see something like this output in the terminal:

```
css
✔︎  dist/scss/_variables.scss

android
✔︎  dist/android/space.xml
✔︎  dist/android/colors.xml


ios
✔︎  dist/ios/GestaltDesignTokensColor.h
✔︎  dist/ios/GestaltDesignTokensColor.m
✔︎  dist/ios/GestaltDesignTokensSize.h
✔︎  dist/ios/GestaltDesignTokensSize.m

ios-swift
✔︎  dist/ios-swift/GestaltDesignTokens.swift

ios-swift-separate-enums
✔︎  dist/ios-swift/GestaltDesignTokensColor.swift
✔︎  dist/ios-swift/GestaltDesignTokensSize.swift
```

This should have created a dist directory and it will look similar to this:

```
├── README.md
├── config.json
├── tokens/
│   ├── color/
│       ├── base.json
│   ├── space/
│       ├── base.json
├── dist/
│   ├── android/
│      ├── space.xml
│      ├── colors.xml
│   ├── scss/
│      ├── _variables.scss
│   ├── ios/
│      ├── StyleDictionaryColor.h
│      ├── StyleDictionaryColor.m
│      ├── StyleDictionarySize.h
│      ├── StyleDictionarySize.m
│   ├── ios-swift/
│      ├── StyleDictionary.swift
│      ├── StyleDictionaryColor.swift
│      ├── StyleDictionarySize.swift
```

## Adding and Changing Tokens

If you open `config.json` you will see there are currently 5 platforms defined: css, android, json, ios, and ios-swift. Each platform has a transformGroup, buildPath, and files. The buildPath and files of the platform should match up to the files what were built.

Pretty nifty! This shows a few things happening:

1. The build system does a deep merge of all the token JSON files defined in the `source` attribute of `config.json`. This allows you to split up the token JSON files however you want. For example, there can be multiple JSON files with `color` as the top level key, but they get merged properly.
1. The build system resolves references to other design tokens. `{size.font.medium.value}` gets resolved properly.
1. The build system handles references to token values in other files as well.

Now let's make a change and see how that affects things. Open up `tokens/color/base.json` and change `"#111111"` to `"#000000"`. After you make that change, save the file and re-run the build command `yarn build`. Open up the build files and take a look.

**Huzzah!**

Now go forth and create! This package is utilizing [Style Dictionary](https://amzn.github.io/style-dictionary). Take a look at all the built-in [transforms](https://amzn.github.io/style-dictionary/#/transforms?id=pre-defined-transforms) and [formats](https://amzn.github.io/style-dictionary/#/formats?id=pre-defined-formats).
