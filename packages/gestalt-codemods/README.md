# Codemods

## What is a codemod?

Short for "code modification", codemods are powerful tools used to refactor an entire codebase at once. Built on [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) analysis of the code, codemods can make tedious, complicated refactors quick and easy.

## When do we use codemods?

For Gestalt, we use codemods whenever we introduce breaking changes to a component: renaming or removing props, renaming or removing entire components, etc. If a Gestalt user upgrades to the newest version and their code breaks, we need to write a codemod to address that. This typically corresponds to a major version change, and should be included in the PR introducing the breaking changes.

## Why use codemods?

Initially we were just being nice to ourselves, and the codemods were intended for internal use. We later realized that the codemods were useful for any consumer of Gestalt, thus our policy to create codemods for any breaking change.

## How do we develop codemods?

Check out the awesome [AST Explorer](https://astexplorer.net/) tool, which makes any AST work (including codemods) much easier. Also feel free to pattern-match off more recent codemods in `packages/gestalt-codemods`.

Start by creating a folder within `packages/gestalt-codemods` for the next major version (check the [Releases page](https://github.com/pinterest/gestalt/releases) to see the most recent version number). Add a couple of sub-folders, `__tests__` and `__testfixtures__`. Then create a file with a name describing the change your codemod will be making, like `button-replace-color-with-type.js`. Create a corresponding `.test.js` file in the `__tests__` folder.

You can pattern-match (really copy/paste/adjust) the test file from previous ones. It's largely boilerplate. In addition to the file name, the main part you'll change is to individually list the fixtures files you'll create in `__testfixtures__`.

In the codemod file, add a usage comment at the top describing the purpose of the codemod (expected input and output) as well as a CLI command for easy copy/paste usage:

```js
yarn codemod --parser=flow -t=packages/gestalt-codemods/{version number}/{codemod file name} relative/path/to/code/to/modify
```

Now comes the fun part: create your transform function! We use [jscodeshift](https://github.com/facebook/jscodeshift), so you'll want to familiarize yourself with that specific flavor of AST traversal and manipulation. [AST Explorer](https://astexplorer.net/) is invaluable for familiarizing yourself with how specific blocks of code are parsed in an AST.

We recommend taking a test-driven approach. Create input files in the `__testfixtures__` folder to replicate all the expected usages that will need to be transformed. Each `.input.js` file should have a corresponding `.output.js` file with the expected output after running the codemod. We recommend creating the input files, duplicating them to create the output files, then manually making the expected changes. Be thorough, and think like a testing engineer! You want to make sure you capture every edge/corner case that might exist: was the component import renamed? Was the prop given a variable as a value? Or does it use a ternary? Are the ternary values primitives or variables themselves? There are limits to what codemods can do — but not many! Remember to also test instances where the codemod should _not_ change anything.

One codemod limit is dealing with spread props, something like `<Component {...props} />`. Typically in this case we throw an error noting the location, with a message indicating that the component will need to be updated manually. There can be other cases where a prop value is defined outside of the file at hand (e.g. a wrapper component that passes a prop directly through to the Gestalt component) — we typically take a similar error+message approach. You're largely writing the codemod to save yourself manual work when you update the Gestalt version in your repo, so cover as many cases as you can, but know that some cases can't be covered (or aren't worth the time).

Once you have your fixture files, start running the test watcher using `yarn jest packages/gestalt-codemods/{codemod name} --watch`. As you develop your transformer function, we recommend starting with the simplest cases and building up to the more complex ones (disable the tests you're not addressing yet to speed up the development cycle). Once all your tests pass, you're done! Double-check that you've covered every possible type of usage, then commit your codemod work with the rest of your changes. They should be in the same PR.
